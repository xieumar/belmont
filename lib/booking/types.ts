/** Date-only string in `YYYY-MM-DD` form. */
export type DateString = string;

export interface StayDates {
  checkIn: DateString;
  checkOut: DateString;
}

export interface GuestCount {
  adults: number;
  children: number;
}

export interface PriceBreakdown {
  nights: number;
  nightlyRate: number;
  subtotal: number;
  tax: number;
  fees: number;
  total: number;
  currency: string;
}

export type BookingStatus = "confirmed" | "cancelled";

export interface GuestDetails {
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}
