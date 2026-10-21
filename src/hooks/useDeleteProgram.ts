"use client";

import { useState } from "react";
import { Program } from "@/types/program";
import { toast } from "sonner";

interface UseDeleteProgramOptions {
  onSuccess?: (deletedProgram: Program) => void;
}

export function useDeleteProgram({ onSuccess }: UseDeleteProgramOptions = {}) {
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDelete = (program: Program) => {
    setProgramToDelete(program);
  };

  const cancelDelete = () => {
    if (!isDeleting) {
      setProgramToDelete(null);
    }
  };

  const confirmDelete = async () => {
    if (!programToDelete) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/programs/${programToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menghapus program");
      }

      toast.success("Program Berhasil Dihapus", {
        description: `Program "${programToDelete.name}" telah dihapus dari basis data.`,
      });

      const deleted = programToDelete;
      setProgramToDelete(null);
      if (onSuccess) {
        onSuccess(deleted);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menghapus program";
      toast.error("Gagal Menghapus Program", {
        description: msg,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    programToDelete,
    isDeleting,
    isDeleteDialogOpen: Boolean(programToDelete),
    requestDelete,
    cancelDelete,
    confirmDelete,
  };
}
