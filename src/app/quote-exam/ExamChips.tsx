"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

type StageType = "advanced" | "intensive";
type Stage = "STANDARD" | "UPGRADE";

interface ExamPanel {
  key: string;
  title: string;
  sublabel?: string;
  subtitle: string;
  p100: string;
  p200: string;
  parts?: string[];
  note?: string;
  kakaoLine: string;
  /** 이 시험에서는 Advanced(난이도 강화)와 Intensive(훈련량·취약영역 강화) 중 어느 쪽이 자연스러운지 */
  stageType: StageType;
  /** Advanced/Intensive 공통 설명 — 분량(100P/200P)과 무관하게 같은 방향으로 구성됩니다 */
  stageText: string;
  stageNote?: string;
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
    stageType: "intensive",
    stageText:
      "취약 영역 집중, 고난도 실전 연습, 반복 훈련, Writing·Speaking 강화, Reading·Listening 집중 연습으로 구성됩니다.",
    stageNote:
      "필요하면 Writing Intensive · Speaking Intensive · Reading Intensive · Listening Intensive처럼 영역별로도 구성할 수 있습니다. 필요한 영역을 카톡에 적어 주세요.",
  },
  {
    key: "MET",
    title: "MET",
    subtitle: "Michigan English Test. Listening · Reading · Speaking · Writing 네 영역입니다.",
    p100: "네 영역 유형 연습에 짧은 쓰기·말하기 답변 골격을 더합니다.",
    p200: "난이도를 높이고 모의 파트를 확대합니다.",
    kakaoLine: "카톡에 적을 말: MET · 100P/200P/Special",
    stageType: "advanced",
    stageText: "높은 수준의 어휘와 독해, 복합적인 Writing, 상위 Speaking 대응, 난도 높은 실전 문제로 구성됩니다.",
  },
  {
    key: "CELBAN",
    title: "CELBAN",
    subtitle: "캐나다 간호사 영어 시험입니다. Speaking · Listening · Reading · Writing 네 영역입니다.",
    p100: "의료 상황 듣기·읽기 연습에 차트 쓰기와 환자 대화 답변 골격을 더합니다.",
    p200: "상황을 확대하고 쓰기 과제를 추가합니다.",
    kakaoLine: "카톡에 적을 말: CELBAN · 100P/200P/Special",
    stageType: "intensive",
    stageText:
      "취약 영역 집중, 의료 커뮤니케이션 문제 강화, Writing·Speaking 실전량 증가, Reading·Listening 추가 훈련으로 구성됩니다.",
    stageNote: "필요하면 Writing + Speaking Intensive, Reading + Listening Intensive처럼 상담에서 맞춤 구성이 가능합니다.",
  },
  {
    key: "PTE",
    title: "PTE",
    subtitle: "PTE Academic. Speaking & Writing · Reading · Listening 세 파트입니다.",
    p100: "Read Aloud, Repeat Sentence, Describe Image와 읽기·듣기 유형을 연습합니다.",
    p200: "유형별 문항을 반복하고 통합 쓰기를 더합니다.",
    kakaoLine: "카톡에 적을 말: PTE · 100P/200P/Special",
    stageType: "advanced",
    stageText:
      "고득점 목표 Reading·Listening 고난도 구성, 복합 Speaking·Writing, 변형 문제 및 상위 난이도 실전 연습으로 구성됩니다.",
    stageNote: "목표 점수가 높다면, 같은 문제를 더 많이 푸는 것보다 난이도를 높여 연습하세요.",
  },
  {
    key: "CELPIP",
    title: "CELPIP",
    subtitle: "Canadian English Language Proficiency Index Program. Listening · Reading · Writing · Speaking 네 영역입니다.",
    p100: "네 영역 유형 연습에 Writing 답변 골격과 Speaking 예상 문항·답변 골격을 더합니다.",
    p200: "영역별 문항을 반복·심화하고, 시간 맞춰 푸는 세트를 더합니다.",
    note: "General과 LS(Listening/Speaking) 여부를 모르시면 카톡에 목적만 적어 주세요.",
    kakaoLine: "카톡에 적을 말: CELPIP · General/LS 여부 · 100P/200P/Special",
    stageType: "advanced",
    stageText: "높은 수준의 표현, 복합 Reading, 고난도 Listening, Speaking·Writing의 상위 난이도 연습으로 구성됩니다.",
  },
  {
    key: "부산외대 FLAT",
    title: "부산외대 FLAT",
    subtitle: "읽기 · 어휘 · 문법, 있는 경우 쓰기 골격으로 구성됩니다.",
    p100: "독해 유형 연습에 어휘·문법을 더합니다.",
    p200: "같은 영역을 반복·심화하고, 지문 난이도를 높입니다.",
    kakaoLine: "카톡에 적을 말: 부산외대 FLAT · 100P/200P/Special",
    stageType: "advanced",
    stageText: "상위 난이도 Vocabulary, 고난도 Reading, 복잡한 Composition, 고난도 Interview 대응으로 구성됩니다.",
  },
  {
    key: "SPA(현대차)",
    title: "SPA (현대차)",
    subtitle: "현대차 영어 말하기 시험입니다.",
    p100: "자기소개·업무 상황·의견 말하기 답변 골격과 채점 포인트를 연습합니다.",
    p200: "상황을 확대하고 반박·설득 문항을 더합니다.",
    kakaoLine: "카톡에 적을 말: SPA 현대차 · 100P/200P/Special",
    stageType: "intensive",
    stageText:
      "실전 Speaking 반복, 고득점 답변 연습, 돌발 질문, 후속 질문, 복잡한 상황 대응, 답변 확장 훈련으로 구성됩니다.",
  },
  {
    key: "SAT 영어",
    title: "SAT 영어",
    subtitle: "Digital SAT Reading and Writing입니다.",
    p100: "Craft & Structure, Information & Ideas, Standard English Conventions, Expression of Ideas 네 영역을 연습합니다.",
    p200: "모듈을 반복하고 오답 유형을 정리합니다.",
    note: "SAT 영어와 SAT 수학은 각각 칩으로 구분되어 있습니다. 두 과목이 필요하면 두 칩을 각각 확인해 주세요.",
    kakaoLine: "카톡에 적을 말: SAT 영어 · 100P/200P/Special",
    stageType: "advanced",
    stageText:
      "고난도 Reading & Writing, 복잡한 문장 구조, 상위 수준 Vocabulary in Context, 고난도 Inference, Rhetorical Analysis, 고난도 Grammar·Expression으로 구성됩니다.",
  },
  {
    key: "SAT 수학",
    title: "SAT 수학",
    subtitle: "Digital SAT Math입니다.",
    p100: "Algebra, Advanced Math, Problem-Solving & Data Analysis, Geometry/Trig 기초를 연습합니다.",
    p200: "약점 단원을 반복하고 계산·문장제를 더합니다.",
    note: "SAT 영어와 SAT 수학은 각각 칩으로 구분되어 있습니다. 두 과목이 필요하면 두 칩을 각각 확인해 주세요.",
    kakaoLine: "카톡에 적을 말: SAT 수학 · 100P/200P/Special",
    stageType: "advanced",
    stageText:
      "고난도 Algebra, Advanced Math, 복합 Data Analysis, Geometry·Trigonometry, Multi-step Problems 등 상위 난이도 문제 중심으로 구성됩니다.",
  },
  {
    key: "ESPT",
    title: "ESPT",
    sublabel: "영원무역 스피킹",
    subtitle: "English Speaking Proficiency Test. 영원무역 등에서 쓰는 영어 말하기 시험입니다.",
    p100: "각 파트마다 예상 문항, 답변 골격, 채점 포인트(유창성·과제 수행·어휘)로 구성됩니다. 보고 말하는 연습 중심이며, 음원 여부는 필요 시 카톡으로 안내해 드립니다.",
    p200: "위 9개 파트를 반복하며 심화합니다.",
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
    note: "회사·전형이 있으면 적어 주세요.",
    kakaoLine: "카톡에 적을 말: ESPT · 영원무역(해당 시) · 100P/200P/Special",
    stageType: "intensive",
    stageText: "Speaking 반복 훈련, 답변 확장, 돌발 질문, 복합 상황, 고난도 실전 연습으로 구성됩니다.",
  },
];

const chipCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-100 px-4 py-1.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-ivory-100";
const chipActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-1.5 text-[12.5px] font-medium text-ivory-100 transition-colors";
// sublabel이 있는 칩(ESPT)은 2줄 표기를 위해 세로 패딩만 살짝 키움
const chipWithSubCls = chipCls.replace("py-1.5", "py-1");
const chipWithSubActiveCls = chipActiveCls.replace("py-1.5", "py-1");

const stageBtnCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2 text-center text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const stageBtnActiveCls =
  "flex-1 border border-navy-900 bg-navy-900 px-3 py-2 text-center text-[12.5px] font-medium text-ivory-100";

function stageLabel(t: StageType) {
  return t === "advanced" ? "ADVANCED" : "INTENSIVE";
}

export default function ExamChips({ exams }: { exams: string[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("STANDARD");
  const panelsByKey = new Map(PANELS.map((p) => [p.key, p]));
  const openPanel = openKey ? panelsByKey.get(openKey) : undefined;

  function handleOpen(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
    setStage("STANDARD");
  }

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
          const isActive = openKey === e;
          if (panel.sublabel) {
            return (
              <button
                key={e}
                type="button"
                aria-expanded={isActive}
                onClick={() => handleOpen(e)}
                className={`${isActive ? chipWithSubActiveCls : chipWithSubCls} flex flex-col items-center leading-tight`}
              >
                <span>{panel.title}</span>
                <span className={`text-[9.5px] font-normal ${isActive ? "text-ivory-100/70" : "text-navy-900/55"}`}>
                  {panel.sublabel}
                </span>
              </button>
            );
          }
          return (
            <button
              key={e}
              type="button"
              aria-expanded={isActive}
              onClick={() => handleOpen(e)}
              className={isActive ? chipActiveCls : chipCls}
            >
              {e}
            </button>
          );
        })}
      </div>

      {openPanel && (
        <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
          <p className="font-display text-[16px] font-semibold text-navy-950">
            {openPanel.title}
            {openPanel.sublabel && (
              <span className="ml-1.5 font-label text-[11px] font-normal text-charcoal-600/70">
                ({openPanel.sublabel})
              </span>
            )}{" "}
            <span className="font-normal text-charcoal-600">— {openPanel.subtitle}</span>
          </p>

          {/* STANDARD / ADVANCED|INTENSIVE — 페이지 수(문제량)와는 다른 축입니다 */}
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              aria-pressed={stage === "STANDARD"}
              onClick={() => setStage("STANDARD")}
              className={stage === "STANDARD" ? stageBtnActiveCls : stageBtnCls}
            >
              STANDARD
            </button>
            <button
              type="button"
              aria-pressed={stage === "UPGRADE"}
              onClick={() => setStage("UPGRADE")}
              className={stage === "UPGRADE" ? stageBtnActiveCls : stageBtnCls}
            >
              {stageLabel(openPanel.stageType)}
            </button>
          </div>

          {stage === "STANDARD" ? (
            <>
              <p className="mt-5 text-[12.5px] leading-relaxed text-charcoal-600">
                {openPanel.title}의 전체 시험 구조와 주요 유형을 정상적으로 준비하는 완전한 기본 시험 대비
                구성입니다.
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
            </>
          ) : (
            <div className="mt-5">
              <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">
                {stageLabel(openPanel.stageType)}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{openPanel.stageText}</p>
              {openPanel.stageNote && (
                <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-700">{openPanel.stageNote}</p>
              )}
              <p className="mt-3 text-[12px] leading-relaxed text-charcoal-600/70">
                100P·200P 분량은 STANDARD와 동일하게 적용되며, 가격도 같은 분량 기준 그대로입니다. STANDARD와{" "}
                {stageLabel(openPanel.stageType)}는 서로 다른 문제로 구성됩니다 — 단순히 문제 수를 늘린
                버전이 아닙니다.
              </p>
            </div>
          )}

          {/* STANDARD + ADVANCED|INTENSIVE 추가 구매 */}
          <div className="mt-5 border-t border-ivory-300 pt-4">
            <p className="text-[13.5px] font-medium text-navy-950">
              {openPanel.title} STANDARD + {stageLabel(openPanel.stageType)}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">
              {openPanel.stageType === "advanced"
                ? "기본 시험 대비 후, 난이도를 한 단계 높여 추가로 준비합니다. 두 문제집은 서로 다른 문제로 제작됩니다."
                : "기본 전체 시험 대비 후, 취약 영역을 추가로 집중 훈련합니다. 두 문제집은 서로 다른 문제로 제작됩니다."}
            </p>
          </div>

          {openPanel.note && (
            <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/80">{openPanel.note}</p>
          )}

          <div className="mt-5 border-t border-ivory-300 pt-4">
            <p className="text-[12.5px] leading-relaxed text-charcoal-600">{openPanel.kakaoLine}</p>
          </div>

          <div className="mt-5">
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 bg-navy-900 px-6 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              <MessageCircle size={15} />
              {openPanel.title} 카카오톡으로 문의
            </a>
          </div>

          <p className="mt-4 text-[11.5px] leading-relaxed text-charcoal-600/60">{DISCLAIMER}</p>
        </div>
      )}
    </div>
  );
}
