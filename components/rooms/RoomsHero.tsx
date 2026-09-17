import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";

export function RoomsHero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 sm:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/room.jpg"
          alt="Belmont Rooms and Suites"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.2]"
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
            Accommodations
          </p>
        </StaggerItem>

        <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
          <StaggerItem className="block">Rooms & Suites</StaggerItem>
        </h1>

        <StaggerItem>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Retreat to unparalleled comfort and sophistication. Our rooms and
            suites offer stunning views, refined design, and thoughtful
            amenities to ensure your stay is extraordinary.
          </p>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
