import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";
import { AvailabilitySearch } from "@/components/booking/AvailabilitySearch";
import { rooms } from "@/data/rooms";
import type { SearchState } from "@/lib/booking/search";
import { ROOM_RESULTS_ID } from "./RoomList";

const capacities = rooms.map(({ maxAdults, maxChildren, maxGuests }) => ({
  maxAdults,
  maxChildren,
  maxGuests,
}));

interface RoomsHeroProps {
  /** The visitor's current search, used to pre-fill the form. */
  search?: SearchState;
}

export function RoomsHero({ search }: RoomsHeroProps) {
  const defaultValues =
    search?.status === "ok" ? { ...search.stay, ...search.guests } : undefined;

  return (
    <section className="bg-background px-4 pb-6 pt-2 sm:px-8 sm:pb-8 sm:pt-4">
      <div className="relative mx-auto flex min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] w-full max-w-7xl flex-col justify-center overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-background p-6 sm:p-10 md:p-16 lg:p-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/room.jpg"
            alt="Belmont Rooms and Suites"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>

        <StaggerContainer
          delay={0}
          className="relative z-10 max-w-3xl mt-4 sm:mt-8"
        >
          <StaggerItem>
            <p className="mb-4 sm:mb-6 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-terra-400">
              Accommodations
            </p>
          </StaggerItem>

          <h1 className="mb-6 sm:mb-8 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <StaggerItem className="block">Rooms & Suites</StaggerItem>
          </h1>

          <StaggerItem>
            <p className="max-w-2xl text-sm sm:text-base font-light leading-relaxed text-white/90 md:text-xl">
              Retreat to unparalleled comfort and sophistication. Our rooms and
              suites offer stunning views, refined design, and thoughtful
              amenities to ensure your stay is extraordinary.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <div className="relative z-10 mt-8 w-full max-w-xl rounded-3xl bg-white p-5 shadow-xl sm:mt-10 sm:p-6">
          <h2 className="mb-4 font-serif text-xl font-medium text-neutral-900">
            Check availability
          </h2>
          <AvailabilitySearch
            defaultValues={defaultValues}
            capacities={capacities}
            resultsId={ROOM_RESULTS_ID}
          />
        </div>
      </div>
    </section>
  );
}
