import { notFound } from "next/navigation";
import { getRoomById } from "@/data/rooms";
import { RoomDetailHero, RoomAmenities, RoomGallery } from "@/components/rooms";
import { CallToAction } from "@/components/hotel";
import { loadRoomsSearch } from "@/lib/booking/load-search";

interface RoomDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function RoomDetailPage({
  params,
  searchParams,
}: RoomDetailPageProps) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  const roomsSearch = await loadRoomsSearch(await searchParams);

  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <RoomDetailHero room={room} roomsSearch={roomsSearch} />
      <RoomAmenities room={room} />
      <RoomGallery room={room} />
      <CallToAction />
    </div>
  );
}
