import {
  AboutBelmont,
  OurStory,
  TheBelmontStandard,
  InsideBelmont,
  StayAwhile,
} from "@/components/about";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <AboutBelmont />
      <OurStory />
      <TheBelmontStandard />
      <InsideBelmont />
      <StayAwhile />
    </div>
  );
}
