import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from './guards'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/HomePage.vue'),
    meta: {
      titleKey: 'META.HOME',
      layout: 'MainLayout'
    }
  },
  {
    path: '/gradient',
    name: 'gradient',
    component: () => import('@/pages/gradient/GradientPage.vue'),
    meta: {
      titleKey: 'META.GRADIENT',
      layout: 'GeneratorLayout'
    }
  },
  {
    path: '/shadow',
    name: 'shadow',
    component: () => import('@/pages/shadow/ShadowPage.vue'),
    meta: {
      titleKey: 'META.SHADOW',
      layout: 'GeneratorLayout'
    }
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/pages/animation/AnimationPage.vue'),
    meta: {
      titleKey: 'META.ANIMATION',
      layout: 'GeneratorLayout'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/profile/ProfilePage.vue'),
    meta: {
      titleKey: 'META.PROFILE',
      requiresAuth: true,
      layout: 'MainLayout'
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/auth/AuthPage.vue'),
    meta: {
      titleKey: 'META.AUTH',
      guestOnly: true,
      layout: 'AuthLayout'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found/NotFoundPage.vue'),
    meta: {
      titleKey: 'META.NOT_FOUND',
      layout: 'MainLayout'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

setupRouterGuards(router)

export default router
