import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { ADDRESS, ORDER_ONLINE_URL } from "@/data/restaurant";
import { IMAGES } from "@/data/images";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-charcoal sm:min-h-[88vh]">
      <div className="absolute inset-0">
        <ResponsiveImage
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          width={IMAGES.hero.width}
          height={IMAGES.hero.height}
          fill
          priority
          sizes="100vw"
          className="scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />
      </div>

      <div className="container-editorial relative z-10 pb-16 pt-40 sm:pb-20 md:pb-24">
        <div className="max-w-2xl fade-in-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-saffron-light">
            Authentic Indian Cuisine
          </p>
          <h1 className="text-balance font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] font-medium leading-[1.05] text-cream">
            Bold Indian Flavors, Made to Be Remembered.
          </h1>
          <p className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-cream/85 sm:text-base">
            Discover authentic halal Indian cuisine, from tandoor specialties and fragrant
            biryanis to rich curries and handcrafted non-alcoholic drinks.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={ORDER_ONLINE_URL} size="lg" variant="secondary">
              Order Online
            </Button>
            <Button href="/menu" size="lg" variant="outline-light">
              View Menu
            </Button>
          </div>

          <p className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cream/70">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path
                d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.state}
          </p>
        </div>
      </div>
    </section>
  );
}
