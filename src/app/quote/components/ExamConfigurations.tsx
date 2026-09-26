import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { flexibleVolumes, formatKRW, MAP_PRICES, CAT4_PRICES, OOPT_PRICES, SPECIAL_ADD, SPECIAL_KRW } from "../data";

const rowCls = "flex items-baseline justify-between gap-4 py-2 text-[13.5px]";

export default function ExamConfigurations() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
            International School Admission
          </span>
          <h2 className="mt-3 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
            시험별 구성
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-2">
          {/* MAP Growth */}
          <div className="border border-ivory-300 bg-white p-6 sm:p-7">
            <p className="font-display text-[18px] font-semibold text-navy-950">MAP Growth</p>
            <div className="mt-3 divide-y divide-ivory-300 border-t border-ivory-300">
              <div className={rowCls}>
                <span className="text-charcoal-600">English — 100P + Explanation</span>
                <span className="font-medium text-navy-950">{formatKRW(MAP_PRICES.english)}</span>
              </div>
              <div className={rowCls}>
                <span className="text-charcoal-600">Math — 60P + Explanation</span>
                <span className="font-medium text-navy-950">{formatKRW(MAP_PRICES.math)}</span>
              </div>
              <div className={rowCls}>
                <span className="text-charcoal-600">English + Math</span>
                <span className="font-medium text-navy-950">{formatKRW(MAP_PRICES.both)}</span>
              </div>
              <div className={rowCls}>
                <span className="text-charcoal-600">Special</span>
                <span className="font-medium text-navy-950">기본 구성 + {formatKRW(SPECIAL_ADD)}</span>
              </div>
            </div>
            <Link
              href="/prep/map"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-900 underline decoration-navy-900/30 underline-offset-4 hover:decoration-navy-900"
            >
              MAP 교재 보기
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* CAT4 */}
          <div className="border border-ivory-300 bg-white p-6 sm:p-7">
            <p className="font-display text-[18px] font-semibold text-navy-950">CAT4</p>
            <div className="mt-3 divide-y divide-ivory-300 border-t border-ivory-300">
              <div className={rowCls}>
                <span className="text-charcoal-600">1 Level</span>
                <span className="font-medium text-navy-950">{formatKRW(CAT4_PRICES.oneLevel)}</span>
              </div>
              <div className={rowCls}>
                <span className="text-charcoal-600">
                  2 Levels{" "}
                  <span className="font-label text-[9.5px] uppercase tracking-[0.08em] text-brass-500">
                    10% Package Saving
                  </span>
                </span>
                <span className="font-medium text-navy-950">{formatKRW(CAT4_PRICES.twoLevels)}</span>
              </div>
              <div className={rowCls}>
                <span className="text-charcoal-600">Special</span>
                <span className="font-medium text-navy-950">기본 구성 + {formatKRW(SPECIAL_ADD)}</span>
              </div>
            </div>
            <p className="mt-5 text-[12.5px] leading-relaxed text-charcoal-600/80">
              CAT4는 학생 연령에 따라 Level이 달라지므로 현재 학년 또는 시험 Level을 상담 시 알려주세요.
            </p>
          </div>

          {/* ISEE */}
          <div className="border border-ivory-300 bg-white p-6 sm:p-7">
            <p className="font-display text-[18px] font-semibold text-navy-950">ISEE</p>
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

          {/* OOPT */}
          <div className="border border-ivory-300 bg-white p-6 sm:p-7">
            <p className="font-display text-[18px] font-semibold text-navy-950">Oxford Online Placement Test</p>
            <div className="mt-3 divide-y divide-ivory-300 border-t border-ivory-300">
              <div className={rowCls}>
                <span className="text-charcoal-600">100P</span>
                <span className="font-medium text-navy-950">{formatKRW(OOPT_PRICES.p100)}</span>
              </div>
              <div className={rowCls}>
                <span className="text-charcoal-600">200P</span>
                <span className="font-medium text-navy-950">{formatKRW(OOPT_PRICES.p200)}</span>
              </div>
              <div className={rowCls}>
                <span className="text-charcoal-600">200P Special</span>
                <span className="font-medium text-navy-950">{formatKRW(SPECIAL_KRW)}</span>
              </div>
            </div>
            <p className="mt-5 text-[12.5px] leading-relaxed text-charcoal-600/80">
              학원·학교 배치용 Oxford Placement Test 대비이며 일반 레벨테스트와 별도 구성입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
