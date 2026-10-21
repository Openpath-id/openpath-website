import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  try {
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (err: unknown) {
    console.error("Logout API error:", err);
  }

  const response = NextResponse.json({ success: true, message: "Logout berhasil" });

  // Clear session cookies
  response.cookies.set("openpath_session", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("openpath_session_expires", "", {
    httpOnly: false,
    maxAge: 0,
    path: "/",
  });

  return response;
}
