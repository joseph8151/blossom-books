import QuoteHero from "./components/QuoteHero";
import ThreeSteps from "./components/ThreeSteps";
import BaseVolumes from "./components/BaseVolumes";
import VolumeGuide from "./components/VolumeGuide";
import LevelTestCards from "./components/LevelTestCards";
import SpecialPackage from "./components/SpecialPackage";
import ExamConfigurations from "./components/ExamConfigurations";
import ComboPackages from "./components/ComboPackages";
import IncludedSection from "./components/IncludedSection";
import CustomQuoteSection from "./components/CustomQuoteSection";
import BeforeYouChat from "./components/BeforeYouChat";
import QuoteFAQ from "./components/QuoteFAQ";
import QuoteFinalCTA from "./components/QuoteFinalCTA";

// 카카오톡 상담사가 고객에게 "가격 물어볼 때" 직접 링크로만 전달하는 비공개
// Workbook Selection & Pricing Guide입니다. 홈/메뉴/푸터/사이트맵/교재 찾기
// 어디에도 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정).
export const metadata = {
  title: "구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 구성표입니다.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Blossom Books 구성 안내",
    description: "카카오톡 상담에서 안내하는 구성표입니다.",
  },
};

export default function QuotePage() {
  return (
    <div>
      <QuoteHero />
      <ThreeSteps />
      <BaseVolumes />
      <VolumeGuide />
      <LevelTestCards />
      <SpecialPackage />
      <ExamConfigurations />
      <ComboPackages />
      <IncludedSection />
      <CustomQuoteSection />
      <BeforeYouChat />
      <QuoteFAQ />
      <QuoteFinalCTA />
    </div>
  );
}
