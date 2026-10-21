"use client";

import {
  GraduationCap,
  Award,
  CalendarCheck,
  ShieldAlert,
  Search,
  Download,
  PlusCircle,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileBadge,
  BadgeX,
  CalendarCheck2,
} from "lucide-react";
import { useAdminPrograms } from "@/hooks/useAdminPrograms";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Program } from "@/types/program";

// Format date into Indonesian readable format e.g. "10 November 2026"
function formatDate(dateString?: string | null) {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export default function AdminListingPage() {
  const {
    programs,
    totalPages,
    counts,
    loading,
    error,
    search,
    setSearch,
    type,
    setType,
    educationLevel,
    setEducationLevel,
    verification,
    setVerification,
    sort,
    setSort,
    page,
    setPage,
    selectedIds,
    toggleRow,
    toggleSelectAll,
    isAllSelected,
    exportList,
  } = useAdminPrograms();

  const handleEdit = (program: Program) => {
    toast.info("Mode Edit", {
      description: `Mengedit program: ${program.name}`,
    });
  };

  const handleDelete = (program: Program) => {
    toast.error("Konfirmasi Hapus", {
      description: `Program "${program.name}" akan dihapus.`,
      action: {
        label: "Hapus",
        onClick: () => {
          toast.success("Program berhasil dihapus");
        },
      },
    });
  };

  return (
    <div
      className="w-full flex flex-col pt-6 px-4 pb-8 lg:pt-[94px] lg:pr-[61px] lg:pb-[36px] lg:pl-[48px]"
      style={{ fontFamily: "var(--font-Inter), Inter, sans-serif" }}
    >
      {/* ========================================================================= */}
      {/* 1. Header (Title & Subtitle)                                              */}
      {/* ========================================================================= */}
      <div>
        <h1
          className="text-[32px] md:text-[36px] font-bold text-[#17221F] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
        >
          Kelola Listing
        </h1>
        <p className="text-[15px] md:text-[16px] font-normal text-[#555E5B] mt-2">
          Kelola basis data beasiswa dan pendanaan sertifikasi terkurasi untuk mahasiswa sains dan
          analitika.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. 4 Stat Cards (Integrated with Real Database Counts)                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {/* Card 1: Beasiswa Pendidikan */}
        <div className="bg-[#176B5B] rounded-[16px] p-6 flex flex-col justify-between shadow-sm min-h-[140px] transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-[15px] text-white leading-snug max-w-[120px]">
              Beasiswa
              <br />
              Pendidikan
            </span>
            <GraduationCap className="w-8 h-8 text-white stroke-[1.8] shrink-0" />
          </div>
          <div className="mt-4">
            <span
              className="text-[44px] font-bold leading-none text-[#F2C94C]"
              style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
            >
              {counts.beasiswa}
            </span>
          </div>
        </div>

        {/* Card 2: Pendanaan Sertifikasi */}
        <div className="bg-[#176B5B] rounded-[16px] p-6 flex flex-col justify-between shadow-sm min-h-[140px] transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-[15px] text-white leading-snug max-w-[120px]">
              Pendanaan
              <br />
              Sertifikasi
            </span>
            <FileBadge className="w-8 h-8 text-white stroke-[1.8] shrink-0" />
          </div>
          <div className="mt-4">
            <span
              className="text-[44px] font-bold leading-none text-[#F2C94C]"
              style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
            >
              {counts.sertifikasi}
            </span>
          </div>
        </div>

        {/* Card 3: Masih Aktif */}
        <div className="bg-[#176B5B] rounded-[16px] p-6 flex flex-col justify-between shadow-sm min-h-[140px] transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-[15px] text-white leading-snug max-w-[120px]">
              Masih
              <br />
              Aktif
            </span>
            <CalendarCheck2 className="w-8 h-8 text-white stroke-[1.8] shrink-0" />
          </div>
          <div className="mt-4">
            <span
              className="text-[44px] font-bold leading-none text-[#F2C94C]"
              style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
            >
              {counts.active}
            </span>
          </div>
        </div>

        {/* Card 4: Belum Terverifikasi */}
        <div className="bg-[#176B5B] rounded-[16px] p-6 flex flex-col justify-between shadow-sm min-h-[140px] transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-[15px] text-white leading-snug max-w-[120px]">
              Belum
              <br />
              Terverifikasi
            </span>
            <BadgeX className="w-8 h-8 text-white stroke-[1.8] shrink-0" />
          </div>
          <div className="mt-4">
            <span
              className="text-[44px] font-bold leading-none text-[#F2C94C]"
              style={{ fontFamily: "var(--font-Sora), Sora, sans-serif" }}
            >
              {counts.unverified}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Search and Filter Container                                            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[16px] p-5 md:p-6 shadow-sm border border-neutral-200/80 mt-8 flex flex-col gap-4">
        {/* Row 1: Search Input & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#9B9FA7] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari program atau penyelenggara..."
              className="w-full h-[46px] pl-11 pr-4 rounded-[10px] bg-[#F4F6F5] text-[#17221F] placeholder-[#9B9FA7] text-[14px] border-0 outline-none focus:ring-1 focus:ring-[#176B5B] transition-all"
            />
          </div>

          {/* Button Ekspor List */}
          <button
            type="button"
            onClick={exportList}
            className="h-[46px] px-5 rounded-[10px] border-2 border-[#176B5B] text-[#176B5B] bg-white hover:bg-[#DCEFE7]/30 active:scale-[0.99] font-semibold text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor List</span>
          </button>

          {/* Button Tambah Listing Baru */}
          <button
            type="button"
            onClick={() =>
              toast.info("Tambah Listing", {
                description: "Formulir penambahan program baru.",
              })
            }
            className="h-[46px] px-5 rounded-[10px] bg-[#176B5B] hover:bg-[#125548] active:scale-[0.99] text-white font-semibold text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Listing Baru</span>
          </button>
        </div>

        {/* Row 2: 4 Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
          {/* Filter Kategori */}
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Pilih kategori"
              className="w-full h-[42px] pl-3.5 pr-8 rounded-[10px] bg-[#F4F6F5] text-[#717A75] text-[13px] font-medium border-0 outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#176B5B]"
            >
              <option value="all">Pilih kategori</option>
              <option value="beasiswa">Beasiswa</option>
              <option value="sertifikasi">Sertifikasi</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#717A75] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter Jenjang Pendidikan */}
          <div className="relative">
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              aria-label="Pilih jenjang pendidikan"
              className="w-full h-[42px] pl-3.5 pr-8 rounded-[10px] bg-[#F4F6F5] text-[#717A75] text-[13px] font-medium border-0 outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#176B5B]"
            >
              <option value="all">Pilih jenjang pendidikan</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#717A75] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter Status Verifikasi */}
          <div className="relative">
            <select
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
              aria-label="Pilih status verifikasi"
              className="w-full h-[42px] pl-3.5 pr-8 rounded-[10px] bg-[#F4F6F5] text-[#717A75] text-[13px] font-medium border-0 outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#176B5B]"
            >
              <option value="all">Pilih status verifikasi</option>
              <option value="verified">Terverifikasi</option>
              <option value="unverified">Belum Terverifikasi</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#717A75] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter Urutkan Berdasarkan */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Urutkan berdasarkan"
              className="w-full h-[42px] pl-3.5 pr-8 rounded-[10px] bg-[#F4F6F5] text-[#717A75] text-[13px] font-medium border-0 outline-none cursor-pointer appearance-none focus:ring-1 focus:ring-[#176B5B]"
            >
              <option value="nearest">Urutkan berdasarkan</option>
              <option value="nearest">Deadline Terdekat</option>
              <option value="furthest">Deadline Terjauh</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#717A75] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Table with Selection & Unclipped Sticky Action Column                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[16px] shadow-sm border border-neutral-200/80 mt-6 overflow-hidden">
        {/* Table wrapper allowing horizontal scroll while action column stays sticky and unclipped */}
        <div className="w-full overflow-x-auto relative">
          <table className="w-full text-left border-collapse min-w-[980px]">
            <thead>
              <tr className="border-b border-neutral-100 bg-white">
                <th className="py-4 px-4 w-[48px] text-center">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Pilih semua baris"
                  />
                </th>
                <th className="py-4 px-4 font-bold text-[13px] text-[#17221F]">Nama Program</th>
                <th className="py-4 px-4 font-bold text-[13px] text-[#17221F]">Penyelenggara</th>
                <th className="py-4 px-4 font-bold text-[13px] text-[#17221F]">Jenjang Target</th>
                <th className="py-4 px-4 font-bold text-[13px] text-[#17221F]">Benefit</th>
                <th className="py-4 px-4 font-bold text-[13px] text-[#17221F]">Batas Waktu</th>
                <th className="py-4 px-4 font-bold text-[13px] text-[#17221F]">Status</th>
                {/* Sticky Action Header: Guaranteed unclipped by overflow */}
                <th className="py-4 px-4 font-bold text-[13px] text-[#17221F] sticky right-0 bg-white z-20 text-center shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.06)] whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-neutral-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#176B5B]" />
                      <span className="text-[13px]">Memuat data program...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-red-500 text-[13px]">
                    {error}
                  </td>
                </tr>
              ) : programs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-500 text-[13px]">
                    Tidak ada program yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                programs.map((program) => {
                  const isSelected = selectedIds.has(program.id);

                  return (
                    <tr
                      key={program.id}
                      className={`border-b border-neutral-100 transition-colors group ${
                        isSelected
                          ? "bg-[#2E5AAC] text-white"
                          : "bg-white hover:bg-neutral-50/80 text-[#17221F]"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4 text-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(program.id)}
                          aria-label={`Pilih program ${program.name}`}
                          className={
                            isSelected
                              ? "border-white data-[state=checked]:bg-white data-[state=checked]:text-[#2E5AAC]"
                              : ""
                          }
                        />
                      </td>

                      {/* Nama Program */}
                      <td
                        className={`py-3 px-4 text-[13px] font-medium max-w-[220px] truncate ${
                          isSelected ? "text-white font-semibold" : "text-[#17221F]"
                        }`}
                        title={program.name}
                      >
                        {program.name}
                      </td>

                      {/* Penyelenggara */}
                      <td
                        className={`py-3 px-4 text-[13px] max-w-[170px] truncate ${
                          isSelected ? "text-white/90" : "text-neutral-600"
                        }`}
                        title={program.organizer}
                      >
                        {program.organizer}
                      </td>

                      {/* Jenjang Target / Kategori Badge */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {program.type === "beasiswa" ? (
                          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[12px] font-semibold border border-[#2F80ED] text-[#2F80ED] bg-[#EBF3FE]">
                            Beasiswa
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[12px] font-semibold border border-[#E2B93B] text-[#D49E1E] bg-[#FEF9EC]">
                            Sertifikasi
                          </span>
                        )}
                      </td>

                      {/* Benefit */}
                      <td
                        className={`py-3 px-4 text-[13px] max-w-[200px] truncate ${
                          isSelected ? "text-white/90" : "text-neutral-600"
                        }`}
                        title={program.funding_coverage || "Text Cell"}
                      >
                        {program.funding_coverage || "Text Cell"}
                      </td>

                      {/* Batas Waktu */}
                      <td
                        className={`py-3 px-4 text-[13px] whitespace-nowrap ${
                          isSelected ? "text-white/90" : "text-neutral-700"
                        }`}
                      >
                        {formatDate(program.deadline_date)}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {program.is_verified ? (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[12px] font-medium border border-[#2E856E] text-[#1E745E] bg-[#EAF7F3]">
                            Terverifikasi
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[12px] font-medium border border-[#E28888] text-[#C94A4A] bg-[#FDEDED]">
                            Belum Terverifikasi
                          </span>
                        )}
                      </td>

                      {/* Sticky Action Cell: Guaranteed visible and never cut off by overflow */}
                      <td
                        className={`py-3 px-4 text-center sticky right-0 z-10 whitespace-nowrap shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.06)] ${
                          isSelected
                            ? "bg-[#2E5AAC] text-white"
                            : "bg-white group-hover:bg-neutral-50/80"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          {/* Edit Action */}
                          <button
                            type="button"
                            onClick={() => handleEdit(program)}
                            aria-label={`Edit ${program.name}`}
                            className="p-1 hover:opacity-75 transition-opacity cursor-pointer"
                            title="Edit"
                          >
                            <Pencil
                              className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#4A607A]"}`}
                            />
                          </button>

                          {/* Delete Action */}
                          <button
                            type="button"
                            onClick={() => handleDelete(program)}
                            aria-label={`Hapus ${program.name}`}
                            className="p-1 hover:opacity-75 transition-opacity cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2
                              className={`w-4 h-4 ${
                                isSelected ? "text-red-300" : "text-[#D35B5B]"
                              }`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. Pagination                                                             */}
      {/* ========================================================================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 select-none">
          {/* Previous Page Button */}
          <button
            type="button"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            aria-label="Halaman sebelumnya"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#17221F] hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
            const pageNum = idx + 1;
            const isActive = page === pageNum;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setPage(pageNum)}
                aria-label={`Ke halaman ${pageNum}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#176B5B] text-white shadow-sm"
                    : "text-[#17221F] hover:bg-neutral-200"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 5 && (
            <>
              <span className="px-1 text-neutral-400">...</span>
              <button
                type="button"
                onClick={() => setPage(totalPages)}
                aria-label={`Ke halaman ${totalPages}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all cursor-pointer ${
                  page === totalPages
                    ? "bg-[#176B5B] text-white shadow-sm"
                    : "text-[#17221F] hover:bg-neutral-200"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Page Button */}
          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            aria-label="Halaman berikutnya"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#17221F] hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
