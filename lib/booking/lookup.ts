import { z } from "zod";
import { lookupSchema } from "./schema";
import type { BookingDTO, BookingStore } from "./store";

/** Raw, untrusted values as submitted by the manage-booking form. */
export interface LookupValues {
  reference: string;
  email: string;
}

export type LookupField = keyof LookupValues;
export type LookupFieldErrors = Partial<Record<LookupField, string>>;

/** What the lookup form renders: the values to keep and any errors. */
export interface LookupState {
  values: LookupValues;
  fieldErrors: LookupFieldErrors;
  formError?: string;
}

export type LookupResult =
  | { ok: true; booking: BookingDTO }
  | { ok: false; fieldErrors: LookupFieldErrors; formError?: string };

/**
 * Shown for an unknown reference and for a wrong email alike, so the form
 * cannot be used to find out which references exist.
 */
export const NOT_FOUND_MESSAGE =
  "We couldn't find a booking with that reference and email. Check both and try again.";
export const LOOKUP_FAILED_MESSAGE =
  "We couldn't look up your booking right now. Please try again in a moment.";

/** Validates a lookup and fetches the booking. Never throws. */
export async function lookupBooking(
  store: BookingStore,
  values: LookupValues
): Promise<LookupResult> {
  const parsed = lookupSchema.safeParse(values);
  if (!parsed.success) {
    // Format problems say nothing about which bookings exist, so they can be
    // specific. Only "no match" has to stay generic.
    const flat = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: LookupFieldErrors = {};
    if (flat.reference?.[0]) fieldErrors.reference = flat.reference[0];
    if (flat.email?.[0]) fieldErrors.email = flat.email[0];
    return { ok: false, fieldErrors };
  }

  try {
    const booking = await store.getByReference(
      parsed.data.reference,
      parsed.data.email
    );
    if (!booking) {
      return { ok: false, fieldErrors: {}, formError: NOT_FOUND_MESSAGE };
    }
    return { ok: true, booking };
  } catch (error) {
    console.error("Failed to look up booking", error);
    return { ok: false, fieldErrors: {}, formError: LOOKUP_FAILED_MESSAGE };
  }
}
