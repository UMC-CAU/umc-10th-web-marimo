import { apiClient } from './client';
import { type Comment, type CommentListResponse } from '../types';

export const fetchComments = async (
  lpId: number,
  cursor?: number,
  limit = 10,
  order: 'asc' | 'desc' = 'desc'
): Promise<CommentListResponse> => {
  const { data } = await apiClient.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return data;
};

export const createComment = async (lpId: number, content: string): Promise<Comment> => {
  const { data } = await apiClient.post(`/v1/lps/${lpId}/comments`, { content });
  return data;
};

export const updateComment = async (lpId: number, commentId: number, content: string): Promise<Comment> => {
  const { data } = await apiClient.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
  return data;
};

export const deleteComment = async (lpId: number, commentId: number): Promise<void> => {
  await apiClient.delete(`/v1/lps/${lpId}/comments/${commentId}`);
};
