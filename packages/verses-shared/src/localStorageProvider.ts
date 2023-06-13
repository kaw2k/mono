import { LocalStorage } from '../types/storage'

export function makeLocalStorage<T>(key: string): LocalStorage<T> {
  if (!window || !window.localStorage) {
    throw new Error('window.localStorage is not available')
  }

  const localStorage = window.localStorage

  return {
    get: async () => {
      return JSON.parse(localStorage.getItem(key) ?? '')
    },
    post: async (item: T) => {
      localStorage.setItem(key, JSON.stringify(item))
    },
    delete: async () => {
      localStorage.removeItem(key)
    },
  }
}
