import { defineStore } from 'pinia';

interface SideMenuState {
  isCollapsed: boolean | null;
}

export const useSideMenuStore = defineStore('side-menu', {
  state: (): SideMenuState => ({
    isCollapsed: null,
  }),
  actions: {
    init() {
      // Set system preference only on first visit
      if (this.isCollapsed === null) {
        this.isCollapsed = false;
      }
    },
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    },
  },

  persist: true
});