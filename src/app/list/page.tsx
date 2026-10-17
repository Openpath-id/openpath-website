"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import Typography from "@/components/Typography";
import ProgramCard from "@/components/ProgramCard";
import DesktopFilterSidebar from "@/components/DesktopFilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PROGRAM_SORT_OPTIONS } from "@/data/sortOptions";
import { useProgramList } from "@/hooks/useProgramList";

export default function ProgramListPage() {
  const {
    programs,
    totalPages,
    counts,
    loading,
    filters,
    updateSearch,
    updateType,
    updateEducationLevel,
    updateVerification,
    updateSort,
    updatePage,
  } = useProgramList({ limit: 6 });

  // State for mobile filter modal (Gambar 3)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const currentSortLabel =
    PROGRAM_SORT_OPTIONS.find((opt) => opt.value === filters.sort)?.label || "Urutkan";

  return (
    <main className="w-full bg-[#F7F7F2] min-h-screen pt-[63px] pb-[60px] px-6 xl:px-[90px] xl:pt-[80px] xl:pb-[100px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto flex flex-col">
        {/* ============================================================== */}
        {/* HEADER: Title & Subtitle                                      */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-2 md:gap-3">
          {/* Title: 2 baris, Sora
              Mobile (< 768px): 24px, leading 32px
              Tablet (768px - 1024px / md): 32px, leading 40px
              Laptop (1024px - 1280px / lg): 36px, leading 44px
              Desktop (>= 1280px / xl): 40px, leading 48px
          */}
          <Typography
            as="h1"
            font="Sora"
            weight="bold"
            className="text-[24px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold leading-[32px] md:leading-[40px] lg:leading-[44px] xl:leading-[48px] text-[#14251F]"
          >
            Jelajahi Peluang
            <br />
            Beasiswa &amp; Pendanaan Sertifikasi
          </Typography>

          {/* Subtitle: Inter
              Mobile (< 768px): 12px, leading 20px
              Tablet (768px - 1024px / md): 14px, leading 22px
              Laptop/Desktop (>= 1024px / lg, xl): 16px, leading 24px
          */}
          <p className="font-Inter text-black text-[12px] md:text-[14px] lg:text-[16px] leading-[20px] md:leading-[22px] lg:leading-[24px] max-w-[760px]">
            Temukan dukungan untuk studi dan langkah profesionalmu. Pilih peluang, pahmi syaratnya,
            lalu cek sumber resminya
          </p>
        </div>

        {/* ============================================================== */}
        {/* MOBILE SEARCH & FILTER BAR (< 1280px)                          */}
        {/* Card padding 16px, bg green box, atas: search, bawah: urutkan & filter */}
        {/* ============================================================== */}
        <div className="mt-8 flex xl:hidden flex-col gap-4 p-4 rounded-[16px] bg-[#0E3E2E] shadow-sm">
          {/* Bagian Atas: Search Input (px 12px, py 8px, icon 24x24px, gap 4px, font Inter 14px #AFAFAF) */}
          <div className="w-full bg-white rounded-lg px-3 py-2 flex items-center gap-1 shadow-inner">
            <Search className="w-6 h-6 text-[#AFAFAF] shrink-0" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Cari program atau penyelenggara..."
              className="w-full bg-transparent outline-none font-Inter text-[14px] text-[#17221F] placeholder-[#AFAFAF]"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => updateSearch("")}
                className="text-[#AFAFAF] hover:text-black p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bagian Bawah: Dibagi 2 (Kiri Urutkan, Kanan Tombol Filter) */}
          <div className="grid grid-cols-2 gap-2">
            {/* Bagian Kiri: Urutkan (px 12px, py 8px, Inter 14px, gap ke icon 16px, icon 24x24px) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="w-full bg-white rounded-lg px-3 py-2 flex items-center justify-between text-[#17221F] cursor-pointer outline-none hover:bg-neutral-50 transition-colors group select-none"
                >
                  <span className="font-Inter text-[14px] truncate text-[#737373]">
                    {filters.sort ? currentSortLabel : "Urutkan"}
                  </span>
                  <ChevronDown className="w-6 h-6 text-[#737373] shrink-0 ml-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[calc(100vw-48px)] sm:w-[220px] bg-white rounded-xl shadow-xl border border-neutral-200/80 p-1.5 z-50"
              >
                {PROGRAM_SORT_OPTIONS.map((opt) => {
                  const isSelected = filters.sort === opt.value;
                  return (
                    <DropdownMenuItem
                      key={opt.value}
                      onClick={() => updateSort(opt.value)}
                      className={cn(
                        "w-full flex items-center justify-between px-3.5 py-2.5 font-Inter text-[13px] rounded-lg cursor-pointer transition-colors text-left",
                        isSelected
                          ? "font-semibold text-[#176B5B] bg-[#DCEFE7]/50"
                          : "text-[#17221F] hover:bg-neutral-100/70 hover:text-[#176B5B]",
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#176B5B] stroke-[2.5]" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Bagian Kanan: Tombol Filter (px 20px, py 10px, bg #F2C94C, Inter 14px 600 line 18px tracking -0.14px) */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full bg-[#F2C94C] hover:bg-[#e4bc3f] active:scale-[0.98] rounded-lg px-5 py-[10px] flex items-center justify-center font-Inter text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-[#17221F] cursor-pointer shadow-sm transition-all"
            >
              Filter
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (>= 1280px / xl)                                */}
        {/* Kiri: Filter Peluang Sidebar (DesktopFilterSidebar)            */}
        {/* Kanan: Search & Sort Bar + Green Table Container               */}
        {/* ============================================================== */}
        <div className="mt-8 xl:mt-10 flex flex-col xl:flex-row gap-6 xl:gap-8 items-start">
          {/* DESKTOP SIDEBAR: Filter Peluang (Terpisah dalam komponen DesktopFilterSidebar) */}
          <DesktopFilterSidebar
            selectedType={filters.type}
            selectedEducation={filters.educationLevel}
            selectedVerification={filters.verification}
            counts={counts}
            onSelectType={updateType}
            onSelectEducation={updateEducationLevel}
            onSelectVerification={updateVerification}
          />

          {/* MAIN CONTENT AREA */}
          <div className="w-full flex-1 flex flex-col gap-6">
            {/* DESKTOP TOP BAR: Search & Sortir (Gambar 4) */}
            <div className="hidden xl:flex items-center gap-4 bg-[#0E3E2E] p-4 rounded-[16px] shadow-sm">
              {/* Search Field */}
              <div className="flex-1 bg-white rounded-lg px-3 py-2 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#AFAFAF] shrink-0" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateSearch(e.target.value)}
                  placeholder="Cari program atau penyelenggara..."
                  className="w-full bg-transparent outline-none font-Inter text-[14px] text-[#17221F] placeholder-[#AFAFAF]"
                />
                {filters.search && (
                  <button
                    type="button"
                    onClick={() => updateSearch("")}
                    className="text-[#AFAFAF] hover:text-black p-0.5 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sortir Dropdown Desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="min-w-[210px] bg-white rounded-lg px-3 py-2 flex items-center justify-between text-[#17221F] cursor-pointer outline-none hover:bg-neutral-50 transition-colors group select-none"
                  >
                    <span className="font-Inter text-[14px] text-[#737373] truncate">
                      {filters.sort ? currentSortLabel : "Urutkan"}
                    </span>
                    <ChevronDown className="w-5 h-5 text-[#737373] shrink-0 ml-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[210px] bg-white rounded-xl shadow-xl border border-neutral-200/80 p-1.5 z-50"
                >
                  {PROGRAM_SORT_OPTIONS.map((opt) => {
                    const isSelected = filters.sort === opt.value;
                    return (
                      <DropdownMenuItem
                        key={opt.value}
                        onClick={() => updateSort(opt.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-3.5 py-2.5 font-Inter text-[13px] rounded-lg cursor-pointer transition-colors text-left",
                          isSelected
                            ? "font-semibold text-[#176B5B] bg-[#DCEFE7]/50"
                            : "text-[#17221F] hover:bg-neutral-100/70 hover:text-[#176B5B]",
                        )}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#176B5B] stroke-[2.5]" />}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* PROGRAM LIST CONTAINER
                border-radius: 14px, bg top #17221F height 63px (3 ellipse), konten padding 24px
            */}
            <div className="w-full rounded-[14px] overflow-hidden flex flex-col shadow-xl">
              {/* Header Top Bar: bg #17221F, height 63px, 3 ellipse */}
              <div className="w-full bg-[#17221F] px-6 h-[63px] flex items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#3FB58B] shrink-0" />
                  <div className="w-4 h-4 rounded-full bg-[#E5F5EE] shrink-0" />
                  <div className="w-4 h-4 rounded-full bg-[#2A6E59] shrink-0" />
                </div>
              </div>

              {/* Konten Utama: padding 24px, background dark gradient */}
              <div
                className="w-full p-6 flex flex-col"
                style={{
                  background: "linear-gradient(145deg, #093325 0%, #0F4936 45%, #0B3829 100%)",
                }}
              >
                {/* Grid Cards:
                    Mobile: 1 kolom, gap antar card 16px
                    Desktop: 2 kolom (karena di sebelah kiri ada sidebar filter) atau responsive
                */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 transition-all duration-300 ease-in-out ${
                    loading
                      ? "opacity-60 pointer-events-none scale-[0.995]"
                      : "opacity-100 scale-100"
                  }`}
                >
                  {loading && programs.length === 0 ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-full h-[320px] bg-white/10 animate-pulse rounded-[24px]"
                      />
                    ))
                  ) : programs.length > 0 ? (
                    programs.map((program) => <ProgramCard key={program.id} program={program} />)
                  ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center gap-2">
                      <p className="font-Inter text-white text-[15px] font-medium">
                        Tidak ada program yang sesuai dengan filter atau pencarian Anda.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          updateSearch("");
                          updateType("all");
                          updateEducationLevel("all");
                          updateVerification("all");
                        }}
                        className="mt-2 text-[#F2C94C] underline font-Inter text-sm cursor-pointer"
                      >
                        Reset semua filter
                      </button>
                    </div>
                  )}
                </div>

                {/* PAGINATION: Gap ke atas 32px (mt-8) */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center">
                    <div className="bg-white rounded-full p-2 flex items-center gap-4 shadow-md">
                      {/* Prev Button */}
                      <button
                        type="button"
                        aria-label="Previous page"
                        disabled={filters.page <= 1}
                        onClick={() => updatePage(Math.max(1, filters.page - 1))}
                        className={`text-[#17221F] hover:text-[#176B5B] p-1 transition-colors ${
                          filters.page <= 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Number Buttons */}
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter((p) => {
                            // Show first, last, and pages around current
                            return p === 1 || p === totalPages || Math.abs(p - filters.page) <= 1;
                          })
                          .map((num, idx, arr) => {
                            const prev = arr[idx - 1];
                            const showEllipsis = prev && num - prev > 1;

                            return (
                              <React.Fragment key={num}>
                                {showEllipsis && (
                                  <span className="text-[#17221F] font-Inter text-[12px] px-1">
                                    ...
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => updatePage(num)}
                                  className={`font-Inter text-[12px] transition-colors cursor-pointer flex items-center justify-center ${
                                    filters.page === num
                                      ? "bg-[#176B5B] text-white rounded-[20px] p-1 min-w-[28px] h-7 font-semibold"
                                      : "text-[#17221F] hover:text-[#176B5B] px-1 font-medium"
                                  }`}
                                >
                                  {num}
                                </button>
                              </React.Fragment>
                            );
                          })}
                      </div>

                      {/* Next Button */}
                      <button
                        type="button"
                        aria-label="Next page"
                        disabled={filters.page >= totalPages}
                        onClick={() => updatePage(Math.min(totalPages, filters.page + 1))}
                        className={`text-[#17221F] hover:text-[#176B5B] p-1 transition-colors ${
                          filters.page >= totalPages
                            ? "opacity-30 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE FILTER SIDEBAR / DRAWER (Komponen terpisah)             */}
      {/* ============================================================== */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedType={filters.type}
        selectedEducation={filters.educationLevel}
        selectedVerification={filters.verification}
        counts={counts}
        onSelectType={updateType}
        onSelectEducation={updateEducationLevel}
        onSelectVerification={updateVerification}
      />
    </main>
  );
}
