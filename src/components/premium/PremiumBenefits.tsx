import { premiumBonuses } from "@/data/premiumBonus";
import { premiumVolume, formatKRW } from "@/data/pricing";

// 200P+ 선택이 가능한 상품 상세페이지에만 노출되는 Premium Benefits 영역.
// (노출 조건은 호출부에서 premiumEligible() 로 판단합니다.)

export default function PremiumBenefits() {
  return (
    <section className="mt-10 border border-brass-500/35 bg-navy-950 p-6 text-ivory-100 lg:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-ivory-100/15 pb-4">
        <div>
          <p className="font-label text-[10.5px] uppercase tracking-[0.18em] text-brass-500">
            Included with this 200P+ Edition
          </p>
          <h2 className="mt-2 font-display text-[20px] font-semibold leading-snug sm:text-[23px]">
            200P+ 구매 고객에게만 제공되는 Premium Benefits
          </h2>
        </div>
        <p className="font-label text-[10px] uppercase tracking-[0.12em] text-ivory-100/50">
          200P+ · {formatKRW(premiumVolume.priceKRW)}
        </p>
      </div>

      <div className="mt-5 grid gap-px bg-ivory-100/12 sm:grid-cols-2">
        {premiumBonuses.map((b) => (
          <div key={b.no} className="flex items-start justify-between gap-3 bg-navy-950 p-4">
            <div className="flex items-start gap-3">
              <span className="font-display text-[15px] font-semibold leading-none text-brass-500/70">{b.no}</span>
              <div>
                <p className="font-label text-[12px] uppercase leading-tight tracking-[0.1em] text-ivory-100">
                  {b.en}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-ivory-100/60">{b.short}</p>
              </div>
            </div>
            <span className="mt-0.5 shrink-0 border border-brass-500/45 px-1.5 py-0.5 font-label text-[8px] uppercase tracking-[0.1em] text-brass-500">
              Included
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12px] leading-relaxed text-ivory-100/50">
        Premium Bonus Package는 200페이지 이상 구성을 선택하신 경우에 제공되며, 구매 확인 후 본교재와 함께
        디지털 자료로 안내해 드립니다.
      </p>
    </section>
  );
}
