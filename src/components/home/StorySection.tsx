import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";

export function StorySection() {
  return (
    <section className="bg-cream-dim/60 py-20 sm:py-28" aria-labelledby="our-story-heading">
      <div className="container-editorial grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-[4/5]">
          <ResponsiveImage
            src={IMAGES.aboutInterior.src}
            alt={IMAGES.aboutInterior.alt}
            width={IMAGES.aboutInterior.width}
            height={IMAGES.aboutInterior.height}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="Our Story"
            title="Generations of Flavor, Served in Brooklyn."
            as="h2"
          />
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
            <p>
              India is known for its extraordinary culinary diversity and soul food. At Curry In
              Handi, family recipes and cooking traditions passed down through generations are
              brought to New York, with bold spices, comforting classics, and authentic Indian
              flavors.
            </p>
            <p>
              Whether you&apos;re joining us for dinner, picking up a meal, or planning an event,
              our team is here to make you feel welcome.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/about" variant="ghost" size="md">
              Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
