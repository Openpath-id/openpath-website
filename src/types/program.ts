export type ProgramType = "beasiswa" | "sertifikasi";

export interface Program {
  id: string;
  created_at?: string;
  updated_at?: string;
  type: ProgramType;
  name: string;
  slug?: string | null;
  category?: string | null;
  organizer: string;
  deadline_date?: string | null;
  deadline_status?: string | null;
  next_deadline_est?: string | null;
  schedule_notes?: string | null;
  eligibility_summary?: string | null;
  funding_coverage?: string | null;
  official_link?: string | null;
  applicant_stories?: string | null;
  is_verified: boolean;
  verification_status?: string | null;
  education_levels?: string[] | null;
  destination_scope?: string | null;
  is_deadline_estimated?: boolean;
}
