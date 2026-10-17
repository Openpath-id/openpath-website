import Link from "next/link";
import {
  GraduationCap,
  Building2,
  Banknote,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Typography from "@/components/Typography";
import { Program } from "@/types/program";
import { getDeadlineBadgeInfo } from "@/lib/deadline";

interface ProgramCardProps {
  program: Program;
  isDesktop?: boolean;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const isBeasiswa = program.type === "beasiswa";
  const typeBadgeText = isBeasiswa ? "Beasiswa Pendidikan" : "Pendanaan Sertifikasi";

  // Education level or category string
  const educationLevelText =
    program.education_levels && program.education_levels.length > 0
      ? program.education_levels.join(", ")
      : null;

  // Tanggal deadline mentah
  const displayDateRaw = program.is_deadline_estimated
    ? program.next_deadline_est || program.deadline_date
    : program.deadline_date;

  // Hitung status badge & format tanggal (hanya jika ada deadline_date)
  const deadlineInfo = getDeadlineBadgeInfo(displayDateRaw);
  const formattedDate = deadlineInfo?.formattedDate || null;

  return (
    <div className="w-full bg-white rounded-[24px] p-6 xl:p-8 flex flex-col justify-between shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
      {/* Top Part to Middle Part (gap 16px) */}
      <div className="flex flex-col gap-4">
        {/* Top Type Badge */}
        <div className="self-start px-2 py-1 rounded-[19px] border border-[#176B5B] bg-[#DCEFE7]">
          <span className="font-Inter text-[12px] font-medium text-[#176B5B] leading-none">
            {typeBadgeText}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <Typography
            as="h3"
            font="Sora"
            weight="bold"
            className="text-[16px] font-bold text-[#17221F] leading-snug line-clamp-2"
          >
            {program.name}
          </Typography>
        </div>

        {/* 4 Rows Information (gap 14px) */}
        <div className="flex flex-col gap-[14px] pt-1">
          {/* Row 1: Education Level (Only if present, e.g. S1 for beasiswa) */}
          {educationLevelText && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#17221F] shrink-0" />
              <span className="font-Inter text-[12px] text-[#17221F] leading-none">
                {educationLevelText}
              </span>
            </div>
          )}

          {/* Row 2: Organizer */}
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#17221F] shrink-0" />
            <span className="font-Inter text-[12px] text-[#17221F] leading-none">
              {program.organizer}
            </span>
          </div>

          {/* Row 3: Funding Coverage */}
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-[#17221F] shrink-0" />
            <span className="font-Inter text-[12px] text-[#17221F] leading-none line-clamp-1">
              {program.funding_coverage || "Pendanaan Penuh & Pembinaan"}
            </span>
          </div>

          {/* Row 4: Deadline Date & Deadline Status Tag */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Calendar className="w-5 h-5 text-[#17221F] shrink-0" />
              <span className="font-Inter text-[12px] text-[#17221F] leading-none truncate">
                {formattedDate || "Segera Ditutup"}
              </span>
            </div>

            {/* Right side tag: hanya tampilkan jika ada deadline date */}
            {deadlineInfo && (
              <div
                className={`shrink-0 px-2.5 py-[2px] rounded-[20px] border ${deadlineInfo.className}`}
              >
                <span className="font-Inter text-[12px] font-medium leading-none whitespace-nowrap">
                  {deadlineInfo.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle to Bottom: Gap 32px */}
      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
        {/* Verification Status (Left) */}
        <div className="flex items-center gap-2">
          {program.is_verified ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-[#176B5B] shrink-0" />
              <span className="font-Inter text-[12px] font-semibold text-[#176B5B]">
                Terverifikasi
              </span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 text-[#C94F4F] shrink-0" />
              <span className="font-Inter text-[12px] font-semibold text-[#C94F4F]">
                Blm Terverifikasi
              </span>
            </>
          )}
        </div>

        {/* Detail Button (Right) */}
        {/* Mobile: "Detail", Desktop: "Lihat detail" */}
        <Link
          href=""
          className="inline-flex items-center gap-[10px] px-4 py-2 rounded-lg bg-[#176B5B] hover:bg-[#125548] text-white transition-colors"
        >
          <span className="font-Inter text-[12px] font-semibold leading-4 tracking-[-0.12px]">
            <span className="block xl:hidden">Detail</span>
            <span className="hidden xl:block">Lihat detail</span>
          </span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
