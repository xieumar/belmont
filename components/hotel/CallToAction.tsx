import Image from "next/image";
import { Calendar, ChevronDown, Search } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-background px-4 py-8 sm:px-8 sm:py-16">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-between overflow-hidden rounded-[2rem] bg-zinc-900 p-6 sm:rounded-[2.5rem] sm:p-12 md:flex-row lg:p-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/view.jpg"
            alt="Beautiful aerial view"
            fill
            className="object-cover"
          />
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20" />
        </div>

        {/* Text Content (Left) */}
        <div className="relative z-10 flex w-full flex-col gap-4 text-white md:w-1/2">
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Your sanctuary
            <br />
            is waiting
          </h2>
          <p className="text-base text-neutral-100 sm:text-lg font-sans">
            Find the perfect suite for your trip, easily book in minutes.
          </p>
        </div>

        {/* Booking Widget (Right) */}
        <div className="relative z-10 mt-10 flex w-full flex-col items-stretch gap-3 rounded-[2.5rem] border border-white/20 bg-white/20 p-3 backdrop-blur-xl sm:w-auto sm:flex-row md:mt-0">
          {/* Input Area */}
          <div className="flex w-full flex-col gap-4 rounded-[2rem] bg-white p-6 sm:w-[300px]">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              <Calendar className="h-4 w-4" />
              Your Dates
            </div>
            <div className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-slate-100 px-5 py-4 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-200/70">
              Check-in - Check-out
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-700 text-neutral-100">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="flex w-full flex-col items-center justify-center gap-6 rounded-[2rem] bg-terra-400 hover:bg-terra-500 p-6 text-neutral-100 transition-transform hover:scale-105 active:scale-95 sm:w-[160px]">
            <span className="text-sm font-medium tracking-wide">
              Search Rooms
            </span>
            <Search className="h-10 w-10" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
