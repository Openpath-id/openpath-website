import React from "react";
import Link from "next/link";
import { User, ArrowRight } from "lucide-react";
import Typography from "@/components/Typography";
import { ApplicantStory } from "@/data/stories";

interface ApplicantStoryCardProps {
  story: ApplicantStory;
}

export default function ApplicantStoryCard({ story }: ApplicantStoryCardProps) {
  const authorName = story.author_name || story.authorName || "Aplikan OpenPath";
  const authorRole = story.author_role || story.authorRole || "Awardee";

  return (
    <article className="bg-white rounded-[16px] p-5 md:p-6 text-[#17221F] flex flex-col justify-between gap-4 shadow-sm h-full">
      <div className="flex flex-col gap-3">
        {/* Badge Kategori */}
        <div className="self-start px-2.5 py-0.5 rounded-[19px] border border-[#176B5B] bg-[#DCEFE7]">
          <span className="font-Inter text-[11px] font-medium text-[#176B5B]">{story.badge}</span>
        </div>

        {/* Info Penulis / Profil */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#DCEFE7] text-[#176B5B] flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-[#176B5B]" />
          </div>
          <div className="flex flex-col">
            <span className="font-Sora font-bold text-[14px] text-[#17221F] leading-tight">
              {authorName}
            </span>
            <span className="font-Inter text-[12px] text-neutral-500 leading-normal mt-0.5">
              {authorRole}
            </span>
          </div>
        </div>

        {/* Divider Tipis */}
        <div className="border-b border-neutral-200 my-1" />

        {/* Judul Cerita */}
        <Typography
          as="h3"
          font="Sora"
          weight="bold"
          className="text-[15px] font-bold text-[#17221F] leading-snug line-clamp-2"
        >
          {story.title}
        </Typography>

        {/* Cuplikan / Excerpt */}
        <p className="font-Inter text-[12px] text-neutral-600 leading-relaxed line-clamp-4">
          {story.excerpt}
        </p>
      </div>

      {/* CTA Button Detail */}
      <Link
        href={`/cerita-aplikan/${story.slug}`}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#176B5B] hover:bg-[#125548] active:scale-[0.99] text-white text-[13px] font-semibold transition-all mt-2 cursor-pointer shadow-sm"
      >
        <span>Lihat detail</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
}
