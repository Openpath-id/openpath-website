"use client";

import { useState } from "react";
import { Program } from "@/types/program";
import { toast } from "sonner";
import { createProgramSchema } from "@/lib/validations/program";

interface UseCreateProgramOptions {
  onSuccess: (newProgram: Program) => void;
  onClose: () => void;
}

export function useCreateProgram({ onSuccess, onClose }: UseCreateProgramOptions) {
  const [saving, setSaving] = useState(false);

  // Initial states: all empty/unselected as requested in the design mockup
  const [type, setType] = useState<"beasiswa" | "sertifikasi" | "">("");
  const [name, setName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [isVerified, setIsVerified] = useState<string>(""); // "" = unselected, "verified" or "unverified"
  const [educationLevels, setEducationLevels] = useState<string[]>([]);
  const [destinationScope, setDestinationScope] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [scheduleNotes, setScheduleNotes] = useState("");

  // 5 initial rows for criteria and benefits as shown in the screenshot
  const [criteriaList, setCriteriaList] = useState<string[]>(["", "", "", "", ""]);
  const [benefitSummary, setBenefitSummary] = useState("");
  const [benefitList, setBenefitList] = useState<string[]>(["", "", "", "", ""]);

  // Validation errors map from Zod
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleEducationLevel = (level: string) => {
    setEducationLevels((prev) => {
      const exists = prev.includes(level);
      const next = exists ? prev.filter((l) => l !== level) : [...prev, level];
      if (next.length > 0) clearError("educationLevels");
      return next;
    });
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
    if (val.trim()) clearError("criteriaList");
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
    if (val.trim()) clearError("benefitList");
  };

  const handleRemoveBenefit = (index: number) => {
    setBenefitList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllBenefits = () => {
    setBenefitList([]);
  };

  const resetForm = () => {
    setType("");
    setName("");
    setOrganizer("");
    setIsVerified("");
    setEducationLevels([]);
    setDestinationScope("");
    setDeadlineDate("");
    setScheduleNotes("");
    setCriteriaList(["", "", "", "", ""]);
    setBenefitSummary("");
    setBenefitList(["", "", "", "", ""]);
    setErrors({});
  };

  // Submit with strict frontend validation using Zod
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate all fields using Zod schema
    const validationResult = createProgramSchema.safeParse({
      type,
      name,
      organizer,
      isVerified,
      educationLevels,
      destinationScope,
      deadlineDate,
      scheduleNotes,
      criteriaList,
      benefitSummary,
      benefitList,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const mappedErrors: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(fieldErrors)) {
        if (msgs && msgs.length > 0) {
          mappedErrors[key] = msgs[0];
        }
      }
      setErrors(mappedErrors);
      toast.error("Validasi Gagal", {
        description: "Semua kolom bertanda * wajib diisi sebelum menyimpan.",
      });
      return;
    }

    // 2. Submit valid data
    const validData = validationResult.data;
    const filledCriteria = validData.criteriaList.filter((c) => c.trim().length > 0);
    const filledBenefits = validData.benefitList.filter((b) => b.trim().length > 0);

    try {
      setSaving(true);

      const eligibilityJoined = filledCriteria.join("; ");
      const benefitsJoined = validData.benefitSummary.trim() || filledBenefits.join("; ");

      const payload = {
        type: validData.type,
        name: validData.name.trim(),
        organizer: validData.organizer.trim(),
        is_verified: validData.isVerified === "verified",
        education_levels: validData.educationLevels,
        destination_scope: validData.destinationScope,
        deadline_date: validData.deadlineDate,
        schedule_notes: validData.scheduleNotes.trim(),
        eligibility_summary: eligibilityJoined,
        funding_coverage: benefitsJoined,
      };

      const res = await fetch("/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menerbitkan program baru");
      }

      toast.success("Peluang Berhasil Diterbitkan", {
        description: `Program "${validData.name}" telah berhasil ditambahkan ke listing.`,
      });

      resetForm();
      onSuccess(data.program);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan";
      toast.error("Gagal Menyimpan Program", {
        description: msg,
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    type,
    setType: (val: "beasiswa" | "sertifikasi") => {
      setType(val);
      clearError("type");
    },
    name,
    setName: (val: string) => {
      setName(val);
      if (val.trim()) clearError("name");
    },
    organizer,
    setOrganizer: (val: string) => {
      setOrganizer(val);
      if (val.trim()) clearError("organizer");
    },
    isVerified,
    setIsVerified: (val: string) => {
      setIsVerified(val);
      if (val) clearError("isVerified");
    },
    educationLevels,
    toggleEducationLevel,
    destinationScope,
    setDestinationScope: (val: string) => {
      setDestinationScope(val);
      if (val) clearError("destinationScope");
    },
    deadlineDate,
    setDeadlineDate: (val: string) => {
      setDeadlineDate(val);
      if (val.trim()) clearError("deadlineDate");
    },
    scheduleNotes,
    setScheduleNotes: (val: string) => {
      setScheduleNotes(val);
      if (val.trim()) clearError("scheduleNotes");
    },
    criteriaList,
    handleAddCriteria,
    handleUpdateCriteria,
    handleRemoveCriteria,
    handleClearAllCriteria,
    benefitSummary,
    setBenefitSummary: (val: string) => {
      setBenefitSummary(val);
      if (val.trim()) clearError("benefitSummary");
    },
    benefitList,
    handleAddBenefit,
    handleUpdateBenefit,
    handleRemoveBenefit,
    handleClearAllBenefits,
    errors,
    handleSubmit,
    resetForm,
  };
}
