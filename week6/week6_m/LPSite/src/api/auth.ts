import { apiClient } from './client';
import { type SignInData, type SignUpData, type LoginRequest, type SignupRequest } from '../types';

export const login = async (payload: LoginRequest): Promise<SignInData> => {
  const { data } = await apiClient.post<SignInData>('/v1/auth/signin', payload);
  localStorage.setItem('access_token', data.accessToken);
  localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name }));
  return data;
};

export const signup = async (payload: SignupRequest): Promise<SignUpData> => {
  const { data } = await apiClient.post<SignUpData>('/v1/auth/signup', payload);
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
