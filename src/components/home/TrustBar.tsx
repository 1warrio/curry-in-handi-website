import type { ReactNode } from "react";
import { CHARACTERISTICS } from "@/data/restaurant";

const ICONS: Record<string, ReactNode> = {
  "Halal Indian Cuisine": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3c3 2.6 5 6 5 9a5 5 0 1 1-10 0c0-3 2-6.4 5-9Z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "Dine-In": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M6 3v9M6 3c-1.5 0-2.5 1.3-2.5 3S4.5 9 6 9M6 12v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 3c-1.7 0-3 1.6-3 4.5S16.3 12 18 12v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "Takeout & Delivery": (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M4 9h16l-1.2 10.1a2 2 0 0 1-2 1.9H7.2a2 2 0 0 1-2-1.9L4 9Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 9V7a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  Catering: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M3 12c0-2.2 4-4 9-4s9 1.8 9 4-4 4-9 4-9-1.8-9-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M3 12v4c0 2.2 4 4 9 4s9-1.8 9-4v-4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
};

export function TrustBar() {
  return (
    <section aria-label="Restaurant highlights" className="border-b border-charcoal/8 bg-cream">
      <div className="container-editorial grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:gap-4 sm:py-8">
        {CHARACTERISTICS.map((item) => (
          <div key={item} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal/5 text-burgundy">
              {ICONS[item]}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-charcoal/80 sm:text-[13px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
