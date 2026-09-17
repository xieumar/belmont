import {
  StaggerContainer,
  StaggerItem,
  SlideInRight,
} from "@/components/ui/animations";
import Image from "next/image";

export function FoodAndServices() {
  return (
    <section className="bg-background px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <StaggerContainer className="flex flex-col justify-center order-2 lg:order-1">
            <StaggerItem>
              <p className="mb-4 font-sans text-sm font-semibold uppercase tracking-widest text-terra-500">
                Food & Services
              </p>
            </StaggerItem>

            <StaggerItem>
              <h2 className="mb-8 font-serif text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                Culinary Excellence
              </h2>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-neutral-600 sm:text-lg">
                <p>
                  Immerse yourself in a culinary journey at Belmont, where our
                  expert chefs curate exquisite dishes blending international
                  flavors with local ingredients.
                </p>
                <p>
                  Enjoy our 24-hour room service for a private dining experience
                  in the comfort of your suite. Whether it&apos;s a late-night
                  snack or a romantic breakfast in bed, our impeccable service
                  is always available.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2 text-neutral-700">
                  <li>In-Room Dining Service (24/7)</li>
                  <li>Special Dietary & Allergen menus available</li>
                  <li>Private Event Catering</li>
                  <li>Sommelier Selected Wine Pairings</li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <SlideInRight className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] order-1 lg:order-2">
            <Image
              src="/lounge.jpg"
              alt="Food and Services"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}
