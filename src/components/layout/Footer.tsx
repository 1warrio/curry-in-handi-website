import Link from "next/link";
import {
  ADDRESS,
  EMAIL,
  INSTAGRAM_URL,
  NAV_LINKS,
  PHONE_PRIMARY,
  PHONE_PRIMARY_TEL,
  PHONE_SECONDARY,
  PHONE_SECONDARY_TEL,
  RESTAURANT_NAME,
  SOCIAL_LINKS,
} from "@/data/restaurant";

function SocialIcon({ type }: { type: "instagram" | "facebook" | "google" }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M14 9h2V6h-2c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14v-1.5c0-.28.22-.5.5-.5H16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M21 12.2c0-.7-.06-1.36-.18-2H12v3.8h5.1c-.22 1.2-.9 2.2-1.9 2.9v2.4h3.08c1.8-1.66 2.72-4.1 2.72-7.1z"
        fill="currentColor"
      />
      <path
        d="M12 21c2.4 0 4.42-.8 5.9-2.16l-3.08-2.4c-.86.58-1.96.92-2.82.92-2.16 0-4-1.46-4.66-3.42H4.16v2.46A9 9 0 0 0 12 21z"
        fill="currentColor"
      />
      <path d="M7.34 13.94a5.4 5.4 0 0 1 0-3.88V7.6H4.16a9 9 0 0 0 0 8.8l3.18-2.46z" fill="currentColor" />
      <path
        d="M12 6.68c1.3 0 2.48.45 3.4 1.32l2.56-2.56C16.42 3.86 14.4 3 12 3a9 9 0 0 0-7.84 4.6l3.18 2.46C8 8.14 9.84 6.68 12 6.68z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  const socialEntries = (Object.keys(SOCIAL_LINKS) as (keyof typeof SOCIAL_LINKS)[]).filter(
    (key) => SOCIAL_LINKS[key],
  );

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="container-editorial grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="font-serif text-2xl tracking-wide text-cream">{RESTAURANT_NAME}</p>
          <p className="mt-3 text-sm leading-relaxed">
            {ADDRESS.street}
            <br />
            {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:${PHONE_PRIMARY_TEL}`} className="hover:text-cream">
                {PHONE_PRIMARY}
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_SECONDARY_TEL}`} className="hover:text-cream">
                {PHONE_SECONDARY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="break-all hover:text-cream">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">Follow</p>
          {socialEntries.length > 0 ? (
            <div className="mt-4 flex gap-3">
              {socialEntries.map((key) => (
                <a
                  key={key}
                  href={SOCIAL_LINKS[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Curry In Handi on ${key}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-saffron hover:text-saffron"
                >
                  <SocialIcon type={key} />
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-cream/50">Social links coming soon.</p>
          )}
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <div className="container-editorial flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {RESTAURANT_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-cream/40">
            Website designed &amp; developed by{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/40 underline decoration-cream/20 underline-offset-2 transition-colors hover:text-saffron hover:decoration-saffron"
            >
              Farhan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
