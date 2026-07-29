import { cn } from "@/lib/utils";

const accentMap = {
  navy: "bg-navy-900",
  burgundy: "bg-burgundy-700",
  brass: "bg-brass-500",
};

interface BookCoverProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: "navy" | "ivory";
  rotate?: string; // tailwind rotate class
  className?: string;
  tabLabel?: string;
}

export function BookCoverMockup({
  eyebrow,
  title,
  subtitle,
  tone = "navy",
  rotate = "",
  className,
  tabLabel,
}: BookCoverProps) {
  const dark = tone === "navy";
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full max-w-[230px] rounded-[3px] p-6 shadow-[0_24px_50px_-18px_rgba(13,22,38,0.5)]",
        dark ? "bg-navy-900 text-ivory-100" : "bg-ivory-100 text-navy-900 border border-navy-800/15",
        rotate,
        className
      )}
    >
      {/* 인덱스 탭 — 사전/교재 옆면 탭을 연상시키는 시그니처 요소 */}
      {tabLabel && (
        <div
          className={cn(
            "absolute -right-2.5 top-9 flex h-8 w-8 items-center justify-center rounded-sm font-label text-[10px] tracking-wider text-ivory-100 shadow-md",
            accentMap[dark ? "brass" : "burgundy"]
          )}
        >
          {tabLabel}
        </div>
      )}

      <div className={cn("h-px w-9", dark ? "bg-brass-400" : "bg-burgundy-700")} />
      <p className="mt-4 font-label text-[10px] uppercase tracking-[0.2em] opacity-70">{eyebrow}</p>
      <p className="mt-3 font-display text-[26px] font-semibold leading-[1.15]">{title}</p>
      <p className="mt-2 text-[12.5px] leading-snug opacity-70">{subtitle}</p>

      {/* 하단 그래프/표 모티프 */}
      <div className="absolute inset-x-6 bottom-6 flex items-end gap-1.5 opacity-60">
        {[40, 65, 30, 80, 50].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h * 0.4}px` }}
            className={cn("w-2.5 rounded-[1px]", dark ? "bg-ivory-100/70" : "bg-navy-900/60")}
          />
        ))}
      </div>
    </div>
  );
}
