import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'wheel',
      component: () => import('@/views/Wheel.vue')
    }
  ]
})

export default router
