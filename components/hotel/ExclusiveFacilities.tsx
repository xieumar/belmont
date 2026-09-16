import Image from "next/image";
import {
  StaggerContainer,
  StaggerItem,
  SlideInLeft,
  SlideInRight,
} from "@/components/ui/animations";

const facilities = [
  {
    title: "Tropical Poolside",
    description:
      "Relax by our pristine, nature-inspired pools designed to melt away your stress.",
    image: "/poolside_tropical.jpg",
    className: "md:col-span-2 md:row-span-1",
    Animation: SlideInLeft,
  },
  {
    title: "Elegant Lounge",
    description: "Unwind in our sophisticated lounging areas.",
    image: "/lounge.jpg",
    className: "md:col-span-1 md:row-span-1",
    Animation: SlideInRight,
  },
  {
    title: "Wellness Spa",
    description: "Rejuvenate your body and mind with our signature treatments.",
    image: "/massage.jpg",
    className: "md:col-span-1 md:row-span-1",
    Animation: SlideInLeft,
  },
  {
    title: "Grand Piano",
    description: "Live entertainment every evening in the hall.",
    image: "/piano.jpg",
    className: "md:col-span-2 md:row-span-1",
    Animation: SlideInRight,
  },
  {
    title: "Grand Hall",
    description: "Perfect for exclusive events and gatherings.",
    image: "/hall.jpg",
    className: "md:col-span-2 md:row-span-1",
    Animation: SlideInLeft,
  },
  {
    title: "Rooftop Views",
    description: "Breathtaking scenery from the top.",
    image: "/rooftop.jpg",
    className: "md:col-span-1 md:row-span-1",
    Animation: SlideInRight,
  },
];

export function ExclusiveFacilities() {
  return (
    <section className="bg-background px-6 py-16 sm:px-8 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header Section */}
        <StaggerContainer className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:gap-12">
          <div className="max-w-xl">
            <StaggerItem>
              <p className="mb-3 font-sans text-sm font-medium uppercase tracking-widest text-terra-400">
                Premium Facilities
              </p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-neutral-800 sm:text-5xl lg:text-6xl">
                Discover Our
                <br />
                Exclusive Spaces
              </h2>
            </StaggerItem>
          </div>
          <StaggerItem className="max-w-md">
            <p className="font-sans text-base leading-relaxed text-neutral-500 md:text-lg">
              Our exclusive amenities include luxurious swimming pools,
              breathtaking rooftop views, and meticulously designed spaces
              created for an exceptional ambiance.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Bento Grid Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6 auto-rows-[300px]">
          {facilities.map((facility) => (
            <facility.Animation
              key={facility.title}
              className={`group relative overflow-hidden rounded-3xl h-[300px] md:h-full w-full ${facility.className}`}
            >
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 flex h-full w-full flex-col justify-end p-6 md:p-8">
                <h3 className="mb-2 translate-y-2 font-serif text-2xl font-medium tracking-tight text-neutral-100 transition-transform duration-500 group-hover:translate-y-0 sm:text-3xl">
                  {facility.title}
                </h3>
                <p className="line-clamp-2 translate-y-4 font-sans text-sm leading-relaxed text-neutral-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base">
                  {facility.description}
                </p>
              </div>
            </facility.Animation>
          ))}
        </div>
      </div>
    </section>
  );
}
