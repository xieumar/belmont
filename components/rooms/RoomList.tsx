import { rooms } from "@/data/rooms";
import type { RoomsSearch } from "@/lib/booking/load-search";
import { roomStayState } from "@/lib/booking/room-search";
import { RoomCard } from "./RoomCard";
import { SearchNotice } from "./SearchNotice";
import { SearchSummary } from "./SearchSummary";

/** Anchor the search form scrolls to once results are ready. */
export const ROOM_RESULTS_ID = "room-results";

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
    <section
      id={ROOM_RESULTS_ID}
      className="scroll-mt-6 bg-white px-6 pb-20 sm:px-8 md:pb-28"
    >
      <div className="mx-auto max-w-7xl">
        {roomsSearch?.search.status === "ok" ? (
          <SearchSummary
            stay={roomsSearch.search.stay}
            guests={roomsSearch.search.guests}
          />
        ) : null}
        <SearchNotice message={noticeFor(roomsSearch)} />
        <div className="flex flex-col gap-12 sm:gap-16">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              stay={
                roomsSearch
                  ? roomStayState(
                      room,
                      roomsSearch.search,
                      roomsSearch.availability
                    )
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
