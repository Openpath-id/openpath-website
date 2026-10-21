import { z } from "zod";

export const createProgramSchema = z.object({
  type: z.enum(["beasiswa", "sertifikasi"], {
    message: "Kategori peluang wajib dipilih",
  }),
  name: z.string().trim().min(1, { message: "Nama program/skema wajib diisi" }),
  organizer: z.string().trim().min(1, { message: "Penyelenggara resmi wajib diisi" }),
  isVerified: z.enum(["verified", "unverified"], {
    message: "Status verifikasi wajib dipilih",
  }),
  educationLevels: z
    .array(z.string())
    .min(1, { message: "Jenjang/sasaran wajib dipilih minimal satu" }),
  destinationScope: z.string().trim().min(1, { message: "Cakupan wilayah wajib dipilih" }),
  deadlineDate: z.string().trim().min(1, { message: "Batas waktu wajib diisi" }),
  scheduleNotes: z
    .string()
    .trim()
    .min(1, { message: "Deskripsi ringkasan & cakupan program wajib diisi" }),
  criteriaList: z
    .array(z.string())
    .refine((items) => items.some((item) => item.trim().length > 0), {
      message: "Daftar kriteria mutlak wajib diisi minimal satu",
    }),
  benefitSummary: z.string().trim().min(1, { message: "Ringkasan benefit wajib diisi" }),
  benefitList: z.array(z.string()).refine((items) => items.some((item) => item.trim().length > 0), {
    message: "Daftar rincian benefit wajib diisi minimal satu",
  }),
});

export type CreateProgramInput = z.infer<typeof createProgramSchema>;
