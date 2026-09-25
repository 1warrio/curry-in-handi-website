import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  CATERING_STATUS_VALUES,
  adminUsers,
  cateringInquiries,
  contactMessages,
  type CateringStatus,
} from "@/db/schema";

export type AdminUserRecord = {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
};

export async function getAdminByEmail(email: string): Promise<AdminUserRecord | null> {
  const rows = await db
    .select({
      id: adminUsers.id,
      email: adminUsers.email,
      passwordHash: adminUsers.passwordHash,
      name: adminUsers.name,
    })
    .from(adminUsers)
    .where(eq(adminUsers.email, email.trim().toLowerCase()))
    .limit(1);

  return rows[0] ?? null;
}

export type DashboardStats = {
  totalMessages: number;
  unreadMessages: number;
  totalCatering: number;
  newCatering: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalMessagesRow] = await db.select({ value: count() }).from(contactMessages);
  const [unreadMessagesRow] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.isRead, false));
  const [totalCateringRow] = await db.select({ value: count() }).from(cateringInquiries);
  const [newCateringRow] = await db
    .select({ value: count() })
    .from(cateringInquiries)
    .where(eq(cateringInquiries.status, "new"));

  return {
    totalMessages: totalMessagesRow?.value ?? 0,
    unreadMessages: unreadMessagesRow?.value ?? 0,
    totalCatering: totalCateringRow?.value ?? 0,
    newCatering: newCateringRow?.value ?? 0,
  };
}

export type ContactMessageRecord = typeof contactMessages.$inferSelect;
export type CateringInquiryRecord = typeof cateringInquiries.$inferSelect;

export async function getAllContactMessages(): Promise<ContactMessageRecord[]> {
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function getRecentContactMessages(limit: number): Promise<ContactMessageRecord[]> {
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(limit);
}

export async function getAllCateringInquiries(): Promise<CateringInquiryRecord[]> {
  return db.select().from(cateringInquiries).orderBy(desc(cateringInquiries.createdAt));
}

export async function getRecentCateringInquiries(limit: number): Promise<CateringInquiryRecord[]> {
  return db.select().from(cateringInquiries).orderBy(desc(cateringInquiries.createdAt)).limit(limit);
}

export async function setContactMessageRead(id: number, isRead: boolean): Promise<void> {
  await db
    .update(contactMessages)
    .set({ isRead, readAt: isRead ? new Date() : null })
    .where(eq(contactMessages.id, id));
}

export async function deleteContactMessage(id: number): Promise<void> {
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}

export function isValidCateringStatus(value: string): value is CateringStatus {
  return (CATERING_STATUS_VALUES as readonly string[]).includes(value);
}

export async function updateCateringStatus(id: number, status: CateringStatus): Promise<void> {
  await db.update(cateringInquiries).set({ status }).where(eq(cateringInquiries.id, id));
}

export async function deleteCateringInquiry(id: number): Promise<void> {
  await db.delete(cateringInquiries).where(eq(cateringInquiries.id, id));
}
