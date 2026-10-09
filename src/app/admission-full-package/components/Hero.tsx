import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { subBrand, heroCardExample } from "../data";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";

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
        className="pointer-events-none absolute -bottom-32 left-[-8%] h-[380px] w-[380px] rounded-full bg-[#4a6fa5]/[0.06] blur-3xl"
      />
      <div className="relative mx-auto grid max-w-[1120px] items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        {/* 좌측 텍스트 */}
        <div className="text-center lg:text-left">
          <span className="font-label text-[11px] uppercase tracking-[0.2em] text-charcoal-600/70">
            {subBrand.name.toUpperCase()} · {subBrand.parent.toUpperCase()}
          </span>

          <h1 className="mx-auto mt-5 max-w-[560px] font-display text-[28px] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-950 sm:text-[36px] lg:mx-0">
            학교마다 입학시험이 다릅니다.
            <br />
            준비 자료도 달라야 합니다.
          </h1>

          <p className="mx-auto mt-5 max-w-[520px] text-[14.5px] leading-[1.9] text-charcoal-600 lg:mx-0">
            지원 학교 · 학년 · 현재 수준을 확인한 뒤 Reading, Math, Writing, Interview, Mock Test를 하나의
            Admission Plan으로 구성합니다.
          </p>

          <div className="mx-auto mt-9 flex max-w-[480px] flex-col items-center gap-3 sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
            <Link
              href="#schools"
              className="inline-flex w-full items-center justify-center gap-2 bg-navy-950 px-7 py-4 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-900 sm:w-auto"
            >
              지원 학교로 준비 범위 확인
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#consult"
              className="inline-flex w-full items-center justify-center gap-2 border border-navy-800/25 bg-transparent px-7 py-4 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50 sm:w-auto"
            >
              Admission Package 상담
            </Link>
          </div>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5f6f52] underline decoration-[#5f6f52]/40 decoration-2 underline-offset-4 transition-colors hover:text-[#4f5d45]"
          >
            <MessageCircle size={14} />
            카카오톡으로 빠르게 문의하기
          </a>
        </div>

        {/* 우측 — Admission Card 예시 + 교재 표지 소품 (문제집이 주인공이 아니라
            입학 준비 설계가 주인공이 되도록, 문제집은 뒤로 살짝 겹쳐 둡니다) */}
        <div className="relative mx-auto w-full max-w-[380px]">
          <BookCoverMockup
            eyebrow="Student Workbook"
            title="Reading"
            subtitle="Admission Workbook"
            tone="navy"
            size="sm"
            rotate="-rotate-6"
            className="absolute -left-4 top-6 max-w-[110px] opacity-90"
          />
          <BookCoverMockup
            eyebrow="Student Workbook"
            title="Math"
            subtitle="Admission Workbook"
            tone="ivory"
            size="sm"
            rotate="rotate-3"
            className="absolute -right-3 top-14 max-w-[110px] opacity-90"
          />

          <div className="relative border border-navy-800/15 bg-white p-7 shadow-lift">
            <p className="font-label text-[9.5px] uppercase tracking-[0.16em] text-charcoal-600/60">
              Admission Card · Example
            </p>
            <p className="mt-3 font-display text-[22px] font-semibold text-navy-950">{heroCardExample.school}</p>
            <p className="mt-0.5 text-[12.5px] text-charcoal-600">{heroCardExample.subtitle}</p>

            <div className="mt-5 divide-y divide-navy-800/8 border-y border-navy-800/10">
              {heroCardExample.rows.map((r) => (
                <div key={r.area} className="flex items-center justify-between py-2.5 text-[13px]">
                  <span className="text-charcoal-600">{r.area}</span>
                  <span className="font-medium text-navy-900">{r.level}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-[#5f6f52]/25 bg-[#eef1e8]/50 px-4 py-3">
              <p className="font-label text-[9.5px] uppercase tracking-[0.12em] text-[#5f6f52]">Recommended</p>
              <p className="mt-1 text-[13px] font-medium text-navy-950">{heroCardExample.recommended}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
