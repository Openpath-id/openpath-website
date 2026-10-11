import { GraduationCap, Award, Users, type LucideIcon } from "lucide-react";

export type TargetAudienceCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const TARGET_AUDIENCE_CARDS: TargetAudienceCard[] = [
  {
    icon: GraduationCap,
    title: "Beasiswa Pendidikan",
    description:
      "Mulai dari beasiswa prestasi akademik, bantuan UKT darurat, hingga pendanaan afirmasi dari ikatan alumni dan mitra korporasi terpercaya",
  },
  {
    icon: Award,
    title: "Pendanaan Sertifikasi",
    description:
      "Subsidi voucher ujian kompetensi industri internasional dan nasional (BNSP, AWS, Google, CFA, Actuary) agar siap kerja dengan sertifikasi valid",
  },
  {
    icon: Users,
    title: "Bimbingan Sesama Mahasiswa",
    description:
      "Dapatkan review esai, simulasi interview beasiswa, dan tips lolos dari kakak tingkat penerima awardee terdahulu lewat jaringan peer mentor",
  },
];
