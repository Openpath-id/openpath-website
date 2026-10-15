"use client";

import { useEffect, useState } from "react";
import { Program, ProgramType } from "@/types/program";
import { supabase } from "@/lib/supabase";

export type FilterType = "all" | ProgramType;

export function usePrograms(initialFilter: FilterType = "all") {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(initialFilter);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrograms() {
      if (!supabase) {
        setPrograms([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // Memanggil Database Function get_nearest_programs
        const { data, error: err } = await supabase.rpc("get_nearest_programs", {
          p_type: selectedFilter === "all" ? null : selectedFilter,
          p_limit: 4,
        });

        if (err) {
          throw err;
        }

        if (data && data.length > 0) {
          setPrograms(data as Program[]);
        } else {
          setPrograms([]);
        }
      } catch (err: unknown) {
        console.error("Error fetching programs via RPC:", err);
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
