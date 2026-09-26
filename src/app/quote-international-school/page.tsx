import Hero from "./components/Hero";
import MapSection from "./components/MapSection";
import Cat4Section from "./components/Cat4Section";
import IseeSection from "./components/IseeSection";
import OoptSection from "./components/OoptSection";
import ComparisonSection from "./components/ComparisonSection";
import BeforeConsult from "./components/BeforeConsult";
import CustomQuoteCallout from "./components/CustomQuoteCallout";
import BackToLevelTest from "./components/BackToLevelTest";

// 카카오톡 상담사가 고객에게 국제학교 입학시험(MAP·CAT4·ISEE·OOPT) 구성을 안내할 때
// 링크로만 전달하는 비공개 페이지입니다. /quote와 같은 계열로, 홈/헤더/푸터/
// 사이트맵 어디에도 연결하지 않으며 검색 노출도 막아둡니다(아래 robots 설정).
// MAP·CAT4·ISEE·OOPT는 기존 /quote 페이지에 있던 것을 그대로 옮겨온 것이며
// 가격·구성은 변경하지 않았습니다(실제 값은 src/app/quote/data.ts 공유).
export const metadata = {
  title: "국제학교 입학시험 준비",
  description: "카카오톡 상담에서 안내하는 국제학교 입학시험(MAP·CAT4·ISEE·OOPT) 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote-international-school/" },
  openGraph: {
    title: "Blossom Books 국제학교 입학시험 준비",
    description: "카카오톡 상담에서 안내하는 국제학교 입학시험(MAP·CAT4·ISEE·OOPT) 구성표입니다.",
    url: "https://www.blossombooks.org/quote-international-school/",
    images: ["https://www.blossombooks.org/quote-international-school/opengraph-image"],
  },
};

export default function QuoteInternationalSchoolPage() {
  return (
    <div>
      <Hero />
      <MapSection />
      <Cat4Section />
      <IseeSection />
      <OoptSection />
      <ComparisonSection />
      <BeforeConsult />
      <CustomQuoteCallout />
      <BackToLevelTest />
    </div>
  );
}
