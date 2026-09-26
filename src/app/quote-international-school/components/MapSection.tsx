import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MAP_PRICES, SPECIAL_ADD, formatKRW } from "@/app/quote/data";

const rowCls = "flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]";

export default function MapSection() {
  return (
    <section id="map" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">Map Growth</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          MAP Growth 대비 문제집
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          학생의 학년과 시험 목적에 따라 English와 Math 영역을 선택해 준비할 수 있습니다.
        </p>

        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
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

        <p className="mt-5 text-[13px] leading-relaxed text-charcoal-600/80">
          학년과 목표 점수를 알려주시면 필요한 영역과 분량을 기준으로 안내합니다.
        </p>

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          MAP 구성 상담
        </a>
      </div>
    </section>
  );
}
