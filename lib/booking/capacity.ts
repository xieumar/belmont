import type { Room } from "@/data/rooms";
import type { GuestCount } from "./types";

export type CapacityError =
  | "invalid-count"
  | "adult-required"
  | "too-many-adults"
  | "too-many-children"
  | "too-many-guests";

type RoomCapacity = Pick<Room, "maxAdults" | "maxChildren" | "maxGuests">;

export function checkCapacity(
  room: RoomCapacity,
  { adults, children }: GuestCount
): CapacityError | null {
  if (
    !Number.isInteger(adults) ||
    !Number.isInteger(children) ||
    adults < 0 ||
    children < 0
  ) {
    return "invalid-count";
  }
  if (adults < 1) return "adult-required";
  if (adults > room.maxAdults) return "too-many-adults";
  if (children > room.maxChildren) return "too-many-children";
  if (adults + children > room.maxGuests) return "too-many-guests";
  return null;
}
