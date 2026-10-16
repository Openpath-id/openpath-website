"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
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
  const [openKategori, setOpenKategori] = useState(true);
  const [openJenjang, setOpenJenjang] = useState(true);
  const [openVerifikasi, setOpenVerifikasi] = useState(true);

  // Styles difference: Mobile modal is light background (#F7F7F2 / white), Desktop is dark green #17221F
  const isDark = !isMobileModal;

  return (
    <div className={`w-full flex flex-col ${isDark ? "text-white" : "text-[#17221F]"}`}>
      {/* Kategori Peluang */}
      <div className="flex flex-col py-3 border-b border-neutral-200/20">
        <button
          type="button"
          onClick={() => setOpenKategori(!openKategori)}
          className="flex items-center justify-between w-full cursor-pointer py-1 text-left font-Sora font-bold text-[14px] xl:text-[16px] group select-none"
        >
          <span>Kategori Peluang</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
              openKategori ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            openKategori ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden min-h-0">
            <div className="flex flex-col gap-3 pt-3">
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
          </div>
        </div>
      </div>

      {/* Jenjang Pendidikan */}
      <div className="flex flex-col py-3 border-b border-neutral-200/20">
        <button
          type="button"
          onClick={() => setOpenJenjang(!openJenjang)}
          className="flex items-center justify-between w-full cursor-pointer py-1 text-left font-Sora font-bold text-[14px] xl:text-[16px] group select-none"
        >
          <span>Jenjang Pendidikan</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
              openJenjang ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            openJenjang ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden min-h-0">
            <div className="flex flex-col gap-3 pt-3">
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
          </div>
        </div>
      </div>

      {/* Status Verifikasi (Checkboxes) */}
      <div className="flex flex-col py-3">
        <button
          type="button"
          onClick={() => setOpenVerifikasi(!openVerifikasi)}
          className="flex items-center justify-between w-full cursor-pointer py-1 text-left font-Sora font-bold text-[14px] xl:text-[16px] group select-none"
        >
          <span>Status Verifikasi</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
              openVerifikasi ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            openVerifikasi ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden min-h-0">
            <div className="flex flex-col gap-3 pt-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
