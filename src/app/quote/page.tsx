import QuoteHero from "./components/QuoteHero";
import LevelTestFlagship from "./components/LevelTestFlagship";
import ThreeSteps from "./components/ThreeSteps";
import BaseVolumes from "./components/BaseVolumes";
import VolumeGuide from "./components/VolumeGuide";
import SpecialPackage from "./components/SpecialPackage";
import ExamConfigurations from "./components/ExamConfigurations";
import InternationalSchoolConnector from "./components/InternationalSchoolConnector";
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

// 레벨테스트 문제집이 실제 문의 비중이 가장 높은 대표 상품이므로 Hero 바로 다음에
// 배치하고(다른 시험과 동일 선상에 두지 않음), 그 뒤로 공통 3-Step 안내·기본 분량·
// 일반 분량 가이드가 이어진 다음 ISEE를 비교적 compact하게 둡니다. MAP·CAT4·
// Oxford Online Placement Test는 /quote-international-school로 분리했고,
// 여기에는 그리로 넘어가는 작은 연결 섹션(InternationalSchoolConnector)만 남깁니다.
export default function QuotePage() {
  return (
    <div>
      <QuoteHero />
      <LevelTestFlagship />
      <ThreeSteps />
      <BaseVolumes />
      <VolumeGuide />
      <SpecialPackage />
      <ExamConfigurations />
      <InternationalSchoolConnector />
      <ComboPackages />
      <IncludedSection />
      <CustomQuoteSection />
      <BeforeYouChat />
      <QuoteFAQ />
      <QuoteFinalCTA />
    </div>
  );
}
