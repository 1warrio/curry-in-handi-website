import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CateringForm } from "@/components/CateringForm";
import { IMAGES } from "@/data/images";
import { PHONE_PRIMARY, PHONE_PRIMARY_TEL } from "@/data/restaurant";

export function CateringSection() {
  return (
    <section id="catering" className="bg-cream py-20 sm:py-28" aria-labelledby="catering-heading">
      <div className="container-editorial grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="relative mb-8 aspect-[16/10] overflow-hidden">
            <ResponsiveImage
              src={IMAGES.catering.src}
              alt={IMAGES.catering.alt}
              width={IMAGES.catering.width}
              height={IMAGES.catering.height}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <SectionHeading
            eyebrow="Catering"
            title="Bring Curry In Handi to Your Next Celebration"
            description="Planning a gathering, celebration, corporate event, or special occasion? Curry In Handi offers catering for all occasions."
            as="h2"
          />
          <div className="mt-7 flex flex-wrap gap-4">
            <Button href="#catering-form" variant="primary" size="lg">
              Inquire About Catering
            </Button>
            <Button href={`tel:${PHONE_PRIMARY_TEL}`} variant="ghost" size="lg">
              Call {PHONE_PRIMARY}
            </Button>
          </div>
        </div>

        <div id="catering-form" className="scroll-mt-28 border border-charcoal/10 bg-cream-dim/40 p-6 sm:p-9">
          <p className="mb-6 font-serif text-xl text-charcoal">Send a Catering Inquiry</p>
          <CateringForm />
        </div>
      </div>
    </section>
  );
}
