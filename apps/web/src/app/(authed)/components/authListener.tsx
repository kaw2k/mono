'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../providers/authProvider'
import { useFlashcards } from '../../../providers/flashcardProvider'

export const AuthListener: React.FC = () => {
  const { push } = useRouter()
  const { user, loading } = useAuth()
  const flashcards = useFlashcards()

  React.useEffect(() => {
    // Redirect users if they are not logged in
    if (!user && !loading) {
      flashcards.init()
      push('/login')
    }

    if (user && !loading) {
      flashcards.init(user.uid as any)
    }
  }, [user, loading, push])

  return null
}
