import { StaggerContainer, StaggerItem } from "@/components/ui/animations";

export function RoomsIntro() {
  return (
    <section className="bg-white px-6 pt-24 pb-12 sm:px-8 sm:pt-32 sm:pb-16">
      <div className="mx-auto max-w-4xl text-center">
        <StaggerContainer>
          <StaggerItem>
            <p className="mb-8 font-sans text-sm font-medium uppercase tracking-[0.2em] text-terra-500">
              Luxurious living lifestyle
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-3xl font-medium leading-[1.4] tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              Belmont hotels tells potential customers what they can expect when
              they visit a{" "}
              <span className="underline decoration-terra-300 decoration-[3px] underline-offset-[6px]">
                beautiful and luxurious 5-star sleeping experience
              </span>{" "}
              at a very affordable price.
            </h2>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
