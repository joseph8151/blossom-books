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

  // ── 과학 · 데이터 ───────────────────────────────────
  if (name === "line-graph") {
    // 시간에 따라 온도가 오르는 선그래프 (0,10)(1,14)(2,20)(3,24)(4,32)
    const pts: [number, number][] = [[0, 10], [1, 14], [2, 20], [3, 24], [4, 32]];
    const ox = 30, oy = 108, ux = 40, uy = 2.7;
    const px = (x: number) => ox + x * ux;
    const py = (v: number) => oy - v * uy;
    return (
      <svg viewBox="0 0 210 132" className={`${svgCls} max-w-[320px]`} role="img" aria-label="Line graph of temperature over time">
        <line x1={ox} y1="14" x2={ox} y2={oy} stroke={INK} strokeWidth="1.2" />
        <line x1={ox} y1={oy} x2="200" y2={oy} stroke={INK} strokeWidth="1.2" />
        {[0, 10, 20, 30].map((v) => (
          <g key={v}>
            <line x1={ox - 3} y1={py(v)} x2={ox} y2={py(v)} stroke={INK} strokeWidth="1" />
            <text x={ox - 6} y={py(v) + 3} textAnchor="end" fontSize="8" fill={FAINT}>{v}</text>
          </g>
        ))}
        <polyline points={pts.map(([x, v]) => `${px(x)},${py(v)}`).join(" ")} fill="none" stroke={ACCENT} strokeWidth="1.8" />
        {pts.map(([x, v], i) => (
          <g key={i}>
            <circle cx={px(x)} cy={py(v)} r="2.8" fill={INK} />
            <text x={px(x)} y={oy + 12} textAnchor="middle" fontSize="8" fill={FAINT}>{x}h</text>
          </g>
        ))}
        <text x="6" y="12" fontSize="8" fill={FAINT}>°C</text>
      </svg>
    );
  }
  if (name === "food-chain") {
    const nodes = ["Grass", "Rabbit", "Fox"];
    return (
      <svg viewBox="0 0 260 60" className={`${svgCls} max-w-[340px]`} role="img" aria-label="Food chain diagram">
        {nodes.map((n, i) => (
          <g key={n}>
            <rect x={10 + i * 90} y="18" width="66" height="26" rx="2" fill={FILL} stroke={INK} strokeWidth="1.1" />
            <text x={43 + i * 90} y="35" textAnchor="middle" fontSize="11" fill={INK}>{n}</text>
            {i < nodes.length - 1 && (
              <>
                <line x1={76 + i * 90} y1="31" x2={98 + i * 90} y2="31" stroke={ACCENT} strokeWidth="1.6" />
                <polygon points={`${100 + i * 90},31 ${94 + i * 90},28 ${94 + i * 90},34`} fill={ACCENT} />
              </>
            )}
          </g>
        ))}
      </svg>
    );
  }

  // ── AP / 심화 (그래프·도형·다이어그램) ─────────────────
  if (name === "vt-graph") {
    // 속도–시간 그래프: (0,0)→(4,8), 아래 넓이 = 이동 거리
    const ox = 32, oy = 108;
    const px = (t: number) => ox + t * 34;
    const py = (v: number) => oy - v * 9.5;
    return (
      <svg viewBox="0 0 210 132" className={`${svgCls} max-w-[320px]`} role="img" aria-label="Velocity-time graph">
        <polygon points={`${px(0)},${py(0)} ${px(4)},${py(8)} ${px(4)},${py(0)}`} fill={FILL} />
        <line x1={ox} y1="14" x2={ox} y2={oy} stroke={INK} strokeWidth="1.2" />
        <line x1={ox} y1={oy} x2="200" y2={oy} stroke={INK} strokeWidth="1.2" />
        <line x1={px(0)} y1={py(0)} x2={px(4.7)} y2={py(9.4)} stroke={ACCENT} strokeWidth="1.9" />
        {[0, 4, 8].map((v) => (
          <text key={v} x={ox - 6} y={py(v) + 3} textAnchor="end" fontSize="8" fill={FAINT}>{v}</text>
        ))}
        {[0, 1, 2, 3, 4].map((t) => (
          <text key={t} x={px(t)} y={oy + 11} textAnchor="middle" fontSize="8" fill={FAINT}>{t}</text>
        ))}
        <text x="4" y="12" fontSize="8" fill={FAINT}>v(m/s)</text>
        <text x="150" y={oy + 11} fontSize="8" fill={FAINT}>t (s)</text>
      </svg>
    );
  }
  if (name === "force-diagram") {
    const arrow = (x1: number, y1: number, x2: number, y2: number) => {
      const a = Math.atan2(y2 - y1, x2 - x1);
      const p = (ang: number) => `${x2 - 6 * Math.cos(a - ang)},${y2 - 6 * Math.sin(a - ang)}`;
      return (
        <g>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1.6" />
          <polygon points={`${x2},${y2} ${p(0.4)} ${p(-0.4)}`} fill={INK} />
        </g>
      );
    };
    return (
      <svg viewBox="0 0 200 150" className={`${svgCls} max-w-[260px]`} role="img" aria-label="Free-body force diagram">
        <rect x="82" y="62" width="36" height="36" fill={FILL} stroke={INK} strokeWidth="1.3" />
        {arrow(100, 62, 100, 22)}
        {arrow(100, 98, 100, 138)}
        {arrow(118, 80, 178, 80)}
        {arrow(82, 80, 22, 80)}
        <text x="106" y="20" fontSize="9" fill={INK}>N</text>
        <text x="104" y="146" fontSize="9" fill={INK}>W</text>
        <text x="150" y="74" fontSize="9" fill={ACCENT}>F = 10 N</text>
        <text x="24" y="74" fontSize="9" fill={INK}>f = 4 N</text>
      </svg>
    );
  }
  if (name === "scatter-plot") {
    const pts: [number, number][] = [[1, 2], [2, 2.5], [2.5, 4], [3, 3.5], [4, 5], [4.5, 6], [5, 6.5], [6, 7.5]];
    const ox = 26, oy = 108, u = 26;
    const px = (x: number) => ox + x * u;
    const py = (y: number) => oy - y * 12;
    return (
      <svg viewBox="0 0 200 130" className={`${svgCls} max-w-[300px]`} role="img" aria-label="Scatter plot with positive correlation">
        <line x1={ox} y1="12" x2={ox} y2={oy} stroke={INK} strokeWidth="1.2" />
        <line x1={ox} y1={oy} x2="190" y2={oy} stroke={INK} strokeWidth="1.2" />
        {pts.map(([x, y], i) => <circle key={i} cx={px(x)} cy={py(y)} r="3" fill={ACCENT} />)}
        <text x="6" y="12" fontSize="8" fill={FAINT}>y</text>
        <text x="184" y={oy + 11} fontSize="8" fill={FAINT}>x</text>
      </svg>
    );
  }
  if (name === "normal-curve") {
    return (
      <svg viewBox="0 0 220 120" className={`${svgCls} max-w-[320px]`} role="img" aria-label="Normal distribution curve">
        <path d="M10 100 C60 100 70 20 110 20 C150 20 160 100 210 100" fill={FILL} stroke={INK} strokeWidth="1.4" />
        <line x1="110" y1="24" x2="110" y2="100" stroke={INK} strokeWidth="1" strokeDasharray="3 3" />
        <line x1="76" y1="60" x2="76" y2="100" stroke={FAINT} strokeWidth="0.9" strokeDasharray="2 2" />
        <line x1="144" y1="60" x2="144" y2="100" stroke={FAINT} strokeWidth="0.9" strokeDasharray="2 2" />
        <line x1="10" y1="100" x2="210" y2="100" stroke={INK} strokeWidth="1.2" />
        <text x="110" y="114" textAnchor="middle" fontSize="8.5" fill={INK}>μ</text>
        <text x="76" y="114" textAnchor="middle" fontSize="8" fill={FAINT}>−1σ</text>
        <text x="144" y="114" textAnchor="middle" fontSize="8" fill={FAINT}>+1σ</text>
        <text x="110" y="55" textAnchor="middle" fontSize="9" fill={ACCENT}>≈68%</text>
      </svg>
    );
  }
  if (name === "supply-demand") {
    const ox = 28, oy = 108;
    return (
      <svg viewBox="0 0 210 130" className={`${svgCls} max-w-[300px]`} role="img" aria-label="Supply and demand graph">
        <line x1={ox} y1="12" x2={ox} y2={oy} stroke={INK} strokeWidth="1.2" />
        <line x1={ox} y1={oy} x2="196" y2={oy} stroke={INK} strokeWidth="1.2" />
        <line x1={ox + 6} y1={oy - 8} x2="188" y2="24" stroke={INK} strokeWidth="1.6" />
        <line x1={ox + 6} y1="24" x2="188" y2={oy - 8} stroke={ACCENT} strokeWidth="1.6" />
        <circle cx="108" cy="66" r="3.2" fill={INK} />
        <text x="150" y="26" fontSize="9" fill={INK}>S</text>
        <text x="150" y={oy - 6} fontSize="9" fill={ACCENT}>D</text>
        <text x="112" y="60" fontSize="8.5" fill={INK}>E</text>
        <text x="6" y="12" fontSize="8" fill={FAINT}>P</text>
        <text x="190" y={oy + 11} fontSize="8" fill={FAINT}>Q</text>
      </svg>
    );
  }
  if (name === "energy-diagram") {
    // 반응 좌표: 반응물(높음보다 낮게) → 활성화 에너지 언덕 → 생성물(더 낮음) = 발열
    return (
      <svg viewBox="0 0 220 120" className={`${svgCls} max-w-[320px]`} role="img" aria-label="Reaction energy diagram">
        <line x1="24" y1="106" x2="210" y2="106" stroke={INK} strokeWidth="1.2" />
        <line x1="24" y1="10" x2="24" y2="106" stroke={INK} strokeWidth="1.2" />
        <path d="M30 66 C70 66 78 22 110 22 C142 22 150 88 200 88" fill="none" stroke={ACCENT} strokeWidth="1.9" />
        <line x1="30" y1="66" x2="14" y2="66" stroke={FAINT} strokeWidth="0.9" />
        <line x1="200" y1="88" x2="14" y2="88" stroke={FAINT} strokeWidth="0.9" strokeDasharray="2 2" />
        <text x="34" y="60" fontSize="8.5" fill={INK}>reactants</text>
        <text x="160" y="100" fontSize="8.5" fill={INK}>products</text>
        <text x="96" y="16" fontSize="8" fill={FAINT}>Eₐ</text>
        <text x="4" y="58" fontSize="8" fill={FAINT}>E</text>
      </svg>
    );
  }
  if (name === "punnett") {
    const cells = [["AA", "Aa"], ["Aa", "aa"]];
    return (
      <svg viewBox="0 0 150 150" className={`${svgCls} max-w-[170px]`} role="img" aria-label="Punnett square for Aa by Aa cross">
        <text x="52" y="16" textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>A</text>
        <text x="100" y="16" textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>a</text>
        <text x="14" y="56" textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>A</text>
        <text x="14" y="104" textAnchor="middle" fontSize="12" fontWeight="600" fill={INK}>a</text>
        {cells.map((row, r) => row.map((v, c) => (
          <g key={`${r}-${c}`}>
            <rect x={28 + c * 48} y={24 + r * 48} width="48" height="48" fill={v === "aa" ? FILL : "none"} stroke={INK} strokeWidth="1.1" />
            <text x={52 + c * 48} y={54 + r * 48} textAnchor="middle" fontSize="15" fill={v === "aa" ? ACCENT : INK}>{v}</text>
          </g>
        )))}
      </svg>
    );
  }
  if (name === "paper-fold") {
    return (
      <svg viewBox="0 0 250 96" className={`${svgCls} max-w-[340px]`} role="img" aria-label="Paper folding and hole punch">
        {/* 접은 종이 (오른쪽 절반) */}
        <rect x="14" y="20" width="46" height="58" fill={FILL} stroke={INK} strokeWidth="1.2" />
        <line x1="14" y1="20" x2="14" y2="78" stroke={INK} strokeWidth="1.4" strokeDasharray="4 3" />
        <circle cx="44" cy="42" r="5" fill="#fff" stroke={INK} strokeWidth="1.1" />
        <text x="37" y="92" fontSize="8" fill={FAINT}>접은 종이</text>
        {/* 화살표 */}
        <text x="86" y="52" fontSize="16" fill={FAINT}>→</text>
        {/* 펼친 종이 */}
        <rect x="120" y="20" width="92" height="58" fill={FILL} stroke={INK} strokeWidth="1.2" />
        <line x1="166" y1="20" x2="166" y2="78" stroke={INK} strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="150" cy="42" r="5" fill="#fff" stroke={INK} strokeWidth="1.1" />
        <circle cx="182" cy="42" r="5" fill="none" stroke={ACCENT} strokeWidth="1.2" strokeDasharray="2 2" />
        <text x="180" y="40" fontSize="10" fontWeight="600" fill={ACCENT} textAnchor="middle">?</text>
        <text x="150" y="92" fontSize="8" fill={FAINT}>펼친 종이</text>
      </svg>
    );
  }
  if (name === "arrow-rotate") {
    return (
      <svg viewBox="0 0 130 100" className={`${svgCls} max-w-[190px]`} role="img" aria-label="Arrow rotated 90 degrees clockwise">
        {/* 오른쪽을 가리키는 화살표 */}
        <g transform="translate(30,50)">
          <rect x="-22" y="-6" width="30" height="12" fill={FILL} stroke={INK} strokeWidth="1.2" />
          <polygon points="8,-13 26,0 8,13" fill={FILL} stroke={INK} strokeWidth="1.2" />
        </g>
        {/* 시계방향 회전 표시 */}
        <path d="M96 34 A26 26 0 1 1 70 22" fill="none" stroke={ACCENT} strokeWidth="1.6" />
        <polygon points="70,22 76,18 77,27" fill={ACCENT} />
        <text x="96" y="86" fontSize="9" fill={FAINT} textAnchor="middle">90° 시계방향</text>
      </svg>
    );
  }
  if (name === "curve-tangent") {
    // y = x² 위 점 (1,1)에서의 접선 (기울기 = 2)
    const ox = 26, oy = 116, u = 15;
    const px = (x: number) => ox + x * u;
    const py = (y: number) => oy - y * 11;
    const curve = [];
    for (let x = 0; x <= 3.2; x += 0.2) curve.push(`${px(x)},${py(x * x)}`);
    return (
      <svg viewBox="0 0 150 140" className={`${svgCls} max-w-[220px]`} role="img" aria-label="Parabola with tangent line at x=1">
        <line x1={ox} y1="10" x2={ox} y2={oy} stroke={INK} strokeWidth="1.1" />
        <line x1={ox} y1={oy} x2="142" y2={oy} stroke={INK} strokeWidth="1.1" />
        <polyline points={curve.join(" ")} fill="none" stroke={INK} strokeWidth="1.7" />
        <line x1={px(0)} y1={py(-1)} x2={px(3)} y2={py(5)} stroke={ACCENT} strokeWidth="1.6" />
        <circle cx={px(1)} cy={py(1)} r="3" fill={ACCENT} />
        <text x={px(1) + 5} y={py(1) - 4} fontSize="8.5" fill={INK}>(1, 1)</text>
        <text x="120" y={oy - 6} fontSize="8.5" fill={INK}>y = x²</text>
      </svg>
    );
  }

  return null;
}
