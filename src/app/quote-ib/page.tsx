import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import IbChips from "./IbChips";

// 카카오톡 상담사가 고객에게 "IB 문의"일 때 직접 링크로만 전달하는 비공개
// 구성·가격표입니다. 홈/헤더/푸터/사이트맵 어디에도 연결하지 않으며,
// 검색 노출도 막아둡니다(아래 robots 설정). 다른 /quote-* 페이지와 동일한
// 패턴입니다.
export const metadata = {
  title: "IB 교재 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 IB(International Baccalaureate) 교재 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote-ib/" },
  openGraph: {
    title: "Blossom Books IB 교재 구성 안내",
    description: "카카오톡 상담에서 안내하는 IB 교재 구성·가격표입니다.",
    url: "https://www.blossombooks.org/quote-ib/",
  },
};

export default function QuoteIbPage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        IB 교재 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[640px] text-[14.5px] leading-relaxed text-charcoal-600">
        Math AA·AI, Sciences, Economics, Business Management 등 IB DP 과목별 토픽 문제집부터 모의고사, IA·EE·TOK
        가이드, Command Terms 치트시트, MYP/브리지 교재까지 — 전부 Blossom Books가 직접 출제·제작하는
        Unofficial 교재입니다.
      </p>

      {/* 2. 카테고리/상품 선택 + 가격 */}
      <IbChips />

      {/* 3. 제작 전 확인 사항 */}
      <section className="mt-12 border border-ivory-300 bg-white p-6">
        <h2 className="font-display text-[16px] font-semibold text-navy-950">제작 전 확인 사항</h2>
        <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-charcoal-600">
          <li>· Math·Sciences 등은 과목별 Syllabus 개정 시점이 다릅니다. 현재 기준 버전으로 제작합니다.</li>
          <li>· 기출문제와 공식 Markscheme은 사용하지 않습니다. 단원·난이도·Command Terms만 참고하고, 문제와
            해설은 전부 새로 출제합니다(Unofficial).</li>
          <li>· IB 로고를 사용하지 않으며, 공식 교재처럼 보이는 표지를 쓰지 않습니다.</li>
        </ul>
      </section>

      {/* 4. CTA */}
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
