import type { Firestore } from "firebase-admin/firestore";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { getDb } from "@/lib/firebase/admin";
import { FirestoreBookingStore } from "./firestore-store";
import { calculatePrice } from "./pricing";
import {
  UnavailableError,
  UnknownRoomError,
  type CreateBookingInput,
} from "./store";

// Tests run against the real Firestore from .env.local, but only ever touch
// collections with this prefix.
const PREFIX = "test_";
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

const june = { checkIn: "2027-06-01", checkOut: "2027-06-03" };

let db: Firestore;
let store: FirestoreBookingStore;

beforeAll(() => {
  db = getDb();
  store = new FirestoreBookingStore(db, rooms, PREFIX);
});

// Removes only the prefixed test collections, never real booking data.
async function clearTestData() {
  await Promise.all([
    db.recursiveDelete(db.collection(`${PREFIX}bookings`)),
    db.recursiveDelete(db.collection(`${PREFIX}inventory`)),
  ]);
}

beforeEach(clearTestData);
afterAll(clearTestData);

describe("availability and creation", () => {
  it("reports full inventory when empty", async () => {
    expect(await store.getAvailability(june)).toEqual({ single: 1, double: 2 });
  });

  it("stores a booking whose optional guest fields are blank", async () => {
    const input = make("single", "2027-06-10", "2027-06-12");
    const booking = await store.createBooking({
      ...input,
      guest: { ...input.guest, specialRequests: undefined },
    });
    const found = await store.getByReference(
      booking.reference,
      input.guest.email
    );
    expect(found?.guest.specialRequests).toBeUndefined();
  });

  it("books the last unit and then refuses", async () => {
    await store.createBooking(make("single", "2027-06-01", "2027-06-03"));
    await expect(
      store.createBooking(make("single", "2027-06-02", "2027-06-04"))
    ).rejects.toBeInstanceOf(UnavailableError);
  });

  it("lets exactly one of many concurrent requests take the last unit", async () => {
    const results = await Promise.allSettled(
      Array.from({ length: 8 }, () =>
        store.createBooking(make("single", "2027-06-01", "2027-06-03"))
      )
    );
    const ok = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter(
      (r): r is PromiseRejectedResult => r.status === "rejected"
    );
    expect(ok).toHaveLength(1);
    expect(failed).toHaveLength(7);
    for (const f of failed) {
      expect(f.reason).toBeInstanceOf(UnavailableError);
    }
    expect((await store.getAvailability(june)).single).toBe(0);
  });

  it("never oversells a room with several units under concurrency", async () => {
    const results = await Promise.allSettled(
      Array.from({ length: 6 }, () =>
        store.createBooking(make("double", "2027-06-01", "2027-06-03"))
      )
    );
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(2);
    expect((await store.getAvailability(june)).double).toBe(0);
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

  it("blocks a stay that overlaps only the last night of another", async () => {
    await store.createBooking(make("single", "2027-06-01", "2027-06-04"));
    await expect(
      store.createBooking(make("single", "2027-06-03", "2027-06-06"))
    ).rejects.toBeInstanceOf(UnavailableError);
  });

  it("reports the busiest night in a range", async () => {
    await store.createBooking(make("double", "2027-06-02", "2027-06-03"));
    expect((await store.getAvailability(june)).double).toBe(1);
    expect(
      (
        await store.getAvailability({
          checkIn: "2027-06-03",
          checkOut: "2027-06-05",
        })
      ).double
    ).toBe(2);
  });

  it("rejects unknown rooms and writes nothing", async () => {
    await expect(
      store.createBooking(make("nope", "2027-06-01", "2027-06-03"))
    ).rejects.toBeInstanceOf(UnknownRoomError);
    expect(await store.getAvailability(june)).toEqual({ single: 1, double: 2 });
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
  it("finds a booking by reference and email, case-insensitively", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    const found = await store.getByReference(
      booking.reference.toLowerCase(),
      "ADA@example.com"
    );
    expect(found?.reference).toBe(booking.reference);
    expect(found?.status).toBe("confirmed");
  });

  it("returns null for an unknown reference and a wrong email alike", async () => {
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
    const found = await store.getByReference(
      booking.reference,
      "ada@example.com"
    );
    expect(found).not.toHaveProperty("emailKey");
    expect(booking).not.toHaveProperty("emailKey");
  });
});

describe("cancellation", () => {
  it("releases inventory so the room can be booked again", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    expect((await store.getAvailability(june)).single).toBe(0);

    const cancelled = await store.cancelBooking(
      booking.reference,
      "ada@example.com"
    );
    expect(cancelled?.status).toBe("cancelled");
    expect((await store.getAvailability(june)).single).toBe(1);
    await expect(
      store.createBooking(
        make("single", "2027-06-01", "2027-06-03", "eve@example.com")
      )
    ).resolves.toBeDefined();
  });

  it("is idempotent and does not release inventory twice", async () => {
    const first = await store.createBooking(
      make("double", "2027-06-01", "2027-06-03")
    );
    await store.createBooking(
      make("double", "2027-06-01", "2027-06-03", "eve@example.com")
    );

    const a = await store.cancelBooking(
      first.reference,
      "ada@example.com",
      new Date("2027-05-01T00:00:00Z")
    );
    const b = await store.cancelBooking(
      first.reference,
      "ada@example.com",
      new Date("2027-05-02T00:00:00Z")
    );
    expect(b).toEqual(a);
    expect(b?.cancelledAt).toBe("2027-05-01T00:00:00.000Z");
    // Eve's booking still holds one of the two units.
    expect((await store.getAvailability(june)).double).toBe(1);
  });

  it("concurrent cancellations release inventory exactly once", async () => {
    const first = await store.createBooking(
      make("double", "2027-06-01", "2027-06-03")
    );
    await store.createBooking(
      make("double", "2027-06-01", "2027-06-03", "eve@example.com")
    );

    await Promise.all(
      Array.from({ length: 4 }, () =>
        store.cancelBooking(first.reference, "ada@example.com")
      )
    );
    expect((await store.getAvailability(june)).double).toBe(1);
  });

  it("refuses a wrong email without changing anything", async () => {
    const booking = await store.createBooking(
      make("single", "2027-06-01", "2027-06-03")
    );
    expect(
      await store.cancelBooking(booking.reference, "eve@example.com")
    ).toBeNull();
    expect(
      await store.cancelBooking("BLM-AAAAAA", "ada@example.com")
    ).toBeNull();
    expect(
      (await store.getByReference(booking.reference, "ada@example.com"))?.status
    ).toBe("confirmed");
    expect((await store.getAvailability(june)).single).toBe(0);
  });
});
