"use client";

import { useMemo, useState } from "react";
import { MENU } from "@/data/menu";
import { MenuItemRow } from "@/components/menu/MenuItemRow";
import { cn } from "@/lib/cn";

export function MenuBrowser() {
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return MENU;

    return MENU.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(normalized) ||
          (item.description ?? "").toLowerCase().includes(normalized),
      ),
    })).filter((category) => category.items.length > 0);
  }, [query]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <label htmlFor="menu-search" className="sr-only">
          Search the menu
        </label>
        <div className="relative max-w-sm">
          <input
            id="menu-search"
            type="search"
            placeholder="Search dishes, e.g. biryani, naan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-charcoal/20 bg-cream px-4 py-3 pl-10 text-[15px] text-charcoal placeholder:text-charcoal/40 focus-visible:border-burgundy focus-visible:outline-none"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40"
          >
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <nav
          aria-label="Menu categories"
          className="sticky top-[76px] z-20 -mx-1 flex gap-1 overflow-x-auto bg-cream py-1 lg:static lg:flex-wrap lg:justify-end"
        >
          {MENU.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={cn(
                "shrink-0 whitespace-nowrap px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-charcoal/60 hover:text-burgundy",
              )}
            >
              {category.name}
            </a>
          ))}
        </nav>
      </div>

      {filteredCategories.length === 0 && (
        <p className="py-16 text-center text-charcoal/60">
          No dishes match &ldquo;{query}&rdquo;. Try another search.
        </p>
      )}

      <div className="grid gap-x-14 lg:grid-cols-2">
        {filteredCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className="scroll-mt-32 border-t border-charcoal/10 py-10 first:border-t-0 lg:break-inside-avoid"
          >
            <h2
              id={`${category.id}-heading`}
              className="font-serif text-2xl font-medium text-charcoal"
            >
              {category.name}
            </h2>
            <div className="mt-4">
              {category.items.map((item) => (
                <MenuItemRow key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
