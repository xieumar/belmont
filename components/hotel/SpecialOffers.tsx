import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
  staggerItemRightVariants,
} from "@/components/ui/animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const offers = [
  {
    eyebrow: "01 — Weekend Escape",
    title: "Stay Longer, Slow Down",
    description:
      "Enjoy a relaxing weekend at Belmont with a beautifully appointed room, daily breakfast, and a little more time to yourself.",
    price: "From $185 / night",
    image: "/room1.jpg",
  },
  {
    eyebrow: "02 — Stay & Dine",
    title: "An Evening to Remember",
    description:
      "Settle into your room, then let us take care of dinner. Enjoy a luxurious overnight stay paired with a curated dining experience for two.",
    price: "From $250 / night",
    image: "/rooftop.jpg",
  },
  {
    eyebrow: "03 — Wellness Retreat",
    title: "Your Time to Unwind",
    description:
      "Take a break from the everyday with a peaceful stay, signature spa treatment, and access to our wellness facilities.",
    price: "From $220 / night",
    image: "/poolside_tropical.jpg",
  },
  {
    eyebrow: "04 — Nature's Embrace",
    title: "Reconnect & Recharge",
    description:
      "Escape the noise with guided outdoor tours, serene spaces, and evening stargazing. Find your perfect balance in nature.",
    price: "From $190 / night",
    image: "/view.jpg",
  },
  {
    eyebrow: "05 — Work & Play",
    title: "The Nomad Experience",
    description:
      "Designed for the remote worker. Enjoy premium connectivity, quiet lounging areas, and vibrant evening entertainment.",
    price: "From $210 / night",
    image: "/lounge2.jpg",
  },
];

export function SpecialOffers() {
  return (
    <section className="bg-terra-400 px-6 py-16 sm:px-8 md:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          {/* Header Section */}
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <StaggerContainer className="max-w-2xl text-neutral-100">
              <StaggerItem>
                <p className="mb-3 font-sans text-sm font-medium uppercase tracking-widest text-terra-100">
                  Special Offers
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                  More reasons to stay a little longer.
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-6 font-sans text-base leading-relaxed text-terra-100 sm:text-lg">
                  Make your stay at Belmont even more memorable with
                  thoughtfully curated offers, from relaxing weekend escapes to
                  indulgent dining and wellness experiences.
                </p>
              </StaggerItem>
            </StaggerContainer>
            <div className="hidden gap-4 md:flex">
              <CarouselPrevious className="static h-12 w-12 translate-x-0 translate-y-0 border-2 border-terra-300 text-neutral-100 hover:bg-terra-500 hover:text-white" />
              <CarouselNext className="static h-12 w-12 translate-x-0 translate-y-0 border-none bg-neutral-100 text-terra-600 hover:bg-white hover:text-terra-700" />
            </div>
          </div>

          {/* Cards Section */}
          <StaggerContainer>
            <CarouselContent className="-ml-4 md:-ml-8">
              {offers.map((offer, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:basis-1/2 md:pl-8 lg:basis-[35%]"
                >
                  <StaggerItem
                    variants={staggerItemRightVariants}
                    className="h-full"
                  >
                    <div className="flex h-full flex-col">
                      {/* Image with top-left clip */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-terra-500">
                        <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />

                        {/* Top Left Arrow Link Clip */}
                        <div className="absolute left-0 top-0 z-10 rounded-br-[1.5rem] bg-terra-400 pb-3 pr-3">
                          <button className="group flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-800">
                            <ArrowUpRight className="h-6 w-6 text-terra-600 transition-colors group-hover:text-neutral-100" />
                          </button>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="mt-8 flex flex-1 flex-col text-neutral-100">
                        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-terra-100">
                          {offer.eyebrow}
                        </p>
                        <h3 className="mb-4 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
                          {offer.title}
                        </h3>
                        <p className="mb-8 flex-1 font-sans text-sm leading-relaxed text-terra-100 sm:text-base">
                          {offer.description}
                        </p>
                        <div className="flex items-center justify-between border-t border-terra-300 pt-5 mt-auto">
                          <span className="font-serif text-lg sm:text-xl">
                            {offer.price}
                          </span>
                          <button className="font-sans text-sm font-semibold uppercase tracking-wider text-neutral-100 transition-colors hover:text-terra-200">
                            Explore Offer
                          </button>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                </CarouselItem>
              ))}
            </CarouselContent>
          </StaggerContainer>

          {/* Mobile Controls */}
          <div className="mt-8 flex justify-center gap-4 md:hidden">
            <CarouselPrevious className="static h-12 w-12 translate-x-0 translate-y-0 border-2 border-terra-300 text-neutral-100 hover:bg-terra-500 hover:text-white" />
            <CarouselNext className="static h-12 w-12 translate-x-0 translate-y-0 border-none bg-neutral-100 text-terra-600 hover:bg-white hover:text-terra-700" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
