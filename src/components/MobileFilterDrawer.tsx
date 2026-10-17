"use client";

import React from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col">
          {/* Header Modal */}
          <SheetHeader>
            <SheetTitle>Filter Peluang</SheetTitle>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-black hover:bg-neutral-200 cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </SheetHeader>

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
      </SheetContent>
    </Sheet>
  );
}
