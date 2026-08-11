import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SkillCards from "@/components/common/SkillCards";

export default function LevelAssessment() {
  return (
    <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* 헤드 */}
        <div className="max-w-3xl">
          <span className="eyebrow">Level Assessment Workbooks</span>
          <h2 className="mt-4 font-display text-[27px] font-semibold leading-[1.22] text-navy-950 sm:text-[33px]">
            입학 및 레벨 진단을 준비하고 있다면
            <br />
            현재 수준에 맞는 연습부터 시작하세요.
          </h2>
          <p className="mt-6 max-w-2xl text-[14.5px] leading-[1.9] text-charcoal-600">
            학생의 학년과 현재 Reading Level, SR 수준을 기준으로 구성된 Blossom Books 자체 제작 학습
            교재입니다. Reading · Vocabulary · Grammar · Writing 4개 영역을 한 권에서 균형 있게, 또는
            필요한 영역만 골라 집중적으로 연습할 수 있습니다.
          </p>
        </div>

        {/* 핵심 문장 */}
        <p className="mt-9 border-l-2 border-brass-500 pl-5 font-display text-[19px] font-medium italic text-navy-900 sm:text-[22px]">
          “학년이 같다고 실력까지 같은 것은 아닙니다.”
        </p>

        {/* 4개 영역 카드 */}
        <div className="mt-10">
          <SkillCards />
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/level-assessment"
            className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
          >
            레벨 진단 교재 자세히 보기
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/books?track=level-test"
            className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
          >
            학년별 교재 찾기
          </Link>
          <span className="text-[13px] text-charcoal-600">
            학년 · Reading Level(SR)로 선택하는 방법은{" "}
            <Link href="/level-assessment" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4">
              레벨 진단 페이지
            </Link>
            에서 안내합니다.
          </span>
        </div>
      </div>
    </section>
  );
}
