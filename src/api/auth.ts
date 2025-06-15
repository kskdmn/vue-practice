import axios from 'axios';
import axiosInstance from './index';

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

interface TokenResponse {
  access: string;
  refresh: string;
}

interface UserInfo {
  username: string;
}

export const authService = {
  async login(username: string, password: string): Promise<TokenResponse> {
    const response = await axios.post<TokenResponse>(`${API_URL}/token/`, {
      username,
      password,
    });
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await axios.post<TokenResponse>(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data;
  },

  getAccessToken(): string | null {
    return null; // This is now handled by the store
  },

  isAuthenticated(): boolean {
    return false; // This is now handled by the store
  },

  async getUserInfo(): Promise<UserInfo> {
    const response = await axiosInstance.get<UserInfo>(`${API_URL}/token/info/`);
    return response.data;
  }
}; 