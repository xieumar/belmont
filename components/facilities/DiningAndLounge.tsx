import {
  StaggerContainer,
  StaggerItem,
  SlideInLeft,
} from "@/components/ui/animations";
import Image from "next/image";

export function DiningAndLounge() {
  return (
    <section className="bg-neutral-900 px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SlideInLeft className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            <Image
              src="/bar.jpg"
              alt="Belmont Dining and Lounge"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </SlideInLeft>

          <StaggerContainer className="flex flex-col justify-center text-white">
            <StaggerItem>
              <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-terra-400">
                Dining & Lounge
              </p>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-8 font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl leading-[1.1]">
                Savor the Moment
              </h2>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-neutral-300 sm:text-lg">
                <p>
                  From sophisticated cocktails in the lounge to culinary
                  masterpieces in our restaurant, Belmont offers dining
                  experiences that delight the senses.
                </p>
                <p>
                  Our executive chef curates menus that highlight locally
                  sourced, seasonal ingredients, presenting globally inspired
                  dishes with a distinctive coastal flair.
                </p>
                <p>
                  Whether you&apos;re starting your morning with artisanal
                  coffee and fresh pastries or ending the evening with a rare
                  vintage and panoramic views, every meal is an event to
                  remember.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
