"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { CAT4_PRICES, SPECIAL_ADD, formatKRW } from "@/app/quote/data";

type Level = "A" | "B" | "C" | "D" | "E" | "F" | "G";
type Stage = "STANDARD" | "ADVANCED";

const LEVELS: Level[] = ["A", "B", "C", "D", "E", "F", "G"];

const rowCls = "flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]";

const chipCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2 text-center text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const chipActiveCls =
  "flex-1 border border-navy-900 bg-navy-900 px-3 py-2 text-center text-[12.5px] font-medium text-ivory-100";

const STANDARD_AREAS = ["Verbal", "Non-Verbal", "Quantitative", "Spatial Reasoning"];
const ADVANCED_POINTS = ["복합적인 Reasoning", "변형 문제", "고난도 패턴", "다단계 사고"];

const TWO_STEP = [
  { label: "STEP 01", title: "STANDARD", body: "해당 Level의 주요 유형 대비" },
  { label: "STEP 02", title: "ADVANCED PRACTICE", body: "같은 Level 안에서 더 복합적인 reasoning 추가 연습" },
];

export default function Cat4Section() {
  const [level, setLevel] = useState<Level>("E");
  const [stage, setStage] = useState<Stage>("STANDARD");
  const [addBoth, setAddBoth] = useState(false);

  const result = useMemo(() => {
    if (addBoth) {
      return {
        title: `CAT4 Level ${level} STANDARD + ADVANCED PRACTICE`,
        desc: `같은 Level ${level} 안에서 기본 대비와 심화 연습을 함께 준비합니다. 두 교재는 서로 다른 문제로 구성됩니다.`,
        price: CAT4_PRICES.oneLevel * 2,
      };
    }
    return {
      title: `CAT4 Level ${level} ${stage === "STANDARD" ? "Standard" : "Advanced Practice"}`,
      desc:
        stage === "STANDARD"
          ? `Level ${level}의 Verbal · Non-Verbal · Quantitative · Spatial Reasoning 주요 유형을 충분히 연습합니다.`
          : `같은 Level ${level}을 기반으로 더 복합적인 reasoning, 변형 문제, 고난도 패턴, 다단계 사고를 추가 연습합니다.`,
      price: CAT4_PRICES.oneLevel,
    };
  }, [level, stage, addBoth]);

  return (
    <section id="cat4" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">CAT4</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          CAT4 Level별 대비
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          CAT4는 학생 연령과 학년에 따라 시험 Level(A~G)이 달라집니다. Level은 학생의 연령·시험 기준이고,
          아래 STANDARD/ADVANCED PRACTICE는 같은 Level 안에서 문제 난이도와 연습 정도를 나누는 Blossom
          Books의 구성입니다 — Level E Standard, Level F Advanced처럼 Level과 난이도를 섞어 쓰지 않습니다.
        </p>

        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
          <div className={rowCls}>
            <span className="text-charcoal-600">1 Level</span>
            <span className="font-medium text-navy-950">{formatKRW(CAT4_PRICES.oneLevel)}</span>
          </div>
          <div className={rowCls}>
            <span className="text-charcoal-600">Special</span>
            <span className="font-medium text-navy-950">기본 구성 + {formatKRW(SPECIAL_ADD)}</span>
          </div>
        </div>

        {/* Level × Standard/Advanced Practice — 같은 Level 안에서 심화 연습을 선택합니다 */}
        <div className="mt-8 border border-ivory-300 bg-white p-6">
          <p className="text-center font-label text-[10.5px] uppercase tracking-[0.14em] text-charcoal-600/60">
            직접 선택해보세요
          </p>

          <div className="mt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
              STEP 1 · CAT4 Level
            </p>
            <div className="mt-2 flex gap-1.5">
              {LEVELS.map((l) => (
                <button key={l} type="button" onClick={() => setLevel(l)} className={level === l ? chipActiveCls : chipCls}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
              STEP 2 · 준비 단계
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStage("STANDARD")}
                className={stage === "STANDARD" && !addBoth ? chipActiveCls : chipCls}
              >
                STANDARD
              </button>
              <button
                type="button"
                onClick={() => setStage("ADVANCED")}
                className={stage === "ADVANCED" && !addBoth ? chipActiveCls : chipCls}
              >
                ADVANCED PRACTICE
              </button>
            </div>
            {stage === "ADVANCED" && !addBoth && (
              <div className="mt-3 border border-ivory-300 bg-ivory-100 p-3">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-charcoal-600">
                  {ADVANCED_POINTS.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </div>
            )}
            {stage === "STANDARD" && !addBoth && (
              <div className="mt-3 border border-ivory-300 bg-ivory-100 p-3">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-charcoal-600">
                  {STANDARD_AREAS.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
              STEP 3 · 한 단계 더 준비할 것인가?
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setAddBoth(false)} className={!addBoth ? chipActiveCls : chipCls}>
                선택한 난이도만
              </button>
              <button type="button" onClick={() => setAddBoth(true)} className={addBoth ? chipActiveCls : chipCls}>
                STANDARD + ADVANCED
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-ivory-300 pt-5">
            <p className="font-display text-[16px] font-semibold text-navy-950">{result.title}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{result.desc}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-[22px] font-semibold text-navy-950">{formatKRW(result.price)}</p>
              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 bg-navy-900 px-6 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
              >
                <MessageCircle size={15} />
                이 구성 상담하기
              </a>
            </div>
          </div>
        </div>

        {/* CAT4에는 서로 다른 두 종류의 확장이 있습니다 — 같은 Level 심화 vs 다음 Level까지 */}
        <div className="mt-8 border-2 border-navy-900 bg-white p-6 sm:p-7">
          <span className="inline-flex items-center rounded-sm bg-brass-500 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-950">
            CAT4 2-Level Package
          </span>
          <p className="mt-3 text-[14px] font-medium text-navy-950">
            한 Level만 준비할지, 두 Level의 유형까지 폭넓게 연습할지 선택하세요.
          </p>
          <div className="mt-4 grid gap-3 border-t border-ivory-300 pt-4 sm:grid-cols-2">
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">더 어려운 문제까지 연습하고 싶다면</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">
                → Advanced Practice (같은 Level 안에서 심화)
              </p>
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">현재 Level과 다음 Level까지 준비하려면</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">→ 2 Levels (다음 Level까지 확장)</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 border-t border-ivory-300 pt-4 sm:grid-cols-2">
            <div>
              <p className="font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/60">1 Level</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-700">현재 준비 Level 집중</p>
            </div>
            <div>
              <p className="font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/60">2 Levels</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-700">
                두 Level의 서로 다른 문제 유형과 난이도 범위를 연습
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-baseline justify-between border-t border-ivory-300 pt-4">
            <span className="text-[13.5px] text-charcoal-600">
              2 Levels{" "}
              <span className="font-label text-[9.5px] uppercase tracking-[0.08em] text-brass-500">
                10% Package Saving
              </span>
            </span>
            <span className="font-display text-[20px] font-semibold text-navy-950">
              {formatKRW(CAT4_PRICES.twoLevels)}
            </span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-charcoal-600/70">
            정가 {formatKRW(CAT4_PRICES.twoLevelsList)} 대비 10% 할인이 적용된 가격입니다. 이 할인은 2 Levels
            상품 전용이며, Standard + Advanced Practice 구매에는 별도로 적용되지 않습니다.
          </p>

          <p className="mt-5 border-t border-ivory-300 pt-4 text-[12px] leading-relaxed text-charcoal-600/70">
            학생에게 맞지 않는 Level을 &ldquo;상위 레벨&rdquo;이라는 이유만으로 권장하지 않습니다. 학생
            연령과 실제 응시 Level을 상담에서 확인한 뒤 안내합니다.
          </p>
        </div>

        {/* 한 단계 더 준비한다면 — Standard → Advanced Practice / 다음 Level 흐름 */}
        <div className="mt-10 border border-ivory-300 bg-white p-7 sm:p-8">
          <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
            한 단계 더 준비한다면
          </p>
          <div className="mt-5 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
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
          <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/70">
            또는 같은 Level에서 넓히는 대신 다음 Level까지 준비하려면 위 2-Level Package를 확인하세요.
          </p>
        </div>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          CAT4 Level 상담
        </a>
      </div>
    </section>
  );
}
