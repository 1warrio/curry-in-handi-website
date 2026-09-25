import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GOOGLE_REVIEWS_URL } from "@/data/restaurant";

/**
 * We intentionally do not fabricate testimonials. Once the client shares
 * verified review quotes, they can be added here as a list and rendered
 * instead of (or alongside) this Google Reviews callout.
 */
export function ReviewsSection() {
  return (
    <section className="bg-charcoal py-16 text-cream sm:py-20" aria-labelledby="reviews-heading">
      <div className="container-editorial text-center">
        <SectionHeading
          eyebrow="Loved by Our Guests"
          title="See What Brooklyn Is Saying"
          align="center"
          theme="light"
          as="h2"
        />
        <div className="mt-8 flex justify-center">
          <Button href={GOOGLE_REVIEWS_URL} variant="outline-light" size="lg">
            Read Our Google Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
