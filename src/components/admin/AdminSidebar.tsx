"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  ChevronDown,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({
  isOpen,
  onToggle,
  isMobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { currentUser, handleLogout } = useAuth();

  const adminName = currentUser?.name || "Admin";
  const adminEmail = currentUser?.email || "admin@gmail.com";

  // Navigation Links
  const navItems = [
    {
      label: "Listing",
      href: "/admin",
      icon: ClipboardList,
      isActive: pathname === "/admin" || pathname.startsWith("/admin/listing"),
    },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR (>= 1024px)                                            */}
      {/* ========================================================================= */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen z-40 flex-col justify-between transition-all duration-300 ease-in-out select-none ${
          isOpen ? "w-[240px] px-4 py-6" : "w-[80px] px-3 py-6"
        } bg-gradient-to-b from-[#105A39] via-[#12422D] to-[#132921] text-white shadow-xl`}
      >
        {/* --- Top Section --- */}
        <div className="flex flex-col items-center w-full">
          {isOpen ? (
            /* Open state header: Logo + Text on left, Yellow Button on right */
            <div className="w-full flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2.5">
                <div className="relative w-[36px] h-[36px] shrink-0">
                  <Image
                    src="/images/logo-openpath.svg"
                    alt="Openpath Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-white text-[16px] font-bold tracking-tight font-Sora">
                  Openpath<span className="text-[#F2C94C]">.id</span>
                </span>
              </Link>

              {/* Yellow Toggle Button (ChevronsRight in open state) */}
              <button
                type="button"
                onClick={onToggle}
                aria-label="Tutup sidebar"
                className="w-[36px] h-[36px] p-2 rounded-[10px] bg-[#F2C94C] hover:bg-[#e2b93f] active:scale-95 transition-all flex items-center justify-center text-[#14251F] shadow-md cursor-pointer shrink-0"
              >
                <ChevronsRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            /* Closed state header: Centered logo, then yellow button below */
            <div className="flex flex-col items-center w-full">
              <Link href="/admin" className="relative w-[38px] h-[38px] shrink-0">
                <Image
                  src="/images/logo-openpath.svg"
                  alt="Openpath Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>

              {/* Yellow Toggle Button (ChevronsLeft in closed state) */}
              <button
                type="button"
                onClick={onToggle}
                aria-label="Buka sidebar"
                className="mt-4 w-[40px] h-[40px] rounded-[10px] bg-[#F2C94C] hover:bg-[#e2b93f] active:scale-95 transition-all flex items-center justify-center text-[#14251F] shadow-md cursor-pointer"
              >
                <ChevronsLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          )}

          {/* Divider line below header */}
          <div
            className={`${
              isOpen ? "w-full" : "w-[40px]"
            } h-[1px] bg-white/20 transition-all duration-300 my-5`}
          />

          {/* Nav Items Section */}
          <div className="w-full flex flex-col">
            {isOpen && (
              <p className="text-white/80 text-[12px] font-semibold uppercase tracking-wider px-2 mb-3 select-none font-Inter">
                Overview
              </p>
            )}

            <nav className="flex flex-col gap-1 w-full" aria-label="Admin navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center ${
                      isOpen ? "px-3 py-2.5 justify-start gap-3" : "px-0 py-2.5 justify-center"
                    } rounded-[10px] transition-all group ${
                      item.isActive
                        ? "bg-white/15 text-white shadow-inner font-semibold"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    title={!isOpen ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {isOpen && (
                      <span className="text-[18px] font-semibold leading-none font-Sora">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* --- Bottom Profile Section --- */}
        <div className="flex flex-col items-center w-full">
          {/* Divider line above profile */}
          <div
            className={`${
              isOpen ? "w-full" : "w-[40px]"
            } h-[1px] bg-white/20 transition-all duration-300 mb-4`}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isOpen ? (
                /* Open profile card: Avatar + Name/Email + ChevronDown */
                <button
                  type="button"
                  className="w-full h-[56px] rounded-[14px] bg-[#86908C] hover:bg-[#78827E] active:scale-[0.99] transition-all px-3 flex items-center justify-between cursor-pointer shadow-sm text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#13432E] flex items-center justify-center text-white shrink-0">
                      <User className="w-4 h-4 fill-white" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-[#17221F] leading-tight truncate font-Inter">
                        {adminName}
                      </span>
                      <span className="text-[11px] font-normal text-[#2C3833] leading-tight truncate font-Inter">
                        {adminEmail}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#17221F] shrink-0" />
                </button>
              ) : (
                /* Closed profile card: Rounded square with Avatar */
                <button
                  type="button"
                  aria-label="Profil Admin"
                  className="w-[48px] h-[48px] rounded-[12px] bg-[#86908C] hover:bg-[#78827E] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm focus:outline-none"
                >
                  <div className="w-[32px] h-[32px] rounded-full bg-[#13432E] flex items-center justify-center text-white">
                    <User className="w-4 h-4 fill-white" />
                  </div>
                </button>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align={isOpen ? "center" : "start"}
              className="w-[210px] p-1.5 bg-white text-[#17221F] rounded-[14px] shadow-2xl border border-neutral-200/80 mb-2 z-50 animate-in fade-in-0 zoom-in-95"
            >
              <div className="px-3 py-2 border-b border-neutral-100">
                <p className="text-[13px] font-bold text-[#17221F] truncate font-Inter">
                  {adminName}
                </p>
                <p className="text-[11px] text-neutral-500 truncate font-Inter">{adminEmail}</p>
              </div>

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 rounded-[8px] cursor-pointer transition-colors mt-1"
              >
                <LogOut className="w-4 h-4 text-red-600 shrink-0" />
                <span className="font-semibold text-[13px] font-Inter">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE DRAWER SIDEBAR (< 1024px)                                       */}
      {/* ========================================================================= */}
      {/* Backdrop */}
      <div
        role="presentation"
        onClick={onMobileClose}
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 lg:hidden ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-[260px] max-w-[85vw] z-50 flex flex-col justify-between py-6 px-4 bg-gradient-to-b from-[#105A39] via-[#12422D] to-[#132921] text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="flex flex-col w-full">
          <div className="w-full flex items-center justify-between">
            <Link href="/admin" onClick={onMobileClose} className="flex items-center gap-2.5">
              <div className="relative w-[36px] h-[36px] shrink-0">
                <Image
                  src="/images/logo-openpath.svg"
                  alt="Openpath Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-white text-[18px] font-bold tracking-tight font-Sora">
                Openpath<span className="text-[#F2C94C]">.id</span>
              </span>
            </Link>

            {/* Close Button */}
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Tutup menu"
              className="w-[36px] h-[36px] rounded-[10px] bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full h-[1px] bg-white/20 my-5" />

          {/* Navigation */}
          <div className="w-full flex flex-col">
            <p className="text-white/80 text-[12px] font-semibold uppercase tracking-wider px-2 mb-3 font-Inter">
              Overview
            </p>

            <nav className="flex flex-col gap-1 w-full" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all ${
                      item.isActive
                        ? "bg-white/15 text-white font-semibold shadow-inner"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-[15px] font-semibold leading-none font-Inter">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Profile Section with Dropdown */}
        <div className="flex flex-col w-full">
          <div className="w-full h-[1px] bg-white/20 mb-4" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-full h-[56px] rounded-[14px] bg-[#86908C] hover:bg-[#78827E] active:scale-[0.99] transition-all px-3 flex items-center justify-between cursor-pointer shadow-sm text-left focus:outline-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#13432E] flex items-center justify-center text-white shrink-0">
                    <User className="w-4 h-4 fill-white" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-[#17221F] leading-tight truncate font-Inter">
                      {adminName}
                    </span>
                    <span className="text-[11px] font-normal text-[#2C3833] leading-tight truncate font-Inter">
                      {adminEmail}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#17221F] shrink-0" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="center"
              className="w-[230px] p-1.5 bg-white text-[#17221F] rounded-[14px] shadow-2xl border border-neutral-200/80 mb-2 z-50"
            >
              <div className="px-3 py-2 border-b border-neutral-100">
                <p className="text-[13px] font-bold text-[#17221F] truncate font-Inter">
                  {adminName}
                </p>
                <p className="text-[11px] text-neutral-500 truncate font-Inter">{adminEmail}</p>
              </div>

              <DropdownMenuItem
                onClick={() => {
                  onMobileClose();
                  handleLogout();
                }}
                className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 rounded-[8px] cursor-pointer transition-colors mt-1"
              >
                <LogOut className="w-4 h-4 text-red-600 shrink-0" />
                <span className="font-semibold text-[13px] font-Inter">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
