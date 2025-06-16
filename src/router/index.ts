import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomeView.vue';
import AboutPage from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { 
    path: '/', 
    component: HomePage,
    meta: { requiresAuth: false }
  },
  { 
    path: '/about', 
    component: AboutPage,
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {  // Use `from` as the second parameter if you need it
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if trying to access protected route while not authenticated
    next('/login');
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    // Redirect to home if trying to access login while authenticated
    next('/');
  } else {
    next();
  }
});

export default router;