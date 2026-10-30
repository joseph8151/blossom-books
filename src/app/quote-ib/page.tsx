import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import Hero from "./components/Hero";
import SubjectGrid from "./components/SubjectGrid";
import MockTestSection from "./components/MockTestSection";
import CoreGuidesSection from "./components/CoreGuidesSection";
import MiniPacksSection from "./components/MiniPacksSection";
import ExtendedLineSection from "./components/ExtendedLineSection";
import InquiryForm from "./components/InquiryForm";
import IbFaqSection from "./components/IbFaqSection";

// 카카오톡 상담사가 고객에게 "IB 문의"일 때 직접 링크로만 전달하는 비공개
// 구성·가격표입니다. 홈/헤더/푸터/사이트맵 어디에도 연결하지 않으며,
// 검색 노출도 막아둡니다(아래 robots 설정). 다른 /quote-* 페이지와 동일한
// 패턴입니다.
//
// 상품 구조: A(IB 맞춤 문제집, 메인) · B(모의고사) · C(Core 과제 가이드) ·
// D(저가 입문·보조 상품) · E(확장 라인). 모든 카드에 실제 샘플이 연결되며,
// 샘플은 전부 Blossom Books가 독립 제작한 예시입니다(기출·Markscheme 복제 금지).
export const metadata = {
  title: "IB 교재 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 IB(International Baccalaureate) 교재 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-ib/" },
  openGraph: {
    title: "Blossom Books IB 교재 구성 안내",
    description: "카카오톡 상담에서 안내하는 IB 교재 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-ib/",
  },
};

export default function QuoteIbPage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      <Hero />
      <SubjectGrid />
      <MockTestSection />
      <CoreGuidesSection />
      <MiniPacksSection />
      <ExtendedLineSection />
      <IbFaqSection />
      <InquiryForm />

      {/* 제작 전 확인 사항 / 저작권 */}
      <section className="mt-16 border border-ivory-300 bg-white p-6">
        <h2 className="font-display text-[16px] font-semibold text-navy-950">제작 전 확인 사항</h2>
        <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-charcoal-600">
          <li>· Math·Sciences 등은 과목별 Syllabus 개정 시점이 다릅니다. 현재 기준 버전으로 제작합니다.</li>
          <li>· 실제 Past Paper와 공식 Markscheme을 복제하지 않습니다. 단원·주제·일반적인 학습 목표만 참고하고,
            문제와 해설은 전부 새로 출제합니다(Unofficial).</li>
          <li>· IB 로고를 사용하지 않으며, 공식 IB 교재처럼 보이게 만들지 않습니다.</li>
        </ul>
        <p className="mt-4 border-t border-ivory-300 pt-3 text-[11.5px] leading-relaxed text-charcoal-600/70">
          Independently created by Blossom Books. Unofficial study material. Not affiliated with or endorsed by
          the International Baccalaureate Organization.
        </p>
      </section>

      {/* 최종 CTA */}
      <div className="mt-[72px] border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 IB 교재 문의하기
        </a>
      </div>
    </div>
  );
}
