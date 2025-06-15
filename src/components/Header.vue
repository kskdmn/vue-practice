<script setup lang="ts">
import { useSideMenuStore } from '../stores/side-menu';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const menuStore = useSideMenuStore();
const authStore = useAuthStore();
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
  background-color: #2d2d2d;
  border-bottom: 1px solid #404040;
  color: #ffffff;
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
  color: #4CAF50;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e0e0e0;
}

.avatar {
  border-radius: 50%;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #ffffff;
}

.logout-button {
  background: none;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #4CAF50;
}

.logout-button:hover {
  background-color: #4CAF50;
  color: white;
}
</style>