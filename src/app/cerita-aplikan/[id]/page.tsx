import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getStoryByIdOrSlug } from "@/lib/stories";
import StoryDetailClient from "@/components/story-detail/StoryDetailClient";
import StoryDetailSkeleton from "@/components/story-detail/StoryDetailSkeleton";

// Next.js 16 route segment config to allow dynamic blocking route
export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = await getStoryByIdOrSlug(id);

  if (!story) {
    return {
      title: "Cerita Aplikan Tidak Ditemukan",
      description: "Cerita aplikan yang dicari tidak ditemukan.",
    };
  }

  const description =
    story.excerpt || story.story_overview || "Kisah inspiratif dan strategi aplikan di OpenPath.";
  const canonical = `/cerita-aplikan/${story.slug || story.id}`;

  return {
    title: `${story.title} - Cerita Aplikan`,
    description,
    alternates: { canonical },
    openGraph: { title: story.title, description, url: canonical, type: "article" },
  };
}

async function StoryDetailFetcher({ params }: PageProps) {
  const { id } = await params;
  const story = await getStoryByIdOrSlug(id);

  if (!story) {
    return (
      <main className="w-full bg-[#F7F7F2] min-h-screen py-16 px-6 flex justify-center items-center">
        <div className="bg-white p-8 rounded-[20px] max-w-md text-center shadow-sm flex flex-col items-center gap-4">
          <h1 className="font-Sora text-xl font-bold text-[#17221F]">Cerita Tidak Ditemukan</h1>
          <p className="font-Inter text-sm text-neutral-600">
            Kisah aplikan yang kamu cari tidak tersedia atau belum dipublikasikan.
          </p>
          <Link
            href="/cerita-aplikan"
            className="px-5 py-2.5 rounded-lg bg-[#176B5B] text-white text-sm font-semibold hover:bg-[#125548] transition-colors"
          >
            Kembali ke Cerita Aplikan
          </Link>
        </div>
      </main>
    );
  }

  return <StoryDetailClient story={story} />;
}

export default function StoryDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<StoryDetailSkeleton />}>
      <StoryDetailFetcher params={params} />
    </Suspense>
  );
}
