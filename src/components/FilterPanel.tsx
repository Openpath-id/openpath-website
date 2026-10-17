"use client";

import React from "react";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProgramFilterCounts } from "@/hooks/useProgramList";

interface FilterPanelProps {
  selectedType: string;
  selectedEducation: string;
  selectedVerification: string;
  counts: ProgramFilterCounts;
  onSelectType: (type: string) => void;
  onSelectEducation: (education: string) => void;
  onSelectVerification: (verification: string) => void;
  isMobileModal?: boolean;
}

export default function FilterPanel({
  selectedType,
  selectedEducation,
  selectedVerification,
  counts,
  onSelectType,
  onSelectEducation,
  onSelectVerification,
  isMobileModal = false,
}: FilterPanelProps) {
  // Styles difference: Mobile modal is light background (#F7F7F2 / white), Desktop is dark green #17221F
  const isDark = !isMobileModal;

  return (
    <div className={`w-full flex flex-col ${isDark ? "text-white" : "text-[#17221F]"}`}>
      <Accordion
        type="multiple"
        defaultValue={["kategori", "jenjang", "verifikasi"]}
        className="w-full flex flex-col"
      >
        {/* Kategori Peluang */}
        <AccordionItem value="kategori" className="border-b border-neutral-200/20 py-1">
          <AccordionTrigger
            className={`py-2 font-Sora font-bold text-[14px] xl:text-[16px] hover:no-underline ${
              isDark ? "text-white" : "text-[#17221F]"
            }`}
          >
            Kategori Peluang
          </AccordionTrigger>
          <AccordionContent className={isDark ? "text-white" : "text-[#17221F]"}>
            <div className="flex flex-col gap-3 pt-1 pb-1">
              {/* Beasiswa */}
              <label
                onClick={() => onSelectType("beasiswa")}
                className="flex items-center justify-between cursor-pointer group select-none text-[13px] xl:text-[14px]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                      selectedType === "beasiswa"
                        ? isDark
                          ? "border-[#3FB58B] bg-[#3FB58B]"
                          : "border-[#176B5B] bg-[#176B5B]"
                        : isDark
                          ? "border-white/50"
                          : "border-neutral-400"
                    }`}
                  >
                    {selectedType === "beasiswa" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className={selectedType === "beasiswa" ? "font-semibold" : "font-normal"}>
                    Beasiswa Pendidikan
                  </span>
                </div>
                <span className="text-xs opacity-60">({counts.beasiswa})</span>
              </label>

              {/* Sertifikasi */}
              <label
                onClick={() => onSelectType("sertifikasi")}
                className="flex items-center justify-between cursor-pointer group select-none text-[13px] xl:text-[14px]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                      selectedType === "sertifikasi"
                        ? isDark
                          ? "border-[#3FB58B] bg-[#3FB58B]"
                          : "border-[#176B5B] bg-[#176B5B]"
                        : isDark
                          ? "border-white/50"
                          : "border-neutral-400"
                    }`}
                  >
                    {selectedType === "sertifikasi" && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={selectedType === "sertifikasi" ? "font-semibold" : "font-normal"}
                  >
                    Pendanaan Sertifikasi
                  </span>
                </div>
                <span className="text-xs opacity-60">({counts.sertifikasi})</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Jenjang Pendidikan */}
        <AccordionItem value="jenjang" className="border-b border-neutral-200/20 py-1">
          <AccordionTrigger
            className={`py-2 font-Sora font-bold text-[14px] xl:text-[16px] hover:no-underline ${
              isDark ? "text-white" : "text-[#17221F]"
            }`}
          >
            Jenjang Pendidikan
          </AccordionTrigger>
          <AccordionContent className={isDark ? "text-white" : "text-[#17221F]"}>
            <div className="flex flex-col gap-3 pt-1 pb-1">
              {["S1", "S2", "S3"].map((lvl) => {
                const isSelected = selectedEducation === lvl;
                const lvlCount = lvl === "S1" ? counts.s1 : lvl === "S2" ? counts.s2 : counts.s3;

                return (
                  <label
                    key={lvl}
                    onClick={() => onSelectEducation(lvl)}
                    className="flex items-center justify-between cursor-pointer group select-none text-[13px] xl:text-[14px]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? isDark
                              ? "border-[#3FB58B] bg-[#3FB58B]"
                              : "border-[#176B5B] bg-[#176B5B]"
                            : isDark
                              ? "border-white/50"
                              : "border-neutral-400"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className={isSelected ? "font-semibold" : "font-normal"}>{lvl}</span>
                    </div>
                    <span className="text-xs opacity-60">({lvlCount})</span>
                  </label>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Status Verifikasi (Checkboxes) */}
        <AccordionItem value="verifikasi" className="border-b-0 py-1">
          <AccordionTrigger
            className={`py-2 font-Sora font-bold text-[14px] xl:text-[16px] hover:no-underline ${
              isDark ? "text-white" : "text-[#17221F]"
            }`}
          >
            Status Verifikasi
          </AccordionTrigger>
          <AccordionContent className={isDark ? "text-white" : "text-[#17221F]"}>
            <div className="flex flex-col gap-3 pt-1 pb-1">
              {/* Terverifikasi */}
              <label
                onClick={() => onSelectVerification("verified")}
                className="flex items-center justify-between cursor-pointer group select-none text-[13px] xl:text-[14px]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-colors ${
                      selectedVerification === "verified"
                        ? isDark
                          ? "border-[#3FB58B] bg-[#3FB58B] text-black"
                          : "border-[#176B5B] bg-[#176B5B] text-white"
                        : isDark
                          ? "border-white/50"
                          : "border-neutral-400"
                    }`}
                  >
                    {selectedVerification === "verified" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span
                    className={
                      selectedVerification === "verified" ? "font-semibold" : "font-normal"
                    }
                  >
                    Terverifikasi
                  </span>
                </div>
                <span className="text-xs opacity-60">({counts.verified})</span>
              </label>

              {/* Belum Terverifikasi */}
              <label
                onClick={() => onSelectVerification("unverified")}
                className="flex items-center justify-between cursor-pointer group select-none text-[13px] xl:text-[14px]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-colors ${
                      selectedVerification === "unverified"
                        ? isDark
                          ? "border-[#3FB58B] bg-[#3FB58B] text-black"
                          : "border-[#176B5B] bg-[#176B5B] text-white"
                        : isDark
                          ? "border-white/50"
                          : "border-neutral-400"
                    }`}
                  >
                    {selectedVerification === "unverified" && (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                  <span
                    className={
                      selectedVerification === "unverified" ? "font-semibold" : "font-normal"
                    }
                  >
                    Belum Terverifikasi
                  </span>
                </div>
                <span className="text-xs opacity-60">({counts.unverified})</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
