import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";

// 성인·취업·유학·대입 영어/수학(OET·MET·CELBAN·PTE·부산외대·SPA·SAT) 문의에만
// 카카오톡으로 직접 전달하는 비공개 구성·가격표입니다. 홈/헤더/푸터/사이트맵/
// /quote 어디와도 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정).
// /quote(레벨테스트·MAP·CAT4)와는 별도 페이지입니다 — 교차 링크 금지.
export const metadata = {
  title: "시험 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 시험별 구성표입니다.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Blossom Books 시험 구성 안내",
    description: "카카오톡 상담에서 안내하는 시험별 구성표입니다.",
  },
};

const cellCls = "border border-navy-800/12 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-navy-800/12 bg-ivory-200/60 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const exams = ["OET", "MET", "CELBAN", "PTE", "부산외대", "SPA(현대차)", "SAT 영어", "SAT 수학"];

const p100 = volumeOptions[2]; // 100P
const p200 = volumeOptions[3]; // 200P

export default function QuoteExamPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Quote Sheet — Exam</p>
      <h1 className="mt-3 font-display text-[28px] font-semibold text-navy-950 sm:text-[33px]">시험 구성·가격 안내</h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        카카오톡 상담에서 안내하는 구성표입니다. 홈 메뉴에는 없습니다.
      </p>
      <p className="mt-1.5 text-[12.5px] text-charcoal-600/80">
        OET · MET · CELBAN · PTE · 부산외대 · SPA(현대차) · SAT 영어 · SAT 수학
      </p>

      {/* 1. 시험 칩 */}
      <div className="mt-6 flex flex-wrap gap-2">
        {exams.map((e) => (
          <span
            key={e}
            className="border border-navy-800/15 bg-ivory-100 px-3 py-1.5 text-[12.5px] font-medium text-navy-900"
          >
            {e}
          </span>
        ))}
      </div>

      {/* 2. 공통 분량 표 */}
      <section className="mt-10">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">공통 분량·가격</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>분량</th>
                <th className={headCellCls}>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>{p100.label}</td>
                <td className={cellCls}>{formatKRW(p100.priceKRW)}</td>
              </tr>
              <tr>
                <td className={cellCls}>{p200.label}</td>
                <td className={cellCls}>{formatKRW(p200.priceKRW)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          시험·과목마다 문항만 다릅니다. 분량 단가는 같습니다.
        </p>
      </section>

      {/* 3. SAT 한 줄 박스 — 일반 표 톤, Special처럼 강조하지 않음 */}
      <section className="mt-8 border border-navy-800/12 bg-ivory-200/40 p-5">
        <p className="text-[13.5px] font-medium text-navy-950">SAT 영어 · SAT 수학 — 각 개별 주문</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
          함께 주문하실 경우 카카오톡에 &ldquo;SAT 영어+수학&rdquo;과 각 분량을 적어 주세요.
        </p>
      </section>

      {/* 4. Special Package — 단독 카드로만 강조 */}
      <section className="mt-12 border-2 border-navy-900/80 bg-ivory-200/70 p-6 sm:p-8">
        <span className="inline-flex items-center border border-navy-900/30 bg-navy-950 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-ivory-100">
          Special Package
        </span>
        <p className="mt-4 font-display text-[17px] font-semibold leading-snug text-navy-950">
          200P와 문항은 같고, 순서·모의·시작만 다릅니다.
        </p>
        <p className="mt-3 font-display text-[30px] font-semibold text-navy-950">{formatKRW(390000)}</p>
        <p className="mt-1.5 text-[12px] text-charcoal-600/80">시험·과목 1개 기준</p>

        <p className="mt-5 text-[12.5px] font-medium text-navy-800/70">포함</p>
        <ul className="mt-1.5 space-y-1.5 text-[13.5px] leading-relaxed text-charcoal-900">
          <li>· 200P 워크북 + 정답·해설 PDF (해당 시험·해당 과목 200P와 같은 문항)</li>
          <li>· 이 응시자용 목차 (푸는 순서만 재배열)</li>
          <li>· Mock 2회 + 시간 배분 1장</li>
          <li>· 번호 찍힌 오답지</li>
          <li>· 시작 상담 30분 × 1회</li>
        </ul>
        <div className="mt-4 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
          <p>비추천: 문제만 필요하면 200P({formatKRW(p200.priceKRW)})</p>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/80">
          SAT 영어+수학 Special을 원하시면 과목마다 Special을 각각 주문하시면 됩니다.
        </p>
      </section>

      {/* CTA */}
      <div className="mt-14 border-t border-navy-800/12 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 이 시험 문의하기
        </a>
        <p className="mx-auto mt-5 max-w-lg text-[12px] leading-relaxed text-charcoal-600/80">
          SAT는 영어·수학을 따로 적어 주세요.
        </p>
      </div>
    </div>
  );
}
