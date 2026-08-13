import { cn } from "@/lib/utils";

// 로고의 성장 막대 모티프를 재사용한 작은 데이터 시각화 — 공간/운영 인력 규모를 한눈에 보여줍니다.
export default function LevelMeter({ label, level }: { label: string; level: 1 | 2 | 3 }) {
  return (
    <div>
      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">{label}</p>
      <div className="mt-2 flex items-end gap-1" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("w-[7px] rounded-full", i <= level ? "bg-coral-500" : "bg-navy-900/10")}
            style={{ height: `${7 + i * 6}px` }}
          />
        ))}
      </div>
    </div>
  );
}
