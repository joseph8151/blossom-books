import { Check, Minus, Circle } from "lucide-react";
import { volumeOptions } from "@/data/pricing";

// 구성별 비교 — 페이지 수를 "학습량 선택"으로 이해시키는 표.
// 데스크톱은 표, 모바일은 카드로 자연스럽게 변환합니다. (가격은 노출하지 않음)
type Level = "full" | "partial" | "none";

const features: { label: string; levels: [Level, Level, Level] }[] = [
  { label: "핵심 문제 유형", levels: ["full", "full", "full"] },
  { label: "다양한 문제 구성", levels: ["partial", "full", "full"] },
  { label: "난이도 단계 확장", levels: ["none", "partial", "full"] },
  { label: "집중 반복 · 심화", levels: ["none", "partial", "full"] },
];

// volumeOptions = [40P Quick, 60P Standard, 100P Intensive]
const tiers = volumeOptions.slice(0, 3);

function Mark({ level }: { level: Level }) {
  if (level === "full") return <Check size={16} className="text-brass-500" strokeWidth={2.6} aria-label="포함" />;
  if (level === "partial") return <Circle size={9} className="fill-navy-800/30 text-navy-800/30" aria-label="일부" />;
  return <Minus size={14} className="text-navy-800/25" aria-label="미포함" />;
}

export default function PrepComparison() {
  return (
    <div>
      {/* 데스크톱: 비교표 */}
      <div className="hidden overflow-hidden border border-navy-800/12 sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-navy-950 text-ivory-100">
              <th className="px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.12em] text-ivory-200/70">
                구성 비교
              </th>
              {tiers.map((t) => (
                <th key={t.pages} className="px-4 py-4 text-center">
                  <div className="font-display text-[17px] font-semibold text-ivory-100">{t.label}</div>
                  <div className="mt-0.5 font-label text-[9.5px] uppercase tracking-[0.1em] text-brass-400">
                    {t.tier}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f.label} className={i % 2 ? "bg-ivory-200/40" : "bg-ivory-100"}>
                <td className="border-t border-navy-800/10 px-5 py-3.5 text-[13px] text-charcoal-900">{f.label}</td>
                {f.levels.map((lv, j) => (
                  <td key={j} className="border-t border-navy-800/10 px-4 py-3.5">
                    <div className="flex justify-center">
                      <Mark level={lv} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-ivory-100">
              <td className="border-t border-navy-800/10 px-5 py-3.5 text-[13px] font-medium text-navy-950">
                추천 준비 기간
              </td>
              {tiers.map((t) => (
                <td key={t.pages} className="border-t border-navy-800/10 px-4 py-3.5 text-center text-[12px] text-charcoal-600">
                  {t.duration}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* 모바일: 카드 */}
      <div className="grid gap-4 sm:hidden">
        {tiers.map((t, ti) => (
          <div
            key={t.pages}
            className={`border p-5 ${t.badge ? "border-brass-500/50 bg-brass-500/[0.05]" : "border-navy-800/12 bg-ivory-100"}`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-[20px] font-semibold text-navy-950">{t.label}</span>
              <span className="font-label text-[9.5px] uppercase tracking-[0.1em] text-brass-500">{t.tier}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {features.map((f) => (
                <li key={f.label} className="flex items-center justify-between text-[13px] text-charcoal-900">
                  <span>{f.label}</span>
                  <Mark level={f.levels[ti]} />
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-navy-800/10 pt-3 text-[12px] text-charcoal-600">
              추천 준비 기간 · <span className="font-medium text-navy-900">{t.duration}</span>
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-charcoal-600/80">
        <span className="inline-flex items-center gap-1.5">
          <Check size={13} className="text-brass-500" strokeWidth={2.6} /> 포함
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Circle size={8} className="fill-navy-800/30 text-navy-800/30" /> 일부 포함
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Minus size={12} className="text-navy-800/25" /> 미포함
        </span>
      </p>
    </div>
  );
}
