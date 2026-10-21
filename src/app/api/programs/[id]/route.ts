import { NextRequest, NextResponse } from "next/server";
import { getProgramByIdOrSlug } from "@/lib/programs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const program = await getProgramByIdOrSlug(id);

    if (!program) {
      return NextResponse.json({ error: "Program tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(program);
  } catch (err: unknown) {
    console.error("Single program API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID Program tidak valid" }, { status: 400 });
    }

    // Prepare updated fields
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.type !== undefined) updateData.type = body.type;
    if (body.name !== undefined) updateData.name = body.name;
    if (body.organizer !== undefined) updateData.organizer = body.organizer;
    if (body.is_verified !== undefined) updateData.is_verified = Boolean(body.is_verified);
    if (body.education_levels !== undefined) updateData.education_levels = body.education_levels;
    if (body.destination_scope !== undefined) updateData.destination_scope = body.destination_scope;
    if (body.deadline_date !== undefined) updateData.deadline_date = body.deadline_date;
    if (body.schedule_notes !== undefined) updateData.schedule_notes = body.schedule_notes;
    if (body.eligibility_summary !== undefined)
      updateData.eligibility_summary = body.eligibility_summary;
    if (body.funding_coverage !== undefined) updateData.funding_coverage = body.funding_coverage;
    if (body.category !== undefined) updateData.category = body.category;

    // Check supabase client
    const { supabase } = await import("@/lib/supabase");
    if (!supabase) {
      return NextResponse.json({ error: "Koneksi Supabase tidak ditemukan" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("programs")
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      console.warn(
        "Supabase update: 0 baris diperbarui. Hal ini disebabkan oleh Row Level Security (RLS) pada tabel programs.",
      );
      return NextResponse.json(
        {
          error:
            "Database Supabase menolak update (0 baris terpengaruh karena RLS). Masukkan SUPABASE_SERVICE_ROLE_KEY di .env atau izinkan UPDATE policy di dashboard Supabase.",
        },
        { status: 403 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Program berhasil diperbarui",
      program: data,
    });
  } catch (err: unknown) {
    console.error("Update program API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Terjadi kesalahan internal" },
      { status: 500 },
    );
  }
}
