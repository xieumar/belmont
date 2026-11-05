import "server-only";
import { getStore } from "./get-store";
import { parseSearch, type RawSearchParams, type SearchState } from "./search";
import type { Availability } from "./store";

export interface RoomsSearch {
  search: SearchState;
  /** Units free per room id. Only set for a valid search that could be checked. */
  availability?: Availability;
  /** True when a valid search could not be checked (e.g. Firestore is down). */
  availabilityError: boolean;
}

/**
 * Parses the URL params and, for a valid search, looks up availability.
 * Never throws: a backend failure is logged and reported as `availabilityError`
 * so the rooms page still renders.
 */
export async function loadRoomsSearch(
  raw: RawSearchParams
): Promise<RoomsSearch> {
  const search = parseSearch(raw);
  if (search.status !== "ok") {
    return { search, availabilityError: false };
  }
  try {
    const availability = await getStore().getAvailability(search.stay);
    return { search, availability, availabilityError: false };
  } catch (error) {
    console.error("Failed to load room availability", error);
    return { search, availabilityError: true };
  }
}
