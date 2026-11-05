import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryBookingStore } from "@/lib/booking/memory-store";
import type { CheckoutState } from "@/lib/booking/checkout";

const { cookieSet, redirect, holder } = vi.hoisted(() => ({
  cookieSet: vi.fn(),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
  holder: { store: undefined as unknown as MemoryBookingStore },
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({ set: cookieSet }),
}));
vi.mock("next/navigation", () => ({ redirect }));
vi.mock("@/lib/booking/get-store", () => ({ getStore: () => holder.store }));

import { createBookingAction } from "./actions";

const initial: CheckoutState = {
  values: {} as CheckoutState["values"],
  fieldErrors: {},
};

const inDays = (n: number) =>
  new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10);

function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const fields = {
    roomId: "deluxe-king",
    checkIn: inDays(30),
    checkOut: inDays(33),
    adults: "2",
    children: "0",
    name: "Ada Lovelace",
    email: "ada@example.com",
    phone: "+1 555 123 4567",
    specialRequests: "",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

beforeEach(() => {
  holder.store = new MemoryBookingStore();
  cookieSet.mockClear();
  redirect.mockClear();
});

describe("createBookingAction", () => {
  it("creates the booking and redirects to its confirmation page", async () => {
    await expect(createBookingAction(initial, form())).rejects.toThrow(
      /NEXT_REDIRECT:\/booking\/[A-Z0-9-]+/
    );
    const reference = redirect.mock.calls[0][0].split("/").pop() as string;
    const booking = await holder.store.getByReference(
      reference,
      "ada@example.com"
    );
    expect(booking?.guest.email).toBe("ada@example.com");
    expect(cookieSet).toHaveBeenCalledWith(
      `booking_access_${reference}`,
      "ada@example.com",
      expect.objectContaining({ httpOnly: true })
    );
  });

  it("accepts a submission with the optional special requests left blank", async () => {
    await expect(
      createBookingAction(initial, form({ specialRequests: "" }))
    ).rejects.toThrow(/NEXT_REDIRECT/);
  });

  it("accepts a submission with the optional field missing entirely", async () => {
    const data = form();
    data.delete("specialRequests");
    await expect(createBookingAction(initial, data)).rejects.toThrow(
      /NEXT_REDIRECT/
    );
  });

  it("returns field errors and keeps the entered values", async () => {
    const state = await createBookingAction(
      initial,
      form({ name: "A", email: "nope" })
    );
    expect(state.fieldErrors.name).toEqual(expect.any(String));
    expect(state.fieldErrors.email).toEqual(expect.any(String));
    expect(state.values.phone).toBe("+1 555 123 4567");
    expect(redirect).not.toHaveBeenCalled();
  });

  it("rejects a tampered room id without creating a booking", async () => {
    const state = await createBookingAction(initial, form({ roomId: "nope" }));
    expect(state.formError).toEqual(expect.any(String));
    expect(redirect).not.toHaveBeenCalled();
  });

  it("reports an unavailable room instead of double booking", async () => {
    holder.store = new MemoryBookingStore([{ id: "deluxe-king", units: 1 }]);
    await expect(createBookingAction(initial, form())).rejects.toThrow(
      /NEXT_REDIRECT/
    );
    const state = await createBookingAction(initial, form());
    expect(state.formError).toMatch(/just been booked/i);
    expect(redirect).toHaveBeenCalledTimes(1);
  });

  it("ignores a price sent by the client", async () => {
    await expect(
      createBookingAction(initial, form({ total: "1", price: "1" }))
    ).rejects.toThrow();
    const reference = redirect.mock.calls[0][0].split("/").pop() as string;
    const booking = await holder.store.getByReference(
      reference,
      "ada@example.com"
    );
    expect(booking?.price.total).toBe(105000);
  });
});
