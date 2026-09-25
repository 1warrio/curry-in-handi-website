import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";
import { ORDER_ONLINE_URL } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Curry In Handi, a halal Indian restaurant in Brooklyn built on family recipes, traditional tandoor cooking, and a welcoming dining experience.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About Us"
        title="Generations of Flavor, Served in Brooklyn."
        image={IMAGES.aboutInterior}
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-editorial grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow="Our Story" title="A Kitchen Built on Family Recipes" as="h2" />
          <div className="space-y-4 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
            <p>
              India is known for its extraordinary culinary diversity and soul food. At Curry In
              Handi, family recipes and cooking traditions passed down through generations are
              brought to New York, with bold spices, comforting classics, and authentic Indian
              flavors.
            </p>
            <p>
              The restaurant sits on Bushwick Ave in Brooklyn&apos;s Williamsburg / East
              Williamsburg area, serving the neighborhood with halal Indian cooking for dine-in,
              takeout, delivery, and catering.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-dim/60 py-20 sm:py-24">
        <div className="container-editorial grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow="Our Philosophy" title="Cooking the Way It's Always Been Done" as="h2" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
              <p>
                Indian cooking relies on technique as much as ingredients — whole spices toasted
                and ground fresh, curries built in stages, dough proofed and stretched by hand
                before it ever touches the tandoor. That approach is what shapes the kitchen at
                Curry In Handi.
              </p>
              <p>
                Vegetarian and non-vegetarian dishes are given equal attention, so whether the
                table orders a lamb curry or a dal, the same care goes into the pot.
              </p>
            </div>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden lg:order-2">
            <ResponsiveImage
              src={IMAGES.dishes.lambCurry.src}
              alt={IMAGES.dishes.lambCurry.alt}
              width={IMAGES.dishes.lambCurry.width}
              height={IMAGES.dishes.lambCurry.height}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-editorial grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden">
            <ResponsiveImage
              src={IMAGES.tandoor.src}
              alt={IMAGES.tandoor.alt}
              width={IMAGES.tandoor.width}
              height={IMAGES.tandoor.height}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Indian Culinary Tradition"
              title="From Regional Kitchens to a Brooklyn Table"
              as="h2"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
              <p>
                The menu draws from across India&apos;s regional cooking traditions — tandoor
                dishes, slow-cooked curries, biryani layered and finished on dum, and freshly
                baked breads. Each dish is meant to be recognizable and comforting, not
                reinvented.
              </p>
              <p>
                Tandoor specialties are cooked in a traditional clay oven, which gives the meat
                its char and smoky depth without needing much beyond marinade, heat, and time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-burgundy py-20 text-cream sm:py-24">
        <div className="container-editorial grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Halal Commitment" title="Halal From the Ground Up" theme="light" as="h2" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-cream/85 sm:text-base">
              <p>
                Curry In Handi is a halal Indian restaurant. That commitment extends beyond the
                meat itself and into the Halal Bar — a drinks menu built entirely around
                non-alcoholic, 0.0% ABV specialty drinks, so every guest can enjoy a full
                experience at the table.
              </p>
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

      <section className="bg-cream-dim/60 py-20 sm:py-24">
        <div className="container-editorial grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow="The Dining Experience" title="Dine In, Take Out, or Have It Delivered" as="h2" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-charcoal/75 sm:text-base">
              <p>
                Whether you&apos;re settling in for dinner, picking up a quick order, or having a
                meal delivered, the goal is the same: food that tastes like it was made with
                intention. Online ordering, takeout, and delivery are all available alongside
                dine-in service.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={ORDER_ONLINE_URL} variant="primary" size="lg">
                Order Online
              </Button>
              <Button href="/menu" variant="ghost" size="lg">
                View Menu
              </Button>
            </div>
          </div>
          <div className="relative order-1 aspect-[4/3] overflow-hidden lg:order-2">
            <ResponsiveImage
              src={IMAGES.aboutInterior.src}
              alt={IMAGES.aboutInterior.alt}
              width={IMAGES.aboutInterior.width}
              height={IMAGES.aboutInterior.height}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 text-center sm:py-24">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="Catering"
            title="Bringing the Kitchen to Your Event"
            align="center"
            description="From family celebrations to corporate gatherings, Curry In Handi's catering brings the same menu guests know from the restaurant to your event."
            as="h2"
          />
          <div className="mt-8 flex justify-center">
            <Button href="/catering" variant="primary" size="lg">
              Explore Catering
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
