import { describe, expect, it } from "vitest";
import { parseSearch } from "./search";

const today = "2026-11-04";
const valid = {
  checkIn: "2026-12-01",
  checkOut: "2026-12-04",
  adults: "2",
  children: "1",
};

const invalidWith = (error?: string) => ({
  status: "invalid",
  error: error ?? expect.any(String),
});

describe("parseSearch", () => {
  it("reports no search when no search params are present", () => {
    expect(parseSearch({}, today)).toEqual({ status: "none" });
    expect(parseSearch({ utm_source: "x" }, today)).toEqual({
      status: "none",
    });
  });

  it("parses a valid search and coerces counts to numbers", () => {
    expect(parseSearch(valid, today)).toEqual({
      status: "ok",
      stay: { checkIn: "2026-12-01", checkOut: "2026-12-04" },
      guests: { adults: 2, children: 1 },
    });
  });

  it("defaults children to 0", () => {
    const { children: _children, ...rest } = valid;
    expect(parseSearch(rest, today)).toMatchObject({
      status: "ok",
      guests: { adults: 2, children: 0 },
    });
  });

  it("uses the first value when a param is repeated", () => {
    expect(parseSearch({ ...valid, adults: ["3", "9"] }, today)).toMatchObject({
      status: "ok",
      guests: { adults: 3 },
    });
  });

  it("is invalid when only some params are present", () => {
    expect(parseSearch({ adults: "2" }, today)).toMatchObject(invalidWith());
    expect(parseSearch({ ...valid, checkOut: undefined }, today)).toMatchObject(
      invalidWith()
    );
  });

  it.each([
    ["junk dates", { checkIn: "garbage", checkOut: "nope" }],
    ["an impossible date", { checkIn: "2026-02-31" }],
    ["zero adults", { adults: "0" }],
    ["negative children", { children: "-1" }],
    ["non-numeric adults", { adults: "abc" }],
    ["too many adults", { adults: "11" }],
    ["fractional adults", { adults: "1.5" }],
    ["empty adults", { adults: "" }],
  ])("is invalid for %s", (_name, override) => {
    expect(parseSearch({ ...valid, ...override }, today)).toMatchObject(
      invalidWith()
    );
  });

  it("rejects a check-in in the past", () => {
    expect(
      parseSearch({ ...valid, checkIn: "2026-11-03" }, today)
    ).toMatchObject(invalidWith("Check-in can't be in the past."));
  });

  it("allows checking in today", () => {
    expect(
      parseSearch({ ...valid, checkIn: today, checkOut: "2026-11-06" }, today)
    ).toMatchObject({ status: "ok" });
  });

  it("rejects check-out on or before check-in", () => {
    const message = "Check-out must be after check-in.";
    expect(
      parseSearch({ ...valid, checkOut: valid.checkIn }, today)
    ).toMatchObject(invalidWith(message));
    expect(
      parseSearch({ ...valid, checkOut: "2026-11-30" }, today)
    ).toMatchObject(invalidWith(message));
  });

  it("rejects stays that are too long or too far ahead", () => {
    expect(
      parseSearch({ ...valid, checkOut: "2027-01-15" }, today)
    ).toMatchObject(invalidWith("Stays are limited to 30 nights."));
    expect(
      parseSearch(
        { ...valid, checkIn: "2028-01-01", checkOut: "2028-01-03" },
        today
      )
    ).toMatchObject(invalidWith("We take bookings up to 365 days ahead."));
  });

  it("never throws on hostile input", () => {
    expect(() =>
      parseSearch(
        { checkIn: ["a", "b"], checkOut: "<script>", adults: "1e999" },
        today
      )
    ).not.toThrow();
  });
});
