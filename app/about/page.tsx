import {
  AboutBelmont,
  OurStory,
  TheBelmontStandard,
  InsideBelmont,
} from "@/components/about";
import { CallToAction } from "@/components/hotel";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <AboutBelmont />
      <OurStory />
      <TheBelmontStandard />
      <InsideBelmont />
      <CallToAction />
    </div>
  );
}
