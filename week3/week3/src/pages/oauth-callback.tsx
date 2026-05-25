import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AuthSession } from '../types/auth';

const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [, setAuthSession] = useLocalStorage<AuthSession | null>('authSession', null);

  useEffect(() => {
    // 1. URL 주소창에서 토큰과 유저 정보 뽑아내기
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const name = searchParams.get('name');
    
    if (accessToken && refreshToken) {
      // 2. 로컬 스토리지에 토큰 저장 (일반 로그인과 동일한 로직)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setAuthSession({
        email: 'google-user', // 백엔드에서 이메일은 안 넘겨줬으므로 임의 처리
        nickname: name || '구글유저',
        token: accessToken,
      });

      // 3. 저장이 끝났으면 메인 페이지로 슉! 이동
      // replace: true 옵션은 뒤로가기 했을 때 이 빈 화면으로 다시 돌아오지 않게
      navigate('/', { replace: true });
    } else {
      alert('구글 로그인 토큰을 받아오지 못했습니다.');
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate, setAuthSession]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-bold">구글 로그인 처리 중입니다...</p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;