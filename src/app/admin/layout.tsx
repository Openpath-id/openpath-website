"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("openpath_admin_sidebar_open");
      if (saved !== null) {
        setIsSidebarOpen(saved === "true");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      localStorage.setItem("openpath_admin_sidebar_open", String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#17221F] flex flex-col selection:bg-[#176B5B] selection:text-white">
      {/* Sidebar Component (Desktop collapsible + Mobile drawer) */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Mobile Top Header (Visible on < 1024px) */}
      <header className="lg:hidden sticky top-0 z-30 w-full h-[60px] px-4 flex items-center justify-between bg-gradient-to-r from-[#14251F] to-[#115C3A] text-white shadow-md">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative w-[32px] h-[32px]">
            <Image
              src="/images/logo-openpath.svg"
              alt="Openpath Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span
            className="text-[17px] font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
          >
            Openpath<span className="text-[#F2C94C]">.id</span>
          </span>
        </Link>

        {/* Hamburger Menu Trigger */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Buka navigasi admin"
          className="w-[38px] h-[38px] rounded-[8px] bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:pl-[240px]" : "lg:pl-[80px]"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
