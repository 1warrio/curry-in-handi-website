import type { RestaurantImage } from "@/data/images";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image?: RestaurantImage;
};

/**
 * Compact cinematic header used at the top of interior pages (Menu, About,
 * Catering, Gallery, Contact) so each page keeps a consistent premium feel
 * without repeating the full homepage hero.
 */
export function PageHeader({ eyebrow, title, description, image }: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[42vh] items-end overflow-hidden bg-charcoal sm:min-h-[46vh]">
      {image && (
        <div className="absolute inset-0">
          <ResponsiveImage src={image.src} alt={image.alt} width={image.width} height={image.height} fill priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        </div>
      )}
      {!image && <div className="absolute inset-0 bg-charcoal" />}
      <div className="container-editorial relative z-10 pb-14 pt-32 sm:pb-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-saffron-light">{eyebrow}</p>
        <h1 className="max-w-2xl text-balance font-serif text-[clamp(2.2rem,5.5vw,3.5rem)] font-medium leading-[1.08] text-cream">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-balance text-[15px] leading-relaxed text-cream/80 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
