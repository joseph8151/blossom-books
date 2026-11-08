import { MessageCircle, Sparkles, SlidersHorizontal, ListChecks, FileSearch, KeyRound } from "lucide-react";
import { siteConfig } from "@/data/site";
import { formatKRW } from "@/data/pricing";
import { products } from "@/data/products";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";

// SR 테스트 리딩 종합 문제집(주력 상품) 문의에만 카카오톡으로 직접 전달하는
// 비공개 구성·가격표입니다. 홈/헤더/푸터/사이트맵/다른 /quote-* 페이지 어디와도
// 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정). 이 페이지의
// 100P/200P/300P 가격은 공용 srVolumes(150/200/300P, pricing.ts)와는 별도로
// 상담에서만 안내하는 전용 구성이라 이 파일에 직접 정의합니다.
export const metadata = {
  title: "SR 테스트 리딩 종합 문제집 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 SR 테스트 리딩 종합 문제집(SR 1.0–12.0) 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-sr/" },
  openGraph: {
    title: "Blossom Books SR 테스트 리딩 구성 안내",
    description: "카카오톡 상담에서 안내하는 SR 테스트 리딩 종합 문제집(SR 1.0–12.0) 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-sr/",
    images: ["https://blossombooks.org/quote-sr/opengraph-image"],
  },
};

// 이 페이지 전용 분량·가격 — 공용 srVolumes(150/200/300P)와 별도로,
// 상담 전용 100P 진입 구성을 포함한 3단계.
const srQuoteVolumes = [
  { label: "100P", priceKRW: 150000, tier: "Starter", tierKo: "유형 처음 익히기" },
  { label: "200P", priceKRW: 250000, tier: "Complete", tierKo: "균형 있는 표준 대비", badge: "RECOMMENDED" },
  { label: "300P", priceKRW: 350000, tier: "Intensive", tierKo: "반복·심화까지 충분" },
];

// SR 테스트 단어 문제집 — 리딩 문제집과 별도로 판매하는 어휘 전용 보조
// 상품입니다. 리딩(100P 15만)보다 제작 공수가 적어 같은 100P 기준으로도
// 낮게 책정했고(12만, 리딩의 80% 선), 분량이 늘수록 쪽당 단가가 내려가는
// 구조는 리딩 상품과 동일하게 맞췄습니다(40P 1,500원/쪽 → 100P 1,200원/쪽).
const srVocabVolumes = [
  { label: "40P", priceKRW: 60000 },
  { label: "60P", priceKRW: 80000 },
  { label: "100P", priceKRW: 120000 },
];

const advantages = [
  {
    icon: Sparkles,
    title: "SR 1.0 ~ 12.0, 전 레벨 커버",
    desc: "초등 저학년부터 고등 상위 레벨까지 12개 레벨 전 구간을 다룹니다. 현재 SR 점수에 맞춰 바로 시작할 수 있습니다.",
  },
  {
    icon: ListChecks,
    title: "실제 SR 시험 유형 10종 전부 반영",
    desc: "Main Idea · Supporting Details · Inference · Vocabulary in Context · Author's Purpose · Text Structure · Sequence · Cause & Effect · Compare & Contrast · Summarizing — 한 권에 모두 담았습니다.",
  },
  {
    icon: SlidersHorizontal,
    title: "학생 수준에 맞춘 난이도 조절",
    desc: "같은 레벨이라도 지문 난이도를 단계적으로 배치해, 현재 수준에서 과하지도 부족하지도 않게 연습할 수 있습니다.",
  },
  {
    icon: KeyRound,
    title: "정답 + 한국어 상세해설",
    desc: "정답 근거를 지문에서 찾는 과정까지 한글로 상세히 설명해, 혼자 복습해도 왜 틀렸는지 이해할 수 있습니다.",
  },
];

const SR_PRODUCT_IDS = ["sr-reading-prep-g2-3", "sr-reading-prep-g4-5", "sr-reading-prep-g6-8"];
const srProducts = SR_PRODUCT_IDS.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

export default function QuoteSrPage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 bg-brass-500 px-3 py-1.5 font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-950">
          <Sparkles size={12} strokeWidth={2.4} /> Flagship
        </span>
        <span className="font-label text-[11px] uppercase tracking-[0.14em] text-charcoal-600/60">
          Blossom Books 주력 상품
        </span>
      </div>
      <h1 className="mt-4 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        SR 테스트 리딩 종합 문제집 — 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">
        가장 많은 학생이 찾는 SR(Reading Level) 대비 교재입니다. SR 1.0부터 12.0까지 전 레벨(총 12권)을
        제공하며, 실제 SR 독해에서 요구되는 10가지 문제 유형을 지문마다 반복 연습하도록 구성했습니다.
        레벨을 확인하신 뒤 카카오톡으로 문의해 주세요.
      </p>

      {/* 2. 화려한 그래픽 — SR 1.0~12.0 "12권" 가상 표지 쇼케이스 */}
      <section className="relative mt-10 overflow-hidden border border-navy-800/12 bg-navy-950 px-6 py-10 sm:px-9">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 right-[-8%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(173,138,78,0.26),transparent_65%)]" />
          <div className="absolute bottom-[-25%] left-[-6%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(176,106,60,0.16),transparent_65%)]" />
        </div>
        <div className="relative">
          <p className="font-label text-[10.5px] uppercase tracking-[0.16em] text-brass-500">SR 1.0 → SR 12.0 · 12 Levels</p>
          <p className="mt-1.5 font-display text-[19px] font-semibold text-ivory-100">레벨 하나하나가 별도 교재입니다</p>
          <div className="mt-7 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-12">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((lv) => (
              <BookCoverMockup
                key={lv}
                eyebrow="SR Reading"
                title={`${lv}.0`}
                subtitle="Level Test"
                tone={lv <= 4 ? "ivory" : lv <= 8 ? "brown" : "navy"}
                size="sm"
              />
            ))}
          </div>
          <p className="relative mt-6 max-w-[640px] text-[12.5px] leading-relaxed text-ivory-200/65">
            실제 교재 표지는 레벨·구성에 따라 달라질 수 있으며, 위 이미지는 레벨 범위를 보여주기 위한
            예시입니다. 실제 샘플 페이지는 아래에서 바로 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* 3. 장점 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">SR 테스트 리딩 종합 문제집의 장점</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {advantages.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3.5 border border-ivory-300 bg-white p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-brass-500/35 bg-brass-500/[0.07] text-brass-500">
                <Icon size={16} strokeWidth={2.2} />
              </span>
              <div>
                <p className="text-[14px] font-medium text-navy-950">{title}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 가격표 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">100P / 200P / 300P 중 선택하실 수 있습니다.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {srQuoteVolumes.map((v) => (
            <div
              key={v.label}
              className={`relative flex flex-col border p-6 ${
                v.badge ? "border-brass-500/60 bg-brass-500/[0.05] shadow-card" : "border-navy-800/12 bg-ivory-100"
              }`}
            >
              {v.badge && (
                <span className="absolute -top-3 left-6 bg-brass-500 px-2.5 py-1 font-label text-[9.5px] uppercase tracking-[0.14em] text-navy-950">
                  {v.badge}
                </span>
              )}
              <p className="font-display text-[28px] font-semibold leading-none text-navy-950">{v.label}</p>
              <p className="mt-2 font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{v.tier}</p>
              <p className="mt-1 text-[12.5px] text-charcoal-600">{v.tierKo}</p>
              <p className="mt-4 font-display text-[20px] font-semibold text-navy-950">{formatKRW(v.priceKRW)}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-charcoal-600/70">
          레벨(1.0~12.0)에 따른 분량별 단가는 동일합니다. 해외 결제(PayPal)는 카카오톡 상담 시 안내해 드립니다.
        </p>
      </section>

      {/* 4.5. SR 테스트 단어 문제집 — 리딩과 별도 구매 가능한 어휘 전용 보조 상품 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">SR 테스트 단어 문제집</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          리딩 문제집과 별도로 구매하실 수 있는 SR 어휘 전용 교재입니다. 문맥 어휘·동의어·빈칸 문제로
          구성되며, 레벨(1.0~12.0)별로 별도 교재로 제작됩니다.
        </p>
        <div className="mt-4 max-w-[560px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70">
                  구성
                </th>
                <th className="border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70">
                  가격
                </th>
              </tr>
            </thead>
            <tbody>
              {srVocabVolumes.map((v) => (
                <tr key={v.label}>
                  <td className="border border-ivory-300 px-4 py-3 text-[13.5px]">{v.label} 단어 문제집 + 해설집</td>
                  <td className="border border-ivory-300 px-4 py-3 text-[13.5px]">{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          문맥 어휘·동의어·빈칸 문제와 한국어 상세 해설이 포함됩니다. 리딩 문제집과 함께 구매를 원하시면
          카카오톡 상담 시 안내해 드립니다.
        </p>
      </section>

      {/* 5. 실제 샘플 미리보기 — 학년대별 3종 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">실제 샘플 문제집 미리보기</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          학년대별로 실제 교재에서 발췌한 샘플 페이지입니다. 표지가 아니라 문제로 직접 확인하세요.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {srProducts.map((p) => (
            <div key={p.id} className="border border-ivory-300 bg-white p-5">
              <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{p.readingLevel}</p>
              <p className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-navy-950">{p.titleKo}</p>
              <p className="mt-1 text-[11.5px] text-charcoal-600/70">{p.gradeRange}</p>
              <div className="mt-4">
                <SamplePreviewButton product={p} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA */}
      <div className="mt-14 border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 SR 레벨 문의하기
        </a>
        <p className="mx-auto mt-5 max-w-lg text-[12px] leading-relaxed text-charcoal-600/80">
          <FileSearch size={12} className="mr-1 inline-block align-[-1px] text-brass-500" />
          현재 SR 점수와 목표 레벨을 알려주시면 가장 적합한 분량을 안내해 드립니다.
        </p>
      </div>
    </div>
  );
}
