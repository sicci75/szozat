import React, { ReactNode } from 'react'
import { loadInitialTheme, saveTheme } from '../../lib/localStorage'
import { ThemeValue } from '../../lib/theme'

export const ThemeContext = React.createContext<{
  theme: ThemeValue
  setTheme: (theme: ThemeValue) => void
}>({ theme: 'light', setTheme: (_) => {} })

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState(loadInitialTheme)

  const setAndSaveTheme = (value: ThemeValue) => {
    saveTheme(value)
    setTheme(value)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setAndSaveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
