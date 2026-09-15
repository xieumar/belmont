import Image from "next/image";
import { Phone } from "lucide-react";

export default function HotelAbout() {
  return (
    <section className="bg-background px-6 py-16 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="max-w-xl">
            <p className="mb-3 font-sans text-sm font-medium uppercase tracking-widest text-terra-400">
              About Belmont
            </p>
            <h2 className="mb-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-neutral-800 sm:text-5xl lg:text-[3.5rem]">
              A stay designed around how you want to feel.
            </h2>
            <p className="mb-10 max-w-md font-sans text-base leading-relaxed text-neutral-500">
              At Belmont, every detail is considered to make your stay
              effortless. From beautifully appointed rooms and thoughtful
              service to exceptional dining and quiet moments by the pool, we
              bring together everything you need to slow down, settle in, and
              enjoy your time with us.
            </p>

            <div className="flex flex-wrap items-center gap-6 font-sans">
              <button className="rounded bg-neutral-800 px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-700">
                About resort
              </button>
              <div className="flex items-center gap-2 font-medium text-neutral-700">
                <Phone className="h-5 w-5 text-neutral-500" strokeWidth={1.5} />
                <span>1 800 222 000</span>
              </div>
            </div>
          </div>

          {/* Images Content */}
          <div className="relative mt-12 flex justify-end md:mt-0">
            {/* Main Background Image */}
            <div className="relative h-[400px] w-[85%] overflow-hidden rounded-[2rem] bg-slate-200 sm:h-[500px] md:h-[600px]">
              <Image
                src="/poolside_tropical.jpg"
                alt="Belmont Resort Tropical"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping Foreground Image */}
            <div className="absolute -bottom-8 -left-4 z-10 h-[260px] w-[260px] overflow-hidden rounded-[2rem] border-8 border-background bg-neutral-200 shadow-xl sm:-bottom-12 sm:left-4 sm:h-[320px] sm:w-[320px] md:-bottom-16 md:-left-8 md:h-[380px] md:w-[350px]">
              <Image
                src="/resort.jpg"
                alt="Belmont Resort Woman"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
