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

// 표지 색상 테마 — 책등(spine)은 시리즈 전체 통일감을 위해 항상 네이비를
// 쓰고, 본문 패널만 상품별 톤을 따릅니다(비대칭 "Modern Editorial" 표지).
const THEMES: Record<Tone, { bg: string; ink: string; accent: string; faint: string }> = {
  navy: { bg: "#131f38", ink: "#f7f2e7", accent: "#c4a568", faint: "rgba(247,242,231,0.14)" },
  burgundy: { bg: "#6d2432", ink: "#f6e7db", accent: "#dcae72", faint: "rgba(246,231,219,0.16)" },
  brown: { bg: "#553a28", ink: "#f4e9d8", accent: "#d9b473", faint: "rgba(244,233,216,0.16)" },
  ivory: { bg: "#f4ecdb", ink: "#1a2743", accent: "#a5793c", faint: "rgba(26,39,67,0.14)" },
  pink: { bg: "#c07f8b", ink: "#3d1c25", accent: "#54262f", faint: "rgba(61,28,37,0.2)" },
};
const SPINE = { bg: "#131f38", accent: "#c4a568" };

// 크기별 고정 타이포 — 카드(sm)/상세(md)/히어로(lg)에서 각각 안정적으로 렌더링됩니다.
const SIZES: Record<
  Size,
  { pad: string; eyebrow: string; title: string; sub: string; mono: string; monoText: string; spineText: string }
> = {
  sm: {
    pad: "pl-3.5 pr-3.5 pb-3.5 pt-4",
    eyebrow: "text-[7px] tracking-[0.16em]",
    title: "text-[14px]",
    sub: "text-[8.5px]",
    mono: "h-6 w-6",
    monoText: "text-[10px]",
    spineText: "text-[6.5px] tracking-[0.16em]",
  },
  md: {
    pad: "pl-5 pr-5 pb-5 pt-7",
    eyebrow: "text-[8.5px] tracking-[0.2em]",
    title: "text-[20px]",
    sub: "text-[10.5px]",
    mono: "h-8 w-8",
    monoText: "text-[13px]",
    spineText: "text-[7.5px] tracking-[0.18em]",
  },
  lg: {
    pad: "pl-6 pr-6 pb-6 pt-9",
    eyebrow: "text-[9px] tracking-[0.22em]",
    title: "text-[24px]",
    sub: "text-[11px]",
    mono: "h-9 w-9",
    monoText: "text-[15px]",
    spineText: "text-[8px] tracking-[0.2em]",
  },
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
        "relative flex aspect-[3/4] w-full max-w-[230px] overflow-hidden rounded-[4px] shadow-[0_28px_60px_-20px_rgba(13,22,38,0.6)]",
        rotate,
        className
      )}
    >
      {/* 책등 — 항상 네이비, 시리즈 전체를 하나로 묶는 통일 요소 */}
      <div
        className="relative flex w-[17%] shrink-0 flex-col items-center justify-end pb-[8%]"
        style={{ background: SPINE.bg }}
      >
        <span
          className={cn("whitespace-nowrap font-label font-medium uppercase [writing-mode:vertical-rl]", s.spineText)}
          style={{ color: SPINE.accent, opacity: 0.85 }}
        >
          Blossom Books
        </span>
      </div>

      {/* 본문 패널 — 상품별 톤 */}
      <div className={cn("relative flex flex-1 flex-col", s.pad)} style={{ background: t.bg, color: t.ink }}>
        <p className={cn("font-label font-medium uppercase", s.eyebrow)} style={{ color: t.accent, opacity: 0.95 }}>
          {eyebrow}
        </p>
        <p
          className={cn(
            "mt-[14%] font-display font-semibold leading-[1.14] [hyphens:none] [overflow-wrap:normal] [word-break:keep-all]",
            s.title
          )}
        >
          {title}
        </p>
        <p className={cn("mt-[6%] font-medium leading-snug [word-break:keep-all]", s.sub)} style={{ opacity: 0.78 }}>
          {subtitle}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div
            className={cn("flex items-center justify-center rounded-full", s.mono)}
            style={{ background: SPINE.bg }}
          >
            <span className={cn("font-display font-semibold italic", s.monoText)} style={{ color: SPINE.accent }}>
              B
            </span>
          </div>
          <div className="h-px flex-1 mx-[6%]" style={{ background: t.faint }} />
        </div>
      </div>

      {/* 인덱스 탭 */}
      {tabLabel && (
        <div
          className="absolute -right-2.5 top-10 z-10 flex h-8 w-8 items-center justify-center rounded-sm font-label text-[10px] font-medium tracking-wider shadow-md"
          style={{ background: t.accent, color: t.bg }}
        >
          {tabLabel}
        </div>
      )}
    </div>
  );
}
