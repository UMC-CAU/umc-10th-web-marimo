import { apiClient } from './client';
import { type LPDetail, type LPListResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const fetchLPs = async (
  cursor?: number,
  limit: number = 12,
  order: 'asc' | 'desc' = 'desc',
  search?: string
): Promise<LPListResponse> => {
  const { data } = await apiClient.get('/v1/lps', {
    params: { cursor, limit, order, search: search || undefined },
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
  const rawUrl: string = data.url ?? data.imageUrl ?? data.path ?? String(data);
  // 백엔드가 잘못된 호스트/포트로 URL을 반환할 경우 API base URL로 교체
  try {
    const returned = new URL(rawUrl);
    const base = new URL(API_BASE_URL);
    returned.protocol = base.protocol;
    returned.hostname = base.hostname;
    returned.port = base.port;
    return returned.toString();
  } catch {
    return rawUrl;
  }
};

export interface LPFormPayload {
  title: string;
  content?: string;
  thumbnail?: string;
  published?: boolean;
  tags?: string[];
}

export const createLP = async (payload: LPFormPayload) => {
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
