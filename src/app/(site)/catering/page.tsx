import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { CateringForm } from "@/components/CateringForm";
import { IMAGES } from "@/data/images";
import { EMAIL, PHONE_PRIMARY, PHONE_PRIMARY_TEL } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Curry In Handi offers halal Indian catering in Brooklyn for weddings, birthdays, corporate events, and private gatherings. Request a catering quote today.",
};

const OCCASIONS = [
  { name: "Weddings", description: "Multi-course spreads for the celebration." },
  { name: "Birthdays", description: "Crowd-pleasing favorites for any age." },
  { name: "Corporate Events", description: "Reliable service for office gatherings." },
  { name: "Private Gatherings", description: "Intimate menus for smaller groups." },
  { name: "Family Celebrations", description: "Comfort dishes the whole table shares." },
  { name: "Community Events", description: "Larger-format catering for group functions." },
];

export default function CateringPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Catering"
        title="Catering for Every Occasion"
        description="Planning a gathering, celebration, corporate event, or special occasion? Curry In Handi brings halal Indian cuisine to your table, wherever it's set."
        image={IMAGES.catering}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-editorial">
          <SectionHeading eyebrow="Occasions" title="Examples of Events We Cater" as="h2" />
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
            {OCCASIONS.map((occasion) => (
              <div key={occasion.name} className="bg-cream p-7">
                <h3 className="font-serif text-lg text-charcoal">{occasion.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{occasion.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-charcoal/50">
            Examples shown are common event types — every catering order is customized after an
            inquiry.
          </p>
        </div>
      </section>

      <section className="bg-cream-dim/60 py-16 sm:py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative mb-8 aspect-[16/10] overflow-hidden">
              <ResponsiveImage
                src={IMAGES.dishes.biryani.src}
                alt={IMAGES.dishes.biryani.alt}
                width={IMAGES.dishes.biryani.width}
                height={IMAGES.dishes.biryani.height}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
            <SectionHeading
              eyebrow="Get in Touch"
              title="Request a Catering Quote"
              description="Share a few details about your event and our team will follow up with availability and pricing."
              as="h2"
            />
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href={`tel:${PHONE_PRIMARY_TEL}`} variant="primary" size="lg">
                Call {PHONE_PRIMARY}
              </Button>
              <Button href={`mailto:${EMAIL}`} variant="ghost" size="lg">
                Email Us
              </Button>
            </div>
          </div>

          <div className="border border-charcoal/10 bg-cream p-6 sm:p-9">
            <p className="mb-6 font-serif text-xl text-charcoal">Catering Inquiry Form</p>
            <CateringForm />
          </div>
        </div>
      </section>
    </main>
  );
}
