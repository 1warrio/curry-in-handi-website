import Image from "next/image";
import { cn } from "@/lib/cn";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  fill?: boolean;
};

/**
 * Wraps next/image with sensible defaults so every food/interior photo across
 * the site gets consistent lazy-loading, responsive sizing, and object
 * positioning. Swap `src`/`alt` values in the data layer, not here.
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "100vw",
  priority = false,
  objectPosition = "center",
  fill = false,
}: ResponsiveImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn("object-cover", className)}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("h-full w-full object-cover", className)}
      style={{ objectPosition }}
    />
  );
}
