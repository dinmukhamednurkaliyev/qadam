import { createRouter, createWebHistory } from 'vue-router'

import { vacancyRoutes } from '@/features/vacancy/vacancy-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [...vacancyRoutes],
})

export default router
