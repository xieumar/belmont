import { rooms as defaultRooms } from "@/data/rooms";
import { staysOverlap } from "./dates";
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

interface StoredBooking extends BookingDTO {
  /** Internal: normalised email used for lookups. */
  emailKey: string;
}

interface RoomInventory {
  id: string;
  units: number;
}

const normaliseEmail = (email: string) => email.trim().toLowerCase();

export class MemoryBookingStore implements BookingStore {
  private readonly bookings = new Map<string, StoredBooking>();

  constructor(private readonly rooms: RoomInventory[] = defaultRooms) {}

  private toDTO({ emailKey: _emailKey, ...dto }: StoredBooking): BookingDTO {
    return structuredClone(dto);
  }

  private countOverlapping(roomId: string, stay: StayDates): number {
    let count = 0;
    for (const b of this.bookings.values()) {
      if (
        b.roomId === roomId &&
        b.status === "confirmed" &&
        staysOverlap(b, stay)
      ) {
        count++;
      }
    }
    return count;
  }

  async getAvailability(stay: StayDates): Promise<Availability> {
    const result: Availability = {};
    for (const room of this.rooms) {
      result[room.id] = Math.max(
        0,
        room.units - this.countOverlapping(room.id, stay)
      );
    }
    return result;
  }

  async createBooking(input: CreateBookingInput): Promise<BookingDTO> {
    const room = this.rooms.find((r) => r.id === input.roomId);
    if (!room) throw new UnknownRoomError(input.roomId);
    if (this.countOverlapping(room.id, input.stay) >= room.units) {
      throw new UnavailableError(room.id);
    }

    let reference = generateReference();
    while (this.bookings.has(reference)) reference = generateReference();

    const booking: StoredBooking = {
      reference,
      roomId: input.roomId,
      checkIn: input.stay.checkIn,
      checkOut: input.stay.checkOut,
      adults: input.guests.adults,
      children: input.guests.children,
      guest: { ...input.guest },
      price: { ...input.price },
      status: "confirmed",
      createdAt: new Date().toISOString(),
      emailKey: normaliseEmail(input.guest.email),
    };
    this.bookings.set(reference, booking);
    return this.toDTO(booking);
  }

  private find(reference: string, email: string): StoredBooking | null {
    const booking = this.bookings.get(reference.trim().toUpperCase());
    return booking && booking.emailKey === normaliseEmail(email)
      ? booking
      : null;
  }

  async getByReference(
    reference: string,
    email: string
  ): Promise<BookingDTO | null> {
    const booking = this.find(reference, email);
    return booking ? this.toDTO(booking) : null;
  }

  async cancelBooking(
    reference: string,
    email: string,
    now: Date = new Date()
  ): Promise<BookingDTO | null> {
    const booking = this.find(reference, email);
    if (!booking) return null;
    if (booking.status !== "cancelled") {
      booking.status = "cancelled";
      booking.cancelledAt = now.toISOString();
    }
    return this.toDTO(booking);
  }
}
