import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Typography from "@/components/Typography";
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-black flex flex-col justify-start">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 left-[30px] right-0 md:left-0">
        <Image
          src="/images/hero/bg-hero.webp"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center scale-x-[-1.25] scale-y-[1.25] md:scale-x-[-1] md:scale-y-100 origin-center transition-transform"
        />
      </div>
      {/* SVG Grain Overlay: 20% opacity, mix-blend-mode soft-light */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Gradient Overlay: 0% transparent to #000 at bottom */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000000 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full flex flex-col items-start px-5 pt-[191px] pb-[400px] md:px-12 md:pt-[220px] md:pb-[260px] lg:pl-[90px] lg:pr-12 lg:pt-[276px] lg:pb-[214px]">
        <div className="w-full max-w-[640px] lg:max-w-[750px] flex flex-col items-start">
          {/* Headline Title: 2 lines */}
          <Typography
            as="h1"
            font="Sora"
            weight="bold"
            className="text-white text-[32px] md:text-[48px] lg:text-[72px] font-bold leading-[1.15] tracking-tight"
          >
            Peluang itu ada
            <br />
            Yuk Buka Jalannya
          </Typography>

          {/* Subtitle / Description */}
          <p className="font-Inter text-white/90 text-[14px] md:text-[18px] lg:text-[24px] font-normal leading-relaxed mt-2 md:mt-3.5 lg:mt-4 max-w-[560px] lg:max-w-[620px]">
            Openpath.id adalah inisiatif Fakultas Sains dan Analitika Data ITS yang menghimpun
            informasi beasiswa dan pendanaan sertifikasi profesional terverifikasi dalam satu tempat
            untuk mahasiswa.
          </p>

          {/* Action Button */}
          <Link
            href="/listing"
            className="mt-12 md:mt-14 lg:mt-[60px] inline-flex items-center gap-[10px] bg-[#176B5B] hover:bg-[#145d4f] active:scale-95 transition-all text-white px-5 py-[10px] md:px-6 md:py-3 rounded-[8px] font-Inter text-[14px] md:text-[15px] lg:text-[16px] font-semibold shadow-md"
          >
            <span>Lihat Beasiswa &amp; Sertifikasi Terdekat</span>
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
