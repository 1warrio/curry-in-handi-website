import type { Metadata } from "next";
import type { ReactNode } from "react";

// Keep the private admin dashboard out of search engines entirely.
export const metadata: Metadata = {
  title: {
    default: "Admin | Curry In Handi",
    template: "%s | Curry In Handi Admin",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-cream text-charcoal">{children}</div>;
}
