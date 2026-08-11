import { Check, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { blossomLevel, BLOSSOM_LEVELS, BLOSSOM_LEVEL_KO } from "@/lib/utils";
import { productCode, pagesLabel } from "@/lib/productMeta";
import { seriesFor, seriesInfo } from "@/data/series";

const qualityChecklist = [
  "Grade Appropriateness",
  "Difficulty Progression",
  "Question–Answer Consistency",
  "Explanation Accuracy",
  "Duplicate Content",
  "Formatting & Final Proof",
];

// 난이도 단계별 채움 (고정 스케일 — 4단계 시스템 안내용)
const progression: Record<string, number> = { Foundation: 2, Standard: 3, Advanced: 4, Challenge: 5 };

export default function WorkbookSpecification({ product }: { product: Product }) {
  const peak = blossomLevel(product.difficulty);
  const peakIdx = BLOSSOM_LEVELS.indexOf(peak);
  const start = BLOSSOM_LEVELS[Math.max(0, peakIdx - 2)];
  const skills = product.units.slice(0, 6).join(" · ");

  const spec: [string, string][] = [
    ["Publisher", "Blossom Books Edu Publishing"],
    ["Product Code", productCode(product)],
    ["Series", seriesInfo[seriesFor(product)].name],
    ["Target", product.gradeRange],
    ["Level", `${peak} · ${BLOSSOM_LEVEL_KO[peak]}`],
    ["Purpose", product.examOrCurriculum],
    ["Skills", skills],
    ["Format", "Digital PDF"],
    ["Volume", pagesLabel(product)],
    ["Answer Guide", product.includesAnswerKey ? "Included" : "—"],
    ["Edition", "2026"],
    ["Academic Review", "2026"],
    ["Delivery", "After Payment Confirmation"],
    ["Purchase Support", "Official Kakao Channel"],
  ];

  const alignment: [string, string][] = [
    ["Question Type", "Aligned to major skill areas"],
    ["Skill Coverage", "Aligned to major skill areas"],
    ["Difficulty", "Level-Adjusted"],
    ["Format", "Test-Inspired"],
    ["Content", "100% Independently Developed"],
  ];

  const profile: [string, string][] = [
    ["Target Grade", product.gradeRange],
    ["Starting Level", start],
    ["Peak Difficulty", peak],
    ["Question Style", "Test-Aligned"],
    ["Skill Coverage", product.units.slice(0, 4).join(" / ")],
  ];

  return (
    <div className="space-y-8">
      {/* Workbook Specification */}
      <div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-brass-500" />
          <h2 className="font-display text-[20px] font-semibold text-navy-950">Workbook Specification</h2>
        </div>
        <dl className="mt-4 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/10 sm:grid-cols-2">
          {spec.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3 bg-ivory-100 p-3.5">
              <dt className="w-32 shrink-0 font-label text-[10px] uppercase tracking-[0.08em] text-brass-500">{k}</dt>
              <dd className="text-[13px] text-charcoal-900">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Test Alignment + Difficulty Profile */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border border-navy-800/12 bg-ivory-200/40 p-5">
          <p className="font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">Test Alignment</p>
          <dl className="mt-3 space-y-2">
            {alignment.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-navy-800/8 pb-1.5 last:border-0">
                <dt className="text-[12.5px] text-charcoal-600">{k}</dt>
                <dd className="text-right text-[12.5px] font-medium text-navy-950">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border border-navy-800/12 bg-ivory-200/40 p-5">
          <p className="font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">Difficulty Profile</p>
          <dl className="mt-3 space-y-2">
            {profile.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-navy-800/8 pb-1.5 last:border-0">
                <dt className="text-[12.5px] text-charcoal-600">{k}</dt>
                <dd className="text-right text-[12.5px] font-medium text-navy-950">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Difficulty Progression */}
      <div className="border border-navy-800/12 bg-ivory-100 p-5">
        <p className="font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">Difficulty Progression</p>
        <p className="mt-1.5 text-[12px] text-charcoal-600">처음부터 어렵게 시작하지 않습니다. 이 교재의 최고 난도는 {peak}입니다.</p>
        <div className="mt-4 space-y-2">
          {BLOSSOM_LEVELS.map((lv) => {
            const filled = progression[lv];
            const isPeak = lv === peak;
            return (
              <div key={lv} className="flex items-center gap-3">
                <span className={`w-24 text-[13px] ${isPeak ? "font-semibold text-navy-950" : "text-charcoal-600"}`}>
                  {lv}
                </span>
                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-2.5 w-4 border"
                      style={{
                        background: i < filled ? (isPeak ? "#ad8a4e" : "#c9bda0") : "transparent",
                        borderColor: "rgba(28,44,76,0.2)",
                      }}
                    />
                  ))}
                </span>
                {isPeak && <span className="font-label text-[9px] uppercase tracking-[0.1em] text-brass-500">Peak</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quality Checklist */}
      <div className="border border-navy-800/15 bg-navy-950 p-6 text-ivory-100 lg:p-7">
        <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">
          This title has been reviewed for
        </p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {qualityChecklist.map((q) => (
            <span key={q} className="inline-flex items-center gap-2 text-[13px] text-ivory-100">
              <Check size={14} className="shrink-0 text-brass-400" strokeWidth={2.4} />
              {q}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[11.5px] leading-relaxed text-ivory-200/60">
          오류가 전혀 없다고 보장하지 않습니다. Blossom Books 측의 명확한 오류가 확인되는 경우 구매 건당
          최대 2회까지 교정·수정을 지원합니다.
        </p>
      </div>
    </div>
  );
}
