import HeroSection from "@/components/home/HeroSection";
import CoreCategories from "@/components/home/CoreCategories";
import FindPrepPromo from "@/components/home/FindPrepPromo";
import WhyBlossom from "@/components/home/WhyBlossom";
import TestAlignment from "@/components/home/TestAlignment";
import QuestionToUnderstanding from "@/components/home/QuestionToUnderstanding";
import LevelAssessment from "@/components/home/LevelAssessment";
import LevelTestStatement from "@/components/home/LevelTestStatement";
import CollectionShowcase from "@/components/home/CollectionShowcase";
import EditorialStandards from "@/components/home/EditorialStandards";
import ResearchProcess from "@/components/home/ResearchProcess";
import QualityFeatures from "@/components/home/QualityFeatures";
import HowToOrder from "@/components/home/HowToOrder";
import PrepPricing from "@/components/home/PrepPricing";
import WhyCost from "@/components/home/WhyCost";
import CompareLevels from "@/components/home/CompareLevels";
import ExistingVsCustomSection from "@/components/home/ExistingVsCustomSection";
import UseCaseSection from "@/components/home/UseCaseSection";
import AudienceCards from "@/components/home/AudienceCards";
import SelectionExamples from "@/components/home/SelectionExamples";
import TrustSignals from "@/components/home/TrustSignals";
import BrandNumbers from "@/components/home/BrandNumbers";
import Testimonials from "@/components/home/Testimonials";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

// 홈페이지는 VALUE-FIRST → PRICE 퍼널로 구성합니다.
// Discover → Understand → Preview → (Trust) → How it works → Price → Ask/Purchase.
export default function HomePage() {
  return (
    <>
      {/* Discover — 무엇을 파는지 즉시 이해 (가격 미노출) */}
      <HeroSection />
      <CoreCategories />
      <FindPrepPromo />

      {/* Understand — 왜 우리 아이에게 필요한지 */}
      <WhyBlossom />
      <TestAlignment />

      {/* Preview — 문제 수준과 유형을 가격보다 먼저 */}
      <QuestionToUnderstanding />
      <CompareLevels />

      {/* Placement / Level Test — 별도 핵심 진입 강화 */}
      <LevelAssessment />
      <LevelTestStatement />

      {/* Trust — 검증 가능한 구조적 신뢰 */}
      <CollectionShowcase />
      <EditorialStandards />
      <ResearchProcess />
      <QualityFeatures />

      {/* How it works → Price (가치 이해 후 가격) */}
      <HowToOrder />
      <PrepPricing />
      <WhyCost />

      {/* Custom / Audience */}
      <ExistingVsCustomSection />
      <UseCaseSection />
      <AudienceCards />

      {/* Proof */}
      <SelectionExamples />
      <TrustSignals />
      <BrandNumbers />
      <Testimonials />

      {/* Ask or Purchase */}
      <ConsultationCTA />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
