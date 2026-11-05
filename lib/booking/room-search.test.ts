import { describe, expect, it } from "vitest";
import { rooms, type Room } from "@/data/rooms";
import { roomStayState } from "./room-search";
import type { SearchState } from "./search";

const room: Room = {
  ...rooms[0],
  id: "test-room",
  nightlyRate: 10000,
  units: 2,
  maxAdults: 2,
  maxChildren: 1,
  maxGuests: 3,
};

const search = (adults = 2, children = 0): SearchState => ({
  status: "ok",
  stay: { checkIn: "2027-03-10", checkOut: "2027-03-13" },
  guests: { adults, children },
});

describe("roomStayState", () => {
  it("is default without a usable search", () => {
    expect(roomStayState(room, { status: "none" })).toEqual({
      kind: "default",
    });
    expect(roomStayState(room, { status: "invalid", error: "x" })).toEqual({
      kind: "default",
    });
  });

  it("is default when availability could not be loaded", () => {
    expect(roomStayState(room, search(), undefined)).toEqual({
      kind: "default",
    });
  });

  it("prices an available room for the whole stay", () => {
    const state = roomStayState(room, search(2, 1), { "test-room": 2 });
    expect(state).toMatchObject({
      kind: "available",
      unitsLeft: 2,
      price: { nights: 3, nightlyRate: 10000, subtotal: 30000, total: 30000 },
    });
  });

  it("links to checkout for this room and stay", () => {
    const state = roomStayState(room, search(2, 1), { "test-room": 1 });
    expect(state).toMatchObject({
      href: "/book?room=test-room&checkIn=2027-03-10&checkOut=2027-03-13&adults=2&children=1",
    });
  });

  it("is unavailable when no unit is free", () => {
    expect(roomStayState(room, search(), { "test-room": 0 })).toEqual({
      kind: "unavailable",
    });
  });

  it("is unavailable when the room is missing from availability", () => {
    expect(roomStayState(room, search(), {})).toEqual({
      kind: "unavailable",
    });
  });

  it("flags guests that exceed capacity, even if units are free", () => {
    expect(roomStayState(room, search(3, 0), { "test-room": 2 })).toEqual({
      kind: "exceeds-capacity",
    });
    expect(roomStayState(room, search(2, 2), { "test-room": 2 })).toEqual({
      kind: "exceeds-capacity",
    });
  });

  it("reports capacity before availability", () => {
    expect(roomStayState(room, search(3, 0), { "test-room": 0 })).toEqual({
      kind: "exceeds-capacity",
    });
  });
});
