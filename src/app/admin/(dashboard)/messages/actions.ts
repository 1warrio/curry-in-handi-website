"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/dal";
import { deleteContactMessage, setContactMessageRead } from "@/db/admin-queries";

export type MessageActionResult = { ok: true } | { ok: false; error: string };

export async function markMessageReadAction(id: number, isRead: boolean): Promise<MessageActionResult> {
  await requireAdminSession();

  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, error: "Invalid message." };
  }

  try {
    await setContactMessageRead(id, isRead);
  } catch {
    return { ok: false, error: "Could not update the message. Please try again." };
  }

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteMessageAction(id: number): Promise<MessageActionResult> {
  await requireAdminSession();

  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, error: "Invalid message." };
  }

  try {
    await deleteContactMessage(id);
  } catch {
    return { ok: false, error: "Could not delete the message. Please try again." };
  }

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { ok: true };
}
