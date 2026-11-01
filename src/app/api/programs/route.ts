import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sortProgramsByDeadline } from "@/lib/deadline";

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
    // 1. Build Query for filtered programs (Only programs with deadline_date)
    let query = supabase
      .from("programs")
      .select(
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
      )
      .not("deadline_date", "is", null);

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

    const { data, count, error } = await query;

    if (error) {
      console.error("Supabase programs query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Sorting & Pagination (di server, berdasarkan deadline mendatang yang tampil di card)
    const sorted = sortProgramsByDeadline(data || [], sortBy === "furthest" ? "desc" : "asc");
    const from = (page - 1) * limit;
    const pagedPrograms = sorted.slice(from, from + limit);

    // 2. Aggregate Counts for Sidebar Badges & Admin Cards
    const today = new Date().toISOString().split("T")[0];
    const [
      beasiswaRes,
      sertifikasiRes,
      s1Res,
      s2Res,
      s3Res,
      verifiedRes,
      unverifiedRes,
      activeRes,
    ] = await Promise.all([
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .eq("type", "beasiswa"),
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .eq("type", "sertifikasi"),
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .contains("education_levels", ["S1"]),
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .contains("education_levels", ["S2"]),
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .contains("education_levels", ["S3"]),
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .eq("is_verified", true),
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .eq("is_verified", false),
      supabase
        .from("programs")
        .select("*", { count: "exact", head: true })
        .not("deadline_date", "is", null)
        .gte("deadline_date", today),
    ]);

    const counts = {
      beasiswa: beasiswaRes.count ?? 0,
      sertifikasi: sertifikasiRes.count ?? 0,
      s1: s1Res.count ?? 0,
      s2: s2Res.count ?? 0,
      s3: s3Res.count ?? 0,
      verified: verifiedRes.count ?? 0,
      unverified: unverifiedRes.count ?? 0,
      active: activeRes.count ?? 0,
    };

    return NextResponse.json({
      programs: pagedPrograms,
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

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Koneksi Supabase tidak dikonfigurasi pada server" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const {
      type,
      name,
      organizer,
      is_verified,
      education_levels,
      destination_scope,
      deadline_date,
      schedule_notes,
      eligibility_summary,
      funding_coverage,
    } = body;

    if (!name || !type || !organizer) {
      return NextResponse.json(
        { error: "Nama, kategori, dan penyelenggara wajib diisi" },
        { status: 400 },
      );
    }

    // Buat slug yang unik dan URL-friendly dari nama program
    const baseSlug = (name as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug = `${baseSlug}-${randomSuffix}`;

    const newRecord = {
      type,
      name: (name as string).trim(),
      slug,
      organizer: (organizer as string).trim(),
      is_verified: Boolean(is_verified),
      education_levels: Array.isArray(education_levels) ? education_levels : [],
      destination_scope: destination_scope || "Dalam Negeri",
      deadline_date: deadline_date || null,
      schedule_notes: schedule_notes ? (schedule_notes as string).trim() : null,
      eligibility_summary: eligibility_summary ? (eligibility_summary as string).trim() : null,
      funding_coverage: funding_coverage ? (funding_coverage as string).trim() : null,
      category: type === "beasiswa" ? "Beasiswa Umum" : "Sertifikasi Profesional",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("programs").insert(newRecord).select().single();

    if (error) {
      console.error("Supabase program insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Program berhasil ditambahkan",
        program: data,
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    console.error("Create program API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Terjadi kesalahan internal" },
      { status: 500 },
    );
  }
}
