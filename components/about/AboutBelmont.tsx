import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Image from "next/image";

export default function AboutBelmont() {
  return (
    <section className="bg-background px-4 pb-4 pt-2 sm:px-8 sm:pb-6 sm:pt-4">
      <div className="relative mx-auto flex min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] w-full max-w-7xl flex-col justify-center overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-background p-6 sm:p-10 md:p-16 lg:p-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Belmont Atmosphere"
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
              About Belmont
            </p>
          </StaggerItem>

          <h1 className="mb-6 sm:mb-8 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <StaggerItem className="block">A Different</StaggerItem>
            <StaggerItem className="block">Kind of Stay</StaggerItem>
          </h1>

          <StaggerItem>
            <p className="max-w-2xl text-sm sm:text-base font-light leading-relaxed text-white/90 md:text-xl">
              Belmont is more than a destination; it&apos;s a feeling. Tucked
              away on the edge of the coastline, we designed a space that
              encourages you to slow down, breathe deeply, and reconnect with
              the quiet rhythm of nature. It&apos;s understated luxury, crafted
              for those who seek solace without sacrificing sophistication.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
