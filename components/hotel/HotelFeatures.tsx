import Image from "next/image";

const features = [
  {
    imageSrc: "/top-rated.png",
    title: "Five stars luxury resort",
    description: "Experience a unique stay.",
    clipPath: "polygon(0 0, 100% 0, 0 100%)", // Top-Left Half
  },
  {
    imageSrc: "/costumer.png",
    title: "Well trained manpower",
    description: "Dedicated meal courses.",
    clipPath: "polygon(100% 100%, 100% 0, 0 100%)", // Bottom-Right Half
  },
  {
    imageSrc: "/restaurant.png",
    title: "Fine dining restaurants",
    description: "Discover a medley of flavours.",
    clipPath: "polygon(0 0, 100% 0, 0 100%)", // Top-Left Half
  },
  {
    imageSrc: "/swimming-pool.png",
    title: "Large swimming pool",
    description: "Unwind and discover joy.",
    clipPath: "polygon(100% 100%, 100% 0, 0 100%)", // Bottom-Right Half
  },
];

export default function HotelFeatures() {
  return (
    <section className="bg-terra-400 px-6 py-16 sm:px-8 md:py-24 border-t border-terra-500/50">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-terra-500/50">
          {features.map((feature, idx) => {
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${
                  idx !== 0
                    ? "pt-12 sm:pt-0 sm:pl-8 lg:pl-8"
                    : "sm:pr-8 lg:pr-8"
                }`}
              >
                {/* Icon Container with centered semi-circular background */}
                <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
                  <div
                    className="absolute inset-0 h-28 w-28 rounded-full bg-terra-500"
                    style={{ clipPath: feature.clipPath }}
                  />
                  <div className="relative z-10 h-14 w-14">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="mb-3 font-serif text-xl font-medium text-neutral-100">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-terra-100">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
