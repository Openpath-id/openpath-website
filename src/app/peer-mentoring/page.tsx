import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Typography from "@/components/Typography";

export default function PeerMentoringPage() {
  return (
    <div className="relative w-full overflow-hidden bg-white flex flex-col items-center justify-between min-h-[calc(100vh-90px)]">
      {/* Text & Button Container */}
      <div className="relative z-10 w-full flex flex-col items-center text-center pt-[245px] pb-[413px] px-6 md:px-16 md:pt-[230px] md:pb-[520px] lg:px-[120px] 2xl:px-[300px] 2xl:pt-[221px] 2xl:pb-[723px]">
        {/* Texts & Button Wrapper: gap 32px */}
        <div className="flex flex-col items-center gap-8 max-w-[840px]">
          {/* Texts Section: gap 8px on mobile, gap 16px on desktop */}
          <div className="flex flex-col items-center gap-2 lg:gap-4">
            {/* Title: Coming Soon */}
            <Typography
              as="h1"
              font="Sora"
              weight="bold"
              className="text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-[125%] bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] bg-clip-text text-transparent inline-block"
            >
              Coming Soon
            </Typography>

            {/* Description */}
            <p className="font-Inter text-[#17221F] text-[12px] md:text-[16px] lg:text-[20px] font-normal leading-[125%] max-w-[420px] md:max-w-[620px] lg:max-w-[760px]">
              Kami sedang menyiapkan ruang untuk kamu terhubung dengan kakak tingkat dan sesama
              mahasiswa yang sudah lebih dulu melewati jalannya. Sambil menunggu, yuk jelajahi
              beasiswa dan pendanaan sertifikasi yang sudah tersedia
            </p>
          </div>

          {/* Action Button: gap to arrow right 10px */}
          <Link
            href="/listing"
            className="inline-flex items-center gap-[10px] bg-[#176B5B] hover:bg-[#145d4f] active:scale-95 transition-all text-white px-5 py-[10px] lg:px-6 lg:py-3 rounded-[8px] font-Inter text-[14px] lg:text-[16px] font-semibold leading-[18px] lg:tracking-[-0.16px] shadow-md"
          >
            <span>Listing Beasiswa &amp; Sertifikasi</span>
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Background Bottom Illustration */}
      {/* Mobile Illustration (< 500px) */}
      <div className="min-[500px]:hidden absolute bottom-0 inset-x-0 w-full h-[360px] pointer-events-none select-none z-0">
        <Image
          src="/images/hero/path-mobile.webp"
          alt="Illustration Path Mobile"
          fill
          priority
          sizes="(max-width: 500px) 100vw, 0px"
          className="object-contain object-bottom"
        />
      </div>

      {/* Desktop & Tablet Illustration (>= 500px) */}
      <div className="hidden min-[500px]:block absolute bottom-0 inset-x-0 w-full h-[360px] sm:h-[460px] md:h-[540px] xl:h-[640px] 2xl:h-[720px] pointer-events-none select-none z-0">
        <Image
          src="/images/hero/path-desktop.webp"
          alt="Illustration Path Desktop"
          fill
          priority
          sizes="(min-width: 500px) 100vw, 0px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
