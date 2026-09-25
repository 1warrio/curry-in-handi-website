import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * First line of defense for the admin area: runs before any /admin route
 * renders. This is NOT the only check — every admin page, layout, server
 * action, and mutation also verifies the session server-side (see
 * requireAdminSession in src/lib/auth/dal.ts), because middleware alone is
 * not sufficient authorization in Next.js.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  const isLoginRoute = pathname === "/admin/login";

  if (isLoginRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
