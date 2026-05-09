import { apiClient } from './client';
import { type LP, type LPDetail, type LPListResponse } from '../types';

export const fetchLPs = async (
  cursor?: number,
  limit: number = 12,
  order: 'asc' | 'desc' = 'desc'
): Promise<LPListResponse> => {
  const { data } = await apiClient.get('/v1/lps', {
    params: { cursor, limit, order },
  });
  return data;
};

export const fetchLPDetail = async (lpId: number): Promise<LPDetail> => {
  const { data } = await apiClient.get(`/v1/lps/${lpId}`);
  return data;
};

export const createLP = async (payload: Partial<LP>) => {
  const { data } = await apiClient.post('/v1/lps', payload);
  return data;
};

export const updateLP = async (lpId: number, payload: Partial<LP>) => {
  const { data } = await apiClient.patch(`/v1/lps/${lpId}`, payload);
  return data;
};

export const deleteLP = async (lpId: number) => {
  await apiClient.delete(`/v1/lps/${lpId}`);
};

export const likeLP = async (lpId: number) => {
  const { data } = await apiClient.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const unlikeLP = async (lpId: number) => {
  const { data } = await apiClient.delete(`/v1/lps/${lpId}/likes`);
  return data;
};
