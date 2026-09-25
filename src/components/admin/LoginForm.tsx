"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/auth/actions";

const initialState: LoginState = { error: null };

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  const inputClasses =
    "w-full rounded-none border border-charcoal/20 bg-cream px-4 py-3 text-[15px] text-charcoal placeholder:text-charcoal/40 focus-visible:border-burgundy focus-visible:outline-none";
  const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-charcoal/70";

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClasses}
          aria-invalid={state.error ? true : undefined}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClasses}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClasses}
          aria-invalid={state.error ? true : undefined}
        />
      </div>

      {state.error && (
        <p role="alert" className="border border-burgundy/30 bg-burgundy/5 px-4 py-3 text-sm text-burgundy-dark">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-burgundy px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-cream transition-colors duration-200 hover:bg-burgundy-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
