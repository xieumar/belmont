import type {
  BookingStatus,
  DateString,
  GuestCount,
  GuestDetails,
  PriceBreakdown,
  StayDates,
} from "./types";

/** What callers receive. Never exposes internal fields. */
export interface BookingDTO {
  reference: string;
  roomId: string;
  checkIn: DateString;
  checkOut: DateString;
  adults: number;
  children: number;
  guest: GuestDetails;
  price: PriceBreakdown;
  status: BookingStatus;
  createdAt: string;
  cancelledAt?: string;
}

export interface CreateBookingInput {
  roomId: string;
  stay: StayDates;
  guests: GuestCount;
  guest: GuestDetails;
  /** Computed server-side; never taken from the client. */
  price: PriceBreakdown;
}

/** Units still free per room id for the requested stay. */
export type Availability = Record<string, number>;

export class UnavailableError extends Error {
  constructor(public readonly roomId: string) {
    super(`Room ${roomId} is not available for the selected dates`);
    this.name = "UnavailableError";
  }
}

export class UnknownRoomError extends Error {
  constructor(public readonly roomId: string) {
    super(`Unknown room ${roomId}`);
    this.name = "UnknownRoomError";
  }
}

export interface BookingStore {
  getAvailability(stay: StayDates): Promise<Availability>;
  /** Throws `UnavailableError` if no unit is free for the whole stay. */
  createBooking(input: CreateBookingInput): Promise<BookingDTO>;
  /**
   * Returns null for an unknown reference and for a wrong email alike, so
   * callers cannot tell the two apart.
   */
  getByReference(reference: string, email: string): Promise<BookingDTO | null>;
  /**
   * Idempotent: cancelling a cancelled booking returns it unchanged.
   * Returns null under the same rules as `getByReference`. Policy checks
   * (see `canCancel`) are the caller's job.
   */
  cancelBooking(
    reference: string,
    email: string,
    now?: Date
  ): Promise<BookingDTO | null>;
}
