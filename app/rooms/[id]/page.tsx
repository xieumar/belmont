import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRoomById } from "@/data/rooms";
import {
  RoomDetailHero,
  RoomAmenities,
  RoomGallery,
  RoomPolicies,
} from "@/components/rooms";
import { CallToAction } from "@/components/hotel";
import { loadRoomsSearch } from "@/lib/booking/load-search";

interface RoomDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: Pick<RoomDetailPageProps, "params">): Promise<Metadata> {
  const room = getRoomById((await params).id);
  if (!room) return { title: "Room not found | Belmont Hotel" };
  return {
    title: `${room.name} | Belmont Hotel`,
    description: room.shortDescription,
    openGraph: { images: [room.primaryImage] },
  };
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
      <RoomPolicies room={room} />
      <CallToAction />
    </div>
  );
}
