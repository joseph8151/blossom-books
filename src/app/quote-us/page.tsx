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
  openGraph: {
    title: "Blossom Books 미국교과·AP 구성 안내",
    description: "카카오톡 상담에서 안내하는 미국교과·AP 구성표입니다.",
  },
};

const cellCls = "border border-ivory-300 px-4 py-3 text-[13.5px]";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/70";

const grades = Array.from({ length: 12 }, (_, i) => `G${i + 1}`);
const subjects = ["영어", "수학", "Geometry", "Algebra 1", "Algebra 2", "Precalculus", "Calculus", "AP"];

const p100 = volumeOptions[2]; // 100P
const p200 = volumeOptions[3]; // 200P
const SPECIAL_KRW = 390000;

function ChipRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">{label}</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {items.map((item) => (
          <span
            key={item}
            className="shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-100 px-4 py-1.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-ivory-100"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

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
        미국 교과과정 G1–G12 영어·수학, Geometry·Algebra 1·Algebra 2·Precalculus·Calculus, AP 과목 문제집
        구성입니다.
      </p>

      {/* 2. 칩 두 줄 — 과목 칩은 클릭 시 같은 페이지 아래 목차 패널 */}
      <div className="mt-8">
        <ChipRow label="학년" items={grades} />
        <SubjectChips subjects={subjects} />
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellCls}>{p100.label} 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(p100.priceKRW)}</td>
              </tr>
              <tr>
                <td className={cellCls}>{p200.label} 문제집 + 해설집</td>
                <td className={cellCls}>{formatKRW(p200.priceKRW)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-charcoal-600/80">
          학년·과목마다 문항만 다릅니다. 분량 단가는 같습니다.
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
