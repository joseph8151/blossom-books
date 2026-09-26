import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { OOPT_PRICES, SPECIAL_KRW, formatKRW } from "@/app/quote/data";

const rowCls = "flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]";

export default function OoptSection() {
  return (
    <section id="oopt" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
          Oxford Online Placement Test
        </p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          Oxford Online Placement Test 대비
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          학교·학원·기관의 영어 Placement 평가 대비를 위한 구성입니다. 일반 학원 레벨테스트와는 별도의
          Oxford Online Placement Test 전용 문제집입니다.
        </p>

        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
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

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          OOPT 구성 상담
        </a>
      </div>
    </section>
  );
}
