import { ANNOUNCEMENT_TEXT } from "@/data/restaurant";

/**
 * Slim announcement strip above the navigation. Edit ANNOUNCEMENT_TEXT in
 * src/data/restaurant.ts to change the message.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-charcoal py-2 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-cream/80 sm:text-xs">
      <p className="container-editorial">{ANNOUNCEMENT_TEXT}</p>
    </div>
  );
}
