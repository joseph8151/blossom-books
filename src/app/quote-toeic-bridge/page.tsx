import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import { products } from "@/data/products";
import ToeicBridgeSamples from "./ToeicBridgeSamples";

// TOEIC Bridge 문의에만 카카오톡으로 직접 전달하는 비공개 구성·가격표입니다.
// 홈/헤더/푸터/사이트맵/다른 /quote-* 페이지 어디와도 연결하지 않으며,
// 검색 노출도 막아둡니다(아래 robots 설정). 분량은 60P/100P/200P 3단계만
// 제공(300P 없음)하며, 공용 volumeOptions 단가를 그대로 사용합니다.
export const metadata = {
  title: "TOEIC Bridge 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 TOEIC Bridge 실전 문제집 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-toeic-bridge/" },
  openGraph: {
    title: "Blossom Books TOEIC Bridge 구성 안내",
    description: "카카오톡 상담에서 안내하는 TOEIC Bridge 실전 문제집 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-toeic-bridge/",
    images: ["https://blossombooks.org/quote-toeic-bridge/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const product = products.find((p) => p.id === "toeic-bridge-workbook")!;
const toeicVolumes = volumeOptions.filter((v) => v.pages !== 300);

export default function QuoteToeicBridgePage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        TOEIC Bridge 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">{product.descriptionKo}</p>
      <p className="mt-2 text-[12.5px] text-charcoal-600/80">
        평가 영역: {product.units.join(" · ")} · 대상: {product.gradeRange}
      </p>

      {/* 2. 가격표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">60P / 100P / 200P 중 선택하실 수 있습니다.</p>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {toeicVolumes.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 모의고사 리스닝 음원(MP3), 한글 상세 해설이 포함됩니다.
        </p>
      </section>

      {/* 3. 샘플 문항 — 유형별 4문항 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">TOEIC Bridge 샘플 문항</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          Listening·Reading 각 2개 유형, 총 4문항입니다. TOEIC Bridge는 비즈니스 영어보다 일상 상황 중심의
          쉬운 어휘와 문장으로 출제되는 입문 시험입니다.
        </p>
        <ToeicBridgeSamples />
      </section>

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        처음 공인시험을 준비하는 학생도 부담 없이 시작할 수 있는 구성입니다. 필요한 분량을 카카오톡으로
        편하게 문의해 주세요.
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
