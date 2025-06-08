"use client"
import Image from 'next/image'
import React from 'react'
import { Home, Ticket, Users, BookOpen, Menu, X } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', icon: <Home size={20} />, route: '/' },
  { label: 'My Tickets', icon: <Ticket size={20} />, route: 'my-tickets' },
  { label: 'Mentor +', icon: <Users size={20} />, route: '#' },
  { label: 'Learning Materials', icon: <BookOpen size={20} />, route: '#' },
]

function SideBar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { theme } = useTheme()

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`
          fixed md:static top-0 left-0 min-h-screen w-64 p-5 z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:w-1/5
          ${theme === 'light' ? 'bg-[#28304E] text-white' : 'bg-[#E4EAFF] text-black'}
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Profile Section */}
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
                <Link href={item.route} className="text-base font-medium">{item.label}</Link>
              </div>
              <Menu size={18} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SideBar
