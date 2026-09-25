import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { isValidEmail } from "@/lib/validation";
import { contactRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";

const MAX_BODY_SIZE = 10_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 2_000;

export async function POST(request: Request) {
  // Rate-limit requests by client IP.
  const ip = getClientIp(request);

  try {
    const { success, reset } = await contactRateLimit.limit(ip);

    if (!success) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
            ),
            "Cache-Control": "no-store",
          },
        },
      );
    }
  } catch {
    // Fail closed if the rate-limit service is unavailable.
    return Response.json(
      { error: "Please try again later." },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  // Only accept JSON requests.
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json(
      { error: "Invalid request format." },
      { status: 415 },
    );
  }

  // Read the raw body first so extremely large requests can be rejected.
  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (rawBody.length > MAX_BODY_SIZE) {
    return Response.json(
      { error: "Request is too large." },
      { status: 413 },
    );
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Reject null, arrays, and other non-object request bodies.
  if (
    body === null ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return Response.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, phone, message } =
    body as Record<string, unknown>;

  // -----------------------------
  // NAME
  // -----------------------------

  if (typeof name !== "string") {
    return Response.json(
      { error: "Name is required." },
      { status: 400 },
    );
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    return Response.json(
      { error: "Name is required." },
      { status: 400 },
    );
  }

  if (trimmedName.length > MAX_NAME_LENGTH) {
    return Response.json(
      { error: "Name is too long." },
      { status: 400 },
    );
  }

  // -----------------------------
  // EMAIL
  // -----------------------------

  if (typeof email !== "string") {
    return Response.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (
    trimmedEmail.length > MAX_EMAIL_LENGTH ||
    !isValidEmail(trimmedEmail)
  ) {
    return Response.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  // -----------------------------
  // PHONE
  // -----------------------------

  let trimmedPhone: string | null = null;

  if (typeof phone === "string") {
    trimmedPhone = phone.trim();

    if (trimmedPhone.length > MAX_PHONE_LENGTH) {
      return Response.json(
        { error: "Invalid Phone Number." },
        { status: 400 },
      );
    }

    if (!trimmedPhone) {
      trimmedPhone = null;
    }
  }

  // -----------------------------
  // MESSAGE
  // -----------------------------

  if (typeof message !== "string") {
    return Response.json(
      { error: "A message is required." },
      { status: 400 },
    );
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 5) {
    return Response.json(
      { error: "A message is required." },
      { status: 400 },
    );
  }

  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  // -----------------------------
  // DATABASE
  // -----------------------------

  try {
    await db.insert(contactMessages).values({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      message: trimmedMessage,
    });

    return Response.json(
      { ok: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    // Never expose raw database errors to the public.
    return Response.json(
      {
        error:
          "Could not send your message. Please try again.",
      },
      { status: 500 },
    );
  }
}