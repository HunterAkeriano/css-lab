import type { Router } from 'vue-router'
import { useAuthStore } from '@/entities'

export function setupRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    if (to.meta.title) {
      document.title = to.meta.title as string
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next({ name: 'auth', query: { redirect: to.fullPath } })
      return
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
      next({ name: 'home' })
      return
    }

    next()
  })

  router.afterEach((to, from) => {
    console.log(`Navigation: ${from.path} -> ${to.path}`)
  })
}
