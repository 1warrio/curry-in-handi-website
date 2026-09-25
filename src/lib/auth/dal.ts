import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifySessionToken, type AdminSessionPayload } from "./session";

/**
 * Reads and verifies the admin session cookie for the current request.
 * Returns null when the visitor is not authenticated (no cookie, expired,
 * or tampered token). Safe to call from server components, server actions,
 * and route handlers.
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return await verifySessionToken(token);
}

/**
 * Like `getAdminSession`, but redirects unauthenticated visitors to
 * /admin/login instead of returning null. Use this at the top of any
 * server component, server action, or route handler that performs an
 * admin-only operation — never rely on the middleware redirect alone.
 */
export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
