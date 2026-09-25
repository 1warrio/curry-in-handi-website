"use client";

import { useState, type FormEvent } from "react";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { PHONE_PRIMARY } from "@/data/restaurant";

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  eventType: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  guestCount: "",
  eventType: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const EVENT_TYPES = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "Private Gathering",
  "Family Celebration",
  "Community Event",
  "Other",
];

export function CateringForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!isValidEmail(form.email)) next.email = "Please enter a valid email address.";
    if (!isValidPhone(form.phone)) next.phone = "Please enter a valid phone number.";
    if (!form.eventType) next.eventType = "Please select an event type.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/catering", {
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
        <p className="font-serif text-xl text-charcoal">Thank you for your inquiry.</p>
        <p className="mt-2 text-sm text-charcoal/70">
          Our team will get back to you shortly. For urgent requests, please call{" "}
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="catering-name" className={labelClasses}>
            Name
          </label>
          <input
            id="catering-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "catering-name-error" : undefined}
          />
          {errors.name && (
            <p id="catering-name-error" className="mt-1 text-xs text-burgundy">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="catering-email" className={labelClasses}>
            Email
          </label>
          <input
            id="catering-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "catering-email-error" : undefined}
          />
          {errors.email && (
            <p id="catering-email-error" className="mt-1 text-xs text-burgundy">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="catering-phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="catering-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "catering-phone-error" : undefined}
          />
          {errors.phone && (
            <p id="catering-phone-error" className="mt-1 text-xs text-burgundy">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="catering-date" className={labelClasses}>
            Event Date
          </label>
          <input
            id="catering-date"
            name="eventDate"
            type="date"
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="catering-guests" className={labelClasses}>
            Guest Count
          </label>
          <input
            id="catering-guests"
            name="guestCount"
            type="number"
            min={1}
            value={form.guestCount}
            onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="catering-event-type" className={labelClasses}>
            Event Type
          </label>
          <select
            id="catering-event-type"
            name="eventType"
            value={form.eventType}
            onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            className={inputClasses}
            aria-invalid={Boolean(errors.eventType)}
            aria-describedby={errors.eventType ? "catering-event-type-error" : undefined}
          >
            <option value="">Select an option</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p id="catering-event-type-error" className="mt-1 text-xs text-burgundy">
              {errors.eventType}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="catering-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="catering-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClasses}
          placeholder="Tell us more about your event..."
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-burgundy">
          Something went wrong sending your inquiry. Please try again or call {PHONE_PRIMARY}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-[48px] w-full bg-burgundy px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-cream transition-colors hover:bg-burgundy-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Catering Inquiry"}
      </button>
    </form>
  );
}
