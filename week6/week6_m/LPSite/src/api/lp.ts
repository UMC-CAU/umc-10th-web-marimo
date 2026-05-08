import { apiClient } from './client';
import { type LP, type LPDetail, type LPListResponse } from '../types';

// LP 목록 조회
export const fetchLPs = async (
  page: number = 1,
  limit: number = 12,
  sort: 'latest' | 'oldest' = 'latest'
): Promise<LPListResponse> => {
  const { data } = await apiClient.get('/v1/lps', {
    params: { page, limit, sort },
  });
  return data;
};

// LP 상세 조회
export const fetchLPDetail = async (lpId: number): Promise<LPDetail> => {
  const { data } = await apiClient.get(`/v1/lps/${lpId}`);
  return data;
};

// LP 생성
export const createLP = async (payload: Partial<LP>) => {
  const { data } = await apiClient.post('/v1/lps', payload);
  return data;
};

// LP 수정
export const updateLP = async (lpId: number, payload: Partial<LP>) => {
  const { data } = await apiClient.patch(`/v1/lps/${lpId}`, payload);
  return data;
};

// LP 삭제
export const deleteLP = async (lpId: number) => {
  await apiClient.delete(`/v1/lps/${lpId}`);
};

// LP 좋아요
export const likeLP = async (lpId: number) => {
  const { data } = await apiClient.post(`/v1/lps/${lpId}/likes`);
  return data;
};

// LP 좋아요 취소
export const unlikeLP = async (lpId: number) => {
  const { data } = await apiClient.delete(`/v1/lps/${lpId}/likes`);
  return data;
};
