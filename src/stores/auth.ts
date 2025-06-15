import { defineStore } from 'pinia';
import { authService } from '../api/auth';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessTokenValue: string | null;
  refreshTokenValue: string | null;
  username: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    loading: false,
    error: null,
    accessTokenValue: null,
    refreshTokenValue: null,
    username: null,
  }),

  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.login(username, password);
        this.accessTokenValue = response.access;
        this.refreshTokenValue = response.refresh;
        this.isAuthenticated = true;
        await this.fetchUserInfo();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred during login';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async refreshToken() {
      if (!this.refreshTokenValue) {
        throw new Error('No refresh token available');
      }
      try {
        const response = await authService.refreshToken(this.refreshTokenValue);
        this.accessTokenValue = response.access;
        this.isAuthenticated = true;
      } catch (error) {
        this.isAuthenticated = false;
        throw error;
      }
    },

    async fetchUserInfo() {
      if (!this.isAuthenticated) {
        this.username = null;
        return;
      }
      try {
        const userInfo = await authService.getUserInfo();
        this.username = userInfo.username;
      } catch (error) {
        this.username = null;
        throw error;
      }
    },

    logout() {
      this.accessTokenValue = null;
      this.refreshTokenValue = null;
      this.isAuthenticated = false;
      this.error = null;
      this.username = null;
    },
  },

  persist: true,
});