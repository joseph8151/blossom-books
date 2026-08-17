import Link from "next/link";
import { FileSearch } from "lucide-react";
import { fromPriceKRW } from "@/data/pricing";

// 가격보다 Sample을 더 강하게 노출하는 독립 섹션.
// 금액은 pricing 데이터에서 파생시켜, 가격 정책이 바뀌어도 문구가 어긋나지 않게 합니다.
const priceInManwon = Math.round(fromPriceKRW / 10000);

const checks = ["문제의 난이도", "영어 수준", "해설의 상세함", "전체적인 구성까지"];

export default function SeeBeforeYouBuy() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-300/45 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <span className="eyebrow">See before you buy</span>
            <h2 className="mt-4 font-display text-[28px] font-semibold leading-tight text-navy-950 sm:text-[34px]">
              {priceInManwon}만원을 결제하기 전에,
              <br />
              먼저 직접 확인하세요.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-charcoal-600">
              실제 Sample을 확인한 뒤 구매 여부를 결정하셔도 됩니다.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/books"
                className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-4 text-[15px] font-semibold text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
              >
                <FileSearch size={17} />
                무료 Sample 보기
              </Link>
            </div>
            <p className="mt-3 text-[12.5px] text-charcoal-600">회원가입 없이 확인 가능</p>
          </div>

          {/* 무엇을 확인할 수 있는지 */}
          <div className="border border-navy-800/15 bg-ivory-100 p-8 shadow-card">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
              What you can check
            </p>
            <ul className="mt-5 divide-y divide-navy-800/10">
              {checks.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 py-3.5">
                  <span className="font-display text-[15px] font-semibold text-brass-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[16px] text-navy-950">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
