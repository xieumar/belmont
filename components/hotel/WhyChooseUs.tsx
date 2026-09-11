import Image from "next/image";
import {
  BadgePercent,
  ShieldCheck,
  Headset,
  ArrowRightLeft,
} from "lucide-react";

const features = [
  {
    icon: BadgePercent,
    title: "Best Price Guarantee",
    description:
      "Get the lowest rates with no hidden charges when you book direct.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Trusted",
    description:
      "Book with confidence, your personal data and privacy are safe.",
  },
  {
    icon: Headset,
    title: "24/7 Concierge",
    description: "We're always here to help you tailor your perfect stay.",
  },
  {
    icon: ArrowRightLeft,
    title: "Flexible Options",
    description: "Easy cancellations and modifications for your peace of mind.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="px-4 py-4 sm:px-8 sm:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-zinc-50 sm:rounded-[2.5rem] lg:flex-row lg:items-center lg:gap-20 lg:p-16">
        {/* Left Column (Text & Grid) */}
        <div className="flex-1">
          <h2 className="font-sans text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            Why travelers love booking their sanctuary with Belmont.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-16">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 sm:p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-2 font-sans text-xl font-bold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (Overlapping Images) */}
        <div className="relative min-h-[350px] w-full flex-1 sm:min-h-[500px] lg:min-h-[650px]">
          {/* Top/Back Image */}
          <div className="absolute right-0 top-0 h-[75%] w-[85%] overflow-hidden rounded-[2rem] sm:h-[70%] sm:w-[80%]">
            <Image
              src="/resort.jpg"
              alt="Belmont Resort overview"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* Bottom/Front Image */}
          <div className="absolute bottom-0 left-0 z-10 h-[65%] w-[75%] overflow-hidden rounded-[2rem] border-[6px] border-zinc-950 sm:h-[60%] sm:w-[70%] sm:border-8">
            <Image
              src="/poolside_night.jpg"
              alt="Poolside relaxation"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
