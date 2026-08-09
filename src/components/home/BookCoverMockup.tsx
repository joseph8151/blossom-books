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

// 표지 색상 테마 (SVG/인라인 스타일용 hex)
const THEMES: Record<
  Tone,
  { bg: string; ink: string; accent: string; faint: string; faintLine: string; dark: boolean }
> = {
  navy: {
    bg: "#131f38", ink: "#faf7f0", accent: "#c4a568",
    faint: "rgba(250,247,240,0.10)", faintLine: "rgba(250,247,240,0.055)", dark: true,
  },
  burgundy: {
    bg: "#6d2432", ink: "#f4e3d8", accent: "#dcae72",
    faint: "rgba(250,247,240,0.12)", faintLine: "rgba(250,247,240,0.06)", dark: true,
  },
  brown: {
    bg: "#5c3f2c", ink: "#f4e9d8", accent: "#d9b473",
    faint: "rgba(250,247,240,0.12)", faintLine: "rgba(250,247,240,0.06)", dark: true,
  },
  ivory: {
    bg: "#faf7f0", ink: "#131f38", accent: "#ad8a4e",
    faint: "rgba(19,31,56,0.10)", faintLine: "rgba(19,31,56,0.05)", dark: false,
  },
  pink: {
    bg: "#c98a95", ink: "#47232d", accent: "#f3e2d0",
    faint: "rgba(71,35,45,0.16)", faintLine: "rgba(71,35,45,0.07)", dark: false,
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
  const t = THEMES[tone] ?? THEMES.navy;

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

  // 제목 기반 시드 → 교재마다 하단 그래프가 다르게 보이도록
  const seed = [...title].reduce((s, ch) => s + ch.charCodeAt(0), 0) || 7;
  const bars = Array.from({ length: 6 }, (_, i) => 12 + ((seed * (i + 3) + i * 5) % 22));
  const baseY = 250;
  const barW = 8;
  const gap = 8;
  const chartStart = 66;
  const barPoints = bars.map((h, i) => ({ x: chartStart + i * (barW + gap), h, topY: baseY - h }));
  const linePts = barPoints.map((b) => `${b.x + barW / 2},${b.topY - 4}`).join(" ");

  // 배경 인그레이빙 라인
  const bgLines = Array.from({ length: 11 }, (_, i) => 44 + i * 20);

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full max-w-[230px] overflow-hidden rounded-[4px] shadow-[0_28px_60px_-20px_rgba(13,22,38,0.6)]",
        rotate,
        className
      )}
      style={{ background: t.bg, color: t.ink }}
    >
      {/* 그래픽 레이어 (박스에 맞춰 스케일) */}
      <svg
        viewBox="0 0 240 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {bgLines.map((y) => (
          <line key={y} x1="20" y1={y} x2="220" y2={y} stroke={t.faintLine} strokeWidth="1" />
        ))}

        {t.dark ? (
          <polygon points="240,320 0,320 240,180" fill="rgba(250,247,240,0.03)" />
        ) : (
          <polygon points="0,0 240,0 0,150" fill="rgba(19,31,56,0.025)" />
        )}

        {/* 이중 프레임 */}
        <rect x="11" y="11" width="218" height="298" fill="none" stroke={t.accent} strokeWidth="1.1" opacity="0.9" />
        <rect x="15.5" y="15.5" width="209" height="289" fill="none" stroke={t.accent} strokeWidth="0.6" opacity="0.4" />

        {/* 코너 마크 */}
        {["M15,29 L15,15 L29,15", "M225,29 L225,15 L211,15", "M15,291 L15,305 L29,305", "M225,291 L225,305 L211,305"].map(
          (d) => (
            <path key={d} d={d} fill="none" stroke={t.accent} strokeWidth="1.2" />
          )
        )}

        {/* 엠블럼 씰 */}
        <circle cx="120" cy="189" r="30" fill="none" stroke={t.faint} strokeWidth="0.6" />
        <circle cx="120" cy="189" r="24" fill="none" stroke={t.faint} strokeWidth="0.6" />
        <circle cx="120" cy="189" r="19.5" fill="none" stroke={t.accent} strokeWidth="1.1" />
        <circle cx="120" cy="189" r="16" fill="none" stroke={t.accent} strokeWidth="0.55" opacity="0.6" />
        {ring.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={t.accent} strokeWidth="0.9" opacity="0.75" />
        ))}
        <text
          x="120"
          y="196"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="20"
          fontWeight="600"
          fontStyle="italic"
          fill={t.accent}
        >
          B
        </text>

        {/* 하단 데이터 모티프 (교재별 상이) */}
        <line x1="60" y1={baseY} x2="180" y2={baseY} stroke={t.accent} strokeWidth="0.8" opacity="0.7" />
        {barPoints.map((b, i) => (
          <rect key={i} x={b.x} y={b.topY} width={barW} height={b.h} fill={t.accent} opacity={i % 2 === 0 ? 0.5 : 0.28} />
        ))}
        <polyline points={linePts} fill="none" stroke={t.accent} strokeWidth="1.1" opacity="0.9" />
        {barPoints.map((b, i) => (
          <circle key={i} cx={b.x + barW / 2} cy={b.topY - 4} r="1.6" fill={t.accent} />
        ))}
      </svg>

      {/* 인덱스 탭 */}
      {tabLabel && (
        <div
          className="absolute -right-2.5 top-9 z-10 flex h-8 w-8 items-center justify-center rounded-sm font-label text-[10px] tracking-wider shadow-md"
          style={{ background: t.accent, color: t.bg }}
        >
          {tabLabel}
        </div>
      )}

      {/* 텍스트 레이어 */}
      <div className="relative z-10 flex h-full flex-col px-6 pt-7">
        <div className="h-px w-9" style={{ background: t.accent }} />
        <p className="mt-3.5 font-label text-[9.5px] uppercase tracking-[0.22em] opacity-70">{eyebrow}</p>
        <p className="mt-2.5 font-display text-[23px] font-semibold leading-[1.12]">{title}</p>
        <p className="mt-2 text-[11.5px] leading-snug opacity-65">{subtitle}</p>

        {/* 발행처 각인 */}
        <div className="mt-auto pb-5">
          <div className="mb-2 h-px w-full" style={{ background: t.faint }} />
          <div className="flex items-center justify-between font-label text-[7.5px] uppercase tracking-[0.16em] opacity-55">
            <span>Blossom Books</span>
            <span>Edu Publishing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
