import { apiClient } from './client';
import { type AuthResponse, type LoginRequest, type SignupRequest } from '../types';

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/login', payload);
  // 토큰 저장
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

export const signup = async (payload: SignupRequest): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/signup', payload);
  // 토큰 저장
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
