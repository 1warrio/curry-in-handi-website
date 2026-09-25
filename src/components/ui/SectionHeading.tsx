import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Consistent eyebrow + headline + supporting copy pattern used across every
 * major section of the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "dark",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = as;
  const isCenter = align === "center";
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "max-w-2xl",
        isCenter && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.22em]",
            isLight ? "text-saffron-light" : "text-saffron",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-balance font-serif text-[clamp(1.9rem,4vw,2.75rem)] font-medium leading-[1.12]",
          isLight ? "text-cream" : "text-charcoal",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-4 text-balance text-[15px] leading-relaxed sm:text-base",
            isLight ? "text-cream/75" : "text-charcoal/70",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
