"use client";

import { useState, useEffect, useCallback } from "react";
import { Program } from "@/types/program";
import { toast } from "sonner";

export interface AdminProgramCounts {
  beasiswa: number;
  sertifikasi: number;
  active: number;
  unverified: number;
  verified: number;
  s1: number;
  s2: number;
  s3: number;
}

export function useAdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [counts, setCounts] = useState<AdminProgramCounts>({
    beasiswa: 0,
    sertifikasi: 0,
    active: 0,
    unverified: 0,
    verified: 0,
    s1: 0,
    s2: 0,
    s3: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [educationLevel, setEducationLevel] = useState("all");
  const [verification, setVerification] = useState("all");
  const [sort, setSort] = useState("nearest");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search.trim()) params.append("search", search.trim());
      if (type !== "all") params.append("type", type);
      if (educationLevel !== "all") params.append("education_level", educationLevel);
      if (verification !== "all") params.append("verification", verification);
      if (sort) params.append("sort", sort);

      const res = await fetch(`/api/programs?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data listing");
      const data = await res.json();

      setPrograms(data.programs || []);
      setTotalCount(data.totalCount || 0);
      setTotalPages(data.totalPages || 1);
      if (data.counts) {
        setCounts(data.counts);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, type, educationLevel, verification, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPrograms();
    }, 0);

    return () => clearTimeout(timer);
  }, [fetchPrograms]);

  // Toggle single row selection
  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle select all on current page
  const toggleSelectAll = () => {
    if (programs.length === 0) return;
    const allSelected = programs.every((p) => selectedIds.has(p.id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(programs.map((p) => p.id)));
    }
  };

  const isAllSelected = programs.length > 0 && programs.every((p) => selectedIds.has(p.id));

  // Export selected or all items as CSV
  const exportList = () => {
    const listToExport =
      selectedIds.size > 0 ? programs.filter((p) => selectedIds.has(p.id)) : programs;

    if (listToExport.length === 0) {
      toast.error("Tidak ada data untuk diekspor");
      return;
    }

    const headers = [
      "Nama Program",
      "Penyelenggara",
      "Kategori",
      "Benefit",
      "Batas Waktu",
      "Status",
    ];
    const rows = listToExport.map((p) => [
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.organizer.replace(/"/g, '""')}"`,
      `"${p.type}"`,
      `"${(p.funding_coverage || "").replace(/"/g, '""')}"`,
      `"${p.deadline_date || ""}"`,
      `"${p.is_verified ? "Terverifikasi" : "Belum Terverifikasi"}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `openpath_listing_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Berhasil mengekspor list!", {
      description: `${listToExport.length} program telah diunduh sebagai file CSV.`,
    });
  };

  return {
    programs,
    totalCount,
    totalPages,
    counts,
    loading,
    error,
    search,
    setSearch: (v: string) => {
      setSearch(v);
      setPage(1);
    },
    type,
    setType: (v: string) => {
      setType(v);
      setPage(1);
    },
    educationLevel,
    setEducationLevel: (v: string) => {
      setEducationLevel(v);
      setPage(1);
    },
    verification,
    setVerification: (v: string) => {
      setVerification(v);
      setPage(1);
    },
    sort,
    setSort: (v: string) => {
      setSort(v);
      setPage(1);
    },
    page,
    setPage,
    selectedIds,
    toggleRow,
    toggleSelectAll,
    isAllSelected,
    exportList,
    updateProgramLocally: (updated: Program) => {
      setPrograms((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
    },
    refetch: fetchPrograms,
  };
}
