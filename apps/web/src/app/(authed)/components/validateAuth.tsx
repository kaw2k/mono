'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../providers/authProvider'

export const ValidateAuth: React.FC = () => {
  const { push } = useRouter()
  const { user, loading } = useAuth()

  React.useEffect(() => {
    if (!user && !loading) {
      push('/login')
    }
  }, [user, loading, push])

  return null
}
