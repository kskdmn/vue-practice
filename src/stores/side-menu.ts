import { defineStore } from 'pinia';

export const useSideMenuStore = defineStore('side-menu', {
  state: () => ({
    isCollapsed: false,
  }),
  actions: {
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
});