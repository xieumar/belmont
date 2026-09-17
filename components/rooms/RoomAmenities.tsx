import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { Room } from "@/data/rooms";
import { Check } from "lucide-react";

interface RoomAmenitiesProps {
  room: Room;
}

export function RoomAmenities({ room }: RoomAmenitiesProps) {
  // Flatten all features into a single list to display in two columns
  const allAmenities = room.features.flatMap((f) => f.items).slice(0, 8); // Just show the top 8 for clean layout

  return (
    <section className="bg-white px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          {/* Vertical divider on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-100 -translate-x-1/2" />

          {/* Left Column: Room Overview */}
          <StaggerContainer className="flex flex-col">
            <StaggerItem>
              <h2 className="mb-8 font-serif text-3xl font-medium tracking-tight text-neutral-900">
                Room overview
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="font-sans text-lg leading-relaxed text-neutral-500">
                {room.longDescription}
              </p>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Column: Amenities and comforts */}
          <StaggerContainer className="flex flex-col">
            <StaggerItem>
              <h3 className="mb-8 font-serif text-3xl font-medium tracking-tight text-neutral-900">
                Amenities and comforts
              </h3>
            </StaggerItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              {allAmenities.map((amenity, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F2EF] text-[#B09987]">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </div>
                    <span className="font-sans text-neutral-500">
                      {amenity}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
