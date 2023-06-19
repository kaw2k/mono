'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Mode = 'light' | 'dark'

interface Theme {
  backgrounds: {
    primary: string
    secondary: string
  }
  type: {
    primary: string
    primaryDisabled: string
    secondary: string
    secondaryDisabled: string
  }
  palette: {
    primary: string
    primaryDisabled: string
    secondary: string
    secondaryDisabled: string
    tertiary: string
    tertiaryDisabled: string
  }
}

// https://approval.studio/blog/every-pantone-color-of-the-year-in-color-palettes/
const lightTheme: Theme = {
  backgrounds: {
    primary: '#FBFBF9',
    secondary: '#393939',
  },
  type: {
    primary: '#393939',
    primaryDisabled: '#393939',
    secondary: '#FBFBF9',
    secondaryDisabled: '#FBFBF9',
  },
  palette: {
    primary: '#AC354B',
    primaryDisabled: '#AC354B44',
    secondary: '#D9C5AB',
    secondaryDisabled: '#D9C5AB44',
    tertiary: '#393939',
    tertiaryDisabled: '#39393944',
  },
}

const darkTheme: Theme = lightTheme

const themes: { [Key in Mode]: Theme } = {
  dark: darkTheme,
  light: lightTheme,
}

const ThemeContext = createContext<Theme>(themes.light)

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState<Mode>('light')
  const [theme, setTheme] = useState<Theme>(themes[mode])

  const toggleTheme = useCallback((e: MediaQueryListEvent) => {
    setMode(e.matches ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const query = window?.matchMedia('(prefers-color-scheme: dark)')
    query?.addEventListener('change', toggleTheme)
    return () => {
      query?.removeEventListener('change', toggleTheme)
    }
  }, [toggleTheme])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
