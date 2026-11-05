import { describe, expect, it, vi } from "vitest";
import {
  CANCEL_FAILED_MESSAGE,
  CANCEL_NOT_FOUND_MESSAGE,
  CANCEL_TOO_LATE_MESSAGE,
  cancelBookingFor,
} from "./cancel";
import { MemoryBookingStore } from "./memory-store";
import { calculatePrice } from "./pricing";
import type { BookingStore } from "./store";

const EMAIL = "ada@example.com";
const stay = { checkIn: "2030-06-10", checkOut: "2030-06-12" };
// Well before the 48-hour cutoff, and well inside it.
const early = new Date("2030-05-01T12:00:00Z");
const late = new Date("2030-06-10T12:00:00Z");

async function seeded(units = 1) {
  const store = new MemoryBookingStore([{ id: "deluxe-king", units }]);
  const booking = await store.createBooking({
    roomId: "deluxe-king",
    stay,
    guests: { adults: 2, children: 0 },
    guest: { name: "Ada Lovelace", email: EMAIL, phone: "+1 555 123 4567" },
    price: calculatePrice(35000, 2),
  });
  return { store, booking };
}

describe("cancelBookingFor", () => {
  it("cancels a booking inside the free-cancellation window", async () => {
    const { store, booking } = await seeded();
    const result = await cancelBookingFor(
      store,
      booking.reference,
      EMAIL,
      early
    );
    expect(result).toMatchObject({ ok: true });
    if (!result.ok) return;
    expect(result.booking.status).toBe("cancelled");
    expect(result.booking.cancelledAt).toBe(early.toISOString());
  });

  it("is idempotent: cancelling twice succeeds and changes nothing", async () => {
    const { store, booking } = await seeded();
    const first = await cancelBookingFor(
      store,
      booking.reference,
      EMAIL,
      early
    );
    const second = await cancelBookingFor(
      store,
      booking.reference,
      EMAIL,
      new Date("2030-05-02T12:00:00Z")
    );
    if (!first.ok || !second.ok) throw new Error("expected success");
    expect(second.booking.cancelledAt).toBe(first.booking.cancelledAt);
  });

  it("stays idempotent even after the cutoff has passed", async () => {
    const { store, booking } = await seeded();
    await cancelBookingFor(store, booking.reference, EMAIL, early);
    const again = await cancelBookingFor(store, booking.reference, EMAIL, late);
    expect(again.ok).toBe(true);
  });

  it("refuses once the cancellation cutoff has passed", async () => {
    const { store, booking } = await seeded();
    const result = await cancelBookingFor(
      store,
      booking.reference,
      EMAIL,
      late
    );
    expect(result).toEqual({
      ok: false,
      reason: "too-late",
      message: CANCEL_TOO_LATE_MESSAGE,
    });
    const after = await store.getByReference(booking.reference, EMAIL);
    expect(after?.status).toBe("confirmed");
  });

  it("gives the same error for a wrong email and an unknown reference", async () => {
    const { store, booking } = await seeded();
    const wrongEmail = await cancelBookingFor(
      store,
      booking.reference,
      "other@example.com",
      early
    );
    const unknown = await cancelBookingFor(store, "BLM-ZZZZZZ", EMAIL, early);
    expect(wrongEmail).toEqual(unknown);
    expect(wrongEmail).toMatchObject({
      ok: false,
      reason: "not-found",
      message: CANCEL_NOT_FOUND_MESSAGE,
    });
    const after = await store.getByReference(booking.reference, EMAIL);
    expect(after?.status).toBe("confirmed");
  });

  it("releases the room so the dates can be booked again", async () => {
    const { store, booking } = await seeded(1);
    expect(await store.getAvailability(stay)).toEqual({ "deluxe-king": 0 });
    await cancelBookingFor(store, booking.reference, EMAIL, early);
    expect(await store.getAvailability(stay)).toEqual({ "deluxe-king": 1 });
  });

  it("returns a form error rather than throwing when the store fails", async () => {
    const store = {
      getByReference: vi.fn().mockRejectedValue(new Error("boom")),
    } as unknown as BookingStore;
    vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await cancelBookingFor(store, "BLM-ABC234", EMAIL, early);
    expect(result).toEqual({
      ok: false,
      reason: "failed",
      message: CANCEL_FAILED_MESSAGE,
    });
  });
});
