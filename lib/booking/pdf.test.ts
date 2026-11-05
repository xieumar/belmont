import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { renderBookingPdf } from "./pdf";
import type { BookingDTO } from "./store";

const booking: BookingDTO = {
  reference: "BLM-7K4Q9X",
  roomId: "deluxe-king",
  checkIn: "2027-03-10",
  checkOut: "2027-03-13",
  adults: 2,
  children: 0,
  guest: {
    name: "Ada Lovelace",
    email: "ada@example.com",
    phone: "+1 555 123 4567",
  },
  price: {
    nights: 3,
    nightlyRate: 35000,
    subtotal: 105000,
    tax: 0,
    fees: 0,
    total: 105000,
    currency: "USD",
  },
  status: "confirmed",
  createdAt: "2026-11-04T10:00:00.000Z",
};

const render = (
  overrides: Partial<BookingDTO> = {},
  room = "Deluxe King Room"
) => renderBookingPdf({ ...booking, ...overrides }, room);

describe("renderBookingPdf", () => {
  it("produces a valid, loadable PDF", async () => {
    const bytes = await render();
    expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(1);
    expect(doc.getTitle()).toContain("BLM-7K4Q9X");
  });

  it("handles names the built-in font can't draw", async () => {
    const bytes = await render({
      guest: { ...booking.guest, name: "李小龍 \u{1F600} Zoë" },
    });
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(1);
  });

  it("wraps long special requests, including line breaks", async () => {
    const bytes = await render({
      guest: {
        ...booking.guest,
        specialRequests: `Late arrival.\nPlease add a cot. ${"quiet room ".repeat(40)}`,
      },
    });
    expect((await PDFDocument.load(bytes)).getPageCount()).toBeGreaterThan(0);
  });

  it("renders a cancelled booking, taxes, fees and children", async () => {
    const bytes = await render({
      status: "cancelled",
      children: 2,
      price: { ...booking.price, tax: 1000, fees: 500, total: 106500 },
    });
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(1);
  });

  it("copes with a room that no longer exists", async () => {
    const bytes = await renderBookingPdf(booking, undefined);
    expect(bytes.length).toBeGreaterThan(1000);
  });
});
