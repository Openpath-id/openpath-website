"use client";

import { Search, Download, PlusCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface AdminFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  educationLevel: string;
  setEducationLevel: (val: string) => void;
  verification: string;
  setVerification: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
  onExport: () => void;
}

export default function AdminFilters({
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
  onExport,
}: AdminFiltersProps) {
  return (
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
          onClick={onExport}
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
  );
}
