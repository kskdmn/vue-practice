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
        <RouterLink :to="item.path">
          <FontAwesomeIcon :icon="item.icon" class="icon" />
          <span class="text" v-show="!menuStore.isCollapsed">{{ item.text }}</span>
        </RouterLink>
      </p>
    </nav>
  </aside>
</template>

<style scoped>
.side-menu {
  width: 200px; /* Expanded width */
  transition: width 0.3s ease;
  background-color: #f8f9fa; /* Light background */
}

.side-menu.collapsed {
  width: 75px; /* Collapsed width (adjust based on icon size) */
}

/* Hide text when collapsed */
.side-menu.collapsed .text {
  opacity: 0;
  width: 0;
  margin-left: 0;
  transition: all 0.3s ease;
}

.icon {
  display: inline-block;
  min-width: 1.25rem; /* Match icon width */
  text-align: center; /* Center icons when collapsed */
}
</style>