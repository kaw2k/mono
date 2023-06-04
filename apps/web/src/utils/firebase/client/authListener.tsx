'use client'

import { useEffect } from 'react'
import { auth } from '.'
import { ajax } from '../../fetch'

export function AuthListener() {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        ajax.setAuthToken(await user.getIdToken())
      } else {
        ajax.clearAuthToken()
      }
    })

    return () => unsubscribe()
  }, [])

  return null
}
