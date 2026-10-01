import type { RouteRecordRaw } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/home/home-page.vue'),
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/authentication/sign-in-page.vue'),
  },
] satisfies RouteRecordRaw[]
