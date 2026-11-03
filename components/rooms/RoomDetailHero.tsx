import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";
import { Room } from "@/data/rooms";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RoomDetailHeroProps {
  room: Room;
}

export function RoomDetailHero({ room }: RoomDetailHeroProps) {
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

            <StaggerItem className="flex-shrink-0 w-full lg:w-auto">
              <div className="flex flex-col gap-6 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
                <div className="flex flex-col">
                  <span className="text-neutral-500 text-sm font-medium uppercase tracking-wider mb-1">
                    Starting from
                  </span>
                  <span className="text-neutral-900 font-serif text-4xl">
                    {formatPrice(room.nightlyRate)} / night
                  </span>
                </div>
                <button
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                    className: "w-full min-w-[200px]",
                  })}
                >
                  Book This Room
                </button>
              </div>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
