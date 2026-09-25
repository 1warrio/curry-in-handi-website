// ---------------------------------------------------------------------------
// Centralized image registry. Swap the `src` values for real client
// photography whenever it becomes available — every component references
// this file rather than hard-coding paths.
// ---------------------------------------------------------------------------

export type RestaurantImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const IMAGES = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Overhead spread of chicken biryani, tandoori chicken, and naan on a dark table",
    width: 1920,
    height: 1280,
  },
  tandoor: {
    src: "/images/tandoor.jpg",
    alt: "Skewers of tandoori chicken and seekh kebab cooking inside a traditional clay tandoor",
    width: 1600,
    height: 1200,
  },
  aboutInterior: {
    src: "/images/about-interior.jpg",
    alt: "Warm dining room interior at Curry In Handi with dark wood tables and copper accents",
    width: 1600,
    height: 1200,
  },
  halalBar: {
    src: "/images/halal-bar-drinks.jpg",
    alt: "Three colorful non-alcoholic mocktails garnished with mint and citrus on a dark bar counter",
    width: 1600,
    height: 1200,
  },
  catering: {
    src: "/images/catering.jpg",
    alt: "Catering buffet spread of Indian dishes in copper chafing trays",
    width: 1600,
    height: 1200,
  },
  dishes: {
    biryani: {
      src: "/images/dish-biryani.jpg",
      alt: "Chicken biryani served in a copper handi, garnished with fried onions and mint",
      width: 1400,
      height: 1400,
    },
    butterChicken: {
      src: "/images/dish-butter-chicken.jpg",
      alt: "Creamy butter chicken curry garnished with cilantro, served with naan",
      width: 1400,
      height: 1400,
    },
    lambCurry: {
      src: "/images/dish-lamb-curry.jpg",
      alt: "Rich lamb curry in a rustic bowl garnished with fresh cilantro",
      width: 1400,
      height: 1400,
    },
    tikka: {
      src: "/images/dish-tikka.jpg",
      alt: "Grilled tandoori chicken tikka skewers with charred edges and lemon wedges",
      width: 1400,
      height: 1400,
    },
    naanBasket: {
      src: "/images/dish-naan-basket.jpg",
      alt: "Basket of garlic and butter naan alongside golden fried samosas",
      width: 1400,
      height: 1400,
    },
  },
} as const;

export const GALLERY_IMAGES: (RestaurantImage & { category: "Food" | "Restaurant" | "Tandoor" | "Drinks" | "Events" })[] = [
  { ...IMAGES.dishes.biryani, category: "Food" },
  { ...IMAGES.dishes.butterChicken, category: "Food" },
  { ...IMAGES.dishes.lambCurry, category: "Food" },
  { ...IMAGES.dishes.tikka, category: "Food" },
  { ...IMAGES.dishes.naanBasket, category: "Food" },
  { ...IMAGES.aboutInterior, category: "Restaurant" },
  { ...IMAGES.tandoor, category: "Tandoor" },
  { ...IMAGES.halalBar, category: "Drinks" },
  { ...IMAGES.catering, category: "Events" },
  { ...IMAGES.hero, category: "Food" },
];
