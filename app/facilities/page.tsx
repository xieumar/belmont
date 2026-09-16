import {
  FacilitiesHero,
  WellnessAndSpa,
  PoolsideRetreat,
  FitnessCenter,
  DiningAndLounge,
  FacilitiesGallery,
} from "@/components/facilities";
import { CallToAction } from "@/components/hotel";

export default function FacilitiesPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <FacilitiesHero />
      <WellnessAndSpa />
      <PoolsideRetreat />
      <FitnessCenter />
      <DiningAndLounge />
      <FacilitiesGallery />
      <CallToAction />
    </div>
  );
}
