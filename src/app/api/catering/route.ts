import { db } from "@/db";
import { cateringInquiries } from "@/db/schema";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { cateringRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";

const MAX_BODY_SIZE = 10_000;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_EVENT_TYPE_LENGTH = 100;
const MAX_GUEST_COUNT_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2_000;

function isValidDateString(value: string): boolean {
  // Require YYYY-MM-DD.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isValidGuestCount(value: string): boolean {
  if (!/^\d+$/.test(value)) {
    return false;
  }

  const count = Number(value);

  // Reject impossible/unreasonably large values.
  return Number.isSafeInteger(count) && count >= 1 && count <= 10_000;
}

export async function POST(request: Request) {
    const ip = getClientIp(request);

  try {
    const { success, reset } = await cateringRateLimit.limit(ip);

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
  // Only accept JSON.
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json(
      { error: "Invalid request format." },
      { status: 415 },
    );
  }

  // Read the raw body first so very large requests can be rejected.
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

  // Reject null, arrays, and non-object values.
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

  const {
    name,
    email,
    phone,
    eventDate,
    guestCount,
    eventType,
    message,
  } = body as Record<string, unknown>;

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

  if (typeof phone !== "string") {
    return Response.json(
      { error: "A valid phone number is required." },
      { status: 400 },
    );
  }

  const trimmedPhone = phone.trim();

  if (
    trimmedPhone.length === 0 ||
    trimmedPhone.length > MAX_PHONE_LENGTH ||
    !isValidPhone(trimmedPhone)
  ) {
    return Response.json(
      { error: "A valid phone number is required." },
      { status: 400 },
    );
  }

  // -----------------------------
  // EVENT DATE
  // -----------------------------

  let normalizedEventDate: string | null = null;

  if (eventDate !== undefined && eventDate !== null) {
    if (typeof eventDate !== "string") {
      return Response.json(
        { error: "Invalid event date." },
        { status: 400 },
      );
    }

    normalizedEventDate = eventDate.trim();

    if (
      normalizedEventDate &&
      !isValidDateString(normalizedEventDate)
    ) {
      return Response.json(
        { error: "Invalid event date." },
        { status: 400 },
      );
    }

    if (!normalizedEventDate) {
      normalizedEventDate = null;
    }
  }

  // -----------------------------
  // GUEST COUNT
  // -----------------------------

  let normalizedGuestCount: string | null = null;

  if (guestCount !== undefined && guestCount !== null) {
    if (typeof guestCount !== "string") {
      return Response.json(
        { error: "Invalid guest count." },
        { status: 400 },
      );
    }

    normalizedGuestCount = guestCount.trim();

    if (
      normalizedGuestCount &&
      (
        normalizedGuestCount.length > MAX_GUEST_COUNT_LENGTH ||
        !isValidGuestCount(normalizedGuestCount)
      )
    ) {
      return Response.json(
        { error: "Invalid guest count." },
        { status: 400 },
      );
    }

    if (!normalizedGuestCount) {
      normalizedGuestCount = null;
    }
  }

  // -----------------------------
  // EVENT TYPE
  // -----------------------------

  let normalizedEventType: string | null = null;

  if (eventType !== undefined && eventType !== null) {
    if (typeof eventType !== "string") {
      return Response.json(
        { error: "Invalid event type." },
        { status: 400 },
      );
    }

    normalizedEventType = eventType.trim();

    if (normalizedEventType.length > MAX_EVENT_TYPE_LENGTH) {
      return Response.json(
        { error: "Event type is too long." },
        { status: 400 },
      );
    }

    if (!normalizedEventType) {
      normalizedEventType = null;
    }
  }

  // -----------------------------
  // MESSAGE
  // -----------------------------

  let normalizedMessage: string | null = null;

  if (message !== undefined && message !== null) {
    if (typeof message !== "string") {
      return Response.json(
        { error: "Invalid message." },
        { status: 400 },
      );
    }

    normalizedMessage = message.trim();

    if (normalizedMessage.length > MAX_MESSAGE_LENGTH) {
      return Response.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }

    if (!normalizedMessage) {
      normalizedMessage = null;
    }
  }

  // -----------------------------
  // DATABASE
  // -----------------------------

  try {
    await db.insert(cateringInquiries).values({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      eventDate: normalizedEventDate,
      guestCount: normalizedGuestCount,
      eventType: normalizedEventType,
      message: normalizedMessage,
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
    // Never expose raw database errors publicly.
    return Response.json(
      {
        error:
          "Could not save your inquiry. Please try again.",
      },
      { status: 500 },
    );
  }
}