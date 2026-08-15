import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

// 메인페이지 하단 — 마지막 구매 유도 Editorial CTA.

export default function PremiumFinalCTA() {
  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <p className="font-display text-[26px] font-semibold leading-[1.18] tracking-tight sm:text-[38px]">
          200P IS NOT JUST MORE PAGES.
          <br />
          <span className="text-brass-500">IT&apos;S A MORE COMPLETE WAY TO PREPARE.</span>
        </p>

        <p className="mx-auto mt-7 max-w-xl text-[14.5px] leading-relaxed text-ivory-100/70">
          충분한 연습, 체계적인 Review, 실전 테스트, 취약영역 확인, 마지막 Final Prep까지.
          <br className="hidden sm:block" /> Blossom Books 200P+ Premium Edition으로 준비 과정을 완성하세요.
        </p>

        <p className="mt-6 font-label text-[10.5px] uppercase tracking-[0.18em] text-brass-500/85">
          One Purchase. Complete Preparation.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/books?premium=1"
            className="group inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14px] font-medium text-navy-950 transition-all hover:-translate-y-0.5"
          >
            200P+ Premium 교재 보기
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/find"
            className="inline-flex items-center gap-2 border border-ivory-100/30 px-6 py-3.5 text-[13.5px] font-medium text-ivory-100 transition-all hover:-translate-y-0.5 hover:border-ivory-100/60"
          >
            <Sparkles size={15} /> 내게 맞는 교재 추천받기
          </Link>
        </div>
      </div>
    </section>
  );
}
