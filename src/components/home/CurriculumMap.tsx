"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 학년별 학습 로드맵 — 단순 설명이 아니라 시각적 로드맵으로 Blossom Level 체계를 보여줍니다.
const grades = ["K", "G1", "G2", "G3", "G4", "G5", "G6"];
const subjects = ["Reading", "Vocabulary", "Grammar", "Writing", "Math", "Science"];

const levels: { name: string; ko: string; note: string; color: string }[] = [
  { name: "Foundation", ko: "기초", note: "유형에 익숙하지 않은 학생 · 개념 다지기", color: "#7d8a6a" },
  { name: "Standard", ko: "표준", note: "현재 학년 수준의 핵심 영역 준비", color: "#ad8a4e" },
  { name: "Advanced", ko: "응용", note: "상위 난이도 · 고득점 대비", color: "#b06a3c" },
  { name: "Challenge", ko: "심화", note: "선행·최상위 · 복합 사고력", color: "#8a4b52" },
];

export default function CurriculumMap() {
  const [gi, setGi] = useState(4); // G4 default

  const grade = grades[gi];
  const prev = gi > 0 ? grades[gi - 1] : null;

  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Blossom Curriculum Map</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            학년과 수준으로 보는 학습 로드맵
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.85] text-charcoal-600">
            같은 학년이라도 시작점은 다릅니다. 학년을 선택하고, 영역과 Blossom Level 4단계로 어디서
            시작하면 좋을지 확인해 보세요.
          </p>
        </div>

        {/* 학년 스텝 */}
        <div className="mt-8 flex flex-wrap gap-2">
          {grades.map((g, i) => (
            <button
              key={g}
              onClick={() => setGi(i)}
              className={`min-w-[46px] px-3 py-2 text-center text-[13px] font-medium transition-colors ${
                i === gi ? "bg-navy-900 text-ivory-100" : "border border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          {/* 영역 */}
          <div className="border border-navy-800/12 bg-ivory-100 p-6">
            <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{grade} · Subjects</p>
            <p className="mt-1.5 text-[13px] text-charcoal-600">{grade} 학년에서 준비할 수 있는 영역입니다.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {subjects.map((s) => (
                <Link
                  key={s}
                  href={`/books?q=${encodeURIComponent(s)}`}
                  className="border border-navy-800/15 bg-ivory-200/50 px-3 py-1.5 text-[12.5px] text-navy-800 transition-colors hover:border-brass-500/50 hover:text-navy-900"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* 4단계 */}
          <div className="border border-navy-800/12 bg-ivory-100 p-6">
            <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">Blossom Level</p>
            <div className="mt-4 space-y-2.5">
              {levels.map((lv) => (
                <div key={lv.name} className="flex items-start gap-3">
                  <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full" style={{ background: lv.color }} />
                  <div>
                    <p className="text-[13.5px] font-semibold text-navy-950">
                      {lv.name} <span className="font-normal text-charcoal-600">· {lv.ko}</span>
                    </p>
                    <p className="text-[12.5px] leading-snug text-charcoal-600">{lv.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 철학 메시지 */}
        <div className="mt-6 border-l-2 border-brass-500 bg-ivory-100 p-6">
          <p className="text-[14px] leading-[1.85] text-charcoal-900">
            <span className="font-medium text-navy-950">{grade} 학생이라고 모두 {grade} Standard부터 시작하지 않습니다.</span>{" "}
            현재 Reading Level과 영역별 실력에 따라{prev ? ` ${prev} Advanced 또는` : ""} {grade} Foundation이 더 적합할 수
            있습니다. 학생의 실제 수준을 기준으로 시작점을 안내합니다.
          </p>
          <Link
            href="/find"
            className="group mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2"
          >
            내게 맞는 시작점 찾기
            <ArrowRight size={14} className="text-brass-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
