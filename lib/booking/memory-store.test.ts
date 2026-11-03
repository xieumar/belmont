import { beforeEach, describe, expect, it } from "vitest";
import { MemoryBookingStore } from "./memory-store";
import { calculatePrice } from "./pricing";
import {
  UnavailableError,
  UnknownRoomError,
  type CreateBookingInput,
} from "./store";

const rooms = [
  { id: "single", units: 1 },
  { id: "double", units: 2 },
];

const make = (
  roomId: string,
  checkIn: string,
  checkOut: string,
  email = "ada@example.com"
): CreateBookingInput => ({
  roomId,
  stay: { checkIn, checkOut },
  guests: { adults: 2, children: 0 },
  guest: { name: "Ada Lovelace", email, phone: "+15551234567" },
  price: calculatePrice(10000, 2, { taxRate: 0, feeRate: 0, currency: "USD" }),
});

let store: MemoryBookingStore;
beforeEach(() => {
  store = new MemoryBookingStore(rooms);
});

describe("availability and creation", () => {
  it("reports full inventory when empty", async () => {
    expect(
      await store.getAvailability({
        checkIn: "2027-06-01",
        checkOut: "2027-06-03",
      })
    ).toEqual({ single: 1, double: 2 });
  });

  it("books the last unit and then refuses", async () => {
    await store.createBooking(make("single", "2027-06-01", "2027-06-03"));
    await expect(
      store.createBooking(make("single", "2027-06-02", "2027-06-04"))
    ).rejects.toBeInstanceOf(UnavailableError);
  });

  it("only one of two concurrent requests gets the last unit", async () => {
    const results = await Promise.allSettled([
      store.createBooking(make("single", "2027-06-01", "2027-06-03")),
      store.createBooking(make("single", "2027-06-01", "2027-06-03")),
    ]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
  });

  it("allows same-day turnover and adjacent stays", async () => {
    await store.createBooking(make("single", "2027-06-01", "2027-06-03"));
    await expect(
      store.createBooking(make("single", "2027-06-03", "2027-06-05"))
    ).resolves.toBeDefined();
    await expect(
      store.createBooking(make("single", "2027-05-30", "2027-06-01"))
    ).resolves.toBeDefined();
  });

  it("tracks multiple units per room", async () => {
    await store.createBooking(make("double", "2027-06-01", "2027-06-03"));
    expect(
      (
        await store.getAvailability({
          checkIn: "2027-06-01",
          checkOut: "2027-06-03",
        })
      ).double
    ).toBe(1);
  });

  it("rejects unknown rooms", async () => {
    await expect(
      store.createBooking(make("nope", "2027-06-01", "2027-06-03"))
    ).rejects.toBeInstanceOf(UnknownRoomError);
  });

  it("generates unique references", async () => {
    const a = await store.createBooking(
      make("double", "2027-06-01", "2027-06-02")
    );
    const b = await store.createBooking(
      make("double", "2027-06-01", "2027-06-02")
    );
    expect(a.reference).not.toBe(b.reference);
  });
});

describe("lookup", () => {
  it("finds by reference and email, case-insensitively", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    const found = await store.getByReference(
      booking.reference.toLowerCase(),
      "ADA@example.com"
    );
    expect(found?.reference).toBe(booking.reference);
  });

  it("returns null for unknown reference and wrong email alike", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    expect(
      await store.getByReference("BLM-AAAAAA", "ada@example.com")
    ).toBeNull();
    expect(
      await store.getByReference(booking.reference, "eve@example.com")
    ).toBeNull();
  });

  it("exposes no internal fields", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    expect(Object.keys(booking).sort()).toEqual(
      [
        "adults",
        "checkIn",
        "checkOut",
        "children",
        "createdAt",
        "guest",
        "price",
        "reference",
        "roomId",
        "status",
      ].sort()
    );
  });

  it("returns copies so callers cannot mutate stored data", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    booking.status = "cancelled";
    const found = await store.getByReference(
      booking.reference,
      "ada@example.com"
    );
    expect(found?.status).toBe("confirmed");
  });
});

describe("cancellation", () => {
  it("releases inventory", async () => {
    const stay = { checkIn: "2027-06-01", checkOut: "2027-06-03" };
    const booking = await store.createBooking(
      make("single", stay.checkIn, stay.checkOut)
    );
    expect((await store.getAvailability(stay)).single).toBe(0);
    const cancelled = await store.cancelBooking(
      booking.reference,
      "ada@example.com"
    );
    expect(cancelled?.status).toBe("cancelled");
    expect((await store.getAvailability(stay)).single).toBe(1);
    await expect(
      store.createBooking(make("single", stay.checkIn, stay.checkOut))
    ).resolves.toBeDefined();
  });

  it("is idempotent and keeps the first cancellation time", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    const first = await store.cancelBooking(
      booking.reference,
      "ada@example.com",
      new Date("2027-05-01T00:00:00Z")
    );
    const second = await store.cancelBooking(
      booking.reference,
      "ada@example.com",
      new Date("2027-05-02T00:00:00Z")
    );
    expect(second).toEqual(first);
    expect(second?.cancelledAt).toBe("2027-05-01T00:00:00.000Z");
  });

  it("refuses with the same null result for a wrong email", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    expect(
      await store.cancelBooking(booking.reference, "eve@example.com")
    ).toBeNull();
    expect(
      (await store.getByReference(booking.reference, "ada@example.com"))?.status
    ).toBe("confirmed");
  });
});
