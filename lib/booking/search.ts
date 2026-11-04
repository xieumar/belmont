import { hotel } from "@/data/hotel";
import { hotelToday, validateStayDates, type StayDatesError } from "./dates";
import { searchSchema } from "./schema";
import type { GuestCount, StayDates } from "./types";

export type RawSearchParams = Record<string, string | string[] | undefined>;

/** What the rooms page knows about the visitor's search. */
export type SearchState =
  | { status: "none" }
  | { status: "invalid"; error: string }
  | { status: "ok"; stay: StayDates; guests: GuestCount };

export const STAY_DATES_MESSAGES: Record<StayDatesError, string> = {
  "invalid-date": "Choose a check-in and check-out date.",
  "checkout-not-after-checkin": "Check-out must be after check-in.",
  "in-the-past": "Check-in can't be in the past.",
  "stay-too-long": `Stays are limited to ${hotel.maxStayNights} nights.`,
  "too-far-ahead": `We take bookings up to ${hotel.maxAdvanceDays} days ahead.`,
};

const SEARCH_KEYS = ["checkIn", "checkOut", "adults", "children"] as const;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/**
 * Turns untrusted URL params into a search state. Never throws: anything
 * missing, malformed or out of range becomes `invalid`.
 */
export function parseSearch(
  raw: RawSearchParams,
  today: string = hotelToday()
): SearchState {
  const params = Object.fromEntries(
    SEARCH_KEYS.map((key) => [key, first(raw[key])])
  );
  if (SEARCH_KEYS.every((key) => params[key] === undefined)) {
    return { status: "none" };
  }

  const parsed = searchSchema.safeParse(params);
  if (!parsed.success) {
    return {
      status: "invalid",
      error: "Those search details aren't valid. Choose your dates and guests.",
    };
  }

  const { checkIn, checkOut, adults, children } = parsed.data;
  const problem = validateStayDates({ checkIn, checkOut }, today);
  if (problem) {
    return { status: "invalid", error: STAY_DATES_MESSAGES[problem] };
  }
  return {
    status: "ok",
    stay: { checkIn, checkOut },
    guests: { adults, children },
  };
}
