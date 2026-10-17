"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building2,
  Banknote,
  Calendar,
  FileText,
  ClipboardList,
  CreditCard,
  ArrowRight,
  User,
  ExternalLink,
} from "lucide-react";
import Typography from "@/components/Typography";
import { Program } from "@/types/program";
import { ApplicantStory } from "@/types/story";
import { useProgramDetail } from "@/hooks/useProgramDetail";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProgramDetailClientProps {
  program: Program;
  initialStories?: ApplicantStory[];
}

export default function ProgramDetailClient({
  program: initialProgram,
  initialStories = [],
}: ProgramDetailClientProps) {
  const router = useRouter();

  // Data integration hook from /hooks
  const {
    program,
    formattedDate,
    deadlineBadge,
    educationText,
    eligibilityList,
    fundingList,
    defaultSummary,
  } = useProgramDetail(initialProgram.id, initialProgram);

  const stories = initialStories;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const nextStory = () => {
    if (stories.length === 0) return;
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
  };
  const prevStory = () => {
    if (stories.length === 0) return;
    setCurrentStoryIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };
  const goToStory = (idx: number) => setCurrentStoryIndex(idx);

  const currentProgram = program || initialProgram;
  const currentMobileStory = stories[currentStoryIndex] || stories[0] || null;

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/list");
    }
  };

  return (
    <main className="w-full bg-[#F7F7F2] min-h-screen pt-[46px] pb-[51px] px-6 xl:pt-[84px] xl:pb-[77px] xl:px-[90px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto flex flex-col gap-4 xl:gap-6">
        {/* ============================================================== */}
        {/* TOP BAR: Back Button & Shadcn Breadcrumb                       */}
        {/* Mobile: together on left                                       */}
        {/* Desktop: Back Button on left, Breadcrumb on right               */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-10 h-10 rounded-[10px] bg-[#144737] hover:bg-[#0e3629] text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              aria-label="Kembali ke halaman list"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Mobile Shadcn Breadcrumb */}
            <Breadcrumb className="flex xl:hidden">
              <BreadcrumbList className="flex items-center gap-2 font-Inter text-[14px]">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/list"
                      className="text-[#737373] hover:text-[#17221F] transition-colors"
                    >
                      Listing
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#737373]">&gt;</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-[#176B5B]">
                    Detail Listing
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Desktop Shadcn Breadcrumb */}
          <Breadcrumb className="hidden xl:flex">
            <BreadcrumbList className="flex items-center gap-2 font-Inter text-[15px]">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/list"
                    className="text-[#737373] hover:text-[#17221F] transition-colors"
                  >
                    Listing
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#737373]">&gt;</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-[#176B5B]">
                  Detail Listing
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* ============================================================== */}
        {/* CARD 1: Header Program Details                                */}
        {/* ============================================================== */}
        <section className="w-full rounded-[20px] xl:rounded-[24px] p-6 xl:p-8 bg-[#0F4936] text-white shadow-md flex flex-col gap-4 relative overflow-hidden">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 rounded-[19px] border border-[#176B5B] bg-[#DCEFE7]">
              <span className="font-Inter text-[12px] font-medium text-[#176B5B] leading-none">
                {currentProgram.type === "beasiswa"
                  ? "Beasiswa Pendidikan"
                  : "Pendanaan Sertifikasi"}
              </span>
            </div>
            <div
              className={`px-3 py-1 rounded-[19px] border ${
                currentProgram.is_verified
                  ? "border-[#176B5B] bg-[#DCEFE7] text-[#176B5B]"
                  : "border-[#C94F4F] bg-[#FFD1D1] text-[#C94F4F]"
              }`}
            >
              <span className="font-Inter text-[12px] font-medium leading-none">
                {currentProgram.is_verified ? "Terverifikasi" : "Belum Terverifikasi"}
              </span>
            </div>
          </div>

          {/* Program Title */}
          <Typography
            as="h1"
            font="Sora"
            weight="bold"
            className="text-[20px] md:text-[26px] xl:text-[28px] font-bold text-white leading-snug max-w-[960px]"
          >
            {currentProgram.name}
          </Typography>

          {/* 4 Rows Information:
              Mobile: vertical stack (gap 10px)
              Desktop: horizontal single line with vertical pipe dividers '|'
          */}
          <div className="mt-1">
            {/* Desktop View (>= 1280px) */}
            <div className="hidden xl:flex items-center gap-4 text-white text-[13px] font-Inter flex-wrap">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-white shrink-0" />
                <span>{educationText}</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-white shrink-0" />
                <span>{currentProgram.organizer}</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-white shrink-0" />
                <span>Skema Pendanaan Penuh</span>
              </div>
              <span className="text-white/40">|</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white shrink-0" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Mobile / Tablet View (< 1280px) */}
            <div className="flex xl:hidden flex-col gap-2.5 text-white text-[13px] font-Inter">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-white shrink-0" />
                <span>{educationText}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-white shrink-0" />
                <span>{currentProgram.organizer}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Banknote className="w-4 h-4 text-white shrink-0" />
                <span>Skema Pendanaan Penuh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-white shrink-0" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CARDS 2 & 3: Main Content (2 Columns on Desktop)              */}
        {/* Mobile: Card 2 then Card 3 separated by 16px gap               */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6 items-start">
          {/* ============================================================ */}
          {/* CARD 2: Ringkasan & Syarat Kelayakan (Left Column)           */}
          {/* ============================================================ */}
          <div className="w-full xl:col-span-8 rounded-[20px] xl:rounded-[24px] p-4 md:p-6 flex flex-col gap-4 bg-[#0F4936] text-white shadow-md">
            {/* White Card 1: Ringkasan & Cakupan Program */}
            <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-3 shadow-sm text-[#17221F]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#176B5B] text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <Typography
                  as="h2"
                  font="Sora"
                  weight="bold"
                  className="text-[17px] md:text-[20px] font-bold text-[#176B5B] leading-tight"
                >
                  Ringkasan &amp; Cakupan Program
                </Typography>
              </div>
              <p className="font-Inter text-[13px] md:text-[14px] text-[#2C3E37] leading-[22px] md:leading-[24px] text-justify md:text-left">
                {defaultSummary}
              </p>
            </div>

            {/* White Card 2: Syarat Kelayakan */}
            <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-3 shadow-sm text-[#17221F]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#176B5B] text-white flex items-center justify-center shrink-0">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <Typography
                  as="h2"
                  font="Sora"
                  weight="bold"
                  className="text-[17px] md:text-[20px] font-bold text-[#176B5B] leading-tight"
                >
                  Syarat Kelayakan
                </Typography>
              </div>

              <ol className="flex flex-col gap-2.5 font-Inter text-[13px] md:text-[14px] text-[#2C3E37] leading-[20px] md:leading-[22px]">
                {eligibilityList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-semibold shrink-0">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CARD 3: Batas Pendaftaran & Estimasi Bantuan (Right Column)  */}
          {/* ============================================================ */}
          <div className="w-full xl:col-span-4 rounded-[20px] xl:rounded-[24px] p-5 md:p-6 flex flex-col gap-4 bg-[#0F4936] text-white shadow-md">
            {/* Header Batas Pendaftaran */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-Inter text-[13px] text-white/90">Batas Pendaftaran</span>
                {deadlineBadge && (
                  <div
                    className={`shrink-0 px-2.5 py-[2px] rounded-[20px] border ${deadlineBadge.className}`}
                  >
                    <span className="font-Inter text-[12px] font-medium leading-none whitespace-nowrap">
                      {deadlineBadge.label}
                    </span>
                  </div>
                )}
              </div>
              <p className="font-Sora text-[26px] md:text-[30px] font-bold text-[#F2C94C] leading-tight">
                {formattedDate}
              </p>
            </div>

            {/* White Card: Estimasi Bantuan */}
            <div className="bg-white rounded-[16px] p-5 flex flex-col gap-3 shadow-sm text-[#17221F]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#176B5B] text-white flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <Typography
                  as="h3"
                  font="Sora"
                  weight="bold"
                  className="text-[17px] md:text-[18px] font-bold text-[#176B5B] leading-tight"
                >
                  Estimasi Bantuan
                </Typography>
              </div>

              <ol className="flex flex-col gap-2 font-Inter text-[13px] text-[#2C3E37] leading-[20px]">
                {fundingList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-semibold shrink-0">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Note & CTA Button */}
            <p className="font-Inter text-[12px] text-white/90 leading-relaxed">
              Tunggu apalagi, ayo daftar segera sebelum ditutup. Klik tombol di bawah dan kamu akan
              diarahkan ke situs resmi penyelenggara
            </p>

            <a
              href={currentProgram.official_link || "https://lpdp.kemenkeu.go.id"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#F2C94C] hover:bg-[#e4bc3f] active:scale-[0.98] text-[#17221F] font-Inter font-bold text-[14px] md:text-[15px] py-3.5 rounded-[12px] shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Daftar Sekarang!</span>
              <ExternalLink className="w-4 h-4 text-[#17221F]" />
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 4: Cerita Aplikan Terkait                                 */}
        {/* ============================================================== */}
        <section className="w-full rounded-[20px] xl:rounded-[24px] p-6 xl:p-8 bg-[#0F4936] text-white shadow-md flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex flex-col gap-1">
            <Typography
              as="h2"
              font="Sora"
              weight="bold"
              className="text-[20px] md:text-[24px] font-bold text-white leading-tight"
            >
              Cerita Aplikan Terkait
            </Typography>
            <p className="font-Inter text-[12px] md:text-[14px] text-white/80">
              Pelajari strategi nyata dari para aplikan yang telah berhasil lolos seleksi beasiswa
              ini
            </p>
          </div>

          {stories.length === 0 ? (
            <div className="bg-white/10 rounded-[16px] p-6 text-center text-white/80 font-Inter text-[14px]">
              Belum ada cerita aplikan yang ditautkan untuk program ini.
            </div>
          ) : (
            <>
              {/* Desktop View: Side by Side (2 columns) */}
              <div className="hidden xl:grid grid-cols-2 gap-6">
                {stories.slice(0, 2).map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-[16px] p-6 text-[#17221F] flex flex-col justify-between gap-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Badge */}
                      <div className="self-start px-2.5 py-0.5 rounded-[19px] border border-[#176B5B] bg-[#DCEFE7]">
                        <span className="font-Inter text-[11px] font-medium text-[#176B5B]">
                          {story.badge}
                        </span>
                      </div>

                      {/* Author Row */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#DCEFE7] text-[#176B5B] flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-[#176B5B]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-Sora font-bold text-[14px] text-[#17221F]">
                            {story.authorName}
                          </span>
                          <span className="font-Inter text-[12px] text-neutral-500">
                            {story.authorRole}
                          </span>
                        </div>
                      </div>

                      <div className="border-b border-neutral-200 my-1" />

                      {/* Story Title & Excerpt */}
                      <Typography
                        as="h3"
                        font="Sora"
                        weight="bold"
                        className="text-[15px] font-bold text-[#17221F] leading-snug"
                      >
                        {story.title}
                      </Typography>

                      <p className="font-Inter text-[12px] text-neutral-600 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/cerita-aplikan/${story.slug || story.id}`}
                      className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#176B5B] hover:bg-[#125548] text-white text-[12px] font-semibold transition-colors mt-2"
                    >
                      <span>Lihat detail</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Mobile / Tablet View: Interactive Carousel Card */}
              {currentMobileStory && (
                <div className="flex xl:hidden flex-col gap-4">
                  <div className="bg-white rounded-[16px] p-5 md:p-6 text-[#17221F] flex flex-col justify-between gap-4 shadow-sm">
                    <div className="flex flex-col gap-3">
                      {/* Badge */}
                      <div className="self-start px-2.5 py-0.5 rounded-[19px] border border-[#176B5B] bg-[#DCEFE7]">
                        <span className="font-Inter text-[11px] font-medium text-[#176B5B]">
                          {currentMobileStory.badge}
                        </span>
                      </div>

                      {/* Author Row */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#DCEFE7] text-[#176B5B] flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-[#176B5B]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-Sora font-bold text-[14px] text-[#17221F]">
                            {currentMobileStory.authorName}
                          </span>
                          <span className="font-Inter text-[12px] text-neutral-500">
                            {currentMobileStory.authorRole}
                          </span>
                        </div>
                      </div>

                      <div className="border-b border-neutral-200 my-1" />

                      {/* Title with floating overlay carousel arrows in front */}
                      <div className="relative flex items-center">
                        <button
                          type="button"
                          onClick={prevStory}
                          className="absolute -left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-400/80 hover:bg-neutral-500 text-white flex items-center justify-center cursor-pointer shadow-sm z-10 transition-colors"
                          aria-label="Story sebelumnya"
                        >
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </button>

                        <Typography
                          as="h3"
                          font="Sora"
                          weight="bold"
                          className="text-[15px] font-bold text-[#17221F] leading-snug w-full text-left"
                        >
                          {currentMobileStory.title}
                        </Typography>

                        <button
                          type="button"
                          onClick={nextStory}
                          className="absolute -right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-400/80 hover:bg-neutral-500 text-white flex items-center justify-center cursor-pointer shadow-sm z-10 transition-colors"
                          aria-label="Story berikutnya"
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </div>

                      <p className="font-Inter text-[12px] text-neutral-600 leading-relaxed text-justify">
                        {currentMobileStory.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/cerita-aplikan/${currentMobileStory.slug || currentMobileStory.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#176B5B] hover:bg-[#125548] text-white text-[13px] font-semibold transition-colors mt-2"
                    >
                      <span>Lihat detail</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex items-center justify-center gap-1.5 py-1">
                    {stories.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goToStory(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentStoryIndex === idx
                            ? "w-8 bg-[#F2C94C]"
                            : "w-2 bg-white/60 hover:bg-white"
                        }`}
                        aria-label={`Pilih cerita ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Bottom Banner: Ingin tahu cerita aplikan yang lainnya? */}
          <div className="bg-white rounded-[16px] p-5 md:p-6 text-[#17221F] flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
            <div className="flex flex-col gap-1 max-w-[620px]">
              <Typography
                as="h3"
                font="Sora"
                weight="bold"
                className="text-[15px] md:text-[16px] font-bold text-[#17221F]"
              >
                Ingin tahu cerita aplikan yang lainnya?
              </Typography>
              <p className="font-Inter text-[12px] text-[#4B5563] leading-relaxed">
                Kunjungi halaman Cerita Aplikan untuk melihat tips dan pengalaman mereka selama
                mendaftar beasiswa atau pendanaan sertifikasi
              </p>
            </div>

            <Link
              href="/cerita-aplikan"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#176B5B] hover:bg-[#125548] text-white font-Inter text-[13px] md:text-[14px] font-semibold transition-colors whitespace-nowrap shadow-sm"
            >
              Kunjungi Sekarang!
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
