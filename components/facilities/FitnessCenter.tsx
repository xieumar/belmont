import {
  StaggerContainer,
  StaggerItem,
  SlideInLeft,
} from "@/components/ui/animations";
import Image from "next/image";

export function FitnessCenter() {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideInLeft className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:order-last">
            <Image
              src="/gym.jpg"
              alt="Belmont Fitness Center"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </SlideInLeft>

          <StaggerContainer className="flex flex-col justify-center">
            <StaggerItem>
              <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-terra-500">
                Fitness Center
              </p>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-8 font-serif text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                Stay Active
              </h2>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-neutral-600 sm:text-lg">
                <p>
                  Maintain your wellness routine in our state-of-the-art fitness
                  center. Bathed in natural light, the space is designed to
                  invigorate and inspire your workouts.
                </p>
                <p>
                  Equipped with top-tier cardiovascular machines, a
                  comprehensive selection of free weights, and dedicated spaces
                  for yoga or stretching, our gym caters to all levels of
                  fitness enthusiasts.
                </p>
                <p>
                  Whether you prefer an early morning run on the treadmill or an
                  evening strength training session, you&apos;ll find everything
                  you need to stay energized and focused during your stay at
                  Belmont.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
