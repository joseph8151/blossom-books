import HeroSection from "@/components/home/HeroSection";
import CoreCategories from "@/components/home/CoreCategories";
import Bestsellers from "@/components/home/Bestsellers";
import QuestionToUnderstanding from "@/components/home/QuestionToUnderstanding";
import CompareLevels from "@/components/home/CompareLevels";
import FindPrepPromo from "@/components/home/FindPrepPromo";
import Testimonials from "@/components/home/Testimonials";
import TrustSignals from "@/components/home/TrustSignals";
import WhyBlossom from "@/components/home/WhyBlossom";
import FromClassroomToWorkbook from "@/components/home/FromClassroomToWorkbook";
import MeetTheEducators from "@/components/home/MeetTheEducators";
import TestAlignment from "@/components/home/TestAlignment";
import WhyCost from "@/components/home/WhyCost";
import EditorialStandards from "@/components/home/EditorialStandards";
import ResearchProcess from "@/components/home/ResearchProcess";
import QualityFeatures from "@/components/home/QualityFeatures";
import CollectionShowcase from "@/components/home/CollectionShowcase";
import LevelAssessment from "@/components/home/LevelAssessment";
import CurriculumMap from "@/components/home/CurriculumMap";
import LevelTestStatement from "@/components/home/LevelTestStatement";
import ExistingVsCustomSection from "@/components/home/ExistingVsCustomSection";
import UseCaseSection from "@/components/home/UseCaseSection";
import AudienceCards from "@/components/home/AudienceCards";
import SelectionExamples from "@/components/home/SelectionExamples";
import BrandNumbers from "@/components/home/BrandNumbers";
import PrepPricing from "@/components/home/PrepPricing";
import QuoteCalculator from "@/components/home/QuoteCalculator";
import HowToOrder from "@/components/home/HowToOrder";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

// 홈페이지는 상품 발견·구매 전환 중심 퍼널로 구성합니다.
// Hero → 카테고리 → Best Sellers → Preview → 문제 해결 → Reviews →
// Why Blossom(브랜드·품질) → 전체 교재 관련 콘텐츠 → 가격 → How to Order →
// FAQ → Final CTA. 브랜드 철학/제작 프로세스 콘텐츠는 삭제하지 않고
// 상품 발견 동선보다 아래로 내렸습니다.
export default function HomePage() {
  return (
    <>
      {/* 상품 발견 — 무엇을 파는지, 가격이 얼마인지 바로 이해 */}
      <HeroSection />
      <CoreCategories />
      <Bestsellers />

      {/* Preview — 실제 문제 수준 확인 */}
      <QuestionToUnderstanding />
      <CompareLevels />

      {/* 문제 해결 — 어떤 교재가 맞는지 모를 때 */}
      <FindPrepPromo />

      {/* Reviews / 신뢰 */}
      <Testimonials />
      <TrustSignals />

      {/* Why Blossom — 브랜드·품질·제작 철학 (상품보다 아래로) */}
      <WhyBlossom />
      <FromClassroomToWorkbook />
      <MeetTheEducators />
      <TestAlignment />
      <WhyCost />
      <EditorialStandards />
      <ResearchProcess />
      <QualityFeatures />
      <CollectionShowcase />

      {/* 시험별 상세 콘텐츠 */}
      <LevelAssessment />
      <CurriculumMap />
      <LevelTestStatement />
      <ExistingVsCustomSection />
      <UseCaseSection />
      <AudienceCards />
      <SelectionExamples />
      <BrandNumbers />

      {/* 가격 */}
      <PrepPricing />
      <QuoteCalculator />

      {/* How to Order → FAQ → Final CTA */}
      <HowToOrder />
      <ConsultationCTA />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
