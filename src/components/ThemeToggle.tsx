'use client'
import { useEffect, useState } from 'react'
import { Cloud, Moon, Sun } from 'lucide-react'
import clsx from 'clsx'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()


  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved || (prefersDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggleThemeFun = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
toggleTheme()
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div
      className={clsx(
        'w-16 h-7 rounded-full cursor-pointer transition-colors relative overflow-hidden',
        theme === 'light' ? 'bg-gradient-to-r from-yellow-200 to-yellow-400' : 'bg-gradient-to-r from-gray-800 to-blue-900'
      )}
      onClick={toggleThemeFun}
    >
      {/* Toggle knob */}
      <div
        className={clsx(
          'absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 z-10',
          theme === 'light'
            ? 'translate-x-0 bg-white shadow-md'
            : 'translate-x-9 bg-gray-900 shadow-inner'
        )}
      >
        {theme === 'light' ? (
          <Sun size={12} className="text-yellow-500" />
        ) : (
          <Moon size={12} className="text-white" />
        )}
      </div>

      {/* Night stars */}
      {theme === 'dark' && (
        <>
          <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full opacity-70 animate-pulse" />
          <div className="absolute top-1 right-3 w-0.5 h-0.5 bg-white rounded-full opacity-80 animate-ping" />
        </>
      )}

      {/* Day clouds */}
      {theme === 'light' && (
        <div className='relative'>
          <Cloud size={8} className='absolute text-white right-1 top-1' />
          <Cloud size={8} className='absolute text-white right-4 top-2' />
        </div>
      )}
    </div>
  )
}
