<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
            :disabled="authStore.loading"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
            :disabled="authStore.loading"
          />
        </div>
        <button type="submit" class="login-button" :disabled="authStore.loading">
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (error) {
    // Error is handled by the store
    console.error('Login failed:', error)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.login-box {
  background: #2d2d2d;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  margin: 1rem;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  color: #4CAF50;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #e0e0e0;
}

input {
  padding: 0.75rem;
  border: 1px solid #404040;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: #333333;
  color: #ffffff;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

.login-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #45a049;
}

.error-message {
  background-color: #ff5252;
  color: #ffffff;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.login-button:disabled {
  background-color: #666666;
  cursor: not-allowed;
}

input:disabled {
  background-color: #404040;
  cursor: not-allowed;
}
</style> 