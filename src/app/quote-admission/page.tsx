import { Check, MessageCircle, Compass, Star, Gem } from "lucide-react";
import { siteConfig } from "@/data/site";
import { pricingTiers, formatKRW } from "../admission-full-package/data";

// 카카오톡 상담사가 "Admission Full Package 가격 물어볼 때" 직접 링크로만
// 전달하는 비공개 가격 안내 페이지입니다. 공개 페이지(/admission-full-package)
// 에는 가격을 노출하지 않기로 했으므로, 실제 금액은 이 페이지와 카카오톡
// 상담에서만 확인할 수 있습니다. 홈/헤더/푸터/사이트맵 어디에도 연결하지
// 않으며, 검색 노출도 막아둡니다(아래 robots 설정). 다른 /quote-* 페이지와
// 동일한 패턴입니다.
export const metadata = {
  title: "입학 Full Package 가격 안내",
  description: "카카오톡 상담에서 안내하는 Admission Full Package 가격표입니다.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://blossombooks.org/quote-admission/" },
  openGraph: {
    title: "Blossom Books 입학 Full Package 가격 안내",
    description: "카카오톡 상담에서 안내하는 Admission Full Package 가격표입니다.",
    url: "https://blossombooks.org/quote-admission/",
  },
};

const tierIcons: Record<string, typeof Compass> = {
  standard: Compass,
  premium: Star,
  signature: Gem,
};

export default function QuoteAdmissionPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-14 lg:px-8 lg:py-20">
      {/* 0. 유틸 바 */}
      <span className="inline-flex items-center rounded-full border border-ivory-300 bg-ivory-200/50 px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/80">
        카톡 상담용 가격 안내 · 홈 메뉴에 없음
      </span>

      {/* 1. H1 + 한 줄 */}
      <h1 className="mt-5 font-display text-[30px] font-semibold text-navy-950 sm:text-[34px]">
        입학 Full Package 가격 안내
      </h1>
      <p className="mt-3 max-w-[640px] text-[14.5px] leading-relaxed text-charcoal-600">
        공개 페이지(admission-full-package)에는 가격을 표시하지 않습니다. 상담 중인 학부모님께는 이 페이지
        링크를 전달해 주세요.
      </p>

      {/* 2. 가격 카드 */}
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

      <p className="mx-auto mt-10 max-w-[640px] text-center text-[12px] leading-relaxed text-charcoal-600/70">
        페이지 수나 시험 개수로 가격이 결정되는 것이 아니라, 지원 학교의 평가 구조와 학생의 현재 수준에 따라
        준비 범위가 달라집니다. 정확한 구성·가격은 상담에서 확정됩니다.
      </p>

      {/* 3. CTA */}
      <div className="mt-[72px] border-t border-ivory-300 pt-10 text-center">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          카카오톡으로 Admission Full Package 문의하기
        </a>
      </div>
    </div>
  );
}
