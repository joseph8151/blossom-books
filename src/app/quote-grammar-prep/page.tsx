import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { formatKRW } from "@/data/pricing";
import GrammarPrepSamples from "./GrammarPrepSamples";
import GrammarPrepReading from "./GrammarPrepReading";

// 초등 고학년 문법 완성(중등 준비) 학원 전용으로 카카오톡 상담에서
// 직접 전달하는 비공개 구성·가격표입니다. 홈/헤더/푸터/사이트맵/다른
// /quote-* 페이지 어디와도 연결하지 않으며, 검색 노출도 막아둡니다
// (아래 robots 설정). 매칭되는 실제 상품이 없어 가격은 40P 10만원을
// 기준으로, 다른 quote 페이지에서 쓰는 쪽당 단가 공식(60,000 +
// 1,000 × 페이지)을 그대로 적용해 60/100/200/300P를 계산했습니다.
export const metadata = {
  title: "초등 고학년 문법 완성(중등 준비) 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 초등 고학년 문법 완성(중등 준비) 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-grammar-prep/" },
  openGraph: {
    title: "Blossom Books 초등 고학년 문법 완성(중등 준비) 구성 안내",
    description: "카카오톡 상담에서 안내하는 초등 고학년 문법 완성(중등 준비) 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-grammar-prep/",
    images: ["https://blossombooks.org/quote-grammar-prep/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

// 40P 10만원을 기준으로 삼아, 다른 quote 페이지와 동일한 쪽당 단가
// 공식(60,000 + 1,000 × 페이지)으로 나머지 분량 가격을 균형 있게 맞췄습니다.
const grammarVolumes = [
  { label: "40P", priceKRW: 100000 },
  { label: "60P", priceKRW: 120000 },
  { label: "100P", priceKRW: 160000 },
  { label: "200P", priceKRW: 260000 },
  { label: "300P", priceKRW: 360000 },
];

export default function QuoteGrammarPrepPage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음 · 초등 고학년 문법 완성 전용
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        초등 고학년 문법 완성 — 중등 준비 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">
        초등 고학년(5~6학년)이 중등 영어로 넘어가기 전 반드시 정리해야 하는 핵심 문법·구문독해를 집중적으로
        연습하는 교재입니다. 관계대명사·수동태·현재완료·to부정사와 동명사 같은 문법은 한국 학원에서 익숙한
        &ldquo;수식어 걷어내고 S-V 찾기&rdquo;, &ldquo;문장 형식 구분&rdquo; 방식으로 구조를 분석하며
        연습하고, 독해는 중등 수준의 어휘와 문장 구조가 포함된 지문으로 난이도를 높여 구성했습니다.
      </p>

      {/* 2. 가격표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">40P / 60P / 100P / 200P / 300P 중 선택하실 수 있습니다.</p>
        <div className="mt-4 max-w-[560px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {grammarVolumes.map((v) => (
                <tr key={v.label}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 한글 상세 해설이 포함됩니다.
        </p>
      </section>

      {/* 3. 문법 샘플 문항 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">중등 준비 문법 샘플 문항</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          관계대명사·수동태·현재완료·to부정사/동명사 같은 기본 문법에 더해, 한국 학원에서 익숙한 방식대로
          문장 성분(S-V)과 문장 형식을 직접 분석하는 구문 문항, 그리고 내신형 문장 배열(어순 배열) 문항까지
          포함했습니다.
        </p>
        <GrammarPrepSamples />
      </section>

      {/* 3-1. 독해 샘플 문항 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">중등 준비 독해 샘플 문항</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          중등 수준의 어휘와 문장 구조를 담은 정보글 지문으로, Main Idea·Supporting Details·Inference·
          Vocabulary in Context 4개 유형을 연습합니다.
        </p>
        <GrammarPrepReading />
      </section>

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학생 수·학년 구성이나 반 배정 기준에 맞춰 단원 비중·난이도를 조정해드릴 수 있습니다. 필요한 구성을
        카카오톡으로 편하게 문의해 주세요.
      </p>

      {/* 5. CTA */}
      <div className="mt-10 border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 문의하기
        </a>
      </div>
    </div>
  );
}
