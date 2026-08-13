import Link from "next/link";
import { ArrowRight, Check, GraduationCap } from "lucide-react";
import { BookCoverMockup } from "./BookCoverMockup";

// 첫 화면은 가격을 노출하지 않습니다. 목적은 "여기서 내 아이에게 맞는 교재를 찾을 수 있겠다"는 확신.
// 각 시험 칩 → /books 검색으로 연결 (해당 교재가 없으면 주문제작 안내로 이어집니다)
const assessments: { label: string; href: string }[] = [
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

          {/* 영문 포지셔닝 라인 — 브랜드가 무엇을 하는지 즉시 전달 */}
          <h1 className="mt-7 font-display text-[27px] font-semibold leading-[1.15] tracking-[-0.01em] text-navy-950 text-balance min-[400px]:text-[31px] sm:text-[38px] lg:text-[44px]">
            Assessment Prep,
            <br />
            <span className="text-brass-500">Built Around the Student.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[14.5px] font-medium leading-[1.75] text-navy-900">
            국제학교 · 레벨테스트 · 미국/영국 시험 대비
          </p>
          <p className="mt-3 max-w-xl text-[14.5px] leading-[1.9] text-charcoal-600">
            같은 시험을 준비하더라도 학생의 학년, 현재 수준, 목표 점수에 따라 필요한 문제는 달라집니다.
            Blossom Books는 시험 이름만 보고 교재를 선택하지 않습니다. 현재 수준과 준비 목적을 기준으로
            가장 적합한 학습 구성을 안내합니다.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/find"
              className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              내게 맞는 교재 찾기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
            >
              시험별 교재 보기
            </Link>
          </div>

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
            {["구매 전 무료 샘플 확인", "결제 후 PDF 즉시 발송", "전 문항 정답·상세 해설"].map((t) => (
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
