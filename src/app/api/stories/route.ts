import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ApplicantStory } from "@/types/story";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search")?.toLowerCase().trim() || "";
  const category = searchParams.get("category") || "all";
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase client is not configured on server" },
      { status: 500 },
    );
  }

  try {
    let query = supabase
      .from("applicant_stories")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (category !== "all") {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,author_name.ilike.%${search}%,author_role.ilike.%${search}%`,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase applicant_stories query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      stories: (data as ApplicantStory[]) || [],
      totalCount: data?.length || 0,
    });
  } catch (err: unknown) {
    console.error("Error in /api/stories route:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
