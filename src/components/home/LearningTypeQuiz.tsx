"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle, RotateCcw } from "lucide-react";
import { siteConfig } from "@/data/site";
import { products } from "@/data/products";
import { Product, CurriculumTrack } from "@/lib/types";
import ProductCard from "@/components/books/ProductCard";

// 홈페이지용 진단 퀴즈 — 가볍게 재미로 해보는 5문항 퀴즈입니다. 결과
// "유형"은 바로 보여주고, 답변(학년·걱정 영역·목표)을 기준으로 실제
// 카탈로그에서 교재를 추천해 보여줍니다(과거 /find의 매칭 아이디어를 이
// 퀴즈 답변에 맞게 단순화한 버전). 가격은 카드에서 항상 숨겨지며(기본
// hidePrice), 정확한 구성·가격은 다른 카톡 유도 도구들과 동일하게
// 카카오톡 상담을 받아야 안내됩니다.

interface QuizType {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  accentSoft: string;
}

const TYPES: Record<string, QuizType> = {
  foundation: {
    id: "foundation",
    name: "탄탄기초형",
    tagline: "기본기부터 차근차근 쌓는 게 먼저인 타입이에요.",
    accent: "#4c5f8a",
    accentSoft: "#eef1f6",
  },
  focused: {
    id: "focused",
    name: "집중보완형",
    tagline: "약한 영역 하나만 제대로 잡으면 확 달라지는 타입이에요.",
    accent: "#6d2432",
    accentSoft: "#f3e9ea",
  },
  leap: {
    id: "leap",
    name: "도약준비형",
    tagline: "다음 단계를 앞두고 미리 준비해두는 게 유리한 타입이에요.",
    accent: "#5f6f52",
    accentSoft: "#eef1e8",
  },
  challenger: {
    id: "challenger",
    name: "상위도전형",
    tagline: "지금보다 한 단계 더 높은 곳을 노려보는 타입이에요.",
    accent: "#7d7a45",
    accentSoft: "#f2f1e6",
  },
};

const Q1_OPTIONS = ["초등 저학년 (K–2)", "초등 고학년 (3–6)", "중학생 (7–8)", "고등학생 (9–12)"];

const Q2_OPTIONS: { label: string; type: string }[] = [
  { label: "기초가 부족해요", type: "foundation" },
  { label: "특정 영역만 약해요", type: "focused" },
  { label: "다음 레벨·시험이 걱정돼요", type: "leap" },
  { label: "더 잘하고 싶어요 (심화·상위권)", type: "challenger" },
];

const Q3_OPTIONS = ["Reading (독해)", "Vocabulary·Grammar (어휘·문법)", "Writing (작문)", "Math (수학)"];

const Q4_OPTIONS = ["1개월 이내", "1~3개월", "3~6개월", "아직 정하지 않았어요"];

const Q5_OPTIONS = [
  "학원·학교 레벨테스트 통과",
  "국제학교 입시·편입 준비",
  "학년 수준 따라가기 / 보충",
  "특정 시험 대비 (SAT·AP·IB 등)",
];

const TOTAL_QUESTIONS = 5;

// Q1 라벨 → 대략적인 학년 범위(0=K 기준)
const GRADE_RANGES: Record<string, [number, number]> = {
  "초등 저학년 (K–2)": [0, 2],
  "초등 고학년 (3–6)": [3, 6],
  "중학생 (7–8)": [7, 8],
  "고등학생 (9–12)": [9, 12],
};

// Q5(목표) 라벨 → 매칭에 쓸 상품 track
const GOAL_TRACK: Record<string, CurriculumTrack> = {
  "학원·학교 레벨테스트 통과": "level-test",
  "국제학교 입시·편입 준비": "admissions",
  "학년 수준 따라가기 / 보충": "us-curriculum",
  "특정 시험 대비 (SAT·AP·IB 등)": "ap",
};

// Q3(걱정 영역) 라벨 → product.subject/units에서 찾을 키워드
const AREA_KEYWORDS: Record<string, string[]> = {
  "Reading (독해)": ["Reading"],
  "Vocabulary·Grammar (어휘·문법)": ["Vocabulary", "Grammar"],
  "Writing (작문)": ["Writing"],
  "Math (수학)": ["Math", "Algebra", "Geometry", "Calculus"],
};

// product.gradeRange("Grade 8–9", "G4 – G11 (레벨별)" 등)에서 숫자만 뽑아 범위로.
function productGradeRange(str: string): [number, number] {
  const n = (str.match(/\d+/g) || []).map(Number);
  if (!n.length) return [0, 12];
  return [Math.min(...n), Math.max(...n)];
}
function overlaps(a: [number, number], b: [number, number]): boolean {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}

// 답변 3개(학년·걱정 영역·목표)로 실제 카탈로그에서 가장 잘 맞는 교재
// 상위 3개를 고릅니다. "가장 비싼 교재"가 아니라 학년·목표에 맞는 교재를
// 고르는 것이 목적입니다.
function recommendProducts(grade: string, weakArea: string, goal: string): Product[] {
  const gRange = GRADE_RANGES[grade];
  const track = GOAL_TRACK[goal];
  const keywords = AREA_KEYWORDS[weakArea] ?? [];
  const pool = products.filter((p) => p.materialType === "existing" && p.sampleAvailable);

  return pool
    .map((p) => {
      let score = 0;
      if (track && p.track === track) score += 40;
      if (gRange && overlaps(gRange, productGradeRange(p.gradeRange))) score += 15;
      if (keywords.some((k) => p.subject.includes(k) || p.units.some((u) => u.includes(k)))) score += 20;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);
}

export default function LearningTypeQuiz({ pageHref }: { pageHref?: string } = {}) {
  const [step, setStep] = useState(0); // 0~4 = questions, 5 = result
  const [grade, setGrade] = useState("");
  const [concern, setConcern] = useState("");
  const [typeId, setTypeId] = useState("");
  const [weakArea, setWeakArea] = useState("");
  const [timeline, setTimeline] = useState("");
  const [goal, setGoal] = useState("");
  const [revealed, setRevealed] = useState(false);

  const type = TYPES[typeId];
  const recommended = useMemo(() => recommendProducts(grade, weakArea, goal), [grade, weakArea, goal]);

  function pickGrade(v: string) {
    setGrade(v);
    setStep(1);
  }
  function pickConcern(v: string, t: string) {
    setConcern(v);
    setTypeId(t);
    setStep(2);
  }
  function pickWeakArea(v: string) {
    setWeakArea(v);
    setStep(3);
  }
  function pickTimeline(v: string) {
    setTimeline(v);
    setStep(4);
  }
  function pickGoal(v: string) {
    setGoal(v);
    setStep(5);
  }
  function restart() {
    setStep(0);
    setGrade("");
    setConcern("");
    setTypeId("");
    setWeakArea("");
    setTimeline("");
    setGoal("");
    setRevealed(false);
  }
  function goKakao() {
    const message = [
      "안녕하세요. 홈페이지 학습 진단 퀴즈로 왔습니다.",
      "",
      `학년: ${grade}`,
      `고민: ${concern}`,
      `걱정되는 영역: ${weakArea}`,
      `시험까지 남은 기간: ${timeline}`,
      `목표: ${goal}`,
      `진단 유형: ${type?.name ?? "-"}`,
      "",
      "이 유형에 맞는 추천 구성 부탁드립니다.",
    ].join("\n");
    try {
      navigator.clipboard?.writeText(message);
    } catch {
      /* 클립보드 미지원 환경은 무시 */
    }
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
    setRevealed(true);
  }

  const chipCls =
    "w-full border border-ivory-100/20 bg-navy-950 px-4 py-3 text-left text-[13.5px] font-medium text-ivory-100 transition-colors hover:border-brass-400/60 hover:bg-navy-900";

  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-16 text-ivory-100 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">Quick Check</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight sm:text-[31px]">
            우리 아이는 어떤 학습 유형일까요?
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-ivory-200/75">
            질문 {TOTAL_QUESTIONS}개에 답하면 바로 결과가 나옵니다. 1분이면 충분해요.
          </p>
          {pageHref && (
            <Link
              href={pageHref}
              className="mt-3 inline-block text-[12.5px] font-medium text-brass-400 underline decoration-brass-400/50 underline-offset-4 transition-colors hover:text-brass-300"
            >
              전체 화면으로 진단하기
            </Link>
          )}
        </div>

        <div className="mx-auto mt-10 max-w-xl border border-ivory-100/12 bg-ivory-100/[0.04] p-6 sm:p-8">
          {step < TOTAL_QUESTIONS && (
            <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-400">
              Question {step + 1} / {TOTAL_QUESTIONS}
            </p>
          )}

          {step === 0 && (
            <>
              <p className="mt-2 font-display text-[18px] font-semibold text-ivory-100">자녀 학년은?</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {Q1_OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => pickGrade(o)} className={chipCls}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="mt-2 font-display text-[18px] font-semibold text-ivory-100">
                요즘 가장 큰 고민은?
              </p>
              <div className="mt-4 grid gap-2">
                {Q2_OPTIONS.map((o) => (
                  <button key={o.label} type="button" onClick={() => pickConcern(o.label, o.type)} className={chipCls}>
                    {o.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="mt-2 font-display text-[18px] font-semibold text-ivory-100">
                가장 걱정되는 영역은?
              </p>
              <div className="mt-4 grid gap-2">
                {Q3_OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => pickWeakArea(o)} className={chipCls}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="mt-2 font-display text-[18px] font-semibold text-ivory-100">
                시험까지 남은 기간은?
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {Q4_OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => pickTimeline(o)} className={chipCls}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <p className="mt-2 font-display text-[18px] font-semibold text-ivory-100">목표는?</p>
              <div className="mt-4 grid gap-2">
                {Q5_OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => pickGoal(o)} className={chipCls}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 5 && type && (
            <div className="text-center">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-400">Your Type</p>
              <p className="mt-3 font-display text-[28px] font-semibold text-ivory-100">{type.name}</p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ivory-200/80">{type.tagline}</p>

              {recommended.length > 0 && (
                <div className="mt-7 border-t border-ivory-100/12 pt-6 text-left">
                  <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-400">
                    Recommended for you
                  </p>
                  <div className="mt-4 grid gap-4 text-charcoal-900 sm:grid-cols-2 lg:grid-cols-3">
                    {recommended.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-ivory-200/55">
                    답변을 바탕으로 한 참고용 추천입니다. 정확한 구성·분량은 카카오톡 상담에서 확인하실 수
                    있습니다.
                  </p>
                </div>
              )}

              {!revealed ? (
                <div className="mt-7 border-t border-ivory-100/12 pt-6">
                  <p className="text-[13px] leading-relaxed text-ivory-200/75">
                    {type.name}에 맞는 추천 분량·시작 구성은 카카오톡 상담에서 바로 안내해 드립니다.
                  </p>
                  <button
                    type="button"
                    onClick={goKakao}
                    className="mt-5 inline-flex items-center justify-center gap-2 bg-brass-500 px-6 py-3 text-[13.5px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
                  >
                    <MessageCircle size={15} /> 카카오톡으로 추천 구성 받기
                  </button>
                </div>
              ) : (
                <div className="mt-7 border-t border-ivory-100/12 pt-6">
                  <p className="text-[13px] leading-relaxed text-ivory-200/75">
                    메시지가 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주시면 {type.name}에 맞는 구성을
                    바로 안내해 드립니다.
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ivory-100/60 transition-colors hover:text-ivory-100"
                >
                  <RotateCcw size={13} /> 다시 하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
