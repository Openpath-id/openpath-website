"use client";

import React, { useState } from "react";
import Typography from "@/components/Typography";
import ProgramCard from "@/components/ProgramCard";
import { usePrograms, FilterType } from "@/hooks/usePrograms";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NearestDeadlines() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { filteredPrograms, selectedFilter, setSelectedFilter, loading } = usePrograms(
    "all",
    currentPage,
  );

  const filterTabs: { labelDesktop: string; labelMobile: string; value: FilterType }[] = [
    { labelDesktop: "Semua", labelMobile: "Semua", value: "all" },
    { labelDesktop: "Beasiswa Pendidikan", labelMobile: "Beasiswa", value: "beasiswa" },
    { labelDesktop: "Pendanaan Sertifikasi", labelMobile: "Sertifikasi", value: "sertifikasi" },
  ];

  return (
    <section className="w-full bg-[#F7F7F2] py-[62px] px-6 xl:px-[90px] xl:pt-[128px] xl:pb-[85px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto rounded-[14px] overflow-hidden flex flex-col shadow-2xl">
        {/* Top Header Bar: 
            Mobile: background #17221F, height default/auto (padded), 3 ellipses 16x16px with gap 8px
            Desktop: height 92px, background #17221F, 3 ellipses 32x32px with gap 15px (at 1280px / xl)
        */}
        <div className="w-full bg-[#17221F] px-6 py-4 xl:px-10 xl:h-[92px] flex items-center shrink-0">
          <div className="flex items-center gap-2 xl:gap-[15px]">
            <div className="w-4 h-4 xl:w-8 xl:h-8 rounded-full bg-[#3FB58B] shrink-0" />
            <div className="w-4 h-4 xl:w-8 xl:h-8 rounded-full bg-[#E5F5EE] shrink-0" />
            <div className="w-4 h-4 xl:w-8 xl:h-8 rounded-full bg-[#2A6E59] shrink-0" />
          </div>
        </div>

        {/* Content Container (Below the Top Bar)
            Gradient dark green background from screenshot
            Mobile: padding 24px
            Desktop: padding 64px (at 1280px / xl)
        */}
        <div
          className="w-full p-6 xl:p-16 flex flex-col relative"
          style={{
            background: "linear-gradient(145deg, #093325 0%, #0F4936 45%, #0B3829 100%)",
          }}
        >
          {/* Header & Filter Controls Section */}
          <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 xl:gap-[40px]">
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-2 max-w-[560px]">
              <Typography
                as="h2"
                font="Sora"
                weight="bold"
                className="text-white text-[24px] xl:text-[40px] font-bold leading-tight"
              >
                Deadline <span className="text-[#F2C94C]">Terdekat</span>
              </Typography>
              <p className="font-Sora text-white/90 text-[12px] xl:text-[16px] font-normal leading-relaxed">
                Jangan lewatkan peluang yang ditutup dalam 14 hari ke depan
              </p>
            </div>

            {/* Filter Buttons Container: bg white, px 9px, py 8px, rounded 10px, gap 6px */}
            <div className="self-start xl:self-end bg-white px-[9px] py-2 rounded-[10px] flex items-center gap-[6px] shadow-sm shrink-0">
              {filterTabs.map((tab) => {
                const isActive = selectedFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => {
                      setSelectedFilter(tab.value);
                      setCurrentPage(1);
                    }}
                    className={`cursor-pointer transition-all rounded-lg px-4 py-2 xl:px-5 xl:py-[10px] font-Inter text-[12px] font-semibold leading-4 tracking-[-0.12px] ${
                      isActive
                        ? "bg-[#176B5B] text-white shadow-sm"
                        : "bg-[#BFBFBF] text-[#F7F7F2] hover:text-[#737373]"
                    }`}
                  >
                    <span className="block xl:hidden">{tab.labelMobile}</span>
                    <span className="hidden xl:block">{tab.labelDesktop}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid:
              Mobile: gap ke button 32px, gap antar card 16px, by default 3 cards
              Desktop (1280px / xl): gap antar card 24px (3 columns grid)
          */}
          <div className="mt-8 xl:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full h-[320px] bg-white/10 animate-pulse rounded-[24px]"
                />
              ))
            ) : filteredPrograms.length > 0 ? (
              filteredPrograms.map((program, index) => (
                <div key={program.id} className={index >= 3 ? "xl:hidden" : "contents"}>
                  <ProgramCard program={program} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-white/80 font-Inter text-[14px]">
                Belum ada program untuk kategori ini.
              </div>
            )}
          </div>

          {/* Mobile Pagination (Hanya ada di mobile, tersembunyi di xl):
              gap dari card ke pagination: 32px (mt-8)
              padding pagination: 8px (p-2)
              gap icon left arrow dan right arrow ke tengah: 16px (gap-4)
              ketika active, angkanya memiliki bg #176B5B radius 20px, padding 4px (px-2.5 py-1 / p-1 min-w-[28px])
          */}
          <div className="mt-8 flex xl:hidden justify-center items-center">
            <div className="bg-white rounded-full p-2 flex items-center gap-4 shadow-md">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="text-[#17221F] hover:text-[#176B5B] p-1 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCurrentPage(num)}
                    className={`font-Inter text-[12px] transition-colors cursor-pointer flex items-center justify-center ${
                      currentPage === num
                        ? "bg-[#176B5B] text-white rounded-[20px] p-1 min-w-[28px] h-7 font-semibold"
                        : "text-[#17221F] hover:text-[#176B5B] px-1 font-medium"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="text-[#17221F] font-Inter text-[12px] px-1">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(10)}
                  className={`font-Inter text-[12px] transition-colors cursor-pointer flex items-center justify-center ${
                    currentPage === 10
                      ? "bg-[#176B5B] text-white rounded-[20px] p-1 min-w-[28px] h-7 font-semibold"
                      : "text-[#17221F] hover:text-[#176B5B] px-1 font-medium"
                  }`}
                >
                  10
                </button>
              </div>

              <button
                type="button"
                aria-label="Next page"
                onClick={() => setCurrentPage((prev) => Math.min(10, prev + 1))}
                className="text-[#17221F] hover:text-[#176B5B] p-1 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
