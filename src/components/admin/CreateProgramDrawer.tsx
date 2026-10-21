"use client";

import { useEffect } from "react";
import {
  X,
  GraduationCap,
  Award,
  Calendar,
  ChevronDown,
  GripVertical,
  Trash2,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { Program } from "@/types/program";
import { useCreateProgram } from "@/hooks/useCreateProgram";

interface CreateProgramDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newProgram: Program) => void;
  isSidebarOpen?: boolean;
}

interface CreateProgramFormProps {
  onClose: () => void;
  onSuccess: (newProgram: Program) => void;
}

function CreateProgramForm({ onClose, onSuccess }: CreateProgramFormProps) {
  const {
    saving,
    type,
    setType,
    name,
    setName,
    organizer,
    setOrganizer,
    isVerified,
    setIsVerified,
    educationLevels,
    toggleEducationLevel,
    destinationScope,
    setDestinationScope,
    deadlineDate,
    setDeadlineDate,
    scheduleNotes,
    setScheduleNotes,
    criteriaList,
    handleAddCriteria,
    handleUpdateCriteria,
    handleRemoveCriteria,
    handleClearAllCriteria,
    benefitSummary,
    setBenefitSummary,
    benefitList,
    handleAddBenefit,
    handleUpdateBenefit,
    handleRemoveBenefit,
    handleClearAllBenefits,
    errors,
    handleSubmit,
  } = useCreateProgram({ onSuccess, onClose });

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 lg:p-[40px]">
      {/* Header */}
      <div className="flex items-start justify-between pb-6 border-b border-neutral-100">
        <div>
          <h1 className="text-[22px] lg:text-[24px] font-bold text-[#14251F] tracking-tight leading-tight font-Sora">
            Tambah Peluang Baru
          </h1>
          <p className="text-[13px] lg:text-[14px] text-[#526058] mt-1.5 leading-snug">
            Isi formulir berikut untuk menerbitkan program baru
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup form tambah"
          className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors shrink-0 ml-2 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 pt-6">
        {/* =================================================================== */}
        {/* 1. Informasi Utama                                                  */}
        {/* =================================================================== */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-[#176B5B] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
              1
            </div>
            <h2 className="text-[17px] font-bold text-[#14251F] font-Sora">Informasi Utama</h2>
          </div>

          {/* Kategori Peluang */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Kategori Peluang <span className="text-[#EB5757]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Beasiswa */}
              <button
                type="button"
                onClick={() => setType("beasiswa")}
                className={`flex items-start gap-3 p-3.5 rounded-[12px] border text-left transition-all cursor-pointer ${
                  type === "beasiswa"
                    ? "border-2 border-[#176B5B] bg-[#EAF7F3]/30 ring-1 ring-[#176B5B]"
                    : errors.type
                      ? "border-[#C54A4A] bg-red-50/20"
                      : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${
                    type === "beasiswa"
                      ? "bg-[#176B5B] text-white"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#17221F] leading-tight">
                    Beasiswa Pendidikan
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 leading-tight">
                    Bantuan dana pendidikan formal
                  </span>
                </div>
              </button>

              {/* Option 2: Sertifikasi */}
              <button
                type="button"
                onClick={() => setType("sertifikasi")}
                className={`flex items-start gap-3 p-3.5 rounded-[12px] border text-left transition-all cursor-pointer ${
                  type === "sertifikasi"
                    ? "border-2 border-[#176B5B] bg-[#EAF7F3]/30 ring-1 ring-[#176B5B]"
                    : errors.type
                      ? "border-[#C54A4A] bg-red-50/20"
                      : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${
                    type === "sertifikasi"
                      ? "bg-[#176B5B] text-white"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#17221F] leading-tight">
                    Pendanaan Sertifikasi
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 leading-tight">
                    Biaya sertifikasi serta pelatihan
                  </span>
                </div>
              </button>
            </div>
            {errors.type && (
              <span className="text-[11px] text-[#C54A4A] font-medium">{errors.type}</span>
            )}
          </div>

          {/* Nama Program/Skema */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Nama Program/Skema <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama program/skema"
              className={`w-full h-[44px] px-3.5 rounded-[8px] border text-[13px] text-[#17221F] placeholder-[#9B9FA7] outline-none transition-all ${
                errors.name
                  ? "border-[#C54A4A] ring-1 ring-[#C54A4A] bg-red-50/10"
                  : "border-neutral-300 focus:border-[#176B5B] focus:ring-1 focus:ring-[#176B5B]"
              }`}
            />
            {errors.name && (
              <span className="text-[11px] text-[#C54A4A] font-medium">{errors.name}</span>
            )}
          </div>

          {/* Row: Penyelenggara & Status Verifikasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#17221F]">
                Penyelenggara Resmi <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="Masukkan nama penyelenggara"
                className={`w-full h-[44px] px-3.5 rounded-[8px] border text-[13px] text-[#17221F] placeholder-[#9B9FA7] outline-none transition-all ${
                  errors.organizer
                    ? "border-[#C54A4A] ring-1 ring-[#C54A4A] bg-red-50/10"
                    : "border-neutral-300 focus:border-[#176B5B] focus:ring-1 focus:ring-[#176B5B]"
                }`}
              />
              {errors.organizer && (
                <span className="text-[11px] text-[#C54A4A] font-medium">{errors.organizer}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#17221F]">
                Status Verifikasi <span className="text-[#EB5757]">*</span>
              </label>
              <div className="relative">
                <select
                  value={isVerified}
                  onChange={(e) => setIsVerified(e.target.value)}
                  className={`w-full h-[44px] pl-3.5 pr-8 rounded-[8px] border text-[13px] bg-white outline-none appearance-none cursor-pointer transition-all ${
                    !isVerified ? "text-[#9B9FA7]" : "text-[#17221F]"
                  } ${
                    errors.isVerified
                      ? "border-[#C54A4A] ring-1 ring-[#C54A4A]"
                      : "border-neutral-300 focus:border-[#176B5B] focus:ring-1 focus:ring-[#176B5B]"
                  }`}
                >
                  <option value="" disabled className="text-[#9B9FA7]">
                    Tentukan status verifikasi
                  </option>
                  <option value="verified" className="text-[#17221F]">
                    Terverifikasi
                  </option>
                  <option value="unverified" className="text-[#17221F]">
                    Belum Terverifikasi
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#9B9FA7] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.isVerified && (
                <span className="text-[11px] text-[#C54A4A] font-medium">{errors.isVerified}</span>
              )}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. Klasifikasi Cepat                                                */}
        {/* =================================================================== */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-[#176B5B] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
              2
            </div>
            <h2 className="text-[17px] font-bold text-[#14251F] font-Sora">Klasifikasi Cepat</h2>
          </div>

          {/* Jenjang/Sasaran Pills */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Jenjang/Sasaran <span className="text-[#EB5757]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "D3/D4", key: "D3" },
                { label: "S1 (Sarjana)", key: "S1" },
                { label: "S2 (Magister)", key: "S2" },
                { label: "S3 (Doktoral)", key: "S3" },
              ].map((level) => {
                const isSelected = educationLevels.some(
                  (l) => l.toUpperCase() === level.key.toUpperCase(),
                );
                return (
                  <button
                    key={level.key}
                    type="button"
                    onClick={() => toggleEducationLevel(level.key)}
                    className={`h-[40px] px-2 rounded-[8px] text-[12px] font-semibold transition-all cursor-pointer text-center ${
                      isSelected
                        ? "bg-[#176B5B] text-white shadow-sm"
                        : "bg-[#BDC4C0] hover:bg-[#aab1ad] text-white"
                    }`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>
            {errors.educationLevels && (
              <span className="text-[11px] text-[#C54A4A] font-medium">
                {errors.educationLevels}
              </span>
            )}
          </div>

          {/* Cakupan Wilayah Radio Group */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Cakupan Wilayah / Skema <span className="text-[#EB5757]">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#17221F]">
              {["Dalam Negeri", "Luar Negeri", "Dalam Negeri & Luar Negeri"].map((scope) => (
                <label
                  key={scope}
                  className="inline-flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="destination_scope"
                    checked={destinationScope === scope}
                    onChange={() => setDestinationScope(scope)}
                    className="w-4 h-4 text-[#176B5B] focus:ring-[#176B5B] cursor-pointer accent-[#176B5B]"
                  />
                  <span>{scope}</span>
                </label>
              ))}
            </div>
            {errors.destinationScope && (
              <span className="text-[11px] text-[#C54A4A] font-medium">
                {errors.destinationScope}
              </span>
            )}
          </div>

          {/* Batas Waktu */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Batas Waktu <span className="text-[#EB5757]">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#9B9FA7]">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                placeholder="DD/MM/YY"
                className={`w-full h-[44px] pl-10 pr-3.5 rounded-[8px] border text-[13px] outline-none cursor-pointer transition-all ${
                  !deadlineDate ? "text-[#9B9FA7]" : "text-[#17221F]"
                } ${
                  errors.deadlineDate
                    ? "border-[#C54A4A] ring-1 ring-[#C54A4A]"
                    : "border-neutral-300 focus:border-[#176B5B] focus:ring-1 focus:ring-[#176B5B]"
                }`}
              />
            </div>
            {errors.deadlineDate && (
              <span className="text-[11px] text-[#C54A4A] font-medium">{errors.deadlineDate}</span>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. Ringkasan Program                                                */}
        {/* =================================================================== */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-[#176B5B] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
              3
            </div>
            <h2 className="text-[17px] font-bold text-[#14251F] font-Sora">Ringkasan Program</h2>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Deskripsi Ringkasan &amp; Cakupan Program <span className="text-[#EB5757]">*</span>
            </label>
            <textarea
              rows={4}
              value={scheduleNotes}
              onChange={(e) => setScheduleNotes(e.target.value)}
              placeholder="Masukkan ringkasan program"
              className={`w-full p-3.5 rounded-[8px] border text-[13px] text-[#17221F] placeholder-[#9B9FA7] outline-none transition-all resize-none leading-relaxed ${
                errors.scheduleNotes
                  ? "border-[#C54A4A] ring-1 ring-[#C54A4A] bg-red-50/10"
                  : "border-neutral-300 focus:border-[#176B5B] focus:ring-1 focus:ring-[#176B5B]"
              }`}
            />
            {errors.scheduleNotes && (
              <span className="text-[11px] text-[#C54A4A] font-medium">{errors.scheduleNotes}</span>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. Syarat Kelayakan                                                 */}
        {/* =================================================================== */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-[#176B5B] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
              4
            </div>
            <h2 className="text-[17px] font-bold text-[#14251F] font-Sora">Syarat Kelayakan</h2>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Daftar Kriteria Mutlak <span className="text-[#EB5757]">*</span>
            </label>

            {/* Criteria List */}
            <div className="flex flex-col gap-2.5">
              {criteriaList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`flex-1 flex items-center border rounded-[8px] bg-white h-[44px] px-3 transition-all ${
                      errors.criteriaList && !item.trim()
                        ? "border-[#C54A4A]"
                        : "border-neutral-300 focus-within:border-[#176B5B] focus-within:ring-1 focus-within:ring-[#176B5B]"
                    }`}
                  >
                    <GripVertical className="w-4 h-4 text-[#9B9FA7] shrink-0 select-none mr-2" />
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleUpdateCriteria(idx, e.target.value)}
                      placeholder="Ini kriteria program"
                      className="w-full h-full bg-transparent text-[13px] text-[#17221F] placeholder-[#9B9FA7] outline-none border-0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCriteria(idx)}
                    aria-label={`Hapus kriteria ${idx + 1}`}
                    className="w-[42px] h-[44px] rounded-[8px] bg-[#C54A4A] hover:bg-[#ab3f3f] text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.criteriaList && (
              <span className="text-[11px] text-[#C54A4A] font-medium">{errors.criteriaList}</span>
            )}

            {/* Criteria Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleClearAllCriteria}
                className="h-[36px] px-3.5 rounded-[8px] border border-[#C54A4A] text-[#C54A4A] hover:bg-red-50 text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Semua</span>
              </button>
              <button
                type="button"
                onClick={handleAddCriteria}
                className="h-[36px] px-3.5 rounded-[8px] bg-[#176B5B] hover:bg-[#125548] text-white text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tambah kriteria</span>
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 5. Komponen Benefit                                                 */}
        {/* =================================================================== */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-[#176B5B] text-white font-bold text-[13px] flex items-center justify-center shrink-0">
              5
            </div>
            <h2 className="text-[17px] font-bold text-[#14251F] font-Sora">Komponen Benefit</h2>
          </div>

          {/* Ringkasan Benefit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Ringkasan Benefit <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              value={benefitSummary}
              onChange={(e) => setBenefitSummary(e.target.value)}
              placeholder="Masukkan ringkasan program"
              className={`w-full h-[44px] px-3.5 rounded-[8px] border text-[13px] text-[#17221F] placeholder-[#9B9FA7] outline-none transition-all ${
                errors.benefitSummary
                  ? "border-[#C54A4A] ring-1 ring-[#C54A4A] bg-red-50/10"
                  : "border-neutral-300 focus:border-[#176B5B] focus:ring-1 focus:ring-[#176B5B]"
              }`}
            />
            {errors.benefitSummary && (
              <span className="text-[11px] text-[#C54A4A] font-medium">
                {errors.benefitSummary}
              </span>
            )}
          </div>

          {/* Daftar Rincian Benefit */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-semibold text-[#17221F]">
              Daftar Rincian Benefit <span className="text-[#EB5757]">*</span>
            </label>

            {/* Benefit List */}
            <div className="flex flex-col gap-2.5">
              {benefitList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`flex-1 flex items-center border rounded-[8px] bg-white h-[44px] px-3 transition-all ${
                      errors.benefitList && !item.trim()
                        ? "border-[#C54A4A]"
                        : "border-neutral-300 focus-within:border-[#176B5B] focus-within:ring-1 focus-within:ring-[#176B5B]"
                    }`}
                  >
                    <GripVertical className="w-4 h-4 text-[#9B9FA7] shrink-0 select-none mr-2" />
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleUpdateBenefit(idx, e.target.value)}
                      placeholder="Ini kriteria program"
                      className="w-full h-full bg-transparent text-[13px] text-[#17221F] placeholder-[#9B9FA7] outline-none border-0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    aria-label={`Hapus benefit ${idx + 1}`}
                    className="w-[42px] h-[44px] rounded-[8px] bg-[#C54A4A] hover:bg-[#ab3f3f] text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.benefitList && (
              <span className="text-[11px] text-[#C54A4A] font-medium">{errors.benefitList}</span>
            )}

            {/* Benefit Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleClearAllBenefits}
                className="h-[36px] px-3.5 rounded-[8px] border border-[#C54A4A] text-[#C54A4A] hover:bg-red-50 text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Semua</span>
              </button>
              <button
                type="button"
                onClick={handleAddBenefit}
                className="h-[36px] px-3.5 rounded-[8px] bg-[#176B5B] hover:bg-[#125548] text-white text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tambah benefit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Buttons */}
        <div className="pt-6 pb-2 border-t border-neutral-100 flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex-1 h-[46px] rounded-[8px] border-2 border-neutral-300 hover:bg-neutral-50 text-[#17221F] font-semibold text-[14px] transition-colors cursor-pointer disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 h-[46px] rounded-[8px] bg-[#176B5B] hover:bg-[#125548] active:scale-[0.99] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan Perubahan</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CreateProgramDrawer({
  isOpen,
  onClose,
  onSuccess,
  isSidebarOpen = true,
}: CreateProgramDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sidebarOffsetClass = isSidebarOpen ? "lg:left-[240px]" : "lg:left-[80px]";

  return (
    <>
      {/* Backdrop (Dimming main content, calculated from sidebar) */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 ${sidebarOffsetClass} z-40 bg-black/25 backdrop-blur-[1px] transition-opacity duration-300`}
      />

      {/* Slide-over Create Drawer (Width ~500px on desktop) */}
      <aside
        aria-label="Panel Tambah Peluang Baru"
        className="fixed top-0 bottom-0 right-0 z-50 w-full sm:w-[500px] lg:w-[500px] bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300 font-Inter"
      >
        <CreateProgramForm onClose={onClose} onSuccess={onSuccess} />
      </aside>
    </>
  );
}
