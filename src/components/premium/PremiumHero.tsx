import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

// 메인페이지 중상단 — 200P+ 를 별도 등급의 대표 상품군으로 처음 소개하는 섹션.
// 아래쪽 PremiumBonusSection 이 혜택 7종을 자세히 다루므로 여기서는 메시지에 집중합니다.

export default function PremiumHero() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/45 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">
              Blossom Books Premium
            </span>
            <p className="mt-5 font-display text-[27px] font-semibold leading-[1.15] tracking-tight text-navy-950 sm:text-[36px]">
              200P+ COMPLETE PREP PACKAGE
            </p>
            <h2 className="mt-4 font-display text-[22px] font-semibold leading-snug text-navy-950 sm:text-[26px]">
              한 권을 선택하면,
              <br />
              문제집 이상의 준비가 시작됩니다.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-charcoal-600">
              200페이지 이상의 충분한 문제풀이와 함께 복습, 추가 실전 연습, 모의고사, Final Review,
              학습 계획과 취약영역 관리까지. Blossom Books의 가장 완성도 높은 학습 패키지입니다.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/books?premium=1"
                className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
              >
                200P+ Premium 교재 보기
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/find"
                className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3.5 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
              >
                <Sparkles size={15} /> 내게 맞는 교재 추천받기
              </Link>
            </div>
          </div>

          {/* 강조 문구 */}
          <div className="flex items-center">
            <div className="border-l-2 border-brass-500 py-1 pl-6">
              <p className="font-display text-[17px] font-semibold leading-snug text-navy-950 sm:text-[19px]">
                200P를 선택하는 이유는
                <br />
                단순히 문제가 더 많기 때문이 아닙니다.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-charcoal-600">
                시험 준비의 처음부터 마지막까지 필요한
                <br className="hidden sm:block" /> Premium Bonus Materials가 함께 제공되기 때문입니다.
              </p>
              <p className="mt-6 font-label text-[11px] uppercase leading-relaxed tracking-[0.16em] text-brass-500">
                Practice. Review. Test.
                <br />
                Diagnose. Improve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
