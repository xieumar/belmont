import {
  StaggerContainer,
  StaggerItem,
  SlideInRight,
} from "@/components/ui/animations";
import Image from "next/image";

export function PoolsideRetreat() {
  return (
    <section className="bg-terra-50 px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideInRight className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            <Image
              src="/poolside_tropical.jpg"
              alt="Belmont Tropical Poolside"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </SlideInRight>

          <StaggerContainer className="flex flex-col justify-center">
            <StaggerItem>
              <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-terra-500">
                Poolside Retreat
              </p>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-8 font-serif text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                A Tropical Oasis
              </h2>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-neutral-600 sm:text-lg">
                <p>
                  Immerse yourself in our stunning outdoor pool area, framed by
                  lush tropical foliage and thoughtfully designed for both
                  relaxation and socializing.
                </p>
                <p>
                  Lounge on our plush sunbeds under the shade of swaying palms,
                  or take a refreshing dip in the crystal-clear waters. The
                  poolside service ensures that your favorite chilled beverage
                  or light snack is always just a nod away.
                </p>
                <p>
                  As the sun sets, the atmosphere transforms. The pool
                  illuminates with a soft, inviting glow, creating a magical
                  setting for evening gatherings or quiet contemplation under
                  the stars.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
