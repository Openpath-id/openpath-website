import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Typography from "@/components/Typography";
import { TARGET_AUDIENCE_CARDS } from "@/data/hero";

export default function Hero() {
  return (
    <>
      {/* Section 1: Hero Banner */}
      <section className="relative w-full overflow-hidden bg-black flex flex-col justify-start">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 left-[30px] right-0 md:left-0">
          <Image
            src="/images/hero/bg-hero.webp"
            alt="Hero background"
            fill
            priority
            sizes="100vw"
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
              informasi beasiswa dan pendanaan sertifikasi profesional terverifikasi dalam satu
              tempat untuk mahasiswa.
            </p>

            {/* Action Button */}
            <Link
              href="/list"
              className="mt-12 md:mt-14 lg:mt-[60px] inline-flex items-center gap-[10px] bg-[#176B5B] hover:bg-[#145d4f] active:scale-95 transition-all text-white px-5 py-[10px] md:px-6 md:py-3 rounded-[8px] font-Inter text-[14px] md:text-[15px] lg:text-[16px] font-semibold shadow-md"
            >
              <span>Lihat Beasiswa &amp; Sertifikasi Terdekat</span>
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Untuk Siapa Openpath.id hadir? */}
      <section className="relative w-full bg-[#FAFAF8] overflow-hidden pt-[66px] pb-[43px] px-6 md:px-12 md:py-20 lg:py-24 2xl:pt-[186px] 2xl:pb-[150px] 2xl:pr-[90px]">
        {/* Desktop Cropped Big Logo Image (Left background) */}
        <div className="hidden lg:block absolute left-[-260px] 2xl:left-[-220px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] 2xl:w-[734px] 2xl:h-[734px] pointer-events-none select-none z-0">
          <Image
            src="/images/hero/logo-green.webp"
            alt="Openpath Logo"
            fill
            sizes="(min-width: 1536px) 734px, (min-width: 1024px) 600px, 0px"
            className="object-contain"
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center lg:items-start 2xl:pl-[518px] lg:pl-[360px]">
          {/* Mobile/Tablet Centered Logo */}
          <div className="lg:hidden relative w-[200px] h-[200px] shrink-0 mb-6">
            <Image
              src="/images/hero/logo-green.webp"
              alt="Openpath Logo"
              fill
              sizes="200px"
              className="object-contain"
            />
          </div>

          {/* Heading Section: Title & Subtitle */}
          <div className="flex flex-col gap-2 lg:gap-6 w-full text-center lg:text-left">
            <Typography
              as="h2"
              font="Sora"
              weight="semibold"
              className="text-[24px] md:text-[36px] lg:text-[48px] font-semibold leading-[125%] inline-block"
            >
              <span className="bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] bg-clip-text text-transparent">
                Untuk Siapa
                <br className="lg:hidden" /> Openpath
              </span>
              <span className="text-[#F2C94C]">.</span>
              <span className="bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] bg-clip-text text-transparent">
                id hadir?
              </span>
            </Typography>

            <p className="font-Inter text-[#17221F] text-[14px] lg:text-[18px] font-normal leading-6 max-w-[800px] text-justify">
              Openpath.id hadir sebagai sistem terkoordinasi di tingkat Fakultas Sains dan Analitika
              Data ITS. Peluang mahasiswa adalah tanggung jawab kita bersama. Mahasiswa perlu
              informasi yang mudah ditemukan, jelas sumbernya, dan relevan dengan tujuan mereka.
              Kami merangkum peluang beasiswa pendidikan dan pendanaan sertifikasi profesional dalam
              satu jalur yang lebih terarah.
            </p>
          </div>

          {/* Cards Grid / List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-4 w-full mt-6 lg:mt-16">
            {TARGET_AUDIENCE_CARDS.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-[#DCEFE7] rounded-[16px] p-8 flex flex-col items-start justify-start transition-transform hover:-translate-y-1 duration-200"
                >
                  {/* Icon Box */}
                  <div className="bg-[#6FAE91] rounded-[8px] p-[10px] flex items-center justify-center text-white mb-6 shrink-0">
                    <IconComponent className="w-6 h-6 text-[#17221F]" />
                  </div>

                  {/* Card Title */}
                  <Typography
                    as="h3"
                    font="Sora"
                    weight="semibold"
                    className="text-[#17221F] text-[18px] lg:text-[20px] font-semibold leading-tight mb-2"
                  >
                    {card.title}
                  </Typography>

                  {/* Card Description */}
                  <p className="font-Inter text-[#17221F] text-[12px] lg:text-[14px] font-normal leading-[18px] text-justify">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Lahir dari PLP YLI 2026 */}
      <section className="relative w-full bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] overflow-hidden flex flex-col items-center justify-center">
        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:flex w-full px-12 xl:px-[90px] py-16 xl:py-[81px] items-center justify-center z-10">
          <div className="w-full bg-[#F7F7F2] rounded-[24px] px-8 xl:px-[40px] py-6 xl:py-[32px] flex items-center gap-6 shadow-xl">
            {/* Logo Image */}
            <div className="relative w-[110px] h-[113px] shrink-0">
              <Image
                src="/images/hero/logo-yli.webp"
                alt="Young Leaders for Indonesia Logo"
                fill
                priority
                loading="eager"
                sizes="111px"
                className="object-contain"
              />
            </div>

            {/* Content text */}
            <div className="flex flex-col items-start">
              <Typography
                as="h2"
                font="Sora"
                weight="bold"
                className="text-[32px] xl:text-[40px] font-bold leading-tight bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] bg-clip-text text-transparent"
              >
                Lahir dari PLP YLI 2026
              </Typography>
              <p className="font-Inter text-[#17221F] text-[16px] xl:text-[20px] font-normal leading-relaxed mt-2">
                Openpath.id dibentuk sebagai Personal Leadership Project (PLP) dalam program Young
                Leaders for Indonesia (YLI) National Wave 2026 untuk membuka akses informasi dan
                mendukung langkah mahasiswa
              </p>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout (< lg) */}
        <div className="flex lg:hidden flex-col items-center w-full pt-[63px] pb-[27px] px-6 z-10 relative">
          {/* Top Card (Logo) - z-20 to be above the yellow lines */}
          <div className="w-full bg-[#F7F7F2] rounded-[20px] p-8 flex items-center justify-center shadow-md relative z-20">
            <div className="relative w-full max-w-[282px] aspect-[282/275]">
              <Image
                src="/images/hero/logo-yli.webp"
                alt="Young Leaders for Indonesia Logo"
                fill
                priority
                loading="eager"
                sizes="(max-width: 640px) 282px, 320px"
                className="object-contain"
              />
            </div>
          </div>

          {/* 2 Vertical Connecting Lines - positioned behind both cards */}
          <div className="w-full flex justify-between px-10 sm:px-16 my-[-20px] relative z-10 pointer-events-none">
            <div className="w-[10px] h-[70px] bg-[#F2C94C] rounded-sm" />
            <div className="w-[10px] h-[70px] bg-[#F2C94C] rounded-sm" />
          </div>

          {/* Bottom Card (Text Content) - z-20 to be above the yellow lines */}
          <div className="w-full bg-[#F7F7F2] rounded-[14px] px-6 py-8 flex flex-col items-start shadow-md relative z-20">
            <Typography
              as="h2"
              font="Sora"
              weight="bold"
              className="text-[#17221F] text-[20px] font-bold leading-tight"
            >
              Lahir dari PLP YLI 2026
            </Typography>
            <p className="font-Inter text-[#17221F] text-[12px] font-normal leading-4 mt-1">
              Openpath.id dibentuk sebagai Personal Leadership Project (PLP) dalam program Young
              Leaders for Indonesia (YLI) National Wave 2026 untuk membuka akses informasi dan
              mendukung langkah mahasiswa
            </p>
          </div>
        </div>

        {/* Bottom Ellipse Gradient (Mobile & Desktop) */}
        <div
          className="absolute -bottom-8 md:-bottom-10 lg:-bottom-14 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none z-0 w-[140%] sm:w-[130%] lg:w-[120%] h-[100px] md:h-[120px] lg:h-[140px]"
          style={{
            background: "linear-gradient(270deg, #F2C94C 13.88%, #8C742C 89.14%)",
          }}
        />
      </section>
    </>
  );
}
