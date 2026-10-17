"use client";

import React from "react";
import { Search } from "lucide-react";
import Typography from "@/components/Typography";
import ApplicantStoryCard from "@/components/ApplicantStoryCard";
import { useApplicantStories, StoryCategoryFilter } from "@/hooks/useApplicantStories";
import { ApplicantStory } from "@/types/story";

interface CeritaAplikanClientProps {
  initialStories?: ApplicantStory[];
}

export default function CeritaAplikanClient({ initialStories = [] }: CeritaAplikanClientProps) {
  const { stories, loading, error, search, setSearch, category, setCategory } =
    useApplicantStories(initialStories);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [thumbRatio, setThumbRatio] = React.useState(0.35);

  const updateScrollProgress = React.useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
      setThumbRatio(Math.max(0.25, Math.min(1, clientWidth / scrollWidth)));
    } else {
      setScrollProgress(0);
      setThumbRatio(1);
    }
  }, []);

  React.useEffect(() => {
    updateScrollProgress();
    window.addEventListener("resize", updateScrollProgress);
    return () => window.removeEventListener("resize", updateScrollProgress);
  }, [updateScrollProgress]);

  const filterTabs: { label: string; value: StoryCategoryFilter }[] = [
    { label: "Semua", value: "all" },
    { label: "Beasiswa Pendidikan", value: "beasiswa" },
    { label: "Pendanaan Sertifikasi", value: "sertifikasi" },
  ];

  return (
    <main className="w-full bg-[#F7F7F2] min-h-screen pt-[83px] pb-[61px] px-6 xl:pt-[80px] xl:pb-[100px] xl:px-[90px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto flex flex-col gap-6 md:gap-8">
        {/* ============================================================== */}
        {/* PAGE HEADER: Title & Subtitle                                  */}
        {/* ============================================================== */}
        <header className="flex flex-col gap-2">
          <Typography
            as="h1"
            font="Sora"
            weight="bold"
            className="text-[24px] md:text-[32px] xl:text-[38px] font-bold leading-tight md:leading-[46px] text-[#14251F]"
          >
            Mereka Sudah Melangkah
            <br />
            Kini Giliranmu
          </Typography>
          <p className="font-Inter text-[13px] md:text-[15px] text-[#000000] max-w-[760px] leading-relaxed">
            Kumpulan kisah dan strategi dari para aplikan beasiswa dan sertifikasi. Temukan
            inspirasi dan tips praktis sebelum kamu mendaftar
          </p>
        </header>

        {/* ============================================================== */}
        {/* MAIN CONTAINER: Terminal/Browser Window Card (Dark Green)      */}
        {/* ============================================================== */}
        <section className="w-full rounded-[20px] xl:rounded-[24px] overflow-hidden shadow-md flex flex-col">
          {/* Header Window Bar */}
          <div className="w-full bg-[#17221F] px-6 md:px-8 xl:px-10 h-[60px] md:h-[90px] flex items-center">
            <div className="flex items-center gap-2.5 md:gap-4">
              <span className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] rounded-full bg-[#6FAE91] shrink-0" />
              <span className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] rounded-full bg-[#DCEFE7] shrink-0" />
              <span className="w-[16px] h-[16px] md:w-[32px] md:h-[32px] rounded-full bg-[#6FAE91] shrink-0" />
            </div>
          </div>

          {/* Content Body with 90deg Gradient */}
          <div
            className="w-full p-5 md:p-8 xl:pt-[64px] xl:pb-[70px] xl:px-10 text-white flex flex-col gap-6 md:gap-8"
            style={{
              background: "linear-gradient(90deg, #14251F -7.78%, #115C3A 100%)",
            }}
          >
            {/* Header Bar inside Green Container */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 xl:gap-[100px]">
              {/* Title & Subtext */}
              <div className="flex flex-col gap-2 max-w-[480px]">
                <Typography
                  as="h2"
                  font="Sora"
                  weight="bold"
                  className="text-[24px] md:text-[32px] xl:text-[40px] font-bold text-white leading-tight"
                >
                  Cerita Terbaru
                </Typography>
                <p className="font-Inter text-[13px] md:text-[15px] xl:text-[18px] text-white/80 leading-relaxed">
                  Pengalaman terbaru dari para aplikan, lengkap dengan strategi dan tips yang bisa
                  kamu terapkan
                </p>
              </div>

              {/* Search Bar & Filter Buttons */}
              <div className="flex flex-col gap-3 w-full xl:w-fit shrink-0">
                {/* Search Bar: width matches 3 buttons below on desktop */}
                <div className="w-full flex items-center bg-white rounded-[10px] px-[12px] py-[8px] gap-2 shadow-sm">
                  <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari program atau nama, misal LPDP"
                    className="w-full bg-transparent text-[13px] font-Inter text-[#17221F] placeholder:text-neutral-400 outline-none"
                    aria-label="Cari cerita aplikan"
                  />
                </div>

                {/* Button Container with White Background (w-fit, px 9px, py 8px, rounded scrollbar on mobile) */}
                <div className="w-fit max-w-full bg-white rounded-[12px] px-[9px] py-[8px] flex flex-col gap-1.5">
                  <div
                    ref={scrollContainerRef}
                    onScroll={updateScrollProgress}
                    className="w-full overflow-x-auto xl:overflow-visible no-scrollbar"
                  >
                    <div className="inline-flex items-center gap-[6px] min-w-full sm:min-w-0 whitespace-nowrap">
                      {filterTabs.map((tab) => {
                        const isActive = category === tab.value;
                        return (
                          <button
                            key={tab.value}
                            type="button"
                            onClick={() => setCategory(tab.value)}
                            className={`shrink-0 px-[20px] py-[10px] rounded-[8px] font-Inter text-[14px] font-semibold leading-[18px] tracking-[-0.14px] transition-all cursor-pointer ${
                              isActive
                                ? "bg-[#176B5B] text-white shadow-sm"
                                : "bg-[#BDBDBD] hover:bg-[#a8a8a8] text-white"
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fully Rounded Custom Scrollbar (Mobile <= 500px only) */}
                  <div className="w-full px-1 max-[500px]:block hidden">
                    <div className="w-full h-[5px] bg-[#E5E7EB] rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-[#176B5B] rounded-full transition-all duration-75"
                        style={{
                          width: `${thumbRatio * 100}%`,
                          transform: `translateX(${scrollProgress * ((1 - thumbRatio) / Math.max(0.01, thumbRatio)) * 100}%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* STORIES GRID: Max 6 Cards, 16px gap, No Pagination          */}
            {/* ============================================================ */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="bg-white/10 rounded-[16px] h-[280px] animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-[16px] p-8 text-center text-[#17221F]">
                <p className="font-Inter text-sm font-semibold">{error}</p>
              </div>
            ) : stories.length === 0 ? (
              <div className="bg-white rounded-[16px] p-8 text-center text-[#17221F] flex flex-col items-center gap-3">
                <p className="font-Inter text-[14px] text-neutral-600">
                  Tidak ada cerita aplikan yang sesuai dengan pencarian Anda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                  }}
                  className="bg-[#176B5B] text-white font-Inter text-xs px-4 py-2 rounded-lg hover:bg-[#125548] transition-colors cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {stories.slice(0, 6).map((story) => (
                  <ApplicantStoryCard key={story.id} story={story} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
