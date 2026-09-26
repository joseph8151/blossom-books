import { flexibleVolumes, formatKRW, SPECIAL_KRW } from "../data";

const rowCls = "flex items-baseline justify-between gap-4 py-1.5 text-[13px]";

// MAP·CAT4·OOPT는 /quote-international-school로 이동했습니다.
// ISEE는 사용자 요청에 따라 이 페이지(레벨테스트 중심 Quote)에 남겨둡니다.
export default function ExamConfigurations() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-12 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">
            International School Admission
          </span>
          <h2 className="mt-2.5 font-display text-[21px] font-semibold text-navy-950">ISEE 구성</h2>
        </div>

        <div className="mx-auto mt-8 max-w-[420px] sm:mt-9">
          <div className="border border-ivory-300 bg-white p-5 sm:p-6">
            <p className="font-display text-[16px] font-semibold text-navy-950">ISEE</p>
            <p className="mt-1 text-[12px] text-charcoal-600/70">Lower · Middle · Upper</p>
            <div className="mt-3 divide-y divide-ivory-300 border-t border-ivory-300">
              {flexibleVolumes.map((v) => (
                <div key={v.pages} className={rowCls}>
                  <span className="text-charcoal-600">{v.label}</span>
                  <span className="font-medium text-navy-950">{formatKRW(v.priceKRW)}</span>
                </div>
              ))}
              <div className={rowCls}>
                <span className="text-charcoal-600">200P Special</span>
                <span className="font-medium text-navy-950">{formatKRW(SPECIAL_KRW)}</span>
              </div>
            </div>
            <p className="mt-5 text-[12.5px] leading-relaxed text-charcoal-600/80">
              Verbal Reasoning · Reading Comprehension · Quantitative Reasoning · Mathematics Achievement 중
              필요 영역을 선택할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
