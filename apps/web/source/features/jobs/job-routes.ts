import type { RouteRecordRaw } from 'vue-router'

export const jobRoutes: RouteRecordRaw[] = [
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import('@/features/jobs/JobsPage.vue'),
  },
]
