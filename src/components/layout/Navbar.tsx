"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, ORDER_ONLINE_URL, RESTAURANT_NAME } from "@/data/restaurant";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-charcoal/5 bg-cream/95 backdrop-blur transition-[padding,box-shadow] duration-300 supports-[backdrop-filter]:bg-cream/90 relative",
        scrolled ? "py-2 shadow-[0_8px_24px_-16px_rgba(20,15,10,0.4)]" : "py-4",
      )}
    >
      <div className="container-editorial flex items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 font-serif text-xl font-medium tracking-wide text-charcoal sm:text-2xl"
        >
          Curry In Handi
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm font-medium uppercase tracking-[0.06em] text-charcoal/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-burgundy",
                    pathname === link.href && "text-burgundy",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button href={ORDER_ONLINE_URL} variant="primary" size="md">
            Order Online
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? `Close menu for ${RESTAURANT_NAME}` : `Open menu for ${RESTAURANT_NAME}`}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "h-[1.5px] w-6 bg-charcoal transition-transform duration-200",
              open && "translate-y-[6.5px] rotate-45",
            )}
          />
          <span className={cn("h-[1.5px] w-6 bg-charcoal transition-opacity duration-200", open && "opacity-0")} />
          <span
            className={cn(
              "h-[1.5px] w-6 bg-charcoal transition-transform duration-200",
              open && "-translate-y-[6.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-0 top-full z-40 origin-top overflow-hidden bg-cream transition-[max-height] duration-300 ease-in-out lg:hidden",
          open ? "max-h-[100vh] border-b border-charcoal/10" : "max-h-0",
        )}
      >
        <nav aria-label="Mobile" className="container-editorial flex flex-col gap-1 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-3 text-base font-medium text-charcoal/90 hover:bg-charcoal/5",
                pathname === link.href && "text-burgundy",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href={ORDER_ONLINE_URL} variant="primary" size="lg" className="mt-4 w-full">
            Order Online
          </Button>
        </nav>
      </div>
    </header>
  );
}
