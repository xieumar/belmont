import { z } from "zod";
import { REFERENCE_PATTERN } from "./reference";

const dateField = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const countField = (min: number) => z.coerce.number().int().min(min).max(10);

/** Query params for searching availability and starting checkout. */
export const searchSchema = z.object({
  checkIn: dateField,
  checkOut: dateField,
  adults: countField(1),
  children: countField(0).default(0),
});

export const guestDetailsSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[+\d][\d\s().-]*$/, "Enter a valid phone number"),
  specialRequests: z.string().trim().max(500).optional(),
});

export const lookupSchema = z.object({
  reference: z
    .string()
    .trim()
    .toUpperCase()
    .regex(REFERENCE_PATTERN, "Enter a valid booking reference"),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
});

export type SearchInput = z.infer<typeof searchSchema>;
export type GuestDetailsInput = z.infer<typeof guestDetailsSchema>;
export type LookupInput = z.infer<typeof lookupSchema>;
