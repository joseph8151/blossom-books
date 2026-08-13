import { cn } from "@/lib/utils";

type Tone = "navy" | "burgundy" | "brown" | "ivory" | "pink";
type Size = "sm" | "md" | "lg";

interface BookCoverProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: Tone;
  size?: Size;
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

// 크기별 고정 타이포 — 카드(sm)/상세(md)/히어로(lg)에서 각각 안정적으로 렌더링됩니다.
const SIZES: Record<Size, {
  frame: string; rule: string; eyebrow: string; title: string; sub: string; mono: string; monoText: string; foot: string;
}> = {
  sm: { frame: "px-4 pb-4 pt-5", rule: "w-6", eyebrow: "text-[7.5px] tracking-[0.18em]", title: "text-[14.5px]", sub: "text-[9px]", mono: "h-6 w-6", monoText: "text-[10px]", foot: "text-[5.5px] tracking-[0.1em]" },
  md: { frame: "px-6 pb-5 pt-9", rule: "w-9", eyebrow: "text-[9px] tracking-[0.22em]", title: "text-[21px]", sub: "text-[11px]", mono: "h-8 w-8", monoText: "text-[13px]", foot: "text-[7px] tracking-[0.14em]" },
  lg: { frame: "px-7 pb-6 pt-11", rule: "w-10", eyebrow: "text-[9.5px] tracking-[0.24em]", title: "text-[25px]", sub: "text-[11.5px]", mono: "h-9 w-9", monoText: "text-[15px]", foot: "text-[7.5px] tracking-[0.16em]" },
};

export function BookCoverMockup({
  eyebrow,
  title,
  subtitle,
  tone = "navy",
  size = "md",
  rotate = "",
  className,
  tabLabel,
}: BookCoverProps) {
  const t = THEMES[tone] ?? THEMES.navy;
  const s = SIZES[size];

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
        <rect x="0" y="0" width="240" height="6" fill={t.accent} opacity="0.9" />
        <rect x="12" y="16" width="216" height="288" fill="none" stroke={t.accent} strokeWidth="1.1" opacity="0.85" />
        <rect x="16.5" y="20.5" width="207" height="279" fill="none" stroke={t.accent} strokeWidth="0.6" opacity="0.4" />
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

      {/* 텍스트 레이어 */}
      <div className={cn("relative z-10 flex h-full flex-col", s.frame)}>
        <div className={cn("h-px", s.rule)} style={{ background: t.accent }} />
        <p className={cn("mt-[6%] font-label font-medium uppercase", s.eyebrow)} style={{ opacity: 0.9 }}>
          {eyebrow}
        </p>
        <p className={cn("mt-[5%] font-display font-semibold leading-[1.12] [hyphens:none] [overflow-wrap:normal] [word-break:keep-all]", s.title)}>
          {title}
        </p>
        <p className={cn("mt-[4%] font-medium leading-snug [word-break:keep-all]", s.sub)} style={{ opacity: 0.82 }}>
          {subtitle}
        </p>

        {/* 하단 — 모노그램 + 발행처 */}
        <div className="mt-auto">
          <div className={cn("flex items-center justify-center rounded-full border", s.mono)} style={{ borderColor: t.accent }}>
            <span className={cn("font-display font-semibold italic", s.monoText)} style={{ color: t.accent }}>
              B
            </span>
          </div>
          <div className="mt-[6%] h-px w-full" style={{ background: t.faint }} />
          <div
            className={cn("mt-[3%] flex items-center justify-between font-label font-medium uppercase", s.foot)}
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
