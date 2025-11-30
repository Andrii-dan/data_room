import { type ReactNode, useEffect, useState } from 'react'

import type { Theme } from '@/lib'

import { ThemeContext } from './ThemeContext'

const storageKey = 'THEME'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || 'dark',
  )

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem(storageKey, theme)
  }, [theme])

  return (
    <ThemeContext
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext>
  )
}
