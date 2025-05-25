<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppSideMenu from './components/AppSideMenu.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <div class="main-layout">
      <AppSideMenu />
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-layout {
  display: flex;
  flex-grow: 1;
}
</style>