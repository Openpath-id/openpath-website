"use client";

import React from "react";
import { X } from "lucide-react";
import Typography from "@/components/Typography";
import FilterPanel from "@/components/FilterPanel";
import { ProgramFilterCounts } from "@/hooks/useProgramList";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: string;
  selectedEducation: string;
  selectedVerification: string;
  counts: ProgramFilterCounts;
  onSelectType: (type: string) => void;
  onSelectEducation: (education: string) => void;
  onSelectVerification: (verification: string) => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedType,
  selectedEducation,
  selectedVerification,
  counts,
  onSelectType,
  onSelectEducation,
  onSelectVerification,
}: MobileFilterDrawerProps) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isOpen
          ? "pointer-events-auto"
          : "pointer-events-none transition-[visibility] delay-300 invisible"
      }`}
    >
      {/* Backdrop gelap dengan Fade In / Fade Out */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Drawer di kiri dengan Slide In / Slide Out yang mulus */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[85%] max-w-[340px] bg-[#F7F7F2] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Header Modal */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-300">
            <Typography
              as="h2"
              font="Sora"
              weight="bold"
              className="text-[20px] font-bold text-[#17221F]"
            >
              Filter Peluang
            </Typography>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-black hover:bg-neutral-200 cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filter List Body */}
          <div className="mt-4">
            <FilterPanel
              selectedType={selectedType}
              selectedEducation={selectedEducation}
              selectedVerification={selectedVerification}
              counts={counts}
              onSelectType={onSelectType}
              onSelectEducation={onSelectEducation}
              onSelectVerification={onSelectVerification}
              isMobileModal={true}
            />
          </div>
        </div>

        {/* Bottom Button "Kembali" */}
        <div className="pt-6 mt-4 border-t border-neutral-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#176B5B] hover:bg-[#125548] active:scale-[0.98] text-white py-3 rounded-lg font-Inter font-semibold text-[14px] cursor-pointer shadow-md transition-all"
          >
            Kembali
          </button>
        </div>
      </aside>
    </div>
  );
}
