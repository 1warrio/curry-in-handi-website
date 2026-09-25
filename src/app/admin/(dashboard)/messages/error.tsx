"use client";

export default function MessagesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div role="alert" className="border border-burgundy/30 bg-burgundy/5 p-8 text-center">
      <p className="font-serif text-lg font-medium text-charcoal">Couldn&apos;t load contact messages</p>
      <p className="mt-1 text-sm text-charcoal/60">
        Something went wrong reaching the database. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center bg-burgundy px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream hover:bg-burgundy-dark"
      >
        Try again
      </button>
    </div>
  );
}
