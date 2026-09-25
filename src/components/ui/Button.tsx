import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "min-h-[44px] px-6 py-3 text-[13px]",
  lg: "min-h-[52px] px-8 py-4 text-sm",
};

const variants: Record<Variant, string> = {
  primary: "bg-burgundy text-cream hover:bg-burgundy-dark",
  secondary: "bg-saffron text-charcoal hover:bg-saffron-light",
  "outline-light": "border border-cream/70 text-cream hover:bg-cream hover:text-charcoal",
  ghost: "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Shared call-to-action button. Renders a Next.js Link for internal routes,
 * a plain anchor for external/tel/mailto links, or a native button element.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as ButtonAsLink;
    const isInternal = href.startsWith("/") && !external;

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {props.children}
        </Link>
      );
    }

    const isTelOrMail = href.startsWith("tel:") || href.startsWith("mailto:");

    return (
      <a
        href={href}
        className={classes}
        target={isTelOrMail ? undefined : "_blank"}
        rel={isTelOrMail ? undefined : "noopener noreferrer"}
        {...anchorRest}
      >
        {props.children}
      </a>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {props.children}
    </button>
  );
}
