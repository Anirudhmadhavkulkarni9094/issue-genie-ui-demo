"use client"

import Navbar from "@/components/Navbar";
import "./globals.css";
import { Jost } from "next/font/google";
import SideBar from "@/components/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { useState } from "react";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en" className={jost.className}>
      <ThemeProvider>
        <body className="flex flex-col">
          {/* Navbar with toggle handler */}
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="flex">
            <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-1">{children}</main>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </body>
      </ThemeProvider>
    </html>
  );
}
