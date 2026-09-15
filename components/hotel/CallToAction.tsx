import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-background px-4 py-8 sm:px-8 sm:py-16">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-10 overflow-hidden rounded-[2rem] bg-zinc-900 p-6 sm:rounded-[2.5rem] sm:p-12 lg:p-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/view.jpg"
            alt="Beautiful aerial view"
            fill
            className="object-cover"
          />
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex w-full flex-col gap-4 text-white">
          <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Ready to book
            <br />
            your stay?
          </h2>
          <p className="text-base text-neutral-100 sm:text-lg font-sans">
            Find the perfect suite for your trip and experience the ultimate
            comfort in just a few clicks.
          </p>
        </div>

        {/* Action Button */}
        <div className="relative z-10 flex w-full items-start justify-start">
          <button className="group flex items-center justify-center gap-3 rounded-full bg-terra-400 hover:bg-terra-500 px-10 py-5 text-neutral-100 transition-transform hover:scale-105 active:scale-95">
            <span className="text-sm font-semibold tracking-widest uppercase">
              Explore
            </span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
