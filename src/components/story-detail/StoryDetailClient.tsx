"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  User,
  GraduationCap,
  Landmark,
  Clock,
  FileText,
  ClipboardList,
  Lightbulb,
} from "lucide-react";
import Typography from "@/components/Typography";
import { ApplicantStory } from "@/types/story";
import { useStoryDetail } from "@/hooks/useStoryDetail";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface StoryDetailClientProps {
  story: ApplicantStory;
}

export default function StoryDetailClient({ story: initialStory }: StoryDetailClientProps) {
  const router = useRouter();

  const { story, journeySteps, takeawayPoints } = useStoryDetail(initialStory.id, initialStory);

  const currentStory = story || initialStory;

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/cerita-aplikan");
    }
  };

  const authorName = currentStory.author_name || currentStory.authorName || "Aplikan OpenPath";
  const authorRole = currentStory.author_role || currentStory.authorRole || "Awardee";
  const programName = currentStory.program_name || "Program Beasiswa & Sertifikasi";
  const period = currentStory.period || "Periode Aktif";

  return (
    <main className="w-full bg-[#F7F7F2] min-h-screen pt-[46px] pb-[51px] px-6 xl:pt-[84px] xl:pb-[77px] xl:px-[90px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto flex flex-col gap-4 xl:gap-6">
        {/* ============================================================== */}
        {/* TOP BAR: Back Button & Breadcrumb                              */}
        {/* Mobile: together on left | Desktop: Button left, Crumb right   */}
        {/* ============================================================== */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-10 h-10 rounded-[10px] bg-[#144737] hover:bg-[#0e3629] text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm shrink-0"
              aria-label="Kembali ke halaman cerita aplikan"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Mobile Breadcrumb */}
            <Breadcrumb className="flex xl:hidden">
              <BreadcrumbList className="flex items-center gap-2 font-Sora text-[16px] font-semibold">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/cerita-aplikan"
                      className="text-[#737373] hover:text-[#17221F] transition-colors"
                    >
                      Cerita
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#737373]">&gt;</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-Sora text-[16px] font-semibold text-[#176B5B]">
                    Detail Cerita
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Desktop Breadcrumb */}
          <Breadcrumb className="hidden xl:flex">
            <BreadcrumbList className="flex items-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/cerita-aplikan"
                    className="font-Sora text-[16px] font-semibold text-[#737373] hover:text-[#17221F] transition-colors"
                  >
                    Cerita
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#737373]">&gt;</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-Sora text-[16px] font-semibold text-[#176B5B]">
                  Detail Cerita
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* ============================================================== */}
        {/* CARD 1: Header Story Details (Dark Green #0F4936)              */}
        {/* ============================================================== */}
        <section className="w-full rounded-[20px] xl:rounded-[24px] p-6 xl:p-8 flex flex-col gap-4 xl:gap-5 bg-[#0F4936] text-white shadow-md">
          {/* Badge */}
          <div className="self-start px-3 py-1 rounded-[20px] border border-[#176B5B] bg-[#DCEFE7]">
            <span className="font-Inter text-[12px] md:text-[13px] font-medium text-[#176B5B]">
              {currentStory.badge}
            </span>
          </div>

          {/* Title */}
          <Typography
            as="h1"
            font="Sora"
            weight="bold"
            className="text-[22px] md:text-[30px] xl:text-[34px] font-bold text-white leading-tight"
          >
            {currentStory.title}
          </Typography>

          {/* Metadata: Mobile (stacked vertically) */}
          <div className="flex xl:hidden flex-col gap-2.5 font-semibold font-Inter text-[13px] text-[#F7F7F2]">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-white shrink-0" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-white shrink-0" />
              <span>{authorRole}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Landmark className="w-4 h-4 text-white shrink-0" />
              <span>{programName}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-white shrink-0" />
              <span>{period}</span>
            </div>
          </div>

          {/* Metadata: Desktop (single horizontal row with vertical dividers) */}
          <div className="hidden xl:flex items-center flex-wrap gap-4 font-semibold font-Inter text-[14px] text-[#F7F7F2]">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-white shrink-0" />
              <span>{authorName}</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-white shrink-0" />
              <span>{authorRole}</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2.5">
              <Landmark className="w-4 h-4 text-white shrink-0" />
              <span>{programName}</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-white shrink-0" />
              <span>{period}</span>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CARD 2: Sekilas Cerita & Perjalanan Aplikan                     */}
        {/* ============================================================== */}
        <section className="w-full rounded-[20px] xl:rounded-[24px] p-4 md:p-6 flex flex-col gap-4 xl:gap-6 bg-[#0F4936] text-[#17221F] shadow-md">
          {/* White Card 1: Sekilas Cerita Mereka */}
          <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#176B5B] text-white flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <Typography
                as="h2"
                font="Sora"
                weight="bold"
                className="text-[20px] md:text-[24px] font-bold text-[#176B5B] leading-tight"
              >
                Sekilas Cerita Mereka
              </Typography>
            </div>

            <p className="font-Inter text-[13px] md:text-[16px] text-[#17221F] leading-[22px] md:leading-[24px] text-justify md:text-left">
              {currentStory.story_overview || currentStory.excerpt}
            </p>

            {currentStory.story_quote && (
              <div className="bg-[#DCEFE7]/70 rounded-[12px] p-4 md:p-5 flex items-start gap-3">
                <span className="font-serif text-[28px] md:text-[34px] font-bold text-[#176B5B] leading-none shrink-0 select-none">
                  “
                </span>
                <p className="font-Inter font-semibold text-[14px] md:text-[16px] text-[#176B5B] leading-[22px] md:leading-[24px]">
                  {currentStory.story_quote}
                </p>
              </div>
            )}
          </div>

          {/* White Card 2: Perjalanan Aplikan */}
          {journeySteps.length > 0 && (
            <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#176B5B] text-white flex items-center justify-center shrink-0">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <Typography
                  as="h2"
                  font="Sora"
                  weight="bold"
                  className="text-[20px] md:text-[24px] font-bold text-[#176B5B] leading-tight"
                >
                  Perjalanan Aplikan
                </Typography>
              </div>

              <div className="flex flex-col gap-4">
                {journeySteps.map((step, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <h3 className="font-Sora font-bold text-[14px] md:text-[16px] text-[#17221F]">
                      {step.step ? `${step.step}. ` : `${idx + 1}. `}
                      {step.title}
                    </h3>
                    <p className="font-Inter text-[12px] md:text-[14px] text-[#17221F] leading-[20px] md:leading-[22px] text-justify md:text-left">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ============================================================== */}
        {/* CARD 3: Pelajaran yang Bisa Diambil                            */}
        {/* ============================================================== */}
        <section className="w-full rounded-[20px] xl:rounded-[24px] p-4 md:p-6 flex flex-col gap-4 bg-[#0F4936] text-[#17221F] shadow-md">
          <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-4 md:gap-5 shadow-sm text-[#17221F]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#176B5B] text-white flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <Typography
                as="h2"
                font="Sora"
                weight="bold"
                className="text-[20px] md:text-[24px] font-bold text-[#176B5B] leading-tight"
              >
                Pelajaran yang Bisa Diambil
              </Typography>
            </div>

            {currentStory.reflection_key && (
              <div className="bg-[#DCEFE7]/70 rounded-[12px] p-4 md:p-5 flex items-stretch gap-3 md:gap-3.5">
                <span className="w-[5px] rounded-full bg-[#176B5B] shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="font-Sora font-bold text-[14px] md:text-[16px] text-[#17221F]">
                    Kunci Refleksi Utama
                  </h3>
                  <p className="font-Inter text-[12px] md:text-[14px] text-[#17221F] leading-[22px] md:leading-[24px] text-justify md:text-left">
                    {currentStory.reflection_key}
                  </p>
                </div>
              </div>
            )}

            {takeawayPoints.length > 0 && (
              <ol className="flex flex-col gap-[10px] font-Inter text-[14px] md:text-[14px] text-[#2C3E37] leading-[20px] md:leading-[22px]">
                {takeawayPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-normal text-[#17221F] shrink-0">{idx + 1}.</span>
                    <span className="text-justify md:text-left">{point}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
