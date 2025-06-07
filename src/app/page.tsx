'use client'

import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import TicketSummaryCard from "@/components/TicketSummaryCard";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [showTicketSummary, setTicketSummay] = useState(false);
  const [query, setQuery] = useState('');
  const {theme} = useTheme();
  const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    setTicketSummay(true);
    toast.success("🎉 Ticket Created Successfully!");
  };

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      

      {/* Main content area */}
      <div className="flex-1 min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 text-black dark:text-white">
        <div className={`w-full absolute h-1/2 ${theme === "light" ? "bg-white" : "bg-[#28304E] "} z-0`}></div>
        <div className=" relative z-20">

        <div className="p-6 space-y-6">
          <div className={`${theme === "light" ? "text-black" : "text-white"}`}>
          <h1 className="text-2xl font-semibold ">
            Hi, John <span className="inline-block">👋</span>
          </h1>
          <p className="">
            Ready to learn and grow? Ask your mentor anything or track your progress below.
          </p>
          </div>

          {/* Ask Mentor Section */}
          <form onSubmit={handleTicketSubmit} className="bg-white dark:bg-[#222] shadow-md rounded p-5">
            <h2 className="font-semibold text-lg mb-3">✨ Ask Your Mentor</h2>
            <textarea
              rows={4}
              className="w-full border p-3 rounded resize-none mb-4 bg-white dark:bg-[#333] text-black dark:text-white"
              placeholder="E.g. I'm experiencing issues with React state management—my component re-renders too many times whenever I update the state using useState."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
              />
            <div className="flex gap-3 items-center">
              <select className="border rounded px-3 py-2 bg-white dark:bg-[#333] text-black dark:text-white">
                <option>Select Category</option>
                <option>Technical</option>
                <option>Career</option>
              </select>
              <button
                type="submit"
                disabled={!query.trim()}
                className={`px-4 py-2 rounded text-white transition-all ${
                  query.trim() ? 'bg-[#2C66BA]' : 'bg-gray-400 cursor-not-allowed'
                }`}
                >
                Generate Ticket
              </button>
            </div>
          </form>

          {/* Ticket Summary */}
          {showTicketSummary && <TicketSummaryCard />}

          {/* Learning Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#222] shadow-md rounded p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Doc</span>
                  <span className="font-semibold text-sm text-red-600">Google</span>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                  Comprehensive strategies for diagnosing and resolving memory leaks in Java applications.
                </p>
                <a href="#" className="text-[#28304E] dark:text-blue-300 hover:underline text-sm">
                  Read more →
                </a>
              </div>
            ))}
          </div>
        </div>
            </div>
      </div>
    </div>
  );
}
