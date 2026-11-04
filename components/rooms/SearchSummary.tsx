import Link from "next/link";
import { formatStayRange, pluralise } from "@/lib/booking/format";
import { nightsBetween } from "@/lib/booking/dates";
import type { GuestCount, StayDates } from "@/lib/booking/types";

interface SearchSummaryProps {
  stay: StayDates;
  guests: GuestCount;
}

/** Tells the visitor which search the cards below are showing. */
export function SearchSummary({ stay, guests }: SearchSummaryProps) {
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const guestText = [
    pluralise(guests.adults, "adult"),
    guests.children > 0
      ? pluralise(guests.children, "child", "children")
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      role="status"
      className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#A98E67]/40 bg-[#F8F6F3] px-5 py-4"
    >
      <p className="font-sans text-sm text-neutral-700 sm:text-base">
        <span className="font-semibold text-neutral-900">
          {formatStayRange(stay.checkIn, stay.checkOut)}
        </span>{" "}
        · {pluralise(nights, "night")} · {guestText}
      </p>
      <Link
        href="/rooms"
        className="text-sm font-medium text-[#917955] underline-offset-4 hover:underline"
      >
        Clear search
      </Link>
    </div>
  );
}
