import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Blossom Editorial Standard — 제작·검수 기준을 하나의 품질 마크로 묶습니다.
export const STANDARD_ITEMS = [
  "Curriculum Aligned",
  "Level Reviewed",
  "Answer Verified",
  "Explanation Included",
  "Student Appropriate",
  "Final Editorial Review",
];

// 작은 인증 칩 (카드·상세 헤더용)
export function BlossomSeal({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border border-brass-500/45 bg-brass-500/[0.07] px-1.5 py-0.5 font-label text-[9px] uppercase tracking-[0.1em] text-brass-500",
        className
      )}
    >
      <BadgeCheck size={11} strokeWidth={2} /> Blossom Reviewed
    </span>
  );
}

// 전체 기준 블록 (상세 페이지용)
export default function EditorialStandard() {
  return (
    <div className="border border-brass-500/35 bg-brass-500/[0.04] p-6">
      <div className="flex items-center gap-2">
        <BadgeCheck size={18} className="text-brass-500" strokeWidth={2} />
        <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">Blossom Editorial Standard</p>
      </div>
      <p className="mt-2.5 text-[13px] leading-relaxed text-charcoal-600">
        모든 교재는 아래 기준을 통과한 뒤 제공됩니다. 이 마크는 Blossom Books의 제작·검수 과정을 하나의
        품질 기준으로 보증합니다.
      </p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {STANDARD_ITEMS.map((s) => (
          <span key={s} className="inline-flex items-center gap-2 text-[13px] text-charcoal-900">
            <BadgeCheck size={14} className="shrink-0 text-brass-500" strokeWidth={2} /> {s}
          </span>
        ))}
      </div>
    </div>
  );
}
