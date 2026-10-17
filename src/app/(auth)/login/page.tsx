"use client";

import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-[#F7F7F2] text-[#17221F] selection:bg-[#176B5B] selection:text-white">
      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (< 1280px)                                                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center justify-center min-h-screen px-[24px] py-[100px] xl:hidden">
        {/* Title */}
        <h1
          className="text-center text-[24px] font-bold leading-normal text-[#17221F]"
          style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
        >
          Mulai Masuk
        </h1>

        {/* Subtitle (gap ke bawahnya 8px) */}
        <p
          className="mt-[8px] text-center text-[14px] font-normal leading-relaxed text-[#17221F] max-w-[327px]"
          style={{ fontFamily: "var(--font-Inter), Inter, sans-serif" }}
        >
          Selamat datang kembali. Masuk untuk melanjutkan pencarian beasiswa dan pendanaan
          sertifikasimu
        </p>

        {/* Image (gap ke bawahnya 24px) */}
        <div
          className="mt-[24px] relative flex items-center justify-center"
          style={{ width: "132px", height: "245.755px" }}
        >
          <Image
            src="/images/auth/pintu.png"
            alt="Pintu Peluang Openpath"
            width={132}
            height={246}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Reusable Form Container (gap ke form 8px) */}
        <div className="w-full max-w-[327px] mt-[8px]">
          <LoginForm idPrefix="mobile" isDesktop={false} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (>= 1280px)                                               */}
      {/* ========================================================================= */}
      <div className="hidden xl:flex w-full min-h-screen items-center justify-center">
        <div className="w-full max-w-[1440px] flex flex-row items-center justify-center mx-auto">
          {/* Bagian Kiri: padding: 153px 175.984px 127.767px 143.809px; */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              padding: "153px 175.984px 127.767px 143.809px",
            }}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "399.207px",
                height: "743.233px",
              }}
            >
              <Image
                src="/images/auth/pintu.png"
                alt="Pintu Peluang Openpath"
                width={400}
                height={744}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Bagian Kanan: padding: 242px 201px 276px 0; */}
          <div
            className="flex-1 flex flex-col justify-center"
            style={{
              padding: "242px 201px 276px 0",
            }}
          >
            <div className="w-full max-w-[480px]">
              {/* Mulai Masuk */}
              <h1
                className="text-left text-[48px] font-bold leading-tight text-[#17221F]"
                style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
              >
                Mulai Masuk
              </h1>

              {/* Subtitle (gap ke bawahnya 16px) */}
              <p
                className="mt-[16px] text-left text-[18px] font-normal leading-relaxed text-[#17221F]"
                style={{ fontFamily: "var(--font-Inter), Inter, sans-serif" }}
              >
                Selamat datang kembali. Masuk untuk melanjutkan pencarian beasiswa dan pendanaan
                sertifikasimu
              </p>

              {/* Form (gap ke form 56px) */}
              <div className="mt-[56px] w-full">
                <LoginForm idPrefix="desktop" isDesktop={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
