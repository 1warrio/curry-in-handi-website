import type { MenuItem } from "@/data/menu";

const TAG_STYLES: Record<string, string> = {
  HALAL: "bg-burgundy/10 text-burgundy",
  VEGETARIAN: "bg-green-800/10 text-green-900",
  VEGAN: "bg-green-800/10 text-green-900",
  "GLUTEN-FREE": "bg-copper/15 text-copper",
  SWEET: "bg-yellow-500/15 text-yellow-700",
  SPICY: "bg-red-100 text-red-500",   
  "CHEF's SPECIAL": "bg-amber-100 text-amber-700",
};

export function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex gap-4 border-b border-charcoal/10 py-5 first:pt-0 last:border-b-0">
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-serif text-[17px] font-medium text-charcoal">{item.name}</h3>
          {item.popular && (
            <span className="rounded-sm bg-saffron px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-charcoal">
              Popular
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className={`rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${TAG_STYLES[tag] ?? "bg-charcoal/5 text-charcoal/60"}`}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="shrink-0 pt-1 font-serif text-base text-burgundy">{item.price}</div>
    </div>
  );
}
