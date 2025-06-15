"use client"
import Image from 'next/image'
import React from 'react'
import { Bell, ArrowLeft, Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '@/context/ThemeContext'

function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme } = useTheme();

  return (
    <div
      className={`flex justify-between items-center px-6 py-3 ${
        theme === "light" ? "bg-white" : "bg-[#28304E]"
      } shadow-sm w-full z-20`}
    >
      {/* Left Section: Logo + Back + Hamburger */}
      <div className="flex items-center gap-4">
        {/* Hamburger menu - mobile only */}
        <button className="md:hidden" onClick={onMenuClick}>
          <Menu size={24} color={theme === "light" ? "black" : "white"} />
        </button>

        {/* Logo */}
        <div className="flex items-center pr-10">
          <Image
            src="/logo-color.png"
            alt="IssueGenie Logo"
            width={300}
            height={150}
          />
        </div>

        {/* Back to Dashboard */}
        <div className="hidden md:flex items-center text-gray-400 text-sm gap-1">
          <ArrowLeft size={16} />
          <span>Dashboard</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">
        {/* Theme Toggle */}
        <div className="rounded-full">
          <ThemeToggle />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <Bell size={22} color={theme === "light" ? "black" : "white"} />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full border-2 border-white"></span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
