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
            <span className="text-charcoal-600">Special</span>
            <span className="font-medium text-navy-950">기본 구성 + {formatKRW(SPECIAL_ADD)}</span>
          </div>
        </div>

        {/* CAT4는 자체 Level 체계가 있어 Standard/Advanced로 나누지 않습니다.
            대신 기존 2 Levels 구성을 Premium Upgrade Card로 강조합니다. */}
        <div className="mt-8 border-2 border-navy-900 bg-white p-6 sm:p-7">
          <span className="inline-flex items-center rounded-sm bg-brass-500 px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-navy-950">
            CAT4 2-Level Package
          </span>
          <p className="mt-3 text-[14px] font-medium text-navy-950">
            한 Level만 준비할지, 두 Level의 유형까지 폭넓게 연습할지 선택하세요.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/60">1 Level</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-700">현재 준비 Level 집중</p>
            </div>
            <div>
              <p className="font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/60">2 Levels</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-700">
                두 Level의 서로 다른 문제 유형과 난이도 범위를 연습
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-baseline justify-between border-t border-ivory-300 pt-4">
            <span className="text-[13.5px] text-charcoal-600">
              2 Levels{" "}
              <span className="font-label text-[9.5px] uppercase tracking-[0.08em] text-brass-500">
                10% Package Saving
              </span>
            </span>
            <span className="font-display text-[20px] font-semibold text-navy-950">
              {formatKRW(CAT4_PRICES.twoLevels)}
            </span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-charcoal-600/70">
            정가 {formatKRW(CAT4_PRICES.twoLevelsList)} 대비 10% 할인이 적용된 가격입니다.
          </p>

          <p className="mt-5 border-t border-ivory-300 pt-4 text-[12px] leading-relaxed text-charcoal-600/70">
            학생에게 맞지 않는 Level을 &ldquo;상위 레벨&rdquo;이라는 이유만으로 권장하지 않습니다. 학생
            연령과 실제 응시 Level을 상담에서 확인한 뒤 안내합니다.
          </p>
        </div>

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
