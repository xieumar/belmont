import {
  DiningHero,
  FoodAndServices,
  DiningMenu,
  DiningGallery,
} from "@/components/dining";
import { CallToAction } from "@/components/hotel";

export default function DiningPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <DiningHero />
      <FoodAndServices />
      <DiningMenu />
      <DiningGallery />
      <CallToAction />
    </div>
  );
}
