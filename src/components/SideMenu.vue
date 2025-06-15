<script setup lang="ts">
import { useSideMenuStore } from '../stores/side-menu';
import { RouterLink } from 'vue-router';

const menuStore = useSideMenuStore();

// TODO: This should be updated to use a dynamic list of menu items
import { ref } from 'vue'
const menuItems = ref([
  { path: '/', icon: 'fa-solid fa-house', text: 'Home' },
  { path: '/about', icon: 'fa-solid fa-info-circle', text: 'About' }
])
</script>

<template>
  <aside class="side-menu" :class="{ collapsed: menuStore.isCollapsed }">
    <nav>
      <p v-for="item in menuItems" :key="item.path">
        <RouterLink :to="item.path" class="menu-link">
          <FontAwesomeIcon :icon="item.icon" class="icon" />
          <span class="text" v-show="!menuStore.isCollapsed">{{ item.text }}</span>
        </RouterLink>
      </p>
    </nav>
  </aside>
</template>

<style scoped>
.side-menu {
  width: 200px;
  transition: all 0.3s ease;
  background-color: #2d2d2d;
  border-right: 1px solid #404040;
  height: calc(100vh - 60px); /* Subtract header height */
  margin-top: 60px; /* Add margin for header */
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

.side-menu.collapsed {
  width: 75px;
}

nav {
  padding: 1rem 0;
}

nav p {
  margin: 0;
  padding: 0;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #e0e0e0;
  text-decoration: none;
  transition: all 0.2s ease;
}

.menu-link:hover {
  background-color: #404040;
  color: #4CAF50;
}

.menu-link.router-link-active {
  background-color: #404040;
  color: #4CAF50;
}

.icon {
  display: inline-block;
  min-width: 1.25rem;
  text-align: center;
  font-size: 1.1rem;
}

.text {
  margin-left: 1rem;
  transition: all 0.3s ease;
}

.side-menu.collapsed .text {
  opacity: 0;
  width: 0;
  margin-left: 0;
}
</style>