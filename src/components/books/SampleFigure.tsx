// CAT4 등 비언어·수리 추론 문항용 SVG 도형 (교육 평가 자료 스타일)
const INK = "#1c2c4c";
const ACCENT = "#ad8a4e";
const FAINT = "rgba(28,44,76,0.35)";

function dotPositions(n: number): [number, number][] {
  switch (n) {
    case 1: return [[20, 20]];
    case 2: return [[13, 20], [27, 20]];
    case 3: return [[20, 12], [13, 27], [27, 27]];
    case 4: return [[13, 13], [27, 13], [13, 27], [27, 27]];
    default: return [[13, 13], [27, 13], [20, 20], [13, 27], [27, 27]];
  }
}

function DotCell({ x, y, n, q }: { x: number; y: number; n: number; q?: boolean }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="0" width="40" height="40" fill="none" stroke={INK} strokeWidth="1.1" />
      {q ? (
        <text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="600" fill={ACCENT}>?</text>
      ) : (
        dotPositions(n).map(([dx, dy], i) => <circle key={i} cx={dx} cy={dy} r="3" fill={ACCENT} />)
      )}
    </g>
  );
}

// 모서리 표시(회전 패턴)
function RotBox({ x, corner, q }: { x: number; corner: "TL" | "TR" | "BR" | "BL"; q?: boolean }) {
  const c: Record<string, [number, number]> = { TL: [0, 0], TR: [28, 0], BR: [28, 28], BL: [0, 28] };
  const [cx, cy] = c[corner];
  return (
    <g transform={`translate(${x},8)`}>
      <rect x="0" y="0" width="40" height="40" fill="none" stroke={INK} strokeWidth="1.1" />
      {q ? (
        <text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="600" fill={ACCENT}>?</text>
      ) : (
        <rect x={cx + 2} y={cy + 2} width="10" height="10" fill={ACCENT} />
      )}
    </g>
  );
}

// N×N 작은 정사각형 격자
function SquareGrid({ x, y, n, s = 8 }: { x: number; y: number; n: number; s?: number }) {
  const cells = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      cells.push(<rect key={`${r}-${c}`} x={c * s} y={r * s} width={s} height={s} fill="none" stroke={INK} strokeWidth="0.9" />);
  const size = n * s;
  return <g transform={`translate(${x},${y - size})`}>{cells}</g>;
}

export default function SampleFigure({ name }: { name: string }) {
  if (name === "rotate-seq") {
    const seq: ("TL" | "TR" | "BR" | "BL")[] = ["TL", "TR", "BR"];
    return (
      <svg viewBox="0 0 260 64" className="mt-4 h-auto w-full max-w-[360px]" role="img" aria-label="Figure rotation pattern">
        {seq.map((corner, i) => <RotBox key={i} x={i * 52} corner={corner} />)}
        <text x={3 * 52 + 22} y="34" textAnchor="middle" fontSize="18" fill={FAINT}>→</text>
        <RotBox x={3 * 52 + 30} corner="TL" q />
      </svg>
    );
  }

  if (name === "matrix") {
    const rows = [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 0],
    ];
    return (
      <svg viewBox="0 0 150 150" className="mt-4 h-auto w-full max-w-[190px]" role="img" aria-label="Matrix reasoning grid">
        {rows.map((row, r) =>
          row.map((n, c) => (
            <DotCell key={`${r}-${c}`} x={c * 50 + 3} y={r * 50 + 3} n={n} q={r === 2 && c === 2} />
          ))
        )}
      </svg>
    );
  }

  if (name === "square-seq") {
    return (
      <svg viewBox="0 0 300 60" className="mt-4 h-auto w-full max-w-[380px]" role="img" aria-label="Square number sequence">
        <SquareGrid x={6} y={50} n={1} />
        <SquareGrid x={30} y={50} n={2} />
        <SquareGrid x={66} y={50} n={3} />
        <SquareGrid x={118} y={50} n={4} />
        <text x="200" y="34" fontSize="16" fill={FAINT}>→</text>
        <g transform="translate(220,10)">
          <rect x="0" y="0" width="40" height="40" fill="none" stroke={INK} strokeWidth="1.1" strokeDasharray="3 3" />
          <text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="600" fill={ACCENT}>?</text>
        </g>
        {["1", "4", "9", "16", "Fig 5"].map((t, i) => (
          <text key={i} x={[16, 40, 82, 138, 240][i]} y="60" textAnchor="middle" fontSize="8" fill={FAINT}>{t}</text>
        ))}
      </svg>
    );
  }

  if (name === "cube-net") {
    // 십자 전개도 (6면)
    const cells: [number, number][] = [[40, 0], [0, 40], [40, 40], [80, 40], [40, 80], [40, 120]];
    return (
      <svg viewBox="0 0 130 170" className="mt-4 h-auto w-full max-w-[150px]" role="img" aria-label="Cube net">
        {cells.map(([x, y], i) => (
          <rect key={i} x={x + 5} y={y + 5} width="40" height="40" fill="rgba(173,138,78,0.12)" stroke={INK} strokeWidth="1.1" />
        ))}
      </svg>
    );
  }

  return null;
}
