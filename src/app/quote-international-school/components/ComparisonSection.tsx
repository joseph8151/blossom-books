const rows = [
  {
    exam: "MAP Growth",
    purpose: "학업 성취도 평가",
    areas: "Reading · Language Usage · Math 등",
    basis: "학년 기준",
    prep: "학년별 분량으로 준비",
  },
  {
    exam: "CAT4",
    purpose: "인지능력 평가",
    areas: "Verbal · Non-Verbal · Quantitative · Spatial",
    basis: "Level 기준",
    prep: "연령·Level 확인 후 준비",
  },
  {
    exam: "ISEE",
    purpose: "학업 성취도 평가",
    areas: "Verbal Reasoning · Reading · Quantitative · Math Achievement",
    basis: "Lower/Middle/Upper 레벨 기준",
    prep: "레벨 확인 후 필요 영역만 준비",
  },
  {
    exam: "Oxford Online Placement Test",
    purpose: "영어 Placement 평가",
    areas: "English",
    basis: "영어 수준 기준",
    prep: "학교·기관 요청 기준 확인 후 준비",
  },
];

const cellCls = "border border-ivory-300 px-4 py-3 text-[13px] text-charcoal-700";
const headCellCls =
  "border border-ivory-300 bg-ivory-200/70 px-4 py-3 text-left font-label text-[10.5px] uppercase tracking-[0.08em] text-navy-800/70";

const variances = [
  "MAP만 보는 경우",
  "CAT4를 사용하는 경우",
  "영어 Placement Test가 있는 경우",
  "수학 또는 Writing이 추가되는 경우",
];

export default function ComparisonSection() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <h2 className="text-center font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          MAP, CAT4, ISEE, OOPT는 무엇이 다른가요?
        </h2>

        {/* Desktop: table */}
        <div className="mt-10 hidden overflow-x-auto sm:block">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={headCellCls}>시험</th>
                <th className={headCellCls}>평가 목적</th>
                <th className={headCellCls}>주요 영역</th>
                <th className={headCellCls}>학년/Level 여부</th>
                <th className={headCellCls}>추천 준비 방식</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.exam}>
                  <td className={`${cellCls} font-medium text-navy-950`}>{r.exam}</td>
                  <td className={cellCls}>{r.purpose}</td>
                  <td className={cellCls}>{r.areas}</td>
                  <td className={cellCls}>{r.basis}</td>
                  <td className={cellCls}>{r.prep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: cards */}
        <div className="mt-8 grid gap-4 sm:hidden">
          {rows.map((r) => (
            <div key={r.exam} className="border border-ivory-300 bg-white p-5 text-left">
              <p className="font-display text-[16px] font-semibold text-navy-950">{r.exam}</p>
              <div className="mt-3 space-y-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
                <p>
                  <span className="text-charcoal-600/60">평가 목적 — </span>
                  {r.purpose}
                </p>
                <p>
                  <span className="text-charcoal-600/60">주요 영역 — </span>
                  {r.areas}
                </p>
                <p>
                  <span className="text-charcoal-600/60">학년/Level — </span>
                  {r.basis}
                </p>
                <p>
                  <span className="text-charcoal-600/60">준비 방식 — </span>
                  {r.prep}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 10. 학교별 시험이 다를 수 있다는 안내 */}
        <div className="mx-auto mt-10 max-w-[640px] border border-ivory-300 bg-ivory-200/30 p-6 text-left sm:p-8">
          <p className="text-[14px] font-medium text-navy-950">학교마다 입학시험 구성이 다릅니다.</p>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
            같은 국제학교 입학이라도 아래처럼 구성이 다를 수 있습니다.
          </p>
          <ul className="mt-3 space-y-1 text-[13px] leading-relaxed text-charcoal-600">
            {variances.map((v) => (
              <li key={v}>· {v}</li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600">
            따라서 상담 시 학교명, 학생 학년, 시험명, 시험 예정일을 알려주시면 더 정확하게 안내할 수
            있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
