import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(true)

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    // Update CSS variables for theme colors
    document.documentElement.style.setProperty(
      '--bg-primary',
      isDarkMode.value ? '#1a1a1a' : '#ffffff'
    )
    document.documentElement.style.setProperty(
      '--bg-secondary',
      isDarkMode.value ? '#2d2d2d' : '#f5f5f5'
    )
    document.documentElement.style.setProperty(
      '--text-primary',
      isDarkMode.value ? '#ffffff' : '#2d2d2d'
    )
    document.documentElement.style.setProperty(
      '--text-secondary',
      isDarkMode.value ? '#e0e0e0' : '#666666'
    )
    document.documentElement.style.setProperty(
      '--border-color',
      isDarkMode.value ? '#404040' : '#e0e0e0'
    )
  }

  return {
    isDarkMode,
    toggleTheme
  }
}) 