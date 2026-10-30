"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "./data";

type Stage = "STANDARD" | "ADVANCED";

interface ExamSelectorProps {
  id: string;
  title: string;
  /** Level/Grade/Division chip 목록. 생략하면 해당 단계를 표시하지 않습니다. */
  levels?: string[];
  levelLabel?: string; // "Level" | "Grade" | "Division"
  /** true면 STANDARD/ADVANCED PRACTICE 토글과 조합 구매를 보여줍니다. */
  hasStage?: boolean;
  standardDesc: string;
  advancedDesc?: string;
  advancedNote?: string;
  volumes?: number[]; // 기본 40/60/100/200
  ctaLabel: string;
}

const chipCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2 text-center text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const chipActiveCls =
  "flex-1 border border-navy-900 bg-navy-900 px-3 py-2 text-center text-[12.5px] font-medium text-ivory-100";
const smallChipCls =
  "shrink-0 border border-ivory-300 bg-white px-3 py-1.5 text-center text-[12px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const smallChipActiveCls =
  "shrink-0 border border-navy-900 bg-navy-900 px-3 py-1.5 text-center text-[12px] font-medium text-ivory-100";

export default function ExamSelector({
  id,
  title,
  levels,
  levelLabel = "Level",
  hasStage = false,
  standardDesc,
  advancedDesc,
  advancedNote,
  volumes,
  ctaLabel,
}: ExamSelectorProps) {
  const VOLUMES = (volumes ?? [40, 60, 100, 200])
    .map((p) => flexibleVolumes.find((v) => v.pages === p)!)
    .filter(Boolean);

  const [level, setLevel] = useState<string | undefined>(levels?.[0]);
  const [stage, setStage] = useState<Stage>("STANDARD");
  const [addBoth, setAddBoth] = useState(false);
  const [pages, setPages] = useState<number>(VOLUMES[Math.min(1, VOLUMES.length - 1)].pages);
  const [advancedPages, setAdvancedPages] = useState<number>(VOLUMES[Math.min(1, VOLUMES.length - 1)].pages);

  const result = useMemo(() => {
    const levelPart = level ? ` ${level}` : "";
    const unitPrice = VOLUMES.find((v) => v.pages === pages)!.priceKRW;
    if (hasStage && addBoth) {
      const advPrice = VOLUMES.find((v) => v.pages === advancedPages)!.priceKRW;
      const sameVolume = pages === advancedPages;
      return {
        name: sameVolume
          ? `${title}${levelPart} ${pages}P STANDARD + ${pages}P ADVANCED PRACTICE`
          : `${title}${levelPart} ${pages}P STANDARD + ${advancedPages}P ADVANCED PRACTICE`,
        desc: sameVolume
          ? "기본 대비와 심화 연습을 함께 준비합니다. 두 교재는 서로 다른 문제로 구성됩니다."
          : "분량을 각각 선택해 기본 대비와 심화 연습을 함께 준비합니다. 두 교재는 서로 다른 문제로 구성됩니다.",
        price: unitPrice + advPrice,
      };
    }
    if (hasStage) {
      return {
        name: `${title}${levelPart} ${stage === "STANDARD" ? "Standard" : "Advanced Practice"}`,
        desc: stage === "STANDARD" ? standardDesc : advancedDesc ?? "",
        price: unitPrice,
      };
    }
    return {
      name: `${title}${levelPart}`,
      desc: standardDesc,
      price: unitPrice,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, stage, addBoth, pages, advancedPages, title, hasStage, standardDesc, advancedDesc]);

  return (
    <div id={id} className="scroll-mt-20 border border-ivory-300 bg-white p-6 sm:p-7">
      <p className="font-display text-[17px] font-semibold text-navy-950">{title}</p>

      {levels && levels.length > 0 && (
        <div className="mt-4">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">{levelLabel}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {levels.map((l) => (
              <button key={l} type="button" onClick={() => setLevel(l)} className={level === l ? smallChipActiveCls : smallChipCls}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasStage && (
        <div className="mt-4">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">난이도</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setStage("STANDARD");
                setAddBoth(false);
              }}
              className={stage === "STANDARD" && !addBoth ? chipActiveCls : chipCls}
            >
              STANDARD
            </button>
            <button
              type="button"
              onClick={() => {
                setStage("ADVANCED");
                setAddBoth(false);
              }}
              className={stage === "ADVANCED" && !addBoth ? chipActiveCls : chipCls}
            >
              ADVANCED PRACTICE
            </button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setAddBoth(false)} className={!addBoth ? chipActiveCls : chipCls}>
              선택한 난이도만
            </button>
            <button type="button" onClick={() => setAddBoth(true)} className={addBoth ? chipActiveCls : chipCls}>
              STANDARD + ADVANCED
            </button>
          </div>
          {advancedNote && (stage === "ADVANCED" || addBoth) && (
            <p className="mt-2 text-[11px] leading-relaxed text-charcoal-600/60">{advancedNote}</p>
          )}
        </div>
      )}

      <div className="mt-4">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
          분량{addBoth && " (STANDARD)"}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {VOLUMES.map((v) => (
            <button
              key={v.pages}
              type="button"
              onClick={() => setPages(v.pages)}
              className={pages === v.pages ? smallChipActiveCls : smallChipCls}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {hasStage && addBoth && (
        <div className="mt-3">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
            분량 (ADVANCED PRACTICE, STANDARD와 다르게 선택 가능)
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {VOLUMES.map((v) => (
              <button
                key={v.pages}
                type="button"
                onClick={() => setAdvancedPages(v.pages)}
                className={advancedPages === v.pages ? smallChipActiveCls : smallChipCls}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 border-t border-ivory-300 pt-4">
        <p className="font-display text-[15px] font-semibold text-navy-950">{result.name}</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">{result.desc}</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[20px] font-semibold text-navy-950">{formatKRW(result.price)}</p>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-navy-900 px-5 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={14} />
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
