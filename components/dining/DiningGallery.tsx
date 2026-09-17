import {
  StaggerContainer,
  SlideUp,
  SlideInLeft,
  SlideInRight,
} from "@/components/ui/animations";
import Image from "next/image";

export function DiningGallery() {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="mb-12 md:mb-20 text-center">
          <SlideUp>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              Culinary Moments
            </h2>
          </SlideUp>
          <SlideUp delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-neutral-600">
              A feast for the eyes and the palate. Discover the vibrant dishes
              and stunning spaces that define Belmont&apos;s dining experience.
            </p>
          </SlideUp>
        </StaggerContainer>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 auto-rows-[250px]">
          {/* Top Left (2x2) */}
          <SlideInLeft className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 group">
            <Image
              src="/buffet.jpg"
              alt="Grand Buffet"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInLeft>

          {/* Top Right 1 (1x1) */}
          <SlideInRight
            delay={0.1}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 group"
          >
            <Image
              src="/chicken-veggies.jpg"
              alt="Chicken and Veggies"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInRight>

          {/* Top Right 2 (1x1) */}
          <SlideInRight
            delay={0.2}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 group"
          >
            <Image
              src="/dumplings.jpg"
              alt="Steamed Dumplings"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
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
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInRight>

          {/* Bottom Left Portrait (1x1) */}
          <SlideUp
            delay={0.1}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 group"
          >
            <Image
              src="/sushi.jpg"
              alt="Fresh Sushi"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideUp>

          {/* Bottom Middle Landscape (2x1) */}
          <SlideUp
            delay={0.2}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-2 md:row-span-1 group"
          >
            <Image
              src="/food.jpg"
              alt="Gourmet Food"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideUp>

          {/* Bottom Right Portrait (1x1) */}
          <SlideInRight
            delay={0.3}
            className="relative w-full h-full overflow-hidden rounded-3xl md:col-span-1 md:row-span-1 group"
          >
            <Image
              src="/english-breakfast.jpg"
              alt="English Breakfast"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}
