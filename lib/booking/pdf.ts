import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import { hotel } from "@/data/hotel";
import { nightsBetween } from "./dates";
import { formatDate, pluralise } from "./format";
import type { BookingDTO } from "./store";
import { formatPrice } from "@/lib/utils";

const PAGE = { width: 595.28, height: 841.89 }; // A4 in points
const MARGIN = 56;
const CONTENT_WIDTH = PAGE.width - MARGIN * 2;
const LABEL_WIDTH = 140;

const COLOR = {
  text: rgb(0.1, 0.1, 0.1),
  muted: rgb(0.45, 0.45, 0.45),
  accent: rgb(0.663, 0.557, 0.404),
  rule: rgb(0.88, 0.88, 0.88),
};

const longDate = (date: string) =>
  formatDate(date, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

/**
 * Builds a one-page confirmation PDF. Uses the built-in Helvetica, which only
 * covers Latin-1 text, so any other character is shown as "?" rather than
 * failing: guest names can be anything.
 */
export async function renderBookingPdf(
  booking: BookingDTO,
  roomName?: string
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Belmont Hotel booking ${booking.reference}`);
  doc.setAuthor("Belmont Hotel");
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const safe = (text: string) =>
    [...text.replace(/\s+/g, " ").trim()]
      .map((char) => {
        try {
          regular.widthOfTextAtSize(char, 10);
          bold.widthOfTextAtSize(char, 10);
          return char;
        } catch {
          return "?";
        }
      })
      .join("");

  let page: PDFPage = doc.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - MARGIN;

  const ensureSpace = (needed: number) => {
    if (y - needed >= MARGIN) return;
    page = doc.addPage([PAGE.width, PAGE.height]);
    y = PAGE.height - MARGIN;
  };

  const wrap = (text: string, font: PDFFont, size: number, width: number) => {
    const lines: string[] = [];
    let line = "";
    for (const word of safe(text).split(" ")) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && font.widthOfTextAtSize(candidate, size) > width) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const heading = (text: string) => {
    ensureSpace(40);
    y -= 14;
    page.drawText(safe(text), {
      x: MARGIN,
      y,
      size: 13,
      font: bold,
      color: COLOR.text,
    });
    y -= 8;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: MARGIN + CONTENT_WIDTH, y },
      thickness: 0.75,
      color: COLOR.rule,
    });
    y -= 6;
  };

  const row = (label: string, value: string, emphasise = false) => {
    const font = emphasise ? bold : regular;
    const lines = wrap(value, font, 10.5, CONTENT_WIDTH - LABEL_WIDTH);
    ensureSpace(lines.length * 15 + 4);
    y -= 15;
    page.drawText(safe(label), {
      x: MARGIN,
      y,
      size: 10.5,
      font: regular,
      color: COLOR.muted,
    });
    lines.forEach((line, index) => {
      if (index > 0) y -= 14;
      page.drawText(line, {
        x: MARGIN + LABEL_WIDTH,
        y,
        size: 10.5,
        font,
        color: COLOR.text,
      });
    });
  };

  const paragraph = (text: string, size = 10) => {
    for (const line of wrap(text, regular, size, CONTENT_WIDTH)) {
      ensureSpace(16);
      y -= 14;
      page.drawText(line, {
        x: MARGIN,
        y,
        size,
        font: regular,
        color: COLOR.muted,
      });
    }
  };

  // Header
  const cancelled = booking.status === "cancelled";
  page.drawText("BELMONT HOTEL", {
    x: MARGIN,
    y,
    size: 11,
    font: bold,
    color: COLOR.accent,
  });
  y -= 30;
  page.drawText(cancelled ? "Booking cancelled" : "Booking confirmation", {
    x: MARGIN,
    y,
    size: 24,
    font: bold,
    color: COLOR.text,
  });
  y -= 36;
  page.drawText("Booking reference", {
    x: MARGIN,
    y,
    size: 10.5,
    font: regular,
    color: COLOR.muted,
  });
  y -= 26;
  page.drawText(booking.reference, {
    x: MARGIN,
    y,
    size: 26,
    font: bold,
    color: COLOR.text,
  });
  y -= 6;

  // Stay
  heading("Your stay");
  row("Room", roomName ?? "Your room", true);
  row("Check-in", `${longDate(booking.checkIn)}, from ${hotel.checkInTime}`);
  row("Check-out", `${longDate(booking.checkOut)}, by ${hotel.checkOutTime}`);
  row(
    "Length of stay",
    pluralise(nightsBetween(booking.checkIn, booking.checkOut), "night")
  );
  row(
    "Guests",
    [
      pluralise(booking.adults, "adult"),
      booking.children > 0
        ? pluralise(booking.children, "child", "children")
        : null,
    ]
      .filter(Boolean)
      .join(", ")
  );

  // Guest
  heading("Guest details");
  row("Name", booking.guest.name);
  row("Email", booking.guest.email);
  row("Phone", booking.guest.phone);
  if (booking.guest.specialRequests) {
    row("Special requests", booking.guest.specialRequests);
  }

  // Price
  const { price } = booking;
  const money = (amount: number) => formatPrice(amount, price.currency);
  heading("Price");
  row(
    `${money(price.nightlyRate)} x ${pluralise(price.nights, "night")}`,
    money(price.subtotal)
  );
  if (price.tax > 0) row("Taxes", money(price.tax));
  if (price.fees > 0) row("Fees", money(price.fees));
  row("Total", money(price.total), true);
  y -= 4;
  paragraph("Pay at the hotel. No payment has been taken.");

  // Policy
  heading("Cancellation policy");
  paragraph(
    `Free cancellation until ${hotel.freeCancellationHours} hours before check-in (${hotel.checkInTime} on ${formatDate(booking.checkIn)}). After that, please contact the hotel.`
  );

  // Footer
  heading("Contact");
  paragraph("concierge@belmonthotel.com  |  +1 (800) 555-BELMONT");
  y -= 10;
  paragraph(
    `Generated on ${new Date().toISOString().slice(0, 10)}. Keep your reference and the email you booked with to find this booking again.`,
    9
  );

  return doc.save();
}
