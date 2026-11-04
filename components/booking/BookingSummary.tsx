import Image from "next/image";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { hotel } from "@/data/hotel";
import type { Room } from "@/data/rooms";
import { formatStayRange, pluralise } from "@/lib/booking/format";
import type {
  GuestCount,
  PriceBreakdown as Price,
  StayDates,
} from "@/lib/booking/types";

interface BookingSummaryProps {
  room: Room;
  stay: StayDates;
  guests: GuestCount;
  price: Price;
}

export function BookingSummary({
  room,
  stay,
  guests,
  price,
}: BookingSummaryProps) {
  const guestText = [
    pluralise(guests.adults, "adult"),
    guests.children > 0
      ? pluralise(guests.children, "child", "children")
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <aside
      aria-label="Booking summary"
      className="overflow-hidden rounded-3xl bg-[#F8F6F3]"
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={room.primaryImage}
          alt={room.name}
          fill
          sizes="(max-width: 1024px) 100vw, 384px"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="font-serif text-2xl font-medium text-neutral-900">
          {room.name}
        </h2>
        <dl className="mt-4 space-y-2 text-sm text-neutral-700">
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">Dates</dt>
            <dd className="text-right font-medium">
              {formatStayRange(stay.checkIn, stay.checkOut)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">Guests</dt>
            <dd className="text-right font-medium">{guestText}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">Check-in / check-out</dt>
            <dd className="text-right font-medium">
              {hotel.checkInTime} / {hotel.checkOutTime}
            </dd>
          </div>
        </dl>

        <PriceBreakdown
          price={price}
          className="mt-5 border-t border-neutral-200 pt-4"
        />

        <p className="mt-5 text-xs leading-relaxed text-neutral-500">
          Pay at the hotel. No payment is taken now. Free cancellation until{" "}
          {hotel.freeCancellationHours} hours before check-in.
        </p>
      </div>
    </aside>
  );
}
