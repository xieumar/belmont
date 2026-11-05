import Image from "next/image";
import Link from "next/link";
import { SlideUp } from "@/components/ui/animations";
import { Room } from "@/data/rooms";
import { buttonVariants } from "@/components/ui/button";
import type { RoomStayState } from "@/lib/booking/room-search";
import { formatPrice } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  index: number;
  /** How this room fares for the visitor's search. Defaults to no search. */
  stay?: RoomStayState;
}

const ctaClassName =
  "bg-[#A98E67] hover:bg-[#917955] text-white rounded-full px-6 lg:px-8 font-medium";

export function RoomCard({
  room,
  index,
  stay = { kind: "default" },
}: RoomCardProps) {
  return (
    <SlideUp delay={index * 0.1} className="h-full">
      <article
        className={`group flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} h-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#F8F6F3] transition-all duration-300 hover:shadow-2xl hover:shadow-black/5`}
      >
        {/* Left Side (or Right for odd index): Image */}
        <div className="relative w-full md:w-3/5 lg:w-1/2 min-h-[300px] md:min-h-[400px] overflow-hidden">
          <Image
            src={room.primaryImage}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex w-full md:w-2/5 lg:w-1/2 flex-col justify-between">
          <div className="p-8 sm:p-10 lg:p-12">
            <span className="mb-3 block font-sans text-sm md:text-base font-medium text-[#B09987]">
              {room.highlights && room.highlights.length > 0
                ? room.highlights[0]
                : "Luxury Accommodation"}
            </span>
            <Link href={`/rooms/${room.id}`} className="inline-block">
              <h3 className="mb-6 font-serif text-3xl sm:text-4xl lg:text-4xl font-medium text-neutral-900 transition-colors hover:text-terra-600">
                {room.name}
              </h3>
            </Link>
            <p className="font-sans text-neutral-500 leading-relaxed text-base lg:text-lg line-clamp-4">
              {room.longDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200/60 p-8 sm:px-10 lg:px-12 sm:py-8 bg-[#F5F3EF]">
            {stay.kind === "available" ? (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl lg:text-4xl font-semibold text-neutral-900">
                    {formatPrice(stay.price.total, stay.price.currency)}
                  </span>
                  <span className="font-sans text-sm text-neutral-600">
                    total for {stay.price.nights}{" "}
                    {stay.price.nights === 1 ? "night" : "nights"}
                  </span>
                </div>
                <p className="mt-1 font-sans text-sm text-neutral-600">
                  {formatPrice(room.nightlyRate)} per night
                  {stay.unitsLeft <= 2 ? ` · Only ${stay.unitsLeft} left` : ""}
                </p>
              </div>
            ) : stay.kind === "unavailable" ? (
              <div>
                <p className="font-serif text-xl font-semibold text-neutral-900">
                  Unavailable for these dates
                </p>
                <p className="mt-1 font-sans text-sm text-neutral-600">
                  {formatPrice(room.nightlyRate)} per night
                </p>
              </div>
            ) : stay.kind === "exceeds-capacity" ? (
              <div>
                <p className="font-serif text-xl font-semibold text-neutral-900">
                  Exceeds capacity
                </p>
                <p className="mt-1 font-sans text-sm text-neutral-600">
                  Sleeps up to {room.maxGuests} guests
                </p>
              </div>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl lg:text-4xl font-semibold text-neutral-900">
                  {formatPrice(room.nightlyRate)}
                </span>
                <span className="font-sans text-sm text-neutral-600">
                  Per night
                </span>
              </div>
            )}
            {stay.kind === "unavailable" || stay.kind === "exceeds-capacity" ? (
              <span
                aria-disabled="true"
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className:
                    "cursor-not-allowed rounded-full px-6 lg:px-8 font-medium opacity-60",
                })}
              >
                Not available
              </span>
            ) : (
              <Link
                href={
                  stay.kind === "available" ? stay.href : `/rooms/${room.id}`
                }
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: ctaClassName,
                })}
              >
                Book your stay
              </Link>
            )}
          </div>
        </div>
      </article>
    </SlideUp>
  );
}
