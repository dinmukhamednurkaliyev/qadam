import { createRouter, createWebHistory } from 'vue-router'

import { jobRoutes } from '@/features/jobs/job-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [...jobRoutes],
})

export default router
