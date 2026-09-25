import type { Metadata } from "next";
import Link from "next/link";
import {
  getDashboardStats,
  getRecentCateringInquiries,
  getRecentContactMessages,
} from "@/db/admin-queries";
import { StatCard } from "@/components/admin/StatCard";
import { ReadBadge, CateringStatusBadge } from "@/components/admin/StatusBadge";
import type { CateringStatus } from "@/db/schema";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const [stats, recentMessages, recentCatering] = await Promise.all([
    getDashboardStats(),
    getRecentContactMessages(5),
    getRecentCateringInquiries(5),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-2xl font-medium text-charcoal sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-charcoal/60">An overview of customer inquiries.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total Messages" value={stats.totalMessages} />
        <StatCard label="Unread Messages" value={stats.unreadMessages} accent={stats.unreadMessages > 0} />
        <StatCard label="Total Catering Requests" value={stats.totalCatering} />
        <StatCard label="New Catering Requests" value={stats.newCatering} accent={stats.newCatering > 0} />
      </div>

      <section aria-labelledby="recent-messages-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="recent-messages-heading" className="font-serif text-lg font-medium text-charcoal">
            Recent Contact Messages
          </h2>
          <Link href="/admin/messages" className="text-xs font-semibold uppercase tracking-[0.08em] text-burgundy hover:underline">
            View all
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="border border-charcoal/10 bg-white/40 p-6 text-sm text-charcoal/60">
            No contact messages yet.
          </p>
        ) : (
          <ul className="divide-y divide-charcoal/10 border border-charcoal/10 bg-white/40">
            {recentMessages.map((message) => (
              <li key={message.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-charcoal">{message.name}</p>
                  <p className="truncate text-xs text-charcoal/60">{message.email}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-charcoal/50 sm:inline">
                    {formatDate(message.createdAt)}
                  </span>
                  <ReadBadge isRead={message.isRead} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="recent-catering-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="recent-catering-heading" className="font-serif text-lg font-medium text-charcoal">
            Recent Catering Requests
          </h2>
          <Link href="/admin/catering" className="text-xs font-semibold uppercase tracking-[0.08em] text-burgundy hover:underline">
            View all
          </Link>
        </div>

        {recentCatering.length === 0 ? (
          <p className="border border-charcoal/10 bg-white/40 p-6 text-sm text-charcoal/60">
            No catering requests yet.
          </p>
        ) : (
          <ul className="divide-y divide-charcoal/10 border border-charcoal/10 bg-white/40">
            {recentCatering.map((inquiry) => (
              <li key={inquiry.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-charcoal">{inquiry.name}</p>
                  <p className="truncate text-xs text-charcoal/60">
                    {inquiry.eventType || "Event"} · {inquiry.guestCount || "?"} guests
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-charcoal/50 sm:inline">
                    {formatDate(inquiry.createdAt)}
                  </span>
                  <CateringStatusBadge status={inquiry.status as CateringStatus} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
