import Image from "next/image";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";

export function HotelHero() {
  return (
    <section className="bg-background px-4 pb-4 pt-2 sm:px-8 sm:pb-6 sm:pt-4">
      <div className="relative mx-auto flex min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] w-full max-w-7xl flex-col justify-between overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-background p-6 sm:p-10 md:p-16 lg:p-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Belmont Resort exterior with pool"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlay to ensure text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent sm:from-black/60 sm:via-black/30" />
        </div>

        {/* Top Content (Headline & Subhead) */}
        <StaggerContainer
          delay={0}
          className="relative z-10 max-w-2xl mt-4 sm:mt-8"
        >
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5.5rem]">
            <StaggerItem className="block">Unwind in a</StaggerItem>
            <StaggerItem className="block">Dreamy</StaggerItem>
            <StaggerItem className="block">Seaside Haven</StaggerItem>
          </h1>
          <StaggerItem>
            <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base font-light leading-relaxed text-white/90 md:text-lg">
              Indulge in the epitome of coastal living as you discover the
              breathtaking beauty and unparalleled tranquility of{" "}
              <span className="font-medium text-white">Belmont</span>
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Content (Partners) */}
        <StaggerContainer className="relative z-10 mt-16 sm:mt-auto pt-10 sm:pt-16">
          <StaggerItem>
            <p className="mb-2 text-xs sm:text-sm font-medium text-white/90">
              Available for
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex flex-wrap items-center gap-4 text-white sm:gap-8">
              {/* Partner logos as stylized text/SVG to match the inspiration */}
              <div className="flex items-center gap-1 font-sans text-lg sm:text-2xl font-medium tracking-tight">
                traveloka
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 fill-current opacity-90"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.5L14.7 8.5H21L16 12.5L18 19L12 15L6 19L8 12.5L3 8.5H9.3L12 2.5Z" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 font-sans text-lg sm:text-2xl font-medium tracking-tight">
                tiket
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white" />
                com
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
