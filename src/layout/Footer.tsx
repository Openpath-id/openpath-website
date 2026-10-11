import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "/",
    icon: "/images/footer/brand-instagram.svg",
  },
  {
    name: "WhatsApp",
    href: "/",
    icon: "/images/footer/brand-whatsapp.svg",
  },
  {
    name: "LinkedIn",
    href: "/",
    icon: "/images/footer/brand-linkedin.svg",
  },
  {
    name: "Email",
    href: "/",
    icon: "/images/footer/mail.svg",
  },
];

const PLATFORM_LINKS = [
  { label: "Listing Beasiswa & Sertifikasi", href: "/" },
  { label: "Deadline Terdekat", href: "/" },
  { label: "Cerita Aplikan", href: "/" },
  { label: "Peer Mentoring", href: "/" },
];

const COMPANY_LINKS = [{ label: "Tentang Kami", href: "/" }];

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] text-white px-6 pt-[55px] pb-8 lg:px-[90px] lg:pt-[97px] lg:pb-[46px]">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-[238px]">
        {/* Left Side: Brand, Description, Social Icons */}
        <div className="flex flex-col items-start w-full lg:max-w-[430px]">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-2 lg:gap-[18px]">
            <div className="relative w-10 h-10 lg:w-[92px] lg:h-[92px] shrink-0">
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
              className="text-white text-[16px] lg:text-[44px] leading-tight"
            >
              Openpath.id
            </Typography>
          </Link>

          {/* Description */}
          <p className="font-Inter text-white text-[12px] lg:text-[20px] font-normal leading-relaxed mt-2 lg:mt-4">
            Satu tempat untuk menemukan beasiswa, pendanaan sertifikasi, dan peluang karier bagi
            mahasiswa. Dari menemukan peluang sampai mendaftar, semua jalannya ada di sini.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 lg:gap-6 mt-4 lg:mt-16">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="bg-white rounded-[24px] lg:rounded-full p-[6px] lg:p-[10px] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                <div className="relative w-5 h-5 lg:w-6 lg:h-6">
                  <Image src={social.icon} alt={social.name} fill className="object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Links (Platform & Company) */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[104px] w-full lg:w-auto">
          {/* Platform Section */}
          <div className="flex flex-col items-start">
            <Typography
              font="Sora"
              weight="bold"
              className="text-white text-[16px] lg:text-[24px] leading-tight"
            >
              Platform
            </Typography>
            <div className="flex flex-col items-start gap-3 lg:gap-4 mt-4 lg:mt-6">
              {PLATFORM_LINKS.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="font-Inter text-white text-[12px] lg:text-[16px] font-normal hover:text-zinc-200 transition-colors">
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
              className="text-white text-[16px] lg:text-[24px] leading-tight"
            >
              Company
            </Typography>
            <div className="flex flex-col items-start gap-3 lg:gap-4 mt-4 lg:mt-6">
              {COMPANY_LINKS.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="font-Inter text-white text-[12px] lg:text-[16px] font-normal hover:text-zinc-200 transition-colors">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Divider & Copyright / Legal */}
      <div className="mt-12 lg:mt-[112px]">
        {/* White Divider */}
        <hr className="border-t border-white/60 lg:border-white w-full" />

        {/* Copyright and Legal Links */}
        <div className="pt-[10px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          <span className="font-Inter text-white text-[12px] lg:text-[16px] font-normal text-center lg:text-left">
            &copy; Copyright Openpath.id All Rights Reserved
          </span>
          <div className="flex items-center gap-8">
            <Link href="/">
              <span className="font-Inter text-white text-[12px] lg:text-[16px] font-normal hover:text-zinc-200 transition-colors">
                Privacy Policy
              </span>
            </Link>
            <Link href="/">
              <span className="font-Inter text-white text-[12px] lg:text-[16px] font-normal hover:text-zinc-200 transition-colors">
                Term of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
