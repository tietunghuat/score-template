import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/_index.vue')
    },
    {
      path: '/template',
      name: 'template',
      component: () => import('@/views/template/_index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/home/index.vue')
    }
  ]
})

export default router
