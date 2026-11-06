import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import { products } from "@/data/products";
import WidaSamples from "./WidaSamples";

// WIDA ACCESS 문의에만 카카오톡으로 직접 전달하는 비공개 구성·가격표입니다.
// 홈/헤더/푸터/사이트맵/다른 /quote-* 페이지 어디와도 연결하지 않으며,
// 검색 노출도 막아둡니다(아래 robots 설정). 분량은 100P/200P/300P 3단계만
// 제공(60P 없음)하며, 공용 volumeOptions 단가를 그대로 사용합니다.
export const metadata = {
  title: "WIDA ACCESS 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 WIDA ACCESS 실전 문제집 구성·가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-wida/" },
  openGraph: {
    title: "Blossom Books WIDA ACCESS 구성 안내",
    description: "카카오톡 상담에서 안내하는 WIDA ACCESS 실전 문제집 구성·가격표입니다.",
    url: "https://blossombooks.org/quote-wida/",
    images: ["https://blossombooks.org/quote-wida/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const product = products.find((p) => p.id === "wida-workbook")!;
const widaVolumes = volumeOptions.filter((v) => v.pages === 100 || v.pages === 200 || v.pages === 300);

export default function QuoteWidaPage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        WIDA ACCESS 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">{product.descriptionKo}</p>
      <p className="mt-2 text-[12.5px] text-charcoal-600/80">
        평가 영역: {product.units.join(" · ")} · 대상: {product.gradeRange}
      </p>

      {/* 2. 가격표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">분량·가격</h2>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">100P / 200P / 300P 중 선택하실 수 있습니다.</p>
        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              {widaVolumes.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 모의고사 리스닝 음원(MP3), 한글 상세 해설이 포함됩니다. 학년 선택은 상담으로
          안내해 드립니다.
        </p>
      </section>

      {/* 3. 샘플 문항 — 4개 영역 1문항씩 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">WIDA ACCESS 샘플 문항</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          Listening·Reading·Writing·Speaking 4개 영역 각 1문항입니다. WIDA는 특정 교과 지식이 아니라
          학업 상황에서 쓰이는 영어(academic English) 사용 능력을 평가하는 시험입니다.
        </p>
        <WidaSamples />
      </section>

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학년·현재 영어 숙련도에 맞춰 난이도를 조정해드릴 수 있습니다. 필요한 구성을 카카오톡으로
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
