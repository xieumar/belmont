import { describe, expect, it } from "vitest";
import { REFERENCE_PATTERN, generateReference } from "./reference";

describe("generateReference", () => {
  it("matches the BLM-XXXXXX format without ambiguous characters", () => {
    for (let i = 0; i < 200; i++) {
      const ref = generateReference();
      expect(ref).toMatch(REFERENCE_PATTERN);
      expect(ref.slice(4)).not.toMatch(/[01OIL]/);
    }
  });

  it("is effectively unique", () => {
    const refs = new Set(Array.from({ length: 1000 }, generateReference));
    expect(refs.size).toBe(1000);
  });
});
