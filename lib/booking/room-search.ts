import type { Room } from "@/data/rooms";
import { checkCapacity } from "./capacity";
import { nightsBetween } from "./dates";
import { calculatePrice } from "./pricing";
import type { SearchState } from "./search";
import type { Availability } from "./store";
import type { PriceBreakdown } from "./types";

/** How one room should be presented for the visitor's search. */
export type RoomStayState =
  /** No usable search (or it couldn't be checked): show the room as usual. */
  | { kind: "default" }
  | {
      kind: "available";
      price: PriceBreakdown;
      unitsLeft: number;
      /** Room page carrying the search, so the choice isn't lost. */
      href: string;
    }
  | { kind: "unavailable" }
  | { kind: "exceeds-capacity" };

const isBookable = (room: Room, unitsFree: number | undefined) =>
  (unitsFree ?? 0) > 0 && room.units > 0;

export function roomStayState(
  room: Room,
  search: SearchState,
  availability?: Availability
): RoomStayState {
  if (search.status !== "ok" || !availability) return { kind: "default" };

  const { stay, guests } = search;
  if (checkCapacity(room, guests)) return { kind: "exceeds-capacity" };

  const unitsLeft = availability[room.id];
  if (!isBookable(room, unitsLeft)) return { kind: "unavailable" };

  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const query = new URLSearchParams({
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    adults: String(guests.adults),
    children: String(guests.children),
  });
  return {
    kind: "available",
    price: calculatePrice(room.nightlyRate, nights),
    unitsLeft: unitsLeft as number,
    href: `/rooms/${room.id}?${query}`,
  };
}
