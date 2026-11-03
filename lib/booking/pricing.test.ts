import { describe, expect, it } from "vitest";
import { calculatePrice } from "./pricing";

const config = { taxRate: 0, feeRate: 0, currency: "USD" };

describe("calculatePrice", () => {
  it("multiplies nights by rate with no tax or fees", () => {
    expect(calculatePrice(35000, 3, config)).toEqual({
      nights: 3,
      nightlyRate: 35000,
      subtotal: 105000,
      tax: 0,
      fees: 0,
      total: 105000,
      currency: "USD",
    });
  });

  it("adds tax and fees as rounded integer minor units", () => {
    const result = calculatePrice(33333, 1, {
      taxRate: 12.5,
      feeRate: 3,
      currency: "USD",
    });
    expect(result.tax).toBe(4167); // 4166.625
    expect(result.fees).toBe(1000); // 999.99
    expect(result.total).toBe(33333 + 4167 + 1000);
    expect(Number.isInteger(result.total)).toBe(true);
  });

  it("rejects invalid inputs", () => {
    expect(() => calculatePrice(35000, 0, config)).toThrow();
    expect(() => calculatePrice(35000, 1.5, config)).toThrow();
    expect(() => calculatePrice(-1, 1, config)).toThrow();
    expect(() => calculatePrice(100.5, 1, config)).toThrow();
  });
});
