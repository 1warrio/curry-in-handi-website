import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { RESTAURANT_NAME } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Sign in",
};

type LoginPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { from } = await searchParams;
  const redirectTo = from && from.startsWith("/admin") ? from : "/admin";

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-saffron">
            {RESTAURANT_NAME}
          </p>
          <h1 className="font-serif text-3xl font-medium text-charcoal">Admin sign in</h1>
          <p className="mt-2 text-sm text-charcoal/60">
            Private dashboard for restaurant staff only.
          </p>
        </div>

        <div className="border border-charcoal/10 bg-white/40 p-6 shadow-elegant sm:p-8">
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </main>
  );
}
