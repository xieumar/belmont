import { hotel } from "@/data/hotel";
import { canCancel } from "./policy";
import type { BookingDTO, BookingStore } from "./store";

export type CancelResult =
  | { ok: true; booking: BookingDTO }
  | { ok: false; reason: "not-found" | "too-late" | "failed"; message: string };

export const CANCEL_NOT_FOUND_MESSAGE =
  "We couldn't find this booking. Look it up again with your reference and email.";
export const CANCEL_TOO_LATE_MESSAGE = `Free cancellation ended ${hotel.freeCancellationHours} hours before check-in. Please contact the hotel to change or cancel this booking.`;
export const CANCEL_FAILED_MESSAGE =
  "We couldn't cancel your booking right now. Please try again in a moment.";

/**
 * Cancels a booking if the guest proves ownership (reference + email) and the
 * cancellation policy still allows it. Idempotent: an already-cancelled
 * booking comes back unchanged. Never throws.
 */
export async function cancelBookingFor(
  store: BookingStore,
  reference: string,
  email: string,
  now: Date = new Date()
): Promise<CancelResult> {
  const notFound: CancelResult = {
    ok: false,
    reason: "not-found",
    message: CANCEL_NOT_FOUND_MESSAGE,
  };

  try {
    const booking = await store.getByReference(reference, email);
    if (!booking) return notFound;

    const decision = canCancel(booking, now);
    if (!decision.allowed) {
      return {
        ok: false,
        reason: "too-late",
        message: CANCEL_TOO_LATE_MESSAGE,
      };
    }

    const cancelled = await store.cancelBooking(reference, email, now);
    return cancelled ? { ok: true, booking: cancelled } : notFound;
  } catch (error) {
    console.error("Failed to cancel booking", error);
    return { ok: false, reason: "failed", message: CANCEL_FAILED_MESSAGE };
  }
}
