import type { LoginFormData, RegisterFormData } from '@/shared/lib/validation/auth'
import { AUTH_TOKEN_KEY } from './constants'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export interface User {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  createdAt: string
  isPayment?: boolean
  isAdmin?: boolean
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
  issues?: Array<{ path: string[]; message: string }>
}

class AuthAPI {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    }

    if (includeAuth) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw error
    }

    const result: AuthResponse = await response.json()
    localStorage.setItem(AUTH_TOKEN_KEY, result.token)
    return result
  }

  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw error
    }

    const result: AuthResponse = await response.json()
    localStorage.setItem(AUTH_TOKEN_KEY, result.token)
    return result
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: this.getHeaders(true)
    })

    if (!response.ok) {
      throw await response.json()
    }

    return response.json()
  }

  async updateProfile(data: { name?: string; avatarUrl?: string }): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw await response.json()
    }

    return response.json()
  }

  async uploadAvatar(file: File): Promise<{ user: User; avatarUrl: string }> {
    const formData = new FormData()
    formData.append('avatar', file)

    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const response = await fetch(`${API_BASE_URL}/api/profile/avatar`, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      },
      body: formData
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw error
    }

    return response.json()
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  }
}

export const authAPI = new AuthAPI()
