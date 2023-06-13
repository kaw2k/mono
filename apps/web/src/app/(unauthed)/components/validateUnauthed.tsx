'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../providers/authProvider'

export const ValidateUnauthed: React.FC = () => {
  const { push } = useRouter()
  const { user } = useAuth()

  React.useEffect(() => {
    if (user) {
      push('/browse')
    }
  }, [user, push])

  return null
}
