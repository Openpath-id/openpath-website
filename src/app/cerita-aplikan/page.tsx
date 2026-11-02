import React, { Suspense } from "react";
import { Metadata } from "next";
import CeritaAplikanClient from "@/components/cerita-aplikan/CeritaAplikanClient";
import CeritaAplikanSkeleton from "@/components/cerita-aplikan/CeritaAplikanSkeleton";
import { getInitialStories } from "@/lib/stories";

// Next.js 16 (Cache Components) route segment config to allow dynamic blocking route
export const instant = false;

export const metadata: Metadata = {
  title: "Cerita Aplikan",
  description:
    "Kumpulan kisah dan strategi nyata dari para aplikan beasiswa dan pendanaan sertifikasi. Temukan inspirasi dan tips praktis sebelum mendaftar.",
  alternates: { canonical: "/cerita-aplikan" },
};

async function CeritaAplikanFetcher() {
  const initialStories = await getInitialStories(6);
  return <CeritaAplikanClient initialStories={initialStories} />;
}

export default function CeritaAplikanPage() {
  return (
    <Suspense fallback={<CeritaAplikanSkeleton />}>
      <CeritaAplikanFetcher />
    </Suspense>
  );
}
