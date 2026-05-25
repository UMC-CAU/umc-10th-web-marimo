import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// TypeScript 환경을 위해 커스텀 설정 타입 정의 (_retry 플래그 포함)
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 1. 기본 인스턴스 생성
export const authApiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', // 백엔드 서버 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 관련 유틸리티 (로컬스토리지 사용 가정)
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
const setRefreshToken = (token: string) => localStorage.setItem('refreshToken', token);
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// 2. 요청 인터셉터 (Access Token 자동 헤더 추가)
authApiClient.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. 응답 인터셉터 (토큰 갱신 및 재시도 로직)
authApiClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적일 때는 그대로 반환
    return response;
  },
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 에러가 401(Unauthorized)이고, 이전에 재시도한 적이 없는 요청일 경우
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // ✅ [무한 루프 방지]: _retry 플래그를 true로 설정하여 다시 401이 떠도 재시도하지 않게 막음
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
          throw new Error('Refresh Token이 없습니다. 다시 로그인 해주세요.');
        }

        // ✅ [토큰 갱신 로직]: Refresh Token으로 새로운 토큰을 요청
        // 주의: 무한 루프를 방지하기 위해 새로운 인스턴스(axios)를 사용하거나 기본 axios를 사용합니다.
        const response = await axios.post(`${authApiClient.defaults.baseURL}/auth/refresh`, {
          refreshToken: refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        // 발급받은 새로운 토큰을 로컬스토리지에 저장
        setAccessToken(newAccessToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        // 실패했던 기존 요청의 헤더를 새 토큰으로 교체
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // ✅ [동작 검증(Seamless)]: 중단되었던 API를 바뀐 토큰과 함께 재요청하여 반환
        return authApiClient(originalRequest);
        
      } catch (refreshError) {
        // Refresh Token마저 만료되었거나 갱신 API 호출이 실패한 경우
        console.error('토큰 갱신 실패. 로그아웃 처리됩니다.', refreshError);
        clearTokens();
        // 필요에 따라 로그인 페이지로 리다이렉트 (window.location.href = '/login')
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);