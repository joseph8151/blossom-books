import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import { products } from "@/data/products";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";
import EnglishVocabSamples from "./EnglishVocabSamples";

// 영어 레벨테스트(G1–G6) 전용으로 카카오톡 상담에서 직접 전달하는 비공개
// 구성·가격표입니다. 기존 /quote 페이지는 영어·국어·수학이 한 페이지에
// 섞여 있어, 과목별로 따로 보낼 수 있도록 분리했습니다(영어판). 홈/헤더/
// 푸터/사이트맵/다른 /quote-* 페이지 어디와도 연결하지 않으며, 검색
// 노출도 막아둡니다(아래 robots 설정). 본 교재 가격은 공용 volumeOptions
// 단가를 그대로 사용합니다. 추가로, 본 교재와 별도로 판매하는 단어
// 문제집(40P/60P/100P) 섹션을 포함합니다.
export const metadata = {
  title: "영어 레벨테스트 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 영어 레벨테스트(G1–G6) 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-level-test-english/" },
  openGraph: {
    title: "Blossom Books 영어 레벨테스트 구성 안내",
    description: "카카오톡 상담에서 안내하는 영어 레벨테스트(G1–G6) 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-level-test-english/",
    images: ["https://blossombooks.org/quote-level-test-english/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const GRADE_IDS = [
  "english-level-test-g1",
  "english-level-test-g2",
  "english-level-test-g3",
  "english-level-test-g4",
  "english-level-test-g5",
  "english-level-test-g6",
];
const gradeProducts = GRADE_IDS.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

// 단어 문제집(보조 상품) — 본 교재(Reading·Vocabulary·Grammar·Writing 통합)와
// 별도로 구매 가능한 어휘 전용 교재입니다. 분량이 늘수록 쪽당 단가가
// 내려가는 구조이며(40P 1,500원/쪽 → 100P 1,200원/쪽), 같은 100P 기준으로도
// 본 교재보다 낮게 책정했습니다.
const vocabVolumes = [
  { label: "40P", priceKRW: 60000 },
  { label: "60P", priceKRW: 80000 },
  { label: "100P", priceKRW: 120000 },
];

export default function QuoteLevelTestEnglishPage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음 · 영어 레벨테스트 전용
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        영어 레벨테스트 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">
        학원·학교 자체 영어 레벨테스트(반 배정·입학 테스트) 대비 문제집입니다. Reading · Vocabulary ·
        Grammar · Writing 4개 영역을 학년(G1–G6)에 맞춰 구성하며, 학년이 올라갈수록 SR(Reading Level)과
        문항 난이도도 함께 올라갑니다.
      </p>

      {/* 2. 가격표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">60P / 100P / 200P / 300P 중 선택하실 수 있습니다.</p>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {volumeOptions.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 한글 상세 해설이 포함됩니다. 지원 학원·학교명을 알려주시면 해당 시험 유형에 맞춰
          구성을 안내해 드립니다.
        </p>
      </section>

      {/* 3. 학년별 실제 샘플 미리보기 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">학년별 실제 샘플 문제집 미리보기</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          학년을 골라 실제 교재에서 발췌한 샘플 페이지를 바로 확인하실 수 있습니다. 표지가 아니라 문제로
          직접 확인하세요.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {gradeProducts.map((p) => (
            <div key={p.id} className="border border-ivory-300 bg-white p-5">
              <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{p.gradeRange}</p>
              <p className="mt-1.5 font-display text-[16px] font-semibold text-navy-950">{p.titleKo}</p>
              <div className="mt-4">
                <SamplePreviewButton product={p} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 영어 레벨테스트 단어 문제집 — 본 교재와 별도 판매하는 보조 상품 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">영어 레벨테스트 단어 문제집</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          본 교재(Reading·Vocabulary·Grammar·Writing 통합)와 별도로 구매하실 수 있는 어휘 전용 교재입니다.
          동의어·반의어·접두사/접미사·문맥 어휘 문제로 구성됩니다.
        </p>
        <div className="mt-4 max-w-[560px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {vocabVolumes.map((v) => (
                <tr key={v.label}>
                  <td className={cellCls}>{v.label} 단어 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 한글 상세 해설이 포함됩니다. 아래는 샘플 문항입니다.
        </p>
        <EnglishVocabSamples />
      </section>

      {/* 5. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학생 수·학년 구성이나 반 배정 기준에 맞춰 난이도·분량을 조정해드릴 수 있습니다. 필요한 구성을
        카카오톡으로 편하게 문의해 주세요.
      </p>

      {/* 6. CTA */}
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
