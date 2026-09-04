import { createRouter, createWebHistory } from 'vue-router'

import { vacancyRoutes } from '@/features/vacancies/vacancy-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [...vacancyRoutes],
})

export default router
