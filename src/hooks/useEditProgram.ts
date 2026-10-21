"use client";

import { useState } from "react";
import { Program } from "@/types/program";
import { toast } from "sonner";

export function parseCriteria(summary?: string | null): string[] {
  if (!summary) return [];
  return summary
    .split(/;|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseBenefits(coverage?: string | null): string[] {
  if (!coverage) return [];
  return coverage
    .split(/;|,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

interface UseEditProgramOptions {
  program: Program;
  onSuccess: (updated: Program) => void;
  onClose: () => void;
}

export function useEditProgram({ program, onSuccess, onClose }: UseEditProgramOptions) {
  const [saving, setSaving] = useState(false);

  // Form State initialized strictly from the program object without dummy values
  const [type, setType] = useState<"beasiswa" | "sertifikasi">(program.type || "beasiswa");
  const [name, setName] = useState(program.name || "");
  const [organizer, setOrganizer] = useState(program.organizer || "");
  const [isVerified, setIsVerified] = useState(Boolean(program.is_verified));
  const [educationLevels, setEducationLevels] = useState<string[]>(program.education_levels || []);
  const [destinationScope, setDestinationScope] = useState(
    program.destination_scope || "Dalam Negeri",
  );
  const [deadlineDate, setDeadlineDate] = useState(program.deadline_date || "");
  const [scheduleNotes, setScheduleNotes] = useState(program.schedule_notes || "");

  // Criteria list strictly from program.eligibility_summary
  const [criteriaList, setCriteriaList] = useState<string[]>(() => {
    const parsed = parseCriteria(program.eligibility_summary);
    return parsed.length > 0 ? parsed : [""];
  });

  // Benefit summary & list strictly from program.funding_coverage
  const [benefitSummary, setBenefitSummary] = useState(program.funding_coverage || "");
  const [benefitList, setBenefitList] = useState<string[]>(() => {
    const parsed = parseBenefits(program.funding_coverage);
    return parsed.length > 0 ? parsed : [""];
  });

  const toggleEducationLevel = (level: string) => {
    setEducationLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  };

  // Criteria Handlers
  const handleAddCriteria = () => {
    setCriteriaList((prev) => [...prev, ""]);
  };

  const handleUpdateCriteria = (index: number, val: string) => {
    setCriteriaList((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleRemoveCriteria = (index: number) => {
    setCriteriaList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllCriteria = () => {
    setCriteriaList([]);
  };

  // Benefit Handlers
  const handleAddBenefit = () => {
    setBenefitList((prev) => [...prev, ""]);
  };

  const handleUpdateBenefit = (index: number, val: string) => {
    setBenefitList((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefitList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllBenefits = () => {
    setBenefitList([]);
  };

  // Submit Handler containing the fetch API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Nama program wajib diisi");
      return;
    }
    if (!organizer.trim()) {
      toast.error("Penyelenggara wajib diisi");
      return;
    }

    try {
      setSaving(true);

      const eligibilityJoined = criteriaList.filter((c) => c.trim()).join("; ");
      const benefitsJoined =
        benefitSummary.trim() || benefitList.filter((b) => b.trim()).join("; ");

      const updatePayload = {
        type,
        name: name.trim(),
        organizer: organizer.trim(),
        is_verified: isVerified,
        education_levels: educationLevels,
        destination_scope: destinationScope,
        deadline_date: deadlineDate || null,
        schedule_notes: scheduleNotes.trim(),
        eligibility_summary: eligibilityJoined,
        funding_coverage: benefitsJoined,
      };

      const res = await fetch(`/api/programs/${program.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal memperbarui program");
      }

      toast.success("Perubahan Berhasil Disimpan", {
        description: `Program "${name}" telah diperbarui.`,
      });

      onSuccess({
        ...program,
        ...updatePayload,
      });

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan";
      toast.error("Gagal Menyimpan", { description: msg });
    } finally {
      setSaving(false);
    }
  };

  return {
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
    handleSubmit,
  };
}
