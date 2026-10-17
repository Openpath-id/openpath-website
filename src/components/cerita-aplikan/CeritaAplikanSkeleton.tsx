import React from "react";

export default function CeritaAplikanSkeleton() {
  return (
    <main className="w-full bg-[#F7F7F2] min-h-screen pt-[83px] pb-[61px] px-6 xl:pt-[80px] xl:pb-[100px] xl:px-[90px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto flex flex-col gap-6 md:gap-8">
        {/* Header Skeleton */}
        <header className="flex flex-col gap-3">
          <div className="h-9 md:h-12 w-64 md:w-96 rounded-lg bg-neutral-300/70 animate-pulse" />
          <div className="h-4 w-72 md:w-[500px] rounded bg-neutral-200 animate-pulse" />
        </header>

        {/* Main Section Skeleton */}
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
              <div className="flex flex-col gap-2 max-w-[480px]">
                <div className="h-10 w-64 rounded bg-white/20 animate-pulse" />
                <div className="h-5 w-80 rounded bg-white/10 animate-pulse" />
              </div>

              <div className="flex flex-col gap-3 w-full xl:w-fit shrink-0">
                <div className="h-[38px] w-full rounded-[10px] bg-white/20 animate-pulse" />
                <div className="w-fit max-w-full bg-white rounded-[12px] px-[9px] py-[8px] flex flex-col gap-1.5">
                  <div className="flex gap-[6px]">
                    <div className="h-[38px] w-24 rounded-[8px] bg-neutral-300 animate-pulse" />
                    <div className="h-[38px] w-40 rounded-[8px] bg-neutral-200 animate-pulse" />
                    <div className="h-[38px] w-44 rounded-[8px] bg-neutral-200 animate-pulse" />
                  </div>
                  <div className="w-full px-1 max-[500px]:block hidden">
                    <div className="w-full h-[5px] bg-[#E5E7EB] rounded-full overflow-hidden relative">
                      <div className="h-full w-1/3 bg-[#176B5B] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stories Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="bg-white/10 rounded-[16px] h-[280px] animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
