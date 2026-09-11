import { HotelHero, ExclusiveFacilities } from "@/components/hotel";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HotelHero />
      <ExclusiveFacilities />
    </div>
  );
}
