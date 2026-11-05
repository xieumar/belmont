import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";
import { AvailabilitySearch } from "@/components/booking/AvailabilitySearch";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { Room } from "@/data/rooms";
import { buttonVariants } from "@/components/ui/button";
import type { RoomsSearch } from "@/lib/booking/load-search";
import { roomStayState } from "@/lib/booking/room-search";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Anchor the search form scrolls to once the room's result is ready. */
const BOOKING_CARD_ID = "room-booking";

interface RoomDetailHeroProps {
  room: Room;
  /** The visitor's search, if any. Without it only the picker is shown. */
  roomsSearch?: RoomsSearch;
}

/** What to tell the visitor when there is no bookable result to show. */
function bookingMessage(room: Room, roomsSearch?: RoomsSearch) {
  const search = roomsSearch?.search;
  if (!search || search.status === "none") {
    return "Choose your dates to see the total and book this room.";
  }
  if (search.status === "invalid") return search.error;
  if (roomsSearch?.availabilityError) {
    return "We couldn't check availability right now. Please try again in a moment.";
  }
  return `This room sleeps up to ${room.maxGuests} guests.`;
}

export function RoomDetailHero({ room, roomsSearch }: RoomDetailHeroProps) {
  const stay = roomsSearch
    ? roomStayState(room, roomsSearch.search, roomsSearch.availability)
    : ({ kind: "default" } as const);
  const search = roomsSearch?.search;

  return (
    <section className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <Image
          src={room.primaryImage}
          alt={room.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-neutral-900/60" />
      </div>

      <div className="relative z-10 w-full px-6 py-24 sm:px-8">
        <StaggerContainer delay={0} className="mx-auto max-w-7xl">
          {/* Back Button */}
          <StaggerItem className="mb-12">
            <Link
              href="/rooms"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Rooms
            </Link>
          </StaggerItem>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl text-white">
              <StaggerItem>
                <p className="mb-4 font-sans text-sm font-bold uppercase tracking-[0.2em] text-terra-400 drop-shadow-md">
                  Accommodations
                </p>
              </StaggerItem>

              <h1 className="mb-6 font-serif text-5xl font-medium leading-[1.1] tracking-tight sm:text-6xl md:text-7xl">
                <StaggerItem className="block">{room.name}</StaggerItem>
              </h1>

              <StaggerItem>
                <p className="font-sans text-lg leading-relaxed text-neutral-300 sm:text-xl">
                  {room.shortDescription}
                </p>
              </StaggerItem>
            </div>

            <StaggerItem className="w-full flex-shrink-0 lg:w-[26rem]">
              <div
                id={BOOKING_CARD_ID}
                className="flex scroll-mt-24 flex-col gap-6 rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
              >
                <div className="flex flex-col">
                  <span className="mb-1 text-sm font-medium uppercase tracking-wider text-neutral-500">
                    Starting from
                  </span>
                  <span className="font-serif text-4xl text-neutral-900">
                    {formatPrice(room.nightlyRate)} / night
                  </span>
                </div>

                <AvailabilitySearch
                  action={`/rooms/${room.id}`}
                  resultsId={BOOKING_CARD_ID}
                  capacities={[room]}
                  capacityLabel="This room sleeps up to"
                  submitLabel="Check this room"
                  defaultValues={
                    search?.status === "ok"
                      ? { ...search.stay, ...search.guests }
                      : undefined
                  }
                />

                <div className="border-t border-neutral-200 pt-6" role="status">
                  {stay.kind === "available" ? (
                    <>
                      <PriceBreakdown price={stay.price} />
                      {stay.unitsLeft <= 2 ? (
                        <p className="mt-2 text-sm text-neutral-600">
                          Only {stay.unitsLeft} left for these dates.
                        </p>
                      ) : null}
                      <Link
                        href={stay.href}
                        className={buttonVariants({
                          variant: "default",
                          size: "lg",
                          className: "mt-5 h-12 w-full",
                        })}
                      >
                        Book This Room
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-neutral-700">
                        {stay.kind === "unavailable"
                          ? "Sorry, this room is unavailable for these dates. Try different dates or another room."
                          : stay.kind === "exceeds-capacity"
                            ? `This room can't hold that many guests. It sleeps up to ${room.maxGuests}.`
                            : bookingMessage(room, roomsSearch)}
                      </p>
                      {stay.kind === "unavailable" ||
                      stay.kind === "exceeds-capacity" ? (
                        <Link
                          href="/rooms"
                          className={buttonVariants({
                            variant: "outline",
                            size: "lg",
                            className: "mt-5 h-12 w-full",
                          })}
                        >
                          See other rooms
                        </Link>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
