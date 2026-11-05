import type { DateString } from "./types";

/** Formats a `YYYY-MM-DD` string for display, independent of the viewer's time zone. */
export function formatDate(
  date: DateString,
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
): string {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

/** "Mar 10 - Mar 13, 2027" */
export function formatStayRange(checkIn: DateString, checkOut: DateString) {
  return `${formatDate(checkIn)} – ${formatDate(checkOut, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

export const pluralise = (count: number, singular: string, plural?: string) =>
  `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
