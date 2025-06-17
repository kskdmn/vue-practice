<template>
  <main class="content">
    <h1>About Page</h1>
    <p>Learn more about our application.</p>
  </main>
</template>

<style lang="scss" scoped>
.content {
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: calc(100vh - 120px); /* Account for header and footer */
  margin-top: 60px; /* Account for header */
  margin-bottom: 60px; /* Account for footer */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-x: hidden;
}

h1 {
  color: var(--accent-color);
  margin-bottom: 1rem;
}

p {
  color: var(--text-secondary);
}
</style>