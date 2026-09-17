import {
  StaggerContainer,
  StaggerItem,
  SlideInLeft,
} from "@/components/ui/animations";
import Image from "next/image";

export function WellnessAndSpa() {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideInLeft className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:order-last">
            <Image
              src="/massage.jpg"
              alt="Spa and Wellness at Belmont"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </SlideInLeft>

          <StaggerContainer className="flex flex-col justify-center">
            <StaggerItem>
              <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-terra-500">
                Wellness & Spa
              </p>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-8 font-serif text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                Restore Your Balance
              </h2>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-neutral-600 sm:text-lg">
                <p>
                  Our tranquil wellness center is a sanctuary dedicated to your
                  rejuvenation. Escape the hustle and reconnect with your inner
                  peace through our curated selection of treatments and
                  therapies.
                </p>
                <p>
                  Indulge in a customized massage tailored to release tension
                  and soothe tired muscles, or unwind in our traditional cedar
                  sauna. The gentle heat and aromatic wood create an enveloping
                  experience that purifies the body and calms the mind.
                </p>
                <p>
                  Every element of our spa environment has been designed to
                  promote relaxation, from the hushed tones of the decor to the
                  expert touch of our therapists. Let us guide you on a journey
                  of complete renewal.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
