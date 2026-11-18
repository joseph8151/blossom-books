import QuoteHero from "./components/QuoteHero";
import LevelTestFlagship from "./components/LevelTestFlagship";
import GradeSamplePreview from "./components/GradeSamplePreview";
import LevelTestTwoStepPackage from "./components/LevelTestTwoStepPackage";
import ThreeSteps from "./components/ThreeSteps";
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
  alternates: { canonical: "https://blossombooks.org/quote/" },
  openGraph: {
    title: "Blossom Books 구성 안내",
    description: "카카오톡 상담에서 안내하는 구성표입니다.",
    url: "https://blossombooks.org/quote/",
    images: ["https://blossombooks.org/quote/opengraph-image"],
  },
};

// 레벨테스트 문제집이 실제 문의 비중이 가장 높은 대표 상품이므로 Hero 바로 다음에
// 배치하고(다른 시험과 동일 선상에 두지 않음), 가격표 바로 아래에 STANDARD(100P)
// → ADVANCED(200P) 2단계 구성을 강조하는 독립 섹션을 둡니다. MAP·CAT4·ISEE·
// Oxford Online Placement Test는 모두 /quote-international-school로 분리했고,
// 여기에는 그리로 넘어가는 작은 연결 섹션(InternationalSchoolConnector)만
// 남깁니다. 페이지가 너무 길다는 피드백으로(2026-11) 가격표(BaseVolumes)·
// 분량 가이드(VolumeGuide)·Special Package 섹션을 제거했습니다 — BaseVolumes·
// VolumeGuide는 LevelTestFlagship 가격표와 내용이 중복되었고, Special Package는
// 더 이상 운영하지 않는 구성입니다.
export default function QuotePage() {
  return (
    <div>
      <QuoteHero />
      <LevelTestFlagship />
      <GradeSamplePreview />
      <LevelTestTwoStepPackage />
      <ThreeSteps />
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
