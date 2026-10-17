import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { Program } from "@/types/program";

export const getProgramByIdOrSlug = cache(async (id: string): Promise<Program | null> => {
  if (!supabase) return null;

  try {
    // 1. Try finding by UUID / ID
    const { data, error } = await supabase.from("programs").select("*").eq("id", id).maybeSingle();

    if (!error && data) {
      return data as Program;
    }

    // 2. Fallback: try by slug
    const { data: dataSlug } = await supabase
      .from("programs")
      .select("*")
      .eq("slug", id)
      .maybeSingle();

    if (dataSlug) {
      return dataSlug as Program;
    }

    return null;
  } catch (err) {
    console.error("Error fetching program detail:", err);
    return null;
  }
});
