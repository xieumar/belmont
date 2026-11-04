import "server-only";
import { getDb } from "@/lib/firebase/admin";
import { FirestoreBookingStore } from "./firestore-store";
import type { BookingStore } from "./store";

/** The production booking store. Credentials are only needed once it is used. */
export function getStore(): BookingStore {
  return new FirestoreBookingStore(getDb());
}
