"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { bookingAccessCookieName } from "@/lib/booking/access";
import {
  CANCEL_FAILED_MESSAGE,
  CANCEL_NOT_FOUND_MESSAGE,
  cancelBookingFor,
} from "@/lib/booking/cancel";
import { getStore } from "@/lib/booking/get-store";
import { REFERENCE_PATTERN } from "@/lib/booking/reference";

export interface CancelState {
  error?: string;
}

export async function cancelBookingAction(
  _previous: CancelState,
  formData: FormData
): Promise<CancelState> {
  const raw = formData.get("reference");
  const reference = typeof raw === "string" ? raw.trim().toUpperCase() : "";
  if (!REFERENCE_PATTERN.test(reference)) {
    return { error: CANCEL_NOT_FOUND_MESSAGE };
  }

  // The guest proves ownership with the cookie set by checkout or lookup.
  // The email is never taken from the form.
  const email = (await cookies()).get(
    bookingAccessCookieName(reference)
  )?.value;
  if (!email) return { error: CANCEL_NOT_FOUND_MESSAGE };

  let store;
  try {
    store = getStore();
  } catch (error) {
    console.error("Booking store is not available", error);
    return { error: CANCEL_FAILED_MESSAGE };
  }

  const result = await cancelBookingFor(store, reference, email);
  if (!result.ok) return { error: result.message };

  revalidatePath(`/booking/${reference}`);
  return {};
}
