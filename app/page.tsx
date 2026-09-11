import {
  HotelHero,
  ExclusiveFacilities,
  WhyChooseUs,
  FeaturedSuites,
  DiscoverDestinations,
} from "@/components/hotel";

export default function Home() {
  return (
    <div className="flex flex-col flex-0.5">
      <HotelHero />
      <FeaturedSuites />
      <ExclusiveFacilities />
      <DiscoverDestinations />
      <WhyChooseUs />
    </div>
  );
}
