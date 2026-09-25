import { cn } from "@/lib/cn";
import type { CateringStatus } from "@/db/schema";

export function ReadBadge({ isRead }: { isRead: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]",
        isRead ? "bg-charcoal/5 text-charcoal/50" : "bg-burgundy/10 text-burgundy",
      )}
    >
      {isRead ? "Read" : "Unread"}
    </span>
  );
}

const CATERING_STYLES: Record<CateringStatus, string> = {
  new: "bg-burgundy/10 text-burgundy",
  contacted: "bg-saffron/20 text-copper",
  completed: "bg-charcoal/5 text-charcoal/60",
};

const CATERING_LABELS: Record<CateringStatus, string> = {
  new: "New",
  contacted: "Contacted",
  completed: "Completed",
};

export function CateringStatusBadge({ status }: { status: CateringStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]",
        CATERING_STYLES[status],
      )}
    >
      {CATERING_LABELS[status]}
    </span>
  );
}
