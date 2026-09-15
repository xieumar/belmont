import {
  HotelHero,
  HotelAbout,
  ExclusiveFacilities,
  SpecialOffers,
  DiscoverDestinations,
  HotelFeatures,
} from "@/components/hotel";

export default function Home() {
  return (
    <div className="flex flex-col flex-0.5">
      <HotelHero />
      <HotelAbout />
      <HotelFeatures />
      <ExclusiveFacilities />
      <SpecialOffers />
      <DiscoverDestinations />
    </div>
  );
}
