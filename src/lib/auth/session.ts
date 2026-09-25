// Uses the standard Web Crypto API (globalThis.crypto.subtle) rather than
// Node's `crypto` module so this file works unmodified in both the regular
// Node.js server runtime (server actions, route handlers, layouts) and the
// Edge runtime (middleware) — no experimental Next.js runtime flags needed.

export const ADMIN_SESSION_COOKIE = "admin_session";

// 8 hours. Short enough to limit the blast radius of a stolen cookie, long
// enough that the owner isn't repeatedly logged out during a shift.
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

export type AdminSessionPayload = {
  sub: number; // admin_users.id
  email: string;
  name: string;
  iat: number; // issued-at, unix seconds
  exp: number; // expiry, unix seconds
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.trim().length < 32) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Set a long random value in your environment (.env.local).",
    );
  }
  return secret;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * Creates a signed, opaque session token: `<base64url payload>.<base64url hmac>`.
 * The token is self-contained (no DB session table) — the server only needs
 * to verify the signature and expiry, which keeps the admin system simple.
 * Never expose this token or AUTH_SECRET to the browser except as the value
 * of the httpOnly session cookie.
 */
export async function createSessionToken(admin: { id: number; email: string; name: string }): Promise<string> {
  const secret = getAuthSecret();
  const key = await getHmacKey(secret);
  const nowSeconds = Math.floor(Date.now() / 1000);

  const payload: AdminSessionPayload = {
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    iat: nowSeconds,
    exp: nowSeconds + SESSION_MAX_AGE_SECONDS,
  };

  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signatureBytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(encodedPayload)));
  const signature = base64UrlEncode(signatureBytes);

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a session token's signature and expiry. Returns the decoded
 * payload on success, or null if the token is missing, malformed, expired,
 * or has an invalid signature. Callers must treat `null` as "not logged in".
 */
export async function verifySessionToken(token: string | undefined | null): Promise<AdminSessionPayload | null> {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [encodedPayload, signature] = parts;

  let secret: string;
  try {
    secret = getAuthSecret();
  } catch {
    return null;
  }

let signatureBuffer: ArrayBuffer;

try {
  const decodedSignature = base64UrlDecode(signature);

  const buffer = new ArrayBuffer(decodedSignature.byteLength);
  new Uint8Array(buffer).set(decodedSignature);

  signatureBuffer = buffer;
} catch {
  return null;
}

const key = await getHmacKey(secret);

const isValid = await crypto.subtle.verify(
  "HMAC",
  key,
  signatureBuffer,
  encoder.encode(encodedPayload),
);
 if (!isValid) return null;

let payload: AdminSessionPayload;

try {
  payload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload)));
} catch {
  return null;
}

if (
  !Number.isSafeInteger(payload.sub) ||
  payload.sub <= 0 ||
  typeof payload.email !== "string" ||
  payload.email.length === 0 ||
  payload.email.length > 254 ||
  typeof payload.name !== "string" ||
  payload.name.length === 0 ||
  payload.name.length > 100 ||
  !Number.isSafeInteger(payload.iat) ||
  !Number.isSafeInteger(payload.exp)
) {
  return null;
}

const nowSeconds = Math.floor(Date.now() / 1000);

if (payload.exp <= nowSeconds) {
  return null;
}

if (payload.iat > nowSeconds) {
  return null;
}

if (payload.exp - payload.iat > SESSION_MAX_AGE_SECONDS) {
  return null;
}

return payload;
}