import { GOOGLE_MAPS_URL, HOURS, HOURS_CONFIRMED } from "@/data/restaurant";
import { cn } from "@/lib/cn";

type HoursProps = {
  theme?: "dark" | "light";
};

/**
 * Single source of truth for hours lives in src/data/restaurant.ts. If
 * HOURS_CONFIRMED is false, we show a safe fallback instead of guessed hours.
 */
export function Hours({ theme = "dark" }: HoursProps) {
  const isLight = theme === "light";

  if (!HOURS_CONFIRMED) {
    return (
      <div>
        <p className={cn("text-sm leading-relaxed", isLight ? "text-cream/80" : "text-charcoal/70")}>
          Please check Google for today&apos;s hours.
        </p>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-2 inline-block text-sm font-semibold underline underline-offset-4",
            isLight ? "text-saffron-light" : "text-burgundy",
          )}
        >
          View hours on Google
        </a>
      </div>
    );
  }

  return (
    <dl className="space-y-1.5">
      {HOURS.map(({ day, hours }) => (
        <div key={day} className="flex items-baseline justify-between gap-6 text-sm">
          <dt className={cn("font-medium", isLight ? "text-cream/90" : "text-charcoal/85")}>{day}</dt>
          <dd className={cn(isLight ? "text-cream/70" : "text-charcoal/60")}>{hours}</dd>
        </div>
      ))}
    </dl>
  );
}
