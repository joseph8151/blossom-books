import Link from "next/link";
import { ArrowRight, Check, GraduationCap, FileSearch } from "lucide-react";
import { siteConfig } from "@/data/site";
import { BookCoverMockup } from "./BookCoverMockup";

export default function HeroSection() {
  return (
    <section className="paper-rule relative overflow-hidden border-b border-navy-800/12 bg-ivory-100">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        {/* 좌측 텍스트 */}
        <div>
          <span className="inline-flex items-center gap-2 border border-navy-800/20 px-3.5 py-1.5 font-label text-[11px] uppercase tracking-[0.16em] text-navy-800">
            Premium Test Prep Workbooks
          </span>

          {/* 좁은 화면(≤375px)에서 제목이 넘치지 않도록 기본값을 낮추고 단계적으로 키웁니다. */}
          <h1 className="mt-7 font-body text-[23px] font-bold leading-[1.32] tracking-[-0.02em] text-navy-950 text-balance min-[400px]:text-[26px] sm:text-[31px] lg:text-[35px]">
            학생의 학년만 보지 않습니다.
            <br />
            <span className="text-brass-500">현재 수준과 목표 시험을 함께 봅니다.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15.5px] leading-[1.85] text-charcoal-600">
            국제학교 · 미국 교육과정 · SAT · AP · 학원 및 학교 입학 레벨테스트까지. 학생의 목표와 현재
            수준에 맞춰 설계된 전문 Prep 콘텐츠를 만나보세요.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/books"
              className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              교재 찾기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
            >
              <FileSearch size={16} />
              무료 샘플 보기
            </Link>
          </div>

          {/* 제작진 신뢰 배지 */}
          <p className="mt-6 inline-flex items-center gap-2 border border-burgundy-700/25 bg-burgundy-700/[0.04] px-3.5 py-2 text-[13px] font-medium text-burgundy-700">
            <GraduationCap size={16} strokeWidth={1.9} />
            미국 명문대·프랩 출신 선생님들이 만든 교재
          </p>

          {/* 신뢰 마이크로카피 */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-charcoal-600">
            {["구매 전 무료 샘플 확인", "결제 후 PDF 즉시 발송", "전 문항 정답·상세 해설"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-brass-500" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>

          {/* 핵심 분야 — 브랜드 포지셔닝 */}
          <div className="mt-12 border-t border-navy-800/12 pt-7">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-navy-800/55">
              핵심 분야
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {[
                "Level Tests",
                "International Education",
                "U.S. Curriculum",
                "Academic Workbooks",
                "Custom Materials",
              ].map((x) => (
                <span
                  key={x}
                  className="border border-navy-800/20 bg-ivory-100 px-3 py-1.5 font-label text-[12px] tracking-wide text-navy-800 transition-colors hover:border-brass-500/60 hover:text-navy-900"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 우측 교재 목업 */}
        <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center lg:h-[480px]">
          {/* 표지 뒤 은은한 브래스 광채 */}
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_46%,rgba(173,138,78,0.18),transparent_62%)]" />
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
    </section>
  );
}
