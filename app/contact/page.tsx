import { ContactHero, ContactInfo, ContactForm } from "@/components/contact";
import { HotelFAQ, CallToAction } from "@/components/hotel";
import { StaggerContainer } from "@/components/ui/animations";

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden bg-white">
      <ContactHero />

      <section className="px-6 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <ContactInfo />
            <ContactForm />
          </StaggerContainer>
        </div>
      </section>

      <HotelFAQ />
      <CallToAction />
    </div>
  );
}
