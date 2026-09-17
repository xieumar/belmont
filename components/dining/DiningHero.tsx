import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";

export function DiningHero() {
  return (
    <section className="bg-background px-4 pb-4 pt-2 sm:px-8 sm:pb-6 sm:pt-4">
      <div className="relative mx-auto flex min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] w-full max-w-7xl flex-col justify-center overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-background p-6 sm:p-10 md:p-16 lg:p-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bar.jpg"
            alt="Belmont Dining"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>

        <StaggerContainer
          delay={0}
          className="relative z-10 max-w-3xl mt-4 sm:mt-8"
        >
          <StaggerItem>
            <p className="mb-4 sm:mb-6 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-terra-400">
              Gastronomy
            </p>
          </StaggerItem>

          <h1 className="mb-6 sm:mb-8 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <StaggerItem className="block">Savor the</StaggerItem>
            <StaggerItem className="block">Belmont Flavors</StaggerItem>
          </h1>

          <StaggerItem>
            <p className="max-w-2xl text-sm sm:text-base font-light leading-relaxed text-white/90 md:text-xl">
              Experience culinary excellence at our award-winning restaurants
              and bars. From locally sourced ingredients to internationally
              inspired menus, every dish is crafted to delight your senses.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
