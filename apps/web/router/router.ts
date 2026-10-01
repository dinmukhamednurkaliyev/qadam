import { createRouter, createWebHistory } from 'vue-router'

import { routes } from '@/router/routes'

export const createAppRouter = () => {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,

    scrollBehavior(_to, _from, savedPosition) {
      return savedPosition ?? { top: 0 }
    },
  })
}
