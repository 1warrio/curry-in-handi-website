import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { Hours } from "@/components/Hours";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";
import {
  ADDRESS,
  EMAIL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_URL,
  ORDER_ONLINE_URL,
  PHONE_PRIMARY,
  PHONE_PRIMARY_TEL,
  PHONE_SECONDARY,
  PHONE_SECONDARY_TEL,
} from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Curry In Handi in Brooklyn, NY — call, email, get directions, or send a message. 443 Bushwick Ave, Brooklyn, NY 11206.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        description="Questions, feedback, or planning a visit — reach out any time."
        image={IMAGES.aboutInterior}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Get in Touch" title="Send Us a Message" as="h2" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Address</p>
              <p className="mt-2 text-base text-charcoal/85">
                {ADDRESS.street}
                <br />
                {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
              </p>
              <Button href={GOOGLE_MAPS_URL} variant="ghost" size="md" className="mt-4">
                Get Directions
              </Button>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Phone</p>
              <p className="mt-2 space-y-1 text-base text-charcoal/85">
                <a href={`tel:${PHONE_PRIMARY_TEL}`} className="block hover:text-burgundy">
                  {PHONE_PRIMARY}
                </a>
                <a href={`tel:${PHONE_SECONDARY_TEL}`} className="block hover:text-burgundy">
                  {PHONE_SECONDARY}
                </a>
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Email</p>
              <a href={`mailto:${EMAIL}`} className="mt-2 block text-base text-charcoal/85 hover:text-burgundy">
                {EMAIL}
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Hours</p>
              <div className="mt-2">
                <Hours />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-charcoal/10 pt-8">
              <Button href={ORDER_ONLINE_URL} variant="primary" size="md">
                Order Online
              </Button>
              <Button href={`tel:${PHONE_PRIMARY_TEL}`} variant="ghost" size="md">
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-cream-dim/40 py-16 sm:py-20">
        <div className="container-editorial">
          <SectionHeading eyebrow="Find Us" title="443 Bushwick Ave, Brooklyn" as="h2" />
          <div className="relative mt-8 min-h-[360px] overflow-hidden border border-charcoal/10">
            <iframe
              title="Curry In Handi location map"
              src={GOOGLE_MAPS_EMBED_URL}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
