"use client";

import { useState, type FormEvent } from "react";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { PHONE_PRIMARY } from "@/data/restaurant";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!isValidEmail(form.email)) next.email = "Please enter a valid email address.";
    if (form.phone && !isValidPhone(form.phone)) next.phone = "Please enter a valid phone number.";
    if (!form.message.trim() || form.message.trim().length < 5) {
      next.message = "Please enter a message (at least 5 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-none border border-charcoal/20 bg-cream px-4 py-3 text-[15px] text-charcoal placeholder:text-charcoal/40 focus-visible:border-burgundy focus-visible:outline-none";
  const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-charcoal/70";

  if (status === "success") {
    return (
      <div role="status" className="border border-burgundy/30 bg-burgundy/5 p-8 text-center">
        <p className="font-serif text-xl text-charcoal">Message sent — thank you.</p>
        <p className="mt-2 text-sm text-charcoal/70">
          We&apos;ll respond as soon as we can. For urgent matters, call{" "}
          <a href="tel:+17183811333" className="font-semibold text-burgundy underline">
            {PHONE_PRIMARY}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-name" className={labelClasses}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClasses}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-xs text-burgundy">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 text-xs text-burgundy">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            Phone (optional)
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="mt-1 text-xs text-burgundy">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClasses}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-xs text-burgundy">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-burgundy">
          Something went wrong sending your message. Please try again or call {PHONE_PRIMARY}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-[48px] w-full bg-burgundy px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-cream transition-colors hover:bg-burgundy-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
