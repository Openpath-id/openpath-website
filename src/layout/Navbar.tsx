"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Menu } from "lucide-react";
import Typography from "@/components/Typography";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Listing", href: "/listing" },
  { label: "Cerita Aplikan", href: "/cerita-aplikan" },
  { label: "Peer Mentoring", href: "/peer-mentoring" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav
        aria-label="Main Navigation"
        className="w-full h-auto lg:h-[90px] px-6 py-[15px] lg:px-[90px] lg:py-[20px] flex items-center justify-between transition-colors bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%]"
      >
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2 lg:gap-[10px]">
          <div className="relative w-10 h-10 lg:w-[50px] lg:h-[50px] shrink-0">
            <Image
              src="/images/logo-openpath.svg"
              alt="Openpath Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <Typography
            font="Sora"
            weight="bold"
            className="text-white text-[16px] lg:text-[24px] leading-tight"
          >
            Openpath.id
          </Typography>
        </Link>

        {/* Right: Desktop Navigation Menu */}
        <div className="hidden lg:flex items-center gap-[40px]">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href}>
              <Typography
                font="Sora"
                weight="medium"
                className="text-white text-[16px] hover:text-[#e0e0e0] transition-colors"
              >
                {item.label}
              </Typography>
            </Link>
          ))}
        </div>

        {/* Right: Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex lg:hidden items-center justify-center text-white focus:outline-none"
          aria-label="Open mobile menu"
          id="mobile-menu-trigger"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-between px-[72px] py-[86px] overflow-y-auto lg:hidden bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-4 pointer-events-none invisible"
        }`}
      >
        <div className="w-full flex flex-col items-center">
          {/* Top Logo & Title */}
          <div className="flex items-center gap-[12px]">
            <div className="relative w-[64px] h-[64px] shrink-0">
              <Image
                src="/images/logo-openpath.svg"
                alt="Openpath Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <Typography
              font="Sora"
              weight="bold"
              className="text-white text-[25.6px] leading-tight"
            >
              Openpath.id
            </Typography>
          </div>

          {/* Navigation links below logo */}
          <div className="mt-[48px] flex flex-col items-center gap-[48px] w-full">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                <Typography
                  font="Sora"
                  weight="medium"
                  className="text-white text-[16px] text-center hover:text-[#e0e0e0] transition-colors"
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </div>
        </div>

        {/* Close button at bottom */}
        <div className="mt-[114px] flex justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-white rounded-[8px] p-[12px] flex items-center justify-center text-[#14251F] hover:bg-zinc-100 active:scale-95 transition-all shadow-sm focus:outline-none"
            aria-label="Close mobile menu"
            id="mobile-menu-close"
          >
            <ArrowLeft className="w-[12px] h-[12px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </>
  );
}
