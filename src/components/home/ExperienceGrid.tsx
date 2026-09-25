import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES } from "@/data/images";

const tiles = [
  { label: "Dining", image: IMAGES.aboutInterior, span: "lg:col-span-2 lg:row-span-2" },
  { label: "Food", image: IMAGES.dishes.biryani, span: "" },
  { label: "Tandoor", image: IMAGES.tandoor, span: "" },
  { label: "Drinks", image: IMAGES.halalBar, span: "lg:col-span-2" },
];

export function ExperienceGrid() {
  return (
    <section className="bg-cream-dim/60 py-20 sm:py-28" aria-labelledby="experience-heading">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="The Experience"
          title="A Taste of the Atmosphere"
          align="left"
          as="h2"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {tiles.map((tile) => (
            <div key={tile.label} className={`group relative aspect-square overflow-hidden ${tile.span}`}>
              <ResponsiveImage
                src={tile.image.src}
                alt={tile.image.alt}
                width={tile.image.width}
                height={tile.image.height}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.14em] text-cream">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
