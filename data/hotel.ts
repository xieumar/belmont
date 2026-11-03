export const hotel = {
  timeZone: "America/New_York",
  currency: "USD",
  checkInTime: "15:00",
  checkOutTime: "12:00",
  /** Percentages applied to the room subtotal. */
  taxRate: 0,
  feeRate: 0,
  maxStayNights: 30,
  maxAdvanceDays: 365,
  /** Guests may cancel online until this many hours before check-in. */
  freeCancellationHours: 48,
} as const;
