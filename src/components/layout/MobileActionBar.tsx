import { GOOGLE_MAPS_URL, ORDER_ONLINE_URL, PHONE_PRIMARY_TEL } from "@/data/restaurant";

/**
 * Fixed bottom action bar shown only on small screens so the three most
 * important actions (order, call, directions) are always one tap away.
 */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/90 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={ORDER_ONLINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 bg-burgundy text-cream"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">Order</span>
      </a>
      <a
        href={`tel:${PHONE_PRIMARY_TEL}`}
        className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 border-x border-charcoal/10 text-charcoal"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">Call</span>
      </a>
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-charcoal"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">Directions</span>
      </a>
    </nav>
  );
}
