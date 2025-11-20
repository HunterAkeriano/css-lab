import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from './types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const userPlan = computed(() => user.value?.plan || 'free')

  function setUser(newUser: User | null) {
    user.value = newUser
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setError(errorMessage: string | null) {
    error.value = errorMessage
  }

  async function login(_email: string, _password: string) {
    setLoading(true)
    setError(null)
    void _email
    void _password

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function register(_email: string, _password: string, _name: string) {
    setLoading(true)
    setError(null)
    void _email
    void _password
    void _name

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setError(null)
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    userPlan,
    setUser,
    login,
    register,
    logout
  }
})
