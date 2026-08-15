import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { premiumBonuses, standardVsPremium } from "@/data/premiumBonus";
import { premiumVolume, volumeByPages, formatKRW } from "@/data/pricing";

// 200P+ Premium Bonus Package — 메인페이지 섹션.
// 넘버링 + 큰 영문 타이포로 학술 출판물 느낌을 내고, 둥근 카드·그라데이션은 쓰지 않습니다.
// 모바일에서는 6장이 세로로 길게 늘어지지 않도록 가로 스와이프로 전환합니다.

const hundred = volumeByPages(100);

export default function PremiumBonusSection() {
  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* 헤더 */}
        <div className="max-w-3xl">
          <span className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">
            200P+ Premium Benefits
          </span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight sm:text-[32px]">
            200페이지 이상 교재를 선택하시면
            <br />
            교재만 제공되지 않습니다.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-ivory-100/75">
            시험 준비의 시작부터 Final Review까지 활용할 수 있는
            <br className="hidden sm:block" /> Premium Bonus Package가 함께 제공됩니다.
          </p>
          <p className="mt-4 border-l-2 border-brass-500/60 pl-4 text-[13.5px] leading-relaxed text-ivory-100/60">
            Blossom Books의 200P+ 교재는 충분한 문제풀이와 함께 복습, 실전 연습, 학습 관리까지 고려한
            프리미엄 학습 패키지입니다.
          </p>
        </div>

        {/* 6가지 혜택 — 모바일 가로 스와이프 / 데스크톱 3열 그리드 */}
        <div className="mt-12 -mx-5 flex snap-x snap-mandatory gap-px overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {premiumBonuses.map((b) => (
            <article
              key={b.no}
              className="flex w-[78vw] shrink-0 snap-start flex-col border border-ivory-100/12 bg-ivory-100/[0.03] p-6 transition-colors hover:border-brass-500/40 sm:w-auto lg:p-7"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-ivory-100/12 pb-3">
                <span className="font-display text-[26px] font-semibold leading-none text-brass-500/85">{b.no}</span>
                <span className="font-label text-[8.5px] uppercase tracking-[0.14em] text-ivory-100/40">Included</span>
              </div>
              <h3 className="mt-4 font-label text-[15px] uppercase leading-tight tracking-[0.1em] text-ivory-100 lg:text-[16px]">
                {b.en}
              </h3>
              <p className="mt-1.5 text-[13px] font-medium text-brass-500/90">{b.ko}</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ivory-100/60">{b.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-ivory-100/40 sm:hidden">← 옆으로 넘겨 6가지 혜택을 모두 확인하세요</p>

        {/* 대형 스테이트먼트 */}
        <div className="mt-16 border-y border-ivory-100/15 py-12 text-center lg:py-16">
          <p className="font-display text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[44px] lg:text-[52px]">
            ONE BOOK.
            <br />
            <span className="text-brass-500">A COMPLETE PREP SYSTEM.</span>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-ivory-100/70">
            200P+ 한 권으로
            <br className="sm:hidden" /> Practice → Review → Diagnosis → Final Prep까지.
          </p>
        </div>

        {/* 100P STANDARD vs 200P+ PREMIUM */}
        <div className="mt-14 grid gap-px border border-ivory-100/12 bg-ivory-100/12 lg:grid-cols-2">
          <div className="bg-navy-950 p-7 lg:p-9">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-ivory-100/50">
              {standardVsPremium.standard.label}
            </p>
            <p className="mt-2 font-display text-[19px] font-semibold text-ivory-100/85">
              {standardVsPremium.standard.tagline}
            </p>
            {hundred && (
              <p className="mt-1 text-[13px] text-ivory-100/45">{formatKRW(hundred.priceKRW)}</p>
            )}
            <ul className="mt-5 space-y-2">
              {standardVsPremium.standard.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-ivory-100/60">
                  <Check size={13} className="mt-1 shrink-0 text-ivory-100/35" strokeWidth={2.2} />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-navy-950 p-7 lg:p-9">
            <span className="absolute inset-y-0 left-0 w-0.5 bg-brass-500" />
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
                {standardVsPremium.premium.label}
              </p>
              <span className="border border-brass-500/45 px-2 py-0.5 font-label text-[8.5px] uppercase tracking-[0.1em] text-brass-500">
                {standardVsPremium.premium.note}
              </span>
            </div>
            <p className="mt-2 font-display text-[19px] font-semibold">{standardVsPremium.premium.tagline}</p>
            <p className="mt-1 text-[13px] text-ivory-100/60">{formatKRW(premiumVolume.priceKRW)}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {standardVsPremium.premium.items.map((i, idx) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-ivory-100/85">
                  <Check size={13} className="mt-1 shrink-0 text-brass-500" strokeWidth={2.4} />
                  <span className={idx >= 2 ? "text-brass-500/90" : ""}>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA + 조건 안내 */}
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-relaxed text-ivory-100/45">
            Premium Bonus Package는 200페이지 이상 대상 교재에 한해 제공됩니다.
          </p>
          <Link
            href="/books"
            className="group inline-flex shrink-0 items-center gap-2 border border-brass-500/50 px-6 py-3.5 text-[13.5px] font-medium text-brass-500 transition-colors hover:bg-brass-500 hover:text-navy-950"
          >
            200P+ 대상 교재 보기
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
