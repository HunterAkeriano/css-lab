import { AUTH_TOKEN_KEY } from './constants'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export type SaveCategory = 'gradient' | 'shadow' | 'animation'

export interface SavedItem {
  id: string
  name: string
  payload: Record<string, unknown>
  status?: 'private' | 'pending' | 'approved'
  isFeatured?: boolean
  approvedAt?: string | null
  createdAt: string
  category?: SaveCategory
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw { ...error, status: response.status }
  }
  return response.json()
}

export async function listSaves(category: SaveCategory): Promise<SavedItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/saves/${category}s`, {
    headers: authHeaders()
  })
  const data = await handleResponse<{ items: SavedItem[] }>(response)
  return data.items
}

export async function requestPublish(category: SaveCategory, id: string): Promise<SavedItem> {
  const response = await fetch(`${API_BASE_URL}/api/saves/${category}s/${id}/publish`, {
    method: 'POST',
    headers: authHeaders()
  })
  const data = await handleResponse<{ item: SavedItem }>(response)
  return data.item
}

export async function listPublicSaves(category: SaveCategory): Promise<SavedItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/saves/public/${category}s`)
  const data = await handleResponse<{ items: SavedItem[] }>(response)
  return data.items
}

export async function listPendingModeration(): Promise<SavedItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/moderation/pending`, {
    headers: authHeaders()
  })
  const data = await handleResponse<{ items: SavedItem[] }>(response)
  return data.items
}

export async function approveSubmission(category: SaveCategory, id: string): Promise<SavedItem> {
  const response = await fetch(`${API_BASE_URL}/api/moderation/${category}/${id}/approve`, {
    method: 'POST',
    headers: authHeaders()
  })
  const data = await handleResponse<{ item: SavedItem }>(response)
  return data.item
}

export async function createSave(category: SaveCategory, name: string, payload: Record<string, unknown>): Promise<SavedItem> {
  const response = await fetch(`${API_BASE_URL}/api/saves/${category}s`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name, payload })
  })
  const data = await handleResponse<{ item: SavedItem }>(response)
  return data.item
}
