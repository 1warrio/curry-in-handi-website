import type { ReactNode } from "react";
import { requireAdminSession } from "@/lib/auth/dal";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AutoRefresh } from "@/components/admin/AutoRefresh";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  // Defense in depth: middleware already blocks unauthenticated requests to
  // /admin/*, but every server component/action that touches admin data
  // verifies the session again on its own, independent of the middleware.
  const session = await requireAdminSession();

  return (
  <div className="lg:flex">
    <AutoRefresh />
    <AdminSidebar adminName={session.name} />
      <div className="flex-1 lg:pl-60">
        <main id="main-content" className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-10">
          {children}
        </main>
      </div>
      <AdminMobileNav />
    </div>
  );
}
