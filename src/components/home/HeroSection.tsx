"use client";

import Link from "next/link";
import { ArrowRight, Check, GraduationCap, FileSearch } from "lucide-react";
import { BookCoverMockup } from "./BookCoverMockup";
import { fromPriceKRW, formatKRW } from "@/data/pricing";
import { trackEvent } from "@/lib/analytics";

// 첫 화면은 가격을 노출하지 않습니다. 목적은 "여기서 내 아이에게 맞는 교재를 찾을 수 있겠다"는 확신.
// 각 시험 칩 → /books 검색으로 연결 (해당 교재가 없으면 주문제작 안내로 이어집니다)
const assessments: { label: string; href: string }[] = [
  { label: "영어학원 레벨테스트", href: "/books?track=level-test" },
  { label: "사고력수학 레벨테스트", href: "/books?q=%EC%82%AC%EA%B3%A0%EB%A0%A5" },
  { label: "MAP Growth", href: "/books?q=MAP" },
  { label: "CAT4", href: "/books?q=CAT4" },
  { label: "NGRT", href: "/books?q=NGRT" },
  { label: "WIDA", href: "/books?q=WIDA" },
  { label: "SSAT", href: "/books?q=SSAT" },
  { label: "ISEE", href: "/books?q=ISEE" },
  { label: "UKiset", href: "/books?q=UKiset" },
  { label: "ISEB", href: "/books?q=ISEB" },
  { label: "SAT", href: "/books?q=SAT" },
  { label: "AP", href: "/books?track=ap" },
  { label: "GRE", href: "/books?q=GRE" },
  { label: "LSAT", href: "/books?q=LSAT" },
  { label: "International School Placement", href: "/books?track=admissions" },
];

const subjects = ["English", "Reading", "Writing", "Vocabulary", "Grammar", "Math", "Science"];

export default function HeroSection() {
  return (
    <section className="paper-rule relative overflow-hidden border-b border-navy-800/12 bg-ivory-100">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-16 pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-24 lg:pt-20">
        {/* 좌측 텍스트 */}
        <div>
          <span className="inline-flex items-center gap-2 border border-navy-800/20 px-3.5 py-1.5 font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-800">
            International Assessment &amp; Academic Prep
          </span>

          {/* 상품 중심 후킹 — 브랜드 철학보다 "무엇을 파는지"가 먼저 보이게 */}
          <p className="mt-6 font-display text-[19px] font-medium leading-snug text-charcoal-900 min-[400px]:text-[21px]">
            시험 전에, 풀어볼 문제가 부족하다면.
          </p>
          <h1 className="mt-2 font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.01em] text-navy-950 min-[400px]:text-[38px] sm:text-[46px] lg:text-[52px]">
            Blossom Books
          </h1>

          <p className="mt-5 max-w-xl text-[14.5px] font-medium leading-[1.75] text-navy-900">
            CAT4 · MAP · 학원 레벨테스트 · SAT · 미국교과 · Reading · Math
          </p>
          <p className="mt-3 max-w-xl text-[14.5px] leading-[1.9] text-charcoal-600">
            시험과 수업 목적에 맞춘 Premium Prep Workbook.
            <br />
            문제 + 정답 + 상세해설 · Digital PDF ·{" "}
            <span className="font-semibold text-navy-950">{formatKRW(fromPriceKRW)}부터</span>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/books"
              onClick={() => trackEvent("view_product_list", { location: "hero" })}
              className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              시험별 교재 찾기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#bestsellers"
              className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
            >
              <FileSearch size={16} />
              실제 문제 샘플 보기
            </Link>
          </div>

          <p className="mt-4 text-[13px] text-charcoal-600">
            어떤 교재를 선택해야 할지 모르시나요?{" "}
            <Link href="/find" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">
              내게 맞는 교재 추천받기 →
            </Link>
          </p>

          {/* 제작진 신뢰 배지 — 클릭 시 제작 방식 페이지로 */}
          <Link
            href="/our-approach"
            className="group mt-6 inline-flex items-center gap-2 border border-burgundy-700/25 bg-burgundy-700/[0.04] px-3.5 py-2 text-[13px] font-medium text-burgundy-700 transition-colors hover:border-burgundy-700/55 hover:bg-burgundy-700/[0.08]"
          >
            <GraduationCap size={16} strokeWidth={1.9} />
            미국 현지 학업 경험과 프렙 티칭 데이터를 바탕으로 설계한 교재
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* 신뢰 마이크로카피 */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-charcoal-600">
            {["정답·상세해설 포함", "구매 전 Sample 확인", "결제 확인 후 PDF 발송"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-brass-500" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 우측 교재 목업 */}
        <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center lg:h-[480px]">
          {/* 표지 뒤 은은한 브래스 광채 */}
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_46%,rgba(173,138,78,0.16),transparent_62%)]" />
          <BookCoverMockup
            eyebrow="Level Test Workbook"
            title="Level Test"
            subtitle="Reading · Vocabulary · Grammar · Writing"
            tone="pink"
            tabLabel="LT"
            className="absolute left-2 top-2 -rotate-[9deg]"
          />
          <BookCoverMockup
            eyebrow="U.S. Curriculum"
            title="Reading"
            subtitle="Grade별 학습 문제집"
            tone="ivory"
            tabLabel="US"
            className="absolute right-0 top-6 rotate-[7deg]"
          />
          <BookCoverMockup
            eyebrow="International School"
            title="Math & English"
            subtitle="국제학교 학습 콘텐츠"
            tone="navy"
            tabLabel="IS"
            className="relative z-10 -rotate-[2deg]"
          />
        </div>
      </div>

      {/* 대비 가능한 시험 · 과목 — 첫 화면에서 "무엇을 다루는지" 즉시 이해 */}
      <div className="border-t border-navy-800/12 bg-ivory-200/40">
        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
          <p className="font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-800/55">
            Assessments we prepare for
          </p>
          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
            {assessments.map((x) => (
              <Link
                key={x.label}
                href={x.href}
                className="border border-navy-800/15 bg-ivory-100 px-2.5 py-1 font-label text-[11.5px] tracking-wide text-navy-800 transition-colors hover:border-brass-500/60 hover:text-navy-900"
              >
                {x.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] text-charcoal-600">
            <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">Subjects</span>
            {subjects.map((s, i) => (
              <span key={s} className="inline-flex items-center gap-2.5">
                {i > 0 && <span className="text-navy-800/25">·</span>}
                <Link href={`/books?q=${encodeURIComponent(s)}`} className="transition-colors hover:text-navy-900 hover:underline">
                  {s}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
