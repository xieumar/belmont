import { notFound } from "next/navigation";
import { getRoomById } from "@/data/rooms";
import { RoomDetailHero, RoomAmenities, RoomGallery } from "@/components/rooms";
import { CallToAction } from "@/components/hotel";

interface RoomDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { id } = await params;
  const room = getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <RoomDetailHero room={room} />
      <RoomAmenities room={room} />
      <RoomGallery room={room} />
      <CallToAction />
    </div>
  );
}
