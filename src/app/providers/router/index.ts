import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from './guards'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/HomePage.vue'),
    meta: {
      title: 'CSS Lab - Главная'
    }
  },
  {
    path: '/gradient',
    name: 'gradient',
    component: () => import('@/pages/gradient/GradientPage.vue'),
    meta: {
      title: 'Генератор градиентов'
    }
  },
  {
    path: '/shadow',
    name: 'shadow',
    component: () => import('@/pages/shadow/ShadowPage.vue'),
    meta: {
      title: 'Генератор теней'
    }
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/pages/animation/AnimationPage.vue'),
    meta: {
      title: 'Генератор анимаций'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/profile/ProfilePage.vue'),
    meta: {
      title: 'Личный кабинет',
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/auth/AuthPage.vue'),
    meta: {
      title: 'Авторизация',
      guestOnly: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found/NotFoundPage.vue'),
    meta: {
      title: 'Страница не найдена'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

setupRouterGuards(router)

export default router
