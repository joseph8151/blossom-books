import Hero from "./components/Hero";
import AdmissionPlanStrip from "./components/AdmissionPlanStrip";
import WhySchoolSpecific from "./components/WhySchoolSpecific";
import PackageBreakdown from "./components/PackageBreakdown";
import AdmissionsDesk from "./components/AdmissionsDesk";
import PricingTable from "./components/PricingTable";
import SchoolFinder from "./components/SchoolFinder";
import StudentExamples from "./components/StudentExamples";
import DeliveryFiles from "./components/DeliveryFiles";
import Disclaimers from "./components/Disclaimers";
import FinalConsultSection from "./components/FinalConsultSection";
import MobileStickyCTA from "./components/MobileStickyCTA";

// 상담 고객에게 직접 링크로 전달하는 독립 랜딩페이지입니다. 홈페이지
// 메인 내비게이션(src/data/site.ts의 primaryNav)에는 올리지 않으며,
// 다른 /quote-* 페이지와 달리 검색엔진 노출은 막지 않습니다(SEO 요청에
// 따라 noindex를 넣지 않음). /quote-links에는 작은 텍스트 링크 하나만
// 추가되어 있습니다.
export const metadata = {
  // title.absolute: 루트 레이아웃의 title 템플릿("%s | 블러섬북스 Blossom
  // Books")이 뒤에 또 붙지 않도록 요청받은 메타 타이틀을 그대로 고정합니다.
  title: { absolute: "국제학교 입학 대비 Full Package | Blossom Books" },
  description:
    "국내외 국제학교와 외국인학교 지원 학생을 위한 학교별 맞춤 Admission Full Package. Reading, Writing, Math, Interview, MAP, CAT4, WIDA 등 지원 학교와 학년에 맞춰 구성합니다.",
  alternates: { canonical: "https://www.blossombooks.org/admission-full-package/" },
  openGraph: {
    title: "국제학교 입학 대비 Full Package | Blossom Books",
    description:
      "국내외 국제학교와 외국인학교 지원 학생을 위한 학교별 맞춤 Admission Full Package. Reading, Writing, Math, Interview, MAP, CAT4, WIDA 등 지원 학교와 학년에 맞춰 구성합니다.",
    url: "https://www.blossombooks.org/admission-full-package/",
  },
};

export default function AdmissionFullPackagePage() {
  return (
    <div className="pb-20 lg:pb-0">
      <Hero />
      <AdmissionPlanStrip />
      <WhySchoolSpecific />
      <PackageBreakdown />
      <AdmissionsDesk />
      <PricingTable />
      <SchoolFinder />
      <StudentExamples />
      <DeliveryFiles />
      <Disclaimers />
      <FinalConsultSection />
      <MobileStickyCTA />
    </div>
  );
}
