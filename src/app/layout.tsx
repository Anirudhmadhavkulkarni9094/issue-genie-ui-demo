// app/layout.tsx or app/layout.js
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Jost } from "next/font/google";
import SideBar from "@/components/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/context/ThemeContext";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add other weights if needed
  display: "swap",
});

export const metadata = {
  title: "My App",
  description: "Using Jost font with Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.className}>
      <ThemeProvider>
        <Navbar></Navbar>
        <body>
          <div className="flex">
            <SideBar />
            {children}
          </div>
        </body>
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </html>
  );
}
