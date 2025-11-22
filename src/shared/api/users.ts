import { useApi } from './client'

const api = useApi()

export interface PublicUser {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  subscriptionTier: 'free' | 'pro' | 'premium'
  createdAt: string
}

export interface UsersResponse {
  users: PublicUser[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

export interface UsersParams {
  page?: number
  limit?: number
  tier?: 'all' | 'free' | 'pro' | 'premium'
  sortBy?: 'name' | 'email' | 'createdAt' | 'subscriptionTier'
  sortOrder?: 'asc' | 'desc'
}

export async function getUsers(params: UsersParams = {}): Promise<UsersResponse> {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.set('page', params.page.toString())
  if (params.limit) queryParams.set('limit', params.limit.toString())
  if (params.tier) queryParams.set('tier', params.tier)
  if (params.sortBy) queryParams.set('sortBy', params.sortBy)
  if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder)

  const queryString = queryParams.toString()
  const response = await api.get<UsersResponse>(queryString ? `/users?${queryString}` : '/users')
  return response.data
}
