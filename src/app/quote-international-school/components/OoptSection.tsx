"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { OOPT_PRICES, SPECIAL_KRW, formatKRW } from "@/app/quote/data";

type Stage = "STANDARD" | "INTENSIVE";

const rowCls = "flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]";

const stageBtnCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2 text-center text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const stageBtnActiveCls =
  "flex-1 border border-navy-900 bg-navy-900 px-3 py-2 text-center text-[12.5px] font-medium text-ivory-100";

export default function OoptSection() {
  const [stage, setStage] = useState<Stage>("STANDARD");

  return (
    <section id="oopt" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
          Oxford Online Placement Test
        </p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          Oxford Online Placement Test 대비
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          학교·학원·기관의 영어 Placement 평가 대비를 위한 구성입니다. 일반 학원 레벨테스트와는 별도의
          Oxford Online Placement Test 전용 문제집입니다. OOPT는 Placement 목적의 adaptive assessment이므로
          아래 INTENSIVE는 공식 시험 단계가 아니라 Blossom Books의 집중 학습 구성입니다.
        </p>

        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
          <div className={rowCls}>
            <span className="text-charcoal-600">100P</span>
            <span className="font-medium text-navy-950">{formatKRW(OOPT_PRICES.p100)}</span>
          </div>
          <div className={rowCls}>
            <span className="text-charcoal-600">200P</span>
            <span className="font-medium text-navy-950">{formatKRW(OOPT_PRICES.p200)}</span>
          </div>
          <div className={rowCls}>
            <span className="text-charcoal-600">200P Special</span>
            <span className="font-medium text-navy-950">{formatKRW(SPECIAL_KRW)}</span>
          </div>
        </div>

        {/* STANDARD / INTENSIVE — OOPT ADVANCED라는 표현은 사용하지 않습니다 */}
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
            aria-pressed={stage === "INTENSIVE"}
            onClick={() => setStage("INTENSIVE")}
            className={stage === "INTENSIVE" ? stageBtnActiveCls : stageBtnCls}
          >
            INTENSIVE
          </button>
        </div>

        <div className="mt-4 border border-ivory-300 bg-white p-5">
          {stage === "STANDARD" ? (
            <>
              <p className="font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/60">Standard</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">
                시험 형식과 주요 영어 영역을 대비합니다.
              </p>
            </>
          ) : (
            <>
              <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">Intensive</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">
                높은 수준의 영어 문항, 취약 영역 반복, Listening · Use of English 집중, 상위 CEFR 수준
                연습으로 구성됩니다.
              </p>
            </>
          )}
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/70">
          OOPT STANDARD + INTENSIVE처럼 두 단계 구매도 가능합니다({formatKRW(OOPT_PRICES.p100 * 2)}, 100P
          기준). 두 교재는 서로 다른 문제로 구성됩니다.
        </p>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          OOPT 구성 상담
        </a>
      </div>
    </section>
  );
}
