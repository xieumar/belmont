import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Belmont Hotel",
};

// Placeholder text reflecting how booking works today. The owner should have
// it reviewed, and set a retention period, before launch
// (docs/08-open-decisions.md, item 13).
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This explains what personal information we collect when you book with us, and how we use it."
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you make a booking we collect your name, email address, phone number, any special requests you enter, and the details of your stay (room, dates and number of guests). We also create a booking reference.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [
            "We use this information to create and manage your booking, to let you view or cancel it, and to contact you about your stay. We do not use it for marketing unless you ask us to.",
          ],
        },
        {
          heading: "Where it is stored",
          paragraphs: [
            "Booking records are stored in a cloud database (Google Firestore) that is only accessed by our servers. We do not sell your personal information.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "After you make a booking we set one short-lived cookie (30 minutes) so that you can see your confirmation on the device you used. It is deleted automatically when it expires.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "We keep booking records for as long as needed to manage your stay and to meet our legal and accounting obligations.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can ask to see, correct or delete the information we hold about you by contacting concierge@belmonthotel.com.",
          ],
        },
      ]}
    />
  );
}
