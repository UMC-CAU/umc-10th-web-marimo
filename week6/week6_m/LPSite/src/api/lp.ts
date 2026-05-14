import { apiClient } from './client';
import { type LPDetail, type LPListResponse } from '../types';

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

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post('/v1/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log('[uploadFile] response data:', data);
  return (data.url ?? data.imageUrl ?? data.path ?? data) as string;
};

export interface LPFormPayload {
  title: string;
  content?: string;
  thumbnail?: string;
  published?: boolean;
  tags?: string[];
}

export const createLP = async (payload: LPFormPayload) => {
  console.log('[createLP] payload:', JSON.stringify(payload, null, 2));
  const { data } = await apiClient.post('/v1/lps', payload);
  return data;
};

export const updateLP = async (lpId: number, payload: Partial<LPFormPayload>) => {
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
