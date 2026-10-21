"use client";

import { GraduationCap, Award, CalendarCheck2, BadgeX } from "lucide-react";
import { AdminProgramCounts } from "@/hooks/useAdminPrograms";

interface AdminStatCardsProps {
  counts: AdminProgramCounts;
}

export default function AdminStatCards({ counts }: AdminStatCardsProps) {
  const cards = [
    {
      title: "Total Beasiswa",
      count: counts.beasiswa,
      icon: GraduationCap,
    },
    {
      title: "Total Sertifikasi",
      count: counts.sertifikasi,
      icon: Award,
    },
    {
      title: "Masih Aktif",
      count: counts.active,
      icon: CalendarCheck2,
    },
    {
      title: "Belum Terverifikasi",
      count: counts.unverified,
      icon: BadgeX,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-[#176B5B] rounded-[16px] p-6 flex flex-col justify-between shadow-sm min-h-[140px] transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="font-semibold text-[15px] text-white leading-snug max-w-[120px]">
                {card.title}
              </span>
              <Icon className="w-8 h-8 text-white stroke-[1.8] shrink-0" />
            </div>
            <div className="mt-4">
              <span className="text-[44px] font-bold leading-none text-[#F2C94C] font-Sora">
                {card.count}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
