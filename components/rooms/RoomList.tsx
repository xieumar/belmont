import { rooms } from "@/data/rooms";
import { RoomCard } from "./RoomCard";

export function RoomList() {
  return (
    <section className="bg-white px-6 pb-20 sm:px-8 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 sm:gap-16">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
