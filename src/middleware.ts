import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("openpath_session")?.value;
  const sessionExpiresStr = request.cookies.get("openpath_session_expires")?.value;

  const isSessionValid = Boolean(
    sessionToken && sessionExpiresStr && Number(sessionExpiresStr) > Date.now(),
  );

  // 1. Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    if (!isSessionValid) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);

      // Clean up invalid or expired session cookies
      response.cookies.set("openpath_session", "", { maxAge: 0, path: "/" });
      response.cookies.set("openpath_session_expires", "", { maxAge: 0, path: "/" });
      return response;
    }
  }

  // 2. If already logged in with valid session and visiting /login, redirect directly to /admin
  if (pathname === "/login") {
    if (isSessionValid) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
