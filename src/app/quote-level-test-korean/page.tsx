import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import { products } from "@/data/products";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";
import KoreanSpellingSamples from "./KoreanSpellingSamples";
import { koreanDrillTiers } from "./koreanDrillBank";

// 국어 레벨테스트 전용으로 카카오톡 상담에서 직접 전달하는 비공개
// 구성·가격표입니다. 기존 /quote 페이지는 영어·국어·수학이 한 페이지에
// 섞여 있어, 과목별로 따로 보낼 수 있도록 분리했습니다(국어판). 홈/헤더/
// 푸터/사이트맵/다른 /quote-* 페이지 어디와도 연결하지 않으며, 검색
// 노출도 막아둡니다(아래 robots 설정). 가격은 공용 volumeOptions 단가를
// 그대로 사용합니다.
export const metadata = {
  title: "국어 레벨테스트 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 국어 문해력 레벨테스트 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-level-test-korean/" },
  openGraph: {
    title: "Blossom Books 국어 레벨테스트 구성 안내",
    description: "카카오톡 상담에서 안내하는 국어 문해력 레벨테스트 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-level-test-korean/",
    images: ["https://blossombooks.org/quote-level-test-korean/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const product = products.find((p) => p.id === "korean-literacy-level-test")!;

// 맞춤법·받아쓰기 드릴(보조 상품) — 본 교재(국어 문해력)와 별도로 구매
// 가능한 맞춤법·띄어쓰기 반복 연습용 교재입니다. 영어 레벨테스트 단어
// 문제집과 동일한 분량·가격 구조(40P/60P/100P)를 사용합니다.
const drillVolumes = [
  { label: "40P", priceKRW: 60000 },
  { label: "60P", priceKRW: 80000 },
  { label: "100P", priceKRW: 120000 },
];

export default function QuoteLevelTestKoreanPage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음 · 국어 레벨테스트 전용
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        국어 레벨테스트 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">{product.descriptionKo}</p>
      <p className="mt-2 text-[12.5px] text-charcoal-600/80">
        평가 영역: {product.units.join(" · ")} · 대상: {product.gradeRange}
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
          학교·기관 기출이 아닌 국어 문해력 전문 선생님이 직접 제작한 지문으로 구성됩니다. 정답과 상세
          해설이 포함됩니다.
        </p>
      </section>

      {/* 3. 실제 샘플 미리보기 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">실제 샘플 문제집 미리보기</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          실제 교재에서 발췌한 샘플 페이지입니다. 표지가 아니라 문제로 직접 확인하세요.
        </p>
        <div className="mt-5 max-w-sm border border-ivory-300 bg-white p-5">
          <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{product.gradeRange}</p>
          <p className="mt-1.5 font-display text-[16px] font-semibold text-navy-950">{product.titleKo}</p>
          <div className="mt-4">
            <SamplePreviewButton product={product} />
          </div>
        </div>
      </section>

      {/* 3.5. 맞춤법·받아쓰기 드릴 — 본 교재와 별도 판매하는 학년별 시리즈 보조 상품 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">국어 레벨테스트 맞춤법·받아쓰기 드릴</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          본 교재(국어 문해력)와 별도로 구매하실 수 있는, 학원용 레벨테스트 대비 맞춤법·받아쓰기 드릴입니다.
          7세 후반(한글 뗀 뒤)부터 초5~6까지 5단계 시리즈이며, 받아쓰기 수요가 몰려 있는 초1~초2까지는
          &ldquo;받아쓰기&rdquo;, 초3부터는 띄어쓰기·헷갈리는 말 중심의 &ldquo;맞춤법 드릴&rdquo;로 구성이
          바뀝니다. 지원 학원의 출제 범위가 있는 경우 해당 범위에 맞춰 학원별 맞춤 제작도 가능합니다.
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
              {drillVolumes.map((v) => (
                <tr key={v.label}>
                  <td className={cellCls}>{v.label} 맞춤법·받아쓰기 드릴 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          위 가격은 전 단계(7세 후반~초5·6) 공통이며, 단계별로 별도 교재로 제작됩니다. 정답과 함께 한글
          상세 해설이 포함됩니다.
        </p>

        <div className="mt-8 space-y-8">
          {koreanDrillTiers.map((tier) => (
            <div key={tier.key} className="border-t border-ivory-300 pt-6">
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">
                  {tier.label}
                </span>
                <span className="border border-navy-800/20 px-2 py-0.5 font-label text-[9.5px] uppercase tracking-[0.1em] text-navy-800/70">
                  {tier.categoryLabel}
                </span>
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-charcoal-700">{tier.content}</p>
              {tier.hasParentScript && (
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-charcoal-600/70">
                  PDF 교재 특성상 학부모님이 직접 불러주시는 방식이며, 해설집 앞쪽에 불러주기 대본이
                  포함됩니다.
                </p>
              )}
              <KoreanSpellingSamples items={tier.items} idPrefix={tier.key} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학생 수·학년 구성이나 반 배정 기준에 맞춰 난이도·분량을 조정해드릴 수 있습니다. 필요한 구성을
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
