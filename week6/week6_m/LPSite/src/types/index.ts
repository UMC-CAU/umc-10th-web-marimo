// LP (Landing Page) 타입
export interface LP {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  likes: number;
  userId: number;
}

export interface LPDetail extends LP {
  content: string;
  images: string[];
}

export interface LPListResponse {
  data: LP[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

// 사용자 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}
