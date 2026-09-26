import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { volumeOptions, formatKRW } from "@/data/pricing";
import SubjectChips from "./SubjectChips";

// 미국 교과과정(G1–G12 영어·수학) 및 Geometry·Algebra 1·Algebra 2·
// Precalculus·Calculus·AP 문의에만 카카오톡으로 직접 전달하는 비공개
// 구성·가격표입니다. 홈/헤더/푸터/사이트맵/ /quote / /quote-exam 어디와도
// 연결하지 않으며, 검색 노출도 막아둡니다(아래 robots 설정).
export const metadata = {
  title: "미국교과·AP 구성·가격 안내",
  description: "카카오톡 상담에서 안내하는 미국교과·AP 구성표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.blossombooks.org/quote-us/" },
  openGraph: {
    title: "Blossom Books 미국교과·AP 구성 안내",
    description: "카카오톡 상담에서 안내하는 미국교과·AP 구성표입니다.",
    url: "https://www.blossombooks.org/quote-us/",
    images: ["https://www.blossombooks.org/quote-us/opengraph-image"],
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const p100 = volumeOptions[2]; // 100P
const p200 = volumeOptions[3]; // 200P
const SPECIAL_KRW = 390000;

export default function QuoteUsPage() {
  return (
    <div className="mx-auto max-w-[880px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 구성표 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        미국교과·AP 구성·가격 안내
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
        미국 교과과정 G1–G12 English·Math, Pre-Algebra, Geometry·Algebra 1·Algebra 2·Precalculus·Calculus·
        Statistics, AP 전 과목 문제집 구성입니다. 분량(100P/200P)과 난이도(Standard/Advanced)는 각각 선택할
        수 있습니다.
      </p>

      {/* 1-1. 구매 흐름 — 분량과 난이도는 별개의 선택입니다 */}
      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="border-t-2 border-brass-500 bg-ivory-100 p-4">
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">STEP 01 · 분량</p>
          <p className="mt-1 text-[13px] font-medium text-navy-950">100P / 200P</p>
        </div>
        <div className="border-t-2 border-brass-500 bg-ivory-100 p-4">
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">STEP 02 · 난이도</p>
          <p className="mt-1 text-[13px] font-medium text-navy-950">STANDARD / ADVANCED</p>
        </div>
      </div>

      {/* 2. Grade-Based / Course-Based / AP 선택 + Standard/Advanced 토글 →
          해당 조합의 목차 패널이 바로 열립니다. */}
      <div className="mt-8">
        <SubjectChips />
      </div>

      {/* 3. 공통 분량 표 */}
      <section className="mt-[72px]">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">공통 분량·가격</h2>
        <div className="mt-3">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>구성</th>
                <th className={headCellCls}>가격</th>
                <th className={headCellCls}>난이도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>{p100.label} 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(p100.priceKRW)}</td>
                <td className={`${cellCls} text-charcoal-600`}>Standard / Advanced 선택 가능</td>
              </tr>
              <tr>
                <td className={cellCls}>{p200.label} 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(p200.priceKRW)}</td>
                <td className={`${cellCls} text-charcoal-600`}>Standard / Advanced 선택 가능</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          학년·과목마다 문항만 다릅니다. 분량 단가는 같습니다. 난이도(Standard/Advanced)에 따라 가격이
          달라지지 않습니다 — 가격 차이는 분량에서만 발생합니다.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          200P는 100P에 몇 장을 더 붙인 것이 아니라, 같은 범위를 더 많은 문제와 반복 연습으로 제공하는
          구성입니다.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600/80">
          유형 1개만 필요하거나 유형 2개를 믹스하고 싶으시면 카카오톡으로 문의해 주세요.
        </p>
      </section>

      {/* 3-1. TWO-LEVEL STUDY — Standard → Advanced로 이어지는 학습 경로 */}
      <section className="mt-[72px]">
        <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">Two-Level Study</p>
        <h2 className="mt-2 font-display text-[22px] font-semibold text-navy-950">
          기본 교과부터 심화까지 이어서 준비한다면
        </h2>

        <div className="mt-6 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="border-t-2 border-navy-900/70 bg-white p-5">
            <p className="font-label text-[11px] tracking-[0.12em] text-brass-500">STEP 01</p>
            <p className="mt-1.5 font-display text-[16px] font-semibold text-navy-950">STANDARD</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
              현재 학년 또는 코스의 핵심 개념과 주요 문제 유형
            </p>
          </div>
          <div className="flex items-center justify-center text-navy-800/40">
            <span className="hidden font-display text-[20px] leading-none sm:inline">→</span>
            <span className="font-display text-[20px] leading-none sm:hidden">↓</span>
          </div>
          <div className="border-t-2 border-navy-900/70 bg-navy-950 p-5">
            <p className="font-label text-[11px] tracking-[0.12em] text-brass-400">STEP 02</p>
            <p className="mt-1.5 font-display text-[16px] font-semibold text-ivory-100">ADVANCED</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory-100/75">별도의 심화·응용·고난도 문제</p>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[560px] text-center text-[13px] leading-relaxed text-charcoal-600">
          Standard와 Advanced는 서로 다른 문제로 구성됩니다. 현재 교과과정을 충분히 학습한 뒤, 같은 과목을
          더 높은 난이도로 이어서 공부할 수 있습니다.
        </p>
      </section>

      {/* 3-2. 선택 예시 */}
      <section className="mt-[72px]">
        <h2 className="font-display text-[18px] font-semibold text-navy-950">이렇게 선택합니다</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { need: "현재 학년 내용을 충분히 연습하고 싶어요.", result: "100P STANDARD" },
            { need: "학교 진도는 잘 따라가고 있는데 조금 더 어려운 문제를 풀고 싶어요.", result: "100P ADVANCED" },
            { need: "현재 학년 내용을 문제량 많게 준비하고 싶어요.", result: "200P STANDARD" },
            {
              need: "기본부터 심화까지 한 과목을 제대로 준비하고 싶어요.",
              result: "100P STANDARD + 100P ADVANCED",
            },
            { need: "기본 개념은 이미 되어 있어서 심화 문제만 많이 풀고 싶어요.", result: "200P ADVANCED" },
          ].map((c) => (
            <div key={c.need} className="border border-ivory-300 bg-white p-4">
              <p className="text-[13px] leading-relaxed text-charcoal-700">&ldquo;{c.need}&rdquo;</p>
              <p className="mt-2.5 border-t border-ivory-300 pt-2.5 font-display text-[14px] font-semibold text-navy-950">
                → {c.result}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-charcoal-600/70">
          실제 상품 예시이며, 개별 후기가 아닙니다. 필요하다면 100P Standard + 200P Advanced 같은 맞춤 조합도
          카카오톡 상담으로 안내해 드립니다.
        </p>
      </section>

      {/* 4. Special Package — 이 페이지 1등 강조 */}
      <section className="mt-[72px] rounded-xl bg-navy-950 p-7 shadow-[0_20px_44px_-28px_rgba(13,22,38,0.45)] sm:p-9">
        <span className="inline-flex items-center rounded-full bg-brass-500 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-950">
          Special Package
        </span>
        <p className="mt-4 font-display text-[18px] font-semibold leading-snug text-ivory-100">
          200P와 문항은 같고, 순서·모의·시작만 다릅니다.
        </p>
        <p className="mt-3 font-display text-[32px] font-semibold text-ivory-100">{formatKRW(SPECIAL_KRW)}</p>
        <p className="mt-1.5 text-[12px] text-ivory-100/60">학년·과목 1개 기준</p>

        <p className="mt-5 text-[12.5px] font-medium text-ivory-100/70">포함</p>
        <ul className="mt-1.5 space-y-1.5 text-[13.5px] leading-relaxed text-ivory-100/90">
          <li>· 해당 과목 200P + 정답·해설</li>
          <li>· 이 학생용 목차 (학년·약한 단원 기준 순서)</li>
          <li>· 모의고사 2회 + 시간 배분</li>
          <li>· 번호 찍힌 오답지</li>
          <li>· 카톡 글 상담 30분 (음성·줌 없음)</li>
        </ul>

        <p className="mt-5 border-t border-ivory-100/15 pt-4 text-[12px] leading-relaxed text-ivory-100/60">
          Special Package는 난이도(Standard/Advanced)가 아니라 학생별 학습 설계와 모의고사가 추가된
          서비스입니다. Standard·Advanced 어느 쪽을 선택하든 Special Package를 더할 수 있습니다.
        </p>
      </section>

      {/* 5. 작은 글 */}
      <p className="mt-6 text-[12.5px] leading-relaxed text-charcoal-600/80">
        학년과 과목을 카톡에 적어 주세요. 두 과목이면 따로 문의해 주세요.
      </p>

      {/* 6. CTA */}
      <div className="mt-14 border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 학년·과목 문의하기
        </a>
      </div>
    </div>
  );
}
