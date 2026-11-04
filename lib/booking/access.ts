/**
 * Short-lived cookie that lets a guest see the booking they have just made
 * without looking it up. Its value is the booking email, which is the
 * credential for viewing a booking anyway (reference + email).
 */
export const bookingAccessCookieName = (reference: string) =>
  `booking_access_${reference}`;

export const BOOKING_ACCESS_MAX_AGE_SECONDS = 30 * 60;
