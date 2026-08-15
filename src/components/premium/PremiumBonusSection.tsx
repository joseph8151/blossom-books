import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { premiumBonuses, standardVsPremium, PREMIUM_BONUS_COUNT } from "@/data/premiumBonus";
import { premiumVolume, volumeByPages, formatKRW } from "@/data/pricing";

// 200P+ Premium Bonus Package — 메인페이지 상세 섹션.
// 넘버링 + 큰 영문 타이포로 학술 출판물 느낌을 내고, 둥근 카드·그라데이션은 쓰지 않습니다.
// 모바일에서는 7장이 세로로 길게 늘어지지 않도록 가로 스와이프로 전환합니다.

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
          <h2 className="mt-4 font-display text-[28px] font-semibold leading-[1.15] tracking-tight sm:text-[38px]">
            MORE THAN 200 PAGES.
            <br />
            <span className="text-brass-500">A COMPLETE PREP SYSTEM.</span>
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-ivory-100/75">
            충분한 문제풀이부터 시험 직전 Final Review까지. 한 권을 구입하면 학습에 필요한 보조자료까지
            함께 시작됩니다.
          </p>
        </div>

        {/* 혜택 7종 — 모바일 가로 스와이프 / 데스크톱 그리드 */}
        <div className="mt-12 -mx-5 flex snap-x snap-mandatory gap-px overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {premiumBonuses.map((b) => (
            <article
              key={b.key}
              className="flex w-[78vw] shrink-0 snap-start flex-col border border-ivory-100/12 bg-ivory-100/[0.03] p-6 transition-colors hover:border-brass-500/40 sm:w-auto"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-ivory-100/12 pb-3">
                <span className="font-display text-[26px] font-semibold leading-none text-brass-500/85">{b.no}</span>
                <span className="font-label text-[8px] uppercase tracking-[0.14em] text-ivory-100/40">Included</span>
              </div>
              <h3 className="mt-4 font-label text-[13.5px] uppercase leading-tight tracking-[0.09em] text-ivory-100">
                {b.en}
              </h3>
              <p className="mt-1.5 text-[12.5px] font-medium text-brass-500/90">{b.ko}</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-ivory-100/60">{b.description}</p>
            </article>
          ))}

          {/* ALL INCLUDED — 8번째 칸을 마무리 카드로 사용 */}
          <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center border border-brass-500/40 bg-brass-500/[0.07] p-6 sm:w-auto">
            <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500/80">
              200P+ Premium Edition
            </p>
            <p className="mt-2 font-display text-[30px] font-semibold leading-none tracking-tight text-brass-500">
              ALL
              <br />
              INCLUDED
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ivory-100/70">
              {PREMIUM_BONUS_COUNT}종 전부 200P+ 구성에 포함되어 있습니다. 별도 구매 항목이 아닙니다.
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-ivory-100/40 sm:hidden">← 옆으로 넘겨 {PREMIUM_BONUS_COUNT}가지 혜택을 모두 확인하세요</p>

        {/* WHY 200P+ */}
        <div className="mt-16 grid gap-8 border-t border-ivory-100/15 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Why 200P+?</span>
            <p className="mt-5 font-display text-[22px] font-semibold leading-[1.2] tracking-tight sm:text-[28px]">
              PRACTICE MORE.
              <br />
              UNDERSTAND MORE.
              <br />
              <span className="text-brass-500">PREPARE BETTER.</span>
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[15px] font-medium leading-relaxed text-ivory-100/90">
              200페이지는 단순히 두꺼운 문제집을 의미하지 않습니다.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-ivory-100/65">
              충분한 유형 반복, 다양한 난이도의 문제, 취약영역 확인, 실전 연습, 그리고 시험 직전 Review까지.
              하나의 학습 과정이 완성될 수 있도록 설계된 Blossom Books의 Premium Edition입니다.
            </p>
          </div>
        </div>

        {/* STANDARD 100P vs PREMIUM 200P+ */}
        <div className="mt-14 grid gap-px border border-ivory-100/12 bg-ivory-100/12 lg:grid-cols-2">
          <div className="bg-navy-950 p-7 lg:p-9">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-ivory-100/50">
              {standardVsPremium.standard.label}
            </p>
            <p className="mt-2 font-display text-[19px] font-semibold text-ivory-100/85">
              {standardVsPremium.standard.tagline}
            </p>
            {hundred && <p className="mt-1 text-[13px] text-ivory-100/45">{formatKRW(hundred.priceKRW)}</p>}
            <ul className="mt-5 space-y-2">
              {standardVsPremium.standard.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-ivory-100/60">
                  <Check size={13} className="mt-1 shrink-0 text-ivory-100/35" strokeWidth={2.2} />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-ivory-100/12 pt-4">
              <p className="font-label text-[9px] uppercase tracking-[0.12em] text-ivory-100/40">적합 대상</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory-100/55">
                {standardVsPremium.standard.forWhom.join(" · ")}
              </p>
            </div>
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
            <div className="mt-5 border-t border-ivory-100/15 pt-4">
              <p className="font-label text-[9px] uppercase tracking-[0.12em] text-brass-500/70">적합 대상</p>
              <ul className="mt-1.5 space-y-1">
                {standardVsPremium.premium.forWhom.map((f) => (
                  <li key={f} className="text-[12.5px] leading-relaxed text-ivory-100/70">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 조건 안내 + CTA */}
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-relaxed text-ivory-100/45">
            Premium Bonus Package는 200페이지 이상 대상 교재에 한해 제공됩니다.
          </p>
          <Link
            href="/books?premium=1"
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
