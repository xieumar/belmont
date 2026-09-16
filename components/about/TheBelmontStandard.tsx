import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { CheckCircle2, Feather, HeartHandshake, MapPin } from "lucide-react";

const standards = [
  {
    title: "Well Considered",
    description: "Nothing is there just for show.",
    icon: CheckCircle2,
  },
  {
    title: "Easy Comfort",
    description: "Spaces that make settling in effortless.",
    icon: Feather,
  },
  {
    title: "Thoughtful Service",
    description: "Present when needed, never overbearing.",
    icon: HeartHandshake,
  },
  {
    title: "Good Location",
    description: "Conveniently placed for work, dining, and exploring.",
    icon: MapPin,
  },
];

export default function TheBelmontStandard() {
  return (
    <section className="bg-terra-100 px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="mb-16 text-center">
          <StaggerItem>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
              The Belmont Standard
            </h2>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((standard, index) => {
            const Icon = standard.icon;
            return (
              <StaggerItem
                key={index}
                className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-terra-100">
                  <Icon className="h-6 w-6 text-terra-600" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-medium text-neutral-900">
                  {standard.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-neutral-600">
                  {standard.description}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
