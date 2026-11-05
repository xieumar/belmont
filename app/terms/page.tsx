import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { hotel } from "@/data/hotel";

export const metadata: Metadata = {
  title: "Terms of Service | Belmont Hotel",
};

// Placeholder text reflecting how booking works today. The owner should have
// it reviewed before launch (docs/08-open-decisions.md, item 13).
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms cover bookings made through this website. By confirming a booking you agree to them."
      sections={[
        {
          heading: "Bookings",
          paragraphs: [
            "A booking is confirmed once you see your booking reference on screen. Availability is checked at the moment you confirm, so a room shown as available while you browse may no longer be available when you submit.",
            "Please check your dates, room and guest numbers before confirming. The number of guests must not exceed the capacity shown for the room.",
          ],
        },
        {
          heading: "Prices and payment",
          paragraphs: [
            "The total shown when you confirm is the price for your booking. No payment is taken online: you pay at the hotel during your stay.",
          ],
        },
        {
          heading: "Cancellation",
          paragraphs: [
            `You may cancel free of charge until ${hotel.freeCancellationHours} hours before check-in. After that, online cancellation is not available; please contact the hotel.`,
          ],
        },
        {
          heading: "Check-in and check-out",
          paragraphs: [
            `Check-in is from ${hotel.checkInTime} and check-out is by ${hotel.checkOutTime}, local hotel time.`,
          ],
        },
        {
          heading: "Special requests",
          paragraphs: [
            "We will do our best to meet special requests but cannot guarantee them.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about these terms or a booking: concierge@belmonthotel.com or +1 (800) 555-BELMONT.",
          ],
        },
      ]}
    />
  );
}
