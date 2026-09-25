"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { RESTAURANT_NAME } from "@/data/restaurant";
import { LogoutButton } from "./LogoutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/messages", label: "Contact Messages" },
  { href: "/admin/catering", label: "Catering Requests" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Admin navigation"
      className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-charcoal/10 bg-charcoal text-cream lg:flex"
    >
      <div className="border-b border-cream/10 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-saffron-light">
          {RESTAURANT_NAME}
        </p>
        <p className="mt-1 font-serif text-lg font-medium">Admin</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-cream/10 text-cream" : "text-cream/70 hover:bg-cream/5 hover:text-cream",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-cream/10 px-3 py-4">
        <p className="truncate px-3 pb-3 text-xs text-cream/50">Signed in as {adminName}</p>
        <LogoutButton className="w-full justify-start text-cream/70 hover:text-cream" />
      </div>
    </aside>
  );
}
