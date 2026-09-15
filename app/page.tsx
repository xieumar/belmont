import {
  HotelHero,
  HotelAbout,
  ExclusiveFacilities,
  WhyChooseUs,
  FeaturedSuites,
  DiscoverDestinations,
  CallToAction,
} from "@/components/hotel";

export default function Home() {
  return (
    <div className="flex flex-col flex-0.5">
      <HotelHero />
      <HotelAbout />
      <FeaturedSuites />
      <ExclusiveFacilities />
      <DiscoverDestinations />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
}
