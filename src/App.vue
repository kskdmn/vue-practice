<script setup lang="ts">
import { RouterView } from 'vue-router';
 
</script>
 
<template>
  <header>
    <nav>
      <RouterLink to="/window1">window1</RouterLink>
      <RouterLink to="/window2">window2</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>