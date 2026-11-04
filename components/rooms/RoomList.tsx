import { rooms } from "@/data/rooms";
import type { RoomsSearch } from "@/lib/booking/load-search";
import { RoomCard } from "./RoomCard";
import { SearchNotice } from "./SearchNotice";

interface RoomListProps {
  /** The visitor's search, if any. Without it the list looks as it always has. */
  roomsSearch?: RoomsSearch;
}

function noticeFor(roomsSearch?: RoomsSearch) {
  if (!roomsSearch) return undefined;
  if (roomsSearch.search.status === "invalid") return roomsSearch.search.error;
  if (roomsSearch.availabilityError) {
    return "We couldn't check availability right now. Please try again in a moment.";
  }
  return undefined;
}

export function RoomList({ roomsSearch }: RoomListProps) {
  return (
    <section className="bg-white px-6 pb-20 sm:px-8 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <SearchNotice message={noticeFor(roomsSearch)} />
        <div className="flex flex-col gap-12 sm:gap-16">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
