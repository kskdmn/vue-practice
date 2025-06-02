<script setup lang="ts">
import { useSideMenuStore } from '../stores/side-menu';

const menuStore = useSideMenuStore();
const user = {
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/40',
};
</script>

<template>
  <header class="header">
    <div class="header-left">
      <button @click="menuStore.toggleMenu" class="menu-toggle">
        ☰
      </button>
      <div class="logo">My App</div>
    </div>
    <div class="user-info">
      <img :src="user.avatar" alt="User Avatar" class="avatar" />
      <span>{{ user.name }}</span>
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