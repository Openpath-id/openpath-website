import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  // Ambil searchParams di luar try-catch agar sinyal internal prerender Next.js tidak tertangkap sebagai error 500
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type"); // 'all' | 'beasiswa' | 'sertifikasi'
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "4", 10);

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase credentials are not configured on server" },
      { status: 500 },
    );
  }

  try {
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
      )
      .not("deadline_date", "is", null);

    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    query = query
      .order("is_deadline_estimated", { ascending: true })
      .order("deadline_date", { ascending: true, nullsFirst: false });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
      console.error("Supabase RPC error in API Route:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err: unknown) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
