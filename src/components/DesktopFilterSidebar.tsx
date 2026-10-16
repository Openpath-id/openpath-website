"use client";

import React from "react";
import Typography from "@/components/Typography";
import FilterPanel from "@/components/FilterPanel";
import { ProgramFilterCounts } from "@/hooks/useProgramList";

interface DesktopFilterSidebarProps {
  selectedType: string;
  selectedEducation: string;
  selectedVerification: string;
  counts: ProgramFilterCounts;
  onSelectType: (type: string) => void;
  onSelectEducation: (education: string) => void;
  onSelectVerification: (verification: string) => void;
}

export default function DesktopFilterSidebar({
  selectedType,
  selectedEducation,
  selectedVerification,
  counts,
  onSelectType,
  onSelectEducation,
  onSelectVerification,
}: DesktopFilterSidebarProps) {
  return (
    <aside className="hidden xl:flex w-[290px] shrink-0 bg-[#17221F] rounded-[16px] p-6 flex-col text-white shadow-md">
      <Typography as="h3" font="Sora" weight="bold" className="text-white text-[20px] mb-4">
        Filter Peluang
      </Typography>

      <FilterPanel
        selectedType={selectedType}
        selectedEducation={selectedEducation}
        selectedVerification={selectedVerification}
        counts={counts}
        onSelectType={onSelectType}
        onSelectEducation={onSelectEducation}
        onSelectVerification={onSelectVerification}
        isMobileModal={false}
      />
    </aside>
  );
}
