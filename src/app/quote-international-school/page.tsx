import { CategoryProvider } from "./CategoryContext";
import Hero from "./components/Hero";
import TestCategorySelector from "./components/TestCategorySelector";
import CategorySection from "./components/CategorySection";
import MapSection from "./components/MapSection";
import Cat4Section from "./components/Cat4Section";
import IseeSection from "./components/IseeSection";
import SsatSection from "./components/SsatSection";
import UkSchoolSection from "./components/UkSchoolSection";
import ProgressTestSection from "./components/ProgressTestSection";
import OoptSection from "./components/OoptSection";
import EnglishLanguageExtrasSection from "./components/EnglishLanguageExtrasSection";
import NgrtSection from "./components/NgrtSection";
import ComparisonSection from "./components/ComparisonSection";
import StageExplainerSection from "./components/StageExplainerSection";
import BeforeConsult from "./components/BeforeConsult";
import CustomQuoteCallout from "./components/CustomQuoteCallout";
import BackToLevelTest from "./components/BackToLevelTest";

// 카카오톡 상담사가 고객에게 국제학교·사립학교·영국계 학교 입학, 배치, 교내 진단·성취도
// 평가(MAP·CAT4·ISEE·SSAT·UKiset·ISEB·OOPT·TOEFL Junior·GL Progress Test Series·
// WIDA·NGRT) 구성을 안내할 때 링크로만 전달하는 비공개 페이지입니다. /quote와 같은
// 계열로, 홈/헤더/푸터/사이트맵 어디에도 연결하지 않으며 검색 노출도 막아둡니다
// (아래 robots 설정). SAT·GRE·TOEFL iBT 등 대입·대학원·성인 시험은 이 페이지에
// 포함하지 않습니다(별도 페이지 대상). 가격 정책이 없는 신규 시험(UKiset·ISEB·
// GL Progress Test Series·WIDA·NGRT)은 임의로 가격을 만들지 않고 "구성 문의"로
// 노출합니다 — 실제 가격 정책이 정해지면 각 컴포넌트에 가격 데이터만 추가하면 됩니다.
export const metadata = {
  title: "국제학교 입학·배치·교내 평가 준비",
  description:
    "카카오톡 상담에서 안내하는 국제학교·사립학교·영국계 학교 입학, 배치, 교내 진단·성취도 평가 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote-international-school/" },
  openGraph: {
    title: "Blossom Books 국제학교 입학·배치·교내 평가 준비",
    description:
      "카카오톡 상담에서 안내하는 국제학교·사립학교·영국계 학교 입학, 배치, 교내 진단·성취도 평가 구성표입니다.",
    url: "https://www.blossombooks.org/quote-international-school/",
    images: ["https://www.blossombooks.org/quote-international-school/opengraph-image"],
  },
};

export default function QuoteInternationalSchoolPage() {
  return (
    <CategoryProvider>
      <div>
        <Hero />
        <TestCategorySelector />

        <CategorySection id="international-school">
          <MapSection />
          <Cat4Section />
        </CategorySection>

        <CategorySection id="private-school">
          <IseeSection />
          <SsatSection />
        </CategorySection>

        <CategorySection id="uk-school">
          <UkSchoolSection />
        </CategorySection>

        <CategorySection id="school-progress">
          <ProgressTestSection />
        </CategorySection>

        <CategorySection id="english-placement">
          <OoptSection />
          <EnglishLanguageExtrasSection />
        </CategorySection>

        <CategorySection id="reading">
          <NgrtSection />
        </CategorySection>

        <ComparisonSection />
        <StageExplainerSection />
        <CustomQuoteCallout />
        <BeforeConsult />
        <BackToLevelTest />
      </div>
    </CategoryProvider>
  );
}
