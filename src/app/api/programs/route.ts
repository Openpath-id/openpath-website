import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search")?.trim() || "";
  const type = searchParams.get("type"); // 'all' | 'beasiswa' | 'sertifikasi'
  const educationLevel = searchParams.get("education_level"); // 'S1' | 'S2' | 'S3' | 'all'
  const verification = searchParams.get("verification"); // 'all' | 'verified' | 'unverified'
  const sortBy = searchParams.get("sort") || "nearest"; // 'nearest' | 'newest' | 'az'
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase credentials are not configured on server" },
      { status: 500 },
    );
  }

  try {
    // 1. Build Query for filtered programs
    let query = supabase.from("programs").select(
      `
      id,
      type,
      name,
      slug,
      organizer,
      deadline_date,
      deadline_status,
      next_deadline_est,
      is_deadline_estimated,
      funding_coverage,
      education_levels,
      is_verified
    `,
      { count: "exact" },
    );

    // Filter: Search Keyword (name or organizer)
    if (search) {
      query = query.or(`name.ilike.%${search}%,organizer.ilike.%${search}%`);
    }

    // Filter: Kategori Peluang (Type)
    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    // Filter: Jenjang Pendidikan (education_levels array)
    if (educationLevel && educationLevel !== "all") {
      query = query.contains("education_levels", [educationLevel]);
    }

    // Filter: Status Verifikasi
    if (verification === "verified") {
      query = query.eq("is_verified", true);
    } else if (verification === "unverified") {
      query = query.eq("is_verified", false);
    }

    // Sorting
    if (sortBy === "nearest") {
      query = query
        .order("is_deadline_estimated", { ascending: true })
        .order("deadline_date", { ascending: true, nullsFirst: false });
    } else if (sortBy === "furthest") {
      query = query
        .order("is_deadline_estimated", { ascending: true })
        .order("deadline_date", { ascending: false, nullsFirst: false });
    } else {
      query = query
        .order("is_deadline_estimated", { ascending: true })
        .order("deadline_date", { ascending: true, nullsFirst: false });
    }

    // Pagination Range
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error("Supabase programs query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Aggregate Counts for Sidebar Badges
    // We compute total counts for filters (beasiswa, sertifikasi, S1, S2, S3, verified, unverified)
    const [beasiswaRes, sertifikasiRes, s1Res, s2Res, s3Res, verifiedRes, unverifiedRes] =
      await Promise.all([
        supabase
          .from("programs")
          .select("*", { count: "exact", head: true })
          .eq("type", "beasiswa"),
        supabase
          .from("programs")
          .select("*", { count: "exact", head: true })
          .eq("type", "sertifikasi"),
        supabase
          .from("programs")
          .select("*", { count: "exact", head: true })
          .contains("education_levels", ["S1"]),
        supabase
          .from("programs")
          .select("*", { count: "exact", head: true })
          .contains("education_levels", ["S2"]),
        supabase
          .from("programs")
          .select("*", { count: "exact", head: true })
          .contains("education_levels", ["S3"]),
        supabase
          .from("programs")
          .select("*", { count: "exact", head: true })
          .eq("is_verified", true),
        supabase
          .from("programs")
          .select("*", { count: "exact", head: true })
          .eq("is_verified", false),
      ]);

    const counts = {
      beasiswa: beasiswaRes.count ?? 0,
      sertifikasi: sertifikasiRes.count ?? 0,
      s1: s1Res.count ?? 0,
      s2: s2Res.count ?? 0,
      s3: s3Res.count ?? 0,
      verified: verifiedRes.count ?? 0,
      unverified: unverifiedRes.count ?? 0,
    };

    return NextResponse.json({
      programs: data || [],
      totalCount: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit) || 1,
      counts,
    });
  } catch (err: unknown) {
    console.error("API /api/programs error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
