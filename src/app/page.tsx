import HeroSection from "@/components/home/HeroSection";
import IntroStrip from "@/components/home/IntroStrip";
import BusinessModelsOverview from "@/components/home/BusinessModelsOverview";
import ModelFinder from "@/components/home/ModelFinder";
import StartSmall from "@/components/home/StartSmall";
import TeacherToOwner from "@/components/home/TeacherToOwner";
import WhyJohn from "@/components/home/WhyJohn";
import OperatingSystem from "@/components/home/OperatingSystem";
import CurriculumEcosystem from "@/components/home/CurriculumEcosystem";
import ExistingAcademyOwners from "@/components/home/ExistingAcademyOwners";
import OwnerSupport from "@/components/home/OwnerSupport";
import WhoIsJohnFor from "@/components/home/WhoIsJohnFor";
import FranchiseProcess from "@/components/home/FranchiseProcess";
import FranchiseEconomics from "@/components/home/FranchiseEconomics";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

// 홈페이지 흐름: JOHN이 무엇인가 → 어떤 사업을 할 수 있나 → 나한테 맞는 모델은 →
// 본사가 무엇을 지원하나 → 작게 시작할 수 있나 → 기존 학원도 가능한가 → 어떻게 시작하나 → 상담 신청
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroStrip />

      <BusinessModelsOverview />
      <ModelFinder />

      <StartSmall />
      <TeacherToOwner />

      <WhyJohn />
      <OperatingSystem />
      <CurriculumEcosystem />

      <ExistingAcademyOwners />
      <OwnerSupport />
      <WhoIsJohnFor />

      <FranchiseProcess />
      <FranchiseEconomics />

      <FAQPreview />
      <FinalCTA />
    </>
  );
}
