import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";

export function TandoorFeature() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <ResponsiveImage
          src={IMAGES.tandoor.src}
          alt={IMAGES.tandoor.alt}
          width={IMAGES.tandoor.width}
          height={IMAGES.tandoor.height}
          fill
          sizes="100vw"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/40" />
      </div>

      <div className="container-editorial relative z-10 py-24 text-center sm:py-28">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-saffron-light">
            Traditional Cooking
          </p>
          <h2 className="text-balance font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.1] text-cream">
            Straight From the Tandoor
          </h2>
          <p className="mt-5 text-balance text-[15px] leading-relaxed text-cream/80 sm:text-base">
            Experience the depth of flavor that comes from traditional Indian cooking techniques,
            carefully prepared and served fresh.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/menu" variant="secondary" size="lg">
              Explore Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
