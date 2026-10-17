import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getProgramByIdOrSlug } from "@/lib/programs";
import { getRelatedStories } from "@/lib/stories";
import ProgramDetailClient from "@/components/program-detail/ProgramDetailClient";
import ProgramDetailSkeleton from "@/components/program-detail/ProgramDetailSkeleton";

// Next.js 16 (Cache Components) route segment config to allow dynamic blocking route
export const instant = false;

export const metadata: Metadata = {
  title: "Detail Program | OpenPath",
  description: "Informasi detail pendaftaran beasiswa dan pendanaan sertifikasi di OpenPath.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function ProgramDetailFetcher({ params }: PageProps) {
  const { id } = await params;
  const program = await getProgramByIdOrSlug(id);

  if (!program) {
    return (
      <main className="w-full bg-[#F7F7F2] min-h-screen pt-[46px] pb-[51px] px-6 xl:pt-[84px] xl:pb-[77px] xl:px-[90px] flex justify-center items-center">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-md flex flex-col items-center gap-4">
          <p className="font-Inter text-[16px] font-semibold text-[#17221F]">
            Program tidak ditemukan atau telah dihapus.
          </p>
          <Link
            href="/list"
            className="bg-[#176B5B] text-white font-Inter text-sm px-6 py-2.5 rounded-lg hover:bg-[#125548] transition-colors"
          >
            Kembali ke Daftar Program
          </Link>
        </div>
      </main>
    );
  }

  const stories = await getRelatedStories(program.id, 2);

  return <ProgramDetailClient program={program} initialStories={stories} />;
}

export default function ProgramDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProgramDetailSkeleton />}>
      <ProgramDetailFetcher params={params} />
    </Suspense>
  );
}
