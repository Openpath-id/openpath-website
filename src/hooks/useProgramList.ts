"use client";

import { useEffect, useState } from "react";
import { Program } from "@/types/program";
import { useDebounce } from "@/hooks/useDebounce";

export interface ProgramFilterCounts {
  beasiswa: number;
  sertifikasi: number;
  s1: number;
  s2: number;
  s3: number;
  verified: number;
  unverified: number;
}

export interface UseProgramListFilters {
  search: string;
  type: string; // 'all' | 'beasiswa' | 'sertifikasi'
  educationLevel: string; // 'all' | 'S1' | 'S2' | 'S3'
  verification: string; // 'all' | 'verified' | 'unverified'
  sort: string; // 'nearest' | 'furthest'
  page: number;
  limit: number;
}

export function useProgramList(initialFilters?: Partial<UseProgramListFilters>) {
  const [filters, setFilters] = useState<UseProgramListFilters>({
    search: initialFilters?.search || "",
    type: initialFilters?.type || "all",
    educationLevel: initialFilters?.educationLevel || "all",
    verification: initialFilters?.verification || "all",
    sort: initialFilters?.sort || "",
    page: initialFilters?.page || 1,
    limit: initialFilters?.limit || 6,
  });

  // Debounce nilai pencarian selama 400ms agar tidak memicu fetch di setiap ketikan
  const debouncedSearch = useDebounce(filters.search, 400);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [counts, setCounts] = useState<ProgramFilterCounts>({
    beasiswa: 0,
    sertifikasi: 0,
    s1: 0,
    s2: 0,
    s3: 0,
    verified: 0,
    unverified: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          search: debouncedSearch,
          type: filters.type,
          education_level: filters.educationLevel,
          verification: filters.verification,
          sort: filters.sort,
          page: filters.page.toString(),
          limit: filters.limit.toString(),
        });

        const res = await fetch(`/api/programs?${params.toString()}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (!ignore) {
          setPrograms(data.programs || []);
          setTotalCount(data.totalCount || 0);
          setTotalPages(data.totalPages || 1);
          if (data.counts) {
            setCounts(data.counts);
          }
        }
      } catch (err: unknown) {
        if (!ignore) {
          console.error("Error fetching program list:", err);
          setError(err instanceof Error ? err.message : "Gagal memuat program");
          setPrograms([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [
    debouncedSearch,
    filters.type,
    filters.educationLevel,
    filters.verification,
    filters.sort,
    filters.page,
    filters.limit,
  ]);

  const updateSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const updateType = (type: string) => {
    setFilters((prev) => ({ ...prev, type: prev.type === type ? "all" : type, page: 1 }));
  };

  const updateEducationLevel = (level: string) => {
    setFilters((prev) => ({
      ...prev,
      educationLevel: prev.educationLevel === level ? "all" : level,
      page: 1,
    }));
  };

  const updateVerification = (verification: string) => {
    setFilters((prev) => ({
      ...prev,
      verification: prev.verification === verification ? "all" : verification,
      page: 1,
    }));
  };

  const updateSort = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
  };

  const updatePage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const resetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      type: "all",
      educationLevel: "all",
      verification: "all",
      page: 1,
    }));
  };

  return {
    programs,
    totalCount,
    totalPages,
    counts,
    loading,
    error,
    filters,
    updateSearch,
    updateType,
    updateEducationLevel,
    updateVerification,
    updateSort,
    updatePage,
    resetFilters,
  };
}
