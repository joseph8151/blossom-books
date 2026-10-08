import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-navy-800/10 bg-ivory-100">
      {/* 은은한 배경 악센트 — 평면적인 느낌을 덜어내기 위한 장식용 그라디언트, 콘텐츠와 겹치지 않도록 pointer-events-none */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#5f6f52]/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-[-8%] h-[380px] w-[380px] rounded-full bg-brass-500/[0.08] blur-3xl"
      />
      <div className="relative mx-auto max-w-[1040px] px-5 py-20 text-center sm:px-8 sm:py-28">
        <span className="inline-flex items-center gap-2 border border-[#5f6f52]/30 bg-[#eef1e8] px-4 py-1.5 font-label text-[10.5px] uppercase tracking-[0.18em] text-[#4f5d45]">
          Admission Full Package
        </span>

        <h1 className="mx-auto mt-8 max-w-[720px] font-display text-[28px] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950 sm:text-[38px]">
          학교마다 입학시험이 다릅니다.
          <br />
          그래서 준비 자료도 달라야 합니다.
        </h1>

        <p className="mx-auto mt-6 max-w-[620px] font-display text-[17px] font-medium text-navy-900 sm:text-[19px]">
          Blossom Books Admission Full Package
        </p>

        <p className="mx-auto mt-5 max-w-[640px] text-[14.5px] leading-[1.95] text-charcoal-600">
          지원 학교 · 지원 학년 · 현재 영어/수학 수준에 맞춰{" "}
          <span className="sm:block">Reading, Writing, Math, Vocabulary, Interview, Mock Test를</span>{" "}
          <span className="sm:block">학교별로 맞춤 구성합니다.</span>
        </p>

        <div className="mx-auto mt-10 flex max-w-[480px] flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="#consult"
            className="inline-flex w-full items-center justify-center gap-2 bg-navy-950 px-7 py-4 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-900 sm:w-auto"
          >
            학교별 패키지 상담하기
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#schools"
            className="inline-flex w-full items-center justify-center gap-2 border border-navy-800/25 bg-transparent px-7 py-4 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50 sm:w-auto"
          >
            <Search size={16} />
            지원 학교 찾기
          </Link>
        </div>
      </div>
    </section>
  );
}
