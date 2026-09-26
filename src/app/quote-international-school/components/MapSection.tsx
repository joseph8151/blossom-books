"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MAP_PRICES, SPECIAL_ADD, formatKRW } from "@/app/quote/data";

type Stage = "STANDARD" | "ADVANCED";

const rowCls = "flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]";

const stageBtnCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2 text-center text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const stageBtnActiveCls =
  "flex-1 border border-navy-900 bg-navy-900 px-3 py-2 text-center text-[12.5px] font-medium text-ivory-100";

const STANDARD_POINTS = ["현재 수준", "기본 유형", "일반 응용", "시험 형식 적응"];
const ADVANCED_ENGLISH_POINTS = ["Higher-level Reading", "Advanced Vocabulary", "Complex Language Usage"];
const ADVANCED_MATH_POINTS = ["Multi-step Math", "Higher-level Reasoning"];

const TWO_STEP = [
  { label: "STEP 01", title: "STANDARD", body: "현재 학년·수준의 주요 유형 대비" },
  { label: "STEP 02", title: "ADVANCED PRACTICE", body: "더 높은 난도의 Reading / Language / Math 연습" },
];

export default function MapSection() {
  const [stage, setStage] = useState<Stage>("STANDARD");

  return (
    <section id="map" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">Map Growth</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          MAP Growth 대비 문제집
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          학생의 학년과 시험 목적에 따라 English와 Math 영역을 선택해 준비할 수 있습니다. MAP Growth는 학생
          수준에 따라 문제 난이도가 달라지는 adaptive assessment이므로, 아래 ADVANCED PRACTICE는 공식 시험
          단계가 아니라 더 높은 난도의 문제를 연습하는 Blossom Books의 별도 구성입니다.
        </p>

        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
          <div className={rowCls}>
            <span className="text-charcoal-600">English — 100P + Explanation</span>
            <span className="font-medium text-navy-950">{formatKRW(MAP_PRICES.english)}</span>
          </div>
          <div className={rowCls}>
            <span className="text-charcoal-600">Math — 60P + Explanation</span>
            <span className="font-medium text-navy-950">{formatKRW(MAP_PRICES.math)}</span>
          </div>
          <div className={rowCls}>
            <span className="text-charcoal-600">English + Math</span>
            <span className="font-medium text-navy-950">{formatKRW(MAP_PRICES.both)}</span>
          </div>
          <div className={rowCls}>
            <span className="text-charcoal-600">Special</span>
            <span className="font-medium text-navy-950">기본 구성 + {formatKRW(SPECIAL_ADD)}</span>
          </div>
        </div>

        {/* STANDARD / ADVANCED PRACTICE — 가격은 동일합니다 */}
        <div className="mt-6 flex gap-2">
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
            aria-pressed={stage === "ADVANCED"}
            onClick={() => setStage("ADVANCED")}
            className={stage === "ADVANCED" ? stageBtnActiveCls : stageBtnCls}
          >
            ADVANCED PRACTICE
          </button>
        </div>

        <div className="mt-4 border border-ivory-300 bg-white p-5">
          {stage === "STANDARD" ? (
            <>
              <p className="font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/60">Standard</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">
                현재 학년 및 학생 수준에서 MAP 주요 유형과 개념을 충분히 연습합니다.
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-charcoal-600">
                {STANDARD_POINTS.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">
                Advanced Practice
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">
                현재 학년 수준보다 높은 문제 또는 상위 RIT 수준을 목표로 하는 학생을 위한 심화 연습입니다.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[11.5px] font-medium text-navy-950">Reading / Language Usage</p>
                  <ul className="mt-1.5 space-y-1 text-[12.5px] text-charcoal-600">
                    {ADVANCED_ENGLISH_POINTS.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11.5px] font-medium text-navy-950">Math</p>
                  <ul className="mt-1.5 space-y-1 text-[12.5px] text-charcoal-600">
                    {ADVANCED_MATH_POINTS.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600/70">
                실제 MAP 문항을 복제하거나 공식 MAP 문제라고 표현하지 않습니다.
              </p>
            </>
          )}
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/70">
          MAP English Standard + MAP English Advanced Practice처럼 두 단계 구매도 가능합니다({formatKRW(
            MAP_PRICES.english * 2
          )}). 두 교재는 서로 다른 문제로 구성됩니다.
        </p>

        <p className="mt-5 text-[13px] leading-relaxed text-charcoal-600/80">
          학년과 목표 점수를 알려주시면 필요한 영역과 분량을 기준으로 안내합니다.
        </p>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          MAP 구성 상담
        </a>

        {/* MAP 2-Step Prep — Standard → Advanced Practice 업셀 카드 */}
        <div className="mt-10 border-2 border-navy-900 bg-white p-7 sm:p-8">
          <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">MAP 2-Step Prep</p>
          <h3 className="mt-2.5 font-display text-[19px] font-semibold leading-snug text-navy-950 sm:text-[21px]">
            현재 수준에서 시작해, 한 단계 높은 문제까지.
          </h3>

          <div className="mt-6 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            {TWO_STEP.map((s, i) => (
              <div key={s.label} className="contents">
                <div className="border-t-2 border-navy-900/70 bg-ivory-100 p-4">
                  <p className="font-label text-[10px] tracking-[0.12em] text-brass-500">{s.label}</p>
                  <p className="mt-1.5 font-display text-[14.5px] font-semibold text-navy-950">{s.title}</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600">{s.body}</p>
                </div>
                {i < TWO_STEP.length - 1 && (
                  <div className="flex items-center justify-center text-navy-800/40">
                    <span className="hidden font-display text-[18px] leading-none sm:inline">→</span>
                    <span className="font-display text-[18px] leading-none sm:hidden">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-1.5 border-t border-ivory-300 pt-4">
            <p className="text-[12.5px] leading-relaxed text-charcoal-600">
              두 단계는 서로 다른 문제로 구성됩니다.
            </p>
            <p className="text-[12.5px] leading-relaxed text-charcoal-600/70">
              Advanced Practice는 NWEA의 공식 시험 레벨명이 아니라 Blossom Books의 심화 연습 구성입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
