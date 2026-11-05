"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  BOOKING_ACCESS_MAX_AGE_SECONDS,
  bookingAccessCookieName,
} from "@/lib/booking/access";
import {
  submitCheckout,
  type CheckoutState,
  type CheckoutValues,
} from "@/lib/booking/checkout";
import { getStore } from "@/lib/booking/get-store";

const KEYS: (keyof CheckoutValues)[] = [
  "roomId",
  "checkIn",
  "checkOut",
  "adults",
  "children",
  "name",
  "email",
  "phone",
  "specialRequests",
];

function readValues(formData: FormData): CheckoutValues {
  return Object.fromEntries(
    KEYS.map((key) => {
      const value = formData.get(key);
      return [key, typeof value === "string" ? value : ""];
    })
  ) as unknown as CheckoutValues;
}

export async function createBookingAction(
  _previous: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const values = readValues(formData);

  let store;
  try {
    store = getStore();
  } catch (error) {
    console.error("Booking store is not available", error);
    return {
      values,
      fieldErrors: {},
      formError:
        "We couldn't complete your booking right now. Please try again in a moment.",
    };
  }

  const result = await submitCheckout(store, values);
  if (!result.ok) {
    return {
      values,
      fieldErrors: result.fieldErrors,
      formError: result.formError,
    };
  }

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
