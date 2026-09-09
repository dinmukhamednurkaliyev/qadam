import type { RouteRecordRaw } from 'vue-router'

export const vacancyRoutes: RouteRecordRaw[] = [
  {
    path: '/vacancies',
    name: 'vacancies',
    component: () => import('@/features/vacancy/VacancyPage.vue'),
  },
]
