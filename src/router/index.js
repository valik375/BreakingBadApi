import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/episode/:id',
    name: 'Episode',
    component: () => import('../views/Episode.vue')
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: () => import('../views/Person.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
