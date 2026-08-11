import Link from "next/link";
import { ArrowRight, GraduationCap, LineChart } from "lucide-react";
import SkillCards from "@/components/common/SkillCards";
import { srBands, gradeBands } from "@/data/levelAssessment";

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
            Blossom Books는 영어 교육기관, 학교 및 다양한 교육과정에서 진행되는 입학 평가와 레벨 진단을
            준비하는 학생을 위한 학습 교재를 제공합니다. 특정 기관의 문제를 그대로 재현하는 방식이 아니라,
            학생의 학년과 현재 Reading Level, SR 수준, 학습 단계 등을 기준으로 필요한 영역을 체계적으로
            연습할 수 있도록 자체 제작합니다.
          </p>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.9] text-charcoal-600">
            Reading · Vocabulary · Grammar · Writing의 핵심 4개 영역을 한 권에서 균형 있게 학습하거나,
            필요한 영역만 선택하여 집중적으로 연습할 수 있습니다.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/level-assessment"
              className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              레벨 진단 교재 보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/books?track=level-test"
              className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
            >
              학년별 교재 찾기
            </Link>
          </div>
        </div>

        {/* 핵심 문장 */}
        <p className="mt-12 border-l-2 border-brass-500 pl-5 font-display text-[19px] font-medium italic text-navy-900 sm:text-[22px]">
          “학년이 같다고 실력까지 같은 것은 아닙니다.”
        </p>

        {/* 4개 영역 카드 */}
        <div className="mt-10">
          <SkillCards />
        </div>

        {/* 학년 + Reading Level 선택 안내 */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* 학년 */}
          <div className="border border-navy-800/12 bg-ivory-200/50 p-6 lg:p-7">
            <div className="flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
              <GraduationCap size={15} /> Grade-Level
            </div>
            <p className="mt-2 font-display text-[18px] font-semibold text-navy-950">학년으로 찾기</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {gradeBands.map((g) => (
                <Link
                  key={g}
                  href="/books?track=level-test"
                  className="border border-navy-800/20 bg-ivory-100 px-3 py-1.5 text-[12.5px] text-navy-800 transition-colors hover:border-brass-500/60 hover:text-navy-900"
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>

          {/* Reading Level */}
          <div className="border border-navy-800/12 bg-ivory-200/50 p-6 lg:p-7">
            <div className="flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
              <LineChart size={15} /> Reading Level
            </div>
            <p className="mt-2 font-display text-[18px] font-semibold text-navy-950">Reading Level로 찾기</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {srBands.map((b) => (
                <Link
                  key={b.range}
                  href="/level-assessment#reading-level"
                  className="border border-navy-800/20 bg-ivory-100 px-3 py-1.5 text-[12.5px] text-navy-800 transition-colors hover:border-brass-500/60 hover:text-navy-900"
                >
                  {b.range}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center font-display text-[16px] text-charcoal-600 sm:text-[17px]">
          Grade + Reading Level + Skill을 기준으로, 학생의 현재 수준에서 시작하는 학습.
        </p>
      </div>
    </section>
  );
}
