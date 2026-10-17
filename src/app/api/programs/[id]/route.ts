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
