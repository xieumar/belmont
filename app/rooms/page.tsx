import { RoomsHero, RoomList } from "@/components/rooms";
import { CallToAction } from "@/components/hotel";

export default function RoomsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <RoomsHero />
      <RoomList />
      <CallToAction />
    </div>
  );
}
