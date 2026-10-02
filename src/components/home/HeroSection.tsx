"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileSearch, ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// 첫 화면은 가격을 노출하지 않습니다. 목적은 "여기서 내 아이에게 맞는 교재를 찾을 수 있겠다"는 확신.
// 각 시험 칩 → /books 검색으로 연결 (해당 교재가 없으면 주문제작 안내로 이어집니다)
// 첫 화면에는 실제 교재가 바로 붙는 항목만 노출하고, 나머지(GRE·LSAT 등)는
// "전체 시험 보기"로 펼쳐서 봅니다 — LSAT·GRE를 CAT4·MAP과 나란히 두지 않습니다.
const primaryAssessments: { label: string; href: string }[] = [
  { label: "학원 레벨테스트", href: "/books?track=level-test" },
  { label: "SR TEST", href: "/books?q=SR" },
  { label: "MAP Growth", href: "/books?q=MAP" },
  { label: "CAT4", href: "/books?q=CAT4" },
  { label: "ISEE", href: "/books?q=ISEE" },
  { label: "SSAT", href: "/books?q=SSAT" },
  { label: "미국교과", href: "/books?track=us-curriculum" },
];

const moreAssessments: { label: string; href: string }[] = [
  { label: "영어 내신 대비 (G5–7)", href: "/books?q=Grammar" },
  { label: "사고력수학 레벨테스트", href: "/books?q=%EC%82%AC%EA%B3%A0%EB%A0%A5" },
  { label: "국어 문해력 레벨테스트", href: "/books?q=%EB%AC%B8%ED%95%B4%EB%A0%A5" },
  { label: "NGRT", href: "/books?q=NGRT" },
  { label: "WIDA", href: "/books?q=WIDA" },
  { label: "UKiset", href: "/books?q=UKiset" },
  { label: "ISEB", href: "/books?q=ISEB" },
  { label: "SAT", href: "/books?q=SAT" },
  { label: "AP", href: "/books?track=ap" },
  { label: "International School Placement", href: "/books?track=admissions" },
  { label: "GRE", href: "/books?q=GRE" },
  { label: "LSAT", href: "/books?q=LSAT" },
];

const subjects = ["English", "Reading", "Writing", "Vocabulary", "Grammar", "Math", "Science"];

export default function HeroSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="paper-rule relative overflow-hidden border-b border-navy-800/12 bg-ivory-100">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-16 pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-24 lg:pt-20">
        {/* 좌측 텍스트 */}
        <div>
          <span className="inline-flex items-center gap-2 border border-navy-800/20 px-3.5 py-1.5 font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-800">
            International Assessment &amp; Academic Prep
          </span>

          <h1 className="mt-6 max-w-xl text-[14.5px] font-medium leading-[1.75] text-navy-900">
            CAT4 · MAP · ISEE · SSAT · 학원 레벨테스트 · 미국교과
          </h1>
          <p className="mt-3 max-w-xl text-[14.5px] leading-[1.9] text-charcoal-600">
            문제 + 정답 + 한국어 상세해설 · Digital PDF
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
              실제 문항 샘플 보기
            </Link>
          </div>
        </div>

        {/* 우측 — 표지 + 펼친 문제 페이지 플랫레이 */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_46%,rgba(173,138,78,0.14),transparent_62%)]" />
          <div className="relative overflow-hidden border border-navy-800/12 shadow-lift">
            <img
              src="/images/marketing/hero-flatlay.jpg"
              alt="Blossom Books 교재 표지와 펼친 문제 페이지, 정답 PDF"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 대비 가능한 시험 · 과목 — 첫 화면에서 "무엇을 다루는지" 즉시 이해 */}
      <div className="border-t border-navy-800/12 bg-ivory-200/40">
        <div className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
          <p className="font-label text-[10.5px] uppercase tracking-[0.16em] text-navy-800/55">
            Assessments we prepare for
          </p>
          <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
            {primaryAssessments.map((x) => (
              <Link
                key={x.label}
                href={x.href}
                className="border border-navy-800/15 bg-ivory-100 px-2.5 py-1 font-label text-[11.5px] tracking-wide text-navy-800 transition-colors hover:border-brass-500/60 hover:text-navy-900"
              >
                {x.label}
              </Link>
            ))}
            {showAll &&
              moreAssessments.map((x) => (
                <Link
                  key={x.label}
                  href={x.href}
                  className="border border-navy-800/15 bg-ivory-100 px-2.5 py-1 font-label text-[11.5px] tracking-wide text-navy-800 transition-colors hover:border-brass-500/60 hover:text-navy-900"
                >
                  {x.label}
                </Link>
              ))}
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-1 px-2.5 py-1 font-label text-[11.5px] tracking-wide text-navy-800/60 transition-colors hover:text-navy-900"
            >
              {showAll ? "접기" : "전체 시험 보기"}
              <ChevronDown size={12} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
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
