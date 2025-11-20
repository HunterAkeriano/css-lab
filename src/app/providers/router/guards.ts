import type { Router } from 'vue-router'
import { i18n } from '@/app/providers'
import { useAuthStore } from '@/entities'

export function setupRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    if (to.meta.titleKey) {
      document.title = i18n.global.t(to.meta.titleKey as string)
    } else if (to.meta.title) {
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

  // keep a simple trace in dev only
  router.afterEach((to, from) => {
    if (import.meta.env.DEV && typeof console !== 'undefined') {
      console.info(`Navigation: ${from.path} -> ${to.path}`)
    }
  })
}
