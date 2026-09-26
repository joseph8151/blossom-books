import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { CAT4_PRICES, SPECIAL_ADD, formatKRW } from "@/app/quote/data";

const rowCls = "flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]";

export default function Cat4Section() {
  return (
    <section id="cat4" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">CAT4</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          CAT4 Level별 대비
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          CAT4는 학생 연령과 학년에 따라 시험 Level이 달라집니다. Verbal · Non-Verbal · Quantitative · Spatial
          Reasoning 영역별 문제 유형을 기준으로 Level에 맞춰 대비할 수 있습니다.
        </p>

        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
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

        <p className="mt-5 text-[13px] leading-relaxed text-charcoal-600/80">
          2 Levels 가격은 정가 {formatKRW(CAT4_PRICES.twoLevelsList)} 대비 10% 할인이 적용된 가격입니다.
          현재 학년 또는 시험 Level을 상담 시 알려주세요.
        </p>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          CAT4 Level 상담
        </a>
      </div>
    </section>
  );
}
