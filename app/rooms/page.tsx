import { RoomsHero, RoomList, RoomsIntro } from "@/components/rooms";
import { CallToAction, HotelFeatures } from "@/components/hotel";
import { loadRoomsSearch } from "@/lib/booking/load-search";

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const roomsSearch = await loadRoomsSearch(await searchParams);

  return (
    <div className="flex flex-col flex-1 overflow-x-hidden bg-white">
      <RoomsHero />
      <HotelFeatures />
      <RoomsIntro />
      <RoomList roomsSearch={roomsSearch} />
      <CallToAction />
    </div>
  );
}
