"use client";

import { useState } from "react";

interface SubjectPanel {
  key: string;
  title: string;
  /** 100P 목차 — 단원명만, 페이지 번호 없음 */
  p100: string[];
  /** 200P에서 100P 전체에 더해지는 단원 */
  p200Extra: string[];
  /** AP처럼 고정 단원 목록이 없는 경우 서술형으로 대체 */
  p100Desc?: string;
  p200Desc?: string;
  note?: string;
  kakaoLine: string;
  disclaimer?: string;
}

const DEFAULT_DISCLAIMER = "비공식 대비 교재입니다.";

const SPECIAL_TEXT =
  "해당 과목 200P 목차와 문항은 같습니다. 푸는 순서, 모의 2회, 오답지, 카톡 글 상담 30분을 더합니다.";

const PANELS: SubjectPanel[] = [
  {
    key: "영어",
    title: "영어",
    p100: [
      "Vocabulary in context",
      "Short reading",
      "Main idea/detail",
      "Inference",
      "Grammar conventions",
      "Sentence writing",
    ],
    p200Extra: ["Longer passages", "Writing prompt 골격", "Mixed review"],
    kakaoLine: "카톡에 적을 말: 미국교과 영어 · G__ · 100P/200P/Special",
  },
  {
    key: "수학",
    title: "수학",
    p100: [
      "Number & operations",
      "Fractions/decimals (해당 학년)",
      "Place value or ratios",
      "Intro algebra",
      "Word problems",
      "Data/graphs",
    ],
    p200Extra: ["Mixed sets", "Multi-step word problems"],
    kakaoLine: "카톡에 적을 말: 미국교과 수학 · G__ · 100P/200P/Special",
  },
  {
    key: "Geometry",
    title: "Geometry",
    p100: [
      "Lines & angles",
      "Triangles",
      "Congruence/similarity",
      "Area & perimeter",
      "Circles 기초",
      "Coordinate geometry 입문",
    ],
    p200Extra: ["Proof 골격", "3D surface/volume", "Mixed review"],
    kakaoLine: "카톡에 적을 말: Geometry · 100P/200P/Special",
  },
  {
    key: "Algebra 1",
    title: "Algebra 1",
    p100: ["실수와 연산", "일차방정식", "부등식", "연립방정식", "일차함수", "문장제"],
    p200Extra: ["지수 기초", "Systems 응용", "Mixed review"],
    kakaoLine: "카톡에 적을 말: Algebra 1 · 100P/200P/Special",
  },
  {
    key: "Algebra 2",
    title: "Algebra 2",
    p100: ["이차방정식·함수", "다항", "유리식", "지수·로그", "수열 기초"],
    p200Extra: ["삼각함수 입문", "응용 문장제", "Mixed review"],
    kakaoLine: "카톡에 적을 말: Algebra 2 · 100P/200P/Special",
  },
  {
    key: "Precalculus",
    title: "Precalculus",
    p100: ["Functions", "Trigonometry", "Exponential & log", "Sequences", "Graphs"],
    p200Extra: ["Intro limits 감각", "Analytic trig", "Mixed review"],
    kakaoLine: "카톡에 적을 말: Precalculus · 100P/200P/Special",
  },
  {
    key: "Calculus",
    title: "Calculus",
    p100: ["Limits & continuity", "Derivatives", "Derivative applications", "Integrals 기초"],
    p200Extra: ["More applications", "FRQ 골격", "AB 범위 Mixed"],
    note: "BC 범위가 필요하면 카톡에 BC라고 적어 주세요. 목차를 별도로 한 벌 더 만들지 않고 AB 목차를 기준으로 확장합니다.",
    kakaoLine: "카톡에 적을 말: Calculus · AB/BC · 100P/200P/Special",
  },
  {
    key: "AP",
    title: "AP",
    p100: [],
    p200Extra: [],
    p100Desc: "선택하신 AP 과목의 출제 영역 유형과 짧은 FRQ/SAQ 답변 골격을 연습합니다.",
    p200Desc: "같은 영역을 반복하고 FRQ 비중을 늘려 혼합 세트로 구성합니다.",
    note: "과목명을 카톡에 먼저 적어 주세요. 과목마다 단원 전체를 미리 만들어 두지 않고, 해당 과목 출제 범위에 맞춰 구성합니다.",
    kakaoLine: "카톡에 적을 말: AP · 과목명 · 100P/200P/Special",
    disclaimer: "비공식 대비 교재이며, College Board와 무관합니다.",
  },
];

const chipCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-100 px-4 py-1.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-ivory-100";
const chipActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-1.5 text-[12.5px] font-medium text-ivory-100 transition-colors";

function UnitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-charcoal-600">
      {items.map((item) => (
        <li key={item}>· {item}</li>
      ))}
    </ul>
  );
}

export default function SubjectChips({ subjects }: { subjects: string[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const panelsByKey = new Map(PANELS.map((p) => [p.key, p]));
  const openPanel = openKey ? panelsByKey.get(openKey) : undefined;

  return (
    <div className="mt-4 first:mt-0">
      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">과목</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {subjects.map((s) => {
          const isActive = openKey === s;
          return (
            <button
              key={s}
              type="button"
              aria-expanded={isActive}
              onClick={() => setOpenKey((prev) => (prev === s ? null : s))}
              className={isActive ? chipActiveCls : chipCls}
            >
              {s}
            </button>
          );
        })}
      </div>

      {openPanel && (
        <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
          <p className="font-display text-[16px] font-semibold text-navy-950">{openPanel.title} 목차</p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">100P 목차</p>
              {openPanel.p100.length > 0 ? (
                <UnitList items={openPanel.p100} />
              ) : (
                <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{openPanel.p100Desc}</p>
              )}
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">200P 목차</p>
              {openPanel.p200Extra.length > 0 ? (
                <>
                  <p className="mt-2 text-[11.5px] italic text-charcoal-600/70">위 100P 전체 +</p>
                  <UnitList items={openPanel.p200Extra} />
                </>
              ) : (
                <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{openPanel.p200Desc}</p>
              )}
            </div>
          </div>

          <div className="mt-5 border-t border-ivory-300 pt-4">
            <p className="text-[13.5px] font-medium text-navy-950">Special</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{SPECIAL_TEXT}</p>
          </div>

          {openPanel.note && (
            <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/80">{openPanel.note}</p>
          )}

          <div className="mt-5 border-t border-ivory-300 pt-4">
            <p className="text-[12.5px] leading-relaxed text-charcoal-600">{openPanel.kakaoLine}</p>
          </div>

          <p className="mt-4 text-[11.5px] leading-relaxed text-charcoal-600/60">
            {openPanel.disclaimer ?? DEFAULT_DISCLAIMER}
          </p>
        </div>
      )}
    </div>
  );
}
