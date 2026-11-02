import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import NuteMathSamples from "./NuteMathSamples";

// 누테 수학(중등) 학원 전용으로 카카오톡 상담에서 직접 전달하는 비공개
// 구성·가격표입니다. 홈/헤더/푸터/사이트맵/다른 /quote-* 페이지 어디와도
// 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정). 가격은
// 100P/200P/300P 3단계만 제공(60P 없음)하며, 공용 volumeOptions 단가를
// 그대로 사용합니다. 중등 수학 심화(닮음·원주각·복합도형·연립방정식)
// SVG 고난도 샘플 문항을 별도로 제작해 함께 제공합니다(nuteMathBank).
export const metadata = {
  title: "누테 수학(중등) 학원 전용 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 누테 수학(중등) 학원 전용 중등 수학 심화 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-nute/" },
  openGraph: {
    title: "Blossom Books 누테 수학(중등) 학원 전용 구성 안내",
    description: "카카오톡 상담에서 안내하는 누테 수학(중등) 학원 전용 중등 수학 심화 구성표입니다.",
    url: "https://blossombooks.org/quote-nute/",
    images: ["https://blossombooks.org/quote-nute/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const nuteVolumes = volumeOptions.filter((v) => v.pages !== 60);

export default function QuoteNutePage() {
  return (
    <div className="mx-auto max-w-[980px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음 · 누테 수학(중등) 학원 전용
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        누테 수학(중등) 학원 전용 — 중등 수학 심화 구성·가격 안내
      </h1>
      <p className="mt-3 max-w-[720px] text-[14.5px] leading-relaxed text-charcoal-600">
        닮음, 원주각, 복합 도형의 넓이, 연립방정식의 활용까지 — 중등 수학에서 학생들이 특히 어려워하는
        단원을 중심으로 고난도 문항을 구성했습니다. 모든 도형·그래프 문항은 SVG로 정확하게 제작해
        치수와 각도를 분명하게 확인할 수 있습니다.
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
              {nuteVolumes.map((v) => (
                <tr key={v.pages}>
                  <td className={cellCls}>{v.label} 문제집 + 해설집</td>
                  <td className={cellCls}>{formatKRW(v.priceKRW)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          정답과 함께 풀이 과정·자주 틀리는 포인트를 짚어주는 상세 해설집이 포함됩니다.
        </p>
      </section>

      {/* 3. 고난도 샘플 문항 — SVG 도형 포함 */}
      <section className="mt-12">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">중등 수학 심화 샘플 문항</h2>
        <p className="mt-1.5 max-w-[640px] text-[12.5px] leading-relaxed text-charcoal-600">
          닮음·원주각·복합 도형·연립방정식 등 중등 수학 심화 단원의 고난도 문항입니다. 도형과 그래프는
          모두 SVG로 제작해 실제 교재와 동일한 정밀도로 확인하실 수 있습니다.
        </p>
        <NuteMathSamples />
      </section>

      {/* 4. 안내 */}
      <p className="mt-10 max-w-[680px] text-[12.5px] leading-relaxed text-charcoal-600/80">
        학생 수·학년 구성이나 반 배정 기준에 맞춰 난이도·단원 비중을 조정해드릴 수 있습니다. 필요한
        구성을 카카오톡으로 편하게 문의해 주세요.
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
