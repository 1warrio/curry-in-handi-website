"use client";

import { logoutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/cn";

export function LogoutButton({ className, label = "Logout" }: { className?: string; label?: string }) {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={cn(
          "rounded px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron",
          className,
        )}
      >
        {label}
      </button>
    </form>
  );
}
