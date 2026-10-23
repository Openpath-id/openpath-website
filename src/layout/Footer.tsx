"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "@/components/Typography";
import { SOCIAL_LINKS, PLATFORM_LINKS, COMPANY_LINKS } from "@/data/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer on auth pages (login/register) and admin dashboard
  if (
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }
  return (
    <footer className="w-full bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] text-white px-6 md:px-12 xl:px-[90px] pt-[55px] md:pt-[70px] xl:pt-[97px] pb-8 md:pb-10 xl:pb-[46px]">
      {/* Top Section */}
      <div className="flex flex-col xl:flex-row items-start justify-between gap-12 md:gap-14 xl:gap-[238px]">
        {/* Left Side: Brand, Description, Social Icons */}
        <div className="flex flex-col items-start w-full md:max-w-[520px] xl:max-w-[430px]">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 xl:gap-[18px]">
            <div className="relative w-10 h-10 md:w-16 md:h-16 xl:w-[92px] xl:h-[92px] shrink-0">
              <Image
                src="/images/logo-openpath.svg"
                alt="Openpath Logo"
                fill
                sizes="(min-width: 1280px) 92px, (min-width: 768px) 64px, 40px"
                className="object-contain"
                priority
              />
            </div>
            <Typography
              font="Sora"
              weight="bold"
              className="text-white text-[16px] md:text-[28px] xl:text-[44px] leading-tight"
            >
              Openpath<span className="text-[#F2C94C]">.</span>id
            </Typography>
          </Link>

          {/* Description */}
          <p className="font-Inter text-white text-[12px] md:text-[15px] xl:text-[20px] font-normal leading-relaxed mt-2 md:mt-3 xl:mt-4">
            Satu tempat untuk menemukan beasiswa, pendanaan sertifikasi, dan peluang karier bagi
            mahasiswa. Dari menemukan peluang sampai mendaftar, semua jalannya ada di sini.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 md:gap-5 xl:gap-6 mt-4 md:mt-8 xl:mt-16">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="bg-white rounded-[24px] md:rounded-full p-[6px] md:p-2 xl:p-[10px] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                <div className="relative w-5 h-5 md:w-[22px] md:h-[22px] xl:w-6 xl:h-6">
                  <Image
                    src={social.icon}
                    alt={social.name}
                    fill
                    sizes="(min-width: 1280px) 24px, 20px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Links (Platform & Company) */}
        <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-14 xl:gap-[104px] w-full xl:w-auto">
          {/* Platform Section */}
          <div className="flex flex-col items-start">
            <Typography
              font="Sora"
              weight="bold"
              className="text-white text-[16px] md:text-[20px] xl:text-[24px] leading-tight"
            >
              Platform
            </Typography>
            <div className="flex flex-col items-start gap-3 md:gap-3.5 xl:gap-4 mt-4 xl:mt-6">
              {PLATFORM_LINKS.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="font-Inter text-white text-[12px] md:text-[14px] xl:text-[16px] font-normal hover:text-zinc-200 transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-start">
            <Typography
              font="Sora"
              weight="bold"
              className="text-white text-[16px] md:text-[20px] xl:text-[24px] leading-tight"
            >
              Company
            </Typography>
            <div className="flex flex-col items-start gap-3 md:gap-3.5 xl:gap-4 mt-4 xl:mt-6">
              {COMPANY_LINKS.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="font-Inter text-white text-[12px] md:text-[14px] xl:text-[16px] font-normal hover:text-zinc-200 transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Divider & Copyright / Legal */}
      <div className="mt-12 md:mt-16 xl:mt-[112px]">
        {/* White Divider */}
        <hr className="border-t border-white/60 xl:border-white w-full" />

        {/* Copyright and Legal Links */}
        <div className="pt-[10px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <span className="font-Inter text-white text-[12px] md:text-[14px] xl:text-[16px] font-normal text-center md:text-left">
            &copy; Copyright Openpath.id All Rights Reserved
          </span>
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/">
              <span className="font-Inter text-white text-[12px] md:text-[14px] xl:text-[16px] font-normal hover:text-zinc-200 transition-colors">
                Privacy Policy
              </span>
            </Link>
            <Link href="/">
              <span className="font-Inter text-white text-[12px] md:text-[14px] xl:text-[16px] font-normal hover:text-zinc-200 transition-colors">
                Term of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
