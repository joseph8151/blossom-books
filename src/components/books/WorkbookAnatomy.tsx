import { Product } from "@/lib/types";
import { isFourSkill } from "@/lib/productMeta";

// 100P PDF가 아니라 "완성된 Prep Course"임을 보여주는 구성 시각화 (Workbook Anatomy + Skills Index).
const parts: { label: string; ko: string; pct: number }[] = [
  { label: "Concept Review", ko: "개념 정리", pct: 15 },
  { label: "Guided Practice", ko: "유도 연습", pct: 20 },
  { label: "Independent Practice", ko: "실전 연습", pct: 25 },
  { label: "Advanced Application", ko: "심화 응용", pct: 15 },
  { label: "Review Test", ko: "리뷰 테스트", pct: 10 },
  { label: "Answer & Explanation", ko: "정답·상세 해설", pct: 15 },
];

const SHADES = ["#5b7f5e", "#7d8a6a", "#ad8a4e", "#b06a3c", "#8a4b52", "#1c2c4c"];

// 스킬 커버리지 — 교재 units 기준(앞 단원일수록 비중 높게). 임의 수치가 아니라 구성 순서 기반.
function skillWeights(p: Product): { name: string; w: number }[] {
  const units = isFourSkill(p)
    ? ["Reading", "Vocabulary", "Grammar", "Writing"]
    : p.units.slice(0, 6);
  return units.map((name, i) => ({ name, w: Math.max(2, 5 - Math.floor(i / 2)) }));
}

export default function WorkbookAnatomy({ product }: { product: Product }) {
  const skills = skillWeights(product);

  return (
    <div className="mt-10">
      <h2 className="font-display text-[20px] font-semibold text-navy-950">100페이지 안에는 무엇이 들어 있나요?</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">
        단순한 PDF 페이지가 아니라, 개념 → 연습 → 실전 → 검수까지 담긴 하나의 완성된 Prep Course입니다.
      </p>

      {/* 구성 비율 스택 바 */}
      <div className="mt-5 flex h-3 w-full overflow-hidden rounded-sm border border-navy-800/12">
        {parts.map((p, i) => (
          <div key={p.label} style={{ width: `${p.pct}%`, background: SHADES[i] }} />
        ))}
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {parts.map((p, i) => (
          <div key={p.label} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: SHADES[i] }} />
            <span className="flex-1 text-[13px] text-charcoal-900">
              {p.label} <span className="text-charcoal-600">· {p.ko}</span>
            </span>
            <span className="font-label text-[10.5px] text-navy-800/60">~{p.pct}P / 100P</span>
          </div>
        ))}
      </div>

      {/* 스킬 인덱스 */}
      <div className="mt-8 border-t border-navy-800/10 pt-6">
        <p className="font-label text-[11px] uppercase tracking-[0.12em] text-brass-500">Skills Index</p>
        <p className="mt-1.5 text-[13px] text-charcoal-600">이 교재가 다루는 영역과 비중입니다.</p>
        <div className="mt-4 space-y-2.5">
          {skills.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-[13px] text-charcoal-900">{s.name}</span>
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-5 rounded-[1px]"
                    style={{ background: i < s.w ? "#ad8a4e" : "rgba(28,44,76,0.12)" }}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 border-l-2 border-brass-500 pl-4 text-[13px] leading-relaxed text-charcoal-900">
        고객이 사는 것은 “100페이지 PDF”가 아니라, <span className="font-medium text-navy-950">하나의 완성된 학습 시스템</span>입니다.
      </p>
    </div>
  );
}
