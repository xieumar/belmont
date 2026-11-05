import { describe, expect, it, vi } from "vitest";
import { lookupBooking, NOT_FOUND_MESSAGE } from "./lookup";
import { MemoryBookingStore } from "./memory-store";
import { calculatePrice } from "./pricing";
import type { BookingStore } from "./store";

async function seeded() {
  const store = new MemoryBookingStore();
  const booking = await store.createBooking({
    roomId: "deluxe-king",
    stay: { checkIn: "2030-01-10", checkOut: "2030-01-12" },
    guests: { adults: 2, children: 0 },
    guest: {
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: "+1 555 123 4567",
    },
    price: calculatePrice(35000, 2),
  });
  return { store, booking };
}

describe("lookupBooking", () => {
  it("returns the booking for a matching reference and email", async () => {
    const { store, booking } = await seeded();
    const result = await lookupBooking(store, {
      reference: booking.reference,
      email: "ada@example.com",
    });
    expect(result).toMatchObject({ ok: true });
  });

  it("ignores case and surrounding whitespace", async () => {
    const { store, booking } = await seeded();
    const result = await lookupBooking(store, {
      reference: ` ${booking.reference.toLowerCase()} `,
      email: "  ADA@Example.com ",
    });
    expect(result.ok).toBe(true);
  });

  it("gives the same error for an unknown reference and a wrong email", async () => {
    const { store, booking } = await seeded();
    const wrongEmail = await lookupBooking(store, {
      reference: booking.reference,
      email: "someone@else.com",
    });
    const unknownReference = await lookupBooking(store, {
      reference: "BLM-ZZZZZZ",
      email: "ada@example.com",
    });
    expect(wrongEmail).toEqual(unknownReference);
    expect(wrongEmail).toEqual({
      ok: false,
      fieldErrors: {},
      formError: NOT_FOUND_MESSAGE,
    });
  });

  it("reports malformed input as field errors without querying the store", async () => {
    const getByReference = vi.fn();
    const store = { getByReference } as unknown as BookingStore;
    const result = await lookupBooking(store, {
      reference: "nope",
      email: "x",
    });
    if (result.ok) throw new Error("expected failure");
    expect(Object.keys(result.fieldErrors).sort()).toEqual([
      "email",
      "reference",
    ]);
    expect(getByReference).not.toHaveBeenCalled();
  });

  it("returns a form error rather than throwing when the store fails", async () => {
    const store = {
      getByReference: vi.fn().mockRejectedValue(new Error("boom")),
    } as unknown as BookingStore;
    vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await lookupBooking(store, {
      reference: "BLM-ABC234",
      email: "ada@example.com",
    });
    if (result.ok) throw new Error("expected failure");
    expect(result.formError).toEqual(expect.any(String));
    expect(result.formError).not.toBe(NOT_FOUND_MESSAGE);
  });
});
