import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Typography from "@/components/Typography";

export const metadata: Metadata = {
  title: "Peer Mentoring",
  description:
    "Peer mentoring OpenPath: belajar langsung dari aplikan yang sudah lolos beasiswa dan pendanaan sertifikasi.",
  alternates: { canonical: "/peer-mentoring" },
};

export default function PeerMentoringPage() {
  return (
    <div className="relative w-full overflow-hidden bg-white flex flex-col items-center justify-between min-h-[calc(100vh-90px)]">
      {/* Text & Button Container */}
      <div className="relative z-10 w-full flex flex-col items-center text-center pt-[140px] pb-[260px] px-6 md:px-16 md:pt-[160px] md:pb-[300px] lg:px-[120px] lg:pt-[180px] lg:pb-[340px] 2xl:px-[300px] 2xl:pt-[190px] 2xl:pb-[380px]">
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
            href="/list"
            className="inline-flex items-center gap-[10px] bg-[#176B5B] hover:bg-[#145d4f] active:scale-95 transition-all text-white px-5 py-[10px] lg:px-6 lg:py-3 rounded-[8px] font-Inter text-[14px] lg:text-[16px] font-semibold leading-[18px] lg:tracking-[-0.16px] shadow-md"
          >
            <span>Listing Beasiswa &amp; Sertifikasi</span>
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Background Bottom Illustration: Layered Path & Student */}
      {/* Path Layer (z-0) */}
      <div className="absolute -bottom-[180px] md:-bottom-[300px] lg:-bottom-[450px] xl:-bottom-[500px] 2xl:-bottom-[550px] left-1/2 -translate-x-1/2 w-[1010px] md:w-[1400px] xl:w-[1875px] h-[500px] md:h-[700px] xl:h-[900px] pointer-events-none select-none z-0">
        <Image
          src="/images/hero/path.webp"
          alt="Illustration Path"
          fill
          priority
          sizes="(min-width: 1280px) 1875px, (min-width: 768px) 1400px, 1010px"
          className="object-contain object-bottom"
        />
      </div>

      {/* Student Layer (z-[1]) */}
      <div className="absolute -bottom-[63px] md:-bottom-[90px] xl:-bottom-[126px] left-[calc(115/390*100%)] md:left-1/2 md:-translate-x-1/2 xl:left-[calc(502/1440*100%)] xl:translate-x-0 w-[142px] md:w-[180px] xl:w-[264px] h-[246px] md:h-[310px] xl:h-[458px] pointer-events-none select-none z-[1]">
        <Image
          src="/images/hero/student-searching.webp"
          alt="Student Searching Illustration"
          fill
          priority
          sizes="(min-width: 1280px) 264px, (min-width: 768px) 180px, 142px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
