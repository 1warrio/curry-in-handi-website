import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of Curry In Handi's food, dining room, tandoor, and non-alcoholic Halal Bar drinks in Brooklyn, NY.",
};

export default function GalleryPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Gallery"
        title="A Closer Look at Curry In Handi"
        description="Food, dining room, tandoor, and the Halal Bar — a visual look at the restaurant."
        image={IMAGES.dishes.tikka}
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-editorial">
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
