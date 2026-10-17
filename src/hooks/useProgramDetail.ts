"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Program } from "@/types/program";
import { getDeadlineBadgeInfo, DeadlineBadgeInfo } from "@/lib/deadline";

export interface ParsedProgramDetail {
  program: Program | null;
  loading: boolean;
  error: string | null;
  formattedDate: string;
  deadlineBadge: DeadlineBadgeInfo | null;
  educationText: string;
  eligibilityList: string[];
  fundingList: string[];
  defaultSummary: string;
  refetch: () => Promise<void>;
}

export function useProgramDetail(id: string, initialProgram?: Program | null): ParsedProgramDetail {
  const [program, setProgram] = useState<Program | null>(initialProgram ?? null);
  const [loading, setLoading] = useState<boolean>(!initialProgram);
  const [error, setError] = useState<string | null>(null);

  const fetchProgram = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/programs/${id}`);
      if (!res.ok) {
        throw new Error("Program tidak ditemukan");
      }
      const data = await res.json();
      setProgram(data);
    } catch (err: unknown) {
      console.error("Error in useProgramDetail:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan memuat program");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let ignore = false;

    // If initialProgram matches the requested id/slug, no need to fetch
    if (!id || (initialProgram && (initialProgram.id === id || initialProgram.slug === id))) {
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/programs/${id}`);
        if (!res.ok) {
          throw new Error("Program tidak ditemukan");
        }
        const data = await res.json();
        if (!ignore) {
          setProgram(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan memuat program");
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [id, initialProgram]);

  // 1. Deadline & Date Info
  const deadlineDateRaw = useMemo(() => {
    if (!program) return null;
    return program.is_deadline_estimated
      ? program.next_deadline_est || program.deadline_date
      : program.deadline_date;
  }, [program]);

  const deadlineBadge = useMemo(() => {
    return getDeadlineBadgeInfo(deadlineDateRaw);
  }, [deadlineDateRaw]);

  const formattedDate = useMemo(() => {
    return deadlineBadge?.formattedDate || program?.deadline_date || "31 Juli 2026";
  }, [deadlineBadge, program]);

  // 2. Education & Destination Info
  const educationText = useMemo(() => {
    if (!program) return "S1 / S2 / S3";
    return program.education_levels && program.education_levels.length > 0
      ? `${program.education_levels.join(" & ")}${
          program.destination_scope ? ` (${program.destination_scope})` : ""
        }`
      : program.destination_scope || "S1 / S2 / S3";
  }, [program]);

  // 3. Syarat Kelayakan parsing from eligibility_summary
  const eligibilityList = useMemo(() => {
    if (program?.eligibility_summary) {
      const items = program.eligibility_summary
        .split(/;|\n/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      if (items.length > 0) return items;
    }
    return [
      "Warga Negara Indonesia (WNI) Maks 35 tahun, telah lulus D4/S1 atau S2 dari perguruan tinggi terakreditasi BAN-PT",
      "IPK minimal 3.00 (Magister) atau 3.25 (Doktoral) pada skala 4.00 dibuktikan dengan transkrip asli/legalisir resmi",
      "Untuk tujuan luar negeri wajib melampirkan sertifikat kemampuan bahasa asing resmi (TOEFL iBT/IELTS/PTE Academic) yang masih berlaku (maksimal 2 tahun penerbitan)",
      "Menulis esai Komitmen Kembali ke Indonesia, Rencana Pasca Studi, serta Proposal Penelitian Terstruktur bagi jenjang Doktoral",
    ];
  }, [program]);

  // 4. Estimasi Bantuan parsing from funding_coverage
  const fundingList = useMemo(() => {
    if (program?.funding_coverage) {
      const items = program.funding_coverage
        .replace(/^Full:?\s*/i, "")
        .replace(/^\(|\)$/g, "")
        .split(/;|,|\n/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      if (items.length > 0) return items;
    }
    return [
      "Fully funded (100% ditanggung)",
      "Dana pendidikan (SPP/Tuition)",
      "Tunjangan hidup bulanan",
      "Biaya asuransi dan kesehatan",
      "Tiket pesawat PP Internasional",
      "Biaya visa dan settlement allowance",
    ];
  }, [program]);

  // 5. Ringkasan & Cakupan Program (dummy sementara sesuai arahan)
  const defaultSummary = useMemo(() => {
    if (!program) return "";
    return `Program ${program.name} kembali dibuka untuk talenta unggul Indonesia. Program ini secara spesifik sangat relevan bagi lulusan sarjana serta calon wisudawan Fakultas Sains dan Analitika Data (FSAD) ITS yang berasal dari rumpun Matematika, Statistika, Ilmu Aktuaria, Fisika Kimia, hingga Biologi guna melanjutkan studi lanjutan di universitas top dunia maupun institusi bereputasi tinggi dalam negeri`;
  }, [program]);

  return {
    program,
    loading,
    error,
    formattedDate,
    deadlineBadge,
    educationText,
    eligibilityList,
    fundingList,
    defaultSummary,
    refetch: fetchProgram,
  };
}
