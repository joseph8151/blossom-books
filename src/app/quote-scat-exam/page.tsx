import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { products } from "@/data/products";
import SamplePreviewButton from "@/components/books/SamplePreviewButton";

// SCAT(School and College Ability Test) 문의에만 카카오톡으로 직접 전달하는
// 비공개 구성·가격표입니다. 홈/헤더/푸터/사이트맵 어디에도 연결하지 않으며,
// 검색 노출도 막아둡니다(아래 robots 설정). /quote-scat(사고력·영재 검사·
// 경시대회 전체)와는 별개로, SCAT 단일 시험만 레벨별로 안내하는 페이지입니다.
// 40P는 공용 단가표에 없는 분량이라, 기존 60/100/200/300P 단가의 산출 방식
// (₩90,000 + 페이지당 ₩1,000)을 그대로 적용해 40P = ₩130,000으로 계산했습니다.
// 정확한 금액은 사업자가 확인 후 조정할 수 있습니다.
export const metadata = {
  title: "SCAT 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 SCAT(School and College Ability Test) 레벨별 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-scat-exam/" },
  openGraph: {
    title: "Blossom Books SCAT 구성 안내",
    description: "카카오톡 상담에서 안내하는 SCAT 레벨별 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-scat-exam/",
    images: ["https://blossombooks.org/quote-scat-exam/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

// 공용 단가 산출식(₩90,000 + 페이지당 ₩1,000)을 40P에도 그대로 적용.
const scatVolumes = [
  { label: "40P", priceKRW: 130000 },
  { label: "60P", priceKRW: 150000 },
  { label: "100P", priceKRW: 190000 },
  { label: "200P", priceKRW: 290000 },
];

const LEVEL_IDS = ["scat-elementary", "scat-intermediate", "scat-advanced"];
const levelProducts = LEVEL_IDS.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

export default function QuoteScatExamPage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        SCAT 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">
        존스홉킨스 CTY 등 영재 프로그램 지원에 활용되는 SCAT의 평가 유형(Verbal Analogies·Quantitative
        Comparisons)을 참고해 독립 제작한 Elementary·Intermediate·Advanced 레벨별 예상 문제집입니다. 실제
        기출·유출 문제가 아닙니다.
      </p>

      {/* 2. 가격표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">40P / 60P / 100P / 200P 중 선택하실 수 있습니다.</p>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {scatVolumes.map((v) => (
                <tr key={v.label}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>₩{v.priceKRW.toLocaleString("ko-KR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          레벨(Elementary/Intermediate/Advanced)에 관계없이 분량별 단가는 동일합니다. 정답과 한글 상세
          해설이 포함됩니다.
        </p>
      </section>

      {/* 3. 레벨별 실제 샘플 미리보기 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">레벨별 실제 샘플 문제집 미리보기</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          실제 교재에서 발췌한 샘플 페이지입니다. 표지가 아니라 문제로 직접 확인하세요.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {levelProducts.map((p) => (
            <div key={p.id} className="border border-ivory-300 bg-white p-5">
              <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{p.gradeRange}</p>
              <p className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-navy-950">{p.titleKo}</p>
              <div className="mt-4">
                <SamplePreviewButton product={p} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학생의 학년과 지원 프로그램에 맞는 레벨을 안내해 드립니다. 필요한 구성을 카카오톡으로 편하게
        문의해 주세요.
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
          카카오톡으로 레벨 문의하기
        </a>
      </div>
    </div>
  );
}
