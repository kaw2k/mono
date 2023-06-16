import React from 'react'
import { AuthStateProvider } from './authProvider'
import { ThemeContextProvider } from '../hooks/useTheme'
import { FlashcardProvider } from './flashcardProvider'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <AuthStateProvider>
        <FlashcardProvider>{children}</FlashcardProvider>
      </AuthStateProvider>
    </ThemeContextProvider>
  )
}
