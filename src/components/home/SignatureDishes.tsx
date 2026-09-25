import { SectionHeading } from "@/components/ui/SectionHeading";
import { FoodCard } from "@/components/FoodCard";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/images";
import { MENU } from "@/data/menu";

// Pull a curated set of well-known dishes to showcase on the homepage. These
// mirror items that exist in the full menu data — update src/data/menu.ts
// and this list stays in sync in spirit, though images are matched by hand
// since not every dish has a dedicated photo yet.
const featured = [
  { item: MENU.find((c) => c.id === "biryani")!.items[0], image: IMAGES.dishes.biryani },
  { item: MENU.find((c) => c.id === "chicken")!.items[0], image: IMAGES.dishes.butterChicken },
  { item: MENU.find((c) => c.id === "lamb-goat")!.items[0], image: IMAGES.dishes.lambCurry },
  { item: MENU.find((c) => c.id === "tandoor")!.items[0], image: IMAGES.dishes.tikka },
  { item: MENU.find((c) => c.id === "breads")!.items[1], image: IMAGES.dishes.naanBasket },
];

export function SignatureDishes() {
  return (
    <section className="bg-cream py-20 sm:py-28" aria-labelledby="explore-menu-heading">
      <div className="container-editorial">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Explore the Menu"
            title="From the Tandoor to Your Table"
            description="A taste of the dishes that bring generations of Indian culinary tradition to Brooklyn."
            as="h2"
            className="max-w-xl"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(({ item, image }) => (
            <FoodCard
              key={item.name}
              image={image}
              name={item.name}
              description={item.description}
              price={item.price}
              popular={item.popular}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/menu" variant="ghost" size="lg">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
