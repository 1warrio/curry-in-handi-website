import { Button } from "@/components/ui/Button";
import {
  GOOGLE_MAPS_URL,
  PHONE_PRIMARY,
  PHONE_PRIMARY_TEL,
  RESERVATION_URL,
} from "@/data/restaurant";

/**
 * A slim action hub directly beneath the hero so every key conversion path
 * (menu, reservations, directions, calling, catering) is reachable within
 * one scroll. Falls back to a phone call when no reservation platform URL
 * has been configured yet.
 */
export function QuickActions() {
  const reservationHref = RESERVATION_URL || `tel:${PHONE_PRIMARY_TEL}`;
  const reservationLabel = RESERVATION_URL ? "Reserve a Table" : `Reserve a Table — Call ${PHONE_PRIMARY}`;

  return (
    <section aria-label="Quick actions" className="bg-cream-dim/50 py-6">
      <div className="container-editorial flex flex-wrap items-center justify-center gap-3 sm:justify-between">
        <p className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50 sm:block">
          Plan Your Visit
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/menu" variant="ghost" size="md">
            View Menu
          </Button>
          <Button href={reservationHref} variant="ghost" size="md">
            {reservationLabel}
          </Button>
          <Button href={GOOGLE_MAPS_URL} variant="ghost" size="md">
            Get Directions
          </Button>
          <Button href={`tel:${PHONE_PRIMARY_TEL}`} variant="ghost" size="md">
            Call Us
          </Button>
          <Button href="/catering" variant="ghost" size="md">
            Catering
          </Button>
        </div>
      </div>
    </section>
  );
}
