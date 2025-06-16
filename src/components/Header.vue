<script setup lang="ts">
import { useSideMenuStore } from '../stores/side-menu';
import { useAuthStore } from '../stores/auth';
import { useThemeStore } from '../stores/theme';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const menuStore = useSideMenuStore();
const authStore = useAuthStore();
const themeStore = useThemeStore();
const router = useRouter();

const config = {
  envName: import.meta.env.VITE_ENV_NAME || ''
};

const handleLogout = async () => {
  authStore.logout();
  router.push('/login');
};

onMounted(async () => {
  if (authStore.isAuthenticated && !authStore.username) {
    await authStore.fetchUserInfo();
  }
});
</script>

<template>
  <header class="header">
    <div class="header-left">
      <button @click="menuStore.toggleMenu" class="menu-toggle">
        ☰
      </button>
      <div class="logo">{{ config.envName }}</div>
    </div>
    <div v-if="authStore.isAuthenticated && authStore.username" class="user-info">
      <button @click="themeStore.toggleTheme" class="theme-toggle">
        <FontAwesomeIcon :icon="themeStore.isDarkMode ? 'sun' : 'moon'" />
      </button>
      <span>{{ authStore.username }}</span>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--accent-color);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.avatar {
  border-radius: 50%;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-primary);
}

.logout-button {
  background: none;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--accent-color);
}

.logout-button:hover {
  background-color: var(--accent-color);
  color: white;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 1rem;
  transition: color 0.2s ease;
}

.theme-toggle:hover {
  color: var(--accent-color);
}
</style>