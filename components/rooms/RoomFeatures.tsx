import {
  StaggerContainer,
  StaggerItem,
  SlideUp,
} from "@/components/ui/animations";
import { Room } from "@/data/rooms";
import { Check } from "lucide-react";

interface RoomFeaturesProps {
  room: Room;
}

export function RoomFeatures({ room }: RoomFeaturesProps) {
  return (
    <section className="bg-white px-6 py-24 sm:px-8 md:py-32 border-t border-neutral-100">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="mb-16 text-center">
          <SlideUp>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
              Features & Services
            </h2>
          </SlideUp>
        </StaggerContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {room.features.map((featureGroup, index) => (
            <StaggerContainer key={index} className="flex flex-col gap-6">
              <StaggerItem>
                <h3 className="font-serif text-xl font-medium text-neutral-900 border-b border-neutral-200 pb-3">
                  {featureGroup.category}
                </h3>
              </StaggerItem>
              <ul className="flex flex-col gap-4">
                {featureGroup.items.map((item, itemIndex) => (
                  <StaggerItem key={itemIndex}>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex shrink-0 text-terra-500">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="font-sans text-neutral-600">{item}</span>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          ))}

          {/* Services Section */}
          {room.services && room.services.length > 0 && (
            <StaggerContainer className="flex flex-col gap-6">
              <StaggerItem>
                <h3 className="font-serif text-xl font-medium text-neutral-900 border-b border-neutral-200 pb-3">
                  Included Services
                </h3>
              </StaggerItem>
              <ul className="flex flex-col gap-4">
                {room.services.map((service, index) => (
                  <StaggerItem key={index}>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex shrink-0 text-terra-500">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="font-sans text-neutral-600">
                        {service}
                      </span>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          )}
        </div>
      </div>
    </section>
  );
}
