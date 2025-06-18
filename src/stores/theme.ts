import { defineStore } from 'pinia'

type ThemeColors = {
  bgPrimary: string
  bgSecondary: string
  textPrimary: string
  textSecondary: string
  borderColor: string
}

const THEME_COLORS: Record<'light' | 'dark', ThemeColors> = {
  light: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f5f5f5',
    textPrimary: '#2d2d2d',
    textSecondary: '#666666',
    borderColor: '#e0e0e0'
  },
  dark: {
    bgPrimary: '#1a1a1a',
    bgSecondary: '#2d2d2d',
    textPrimary: '#ffffff',
    textSecondary: '#e0e0e0',
    borderColor: '#404040'
  }
}

interface ThemeState {
  isDarkMode: boolean | null
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDarkMode: null
  }),

  actions: {
    init() {
      // Set system preference only on first visit
      if (this.isDarkMode === null) {
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      this.applyTheme(this.isDarkMode)
    },

    applyTheme(dark: boolean) {
      const colors = dark ? THEME_COLORS.dark : THEME_COLORS.light
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
          value
        )
      })
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      this.applyTheme(this.isDarkMode)
    }
  },

  persist: true
}) 