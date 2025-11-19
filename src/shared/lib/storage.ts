export function saveToStorage<T>(key: string, data: T): boolean {
  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
    return true
  } catch (err) {
    console.error('Failed to save to localStorage:', err)
    return false
  }
}

export function loadFromStorage<T>(key: string): T | null {
  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) {
      return null
    }
    return JSON.parse(serialized) as T
  } catch (err) {
    console.error('Failed to load from localStorage:', err)
    return null
  }
}

export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch (err) {
    console.error('Failed to remove from localStorage:', err)
    return false
  }
}

export function clearStorage(): boolean {
  try {
    localStorage.clear()
    return true
  } catch (err) {
    console.error('Failed to clear localStorage:', err)
    return false
  }
}
