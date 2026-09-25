// ---------------------------------------------------------------------------
// Centralized business configuration for Curry In Handi.
// Update phone numbers, hours, URLs, and social links here — every component
// and page pulls from this single source of truth.
// ---------------------------------------------------------------------------

export const RESTAURANT_NAME = "Curry In Handi";

export const ANNOUNCEMENT_TEXT = "Authentic Halal Indian Cuisine in Brooklyn";

// TODO for client: replace with the real online ordering platform URL
// (e.g. Toast, ChowNow, Grubhub, Slice, Square, etc.)
export const ORDER_ONLINE_URL = "https://www.ubereats.com/store/curry-in-handi/dp3c7B5EV3Sse2dpiG8_Jw?diningMode=DELIVERY&ps=1&surfaceName=";

// TODO for client: replace with a real reservation platform URL (Resy, OpenTable, Tock)
// if/when one exists. Until then, the site directs guests to call instead.
export const RESERVATION_URL = "";

export const ADDRESS = {
  street: "443 Bushwick Ave",
  city: "Brooklyn",
  state: "NY",
  zip: "11206",
  country: "USA",
  full: "443 Bushwick Ave, Brooklyn, NY 11206",
  neighborhood: "Williamsburg / East Williamsburg, Brooklyn",
};

export const PHONE_PRIMARY = "(718) 381-1333";
export const PHONE_PRIMARY_TEL = "+17183811333";
export const PHONE_SECONDARY = "(718) 381-0444";
export const PHONE_SECONDARY_TEL = "+17183810444";
export const EMAIL = "curryinhandi@gmail.com";

// Verified Google Maps listing search link (client can replace with the exact
// Place URL / share link from Google Business Profile).
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Curry+In+Handi+443+Bushwick+Ave+Brooklyn+NY+11206";

export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=443+Bushwick+Ave,+Brooklyn,+NY+11206&output=embed";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Curry+In+Handi+443+Bushwick+Ave+Brooklyn+NY+11206";

// Social links intentionally left empty until the client confirms the exact
// account URLs. Components should hide/disable a social icon when its value
// is an empty string.
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/curryinhandi",
  facebook: "https://www.facebook.com/profile.php?id=100084106051021",
  google: GOOGLE_REVIEWS_URL,
};

// Developer credit link shown in the footer ("Website designed & developed
// by Farhan"). Centralized here so the URL only needs to be updated once.
// TODO: replace with your actual Instagram profile URL.
export const INSTAGRAM_URL = "https://www.instagram.com/farhan1_243";

// Centralized hours object — edit this in one place only. If the client has
// not confirmed current hours, keep `confirmed` as false so the UI shows a
// "check Google" fallback instead of guessed hours.
export const HOURS_CONFIRMED = false;

export type DayHours = {
  day: string;
  hours: string;
};

export const HOURS: DayHours[] = [
  { day: "Monday", hours: "11:30 AM – 10:30 PM" },
  { day: "Tuesday", hours: "11:30 AM – 10:30 PM" },
  { day: "Wednesday", hours: "11:30 AM – 10:30 PM" },
  { day: "Thursday", hours: "11:30 AM – 10:30 PM" },
  { day: "Friday", hours: "11:30 AM – 11:00 PM" },
  { day: "Saturday", hours: "11:30 AM – 11:00 PM" },
  { day: "Sunday", hours: "11:30 AM – 10:30 PM" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Catering", href: "/catering" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const CHARACTERISTICS = [
  "Halal Indian Cuisine",
  "Dine-In",
  "Takeout & Delivery",
  "Catering",
];
