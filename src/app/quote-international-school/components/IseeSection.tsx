"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, SPECIAL_KRW, formatKRW } from "@/app/quote/data";

type Level = "Lower" | "Middle" | "Upper";
type Stage = "STANDARD" | "ADVANCED";

const LEVELS: Level[] = ["Lower", "Middle", "Upper"];

const chipCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2 text-center text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const chipActiveCls =
  "flex-1 border border-navy-900 bg-navy-900 px-3 py-2 text-center text-[12.5px] font-medium text-ivory-100";

export default function IseeSection() {
  const [level, setLevel] = useState<Level>("Middle");
  const [stage, setStage] = useState<Stage>("STANDARD");
  const [addBoth, setAddBoth] = useState(false);
  const [pages, setPages] = useState<number>(100);

  const priceOf = (p: number) => flexibleVolumes.find((v) => v.pages === p)!.priceKRW;

  const result = useMemo(() => {
    if (addBoth) {
      return {
        title: `ISEE ${level} STANDARD + ${level} ADVANCED PRACTICE`,
        desc: `${level} Level 안에서 기본 대비와 심화 연습을 함께 준비합니다. 두 교재는 서로 다른 문제로 구성됩니다.`,
        price: priceOf(pages) * 2,
      };
    }
    return {
      title: `ISEE ${level} ${stage === "STANDARD" ? "Standard" : "Advanced Practice"}`,
      desc:
        stage === "STANDARD"
          ? `${level} Level의 주요 시험 유형 전체를 대비합니다.`
          : `${level} Level 범위 안에서 더 어려운 Verbal · Reading · Quantitative · Math 문제에 집중합니다. 상위 Level을 의미하지 않습니다.`,
      price: priceOf(pages),
    };
  }, [level, stage, addBoth, pages]);

  return (
    <section id="isee" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">ISEE</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          ISEE 레벨별 대비
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          Verbal Reasoning · Reading Comprehension · Quantitative Reasoning · Mathematics Achievement 중
          필요 영역을 선택할 수 있습니다. Level(Lower/Middle/Upper) 안에서 Standard와 Advanced Practice를
          선택하는 것이며, Advanced Practice가 Upper Level을 의미하지는 않습니다.
        </p>

        {/* 공통 분량 표 — 참고용, 아래 선택과 별개로 그대로 유지 */}
        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
          {flexibleVolumes.map((v) => (
            <div key={v.pages} className="flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]">
              <span className="text-charcoal-600">{v.label}</span>
              <span className="font-medium text-navy-950">{formatKRW(v.priceKRW)}</span>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]">
            <span className="text-charcoal-600">200P Special</span>
            <span className="font-medium text-navy-950">{formatKRW(SPECIAL_KRW)}</span>
          </div>
        </div>

        {/* Level × Stage × 분량 선택 */}
        <div className="mt-8 border border-ivory-300 bg-white p-6">
          <p className="text-center font-label text-[10.5px] uppercase tracking-[0.14em] text-charcoal-600/60">
            직접 선택해보세요
          </p>

          <div className="mt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Level</p>
            <div className="mt-2 flex gap-2">
              {LEVELS.map((l) => (
                <button key={l} type="button" onClick={() => setLevel(l)} className={level === l ? chipActiveCls : chipCls}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
              얼마나 많은 문제를 풀 것인가?
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {flexibleVolumes.map((v) => (
                <button
                  key={v.pages}
                  type="button"
                  onClick={() => setPages(v.pages)}
                  className={pages === v.pages ? chipActiveCls : chipCls}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">난이도</p>
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
          </div>

          <div className="mt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
              한 단계 더 준비할 것인가?
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setAddBoth(false)} className={!addBoth ? chipActiveCls : chipCls}>
                선택한 난이도만
              </button>
              <button type="button" onClick={() => setAddBoth(true)} className={addBoth ? chipActiveCls : chipCls}>
                STANDARD + ADVANCED PRACTICE
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

        {/* 한 단계 더 준비한다면 */}
        <div className="mt-8 border border-ivory-300 bg-white p-7 sm:p-8">
          <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
            한 단계 더 준비한다면
          </p>
          <div className="mt-5 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <div className="border-t-2 border-navy-900/70 bg-ivory-100 p-4">
              <p className="font-label text-[10px] tracking-[0.12em] text-brass-500">현재</p>
              <p className="mt-1.5 font-display text-[14.5px] font-semibold text-navy-950">{level} STANDARD</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600">
                {level} Level의 주요 유형 전체 대비
              </p>
            </div>
            <div className="flex items-center justify-center text-navy-800/40">
              <span className="hidden font-display text-[18px] leading-none sm:inline">→</span>
              <span className="font-display text-[18px] leading-none sm:hidden">↓</span>
            </div>
            <div className="border-t-2 border-navy-900/70 bg-ivory-100 p-4">
              <p className="font-label text-[10px] tracking-[0.12em] text-brass-500">같은 Level 심화</p>
              <p className="mt-1.5 font-display text-[14.5px] font-semibold text-navy-950">
                {level} ADVANCED PRACTICE
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600">
                고난도 Vocabulary·Reading·Quantitative·Math 추가 연습
              </p>
            </div>
          </div>
        </div>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          ISEE 구성 상담
        </a>
      </div>
    </section>
  );
}
