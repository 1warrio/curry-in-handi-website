"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminByEmail } from "@/db/admin-queries";
import { isValidEmail } from "@/lib/validation";
import { verifyPassword } from "./password";
import { ADMIN_SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken } from "./session";
import { headers } from "next/headers";
import { loginRateLimit } from "@/lib/rate-limit";
import { getClientIpFromHeaders } from "@/lib/request-ip";

export type LoginState = {
  error: string | null;
};

/**
 * Verifies the submitted credentials and, on success, sets a signed,
 * httpOnly session cookie and redirects to the dashboard. On failure it
 * returns a single generic error message — the same one for "no such
 * account" and "wrong password" — so the login form never reveals which
 * emails have admin accounts.
 */
export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
const password = String(formData.get("password") ?? "");
const redirectTo = String(formData.get("redirectTo") ?? "/admin");

function getSafeRedirectPath(value: string): string {
  if (value === "/admin" || value.startsWith("/admin/")) {
    return value;
  }

  return "/admin";
}

const safeRedirectTo = getSafeRedirectPath(redirectTo);

  if (!isValidEmail(email) || !password) {
    return { error: "Enter a valid email and password." };
  }
    const requestHeaders = await headers();
  const ip = getClientIpFromHeaders(requestHeaders);

  const rateLimitKey = `${ip}:${email.toLowerCase()}`;

  try {
    const { success, reset } = await loginRateLimit.limit(rateLimitKey);

    if (!success) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((reset - Date.now()) / 1000),
      );

      return {
        error: `Too many login attempts. Please try again in about ${Math.ceil(
          retryAfterSeconds / 60,
        ) || 1} minute.`,
      };
    }
  } catch {
    return {
      error: "Please try again later.",
    };
  }

  const admin = await getAdminByEmail(email);
  if (!admin) {
    // Run a verification anyway against a dummy hash so responding to a
    // nonexistent account takes roughly the same time as a wrong password,
    // which avoids leaking which emails have admin accounts via timing.
    await verifyPassword(password, DUMMY_HASH);
    return { error: "Invalid email or password." };
  }

  const passwordMatches = await verifyPassword(password, admin.passwordHash);
  if (!passwordMatches) {
    return { error: "Invalid email or password." };
  }

  const token = await createSessionToken({ id: admin.id, email: admin.email, name: admin.name });
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.VERCEL === "1",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

redirect(safeRedirectTo);
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

// A syntactically valid scrypt hash of an arbitrary password, used only to
// keep the "no such admin" branch's timing similar to the "wrong password"
// branch above. It does not correspond to any real account.
const DUMMY_HASH =
  "scrypt:16384:8:1:00000000000000000000000000000000:00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
