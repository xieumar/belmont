import { RoomsHero, RoomList, RoomsIntro } from "@/components/rooms";
import { CallToAction, HotelFeatures } from "@/components/hotel";

export default function RoomsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden bg-white">
      <RoomsHero />
      <HotelFeatures />
      <RoomsIntro />
      <RoomList />
      <CallToAction />
    </div>
  );
}
