import { describe, expect, it } from "vitest";
import { canCancel, zonedTimeToUtc } from "./policy";

describe("zonedTimeToUtc", () => {
  it("converts New York wall time in winter (UTC-5) and summer (UTC-4)", () => {
    expect(
      zonedTimeToUtc("2027-01-15", "15:00", "America/New_York").toISOString()
    ).toBe("2027-01-15T20:00:00.000Z");
    expect(
      zonedTimeToUtc("2027-07-15", "15:00", "America/New_York").toISOString()
    ).toBe("2027-07-15T19:00:00.000Z");
  });
  it("handles the day of a DST change", () => {
    // US DST starts 2027-03-14 at 02:00; 15:00 is already EDT (UTC-4).
    expect(
      zonedTimeToUtc("2027-03-14", "15:00", "America/New_York").toISOString()
    ).toBe("2027-03-14T19:00:00.000Z");
  });
});

describe("canCancel", () => {
  // Check-in 2027-07-15 15:00 EDT = 19:00Z; cutoff is 48h earlier.
  const booking = { status: "confirmed" as const, checkIn: "2027-07-15" };
  const cutoff = new Date("2027-07-13T19:00:00Z");

  it("allows cancellation exactly at the cutoff", () => {
    expect(canCancel(booking, cutoff)).toEqual({ allowed: true });
  });
  it("allows cancellation well before the cutoff", () => {
    expect(canCancel(booking, new Date("2027-06-01T00:00:00Z"))).toEqual({
      allowed: true,
    });
  });
  it("refuses cancellation after the cutoff", () => {
    expect(canCancel(booking, new Date(cutoff.getTime() + 1))).toEqual({
      allowed: false,
      reason: "too-late",
    });
  });
  it("treats an already cancelled booking as allowed (idempotent)", () => {
    expect(
      canCancel(
        { status: "cancelled", checkIn: "2027-07-15" },
        new Date("2027-07-15T00:00:00Z")
      )
    ).toEqual({ allowed: true, alreadyCancelled: true });
  });
});
