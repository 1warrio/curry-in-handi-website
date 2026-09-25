import type { RestaurantImage } from "@/data/images";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

type FoodCardProps = {
  image: RestaurantImage;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
};

export function FoodCard({ image, name, description, price, popular }: FoodCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden bg-charcoal-soft/[0.02]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ResponsiveImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {popular && (
          <span className="absolute left-4 top-4 rounded-sm bg-saffron px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-charcoal">
            Popular
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border border-t-0 border-charcoal/10 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-medium leading-snug text-charcoal">{name}</h3>
          <span className="shrink-0 whitespace-nowrap font-serif text-base text-burgundy">{price}</span>
        </div>
        <p className="text-sm leading-relaxed text-charcoal/65">{description}</p>
      </div>
    </article>
  );
}
