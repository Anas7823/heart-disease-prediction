// Je compose la page d'accueil avec les sections narratives
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemStats } from "@/components/landing/ProblemStats";
import { TimelineSection } from "@/components/landing/TimelineSection";
import { ResultsPreview } from "@/components/landing/ResultsPreview";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProblemStats />
      <TimelineSection />
      <ResultsPreview />
      <div className="section-container pb-20">
        <MedicalDisclaimer />
      </div>
    </>
  );
}
