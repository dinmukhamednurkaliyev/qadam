import type { RouteRecordRaw } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/home/home-page.vue'),
  },
] satisfies RouteRecordRaw[]
