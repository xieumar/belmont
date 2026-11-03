import { describe, expect, it } from "vitest";
import {
  addDays,
  hotelToday,
  isValidDateString,
  nightsBetween,
  staysOverlap,
  validateStayDates,
} from "./dates";

describe("isValidDateString", () => {
  it("accepts real dates and rejects impossible or malformed ones", () => {
    expect(isValidDateString("2028-02-29")).toBe(true);
    expect(isValidDateString("2027-02-29")).toBe(false);
    expect(isValidDateString("2027-13-01")).toBe(false);
    expect(isValidDateString("2027-1-1")).toBe(false);
    expect(isValidDateString("not-a-date")).toBe(false);
  });
});

describe("nightsBetween / addDays", () => {
  it("counts nights across month, year and DST boundaries", () => {
    expect(nightsBetween("2027-01-31", "2027-02-01")).toBe(1);
    expect(nightsBetween("2026-12-31", "2027-01-02")).toBe(2);
    expect(nightsBetween("2027-03-13", "2027-03-15")).toBe(2); // US DST
    expect(nightsBetween("2027-11-06", "2027-11-08")).toBe(2); // US DST end
  });

  it("adds days across boundaries", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
    expect(addDays("2027-03-01", -1)).toBe("2027-02-28");
  });
});

describe("staysOverlap", () => {
  const a = { checkIn: "2027-05-10", checkOut: "2027-05-12" };
  it("allows same-day turnover and adjacent stays", () => {
    expect(
      staysOverlap(a, { checkIn: "2027-05-12", checkOut: "2027-05-14" })
    ).toBe(false);
    expect(
      staysOverlap(a, { checkIn: "2027-05-08", checkOut: "2027-05-10" })
    ).toBe(false);
  });
  it("detects partial, contained and identical overlaps", () => {
    expect(
      staysOverlap(a, { checkIn: "2027-05-11", checkOut: "2027-05-13" })
    ).toBe(true);
    expect(
      staysOverlap(a, { checkIn: "2027-05-09", checkOut: "2027-05-13" })
    ).toBe(true);
    expect(staysOverlap(a, a)).toBe(true);
  });
});

describe("hotelToday", () => {
  it("uses the hotel time zone, not UTC", () => {
    // 03:00 UTC on the 2nd is still the 1st evening in New York.
    const now = new Date("2027-06-02T03:00:00Z");
    expect(hotelToday(now, "America/New_York")).toBe("2027-06-01");
    expect(hotelToday(now, "UTC")).toBe("2027-06-02");
  });
});

describe("validateStayDates", () => {
  const today = "2027-06-01";
  it("accepts a valid stay, including check-in today", () => {
    expect(
      validateStayDates({ checkIn: today, checkOut: "2027-06-03" }, today)
    ).toBeNull();
  });
  it("rejects invalid dates", () => {
    expect(
      validateStayDates({ checkIn: "nope", checkOut: "2027-06-03" }, today)
    ).toBe("invalid-date");
  });
  it("rejects check-out on or before check-in", () => {
    expect(
      validateStayDates(
        { checkIn: "2027-06-03", checkOut: "2027-06-03" },
        today
      )
    ).toBe("checkout-not-after-checkin");
    expect(
      validateStayDates(
        { checkIn: "2027-06-03", checkOut: "2027-06-02" },
        today
      )
    ).toBe("checkout-not-after-checkin");
  });
  it("rejects past check-in", () => {
    expect(
      validateStayDates(
        { checkIn: "2027-05-31", checkOut: "2027-06-02" },
        today
      )
    ).toBe("in-the-past");
  });
  it("enforces the max stay (30 nights)", () => {
    expect(
      validateStayDates({ checkIn: today, checkOut: "2027-07-01" }, today)
    ).toBeNull();
    expect(
      validateStayDates({ checkIn: today, checkOut: "2027-07-02" }, today)
    ).toBe("stay-too-long");
  });
  it("enforces the max advance window (365 days)", () => {
    expect(
      validateStayDates(
        { checkIn: "2028-05-31", checkOut: "2028-06-01" },
        today
      )
    ).toBeNull();
    expect(
      validateStayDates(
        { checkIn: "2028-06-01", checkOut: "2028-06-02" },
        today
      )
    ).toBe("too-far-ahead");
  });
});
