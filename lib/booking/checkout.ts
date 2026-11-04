import { z } from "zod";
import { rooms } from "@/data/rooms";
import { checkCapacity } from "./capacity";
import { nightsBetween, validateStayDates } from "./dates";
import { calculatePrice } from "./pricing";
import { guestDetailsSchema, searchSchema } from "./schema";
import { STAY_DATES_MESSAGES } from "./search";
import {
  UnavailableError,
  UnknownRoomError,
  type BookingDTO,
  type BookingStore,
} from "./store";

/** Raw, untrusted values as submitted by the checkout form. */
export interface CheckoutValues {
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export type CheckoutField = "name" | "email" | "phone" | "specialRequests";
export type CheckoutFieldErrors = Partial<Record<CheckoutField, string>>;

/** What the checkout form renders: the values to keep and any errors. */
export interface CheckoutState {
  values: CheckoutValues;
  fieldErrors: CheckoutFieldErrors;
  /** An error not tied to one field, e.g. the room was just booked. */
  formError?: string;
}

export type CheckoutResult =
  | { ok: true; booking: BookingDTO }
  | { ok: false; fieldErrors: CheckoutFieldErrors; formError?: string };

const INVALID_DETAILS =
  "Your booking details are no longer valid. Please choose your room and dates again.";
const UNAVAILABLE =
  "Sorry, that room has just been booked for these dates. Please choose different dates or another room.";
const FAILED =
  "We couldn't complete your booking right now. Please try again in a moment.";

const fail = (
  formError: string,
  fieldErrors: CheckoutFieldErrors = {}
): CheckoutResult => ({ ok: false, fieldErrors, formError });

const FIELDS: CheckoutField[] = ["name", "email", "phone", "specialRequests"];

function fieldErrorsFrom(error: z.ZodError): CheckoutFieldErrors {
  const flat = z.flattenError(error).fieldErrors as Record<string, string[]>;
  const result: CheckoutFieldErrors = {};
  for (const field of FIELDS) {
    const message = flat[field]?.[0];
    if (message) result[field] = message;
  }
  return result;
}

/**
 * Validates a checkout submission and creates the booking. Everything the
 * client sends is untrusted: the price is recomputed here from the room's rate
 * and the stay, and the room, dates and capacity are checked again.
 * Never throws: failures come back as field or form errors.
 */
export async function submitCheckout(
  store: BookingStore,
  values: CheckoutValues,
  today?: string
): Promise<CheckoutResult> {
  const guest = guestDetailsSchema.safeParse({
    name: values.name,
    email: values.email,
    phone: values.phone,
    specialRequests: values.specialRequests || undefined,
  });
  const fieldErrors = guest.success ? {} : fieldErrorsFrom(guest.error);

  const room = rooms.find((candidate) => candidate.id === values.roomId);
  const search = searchSchema.safeParse(values);
  if (!room || !search.success) return fail(INVALID_DETAILS, fieldErrors);

  const { checkIn, checkOut, adults, children } = search.data;
  const stay = { checkIn, checkOut };
  const datesProblem = validateStayDates(stay, today);
  if (datesProblem) {
    return fail(STAY_DATES_MESSAGES[datesProblem], fieldErrors);
  }
  if (checkCapacity(room, { adults, children })) {
    return fail("This room can't hold that many guests.", fieldErrors);
  }
  if (!guest.success) return { ok: false, fieldErrors };

  try {
    const booking = await store.createBooking({
      roomId: room.id,
      stay,
      guests: { adults, children },
      guest: guest.data,
      price: calculatePrice(room.nightlyRate, nightsBetween(checkIn, checkOut)),
    });
    return { ok: true, booking };
  } catch (error) {
    if (error instanceof UnavailableError) return fail(UNAVAILABLE);
    if (error instanceof UnknownRoomError) return fail(INVALID_DETAILS);
    console.error("Failed to create booking", error);
    return fail(FAILED);
  }
}
