import React from "react";

export default function StoryDetailSkeleton() {
  return (
    <main className="w-full bg-[#F7F7F2] min-h-screen pt-[46px] pb-[51px] px-6 xl:pt-[84px] xl:pb-[77px] xl:px-[90px] flex justify-center">
      <div className="w-full max-w-[1260px] mx-auto flex flex-col gap-4 xl:gap-6">
        {/* Top bar skeleton */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-neutral-300 animate-pulse" />
            <div className="h-5 w-36 rounded bg-neutral-200 animate-pulse" />
          </div>
          <div className="hidden xl:block h-5 w-40 rounded bg-neutral-200 animate-pulse" />
        </div>

        {/* Card 1 Skeleton */}
        <div className="w-full rounded-[20px] xl:rounded-[24px] p-6 xl:p-8 flex flex-col gap-4 bg-[#0F4936] text-white shadow-md animate-pulse">
          <div className="h-6 w-32 rounded-[20px] bg-white/20" />
          <div className="h-9 w-3/4 rounded-lg bg-white/20" />
          <div className="h-5 w-1/2 rounded bg-white/20" />
        </div>

        {/* Card 2 Skeleton */}
        <div className="w-full rounded-[20px] xl:rounded-[24px] p-4 md:p-6 flex flex-col gap-4 xl:gap-6 bg-[#0F4936] shadow-md">
          {/* White Card 1 */}
          <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-4 shadow-sm animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-300" />
              <div className="h-6 w-48 rounded bg-neutral-200" />
            </div>
            <div className="h-16 w-full rounded bg-neutral-100" />
            <div className="h-20 w-full rounded-[12px] bg-neutral-200" />
          </div>

          {/* White Card 2 */}
          <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-4 shadow-sm animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-300" />
              <div className="h-6 w-44 rounded bg-neutral-200" />
            </div>
            <div className="h-12 w-full rounded bg-neutral-100" />
            <div className="h-12 w-full rounded bg-neutral-100" />
          </div>
        </div>

        {/* Card 3 Skeleton */}
        <div className="w-full rounded-[20px] xl:rounded-[24px] p-4 md:p-6 flex flex-col gap-4 bg-[#0F4936] shadow-md">
          <div className="bg-white rounded-[16px] p-5 md:p-6 flex flex-col gap-4 shadow-sm animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-neutral-300" />
              <div className="h-6 w-52 rounded bg-neutral-200" />
            </div>
            <div className="h-20 w-full rounded-[12px] bg-neutral-200" />
            <div className="h-14 w-full rounded bg-neutral-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
