"use client";

import { useState } from "react";

interface ExamPanel {
  key: string;
  title: string;
  subtitle: string;
  p100: string;
  p200: string;
  parts?: string[];
  note?: string;
  kakaoLine: string;
}

const SPECIAL_TEXT =
  "해당 200P와 문항은 같습니다. 이 응시자용 목차, 모의 2회, 오답지, 카톡 글 상담 30분을 더합니다. 음성·줌 상담은 없습니다.";

const DISCLAIMER = "비공식 대비 교재이며, 주관 기관과 무관합니다.";

const PANELS: ExamPanel[] = [
  {
    key: "OET",
    title: "OET",
    subtitle: "의료 영어 시험입니다. Listening · Reading · Writing · Speaking 네 영역으로 구성됩니다.",
    p100: "네 영역 유형 연습에 샘플 Writing과 Speaking 답변 골격을 더합니다.",
    p200: "영역별 문항을 반복하고, 간호 등 직종별 상황을 추가합니다. 직종은 카톡에 적어 주세요.",
    kakaoLine: "카톡에 적을 말: OET · 직종 · 100P/200P/Special",
  },
  {
    key: "MET",
    title: "MET",
    subtitle: "Michigan English Test. Listening · Reading · Speaking · Writing 네 영역입니다.",
    p100: "네 영역 유형 연습에 짧은 쓰기·말하기 답변 골격을 더합니다.",
    p200: "난이도를 높이고 모의 파트를 확대합니다.",
    kakaoLine: "카톡에 적을 말: MET · 100P/200P/Special",
  },
  {
    key: "CELBAN",
    title: "CELBAN",
    subtitle: "캐나다 간호사 영어 시험입니다. Speaking · Listening · Reading · Writing 네 영역입니다.",
    p100: "의료 상황 듣기·읽기 연습에 차트 쓰기와 환자 대화 답변 골격을 더합니다.",
    p200: "상황을 확대하고 쓰기 과제를 추가합니다.",
    kakaoLine: "카톡에 적을 말: CELBAN · 100P/200P/Special",
  },
  {
    key: "PTE",
    title: "PTE",
    subtitle: "PTE Academic. Speaking & Writing · Reading · Listening 세 파트입니다.",
    p100: "Read Aloud, Repeat Sentence, Describe Image와 읽기·듣기 유형을 연습합니다.",
    p200: "유형별 문항을 반복하고 통합 쓰기를 더합니다.",
    kakaoLine: "카톡에 적을 말: PTE · 100P/200P/Special",
  },
  {
    key: "부산외대 FLAT",
    title: "부산외대",
    subtitle: "부산외대 관련 영어 시험입니다. 유형은 해마다 달라질 수 있습니다.",
    p100: "독해·어휘·문법 유형에, 있는 경우 듣기 유형을 더합니다.",
    p200: "분량을 늘리고 서술형 답변 골격을 더합니다.",
    note: "해당 전형명을 카톡에 적어 주세요.",
    kakaoLine: "카톡에 적을 말: 부산외대 FLAT · 전형명 · 100P/200P/Special",
  },
  {
    key: "SPA(현대차)",
    title: "SPA (현대차)",
    subtitle: "현대차 영어 말하기 시험입니다.",
    p100: "자기소개·업무 상황·의견 말하기 답변 골격과 채점 포인트를 연습합니다.",
    p200: "상황을 확대하고 반박·설득 문항을 더합니다.",
    kakaoLine: "카톡에 적을 말: SPA 현대차 · 100P/200P/Special",
  },
  {
    key: "SAT 영어",
    title: "SAT 영어",
    subtitle: "Digital SAT Reading and Writing입니다.",
    p100: "Craft & Structure, Information & Ideas, Standard English Conventions, Expression of Ideas 네 영역을 연습합니다.",
    p200: "모듈을 반복하고 오답 유형을 정리합니다.",
    note: "SAT 영어와 SAT 수학은 각각 칩으로 구분되어 있습니다. 두 과목이 필요하면 두 칩을 각각 확인해 주세요.",
    kakaoLine: "카톡에 적을 말: SAT 영어 · 100P/200P/Special",
  },
  {
    key: "SAT 수학",
    title: "SAT 수학",
    subtitle: "Digital SAT Math입니다.",
    p100: "Algebra, Advanced Math, Problem-Solving & Data Analysis, Geometry/Trig 기초를 연습합니다.",
    p200: "약점 단원을 반복하고 계산·문장제를 더합니다.",
    note: "SAT 영어와 SAT 수학은 각각 칩으로 구분되어 있습니다. 두 과목이 필요하면 두 칩을 각각 확인해 주세요.",
    kakaoLine: "카톡에 적을 말: SAT 수학 · 100P/200P/Special",
  },
  {
    key: "ESPT",
    title: "ESPT",
    subtitle: "English Speaking Proficiency Test (영어 말하기 시험)입니다.",
    p100: "각 파트마다 예상 문항, 답변 골격, 채점 포인트(유창성·과제 수행·어휘)로 구성됩니다. 보고 말하는 연습 중심이며, 음원 여부는 필요 시 카톡으로 안내해 드립니다.",
    p200: "위 9개 파트를 반복하며 난이도를 높이고, 상황 문항을 추가하며 모범 답변을 확장합니다.",
    parts: [
      "Part 1 Yes/No",
      "Part 2 Choice",
      "Part 3 Personal information",
      "Part 4 Picture identification",
      "Part 5 Giving directions",
      "Part 6 Survival situation",
      "Part 7 Persuading",
      "Part 8 Situation response",
      "Part 9 Reading passage",
    ],
    kakaoLine: "카톡에 적을 말: ESPT · General/Teens 등 종류 · 100P/200P/Special",
  },
  {
    key: "영원무역 스피킹",
    title: "영원무역 스피킹",
    subtitle: "사내·진급 영어 말하기 시험입니다.",
    p100: "자기소개, 업무 상황, 의견·설득, 짧은 발표 답변 골격을 연습합니다.",
    p200: "상황을 확대하고 예상 질문을 추가합니다.",
    kakaoLine: "카톡에 적을 말: 영원무역 스피킹 · 100P/200P/Special",
  },
];

const chipCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-100 px-4 py-1.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-ivory-100";
const chipActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-1.5 text-[12.5px] font-medium text-ivory-100 transition-colors";

export default function ExamChips({ exams }: { exams: string[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const panelsByKey = new Map(PANELS.map((p) => [p.key, p]));
  const openPanel = openKey ? panelsByKey.get(openKey) : undefined;

  return (
    <div className="mt-8">
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {exams.map((e) => {
          const panel = panelsByKey.get(e);
          if (!panel) {
            return (
              <span key={e} className={chipCls}>
                {e}
              </span>
            );
          }
          return (
            <button
              key={e}
              type="button"
              aria-expanded={openKey === e}
              onClick={() => setOpenKey((prev) => (prev === e ? null : e))}
              className={openKey === e ? chipActiveCls : chipCls}
            >
              {e}
            </button>
          );
        })}
      </div>

      {openPanel && (
        <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
          <p className="font-display text-[16px] font-semibold text-navy-950">
            {openPanel.title} <span className="font-normal text-charcoal-600">— {openPanel.subtitle}</span>
          </p>

          <div className="mt-5">
            <p className="text-[13.5px] font-medium text-navy-950">100P 문제집 + 해설집</p>
            {openPanel.parts && (
              <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {openPanel.parts.map((part) => (
                  <span
                    key={part}
                    className="border border-ivory-300 bg-ivory-200/40 px-2.5 py-1.5 text-[11.5px] text-charcoal-600"
                  >
                    {part}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-charcoal-600">{openPanel.p100}</p>
          </div>

          <div className="mt-5 border-t border-ivory-300 pt-4">
            <p className="text-[13.5px] font-medium text-navy-950">200P 문제집 + 해설집</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{openPanel.p200}</p>
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

          <p className="mt-4 text-[11.5px] leading-relaxed text-charcoal-600/60">{DISCLAIMER}</p>
        </div>
      )}
    </div>
  );
}
