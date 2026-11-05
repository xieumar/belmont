import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking/BookingForm";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { buttonVariants } from "@/components/ui/button";
import { rooms } from "@/data/rooms";
import { checkCapacity } from "@/lib/booking/capacity";
import { nightsBetween } from "@/lib/booking/dates";
import { getStore } from "@/lib/booking/get-store";
import { calculatePrice } from "@/lib/booking/pricing";
import { parseSearch } from "@/lib/booking/search";

export const metadata: Metadata = {
  title: "Complete your booking | Belmont Hotel",
  robots: { index: false },
};

type Params = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

function Problem({ message }: { message: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <h1 className="font-serif text-3xl font-medium text-neutral-900">
        We can&apos;t start this booking
      </h1>
      <p className="mt-4 text-neutral-600">{message}</p>
      <Link
        href="/rooms"
        className={buttonVariants({ size: "lg", className: "mt-8 px-8" })}
      >
        Choose a room
      </Link>
    </div>
  );
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const room = rooms.find((candidate) => candidate.id === first(params.room));
  const search = parseSearch(params);

  if (!room || search.status === "none") {
    return <Problem message="Choose a room and your dates to continue." />;
  }
  if (search.status === "invalid") {
    return <Problem message={search.error} />;
  }

  const { stay, guests } = search;
  if (checkCapacity(room, guests)) {
    return (
      <Problem
        message={`The ${room.name} can't hold that many guests. It sleeps up to ${room.maxGuests}.`}
      />
    );
  }

  // Catch an already-taken room before asking for details. The booking itself
  // is still checked atomically on submit; if this lookup fails we carry on.
  let taken = false;
  try {
    const availability = await getStore().getAvailability(stay);
    taken = (availability[room.id] ?? 0) < 1;
  } catch (error) {
    console.error("Failed to check availability for checkout", error);
  }
  if (taken) {
    return (
      <Problem
        message={`The ${room.name} is no longer available for these dates. Please choose different dates or another room.`}
      />
    );
  }

  const price = calculatePrice(
    room.nightlyRate,
    nightsBetween(stay.checkIn, stay.checkOut)
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 md:py-16">
      <h1 className="font-serif text-3xl font-medium text-neutral-900 sm:text-4xl">
        Complete your booking
      </h1>
      <p className="mt-2 text-neutral-600">
        Enter your details to confirm. You&apos;ll pay at the hotel.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
        <div className="order-2 lg:order-1">
          <BookingForm
            initialValues={{
              roomId: room.id,
              checkIn: stay.checkIn,
              checkOut: stay.checkOut,
              adults: String(guests.adults),
              children: String(guests.children),
              name: "",
              email: "",
              phone: "",
              specialRequests: "",
            }}
          />
        </div>
        <div className="order-1 lg:order-2">
          <BookingSummary
            room={room}
            stay={stay}
            guests={guests}
            price={price}
          />
        </div>
      </div>
    </div>
  );
}
