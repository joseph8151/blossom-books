import HeroSection from "@/components/home/HeroSection";
import AudienceCards from "@/components/home/AudienceCards";
import CategorySection from "@/components/home/CategorySection";
import ExistingVsCustomSection from "@/components/home/ExistingVsCustomSection";
import ResearchProcess from "@/components/home/ResearchProcess";
import QualityFeatures from "@/components/home/QualityFeatures";
import UseCaseSection from "@/components/home/UseCaseSection";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AudienceCards />
      <CategorySection />
      <ExistingVsCustomSection />
      <ResearchProcess />
      <QualityFeatures />
      <UseCaseSection />
      <ConsultationCTA />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
