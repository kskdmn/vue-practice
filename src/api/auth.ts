import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

interface TokenResponse {
  access: string;
  refresh: string;
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
  }
}; 