import { flexibleVolumes, formatKRW } from "../data";

const meta: Record<number, { eyebrow: string; badge?: string; desc: string }> = {
  40: { eyebrow: "Light Practice", desc: "단기간 보완 또는 특정 영역 집중" },
  60: { eyebrow: "Recommended", badge: "MOST SELECTED", desc: "가장 많이 선택하는 기본 구성" },
  100: { eyebrow: "Full Practice", desc: "시험 전 충분한 문제 연습" },
  200: { eyebrow: "Extended Practice", desc: "장기 준비 및 충분한 반복 학습" },
};

const included = ["Student Workbook", "Answer & Explanation Guide", "Digital PDF"];

export default function BaseVolumes() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">기본 교재 분량</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
            대부분의 기본 교재는 아래 분량을 기준으로 구성됩니다. 시험과 특수 구성에 따라 별도 가격이 적용될
            수 있습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {flexibleVolumes.map((v) => {
            const m = meta[v.pages];
            return (
              <div key={v.pages} className="relative border border-ivory-300 bg-white p-6">
                {m.badge && (
                  <span className="absolute right-4 top-4 font-label text-[9px] uppercase tracking-[0.1em] text-brass-500">
                    {m.badge}
                  </span>
                )}
                <p className="font-label text-[11px] uppercase tracking-[0.1em] text-charcoal-600/60">
                  {m.eyebrow}
                </p>
                <p className="mt-2 font-display text-[22px] font-semibold text-navy-950">{v.label}</p>
                <p className="mt-2.5 font-display text-[19px] font-semibold text-navy-950">
                  {formatKRW(v.priceKRW)}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{m.desc}</p>

                <ul className="mt-5 space-y-1 border-t border-ivory-300 pt-4 text-[11.5px] leading-relaxed text-charcoal-600/80">
                  {included.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-[680px] text-center text-[12px] leading-relaxed text-charcoal-600/70">
          시험·과목·학년별 구성에 따라 실제 페이지 배분은 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
