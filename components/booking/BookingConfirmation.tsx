import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { CancelBookingDialog } from "@/components/booking/CancelBookingDialog";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { buttonVariants } from "@/components/ui/button";
import { hotel } from "@/data/hotel";
import type { Room } from "@/data/rooms";
import { nightsBetween } from "@/lib/booking/dates";
import { formatDate, pluralise } from "@/lib/booking/format";
import type { CancellationDecision } from "@/lib/booking/policy";
import type { BookingDTO } from "@/lib/booking/store";

interface BookingConfirmationProps {
  booking: BookingDTO;
  /** Undefined if the room has since been removed from the catalogue. */
  room?: Room;
  /** Whether the guest may still cancel online; decided on the server. */
  cancellation: CancellationDecision;
}

const longDate = (date: string) =>
  formatDate(date, {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-6 py-2 text-sm">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right font-medium text-neutral-900">{children}</dd>
    </div>
  );
}

export function BookingConfirmation({
  booking,
  room,
  cancellation,
}: BookingConfirmationProps) {
  const cancelled = booking.status === "cancelled";
  const nights = nightsBetween(booking.checkIn, booking.checkOut);
  const guestText = [
    pluralise(booking.adults, "adult"),
    booking.children > 0
      ? pluralise(booking.children, "child", "children")
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 md:py-16">
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-[#A98E67]">
        {cancelled ? "Booking cancelled" : "Booking confirmed"}
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium text-neutral-900 sm:text-4xl">
        {cancelled
          ? "This booking has been cancelled"
          : `Thank you, ${booking.guest.name.split(" ")[0]}`}
      </h1>
      <p className="mt-3 text-neutral-600">
        Keep your reference safe. You&apos;ll need it, with the email you booked
        with, to find this booking again.
      </p>

      <div className="mt-8 rounded-3xl bg-[#F8F6F3] p-6 text-center sm:p-8">
        <p className="text-sm text-neutral-500">Booking reference</p>
        <p className="mt-1 font-mono text-3xl font-semibold tracking-widest text-neutral-900 sm:text-4xl">
          {booking.reference}
        </p>
      </div>

      <section className="mt-10 overflow-hidden rounded-3xl border border-neutral-200">
        {room ? (
          <div className="relative aspect-[16/7] w-full print:hidden">
            <Image
              src={room.primaryImage}
              alt={room.name}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-medium text-neutral-900">
            {room?.name ?? "Your room"}
          </h2>
          <dl className="mt-4 divide-y divide-neutral-100">
            <Row label="Check-in">
              {longDate(booking.checkIn)} from {hotel.checkInTime}
            </Row>
            <Row label="Check-out">
              {longDate(booking.checkOut)} by {hotel.checkOutTime}
            </Row>
            <Row label="Length of stay">{pluralise(nights, "night")}</Row>
            <Row label="Guests">{guestText}</Row>
          </dl>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-neutral-200 p-6 sm:p-8">
        <h2 className="font-serif text-xl font-medium text-neutral-900">
          Guest details
        </h2>
        <dl className="mt-3 divide-y divide-neutral-100">
          <Row label="Name">{booking.guest.name}</Row>
          <Row label="Email">{booking.guest.email}</Row>
          <Row label="Phone">{booking.guest.phone}</Row>
          {booking.guest.specialRequests ? (
            <Row label="Special requests">{booking.guest.specialRequests}</Row>
          ) : null}
        </dl>
      </section>

      <section className="mt-6 rounded-3xl border border-neutral-200 p-6 sm:p-8">
        <h2 className="font-serif text-xl font-medium text-neutral-900">
          Price
        </h2>
        <PriceBreakdown price={booking.price} className="mt-3" />
        <p className="mt-4 text-sm text-neutral-500">
          Pay at the hotel. No payment has been taken.
        </p>
      </section>

      <section className="mt-6 rounded-3xl bg-[#F8F6F3] p-6 text-sm leading-relaxed text-neutral-600 sm:p-8">
        <h2 className="font-serif text-xl font-medium text-neutral-900">
          Cancellation policy
        </h2>
        <p className="mt-2">
          Free cancellation until {hotel.freeCancellationHours} hours before
          check-in ({hotel.checkInTime} on {formatDate(booking.checkIn)}). After
          that, please contact the hotel.
        </p>
        {!cancelled && !cancellation.allowed ? (
          <p className="mt-2 font-medium text-neutral-900">
            The free cancellation period for this booking has ended. Please
            contact the hotel to change or cancel it.
          </p>
        ) : null}
        <p className="mt-2">
          See our{" "}
          <Link href="/terms" className="underline underline-offset-4">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <a
          href={`/booking/${booking.reference}/pdf`}
          download
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <Download aria-hidden="true" />
          Download PDF
        </a>
        {!cancelled && cancellation.allowed ? (
          <CancelBookingDialog reference={booking.reference} />
        ) : null}
        <Link
          href="/rooms"
          className={buttonVariants({ variant: "ghost", size: "lg" })}
        >
          Back to rooms
        </Link>
      </div>
    </div>
  );
}
