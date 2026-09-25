import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { TrustBar } from "@/components/home/TrustBar";
import { SignatureDishes } from "@/components/home/SignatureDishes";
import { StorySection } from "@/components/home/StorySection";
import { TandoorFeature } from "@/components/home/TandoorFeature";
import { HalalBar } from "@/components/home/HalalBar";
import { CateringSection } from "@/components/home/CateringSection";
import { ExperienceGrid } from "@/components/home/ExperienceGrid";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { LocationSection } from "@/components/LocationSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Halal Indian Restaurant in Brooklyn, NY",
  description:
    "Curry In Handi serves authentic halal Indian cuisine on Bushwick Ave in Brooklyn — tandoor specialties, biryani, curries, and non-alcoholic Halal Bar drinks. Order online, dine in, or book catering.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuickActions />
      <TrustBar />
      <SignatureDishes />
      <StorySection />
      <TandoorFeature />
      <HalalBar />
      <CateringSection />
      <ExperienceGrid />
      <ReviewsSection />
      <LocationSection />
      <FinalCTA />
    </main>
  );
}
