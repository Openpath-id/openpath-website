import { NextRequest, NextResponse } from "next/server";
import { getStoryByIdOrSlug } from "@/lib/stories";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const story = await getStoryByIdOrSlug(id);

    if (!story) {
      return NextResponse.json({ error: "Cerita aplikan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (err: unknown) {
    console.error("Single story API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
