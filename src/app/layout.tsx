import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import {
  ADDRESS,
  EMAIL,
  PHONE_PRIMARY_TEL,
  RESTAURANT_NAME,
} from "@/data/restaurant";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://curryinhandi.example.com"),
  title: {
    default: "Curry In Handi | Halal Indian Restaurant in Brooklyn, NY",
    template: "%s | Curry In Handi",
  },
  description:
    "Curry In Handi is a halal Indian restaurant on Bushwick Ave in Brooklyn, NY, serving tandoor specialties, biryani, curries, and handcrafted non-alcoholic drinks. Order online, dine in, or book catering.",
  keywords: [
    "Curry In Handi",
    "Indian restaurant Brooklyn",
    "halal Indian food",
    "Bushwick Ave restaurant",
    "biryani Brooklyn",
    "halal restaurant Williamsburg",
  ],
  openGraph: {
    title: "Curry In Handi | Halal Indian Restaurant in Brooklyn, NY",
    description:
      "Authentic halal Indian cuisine on Bushwick Ave in Brooklyn — tandoor specialties, biryani, curries, and non-alcoholic Halal Bar drinks.",
    url: "https://curryinhandi.example.com",
    siteName: "Curry In Handi",
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT_NAME,
  servesCuisine: "Indian",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.zip,
    addressCountry: "US",
  },
  telephone: PHONE_PRIMARY_TEL,
  email: EMAIL,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-charcoal antialiased">
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-charcoal focus:px-4 focus:py-3 focus:text-cream"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
