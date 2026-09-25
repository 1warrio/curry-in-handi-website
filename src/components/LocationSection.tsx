import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Hours } from "@/components/Hours";
import {
  ADDRESS,
  EMAIL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
  PHONE_PRIMARY,
  PHONE_PRIMARY_TEL,
} from "@/data/restaurant";

type LocationSectionProps = {
  className?: string;
};

export function LocationSection({ className }: LocationSectionProps) {
  return (
    <section className={`bg-cream py-20 sm:py-28 ${className ?? ""}`} aria-labelledby="location-heading">
      <div className="container-editorial grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow="Visit Us" title="Come Dine With Us" as="h2" />

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Address</p>
              <p className="mt-1 text-base text-charcoal/85">
                {ADDRESS.street}
                <br />
                {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Contact</p>
              <p className="mt-1 text-base text-charcoal/85">
                <a href={`tel:${PHONE_PRIMARY_TEL}`} className="hover:text-burgundy">
                  {PHONE_PRIMARY}
                </a>
                <br />
                <a href={`mailto:${EMAIL}`} className="hover:text-burgundy">
                  {EMAIL}
                </a>
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Hours</p>
              <div className="mt-2">
                <Hours />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={GOOGLE_MAPS_URL} variant="primary" size="lg">
              Get Directions
            </Button>
            <Button href={`tel:${PHONE_PRIMARY_TEL}`} variant="ghost" size="lg">
              Call Restaurant
            </Button>
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden border border-charcoal/10 lg:min-h-full">
          <iframe
            title="Curry In Handi location map"
            src={GOOGLE_MAPS_EMBED_URL}
            className="absolute inset-0 h-full w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
