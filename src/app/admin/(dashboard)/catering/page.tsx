import type { Metadata } from "next";
import { getAllCateringInquiries } from "@/db/admin-queries";
import { CateringTable } from "@/components/admin/CateringTable";

export const metadata: Metadata = { title: "Catering Requests" };
export const dynamic = "force-dynamic";

export default async function AdminCateringPage() {
  const inquiries = await getAllCateringInquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-medium text-charcoal sm:text-3xl">Catering Requests</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Submissions from the public Catering page, newest first by default.
        </p>
      </div>

      <CateringTable initialInquiries={inquiries} />
    </div>
  );
}
