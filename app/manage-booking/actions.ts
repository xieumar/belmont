"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  BOOKING_ACCESS_MAX_AGE_SECONDS,
  bookingAccessCookieName,
} from "@/lib/booking/access";
import { getStore } from "@/lib/booking/get-store";
import {
  LOOKUP_FAILED_MESSAGE,
  lookupBooking,
  type LookupState,
  type LookupValues,
} from "@/lib/booking/lookup";

function readValues(formData: FormData): LookupValues {
  const read = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  return { reference: read("reference"), email: read("email") };
}

export async function lookupBookingAction(
  _previous: LookupState,
  formData: FormData
): Promise<LookupState> {
  const values = readValues(formData);

  let store;
  try {
    store = getStore();
  } catch (error) {
    console.error("Booking store is not available", error);
    return { values, fieldErrors: {}, formError: LOOKUP_FAILED_MESSAGE };
  }

  const result = await lookupBooking(store, values);
  if (!result.ok) {
    return {
      values,
      fieldErrors: result.fieldErrors,
      formError: result.formError,
    };
  }

  // The booking page reads this cookie, so a successful lookup shows the
  // same details view as right after booking.
  const { reference, guest } = result.booking;
  (await cookies()).set(bookingAccessCookieName(reference), guest.email, {
    maxAge: BOOKING_ACCESS_MAX_AGE_SECONDS,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  // Outside any try/catch: redirect() works by throwing.
  redirect(`/booking/${reference}`);
}
