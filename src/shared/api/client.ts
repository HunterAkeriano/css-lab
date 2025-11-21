export interface ApiClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

export interface ApiResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

export interface ApiError {
  message: string
  status?: number
  data?: unknown
}

export class ApiClient {
  private baseURL: string
  private timeout: number
  private headers: Record<string, string>

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout || 30000
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers
    }
  }

  setAuthToken(token: string) {
    this.headers['Authorization'] = `Bearer ${token}`
  }

  removeAuthToken() {
    delete this.headers['Authorization']
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const queryString = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return this.request<T>('GET', url + queryString)
  }

  async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', url, data)
  }

  async put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', url, data)
  }

  async patch<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', url, data)
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', url)
  }

  private async request<T>(
    method: string,
    url: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(this.baseURL + url, {
        method,
        headers: this.headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const responseData = await response.json()

      if (!response.ok) {
        throw {
          message: responseData.message || 'Request failed',
          status: response.status,
          data: responseData
        } as ApiError
      }

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      }
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408
        } as ApiError
      }

      throw error
    }
  }
}

const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
})

export default apiClient
