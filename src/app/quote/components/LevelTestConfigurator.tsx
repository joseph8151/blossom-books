"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "../data";

type Volume = 60 | 100 | 200;
type Stage = "STANDARD" | "ADVANCED";

const volumes: Volume[] = [60, 100, 200];

// 분량(문제량)과 난이도는 서로 다른 축입니다. 이 매트릭스는 "같은 분량, 다른
// 난이도"를 짧은 문장으로 설명할 뿐, 페이지 수가 곧 난이도라는 뜻이 아닙니다.
const stageCopy: Record<Volume, { standard: string; advanced: string }> = {
  60: { standard: "기본 시험 대비", advanced: "심화 집중 대비" },
  100: { standard: "충분한 본시험 대비", advanced: "충분한 심화 문제 대비" },
  200: { standard: "가장 많은 문제량의 본시험 대비", advanced: "가장 많은 문제량의 고난도 대비" },
};

const chipCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2.5 text-center text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const chipActiveCls = "flex-1 border border-navy-900 bg-navy-900 px-3 py-2.5 text-center text-[13px] font-medium text-ivory-100";

export default function LevelTestConfigurator() {
  const [volume, setVolume] = useState<Volume>(100);
  const [stage, setStage] = useState<Stage>("STANDARD");
  const [addBoth, setAddBoth] = useState(false);

  const priceOf = (v: Volume) => flexibleVolumes.find((x) => x.pages === v)!.priceKRW;

  const result = useMemo(() => {
    const copy = stageCopy[volume];
    if (addBoth) {
      return {
        title: `${volume}P STANDARD + ${volume}P ADVANCED`,
        desc: "같은 분량으로 두 단계를 모두 준비합니다. 두 교재는 서로 다른 문제로 구성됩니다.",
        price: priceOf(volume) * 2,
        includes: [`${volume}P STANDARD 1권`, `${volume}P ADVANCED 1권`, "각 권 Answer & Explanation Guide"],
      };
    }
    return {
      title: `${volume}P ${stage}`,
      desc: stage === "STANDARD" ? copy.standard : copy.advanced,
      price: priceOf(volume),
      includes: [`${volume}P Student Workbook`, "Answer & Explanation Guide"],
    };
  }, [volume, stage, addBoth]);

  return (
    <div className="mx-auto mt-10 max-w-[620px] border border-ivory-300 bg-white p-6 sm:mt-12 sm:p-8">
      <p className="text-center font-label text-[11px] uppercase tracking-[0.14em] text-charcoal-600/60">
        직접 선택해보세요
      </p>

      <div className="mt-5">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
          STEP 1 · 얼마나 많은 문제를 풀 것인가?
        </p>
        <div className="mt-2 flex gap-2">
          {volumes.map((v) => (
            <button key={v} type="button" onClick={() => setVolume(v)} className={volume === v ? chipActiveCls : chipCls}>
              {v}P
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
          STEP 2 · 어느 난이도로 준비할 것인가?
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["STANDARD", "ADVANCED"] as Stage[]).map((s) => (
            <button key={s} type="button" onClick={() => setStage(s)} className={stage === s ? chipActiveCls : chipCls}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
          STEP 3 · 한 단계 더 준비할 것인가?
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setAddBoth(false)}
            className={!addBoth ? chipActiveCls : chipCls}
          >
            선택한 난이도만
          </button>
          <button type="button" onClick={() => setAddBoth(true)} className={addBoth ? chipActiveCls : chipCls}>
            STANDARD + ADVANCED
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-ivory-300 pt-6">
        <p className="font-display text-[19px] font-semibold text-navy-950">{result.title}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-charcoal-600">{result.desc}</p>
        <ul className="mt-3 space-y-1 text-[12px] leading-relaxed text-charcoal-600/80">
          {result.includes.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[24px] font-semibold text-navy-950">{formatKRW(result.price)}</p>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 bg-navy-900 px-6 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={15} />
            {result.title} 상담하기
          </a>
        </div>
      </div>
    </div>
  );
}
