import { rooms } from "@/data/rooms";
import { RoomCard } from "./RoomCard";

export function RoomList() {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
