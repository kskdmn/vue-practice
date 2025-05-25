<script setup lang="ts">
import { useMenuStore } from '../stores/side-menu';
import { RouterLink } from 'vue-router';

const menuStore = useMenuStore();
</script>

<template>
  <aside class="side-menu" :class="{ collapsed: menuStore.isCollapsed }">
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.side-menu {
  width: 250px;
  transition: width 0.3s;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 1rem;
}

.side-menu.collapsed {
  width: 60px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin: 0.5rem 0;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  display: block;
}

nav a.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
</style>