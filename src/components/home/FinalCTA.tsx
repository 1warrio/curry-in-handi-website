import { Button } from "@/components/ui/Button";
import { GOOGLE_MAPS_URL, ORDER_ONLINE_URL } from "@/data/restaurant";

export function FinalCTA() {
  return (
    <section className="bg-charcoal py-20 text-center text-cream sm:py-24">
      <div className="container-editorial">
        <h2 className="text-balance font-serif text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.1]">
          Your Table Is Waiting.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-balance text-[15px] leading-relaxed text-cream/75 sm:text-base">
          Craving authentic Indian flavors? Order online, visit us in Brooklyn, or get in touch
          for your next event.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href={ORDER_ONLINE_URL} variant="secondary" size="lg">
            Order Online
          </Button>
          <Button href={GOOGLE_MAPS_URL} variant="outline-light" size="lg">
            Get Directions
          </Button>
        </div>
      </div>
    </section>
  );
}
