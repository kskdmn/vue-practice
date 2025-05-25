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
      <div class="main-content">
        <router-view />
      </div>
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
  min-height: calc(100vh - 120px); /* Adjust based on header/footer height */
  min-width: 100vw; /* Ensure full width */
}

.main-content {
  flex: 1;
  overflow: auto;
  min-width: 0; /* Fixes flexbox overflow issue */
}
</style>