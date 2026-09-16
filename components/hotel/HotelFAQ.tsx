import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  StaggerContainer,
  StaggerItem,
  SlideUp,
} from "@/components/ui/animations";

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in begins at 3:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be arranged with our concierge, subject to availability.",
  },
  {
    question: "Do you offer airport transfers?",
    answer:
      "Yes, we offer premium airport pickup and drop-off services in our luxury fleet. Please contact our concierge team at least 24 hours prior to your arrival to arrange transportation.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer:
      "It depends on the selected package. Our Special Offers and Premium Suites typically include a complimentary gourmet breakfast, while standard rates offer breakfast as an optional add-on.",
  },
  {
    question: "Are pets allowed at the resort?",
    answer:
      "We are proudly pet-friendly! We welcome well-behaved pets and even offer special pet amenities upon request. A standard deep-cleaning fee applies to all pet stays.",
  },
  {
    question: "Can I host a private event or wedding?",
    answer:
      "Absolutely. Our Grand Hall and Rooftop Terrace are perfect for exclusive events and weddings. We have an in-house events team ready to help curate your perfect day.",
  },
];

export function HotelFAQ() {
  return (
    <section className="bg-terra-400 px-6 py-16 sm:px-8 md:py-24 border-t border-terra-500/50">
      <div className="mx-auto w-full max-w-4xl">
        <StaggerContainer className="mb-12 text-center">
          <StaggerItem>
            <p className="mb-3 font-sans text-sm font-medium uppercase tracking-widest text-terra-100">
              Got Questions?
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
              Frequently Asked
              <br />
              Questions
            </h2>
          </StaggerItem>
        </StaggerContainer>

        <SlideUp delay={0.2}>
          <Accordion className="flex flex-col gap-4 w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="overflow-hidden rounded-2xl border border-terra-300 bg-terra-500 px-4 sm:px-8 data-open:bg-terra-600 transition-colors border-b-0"
              >
                <AccordionTrigger className="text-left font-serif text-xl font-medium text-neutral-100 hover:no-underline sm:text-2xl py-6 **:data-[slot=accordion-trigger-icon]:text-terra-200 **:data-[slot=accordion-trigger-icon]:size-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-base leading-relaxed text-terra-100 sm:text-lg pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SlideUp>
      </div>
    </section>
  );
}
