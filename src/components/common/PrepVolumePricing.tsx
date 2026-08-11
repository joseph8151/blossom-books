import Link from "next/link";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { flexibleVolumes, extendedOption, formatKRW, priceDisclaimer, pricingReassurance } from "@/data/pricing";
import { siteConfig } from "@/data/site";

// buyProductId가 있으면 각 분량을 바로 결제로 연결합니다(상품 상세용).
// 없으면 가격·추천 대상만 안내합니다(홈페이지용).
export default function PrepVolumePricing({ buyProductId }: { buyProductId?: string }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {flexibleVolumes.map((v) => {
          const highlight = !!v.badge;
          return (
            <div
              key={v.pages}
              className={`relative flex flex-col border p-6 ${
                highlight ? "border-brass-500/60 bg-brass-500/[0.05] shadow-card" : "border-navy-800/12 bg-ivory-100"
              }`}
            >
              {v.badge && (
                <span className="absolute -top-3 left-6 bg-brass-500 px-2.5 py-1 font-label text-[9.5px] uppercase tracking-[0.14em] text-navy-950">
                  {v.badge}
                </span>
              )}
              <p className="font-display text-[28px] font-semibold leading-none text-navy-950">{v.label}</p>
              <p className="mt-1.5 font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">{v.tier}</p>
              <p className="mt-4 font-display text-[24px] font-semibold text-navy-950">{formatKRW(v.priceKRW)}</p>
              <ul className="mt-4 flex-1 space-y-1.5">
                {v.forWhom.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-[12px] leading-snug text-charcoal-600">
                    <Check size={12} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                    {f}
                  </li>
                ))}
              </ul>
              {buyProductId && (
                <Link
                  href={`/books/${buyProductId}#sample`}
                  className={`mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-all hover:-translate-y-0.5 ${
                    highlight
                      ? "bg-navy-900 text-ivory-100 shadow-soft hover:bg-navy-800"
                      : "border border-navy-800/25 text-navy-900 hover:border-navy-800/50"
                  }`}
                >
                  이 구성 자세히 보기
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          );
        })}

        {/* Extended — 가격 문의 */}
        <div className="flex flex-col border border-dashed border-navy-800/25 bg-ivory-200/40 p-6">
          <p className="font-display text-[28px] font-semibold leading-none text-navy-950">{extendedOption.label}</p>
          <p className="mt-1.5 font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">
            {extendedOption.tier}
          </p>
          <p className="mt-4 font-display text-[17px] font-semibold text-burgundy-700">Price on Request</p>
          <ul className="mt-4 flex-1 space-y-1.5">
            {extendedOption.forWhom.map((f) => (
              <li key={f} className="flex items-start gap-1.5 text-[12px] leading-snug text-charcoal-600">
                <Check size={12} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-1.5 border border-navy-800/25 px-4 py-2.5 text-[13px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
          >
            <MessageCircle size={14} />
            가격 문의
          </a>
        </div>
      </div>

      <p className="mt-7 text-center font-display text-[17px] font-medium text-navy-950 sm:text-[19px]">
        More pages are not always better.{" "}
        <span className="text-brass-500">Choose what the student actually needs.</span>
      </p>
      <p className="mt-4 text-[12.5px] leading-relaxed text-charcoal-600">{pricingReassurance}</p>
      <p className="mt-1.5 text-[12px] text-charcoal-600/70">* {priceDisclaimer}</p>
    </div>
  );
}
