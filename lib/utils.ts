export { cn } from "cn";

/** Formats an amount in minor units (cents) as a currency string, e.g. 35000 -> "$350". */
export function formatPrice(minorUnits: number, currency = "USD"): string {
  const amount = minorUnits / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}
