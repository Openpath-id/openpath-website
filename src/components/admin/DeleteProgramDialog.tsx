"use client";

import { Program } from "@/types/program";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteProgramDialogProps {
  program: Program | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProgramDialog({
  program,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteProgramDialogProps) {
  if (!program) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <div className="w-11 h-11 rounded-full bg-red-50 text-[#C54A4A] flex items-center justify-center mb-1.5 border border-red-100">
            <AlertTriangle className="w-5 h-5 text-[#C54A4A]" />
          </div>
          <DialogTitle>Konfirmasi Hapus Program</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus peluang{" "}
            <span className="font-semibold text-[#17221F]">&ldquo;{program.name}&rdquo;</span>?
            Tindakan ini akan menghapus program secara permanen dari basis data.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-[40px] px-4 rounded-[8px] border border-neutral-300 hover:bg-neutral-50 text-[#17221F] font-semibold text-[13px] transition-colors cursor-pointer disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-[40px] px-4 rounded-[8px] bg-[#C54A4A] hover:bg-[#a83c3c] active:scale-[0.99] text-white font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menghapus...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Ya, Hapus</span>
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
