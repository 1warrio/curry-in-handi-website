"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/dal";
import { deleteCateringInquiry, isValidCateringStatus, updateCateringStatus } from "@/db/admin-queries";

export type CateringActionResult = { ok: true } | { ok: false; error: string };

export async function updateCateringStatusAction(id: number, status: string): Promise<CateringActionResult> {
  await requireAdminSession();

  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, error: "Invalid request." };
  }
  if (!isValidCateringStatus(status)) {
    return { ok: false, error: "Invalid status value." };
  }

  try {
    await updateCateringStatus(id, status);
  } catch {
    return { ok: false, error: "Could not update the status. Please try again." };
  }

  revalidatePath("/admin/catering");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteCateringAction(id: number): Promise<CateringActionResult> {
  await requireAdminSession();

  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, error: "Invalid request." };
  }

  try {
    await deleteCateringInquiry(id);
  } catch {
    return { ok: false, error: "Could not delete the inquiry. Please try again." };
  }

  revalidatePath("/admin/catering");
  revalidatePath("/admin");
  return { ok: true };
}
