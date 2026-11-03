import { hotel } from "@/data/hotel";
import type { DateString, StayDates } from "./types";

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

/** Parses a `YYYY-MM-DD` string to a UTC day number, or null if invalid. */
function toDayNumber(date: DateString): number | null {
  const match = DATE_RE.exec(date);
  if (!match) return null;
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const ms = Date.UTC(y, m - 1, d);
  const parsed = new Date(ms);
  if (
    parsed.getUTCFullYear() !== y ||
    parsed.getUTCMonth() !== m - 1 ||
    parsed.getUTCDate() !== d
  ) {
    return null;
  }
  return ms / MS_PER_DAY;
}

export function isValidDateString(date: string): boolean {
  return toDayNumber(date) !== null;
}

/** Number of nights between two valid dates (negative if out is before in). */
export function nightsBetween(checkIn: DateString, checkOut: DateString) {
  const a = toDayNumber(checkIn);
  const b = toDayNumber(checkOut);
  if (a === null || b === null) throw new Error("Invalid date");
  return b - a;
}

export function addDays(date: DateString, days: number): DateString {
  const n = toDayNumber(date);
  if (n === null) throw new Error("Invalid date");
  return new Date((n + days) * MS_PER_DAY).toISOString().slice(0, 10);
}

/**
 * Half-open overlap on `[checkIn, checkOut)`. Same-day turnover
 * (one stay's check-out equals the next one's check-in) does not overlap.
 */
export function staysOverlap(a: StayDates, b: StayDates): boolean {
  return a.checkIn < b.checkOut && b.checkIn < a.checkOut;
}

/** Today's date in the hotel's time zone. */
export function hotelToday(
  now: Date = new Date(),
  timeZone: string = hotel.timeZone
): DateString {
  // The en-CA locale formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export type StayDatesError =
  | "invalid-date"
  | "checkout-not-after-checkin"
  | "in-the-past"
  | "stay-too-long"
  | "too-far-ahead";

export function validateStayDates(
  { checkIn, checkOut }: StayDates,
  today: DateString = hotelToday()
): StayDatesError | null {
  if (!isValidDateString(checkIn) || !isValidDateString(checkOut)) {
    return "invalid-date";
  }
  if (checkIn < today) return "in-the-past";
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1) return "checkout-not-after-checkin";
  if (nights > hotel.maxStayNights) return "stay-too-long";
  if (nightsBetween(today, checkIn) > hotel.maxAdvanceDays) {
    return "too-far-ahead";
  }
  return null;
}
