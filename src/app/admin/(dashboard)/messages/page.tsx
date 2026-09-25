import type { Metadata } from "next";
import { getAllContactMessages } from "@/db/admin-queries";
import { MessagesTable } from "@/components/admin/MessagesTable";

export const metadata: Metadata = { title: "Contact Messages" };
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getAllContactMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-medium text-charcoal sm:text-3xl">Contact Messages</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Submissions from the public Contact page, newest first by default.
        </p>
      </div>

      <MessagesTable initialMessages={messages} />
    </div>
  );
}
