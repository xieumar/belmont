import {
  StaggerContainer,
  StaggerItem,
  SlideInLeft,
} from "@/components/ui/animations";
import Image from "next/image";

export default function OurStory() {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideInLeft className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:order-last">
            <Image
              src="/resort.jpg"
              alt="The building of Belmont"
              fill
              className="object-cover"
            />
          </SlideInLeft>

          <StaggerContainer className="flex flex-col justify-center">
            <StaggerItem>
              <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-terra-500">
                Our Story
              </p>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-8 font-serif text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                Built With Intention
              </h2>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-neutral-600 sm:text-lg">
                <p>
                  Belmont wasn&apos;t conceived in a boardroom. It was born from
                  a simple desire: to create a refuge that feels as comfortable
                  as home but as majestic as the horizon.
                </p>
                <p>
                  Every stone laid, every window framed, and every pathway
                  carved into the landscape was thoughtfully designed to blur
                  the lines between indoors and out. We wanted the architecture
                  to yield to nature, allowing the coastal breeze and natural
                  light to become part of the interior experience.
                </p>
                <p>
                  From the curated materials that age beautifully with time to
                  the intuitive layout of our spaces, every detail at Belmont
                  serves a singular purpose—to make your stay profoundly
                  peaceful.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
