import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { loginSchema } from "@/app/validation";

const SIX_HOURS_IN_SECONDS = 6 * 60 * 60; // 21,600 seconds (6 hours)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasi input menggunakan Zod
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || "Data input tidak valid";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { email, password } = validation.data;

    if (!supabase) {
      return NextResponse.json(
        { error: "Konfigurasi Supabase belum lengkap di server" },
        { status: 500 },
      );
    }

    // Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Email atau kata sandi tidak valid" },
        { status: 401 },
      );
    }

    // Check if user is active/valid
    const user = data.user;
    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    const expiresAt = Date.now() + SIX_HOURS_IN_SECONDS * 1000;

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role || "admin",
      },
      session: data.session,
      expiresAt,
    });

    // 1. Session Token Cookie for Next.js Middleware (httpOnly, 6 hours)
    response.cookies.set("openpath_session", data.session?.access_token || "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SIX_HOURS_IN_SECONDS,
      path: "/",
    });

    // 2. Expiry Timestamp Cookie (accessible to client for timer synchronization)
    response.cookies.set("openpath_session_expires", String(expiresAt), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SIX_HOURS_IN_SECONDS,
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Terjadi kesalahan internal" },
      { status: 500 },
    );
  }
}
