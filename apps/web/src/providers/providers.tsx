import React from 'react'
import { AuthStateProvider } from './authProvider'
import { ThemeContextProvider } from '../hooks/useTheme'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <AuthStateProvider>{children}</AuthStateProvider>
    </ThemeContextProvider>
  )
}
