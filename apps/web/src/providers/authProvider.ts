'use client'

import React from 'react'
import constate from 'constate'
import { auth } from '../utils/firebase/client'
import { User } from 'firebase/auth'

export const [AuthStateProvider, useAuth] = constate(function useAuthState() {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
})
