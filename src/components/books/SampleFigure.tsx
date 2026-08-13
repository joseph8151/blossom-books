// 샘플 문항용 SVG 도형·그래프 (교육 평가 자료 스타일).
// 수리·도형·추론 문항에서 그림이 필요한 경우 재사용합니다.
const INK = "#1c2c4c";
const ACCENT = "#ad8a4e";
const FAINT = "rgba(28,44,76,0.35)";
const GRID = "rgba(28,44,76,0.14)";
const FILL = "rgba(173,138,78,0.14)";

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

function SquareGrid({ x, y, n, s = 8 }: { x: number; y: number; n: number; s?: number }) {
  const cells = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      cells.push(<rect key={`${r}-${c}`} x={c * s} y={r * s} width={s} height={s} fill="none" stroke={INK} strokeWidth="0.9" />);
  const size = n * s;
  return <g transform={`translate(${x},${y - size})`}>{cells}</g>;
}

const svgCls = "mt-4 h-auto w-full";

export default function SampleFigure({ name }: { name: string }) {
  // ── CAT4 / 비언어 추론 ──────────────────────────────
  if (name === "rotate-seq") {
    const seq: ("TL" | "TR" | "BR" | "BL")[] = ["TL", "TR", "BR"];
    return (
      <svg viewBox="0 0 260 64" className={`${svgCls} max-w-[360px]`} role="img" aria-label="Figure rotation pattern">
        {seq.map((corner, i) => <RotBox key={i} x={i * 52} corner={corner} />)}
        <text x={3 * 52 + 22} y="34" textAnchor="middle" fontSize="18" fill={FAINT}>→</text>
        <RotBox x={3 * 52 + 30} corner="TL" q />
      </svg>
    );
  }
  if (name === "matrix") {
    const rows = [[1, 2, 3], [2, 3, 4], [3, 4, 0]];
    return (
      <svg viewBox="0 0 150 150" className={`${svgCls} max-w-[190px]`} role="img" aria-label="Matrix reasoning grid">
        {rows.map((row, r) => row.map((n, c) => (
          <DotCell key={`${r}-${c}`} x={c * 50 + 3} y={r * 50 + 3} n={n} q={r === 2 && c === 2} />
        )))}
      </svg>
    );
  }
  if (name === "square-seq") {
    return (
      <svg viewBox="0 0 300 60" className={`${svgCls} max-w-[380px]`} role="img" aria-label="Square number sequence">
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
    const cells: [number, number][] = [[40, 0], [0, 40], [40, 40], [80, 40], [40, 80], [40, 120]];
    return (
      <svg viewBox="0 0 130 170" className={`${svgCls} max-w-[150px]`} role="img" aria-label="Cube net">
        {cells.map(([x, y], i) => (
          <rect key={i} x={x + 5} y={y + 5} width="40" height="40" fill={FILL} stroke={INK} strokeWidth="1.1" />
        ))}
      </svg>
    );
  }

  // ── 사고력 / 규칙 ───────────────────────────────────
  if (name === "dots-pattern") {
    // 1, 3, 5, ? (점의 개수 규칙)
    const groups = [1, 3, 5];
    const gx = [12, 82, 152];
    return (
      <svg viewBox="0 0 260 70" className={`${svgCls} max-w-[360px]`} role="img" aria-label="Growing dot pattern">
        {groups.map((n, gi) => (
          <g key={gi}>
            {Array.from({ length: n }).map((_, i) => (
              <circle key={i} cx={gx[gi] + 12} cy={20 + i * 9} r="3.4" fill={ACCENT} />
            ))}
            <text x={gx[gi] + 12} y="66" textAnchor="middle" fontSize="9" fill={FAINT}>{gi + 1}번</text>
          </g>
        ))}
        <text x="212" y="30" textAnchor="middle" fontSize="16" fill={FAINT}>→</text>
        <text x="242" y="34" textAnchor="middle" fontSize="22" fontWeight="600" fill={ACCENT}>?</text>
        <text x="242" y="66" textAnchor="middle" fontSize="9" fill={FAINT}>4번</text>
      </svg>
    );
  }
  if (name === "magic-square") {
    const g = [["8", "1", "6"], ["3", "5", "?"], ["4", "9", "2"]];
    return (
      <svg viewBox="0 0 150 150" className={`${svgCls} max-w-[170px]`} role="img" aria-label="Magic square puzzle">
        {g.map((row, r) => row.map((v, c) => (
          <g key={`${r}-${c}`}>
            <rect x={c * 48 + 3} y={r * 48 + 3} width="46" height="46" fill="none" stroke={INK} strokeWidth="1.1" />
            <text x={c * 48 + 26} y={r * 48 + 33} textAnchor="middle" fontSize="20" fontWeight="600" fill={v === "?" ? ACCENT : INK}>{v}</text>
          </g>
        )))}
      </svg>
    );
  }
  if (name === "balance-scale") {
    // 왼쪽 삼각형 2개 = 오른쪽 원 6개
    return (
      <svg viewBox="0 0 200 120" className={`${svgCls} max-w-[280px]`} role="img" aria-label="Balance scale">
        <line x1="100" y1="20" x2="100" y2="95" stroke={INK} strokeWidth="1.4" />
        <line x1="35" y1="45" x2="165" y2="45" stroke={INK} strokeWidth="1.6" />
        <polygon points="88,95 112,95 100,72" fill={FILL} stroke={INK} strokeWidth="1.2" />
        <line x1="35" y1="45" x2="35" y2="62" stroke={INK} strokeWidth="1" />
        <line x1="165" y1="45" x2="165" y2="62" stroke={INK} strokeWidth="1" />
        <path d="M18 62 Q35 82 52 62" fill="none" stroke={INK} strokeWidth="1.2" />
        <path d="M148 62 Q165 82 182 62" fill="none" stroke={INK} strokeWidth="1.2" />
        {[[27, 60], [43, 60]].map(([x, y], i) => (
          <polygon key={i} points={`${x},${y} ${x + 10},${y} ${x + 5},${y - 9}`} fill={ACCENT} />
        ))}
        {[[153, 58], [163, 58], [173, 58], [158, 66], [168, 66], [163, 74]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.6" fill={INK} />
        ))}
        <text x="35" y="108" textAnchor="middle" fontSize="9" fill={FAINT}>△ × 2</text>
        <text x="165" y="108" textAnchor="middle" fontSize="9" fill={FAINT}>● × 6</text>
      </svg>
    );
  }
  if (name === "cube-stack") {
    // 계단형 블록 쌓기 (3 + 2 + 1 = 6)
    const rows = [[0, 1, 2], [0, 1], [0]];
    return (
      <svg viewBox="0 0 110 100" className={`${svgCls} max-w-[150px]`} role="img" aria-label="Stacked blocks">
        {rows.map((cols, r) => cols.map((c) => (
          <rect key={`${r}-${c}`} x={c * 26 + 6} y={(2 - r) * 26 + 6} width="26" height="26" fill={FILL} stroke={INK} strokeWidth="1.1" />
        )))}
      </svg>
    );
  }

  // ── 그래프 / 데이터 ─────────────────────────────────
  if (name === "bar-graph") {
    const data: [string, number][] = [["Mon", 3], ["Tue", 6], ["Wed", 4], ["Thu", 8]];
    const base = 108, unit = 11;
    return (
      <svg viewBox="0 0 210 132" className={`${svgCls} max-w-[320px]`} role="img" aria-label="Bar graph of books read">
        <line x1="30" y1="14" x2="30" y2={base} stroke={INK} strokeWidth="1.2" />
        <line x1="30" y1={base} x2="198" y2={base} stroke={INK} strokeWidth="1.2" />
        {[0, 2, 4, 6, 8].map((v) => (
          <g key={v}>
            <line x1="27" y1={base - v * unit} x2="30" y2={base - v * unit} stroke={INK} strokeWidth="1" />
            <text x="22" y={base - v * unit + 3} textAnchor="end" fontSize="8" fill={FAINT}>{v}</text>
          </g>
        ))}
        {data.map(([d, v], i) => (
          <g key={d}>
            <rect x={44 + i * 40} y={base - v * unit} width="24" height={v * unit} fill={FILL} stroke={INK} strokeWidth="1.1" />
            <text x={56 + i * 40} y={base - v * unit - 3} textAnchor="middle" fontSize="9" fontWeight="600" fill={INK}>{v}</text>
            <text x={56 + i * 40} y={base + 11} textAnchor="middle" fontSize="8.5" fill={FAINT}>{d}</text>
          </g>
        ))}
        <text x="6" y="12" fontSize="8" fill={FAINT}>권</text>
      </svg>
    );
  }
  if (name === "number-line") {
    const A = 7;
    return (
      <svg viewBox="0 0 210 46" className={`${svgCls} max-w-[340px]`} role="img" aria-label="Number line with point A">
        <line x1="10" y1="26" x2="200" y2="26" stroke={INK} strokeWidth="1.3" />
        <polygon points="200,26 194,23 194,29" fill={INK} />
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 15 + i * 17;
          return (
            <g key={i}>
              <line x1={x} y1="22" x2={x} y2="30" stroke={INK} strokeWidth="1" />
              <text x={x} y="42" textAnchor="middle" fontSize="8" fill={FAINT}>{i}</text>
            </g>
          );
        })}
        <circle cx={15 + A * 17} cy="26" r="4" fill={ACCENT} />
        <text x={15 + A * 17} y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>A</text>
      </svg>
    );
  }
  if (name === "coord-line") {
    // (1,1)과 (3,5)를 지나는 직선
    const ox = 22, oy = 122, u = 16;
    const px = (x: number) => ox + x * u;
    const py = (y: number) => oy - y * u;
    return (
      <svg viewBox="0 0 140 140" className={`${svgCls} max-w-[220px]`} role="img" aria-label="Line through two points on a coordinate plane">
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={i}>
            <line x1={px(i)} y1={py(0)} x2={px(i)} y2={py(6)} stroke={GRID} strokeWidth="0.8" />
            <line x1={px(0)} y1={py(i)} x2={px(6)} y2={py(i)} stroke={GRID} strokeWidth="0.8" />
          </g>
        ))}
        <line x1={px(0)} y1={py(0)} x2={px(6)} y2={py(0)} stroke={INK} strokeWidth="1.2" />
        <line x1={px(0)} y1={py(0)} x2={px(0)} y2={py(6)} stroke={INK} strokeWidth="1.2" />
        <line x1={px(0.2)} y1={py(-0.6)} x2={px(4.2)} y2={py(7.4)} stroke={ACCENT} strokeWidth="1.8" />
        {([[1, 1], [3, 5]] as [number, number][]).map(([x, y], i) => (
          <g key={i}>
            <circle cx={px(x)} cy={py(y)} r="3.4" fill={INK} />
            <text x={px(x) + 6} y={py(y) - 4} fontSize="8.5" fill={INK}>({x},{y})</text>
          </g>
        ))}
        <text x={px(6)} y={py(0) + 11} fontSize="8" fill={FAINT}>x</text>
        <text x={px(0) - 9} y={py(6)} fontSize="8" fill={FAINT}>y</text>
      </svg>
    );
  }

  // ── 도형 (넓이·각·피타고라스) ───────────────────────
  if (name === "triangle-bh") {
    return (
      <svg viewBox="0 0 170 110" className={`${svgCls} max-w-[240px]`} role="img" aria-label="Triangle with base and height">
        <polygon points="20,90 140,90 70,20" fill={FILL} stroke={INK} strokeWidth="1.3" />
        <line x1="70" y1="20" x2="70" y2="90" stroke={ACCENT} strokeWidth="1.1" strokeDasharray="4 3" />
        <rect x="70" y="80" width="10" height="10" fill="none" stroke={ACCENT} strokeWidth="1" />
        <text x="80" y="104" textAnchor="middle" fontSize="11" fill={INK}>밑변 = 8</text>
        <text x="78" y="58" fontSize="11" fill={ACCENT}>높이 = 5</text>
      </svg>
    );
  }
  if (name === "right-triangle") {
    return (
      <svg viewBox="0 0 150 120" className={`${svgCls} max-w-[210px]`} role="img" aria-label="Right triangle with legs 3 and 4">
        <polygon points="24,95 116,95 24,25" fill={FILL} stroke={INK} strokeWidth="1.3" />
        <rect x="24" y="83" width="12" height="12" fill="none" stroke={INK} strokeWidth="1" />
        <text x="70" y="110" textAnchor="middle" fontSize="11" fill={INK}>4</text>
        <text x="12" y="62" fontSize="11" fill={INK}>3</text>
        <text x="76" y="52" fontSize="11" fill={ACCENT}>?</text>
      </svg>
    );
  }
  if (name === "composite-L") {
    // ㄴ자 도형: 바깥 6×5 에서 오른쪽 위 4×3 을 뺀 모양
    return (
      <svg viewBox="0 0 160 140" className={`${svgCls} max-w-[240px]`} role="img" aria-label="Composite L-shaped figure">
        <polygon points="20,30 52,30 52,78 116,78 116,110 20,110" fill={FILL} stroke={INK} strokeWidth="1.3" />
        <text x="12" y="72" fontSize="10.5" fill={INK}>5</text>
        <text x="66" y="124" textAnchor="middle" fontSize="10.5" fill={INK}>6</text>
        <text x="34" y="24" textAnchor="middle" fontSize="10" fill={FAINT}>2</text>
        <text x="86" y="72" textAnchor="middle" fontSize="10" fill={FAINT}>4 × 3 빈 부분</text>
      </svg>
    );
  }
  if (name === "circle-r") {
    return (
      <svg viewBox="0 0 130 130" className={`${svgCls} max-w-[180px]`} role="img" aria-label="Circle with radius">
        <circle cx="65" cy="65" r="46" fill={FILL} stroke={INK} strokeWidth="1.3" />
        <line x1="65" y1="65" x2="111" y2="65" stroke={ACCENT} strokeWidth="1.4" />
        <circle cx="65" cy="65" r="2.4" fill={INK} />
        <text x="86" y="60" fontSize="11" fill={ACCENT}>r = 6</text>
      </svg>
    );
  }
  if (name === "angles-line") {
    return (
      <svg viewBox="0 0 190 96" className={`${svgCls} max-w-[280px]`} role="img" aria-label="Angles on a straight line">
        <line x1="15" y1="72" x2="175" y2="72" stroke={INK} strokeWidth="1.4" />
        <line x1="95" y1="72" x2="45" y2="20" stroke={INK} strokeWidth="1.4" />
        <path d="M77 72 A20 20 0 0 1 82 56" fill="none" stroke={FAINT} strokeWidth="1" />
        <path d="M115 72 A20 20 0 0 0 108 58" fill="none" stroke={ACCENT} strokeWidth="1.1" />
        <text x="70" y="60" fontSize="10.5" fill={INK}>120°</text>
        <text x="120" y="64" fontSize="11" fill={ACCENT}>x</text>
      </svg>
    );
  }

  return null;
}
