"use client";

import { useEffect, useMemo, useState } from "react";
import { deleteCateringAction, updateCateringStatusAction } from "@/app/admin/(dashboard)/catering/actions";
import { CateringStatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import type { CateringInquiryRecord } from "@/db/admin-queries";
import { CATERING_STATUS_VALUES, type CateringStatus } from "@/db/schema";

type SortOrder = "newest" | "oldest";
type StatusFilter = "all" | CateringStatus;

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function CateringTable({ initialInquiries }: { initialInquiries: CateringInquiryRecord[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  useEffect(() => {
  setInquiries(initialInquiries);
}, [initialInquiries]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const visibleInquiries = useMemo(() => {
    const term = search.trim().toLowerCase();
    let filtered = inquiries;

    if (statusFilter !== "all") {
      filtered = filtered.filter((i) => i.status === statusFilter);
    }
    if (term) {
      filtered = filtered.filter((i) =>
        [i.name, i.email, i.phone, i.eventType ?? "", i.message ?? ""].some((field) =>
          field.toLowerCase().includes(term),
        ),
      );
    }

    return [...filtered].sort((a, b) =>
      sortOrder === "newest"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }, [inquiries, search, statusFilter, sortOrder]);

  async function handleStatusChange(id: number, status: CateringStatus) {
    setActionError(null);
    const previous = inquiries;
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

    const result = await updateCateringStatusAction(id, status);
    if (!result.ok) {
      setActionError(result.error);
      setInquiries(previous);
    }
  }

  async function handleDelete(id: number) {
    setActionError(null);
    const result = await deleteCateringAction(id);
    if (result.ok) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } else {
      setActionError(result.error);
    }
  }

  if (inquiries.length === 0) {
    return (
      <p className="border border-charcoal/10 bg-white/40 p-8 text-center text-sm text-charcoal/60">
        No catering requests yet. Submissions from the public Catering page will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="catering-search">
          Search catering requests
        </label>
        <input
          id="catering-search"
          type="search"
          placeholder="Search by name, email, phone, or event type…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-none border border-charcoal/20 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus-visible:border-burgundy focus-visible:outline-none"
        />

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-charcoal/60">
            Status
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="rounded-none border border-charcoal/20 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-charcoal focus-visible:border-burgundy focus-visible:outline-none"
            >
              <option value="all">All</option>
              {CATERING_STATUS_VALUES.map((status) => (
                <option key={status} value={status}>
                  {status[0].toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-charcoal/60">
            Sort
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="rounded-none border border-charcoal/20 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-charcoal focus-visible:border-burgundy focus-visible:outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      </div>

      {actionError && (
        <p role="alert" className="border border-burgundy/30 bg-burgundy/5 px-4 py-2.5 text-sm text-burgundy-dark">
          {actionError}
        </p>
      )}

      {visibleInquiries.length === 0 ? (
        <p className="border border-charcoal/10 bg-white/40 p-8 text-center text-sm text-charcoal/60">
          No catering requests match your filters.
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto border border-charcoal/10 bg-white/40 md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-charcoal/10 text-xs font-semibold uppercase tracking-[0.06em] text-charcoal/60">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {visibleInquiries.map((inquiry) => {
                  const expanded = expandedId === inquiry.id;
                  return (
                    <tr key={inquiry.id}>
                      <td className="px-4 py-3 align-top font-medium text-charcoal">{inquiry.name}</td>
                      <td className="px-4 py-3 align-top">
                        <a href={`mailto:${inquiry.email}`} className="block text-burgundy hover:underline">
                          {inquiry.email}
                        </a>
                        <a href={`tel:${inquiry.phone}`} className="mt-0.5 block text-charcoal/60 hover:underline">
                          {inquiry.phone}
                        </a>
                      </td>
                      <td className="max-w-xs px-4 py-3 align-top text-charcoal/80">
                        <p>
                          {inquiry.eventType || "—"}
                          {inquiry.eventDate ? ` · ${inquiry.eventDate}` : ""}
                          {inquiry.guestCount ? ` · ${inquiry.guestCount} guests` : ""}
                        </p>
                        {inquiry.message && (
                          <>
                            <p className={expanded ? "mt-1 whitespace-pre-wrap text-charcoal/70" : "mt-1 truncate text-charcoal/70"}>
                              {inquiry.message}
                            </p>
                            <button
                              type="button"
                              onClick={() => setExpandedId(expanded ? null : inquiry.id)}
                              className="mt-1 text-xs font-semibold uppercase tracking-[0.04em] text-burgundy hover:underline"
                            >
                              {expanded ? "Show less" : "View full request"}
                            </button>
                          </>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-top text-charcoal/60">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="space-y-1.5">
                          <CateringStatusBadge status={inquiry.status as CateringStatus} />
                          <select
                            value={inquiry.status}
                            onChange={(e) => handleStatusChange(inquiry.id, e.target.value as CateringStatus)}
                            aria-label={`Update status for ${inquiry.name}`}
                            className="block rounded-none border border-charcoal/20 bg-white px-2 py-1 text-xs text-charcoal focus-visible:border-burgundy focus-visible:outline-none"
                          >
                            {CATERING_STATUS_VALUES.map((status) => (
                              <option key={status} value={status}>
                                {status[0].toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top text-right">
                        <ConfirmButton onConfirm={() => handleDelete(inquiry.id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 md:hidden">
            {visibleInquiries.map((inquiry) => {
              const expanded = expandedId === inquiry.id;
              return (
                <li key={inquiry.id} className="border border-charcoal/10 bg-white/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-charcoal">{inquiry.name}</p>
                      <p className="text-xs text-charcoal/50">{formatDate(inquiry.createdAt)}</p>
                    </div>
                    <CateringStatusBadge status={inquiry.status as CateringStatus} />
                  </div>

                  <p className="mt-2 text-sm text-charcoal/80">
                    {inquiry.eventType || "Event"}
                    {inquiry.eventDate ? ` · ${inquiry.eventDate}` : ""}
                    {inquiry.guestCount ? ` · ${inquiry.guestCount} guests` : ""}
                  </p>

                  {inquiry.message && (
                    <>
                      <p className={`mt-1 text-sm text-charcoal/70 ${expanded ? "whitespace-pre-wrap" : "line-clamp-2"}`}>
                        {inquiry.message}
                      </p>
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : inquiry.id)}
                        className="mt-1 text-xs font-semibold uppercase tracking-[0.04em] text-burgundy"
                      >
                        {expanded ? "Show less" : "View full request"}
                      </button>
                    </>
                  )}

                  <label className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] text-charcoal/60">
                    Status
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value as CateringStatus)}
                      aria-label={`Update status for ${inquiry.name}`}
                      className="flex-1 rounded-none border border-charcoal/20 bg-white px-2 py-2 text-xs text-charcoal focus-visible:border-burgundy focus-visible:outline-none"
                    >
                      {CATERING_STATUS_VALUES.map((status) => (
                        <option key={status} value={status}>
                          {status[0].toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="min-h-[40px] flex-1 rounded border border-charcoal/20 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.04em] text-charcoal"
                    >
                      Email
                    </a>
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="min-h-[40px] flex-1 rounded border border-charcoal/20 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.04em] text-charcoal"
                    >
                      Call
                    </a>
                    <div className="min-h-[40px] flex-1">
                      <ConfirmButton
                        onConfirm={() => handleDelete(inquiry.id)}
                        className="flex h-full min-h-[40px] w-full items-center justify-center border border-burgundy/30"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
