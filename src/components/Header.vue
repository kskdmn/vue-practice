<script setup lang="ts">
import { useSideMenuStore } from '../stores/side-menu';
import { useAuthStore } from '../stores/auth';
import { onMounted } from 'vue';

const menuStore = useSideMenuStore();
const authStore = useAuthStore();

const config = {
  envName: import.meta.env.VITE_ENV_NAME || ''
};

onMounted(async () => {
  if (authStore.isAuthenticated) {
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
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  border-radius: 50%;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>