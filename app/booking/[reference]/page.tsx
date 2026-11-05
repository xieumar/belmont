import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { buttonVariants } from "@/components/ui/button";
import { getRoomById } from "@/data/rooms";
import { bookingAccessCookieName } from "@/lib/booking/access";
import { getStore } from "@/lib/booking/get-store";
import { canCancel } from "@/lib/booking/policy";
import { REFERENCE_PATTERN } from "@/lib/booking/reference";
import type { BookingDTO } from "@/lib/booking/store";

export const metadata: Metadata = {
  title: "Your booking | Belmont Hotel",
  robots: { index: false },
};

function Notice({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <h1 className="font-serif text-3xl font-medium text-neutral-900">
        {title}
      </h1>
      <p className="mt-4 text-neutral-600">{message}</p>
      <Link
        href="/rooms"
        className={buttonVariants({ size: "lg", className: "mt-8 px-8" })}
      >
        Browse rooms
      </Link>
    </div>
  );
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const reference = (await params).reference.toUpperCase();
  if (!REFERENCE_PATTERN.test(reference)) notFound();

  // Guest details are only shown to the browser that just made the booking.
  // The cookie holds the booking email; the store checks it like any lookup.
  const email = (await cookies()).get(
    bookingAccessCookieName(reference)
  )?.value;

  let booking: BookingDTO | null = null;
  let failed = false;
  if (email) {
    try {
      booking = await getStore().getByReference(reference, email);
    } catch (error) {
      console.error("Failed to load booking", error);
      failed = true;
    }
  }

  if (failed) {
    return (
      <Notice
        title="We couldn't load your booking"
        message="Something went wrong on our side. Please refresh the page in a moment. Your booking has not been lost."
      />
    );
  }
  if (!booking) {
    return (
      <Notice
        title="This booking isn't available here"
        message="For your privacy, booking details are only shown for 30 minutes after booking, on the device used to book. To discuss a booking, contact the hotel with your reference."
      />
    );
  }

  return (
    <BookingConfirmation
      booking={booking}
      room={getRoomById(booking.roomId)}
      cancellation={canCancel(booking)}
    />
  );
}
