import { hotel } from "@/data/hotel";
import type { PriceBreakdown } from "./types";

interface PricingConfig {
  taxRate: number;
  feeRate: number;
  currency: string;
}

/** Computes a stay price in integer minor units. Rates are percentages. */
export function calculatePrice(
  nightlyRate: number,
  nights: number,
  config: PricingConfig = hotel
): PriceBreakdown {
  if (!Number.isInteger(nightlyRate) || nightlyRate < 0) {
    throw new Error("nightlyRate must be a non-negative integer");
  }
  if (!Number.isInteger(nights) || nights < 1) {
    throw new Error("nights must be a positive integer");
  }
  const subtotal = nightlyRate * nights;
  const tax = Math.round((subtotal * config.taxRate) / 100);
  const fees = Math.round((subtotal * config.feeRate) / 100);
  return {
    nights,
    nightlyRate,
    subtotal,
    tax,
    fees,
    total: subtotal + tax + fees,
    currency: config.currency,
  };
}
