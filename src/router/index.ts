import { createRouter, createWebHistory } from 'vue-router'
import window1 from '../views/windows/Window1.vue'
import window2 from '../views/windows/Window2.vue'
 
const routes = [
{
path: '/window1',
name: 'window1',
component: window1
},
{
path: '/window2',
name: 'window2',
component: window2
}
]
 
const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes
})
 
export default router