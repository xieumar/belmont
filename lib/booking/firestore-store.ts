import { createHash, timingSafeEqual } from "node:crypto";
import type { DocumentReference, Firestore } from "firebase-admin/firestore";
import { rooms as defaultRooms } from "@/data/rooms";
import { addDays, nightsBetween } from "./dates";
import { generateReference } from "./reference";
import {
  UnavailableError,
  UnknownRoomError,
  type Availability,
  type BookingDTO,
  type BookingStore,
  type CreateBookingInput,
} from "./store";
import type { StayDates } from "./types";

const MAX_REFERENCE_ATTEMPTS = 5;

interface RoomInventory {
  id: string;
  units: number;
}

/** Shape of a document in `bookings/{reference}`. */
interface BookingDoc extends BookingDTO {
  /** Internal: normalised email used for lookups. Never returned. */
  emailKey: string;
}

interface InventoryDoc {
  roomId: string;
  date: string;
  booked: number;
}

class ReferenceCollisionError extends Error {}

const normaliseEmail = (email: string) => email.trim().toLowerCase();

/** Compares emails without leaking where they differ. */
function emailsMatch(a: string, b: string): boolean {
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}

/** Each night of the stay: check-in inclusive, check-out exclusive. */
function nightsOf({ checkIn, checkOut }: StayDates): string[] {
  const count = nightsBetween(checkIn, checkOut);
  return Array.from({ length: count }, (_, i) => addDays(checkIn, i));
}

function toDTO({ emailKey: _emailKey, ...dto }: BookingDoc): BookingDTO {
  return dto;
}

export class FirestoreBookingStore implements BookingStore {
  constructor(
    private readonly db: Firestore,
    private readonly rooms: RoomInventory[] = defaultRooms,
    /** Prefixes collection names, e.g. "test_" keeps tests off real data. */
    private readonly collectionPrefix = ""
  ) {}

  private get bookings() {
    return this.db.collection(`${this.collectionPrefix}bookings`);
  }

  private get inventory() {
    return this.db.collection(`${this.collectionPrefix}inventory`);
  }

  private inventoryRef(roomId: string, date: string): DocumentReference {
    return this.inventory.doc(`${roomId}_${date}`);
  }

  private bookingRef(reference: string): DocumentReference {
    return this.bookings.doc(reference.trim().toUpperCase());
  }

  async getAvailability(stay: StayDates): Promise<Availability> {
    // A single range query on `date`; the automatic index is enough.
    const snapshot = await this.inventory
      .where("date", ">=", stay.checkIn)
      .where("date", "<", stay.checkOut)
      .get();

    const peak = new Map<string, number>();
    for (const doc of snapshot.docs) {
      const { roomId, booked } = doc.data() as InventoryDoc;
      peak.set(roomId, Math.max(peak.get(roomId) ?? 0, booked));
    }

    const result: Availability = {};
    for (const room of this.rooms) {
      result[room.id] = Math.max(0, room.units - (peak.get(room.id) ?? 0));
    }
    return result;
  }

  async createBooking(input: CreateBookingInput): Promise<BookingDTO> {
    const room = this.rooms.find((r) => r.id === input.roomId);
    if (!room) throw new UnknownRoomError(input.roomId);

    for (let attempt = 0; attempt < MAX_REFERENCE_ATTEMPTS; attempt++) {
      try {
        return await this.tryCreate(input, room, generateReference());
      } catch (error) {
        if (!(error instanceof ReferenceCollisionError)) throw error;
      }
    }
    throw new Error("Could not allocate a unique booking reference");
  }

  private tryCreate(
    input: CreateBookingInput,
    room: RoomInventory,
    reference: string
  ): Promise<BookingDTO> {
    const nights = nightsOf(input.stay);
    const inventoryRefs = nights.map((date) =>
      this.inventoryRef(room.id, date)
    );
    const bookingRef = this.bookingRef(reference);

    return this.db.runTransaction(async (tx) => {
      // All reads must come before any write.
      const [bookingSnap, ...inventorySnaps] = await tx.getAll(
        bookingRef,
        ...inventoryRefs
      );
      if (bookingSnap.exists) throw new ReferenceCollisionError();

      const counts = inventorySnaps.map(
        (snap) => (snap.data() as InventoryDoc | undefined)?.booked ?? 0
      );
      if (counts.some((booked) => booked >= room.units)) {
        throw new UnavailableError(room.id);
      }

      inventoryRefs.forEach((ref, i) => {
        tx.set(ref, {
          roomId: room.id,
          date: nights[i],
          booked: counts[i] + 1,
        } satisfies InventoryDoc);
      });

      const booking: BookingDoc = {
        reference,
        roomId: room.id,
        checkIn: input.stay.checkIn,
        checkOut: input.stay.checkOut,
        adults: input.guests.adults,
        children: input.guests.children,
        // Firestore rejects `undefined` values, and optional fields such as
        // specialRequests are undefined when the guest leaves them blank.
        guest: Object.fromEntries(
          Object.entries(input.guest).filter(([, value]) => value !== undefined)
        ) as BookingDoc["guest"],
        price: { ...input.price },
        status: "confirmed",
        createdAt: new Date().toISOString(),
        emailKey: normaliseEmail(input.guest.email),
      };
      tx.create(bookingRef, booking);
      return toDTO(booking);
    });
  }

  async getByReference(
    reference: string,
    email: string
  ): Promise<BookingDTO | null> {
    const snap = await this.bookingRef(reference).get();
    if (!snap.exists) return null;
    const booking = snap.data() as BookingDoc;
    return emailsMatch(booking.emailKey, normaliseEmail(email))
      ? toDTO(booking)
      : null;
  }

  async cancelBooking(
    reference: string,
    email: string,
    now: Date = new Date()
  ): Promise<BookingDTO | null> {
    const bookingRef = this.bookingRef(reference);

    return this.db.runTransaction(async (tx) => {
      const bookingSnap = await tx.get(bookingRef);
      if (!bookingSnap.exists) return null;
      const booking = bookingSnap.data() as BookingDoc;
      if (!emailsMatch(booking.emailKey, normaliseEmail(email))) return null;
      if (booking.status === "cancelled") return toDTO(booking);

      const nights = nightsOf(booking);
      const inventoryRefs = nights.map((date) =>
        this.inventoryRef(booking.roomId, date)
      );
      const inventorySnaps = await tx.getAll(...inventoryRefs);

      inventoryRefs.forEach((ref, i) => {
        const booked = (inventorySnaps[i].data() as InventoryDoc | undefined)
          ?.booked;
        tx.set(ref, {
          roomId: booking.roomId,
          date: nights[i],
          booked: Math.max(0, (booked ?? 0) - 1),
        } satisfies InventoryDoc);
      });

      const cancelledAt = now.toISOString();
      tx.update(bookingRef, { status: "cancelled", cancelledAt });
      return toDTO({ ...booking, status: "cancelled", cancelledAt });
    });
  }
}
