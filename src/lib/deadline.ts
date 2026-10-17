export interface DeadlineBadgeInfo {
  formattedDate: string;
  label: string;
  className: string;
  diffDays: number;
}

/**
 * Helper to compute the deadline badge status and date formatting.
 * Categories:
 * - <= 3 hari: "3 hari lagi" (Merah)
 * - <= 7 hari: "7 hari lagi" (Kuning)
 * - <= 31 hari: "1 bulan lagi" (Hijau / Teal)
 * - <= 92 hari: "3 bulan lagi" (Biru)
 * - > 92 hari: "1 tahun lagi" (Abu-abu / Netral)
 */
export function getDeadlineBadgeInfo(dateStr: string | null | undefined): DeadlineBadgeInfo | null {
  if (!dateStr) return null;

  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return null;

  const now = new Date();
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const target = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  let diffDays = Math.ceil((target.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24));

  // If the date in the database was from a past cycle, cycle the year forward to represent upcoming deadline
  if (diffDays < 0) {
    while (diffDays < 0) {
      target.setFullYear(target.getFullYear() + 1);
      diffDays = Math.ceil((target.getTime() - nowDate.getTime()) / (1000 * 60 * 60 * 24));
    }
  }

  const formattedDate = target.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let label = "1 tahun lagi";
  let className = "border-[#D1D5DB] bg-[#F3F4F6] text-[#4B5563]";

  if (diffDays <= 3) {
    label = "3 hari lagi";
    className = "border-[#C94F4F] bg-[#FFD1D1] text-[#C94F4F]";
  } else if (diffDays <= 7) {
    label = "7 hari lagi";
    className = "border-[#F2C94C] bg-[#FFF8E7] text-[#D49E00]";
  } else if (diffDays <= 31) {
    label = "1 bulan lagi";
    className = "border-[#3FB58B] bg-[#E5F5EE] text-[#176B5B]";
  } else if (diffDays <= 92) {
    label = "3 bulan lagi";
    className = "border-[#60A5FA] bg-[#EFF6FF] text-[#2563EB]";
  }

  return {
    formattedDate,
    label,
    className,
    diffDays,
  };
}
