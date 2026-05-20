import HeroSection from "@/pages/home/HeroSection";
import WhoWeAreSection from "@/pages/home/sections/WhoWeAreSection";
import ProblemStatementSection from "@/pages/home/sections/ProblemStatementSection";
import OurSolutionSection from "@/pages/home/sections/OurSolutionSection";
import FeaturesOverviewSection from "@/pages/home/sections/FeaturesOverviewSection";
import ImpactStatsSection from "@/pages/home/sections/ImpactStatsSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#02120d]/55 via-transparent to-[#04130f]/80"
        aria-hidden
      />

      <HeroSection />
      <WhoWeAreSection />
      <ProblemStatementSection />
      <OurSolutionSection />
      <FeaturesOverviewSection />
      <ImpactStatsSection />
    </div>
  );
}
