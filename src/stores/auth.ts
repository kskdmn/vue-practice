import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),
  actions: {
    
  },
  persist: {
    storage: localStorage,
  }
});