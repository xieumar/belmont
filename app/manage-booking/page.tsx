import type { Metadata } from "next";
import { ManageBookingForm } from "@/components/booking/ManageBookingForm";

export const metadata: Metadata = {
  title: "Manage your booking | Belmont Hotel",
  robots: { index: false },
};

export default function ManageBookingPage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 py-16 sm:px-8 md:py-24">
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-[#A98E67]">
        Manage booking
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium text-neutral-900 sm:text-4xl">
        Find your booking
      </h1>
      <p className="mt-3 text-neutral-600">
        Enter your booking reference and the email you booked with to view or
        cancel your stay.
      </p>
      <div className="mt-8">
        <ManageBookingForm />
      </div>
    </div>
  );
}
