import Image from "next/image";
import Link from "next/link";
import { SlideUp } from "@/components/ui/animations";
import { Room } from "@/data/rooms";
import { ArrowRight, Maximize2, Users, BedDouble } from "lucide-react";

interface RoomCardProps {
  room: Room;
  index: number;
}

export function RoomCard({ room, index }: RoomCardProps) {
  return (
    <SlideUp delay={index * 0.1} className="h-full">
      <Link href={`/rooms/${room.id}`} className="group block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-neutral-50 transition-all duration-300 hover:shadow-xl border border-neutral-100">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={room.primaryImage}
              alt={room.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute bottom-4 right-4 flex items-center justify-center rounded-full bg-white/90 p-3 text-neutral-900 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          <div className="flex flex-col flex-grow p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-2xl font-medium text-neutral-900 transition-colors group-hover:text-terra-600">
                {room.name}
              </h3>
              <p className="font-sans text-sm font-semibold text-terra-600 bg-terra-50 px-3 py-1 rounded-full">
                {room.price}
              </p>
            </div>

            <p className="mb-6 font-sans text-neutral-600 line-clamp-2">
              {room.shortDescription}
            </p>

            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-neutral-200 pt-6">
              <div className="flex flex-col items-center gap-1 text-neutral-500">
                <Maximize2 className="h-4 w-4" />
                <span className="text-xs">{room.size.split(" / ")[1]}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-neutral-500 border-l border-r border-neutral-200">
                <Users className="h-4 w-4" />
                <span className="text-xs">
                  {room.occupancy.split(" ")[0]} Gts
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-neutral-500">
                <BedDouble className="h-4 w-4" />
                <span className="text-xs">{room.bedType.split(" ")[1]}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </SlideUp>
  );
}
