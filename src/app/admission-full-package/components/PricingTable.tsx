import { Check, MessageCircle, Compass, Star, Gem } from "lucide-react";
import { siteConfig } from "@/data/site";
import { pricingTiers, formatKRW } from "../data";

const tierIcons: Record<string, typeof Compass> = {
  standard: Compass,
  premium: Star,
  signature: Gem,
};

export default function PricingTable() {
  return (
    <section className="border-b border-navy-800/10 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">Package Tiers</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">가격표</h2>
          <p className="mt-5 font-display text-[16px] font-semibold italic text-navy-900">
            One student, one admission configuration.
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.9] text-charcoal-600">
            페이지 수나 시험 개수로 가격이 결정되는 것이 아니라, 지원 학교의 평가 구조와 학생의 현재
            수준에 따라 준비 범위가 달라집니다.
          </p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-charcoal-600/80">
            실시간 상담·첨삭 세션이 아닌, 학생에게 맞춰 제작되는 학습 자료(문제집·해설집·모의고사) 패키지입니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((t) => {
            const TierIcon = tierIcons[t.id] ?? Compass;
            return (
            <div
              key={t.id}
              className={`relative flex flex-col border p-7 sm:p-8 ${
                t.mostPopular ? "border-2 border-navy-950 bg-navy-950 text-ivory-100" : "border-navy-800/12 bg-ivory-100"
              }`}
            >
              {t.mostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#7c8a6e] px-3 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-white">
                  Most Selected
                </span>
              )}
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  t.mostPopular ? "bg-ivory-100/10 text-[#aab79c]" : "bg-[#eef1e8] text-[#5f6f52]"
                }`}
              >
                <TierIcon size={18} strokeWidth={1.7} />
              </span>
              <p
                className={`mt-4 font-label text-[11px] uppercase tracking-[0.16em] ${
                  t.mostPopular ? "text-[#aab79c]" : "text-[#5f6f52]"
                }`}
              >
                {t.name}
              </p>
              <p className={`mt-3 font-display text-[30px] font-semibold ${t.mostPopular ? "text-ivory-100" : "text-navy-950"}`}>
                {formatKRW(t.priceKRW)}
              </p>
              {/* 서비스 성격(tagline)을 가격 바로 아래, 분량 정보보다 먼저 보여줍니다 */}
              <p className={`mt-1.5 text-[13px] font-medium ${t.mostPopular ? "text-ivory-100/90" : "text-navy-800/80"}`}>
                {t.tagline}
              </p>

              <ul className="mt-6 flex-1 space-y-2 text-[13px] leading-relaxed">
                {t.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 ${t.mostPopular ? "text-ivory-100/90" : "text-charcoal-700"}`}>
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${t.mostPopular ? "text-[#aab79c]" : "text-[#5f6f52]"}`}
                      strokeWidth={2.4}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* 분량 정보는 세부 정보로 맨 아래 작은 글씨 처리 */}
              <p className={`mt-5 text-[11px] ${t.mostPopular ? "text-ivory-200/55" : "text-charcoal-600/55"}`}>
                {t.pages}
              </p>

              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 px-6 text-[13.5px] font-medium transition-colors ${
                  t.mostPopular
                    ? "bg-[#7c8a6e] text-white hover:bg-[#6c7a5f]"
                    : "bg-navy-950 text-ivory-100 hover:bg-navy-900"
                }`}
              >
                <MessageCircle size={15} />
                {t.name} 상담하기
              </a>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
