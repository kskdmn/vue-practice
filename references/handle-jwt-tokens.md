To handle access and refresh tokens in a Vue 3 frontend with `djangorestframework-simplejwt`, follow this structured approach:

### 1. Install Axios
```bash
npm install axios
```

### 2. Create Authentication Utility (`src/utils/auth.js`)
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const authAxios = axios.create({ baseURL: API_BASE_URL });

// Internal state
let accessToken = localStorage.getItem('accessToken') || null;
let refreshToken = localStorage.getItem('refreshToken') || null;
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(promise => {
    if (error) promise.reject(error);
    else promise.resolve();
  });
  failedQueue = [];
};

// Set Authorization header for requests
authAxios.interceptors.request.use(config => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle token expiration
authAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => authAxios(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newTokens = await refreshTokens();
        accessToken = newTokens.access;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(); // Resolve queued requests
        return authAxios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

async function login(credentials) {
  try {
    const response = await authAxios.post('/token/', credentials);
    setTokens(response.data);
    return response.data;
  } catch (error) {
    logout();
    throw error;
  }
}

async function refreshTokens() {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, { refresh: refreshToken });
    setTokens(response.data);
    return response.data;
  } catch (error) {
    logout();
    throw error;
  }
}

function setTokens(tokens) {
  accessToken = tokens.access;
  refreshToken = tokens.refresh;
  localStorage.setItem('accessToken', tokens.access);
  localStorage.setItem('refreshToken', tokens.refresh);
}

function logout() {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

function isAuthenticated() {
  return !!accessToken;
}

export { authAxios, login, logout, isAuthenticated, refreshTokens };
```

### 3. Create a Pinia Store for Authentication (`src/stores/authStore.js`)
```javascript
import { defineStore } from 'pinia';
import { login, logout, isAuthenticated, refreshTokens } from '@/utils/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: isAuthenticated(),
  }),
  actions: {
    async login(credentials) {
      try {
        await login(credentials);
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        this.isAuthenticated = false;
        throw error;
      }
    },
    async logout() {
      logout();
      this.isAuthenticated = false;
    },
    async refresh() {
      try {
        await refreshTokens();
        this.isAuthenticated = true;
      } catch (error) {
        this.isAuthenticated = false;
        throw error;
      }
    }
  }
});
```

### 4. Make Authenticated Requests in Components
```vue
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { authAxios } from '@/utils/auth';

const authStore = useAuthStore();
const protectedData = ref(null);

async function fetchProtectedData() {
  try {
    const response = await authAxios.get('/protected-endpoint/');
    protectedData.value = response.data;
  } catch (error) {
    console.error('Request failed:', error);
  }
}

// Call on component mount or as needed
fetchProtectedData();
</script>
```

### 5. Handle Authentication in Views (e.g., Login.vue)
```vue
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const credentials = ref({ username: '', password: '' });
const error = ref('');

async function handleLogin() {
  try {
    await authStore.login(credentials.value);
    // Redirect to protected route
  } catch (err) {
    error.value = 'Invalid credentials';
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="credentials.username" placeholder="Username">
    <input v-model="credentials.password" type="password" placeholder="Password">
    <button type="submit">Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>
```

### 6. Router Navigation Guard (`src/router/index.js`)
```javascript
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/dashboard', component: () => import('@/views/Dashboard.vue'), meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      next();
    } else {
      try {
        await authStore.refresh(); // Attempt token refresh
        next();
      } catch {
        next('/login'); // Redirect to login if refresh fails
      }
    }
  } else {
    next();
  }
});

export default router;
```

### Key Features:
1. **Token Storage**: Uses `localStorage` to persist tokens across sessions.
2. **Axios Interceptors**:
   - Automatically attaches access token to requests
   - Handles 401 errors by refreshing tokens and retrying failed requests
3. **Queue System**: Manages concurrent requests during token refresh.
4. **Pinia Integration**: Centralized authentication state management.
5. **Router Guards**: Protects routes and handles token refresh on navigation.

### Security Considerations:
- **XSS Vulnerability**: Storing tokens in `localStorage` is susceptible to XSS attacks. For enhanced security:
  - Use `httpOnly` cookies (requires backend CORS configuration)
  - Implement short token expiration times
  - Add refresh token rotation
- Always serve your frontend over HTTPS in production.

This setup provides a robust authentication flow with automatic token refresh, route protection, and seamless integration with Django REST Framework's JWT endpoints.