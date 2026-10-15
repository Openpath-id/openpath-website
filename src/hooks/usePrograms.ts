"use client";

import { useEffect, useState } from "react";
import { Program, ProgramType } from "@/types/program";

export type FilterType = "all" | ProgramType;

export function usePrograms(initialFilter: FilterType = "all") {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(initialFilter);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        setLoading(true);
        setError(null);

        // Fetch dari Server-Side API Route (Supabase URL & Key 100% aman di server)
        const params = new URLSearchParams({
          type: selectedFilter,
          limit: "4",
        });

        const res = await fetch(`/api/programs/nearest?${params.toString()}`);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setPrograms(Array.isArray(data) ? (data as Program[]) : []);
      } catch (err: unknown) {
        console.error("Error fetching programs via API Route:", err);
        setError(err instanceof Error ? err.message : "Gagal memuat program");
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, [selectedFilter]);

  const filteredPrograms = programs;

  return {
    programs,
    filteredPrograms,
    selectedFilter,
    setSelectedFilter,
    loading,
    error,
  };
}
