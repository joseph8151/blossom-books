import Link from "next/link";
import { MessageCircle, ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/data/site";
import { BookCoverMockup } from "./BookCoverMockup";

export default function HeroSection() {
  return (
    <section className="paper-rule relative overflow-hidden border-b border-navy-800/12 bg-ivory-100">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-24">
        {/* 좌측 텍스트 */}
        <div>
          <span className="inline-flex items-center gap-2 border border-navy-800/20 px-3.5 py-1.5 font-label text-[11px] uppercase tracking-[0.16em] text-navy-800">
            Educational Content Studio
          </span>

          {/* 좁은 화면(≤375px)에서 제목이 넘치지 않도록 기본값을 낮추고 단계적으로 키웁니다. */}
          <h1 className="mt-7 font-display text-[32px] font-semibold leading-[1.18] text-navy-950 text-balance min-[400px]:text-[40px] sm:text-[52px] lg:text-[58px]">
            시험과 수업의 목적에 맞춘
            <br />
            <span className="italic text-burgundy-700">프리미엄 교육 콘텐츠</span>
          </h1>

          <p className="mt-7 max-w-xl text-[16.5px] leading-relaxed text-charcoal-600">
            미국 교과과정, 국제학교 입학시험, 공인시험, 실전 모의고사를 분석하여
            학생용 문제집과 정답·상세 해설집을 제작합니다. 기존 교재는 바로
            구매할 수 있으며, 필요한 교재가 없는 경우 별도 제작도 가능합니다.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/books"
              className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              교재 둘러보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
            >
              <MessageCircle size={16} />
              카카오톡으로 상담하기
            </a>
          </div>

          {/* 신뢰 마이크로카피 */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-charcoal-600">
            {["구매 전 무료 샘플 확인", "결제 후 PDF 즉시 발송", "전 문항 정답·상세 해설"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-brass-500" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-navy-800/12 pt-7 sm:gap-6">
            {[
              ["12+", "교육과정·시험 트랙"],
              ["문제집 + 해설집", "모든 교재 기본 구성"],
              ["기존 교재 · 주문 제작", "두 가지 이용 방식"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-[19px] font-semibold text-navy-900">{value}</dt>
                <dd className="mt-1 text-[12px] leading-snug text-charcoal-600">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 우측 교재 목업 */}
        <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center lg:h-[480px]">
          {/* 표지 뒤 은은한 브래스 광채 */}
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_46%,rgba(173,138,78,0.18),transparent_62%)]" />
          <BookCoverMockup
            eyebrow="Practice Test Series"
            title="Mock Exam"
            subtitle="실전 모의고사 2회분"
            tone="ivory"
            tabLabel="03"
            className="absolute left-2 top-2 -rotate-[9deg]"
          />
          <BookCoverMockup
            eyebrow="Answer Key"
            title="Explanations"
            subtitle="정답 및 상세 해설집"
            tone="ivory"
            tabLabel="02"
            className="absolute right-0 top-6 rotate-[7deg]"
          />
          <BookCoverMockup
            eyebrow="Student Workbook"
            title="Algebra 1"
            subtitle="미국 교과과정 · 12개 단원"
            tone="navy"
            tabLabel="01"
            className="relative z-10 -rotate-[2deg]"
          />
        </div>
      </div>
    </section>
  );
}
