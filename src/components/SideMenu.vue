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

<style lang="scss" scoped>
.side-menu {
  width: 200px;
  transition: all 0.3s ease;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  height: calc(100vh - 60px); /* Subtract header height */
  margin-top: 60px; /* Add margin for header */
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  &.collapsed {
    width: 75px;
  }
}

nav {
  padding: 1rem 0;

  p {
    margin: 0;
    padding: 0;
  }
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  height: 3.5rem; /* Add fixed height */
  box-sizing: border-box; /* Ensure padding is included in height */

  &:hover {
    background-color: var(--border-color);
    color: var(--accent-color);
  }

  &.router-link-active {
    background-color: var(--border-color);
    color: var(--accent-color);
  }
}

.icon {
  display: inline-block;
  min-width: 1.25rem;
  text-align: center;
  font-size: 1.1rem;
  flex-shrink: 0; /* Prevent icon from shrinking */
}

.text {
  margin-left: 1rem;
  transition: opacity 0.3s ease, width 0.3s ease, margin 0.3s ease;
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflow text */
}

.side-menu.collapsed {
  .text {
    opacity: 0;
    width: 0;
    margin-left: 0;
  }
}
</style>