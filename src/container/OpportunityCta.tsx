import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Typography from "@/components/Typography";

export default function OpportunityCta() {
  return (
    <section className="relative w-full bg-[#F7F7F2] overflow-hidden flex flex-col justify-start">
      <div className="relative z-10 w-full flex flex-col pt-12 px-6 md:pt-16 md:px-9 lg:pt-20 lg:px-12 xl:pt-[100px] xl:pr-[65px] xl:pl-[652px] xl:pb-[364px]">
        <Typography
          as="h2"
          font="Sora"
          weight="bold"
          className="text-[24px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold leading-tight bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] bg-clip-text text-transparent max-w-[700px]"
        >
          Peluangnya sudah ada
          <br />
          Sekarang giliran kamu melangkah
        </Typography>

        {/* Subtitle / Deskripsi:
            Gap ke atas 8px (md: 12px)
            Mobile: font Inter 12px, line-height 20px
            Tablet (md): font Inter 14px, line-height 22px
            Laptop/Desktop (lg/xl): font Inter 16px, line-height 24px
        */}
        <p className="mt-2 md:mt-3 font-Inter text-black text-[12px] md:text-[14px] lg:text-[16px] leading-[20px] md:leading-[22px] lg:leading-[24px] font-normal max-w-[620px]">
          Temukan beasiswa dan pendanaan sertifikasi yang sudah dikurasi untuk mahasiswa fakultas
          kita, lengkap dengan deadline dan status verifikasinya. Satu tempat, tanpa perlu
          menelusuri puluhan situs
        </p>

        {/* Buttons Section:
            Gap ke atas: 32px (mobile) / 36px (md) / 40px (lg, xl)
            Jarak antar button: 16px
        */}
        <div className="mt-8 md:mt-9 xl:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Button 1: Solid Green Button */}
          <Link
            href="/list"
            className="inline-flex items-center justify-center gap-[10px] px-5 py-[10px] md:px-[22px] md:py-[11px] xl:px-6 xl:py-3 rounded-lg bg-[#176B5B] hover:bg-[#125548] text-white transition-colors"
          >
            <span className="font-Inter text-[14px] md:text-[15px] xl:text-[16px] font-semibold leading-[18px] tracking-[-0.14px] xl:tracking-[-0.16px] whitespace-nowrap">
              Lihat Semua Beasiswa &amp; Sertifikasi
            </span>
            <ArrowRight className="w-5 h-5 md:w-[22px] md:h-[22px] xl:w-6 xl:h-6 shrink-0" />
          </Link>

          {/* Button 2: Outlined Green Button */}
          <Link
            href="/cerita-aplikan"
            className="inline-flex items-center justify-center px-5 py-[10px] md:px-[22px] md:py-[11px] xl:px-6 xl:py-3 rounded-lg border-2 border-[#176B5B] bg-transparent hover:bg-[#176B5B]/5 text-[#176B5B] transition-colors"
          >
            <span className="font-Inter text-[14px] md:text-[15px] xl:text-[16px] font-semibold leading-[18px] tracking-[-0.14px] xl:tracking-[-0.16px] whitespace-nowrap">
              Baca Cerita Aplikan
            </span>
          </Link>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP IMAGES (Hanya tampil di xl: >= 1280px)                 */}
      {/* Di kiri bawah ada 2 image: path-bottom.png & paket.png         */}
      {/* ============================================================== */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none z-0">
        {/* Path / Jalur di kiri bawah */}
        <div className="absolute left-0 bottom-0 w-[550px] 2xl:w-[620px] h-[520px]">
          <Image
            src="/images/hero/path-bottom.png"
            alt="Path decoration"
            fill
            sizes="(min-width: 1280px) 620px"
            className="object-contain object-left-bottom"
          />
        </div>

        {/* Karakter orang / paket di kiri bawah agak ke depan */}
        <div className="absolute left-10 2xl:left-14 bottom-0 w-[300px] 2xl:w-[350px] h-[480px]">
          <Image
            src="/images/hero/paket.png"
            alt="Student on the path"
            fill
            sizes="(min-width: 1280px) 350px"
            className="object-contain object-left-bottom"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET IMAGES (Tampil di < 1280px)                   */}
      {/* Di bawah 450px pakai path-bottom-mobile.png,                  */}
      {/* Di atas 450px pakai path-bottom.png supaya tidak terpotong    */}
      {/* ============================================================== */}
      <div className="relative w-full h-[380px] min-[450px]:h-[440px] sm:h-[480px] md:h-[540px] lg:h-[580px] mt-8 xl:hidden pointer-events-none overflow-hidden">
        {/* Gambar 1A: Path mobile (Hanya tampil di <= 450px) */}
        <div className="block min-[450px]:hidden absolute inset-x-0 bottom-0 w-full h-full">
          <Image
            src="/images/hero/path-bottom-mobile.png"
            alt="Path background mobile"
            fill
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>

        {/* Gambar 1B: Path desktop/landscape (Tampil di > 450px sampai < 1280px) */}
        <div className="hidden min-[450px]:block absolute inset-0 w-full h-full">
          <Image
            src="/images/hero/path-bottom.png"
            alt="Path background"
            fill
            sizes="100vw"
            className="object-contain object-bottom min-[450px]:object-left-bottom"
          />
        </div>

        {/* Gambar 2: Orang dengan paket (agak ke kiri dan responsive) */}
        <div className="absolute left-4 min-[450px]:left-8 sm:left-14 md:left-20 bottom-0 w-[240px] min-[450px]:w-[260px] sm:w-[290px] md:w-[330px] h-[320px] min-[450px]:h-[360px] sm:h-[400px] md:h-[450px]">
          <Image
            src="/images/hero/paket-mobile.png"
            alt="Student mobile illustration"
            fill
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 330px, 350px"
            className="object-contain object-left-bottom"
          />
        </div>
      </div>
    </section>
  );
}
