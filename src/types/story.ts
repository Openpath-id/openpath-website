export interface JourneyStep {
  step: number;
  title: string;
  description: string;
}

export interface ApplicantStory {
  id: string;
  program_id?: string;
  category: "beasiswa" | "sertifikasi";
  badge: string;
  author_name: string;
  author_role: string;
  author_avatar?: string;
  program_name?: string;
  period?: string;
  title: string;
  slug: string;
  excerpt: string;

  // Detail fields (sesuai Gambar 5 untuk persiapan tabel & detail)
  story_overview?: string;
  story_quote?: string;
  journey_steps?: JourneyStep[];
  reflection_key?: string;
  takeaway_points?: string[];
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;

  // Backward compatibility alias
  authorName?: string;
  authorRole?: string;
}
