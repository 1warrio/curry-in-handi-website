"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { deleteMessageAction, markMessageReadAction } from "@/app/admin/(dashboard)/messages/actions";
import { ReadBadge } from "@/components/admin/StatusBadge";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import type { ContactMessageRecord } from "@/db/admin-queries";

type SortOrder = "newest" | "oldest";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function MessagesTable({ initialMessages }: { initialMessages: ContactMessageRecord[] }) {
  const [messages, setMessages] = useState(initialMessages);
  useEffect(() => {
  setMessages(initialMessages);
}, [initialMessages]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const visibleMessages = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = term
      ? messages.filter((m) =>
          [m.name, m.email, m.phone ?? "", m.message].some((field) => field.toLowerCase().includes(term)),
        )
      : messages;

    return [...filtered].sort((a, b) =>
      sortOrder === "newest"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }, [messages, search, sortOrder]);

  function toggleRead(id: number, nextIsRead: boolean) {
    setActionError(null);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: nextIsRead } : m)));
    startTransition(async () => {
      const result = await markMessageReadAction(id, nextIsRead);
      if (!result.ok) {
        setActionError(result.error);
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: !nextIsRead } : m)));
      }
    });
  }

  async function handleDelete(id: number) {
    setActionError(null);
    const result = await deleteMessageAction(id);
    if (result.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      setActionError(result.error);
    }
  }

  if (messages.length === 0) {
    return (
      <p className="border border-charcoal/10 bg-white/40 p-8 text-center text-sm text-charcoal/60">
        No contact messages yet. Submissions from the public Contact page will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="message-search">
          Search messages
        </label>
        <input
          id="message-search"
          type="search"
          placeholder="Search by name, email, phone, or message…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-none border border-charcoal/20 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/40 focus-visible:border-burgundy focus-visible:outline-none"
        />

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

      {actionError && (
        <p role="alert" className="border border-burgundy/30 bg-burgundy/5 px-4 py-2.5 text-sm text-burgundy-dark">
          {actionError}
        </p>
      )}

      {visibleMessages.length === 0 ? (
        <p className="border border-charcoal/10 bg-white/40 p-8 text-center text-sm text-charcoal/60">
          No messages match your search.
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
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {visibleMessages.map((message) => {
                  const expanded = expandedId === message.id;
                  return (
                    <tr key={message.id} className={message.isRead ? "" : "bg-burgundy/[0.03]"}>
                      <td className="px-4 py-3 align-top font-medium text-charcoal">{message.name}</td>
                      <td className="px-4 py-3 align-top">
                        <a href={`mailto:${message.email}`} className="block text-burgundy hover:underline">
                          {message.email}
                        </a>
                        {message.phone && (
                          <a href={`tel:${message.phone}`} className="mt-0.5 block text-charcoal/60 hover:underline">
                            {message.phone}
                          </a>
                        )}
                      </td>
                      <td className="max-w-xs px-4 py-3 align-top text-charcoal/80">
                        <p className={expanded ? "whitespace-pre-wrap" : "truncate"}>{message.message}</p>
                        {message.message.length > 60 && (
                          <button
                            type="button"
                            onClick={() => setExpandedId(expanded ? null : message.id)}
                            className="mt-1 text-xs font-semibold uppercase tracking-[0.04em] text-burgundy hover:underline"
                          >
                            {expanded ? "Show less" : "View full message"}
                          </button>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-top text-charcoal/60">
                        {formatDate(message.createdAt)}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <ReadBadge isRead={message.isRead} />
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleRead(message.id, !message.isRead)}
                            className="rounded px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.04em] text-charcoal/70 hover:bg-charcoal/5"
                          >
                            {message.isRead ? "Mark unread" : "Mark read"}
                          </button>
                          <ConfirmButton onConfirm={() => handleDelete(message.id)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 md:hidden">
            {visibleMessages.map((message) => {
              const expanded = expandedId === message.id;
              return (
                <li
                  key={message.id}
                  className={`border border-charcoal/10 p-4 ${message.isRead ? "bg-white/40" : "bg-burgundy/[0.04]"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-charcoal">{message.name}</p>
                      <p className="text-xs text-charcoal/50">{formatDate(message.createdAt)}</p>
                    </div>
                    <ReadBadge isRead={message.isRead} />
                  </div>

                  <p className={`mt-2 text-sm text-charcoal/80 ${expanded ? "whitespace-pre-wrap" : "line-clamp-2"}`}>
                    {message.message}
                  </p>
                  {message.message.length > 60 && (
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : message.id)}
                      className="mt-1 text-xs font-semibold uppercase tracking-[0.04em] text-burgundy"
                    >
                      {expanded ? "Show less" : "View full message"}
                    </button>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${message.email}`}
                      className="min-h-[40px] flex-1 rounded border border-charcoal/20 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.04em] text-charcoal"
                    >
                      Email
                    </a>
                    {message.phone && (
                      <a
                        href={`tel:${message.phone}`}
                        className="min-h-[40px] flex-1 rounded border border-charcoal/20 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.04em] text-charcoal"
                      >
                        Call
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleRead(message.id, !message.isRead)}
                      className="min-h-[40px] flex-1 rounded border border-charcoal/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.04em] text-charcoal"
                    >
                      {message.isRead ? "Unread" : "Read"}
                    </button>
                    <div className="min-h-[40px] flex-1">
                      <ConfirmButton
                        onConfirm={() => handleDelete(message.id)}
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
