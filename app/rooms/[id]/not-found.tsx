import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Room not found | Belmont Hotel",
  robots: { index: false },
};

export default function RoomNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-[#A98E67]">
        404
      </p>
      <h1 className="mt-3 font-serif text-3xl font-medium text-neutral-900">
        We couldn&apos;t find that room
      </h1>
      <p className="mt-4 text-neutral-600">
        The room you&apos;re looking for may have moved or no longer exists.
        Browse our rooms and suites to find your stay.
      </p>
      <Link
        href="/rooms"
        className={buttonVariants({ size: "lg", className: "mt-8 px-8" })}
      >
        View all rooms
      </Link>
    </div>
  );
}
