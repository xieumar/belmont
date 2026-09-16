import Image from "next/image";
import {
  StaggerContainer,
  SlideUp,
  SlideInLeft,
  SlideInRight,
} from "@/components/ui/animations";

export function FacilitiesGallery() {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="mb-12 md:mb-20">
          <SlideUp>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl md:text-6xl text-center">
              A Closer Look
            </h2>
          </SlideUp>
        </StaggerContainer>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 auto-rows-[250px]">
          {/* Main Large Image (2x2) - Top Left */}
          <SlideInLeft className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 group">
            <Image
              src="/rooftopview.jpg"
              alt="Rooftop View"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInLeft>

          {/* Top Right 1 (1x1) */}
          <SlideInRight
            delay={0.1}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 group"
          >
            <Image
              src="/food.jpg"
              alt="Culinary Delights"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInRight>

          {/* Top Right 2 (1x1) */}
          <SlideInRight
            delay={0.2}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 group"
          >
            <Image
              src="/saunawomen.jpg"
              alt="Wellness Sauna"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInRight>

          {/* Middle Right Landscape (2x1) */}
          <SlideInRight
            delay={0.3}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-2 md:row-span-1 group"
          >
            <Image
              src="/restaurant.jpg"
              alt="Restaurant Interior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInRight>

          {/* Bottom Left Landscape (2x1) */}
          <SlideUp
            delay={0.1}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-2 md:row-span-1 group"
          >
            <Image
              src="/poolseats.jpg"
              alt="Poolside Seating"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideUp>

          {/* Bottom Right Landscape (2x1) */}
          <SlideUp
            delay={0.2}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-2 md:row-span-1 group"
          >
            <Image
              src="/poolview.jpg"
              alt="Pool View"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideUp>
        </div>
      </div>
    </section>
  );
}
