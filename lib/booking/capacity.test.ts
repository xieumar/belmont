import { describe, expect, it } from "vitest";
import { rooms } from "@/data/rooms";
import { checkCapacity } from "./capacity";

const standard = { maxAdults: 2, maxChildren: 0, maxGuests: 2 };
const family = { maxAdults: 2, maxChildren: 2, maxGuests: 4 };

describe("checkCapacity", () => {
  it("accepts guests within limits", () => {
    expect(checkCapacity(standard, { adults: 2, children: 0 })).toBeNull();
    expect(checkCapacity(family, { adults: 2, children: 2 })).toBeNull();
  });
  it("requires at least one adult", () => {
    expect(checkCapacity(family, { adults: 0, children: 2 })).toBe(
      "adult-required"
    );
  });
  it("rejects too many adults, children or guests", () => {
    expect(checkCapacity(standard, { adults: 3, children: 0 })).toBe(
      "too-many-adults"
    );
    expect(checkCapacity(standard, { adults: 1, children: 1 })).toBe(
      "too-many-children"
    );
    expect(
      checkCapacity(
        { maxAdults: 3, maxChildren: 3, maxGuests: 4 },
        { adults: 3, children: 2 }
      )
    ).toBe("too-many-guests");
  });
  it("rejects negative and fractional counts", () => {
    expect(checkCapacity(family, { adults: 1, children: -1 })).toBe(
      "invalid-count"
    );
    expect(checkCapacity(family, { adults: 1.5, children: 0 })).toBe(
      "invalid-count"
    );
  });
});

describe("room data", () => {
  it("has consistent capacity fields", () => {
    for (const room of rooms) {
      expect(room.maxGuests).toBe(room.maxAdults + room.maxChildren);
      expect(room.units).toBeGreaterThan(0);
      expect(Number.isInteger(room.nightlyRate)).toBe(true);
    }
  });
});
