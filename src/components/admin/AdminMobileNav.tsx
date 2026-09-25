"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { LogoutButton } from "./LogoutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/catering", label: "Catering" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-cream/10 bg-charcoal text-cream lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold uppercase tracking-[0.06em]",
              active ? "text-saffron-light" : "text-cream/70",
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <LogoutButton
        className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-cream/70"
        label="Logout"
      />
    </nav>
  );
}
