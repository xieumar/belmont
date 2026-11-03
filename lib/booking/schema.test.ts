import { describe, expect, it } from "vitest";
import { guestDetailsSchema, lookupSchema, searchSchema } from "./schema";

describe("searchSchema", () => {
  it("coerces query-string numbers and defaults children to 0", () => {
    const result = searchSchema.parse({
      checkIn: "2027-06-01",
      checkOut: "2027-06-03",
      adults: "2",
    });
    expect(result).toEqual({
      checkIn: "2027-06-01",
      checkOut: "2027-06-03",
      adults: 2,
      children: 0,
    });
  });
  it("rejects tampered values", () => {
    const base = { checkIn: "2027-06-01", checkOut: "2027-06-03" };
    expect(searchSchema.safeParse({ ...base, adults: "0" }).success).toBe(
      false
    );
    expect(searchSchema.safeParse({ ...base, adults: "abc" }).success).toBe(
      false
    );
    expect(
      searchSchema.safeParse({ ...base, adults: "1", children: "-1" }).success
    ).toBe(false);
    expect(
      searchSchema.safeParse({ ...base, checkIn: "tomorrow", adults: "1" })
        .success
    ).toBe(false);
  });
});

describe("guestDetailsSchema", () => {
  const valid = {
    name: "  Ada Lovelace ",
    email: " Ada@Example.COM ",
    phone: "+1 (555) 123-4567",
  };
  it("trims and normalises", () => {
    const result = guestDetailsSchema.parse(valid);
    expect(result.name).toBe("Ada Lovelace");
    expect(result.email).toBe("ada@example.com");
  });
  it("reports field errors", () => {
    const result = guestDetailsSchema.safeParse({
      name: "A",
      email: "nope",
      phone: "abc",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = Object.keys(result.error.flatten().fieldErrors);
      expect(fields).toEqual(["name", "email", "phone"]);
    }
  });
});

describe("lookupSchema", () => {
  it("normalises reference and email", () => {
    expect(
      lookupSchema.parse({ reference: " blm-7k4q9x ", email: "A@B.co" })
    ).toEqual({ reference: "BLM-7K4Q9X", email: "a@b.co" });
  });
  it("rejects malformed references", () => {
    expect(
      lookupSchema.safeParse({ reference: "BLM-OOOOOO", email: "a@b.co" })
        .success
    ).toBe(false);
  });
});
