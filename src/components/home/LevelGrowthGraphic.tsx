// 히어로용 커스텀 비주얼 — 책 표지 목업 대신, "학생 수준에 맞춘 성장"이라는 브랜드 핵심 가치를 그래프로 표현합니다.
export function LevelGrowthGraphic() {
  return (
    <div className="relative w-full max-w-md border border-navy-800/12 bg-ivory-100 p-7 shadow-lift">
      <p className="font-label text-[10.5px] uppercase tracking-[0.16em] text-brass-500">Level-matched growth</p>
      <p className="mt-1.5 font-display text-[18px] font-semibold text-navy-950">지금 수준에서, 다음 단계로</p>

      <svg viewBox="0 0 360 200" className="mt-6 w-full" role="img" aria-label="현재 수준에서 목표 수준까지의 학습 성장 그래프">
        {/* 격자 */}
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#1c2c4c" strokeOpacity="0.08" strokeWidth="1" />
        ))}

        {/* 성장 곡선 */}
        <path
          d="M10,168 C90,168 110,110 160,96 C220,80 250,40 350,24"
          fill="none"
          stroke="#ad8a4e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 10"
        />
        <path
          d="M10,168 C90,168 110,110 160,96 C220,80 250,40 350,24"
          fill="none"
          stroke="#131f38"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 시작점 */}
        <circle cx="10" cy="168" r="6" fill="#faf7f0" stroke="#131f38" strokeWidth="2.5" />
        <text x="10" y="192" fontSize="12" fontWeight="600" fill="#131f38" textAnchor="start">현재 수준</text>

        {/* 도착점 */}
        <circle cx="350" cy="24" r="7" fill="#ad8a4e" stroke="#131f38" strokeWidth="2.5" />
        <text x="350" y="16" fontSize="12" fontWeight="600" fill="#131f38" textAnchor="end">목표 수준</text>
      </svg>

      <div className="mt-5 flex items-center justify-between border-t border-navy-800/10 pt-4">
        <div>
          <p className="font-label text-[9.5px] uppercase tracking-[0.12em] text-charcoal-600">Diagnose</p>
          <p className="text-[12.5px] font-medium text-navy-950">현재 수준 진단</p>
        </div>
        <div className="h-8 w-px bg-navy-800/10" />
        <div>
          <p className="font-label text-[9.5px] uppercase tracking-[0.12em] text-charcoal-600">Match</p>
          <p className="text-[12.5px] font-medium text-navy-950">맞춤 문제집</p>
        </div>
        <div className="h-8 w-px bg-navy-800/10" />
        <div>
          <p className="font-label text-[9.5px] uppercase tracking-[0.12em] text-charcoal-600">Grow</p>
          <p className="text-[12.5px] font-medium text-navy-950">단계적 향상</p>
        </div>
      </div>
    </div>
  );
}
