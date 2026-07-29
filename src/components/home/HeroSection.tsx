import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
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

          <h1 className="mt-7 font-display text-[42px] font-semibold leading-[1.18] text-navy-950 text-balance sm:text-[52px] lg:text-[58px]">
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
              className="group inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
            >
              교재 둘러보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-navy-800/25 px-7 py-3.5 text-[14.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <MessageCircle size={16} />
              카카오톡으로 상담하기
            </a>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-navy-800/12 pt-7">
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
