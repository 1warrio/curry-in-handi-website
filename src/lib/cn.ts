// Minimal classnames helper — avoids pulling in an extra dependency for
// what is a very small utility.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
