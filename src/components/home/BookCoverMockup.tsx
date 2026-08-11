import { cn } from "@/lib/utils";

type Tone = "navy" | "burgundy" | "brown" | "ivory" | "pink";

interface BookCoverProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: Tone;
  rotate?: string; // tailwind rotate class
  className?: string;
  tabLabel?: string;
}

// 표지 색상 테마
const THEMES: Record<
  Tone,
  { bg: string; ink: string; accent: string; faint: string; dark: boolean }
> = {
  navy: { bg: "#131f38", ink: "#f7f2e7", accent: "#c4a568", faint: "rgba(247,242,231,0.14)", dark: true },
  burgundy: { bg: "#6d2432", ink: "#f6e7db", accent: "#dcae72", faint: "rgba(246,231,219,0.16)", dark: true },
  brown: { bg: "#553a28", ink: "#f4e9d8", accent: "#d9b473", faint: "rgba(244,233,216,0.16)", dark: true },
  ivory: { bg: "#f4ecdb", ink: "#1a2743", accent: "#a5793c", faint: "rgba(26,39,67,0.14)", dark: false },
  pink: { bg: "#c07f8b", ink: "#3d1c25", accent: "#54262f", faint: "rgba(61,28,37,0.2)", dark: false },
};

export function BookCoverMockup({
  eyebrow,
  title,
  subtitle,
  tone = "navy",
  rotate = "",
  className,
  tabLabel,
}: BookCoverProps) {
  const t = THEMES[tone] ?? THEMES.navy;

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full max-w-[230px] overflow-hidden rounded-[4px] shadow-[0_28px_60px_-20px_rgba(13,22,38,0.6)]",
        rotate,
        className
      )}
      style={{ background: t.bg, color: t.ink }}
    >
      {/* 얇은 그래픽 레이어 — 프레임과 코너만. 텍스트 뒤는 비웁니다. */}
      <svg
        viewBox="0 0 240 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* 상단 컬러 밴드 */}
        <rect x="0" y="0" width="240" height="6" fill={t.accent} opacity="0.9" />
        {/* 이중 프레임 */}
        <rect x="12" y="16" width="216" height="288" fill="none" stroke={t.accent} strokeWidth="1.1" opacity="0.85" />
        <rect x="16.5" y="20.5" width="207" height="279" fill="none" stroke={t.accent} strokeWidth="0.6" opacity="0.4" />
        {/* 코너 마크 */}
        {["M16,34 L16,20 L30,20", "M224,34 L224,20 L210,20", "M16,286 L16,300 L30,300", "M224,286 L224,300 L210,300"].map(
          (d) => (
            <path key={d} d={d} fill="none" stroke={t.accent} strokeWidth="1.2" />
          )
        )}
      </svg>

      {/* 인덱스 탭 */}
      {tabLabel && (
        <div
          className="absolute -right-2.5 top-10 z-10 flex h-8 w-8 items-center justify-center rounded-sm font-label text-[10px] font-medium tracking-wider shadow-md"
          style={{ background: t.accent, color: t.bg }}
        >
          {tabLabel}
        </div>
      )}

      {/* 텍스트 레이어 — 배경 그래픽 없이 또렷하게 */}
      <div className="relative z-10 flex h-full flex-col px-7 pt-11">
        <div className="h-px w-10" style={{ background: t.accent }} />
        <p className="mt-4 font-label text-[9.5px] font-medium uppercase tracking-[0.24em]" style={{ opacity: 0.9 }}>
          {eyebrow}
        </p>
        <p className="mt-3 font-display text-[25px] font-semibold leading-[1.1]">{title}</p>
        <p className="mt-2.5 text-[11.5px] font-medium leading-snug" style={{ opacity: 0.82 }}>
          {subtitle}
        </p>

        {/* 하단 — 모노그램 + 발행처 */}
        <div className="mt-auto pb-6">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border"
            style={{ borderColor: t.accent }}
          >
            <span className="font-display text-[15px] font-semibold italic" style={{ color: t.accent }}>
              B
            </span>
          </div>
          <div className="mt-3 h-px w-full" style={{ background: t.faint }} />
          <div
            className="mt-2 flex items-center justify-between font-label text-[7.5px] font-medium uppercase tracking-[0.16em]"
            style={{ opacity: 0.72 }}
          >
            <span>Blossom Books</span>
            <span>Edu Publishing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
