"use client"
import Image from 'next/image'
import React from 'react'
import { Home, Ticket, Users, BookOpen, MoreHorizontal, Menu } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const navItems = [
  { label: 'Dashboard', icon: <Home size={20} />, route: '#' },
  { label: 'My Tickets', icon: <Ticket size={20} />, route: '#' },
  { label: 'Mentor +', icon: <Users size={20} />, route: '#' },
  { label: 'Learning Materials', icon: <BookOpen size={20} />, route: '#' },
]

function SideBar() {
    const { theme } = useTheme()

  return (
<div
  className={`w-1/5 min-h-screen p-5  flex flex-col gap-8 sticky top-0 ${
    theme === 'light' ? 'bg-[#28304E] text-white' : 'bg-[#E4EAFF] text-black'
  }`}
>      {/* Profile Section */}
      <div className="flex gap-4 items-center">
        <Image src="/User.png" alt="User Avatar" width={50} height={50} className="rounded-full" />
        <div>
          <p className="text-sm font-light">Welcome back!</p>
          <h1 className="text-xl font-bold">John Doe</h1>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-6 mt-4">
        {navItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center cursor-pointer hover:opacity-90">
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-base font-medium">{item.label}</span>
            </div>
            <Menu size={18} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
