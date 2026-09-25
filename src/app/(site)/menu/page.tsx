import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";
import { ORDER_ONLINE_URL } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the full Curry In Handi menu — appetizers, tandoor specialties, biryani, chicken, lamb & goat, vegetarian dishes, breads, and Halal Bar drinks.",
};

const TAG_LEGEND = [
  { tag: "HALAL", description: "Prepared halal" },
  { tag: "VEGETARIAN", description: "No meat or fish" },
  { tag: "VEGAN", description: "No animal products" },
  { tag: "GLUTEN-FREE", description: "No wheat-based ingredients" },
];

export default function MenuPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our Menu"
        title="A Menu Rooted in Tradition"
        description="Tandoor specialties, slow-simmered curries, fragrant biryani, and handcrafted non-alcoholic drinks — prepared halal, from recipes passed down through generations."
        image={IMAGES.dishes.biryani}
      />

      <section className="border-b border-charcoal/10 bg-cream-dim/40 py-6">
        <div className="container-editorial flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-charcoal/60">
            {TAG_LEGEND.map(({ tag, description }) => (
              <li key={tag}>
                <span className="font-semibold text-charcoal/80">{tag}</span> — {description}
              </li>
            ))}
          </ul>
          <Button href={ORDER_ONLINE_URL} size="md" variant="primary">
            Order Online
          </Button>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-editorial">
          <MenuBrowser />
        </div>
      </section>
    </main>
  );
}
