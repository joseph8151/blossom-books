"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 같은 스킬을 Foundation → Standard → Advanced 실제 문제로 비교시켜, 난이도에 대한 의심을 해소합니다.
type Level = "Foundation" | "Standard" | "Advanced";
const LEVELS: Level[] = ["Foundation", "Standard", "Advanced"];
const LEVEL_COLOR: Record<Level, string> = { Foundation: "#7d8a6a", Standard: "#ad8a4e", Advanced: "#b06a3c" };
const LEVEL_KO: Record<Level, string> = { Foundation: "기초", Standard: "표준", Advanced: "응용·심화" };

interface Ladder {
  subject: string;
  skill: string;
  steps: Record<Level, { q: string; note: string }>;
}

const ladders: Ladder[] = [
  {
    subject: "Reading",
    skill: "같은 지문, 다른 질문",
    steps: {
      Foundation: { q: "What is the main idea of the passage?", note: "글에 드러난 중심 내용을 직접 찾습니다." },
      Standard: { q: "Which statement best summarizes the whole passage?", note: "여러 정보를 요약·종합해야 합니다." },
      Advanced: { q: "Which inference is best supported by the author's argument?", note: "직접 쓰이지 않은 내용을 근거로 추론합니다." },
    },
  },
  {
    subject: "Vocabulary",
    skill: "단어 의미 파악",
    steps: {
      Foundation: { q: "What does the word “timid” mean?", note: "단어의 기본 뜻을 압니다." },
      Standard: { q: "In this sentence, what does “novel” most nearly mean?", note: "문맥 단서로 의미를 고릅니다." },
      Advanced: { q: "Which word could replace “elaborate” without changing the meaning?", note: "뉘앙스까지 고려해 대체어를 찾습니다." },
    },
  },
  {
    subject: "Math",
    skill: "수학적 사고",
    steps: {
      Foundation: { q: "What is 7 × 8?", note: "기본 연산을 수행합니다." },
      Standard: { q: "A rectangle is 3 cm longer than it is wide, and its perimeter is 26 cm. Find its width.", note: "식을 세워 여러 단계로 풉니다." },
      Advanced: { q: "The line passes through (1, 1) and (3, 5). Find its slope.", note: "개념을 적용해 그래프를 해석합니다." },
    },
  },
];

export default function CompareLevels() {
  const [idx, setIdx] = useState(0);
  const ladder = ladders[idx];

  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Compare the levels</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            난이도는 말이 아니라 문제로 확인하세요
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.85] text-charcoal-600">
            같은 학년이라도 학생마다 맞는 난이도는 다릅니다. 같은 스킬을 Blossom Level 3단계로 나란히 비교해
            보세요 — 우리 아이에게 어느 단계가 맞는지 바로 감이 옵니다.
          </p>
        </div>

        {/* 과목 선택 */}
        <div className="mt-8 flex flex-wrap gap-2">
          {ladders.map((l, i) => (
            <button
              key={l.subject}
              onClick={() => setIdx(i)}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                i === idx ? "bg-navy-900 text-ivory-100" : "border border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
              }`}
            >
              {l.subject}
            </button>
          ))}
        </div>

        {/* 3단계 비교 */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {LEVELS.map((lv) => {
            const step = ladder.steps[lv];
            return (
              <div key={lv} className="flex flex-col border border-navy-800/12 bg-ivory-100 shadow-card">
                <div className="flex items-center justify-between border-b border-navy-800/10 px-5 py-3">
                  <span className="inline-flex items-center gap-2 font-label text-[10.5px] uppercase tracking-[0.12em] text-navy-900">
                    <span className="h-2 w-2 rounded-full" style={{ background: LEVEL_COLOR[lv] }} />
                    {lv}
                  </span>
                  <span className="text-[11px] text-charcoal-600">{LEVEL_KO[lv]}</span>
                </div>
                <div className="flex flex-1 flex-col px-5 py-5">
                  <p className="font-label text-[9.5px] uppercase tracking-[0.1em] text-brass-500">{ladder.subject} · Sample</p>
                  <p className="mt-2 flex-1 text-[14.5px] font-medium leading-relaxed text-navy-950">{step.q}</p>
                  <p className="mt-4 border-t border-navy-800/10 pt-3 text-[12.5px] leading-relaxed text-charcoal-600">
                    {step.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[13px] text-charcoal-600">
          어느 단계가 맞는지 모르시겠나요?{" "}
          <Link href="/find" className="group inline-flex items-center gap-1 font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">
            내게 맞는 교재 찾기
            <ArrowRight size={14} className="text-brass-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
