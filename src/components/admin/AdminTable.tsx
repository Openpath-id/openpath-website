"use client";

import { Pencil, Trash2, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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

interface AdminTableProps {
  programs: Program[];
  loading: boolean;
  error: string | null;
  selectedIds: Set<string>;
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
  onToggleRow: (id: string) => void;
  onEdit: (program: Program) => void;
  onDelete: (program: Program) => void;
}

export default function AdminTable({
  programs,
  loading,
  error,
  selectedIds,
  isAllSelected,
  onToggleSelectAll,
  onToggleRow,
  onEdit,
  onDelete,
}: AdminTableProps) {
  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-neutral-200/80 mt-6 overflow-hidden">
      {/* Table wrapper allowing horizontal scroll while action column stays sticky */}
      <div className="w-full overflow-x-auto relative">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-neutral-100 bg-white">
              <th className="py-4 px-4 w-[48px] text-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onToggleSelectAll}
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
                        onCheckedChange={() => onToggleRow(program.id)}
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
                        <Badge variant="default" className="px-3.5 py-1">
                          Beasiswa
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="px-3.5 py-1">
                          Sertifikasi
                        </Badge>
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
                        <Badge variant="success">Terverifikasi</Badge>
                      ) : (
                        <Badge variant="destructive">Belum Terverifikasi</Badge>
                      )}
                    </td>

                    {/* Sticky Action Cell */}
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
                          onClick={() => onEdit(program)}
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
                          onClick={() => onDelete(program)}
                          aria-label={`Hapus ${program.name}`}
                          className="p-1 hover:opacity-75 transition-opacity cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2
                            className={`w-4 h-4 ${isSelected ? "text-red-300" : "text-[#D35B5B]"}`}
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
  );
}
