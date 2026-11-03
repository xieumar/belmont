import { hotel } from "@/data/hotel";
import type { BookingStatus, DateString } from "./types";

const HOUR_MS = 3_600_000;

/** Offset (ms) of `timeZone` from UTC at the given instant. */
function zoneOffset(instant: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).formatToParts(new Date(instant));
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);
  const wallAsUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute")
  );
  return wallAsUtc - Math.floor(instant / 60_000) * 60_000;
}

/** UTC instant for a wall-clock time (`YYYY-MM-DD` + `HH:mm`) in a time zone. */
export function zonedTimeToUtc(
  date: DateString,
  time: string,
  timeZone: string
): Date {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  // Apply the offset twice so times near a DST change resolve correctly.
  const first = wall - zoneOffset(wall, timeZone);
  return new Date(wall - zoneOffset(first, timeZone));
}

export type CancellationDecision =
  | { allowed: true; alreadyCancelled?: boolean }
  | { allowed: false; reason: "too-late" };

/** Whether a booking may still be cancelled online at `now`. */
export function canCancel(
  booking: { status: BookingStatus; checkIn: DateString },
  now: Date = new Date()
): CancellationDecision {
  if (booking.status === "cancelled") {
    return { allowed: true, alreadyCancelled: true };
  }
  const checkInAt = zonedTimeToUtc(
    booking.checkIn,
    hotel.checkInTime,
    hotel.timeZone
  );
  const cutoff = checkInAt.getTime() - hotel.freeCancellationHours * HOUR_MS;
  return now.getTime() <= cutoff
    ? { allowed: true }
    : { allowed: false, reason: "too-late" };
}
