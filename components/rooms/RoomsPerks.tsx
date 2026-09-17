import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { Award, ChefHat, Utensils, LifeBuoy } from "lucide-react";

export function RoomsPerks() {
  const perks = [
    {
      icon: <Award className="h-8 w-8 stroke-[1.5]" />,
      title: "Luxury resort",
      subtitle: "Experience a unique stay.",
    },
    {
      icon: <ChefHat className="h-8 w-8 stroke-[1.5]" />,
      title: "Trained manpower",
      subtitle: "Dedicated meal courses.",
    },
    {
      icon: <Utensils className="h-8 w-8 stroke-[1.5]" />,
      title: "Dining restaurants",
      subtitle: "Discover a medley of flavours.",
    },
    {
      icon: <LifeBuoy className="h-8 w-8 stroke-[1.5]" />,
      title: "Swimming pool",
      subtitle: "Unwind and discover joy.",
    },
  ];

  return (
    <section className="bg-white px-6 py-16 sm:px-8 md:py-24 border-b border-neutral-100">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, index) => (
            <StaggerItem
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-terra-200 text-terra-500">
                {perk.icon}
              </div>
              <h3 className="mb-3 font-serif text-xl font-medium text-neutral-900">
                {perk.title}
              </h3>
              <p className="font-sans text-neutral-500">{perk.subtitle}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
