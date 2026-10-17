import React from "react";

export default function ProgramDetailSkeleton() {
  return (
    <main className="w-full bg-[#F7F7F2] min-h-screen pt-[46px] pb-[51px] px-6 xl:pt-[84px] xl:pb-[77px] xl:px-[90px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto flex flex-col gap-4 xl:gap-6 animate-pulse">
        {/* Top bar skeleton */}
        <div className="flex items-center justify-between w-full">
          <div className="w-32 h-10 bg-neutral-200 rounded-[10px]" />
          <div className="hidden xl:block w-36 h-5 bg-neutral-200 rounded" />
        </div>

        {/* Card 1 Header skeleton */}
        <div className="w-full h-[220px] md:h-[180px] bg-[#0F4936]/20 rounded-[20px] xl:rounded-[24px]" />

        {/* Card 2 & 3 Grid skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6">
          <div className="w-full xl:col-span-8 h-[420px] bg-[#0F4936]/15 rounded-[20px] xl:rounded-[24px]" />
          <div className="w-full xl:col-span-4 h-[420px] bg-[#0F4936]/15 rounded-[20px] xl:rounded-[24px]" />
        </div>

        {/* Card 4 Stories skeleton */}
        <div className="w-full h-[360px] bg-[#0F4936]/20 rounded-[20px] xl:rounded-[24px]" />
      </div>
    </main>
  );
}
