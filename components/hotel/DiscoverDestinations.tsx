import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const destinations = [
  {
    title: "New York City, USA",
    subtitle: "A Smarter Way to Find, Compare, and Book Your Ideal Stay",
    image: "/poolside.jpg",
    type: "large",
  },
  {
    title: "Experience destinations",
    subtitle:
      "Experience destinations where comfort meets elegance, and every stay feels like home.",
    image: "/hero.jpg",
    type: "small",
  },
  {
    title: "Aruba Coast",
    subtitle: "Discover pristine waters and endless relaxation by the coast.",
    image: "/poolside_tropical.jpg",
    type: "large",
  },
  {
    title: "Hidden Gems",
    subtitle:
      "Explore carefully curated retreats designed for your ultimate comfort.",
    image: "/poolside_night.jpg",
    type: "small",
  },
];

export default function DiscoverDestinations() {
  return (
    <section className="overflow-hidden bg-background px-6 py-16 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="text-center font-serif text-4xl font-medium leading-[1.1] tracking-tight text-neutral-600 sm:text-5xl md:text-6xl">
          Discover Destinations, Designed
          <br className="hidden md:block" /> for Your Comfort
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mt-16 w-full"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 lg:items-stretch">
            {/* Fixed Left Col with Controls */}
            <div className="flex flex-col lg:col-span-4 lg:justify-between">
              <div className="flex flex-col gap-8">
                <p className="max-w-sm text-lg font-medium leading-relaxed text-neutral-600 font-sans">
                  Sunrise connects travelers with carefully selected hotels and
                  resorts, ensuring quality, comfort, and value wherever you go.
                </p>
                <div>
                  <button className="flex w-fit items-center gap-5 rounded-full bg-terra-400 py-2 pl-6 pr-2 text-neutral-100 transition-colors hover:bg-terra-500">
                    <span className="text-sm font-medium tracking-wide">
                      Learn More
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-terra-400">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="mt-8 flex items-center gap-4 lg:mt-0">
                <CarouselPrevious className="static h-14 w-14 translate-x-0 translate-y-0 border-2 border-border text-neutral-600" />
                <CarouselNext className="static h-14 w-14 translate-x-0 translate-y-0 bg-terra-400 text-neutral-100 hover:bg-terra-500 hover:text-neutral-100 border-none" />
              </div>
            </div>

            {/* Carousel Right Col */}
            <div className="w-full lg:col-span-8 overflow-hidden">
              <CarouselContent className="-ml-6">
                {destinations.map((dest, idx) => (
                  <CarouselItem
                    key={idx}
                    className={`pl-6 ${dest.type === "large" ? "sm:basis-3/5 lg:basis-[55%]" : "sm:basis-2/5 lg:basis-[45%]"} flex items-center`}
                  >
                    {dest.type === "large" ? (
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-muted lg:aspect-[3/4]">
                        <Image
                          src={dest.image}
                          alt={dest.title}
                          fill
                          className="object-cover transition-transform duration-1000 hover:scale-105"
                        />

                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8">
                          <p className="mb-12 max-w-[250px] text-xl font-medium leading-snug text-white">
                            {dest.subtitle}
                          </p>
                        </div>

                        <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/95 px-5 py-3 text-sm font-medium text-neutral-700 backdrop-blur-md">
                          <MapPin className="h-4 w-4" />
                          {dest.title}
                        </div>

                        <div className="absolute bottom-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/95 text-neutral-700 backdrop-blur-md transition-colors hover:bg-white">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full flex-col gap-8">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-muted">
                          <Image
                            src={dest.image}
                            alt={dest.title}
                            fill
                            className="object-cover transition-transform duration-1000 hover:scale-105"
                          />
                        </div>
                        <p className="text-lg font-medium leading-relaxed text-muted-foreground">
                          {dest.subtitle}
                        </p>
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
