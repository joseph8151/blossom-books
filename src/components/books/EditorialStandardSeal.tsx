import { ShieldCheck, Check } from "lucide-react";

const reviewed = [
  "Curriculum Reviewed",
  "Level Reviewed",
  "Question Reviewed",
  "Answer Reviewed",
  "Explanation Reviewed",
  "Final Proofread",
];

export default function EditorialStandardSeal() {
  return (
    <div className="border border-navy-800/15 bg-navy-950 p-7 text-ivory-100 lg:p-8">
      <div className="flex items-center gap-2.5">
        <ShieldCheck size={22} className="text-brass-400" strokeWidth={1.8} />
        <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-400">
          Blossom Editorial Standard
        </p>
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed text-ivory-200/80">
        모든 교재는 아래 검수 단계를 거쳐 하나의 완성된 학습 콘텐츠로 제작됩니다.
      </p>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {reviewed.map((r) => (
          <span key={r} className="inline-flex items-center gap-2 text-[12.5px] text-ivory-100">
            <Check size={14} className="shrink-0 text-brass-400" strokeWidth={2.4} />
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
