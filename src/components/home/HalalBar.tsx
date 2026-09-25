import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";

export function HalalBar() {
  return (
    <section className="bg-burgundy py-20 text-cream sm:py-28" aria-labelledby="halal-bar-heading">
      <div className="container-editorial grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="0.0% ABV"
            title="The Halal Bar"
            theme="light"
            as="h2"
          />
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream/85 sm:text-base">
            Curry In Handi&apos;s Halal Bar features uniquely crafted non-alcoholic drinks, made
            with the same care as the kitchen&apos;s curries and kebabs. Every pour is 0.0% ABV —
            colorful, refreshing, and served in a setting that feels every bit as sophisticated as
            a traditional bar.
          </p>
          <div className="mt-8">
            <Button href="/menu#drinks" variant="outline-light" size="lg">
              Explore Drinks
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden">
          <ResponsiveImage
            src={IMAGES.halalBar.src}
            alt={IMAGES.halalBar.alt}
            width={IMAGES.halalBar.width}
            height={IMAGES.halalBar.height}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
