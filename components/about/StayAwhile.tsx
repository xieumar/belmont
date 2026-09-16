import { SlideUp } from "@/components/ui/animations";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StayAwhile() {
  return (
    <section className="bg-neutral-900 px-6 py-24 sm:px-8 md:py-32 text-center">
      <div className="mx-auto max-w-3xl">
        <SlideUp>
          <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Stay Awhile
          </h2>
          <p className="mb-10 font-sans text-lg text-neutral-400">
            Discover a place where time slows down. We&apos;re ready to welcome
            you to your new favorite retreat.
          </p>
          <Link
            href="/rooms"
            className="group inline-flex items-center gap-4 rounded-full bg-terra-400 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-terra-500 hover:shadow-xl hover:shadow-terra-900/20"
          >
            Explore Rooms
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </SlideUp>
      </div>
    </section>
  );
}
