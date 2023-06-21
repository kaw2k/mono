'use client'

import { LocalStorage } from '../types/storage'

export function makeLocalStorage<T>(key: string): LocalStorage<T> {
  const localStorage =
    typeof window === 'undefined' || !window.localStorage
      ? makeDefaultLocalStorage(key)
      : window.localStorage

  return {
    get: async () => {
      return JSON.parse(localStorage.getItem(key) ?? '""')
    },
    post: async (item: T) => {
      localStorage.setItem(key, JSON.stringify(item))
    },
    delete: async () => {
      localStorage.removeItem(key)
    },
  }
}

export function makeDefaultLocalStorage(key: string) {
  let item: string | null = null

  return {
    getItem: () => item,

    setItem: (nextItem: string) => {
      item = nextItem
    },
    removeItem: () => {
      item = null
    },
  }
}
