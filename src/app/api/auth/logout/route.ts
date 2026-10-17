import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    if (supabase) {
      await supabase.auth.signOut();
    }
    return NextResponse.json({ success: true, message: "Logout berhasil" });
  } catch (err: unknown) {
    console.error("Logout API error:", err);
    return NextResponse.json({ success: true });
  }
}
