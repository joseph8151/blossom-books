import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, SPECIAL_KRW, formatKRW } from "@/app/quote/data";

const rowCls = "flex items-baseline justify-between gap-4 py-2.5 text-[13.5px]";

export default function IseeSection() {
  return (
    <section id="isee" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">ISEE</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          ISEE 레벨별 대비
        </h2>
        <p className="mt-1 text-[12.5px] text-charcoal-600/70">Lower · Middle · Upper</p>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          Verbal Reasoning · Reading Comprehension · Quantitative Reasoning · Mathematics Achievement 중
          필요 영역을 선택할 수 있습니다.
        </p>

        <div className="mt-8 divide-y divide-ivory-300 border-y border-ivory-300">
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

        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-[50px] items-center justify-center gap-2 bg-navy-900 px-7 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={16} />
          ISEE 구성 상담
        </a>
      </div>
    </section>
  );
}
