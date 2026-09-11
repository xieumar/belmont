import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const suites = [
  {
    title: "Radisson Blu Aruba",
    image: "/poolside_tropical.jpg",
  },
  {
    title: "Freehand New York",
    image: "/resort.jpg",
  },
  {
    title: "Hotel Central Park",
    image: "/poolside_night.jpg",
  },
  {
    title: "Garden Villa Oasis",
    image: "/poolside.jpg",
  },
];

export default function FeaturedSuites() {
  return (
    <section className="px-6 py-16 sm:px-8 md:py-24 bg-background">
      <div className="mx-auto w-full max-w-7xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Hot hotel deals right now
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Discover limited-time hotel offers from trusted booking
                partners. Compare prices instantly and book the best deals
                before they&apos;re gone.
              </p>
            </div>
            <div className="hidden gap-4 md:flex">
              <CarouselPrevious className="static h-12 w-12 translate-x-0 translate-y-0 border-2 border-border" />
              <CarouselNext className="static h-12 w-12 translate-x-0 translate-y-0 bg-foreground text-background hover:bg-foreground/90 hover:text-background" />
            </div>
          </div>

          <CarouselContent className="-ml-4 md:-ml-8">
            {suites.map((suite, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-1/2 md:pl-8 lg:basis-1/3"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-muted">
                  <Image
                    src={suite.image}
                    alt={suite.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Top Left Arrow Link */}
                  <div className="absolute left-0 top-0 z-10 rounded-br-[2rem] bg-background pb-4 pr-4">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent">
                      <ArrowUpRight className="h-6 w-6 text-foreground" />
                    </button>
                  </div>

                  {/* Bottom Left Pill */}
                  <div className="absolute bottom-0 left-0 z-10 rounded-tr-[2rem] bg-background pr-4 pt-4">
                    <div className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground">
                      {suite.title}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex justify-center gap-4 md:hidden">
            <CarouselPrevious className="static h-12 w-12 translate-x-0 translate-y-0 border-2 border-border" />
            <CarouselNext className="static h-12 w-12 translate-x-0 translate-y-0 bg-foreground text-background hover:bg-foreground/90 hover:text-background" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
