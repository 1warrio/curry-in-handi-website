"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";

type ConfirmButtonProps = {
  onConfirm: () => Promise<void> | void;
  label?: string;
  confirmLabel?: string;
  className?: string;
};

/**
 * A destructive-action button that requires a second, explicit tap before
 * anything happens. Avoids native `window.confirm` for better mobile UX and
 * screen-reader announcements while still requiring a real confirmation step.
 */
export function ConfirmButton({
  onConfirm,
  label = "Delete",
  confirmLabel = "Confirm?",
  className,
}: ConfirmButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5" role="group" aria-label="Confirm deletion">
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(async () => {
            await onConfirm();
            setConfirming(false);
          })}
          className="rounded bg-burgundy px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.04em] text-cream hover:bg-burgundy-dark disabled:opacity-50"
        >
          {isPending ? "…" : confirmLabel}
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => setConfirming(false)}
          className="rounded border border-charcoal/20 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.04em] text-charcoal/70 hover:border-charcoal/40"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className={cn(
        "rounded px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.04em] text-burgundy hover:bg-burgundy/10",
        className,
      )}
    >
      {label}
    </button>
  );
}
