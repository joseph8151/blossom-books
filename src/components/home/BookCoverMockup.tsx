import { cn } from "@/lib/utils";

interface BookCoverProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: "navy" | "ivory";
  rotate?: string; // tailwind rotate class
  className?: string;
  tabLabel?: string;
}

// 표지 그래픽 팔레트 (SVG용 hex)
const PALETTE = {
  navy: {
    accent: "#c4a568", // brass-400
    faint: "rgba(250,247,240,0.10)",
    faintLine: "rgba(250,247,240,0.055)",
    ink: "#faf7f0",
  },
  ivory: {
    accent: "#ad8a4e", // brass-500
    faint: "rgba(19,31,56,0.10)",
    faintLine: "rgba(19,31,56,0.05)",
    ink: "#131f38",
  },
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
  const dark = tone === "navy";
  const c = dark ? PALETTE.navy : PALETTE.ivory;

  // 엠블럼 눈금 링 (12개)
  const ring = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const cx = 120;
    const cy = 189;
    return {
      x1: cx + 14.5 * Math.cos(a),
      y1: cy + 14.5 * Math.sin(a),
      x2: cx + 17.5 * Math.cos(a),
      y2: cy + 17.5 * Math.sin(a),
    };
  });

  // 하단 데이터 모티프 (막대 + 추세선)
  const bars = [15, 24, 13, 30, 20, 27];
  const baseY = 250;
  const barW = 8;
  const gap = 8;
  const chartStart = 66;
  const barPoints = bars.map((h, i) => ({
    x: chartStart + i * (barW + gap),
    h,
    topY: baseY - h,
  }));
  const linePts = barPoints.map((b) => `${b.x + barW / 2},${b.topY - 4}`).join(" ");

  // 배경 인그레이빙 라인
  const bgLines = Array.from({ length: 11 }, (_, i) => 44 + i * 20);

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full max-w-[230px] overflow-hidden rounded-[4px]",
        dark
          ? "bg-navy-900 text-ivory-100 shadow-[0_28px_60px_-20px_rgba(13,22,38,0.65)]"
          : "bg-ivory-100 text-navy-900 shadow-[0_28px_60px_-24px_rgba(13,22,38,0.5)]",
        rotate,
        className
      )}
    >
      {/* 그래픽 레이어 (박스에 맞춰 스케일) */}
      <svg
        viewBox="0 0 240 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* 배경 인그레이빙(원장 종이) 텍스처 */}
        {bgLines.map((y) => (
          <line key={y} x1="20" y1={y} x2="220" y2={y} stroke={c.faintLine} strokeWidth="1" />
        ))}

        {/* 은은한 사선 워시 (라이트 톤에서 깊이감) */}
        {!dark && (
          <polygon points="0,0 240,0 0,150" fill="rgba(19,31,56,0.025)" />
        )}
        {dark && <polygon points="240,320 0,320 240,180" fill="rgba(250,247,240,0.03)" />}

        {/* 이중 프레임 */}
        <rect x="11" y="11" width="218" height="298" fill="none" stroke={c.accent} strokeWidth="1.1" opacity="0.9" />
        <rect x="15.5" y="15.5" width="209" height="289" fill="none" stroke={c.accent} strokeWidth="0.6" opacity="0.4" />

        {/* 코너 마크 */}
        {[
          "M15,29 L15,15 L29,15",
          "M225,29 L225,15 L211,15",
          "M15,291 L15,305 L29,305",
          "M225,291 L225,305 L211,305",
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke={c.accent} strokeWidth="1.2" />
        ))}

        {/* 엠블럼 배경 가이드 원 */}
        <circle cx="120" cy="189" r="30" fill="none" stroke={c.faint} strokeWidth="0.6" />
        <circle cx="120" cy="189" r="24" fill="none" stroke={c.faint} strokeWidth="0.6" />

        {/* 엠블럼 씰 */}
        <circle cx="120" cy="189" r="19.5" fill="none" stroke={c.accent} strokeWidth="1.1" />
        <circle cx="120" cy="189" r="16" fill="none" stroke={c.accent} strokeWidth="0.55" opacity="0.6" />
        {ring.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={c.accent} strokeWidth="0.9" opacity="0.75" />
        ))}
        <text
          x="120"
          y="196"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="20"
          fontWeight="600"
          fontStyle="italic"
          fill={c.accent}
        >
          B
        </text>

        {/* 하단 데이터 모티프 */}
        <line x1="60" y1={baseY} x2="180" y2={baseY} stroke={c.accent} strokeWidth="0.8" opacity="0.7" />
        {barPoints.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.topY}
            width={barW}
            height={b.h}
            fill={c.accent}
            opacity={i % 2 === 0 ? 0.5 : 0.28}
          />
        ))}
        <polyline points={linePts} fill="none" stroke={c.accent} strokeWidth="1.1" opacity="0.9" />
        {barPoints.map((b, i) => (
          <circle key={i} cx={b.x + barW / 2} cy={b.topY - 4} r="1.6" fill={c.accent} />
        ))}
      </svg>

      {/* 인덱스 탭 */}
      {tabLabel && (
        <div
          className={cn(
            "absolute -right-2.5 top-9 z-10 flex h-8 w-8 items-center justify-center rounded-sm font-label text-[10px] tracking-wider text-ivory-100 shadow-md",
            dark ? "bg-brass-500" : "bg-burgundy-700"
          )}
        >
          {tabLabel}
        </div>
      )}

      {/* 텍스트 레이어 */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-7">
        <div className={cn("h-px w-9", dark ? "bg-brass-400" : "bg-burgundy-700")} />
        <p className="mt-3.5 font-label text-[9.5px] uppercase tracking-[0.22em] opacity-70">{eyebrow}</p>
        <p className="mt-2.5 font-display text-[23px] font-semibold leading-[1.12]">{title}</p>
        <p className="mt-2 text-[11.5px] leading-snug opacity-65">{subtitle}</p>

        {/* 발행처 각인 */}
        <div className="mt-auto pb-5">
          <div className={cn("mb-2 h-px w-full", dark ? "bg-ivory-100/12" : "bg-navy-900/10")} />
          <div className="flex items-center justify-between font-label text-[7.5px] uppercase tracking-[0.16em] opacity-55">
            <span>Blossom Books</span>
            <span>Edu Publishing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
