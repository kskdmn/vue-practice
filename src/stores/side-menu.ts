import { defineStore } from 'pinia';

export const useMenuStore = defineStore('side-menu', {
  state: () => ({
    isCollapsed: false,
  }),
  actions: {
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
});