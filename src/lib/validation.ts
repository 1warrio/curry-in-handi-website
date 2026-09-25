export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Loose phone validator: accepts digits, spaces, dashes, parens, plus sign,
// requires at least 7 digits total.
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}
