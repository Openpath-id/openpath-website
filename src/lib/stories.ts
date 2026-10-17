import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { ApplicantStory } from "@/types/story";

export const getRelatedStories = cache(
  async (programId?: string, limit: number = 2): Promise<ApplicantStory[]> => {
    if (!supabase) return [];

    try {
      let query = supabase
        .from("applicant_stories")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (programId) {
        query = query.eq("program_id", programId);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        return data as ApplicantStory[];
      }

      // Fallback to any published stories if no specific story for this program
      const { data: generalData } = await supabase
        .from("applicant_stories")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(limit);

      return (generalData as ApplicantStory[]) || [];
    } catch (err) {
      console.error("Error fetching related stories from Supabase:", err);
      return [];
    }
  },
);

export const getInitialStories = cache(async (limit: number = 6): Promise<ApplicantStory[]> => {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("applicant_stories")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (!error && data && data.length > 0) {
      return data as ApplicantStory[];
    }
    return [];
  } catch (err) {
    console.error("Error fetching initial stories from Supabase:", err);
    return [];
  }
});

export const getStoryByIdOrSlug = cache(async (id: string): Promise<ApplicantStory | null> => {
  if (!supabase) return null;

  try {
    // 1. Try finding by UUID / ID
    const { data, error } = await supabase
      .from("applicant_stories")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return data as ApplicantStory;
    }

    // 2. Fallback: try by slug
    const { data: dataSlug } = await supabase
      .from("applicant_stories")
      .select("*")
      .eq("slug", id)
      .maybeSingle();

    if (dataSlug) {
      return dataSlug as ApplicantStory;
    }

    return null;
  } catch (err) {
    console.error("Error fetching applicant story detail:", err);
    return null;
  }
});
