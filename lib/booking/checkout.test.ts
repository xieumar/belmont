import { describe, expect, it, vi } from "vitest";
import { submitCheckout, type CheckoutValues } from "./checkout";
import { MemoryBookingStore } from "./memory-store";
import { REFERENCE_PATTERN } from "./reference";
import type { BookingStore } from "./store";

const today = "2026-11-04";

const valid: CheckoutValues = {
  roomId: "deluxe-king",
  checkIn: "2026-12-01",
  checkOut: "2026-12-04",
  adults: "2",
  children: "0",
  name: "Ada Lovelace",
  email: "  Ada@Example.com ",
  phone: "+1 555 123 4567",
  specialRequests: "",
};

const submit = (
  values: Partial<CheckoutValues> = {},
  store: BookingStore = new MemoryBookingStore()
) => submitCheckout(store, { ...valid, ...values }, today);

describe("submitCheckout", () => {
  it("creates a booking and returns its reference", async () => {
    const result = await submit();
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.booking.reference).toMatch(REFERENCE_PATTERN);
    expect(result.booking).toMatchObject({
      roomId: "deluxe-king",
      checkIn: "2026-12-01",
      checkOut: "2026-12-04",
      adults: 2,
      children: 0,
      status: "confirmed",
    });
  });

  it("computes the price on the server from the room's rate", async () => {
    const result = await submit();
    if (!result.ok) throw new Error("expected success");
    // Deluxe King is $350 a night; the form carries no price at all.
    expect(result.booking.price).toMatchObject({
      nights: 3,
      nightlyRate: 35000,
      subtotal: 105000,
      total: 105000,
    });
  });

  it("ignores a price smuggled into the submission", async () => {
    const result = await submitCheckout(
      new MemoryBookingStore(),
      { ...valid, total: "1", price: "1", nightlyRate: "1" } as CheckoutValues,
      today
    );
    if (!result.ok) throw new Error("expected success");
    expect(result.booking.price.total).toBe(105000);
  });

  it("normalises the guest email", async () => {
    const result = await submit();
    if (!result.ok) throw new Error("expected success");
    expect(result.booking.guest.email).toBe("ada@example.com");
  });

  describe("validation", () => {
    it.each([
      ["name", { name: "A" }],
      ["email", { email: "not-an-email" }],
      ["phone", { phone: "abc" }],
    ] as const)("returns a field error for a bad %s", async (field, bad) => {
      const store = new MemoryBookingStore();
      const result = await submit(bad, store);
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.fieldErrors[field]).toEqual(expect.any(String));
      expect(result.formError).toBeUndefined();
    });

    it("reports every invalid field at once", async () => {
      const result = await submit({ name: "", email: "x", phone: "" });
      if (result.ok) throw new Error("expected failure");
      expect(Object.keys(result.fieldErrors).sort()).toEqual([
        "email",
        "name",
        "phone",
      ]);
    });

    it("rejects over-long special requests", async () => {
      const result = await submit({ specialRequests: "x".repeat(501) });
      if (result.ok) throw new Error("expected failure");
      expect(result.fieldErrors.specialRequests).toEqual(expect.any(String));
    });

    it("does not create a booking when validation fails", async () => {
      const store = new MemoryBookingStore();
      await submit({ email: "nope" }, store);
      const availability = await store.getAvailability({
        checkIn: valid.checkIn,
        checkOut: valid.checkOut,
      });
      expect(availability["deluxe-king"]).toBe(5);
    });

    it.each([
      ["an unknown room", { roomId: "no-such-room" }],
      ["junk dates", { checkIn: "garbage" }],
      ["zero adults", { adults: "0" }],
      ["non-numeric guests", { adults: "two" }],
    ] as const)("rejects %s with a form error", async (_name, bad) => {
      const result = await submit(bad);
      if (result.ok) throw new Error("expected failure");
      expect(result.formError).toEqual(expect.any(String));
    });

    it("rejects a check-in in the past", async () => {
      const result = await submit({
        checkIn: "2026-11-01",
        checkOut: "2026-11-03",
      });
      if (result.ok) throw new Error("expected failure");
      expect(result.formError).toMatch(/past/i);
    });

    it("rejects check-out on or before check-in", async () => {
      const result = await submit({ checkOut: valid.checkIn });
      if (result.ok) throw new Error("expected failure");
      expect(result.formError).toMatch(/after check-in/i);
    });

    it("rejects more guests than the room holds", async () => {
      const result = await submit({ adults: "3" });
      if (result.ok) throw new Error("expected failure");
      expect(result.formError).toMatch(/can't hold/i);
    });

    it("rejects children in a room that takes none", async () => {
      const result = await submit({ children: "1" });
      if (result.ok) throw new Error("expected failure");
      expect(result.formError).toMatch(/can't hold/i);
    });
  });

  describe("availability", () => {
    const oneUnit = () =>
      new MemoryBookingStore([{ id: "deluxe-king", units: 1 }]);

    it("tells the guest when the room was just booked", async () => {
      const store = oneUnit();
      expect((await submit({}, store)).ok).toBe(true);

      const second = await submit({ email: "other@example.com" }, store);
      if (second.ok) throw new Error("expected failure");
      expect(second.formError).toMatch(/just been booked/i);
      expect(second.fieldErrors).toEqual({});
    });

    it("allows same-day turnover", async () => {
      const store = oneUnit();
      await submit({}, store);
      const next = await submit(
        { checkIn: "2026-12-04", checkOut: "2026-12-06" },
        store
      );
      expect(next.ok).toBe(true);
    });
  });

  it("never throws when the store fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const broken = {
      createBooking: () => Promise.reject(new Error("Firestore is down")),
    } as unknown as BookingStore;

    const result = await submit({}, broken);
    if (result.ok) throw new Error("expected failure");
    expect(result.formError).toMatch(/try again/i);
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});
