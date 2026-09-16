import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";

export default function AboutBelmont() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 sm:px-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Belmont Atmosphere"
          fill
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
            About Belmont
          </p>
        </StaggerItem>

        <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
          <StaggerItem className="block">A Different</StaggerItem>
          <StaggerItem className="block">Kind of Stay</StaggerItem>
        </h1>

        <StaggerItem>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Belmont is more than a destination; it&apos;s a feeling. Tucked away
            on the edge of the coastline, we designed a space that encourages
            you to slow down, breathe deeply, and reconnect with the quiet
            rhythm of nature. It&apos;s understated luxury, crafted for those
            who seek solace without sacrificing sophistication.
          </p>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
