/** Turn enum-like values into human-readable labels (e.g. payment_pending → Payment Pending). */
export function formatEnumLabel(value: string): string {
  return value
    .trim()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
