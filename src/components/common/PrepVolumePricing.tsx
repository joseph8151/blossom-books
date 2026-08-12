import Link from "next/link";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { flexibleVolumes, extendedOption, formatKRW, fromPriceKRW, priceDisclaimer, pricingReassurance } from "@/data/pricing";
import { siteConfig } from "@/data/site";

// 가치 중심 구성 안내 — 메인/시험별 페이지에서는 정확한 금액을 노출하지 않고,
// 구성과 추천 대상만 보여준 뒤 "가격 확인하기"로 상세 페이지에서 확인하도록 유도합니다.
export default function PrepVolumePricing({ buyProductId }: { buyProductId?: string }) {
  const priceHref = buyProductId ? `/books/${buyProductId}#sample` : "/books";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <p className="mt-1 text-[12.5px] text-charcoal-600">{v.tierKo}</p>
              <ul className="mt-4 flex-1 space-y-1.5">
                {v.forWhom.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-[12px] leading-snug text-charcoal-600">
                    <Check size={12} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={priceHref}
                className={`mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition-all hover:-translate-y-0.5 ${
                  highlight
                    ? "bg-navy-900 text-ivory-100 shadow-soft hover:bg-navy-800"
                    : "border border-navy-800/25 text-navy-900 hover:border-navy-800/50"
                }`}
              >
                가격 확인하기
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}

        {/* Extended — 맞춤 견적 문의 */}
        <div className="flex flex-col border border-dashed border-navy-800/25 bg-ivory-200/40 p-6">
          <p className="font-display text-[28px] font-semibold leading-none text-navy-950">{extendedOption.label}</p>
          <p className="mt-1.5 font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">
            {extendedOption.tier}
          </p>
          <p className="mt-1 text-[12.5px] text-charcoal-600">{extendedOption.tierKo}</p>
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
            맞춤 견적 문의
          </a>
        </div>
      </div>

      {/* 가격대 힌트 (최고가는 첫 화면에서 노출하지 않음) */}
      <p className="mt-6 text-[13.5px] text-charcoal-900">
        교재 구성 40P부터 · <span className="font-display text-[16px] font-semibold text-navy-950">{formatKRW(fromPriceKRW)}부터</span>
        <span className="ml-1.5 text-[12.5px] text-charcoal-600">정확한 가격은 각 교재 상세에서 확인하실 수 있습니다.</span>
      </p>

      <p className="mt-5 text-center font-display text-[17px] font-medium text-navy-950 sm:text-[19px]">
        More pages are not always better.{" "}
        <span className="text-brass-500">Choose what the student actually needs.</span>
      </p>
      <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-600">{pricingReassurance}</p>
      <p className="mt-1.5 text-[12px] text-charcoal-600/70">* {priceDisclaimer}</p>
    </div>
  );
}
