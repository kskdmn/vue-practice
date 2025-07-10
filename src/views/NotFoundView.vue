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

<style lang="scss" scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: calc(100vh - 180px); /* 考虑header(60px) + footer(60px) + margin-top(60px) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: var(--accent-color);
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3aa876;
  }
}
</style> 