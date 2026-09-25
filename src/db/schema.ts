import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Catering inquiries submitted from the Catering page / homepage catering form.
export const cateringInquiries = pgTable("catering_inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  eventDate: varchar("event_date", { length: 40 }),
  guestCount: varchar("guest_count", { length: 20 }),
  eventType: varchar("event_type", { length: 80 }),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  // Admin workflow status. Kept as a plain varchar (rather than a DB enum) so
  // the set of allowed values can evolve without an enum migration; validity
  // is enforced in application code (see CATERING_STATUS_VALUES).
  status: varchar("status", { length: 20 }).default("new").notNull(),
});

// General contact messages submitted from the Contact page.
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  readAt: timestamp("read_at", { withTimezone: true }),
});

// Administrator accounts for the private /admin dashboard. There is no public
// signup route — rows are only ever created via `npm run create-admin`.
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const CATERING_STATUS_VALUES = ["new", "contacted", "completed"] as const;
export type CateringStatus = (typeof CATERING_STATUS_VALUES)[number];
