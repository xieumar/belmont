import {
  StaggerContainer,
  StaggerItem,
  SlideUp,
} from "@/components/ui/animations";
import { Room } from "@/data/rooms";

interface RoomPoliciesProps {
  room: Room;
}

export function RoomPolicies({ room }: RoomPoliciesProps) {
  if (!room.policies || room.policies.length === 0) return null;

  return (
    <section className="bg-neutral-50 px-6 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="mb-12 text-center">
          <SlideUp>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
              Hotel Policies
            </h2>
          </SlideUp>
        </StaggerContainer>

        <StaggerContainer className="mx-auto max-w-3xl bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-neutral-100">
          <ul className="flex flex-col gap-6">
            {room.policies.map((policy, index) => (
              <StaggerItem key={index}>
                <li className="flex items-center gap-4 border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-terra-400" />
                  <span className="font-sans text-lg text-neutral-700">
                    {policy}
                  </span>
                </li>
              </StaggerItem>
            ))}
          </ul>
        </StaggerContainer>
      </div>
    </section>
  );
}
