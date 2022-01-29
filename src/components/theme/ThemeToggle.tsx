import React from 'react'
import { ThemeContext } from './ThemeContext'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

export const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext)

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      {theme === 'dark' ? (
        <SunIcon
          onClick={() => setTheme('light')}
          className="h-6 w-6 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      ) : (
        <MoonIcon
          onClick={() => setTheme('dark')}
          className="h-6 w-6 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </div>
  )
}
