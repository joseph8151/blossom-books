"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

interface Stages {
  standardLabel: string;
  standardDesc: string;
  upgradeLabel: string;
  upgradeDesc: string;
  upgradeNote?: string;
}

interface NoPriceExamCardProps {
  eyebrow?: string;
  title: string;
  officialName?: string;
  subtitle: string;
  areas?: string[];
  stages?: Stages;
  note?: string;
  ctaLabel: string;
}

const stageBtnCls =
  "flex-1 border border-ivory-300 bg-white px-3 py-2 text-center text-[12px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const stageBtnActiveCls =
  "flex-1 border border-navy-900 bg-navy-900 px-3 py-2 text-center text-[12px] font-medium text-ivory-100";

export default function NoPriceExamCard({
  eyebrow,
  title,
  officialName,
  subtitle,
  areas,
  stages,
  note,
  ctaLabel,
}: NoPriceExamCardProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div className="border border-ivory-300 bg-white p-6 sm:p-7">
      {eyebrow && <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">{eyebrow}</p>}
      <p className={`font-display text-[18px] font-semibold text-navy-950 ${eyebrow ? "mt-2" : ""}`}>{title}</p>
      {officialName && <p className="mt-1 text-[12px] text-charcoal-600/70">{officialName}</p>}
      <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">{subtitle}</p>

      {areas && areas.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {areas.map((a) => (
            <span
              key={a}
              className="border border-ivory-300 bg-ivory-200/40 px-2.5 py-1 text-[11px] text-charcoal-600"
            >
              {a}
            </span>
          ))}
        </div>
      )}

      {stages && (
        <>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              aria-pressed={!showUpgrade}
              onClick={() => setShowUpgrade(false)}
              className={!showUpgrade ? stageBtnActiveCls : stageBtnCls}
            >
              {stages.standardLabel}
            </button>
            <button
              type="button"
              aria-pressed={showUpgrade}
              onClick={() => setShowUpgrade(true)}
              className={showUpgrade ? stageBtnActiveCls : stageBtnCls}
            >
              {stages.upgradeLabel}
            </button>
          </div>
          <div className="mt-3 border border-ivory-300 bg-ivory-100 p-4">
            {!showUpgrade ? (
              <p className="text-[12.5px] leading-relaxed text-charcoal-600">{stages.standardDesc}</p>
            ) : (
              <>
                <p className="text-[12.5px] leading-relaxed text-charcoal-600">{stages.upgradeDesc}</p>
                {stages.upgradeNote && (
                  <p className="mt-2 text-[11px] leading-relaxed text-charcoal-600/60">{stages.upgradeNote}</p>
                )}
              </>
            )}
          </div>
        </>
      )}

      {note && <p className="mt-3 text-[11px] leading-relaxed text-charcoal-600/60">{note}</p>}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ivory-300 pt-4">
        <span className="text-[12.5px] font-medium text-charcoal-600/70">구성에 따라 견적</span>
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[42px] items-center justify-center gap-2 border border-navy-900 px-4 text-[12.5px] font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-ivory-100"
        >
          <MessageCircle size={13} />
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
