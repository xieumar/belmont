import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";

export function DiningHero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 sm:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bar.jpg"
          alt="Belmont Dining"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.15]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <StaggerContainer
        delay={0}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <StaggerItem>
          <p className="mb-6 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-terra-500">
            Gastronomy
          </p>
        </StaggerItem>

        <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
          <StaggerItem className="block">Savor the</StaggerItem>
          <StaggerItem className="block">Belmont Flavors</StaggerItem>
        </h1>

        <StaggerItem>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Experience culinary excellence at our award-winning restaurants and
            bars. From locally sourced ingredients to internationally inspired
            menus, every dish is crafted to delight your senses.
          </p>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
