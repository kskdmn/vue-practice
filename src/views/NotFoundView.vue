<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <router-link to="/" class="home-link">Go back home</router-link>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #2c3e50;
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: #2c3e50;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #3aa876;
}
</style> 