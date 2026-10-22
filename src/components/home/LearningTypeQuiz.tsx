"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { siteConfig } from "@/data/site";

// 홈페이지용 30초 진단 퀴즈 — /find(전체 추천 도구)로 가기 전, 가볍게 재미로
// 해보는 3문항 퀴즈입니다. 결과 "유형"은 바로 보여주되(재미 요소), 구체적인
// 추천 구성은 다른 카톡 유도 도구들과 동일하게 카카오톡 상담을 받아야
// 공개됩니다.

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

const Q3_OPTIONS = [
  "학원·학교 레벨테스트 통과",
  "국제학교 입시·편입 준비",
  "학년 수준 따라가기 / 보충",
  "특정 시험 대비 (SAT·AP·IB 등)",
];

export default function LearningTypeQuiz() {
  const [step, setStep] = useState(0); // 0,1,2 = questions, 3 = result
  const [grade, setGrade] = useState("");
  const [concern, setConcern] = useState("");
  const [typeId, setTypeId] = useState("");
  const [goal, setGoal] = useState("");
  const [revealed, setRevealed] = useState(false);

  const type = TYPES[typeId];

  function pickGrade(v: string) {
    setGrade(v);
    setStep(1);
  }
  function pickConcern(v: string, t: string) {
    setConcern(v);
    setTypeId(t);
    setStep(2);
  }
  function pickGoal(v: string) {
    setGoal(v);
    setStep(3);
  }
  function restart() {
    setStep(0);
    setGrade("");
    setConcern("");
    setTypeId("");
    setGoal("");
    setRevealed(false);
  }
  function goKakao() {
    const message = [
      "안녕하세요. 홈페이지 학습 진단 퀴즈로 왔습니다.",
      "",
      `학년: ${grade}`,
      `고민: ${concern}`,
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
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">30-Second Check</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight sm:text-[31px]">
            우리 아이는 어떤 학습 유형일까요?
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-ivory-200/75">
            질문 3개에 답하면 바로 결과가 나옵니다. 30초면 충분해요.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl border border-ivory-100/12 bg-ivory-100/[0.04] p-6 sm:p-8">
          {step < 3 && (
            <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-400">
              Question {step + 1} / 3
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
              <p className="mt-2 font-display text-[18px] font-semibold text-ivory-100">목표는?</p>
              <div className="mt-4 grid gap-2">
                {Q3_OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => pickGoal(o)} className={chipCls}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && type && (
            <div className="text-center">
              <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-400">Your Type</p>
              <p className="mt-3 font-display text-[28px] font-semibold text-ivory-100">{type.name}</p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ivory-200/80">{type.tagline}</p>

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
                <Link
                  href="/find"
                  className="group inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ivory-100/60 transition-colors hover:text-ivory-100"
                >
                  더 정확한 추천 받기
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
