import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SkillCards from "@/components/common/SkillCards";

export default function LevelAssessment() {
  return (
    <section className="paper-rule border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* 헤드 */}
        <div className="max-w-3xl">
          <span className="eyebrow">Level Test Workbooks</span>
          <h2 className="mt-4 font-display text-[27px] font-semibold leading-[1.22] text-navy-950 sm:text-[33px]">
            입학 및 레벨 진단을 준비하고 있나요?
          </h2>
          <p className="mt-6 max-w-2xl text-[14.5px] leading-[1.9] text-charcoal-600">
            Blossom Books는 학생의 현재 학년과 Reading Level을 기준으로 Reading, Vocabulary, Grammar,
            Writing 4개 영역을 체계적으로 연습할 수 있는 자체 제작 문제집을 제공합니다. 특정 기관의 문제를
            복제하는 것이 아니라, 다양한 레벨 진단에서 요구되는 핵심 영어 능력을 중심으로 구성합니다.
          </p>
        </div>

        {/* 4개 영역 카드 */}
        <div className="mt-10">
          <SkillCards />
        </div>

        {/* 하단 안내 + CTA */}
        <div className="mt-10 flex flex-col gap-5 border-t border-navy-800/12 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
              Available by Grade &amp; Reading Level
            </p>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-charcoal-600">
              SR / Reading Level을 알고 있는 경우 해당 수준을 참고하여 교재를 선택할 수 있습니다. 학년별,
              4영역 레벨테스트 문제집으로 제공됩니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/books?track=level-test"
              className="group inline-flex shrink-0 items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              레벨테스트 문제집 찾기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/level-assessment"
              className="inline-flex shrink-0 items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
