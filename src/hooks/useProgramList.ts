"use client";

import { useEffect, useState } from "react";
import { Program } from "@/types/program";
import { useDebounce } from "@/lib/useDebounce";

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

interface CachedProgramListData {
  programs: Program[];
  totalCount: number;
  totalPages: number;
  counts: ProgramFilterCounts;
  timestamp: number;
}

const FILTERS_STORAGE_KEY = "openpath_list_filters";
const CACHE_STORAGE_PREFIX = "openpath_prog_cache_v2_";
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 menit cache di device

// In-memory cache untuk akses sinkron instan antar navigasi dalam satu session
const memoryCache = new Map<string, CachedProgramListData>();

function getDeviceCachedData(key: string): CachedProgramListData | null {
  // 1. Cek memory cache terlebih dahulu
  const inMemory = memoryCache.get(key);
  if (inMemory && Date.now() - inMemory.timestamp < CACHE_TTL_MS) {
    return inMemory;
  }

  // 2. Cek sessionStorage browser di device
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(CACHE_STORAGE_PREFIX + key);
      if (raw) {
        const parsed = JSON.parse(raw) as CachedProgramListData;
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          memoryCache.set(key, parsed);
          return parsed;
        }
      }
    } catch {}
  }

  return null;
}

function saveDeviceCachedData(key: string, data: Omit<CachedProgramListData, "timestamp">) {
  const payload: CachedProgramListData = { ...data, timestamp: Date.now() };
  memoryCache.set(key, payload);
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(CACHE_STORAGE_PREFIX + key, JSON.stringify(payload));
    } catch {}
  }
}

export function useProgramList(initialFilters?: Partial<UseProgramListFilters>) {
  const defaultFilters: UseProgramListFilters = {
    search: initialFilters?.search || "",
    type: initialFilters?.type || "all",
    educationLevel: initialFilters?.educationLevel || "all",
    verification: initialFilters?.verification || "all",
    sort: initialFilters?.sort || "",
    page: initialFilters?.page || 1,
    limit: initialFilters?.limit || 6,
  };

  // Baca filter terakhir dari device (sessionStorage) jika ada
  const [filters, setFilters] = useState<UseProgramListFilters>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(FILTERS_STORAGE_KEY);
        if (saved) {
          return { ...defaultFilters, ...JSON.parse(saved) };
        }
      } catch {}
    }
    return defaultFilters;
  });

  // Debounce nilai pencarian selama 400ms agar tidak memicu fetch di setiap ketikan
  const debouncedSearch = useDebounce(filters.search, 400);

  // Cek apakah data untuk filter ini sudah tersimpan di cache device
  const initialCacheKey = new URLSearchParams({
    search: filters.search,
    type: filters.type,
    education_level: filters.educationLevel,
    verification: filters.verification,
    sort: filters.sort,
    page: filters.page.toString(),
    limit: filters.limit.toString(),
  }).toString();

  const initialCache = getDeviceCachedData(initialCacheKey);

  const [programs, setPrograms] = useState<Program[]>(() => initialCache?.programs || []);
  const [totalCount, setTotalCount] = useState<number>(() => initialCache?.totalCount || 0);
  const [totalPages, setTotalPages] = useState<number>(() => initialCache?.totalPages || 1);
  const [counts, setCounts] = useState<ProgramFilterCounts>(
    () =>
      initialCache?.counts || {
        beasiswa: 0,
        sertifikasi: 0,
        s1: 0,
        s2: 0,
        s3: 0,
        verified: 0,
        unverified: 0,
      },
  );
  const [loading, setLoading] = useState<boolean>(() => !initialCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    // Simpan filter aktif ke sessionStorage setiap kali ada perubahan
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
      } catch {}
    }

    const cacheKey = new URLSearchParams({
      search: debouncedSearch,
      type: filters.type,
      education_level: filters.educationLevel,
      verification: filters.verification,
      sort: filters.sort,
      page: filters.page.toString(),
      limit: filters.limit.toString(),
    }).toString();

    async function loadData() {
      // Tunggu tick microtask agar tidak terjadi pemanggilan setState sinkron dalam effect body
      await Promise.resolve();
      if (ignore) return;

      // 1. Cek cache di device. Jika sudah ada, gunakan langsung tanpa get ulang!
      const cached = getDeviceCachedData(cacheKey);
      if (cached) {
        setPrograms(cached.programs);
        setTotalCount(cached.totalCount);
        setTotalPages(cached.totalPages);
        if (cached.counts) {
          setCounts(cached.counts);
        }
        setLoading(false);
        return;
      }

      // 2. Jika belum ada di cache device, ambil dari API
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/programs?${cacheKey}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (!ignore) {
          const loadedPrograms = data.programs || [];
          const loadedTotalCount = data.totalCount || 0;
          const loadedTotalPages = data.totalPages || 1;
          const loadedCounts = data.counts || {
            beasiswa: 0,
            sertifikasi: 0,
            s1: 0,
            s2: 0,
            s3: 0,
            verified: 0,
            unverified: 0,
          };

          setPrograms(loadedPrograms);
          setTotalCount(loadedTotalCount);
          setTotalPages(loadedTotalPages);
          setCounts(loadedCounts);

          // Simpan hasil ke cache device
          saveDeviceCachedData(cacheKey, {
            programs: loadedPrograms,
            totalCount: loadedTotalCount,
            totalPages: loadedTotalPages,
            counts: loadedCounts,
          });
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
  }, [debouncedSearch, filters]);

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
    const resetState = {
      ...filters,
      type: "all",
      educationLevel: "all",
      verification: "all",
      page: 1,
    };
    setFilters(resetState);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(resetState));
      } catch {}
    }
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
