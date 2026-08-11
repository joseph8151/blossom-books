import Link from "next/link";
import { ArrowRight, Check, GraduationCap, MessageCircle, FileCheck2 } from "lucide-react";
import { siteConfig } from "@/data/site";
import SkillCards from "@/components/common/SkillCards";
import {
  srBands,
  gradeBands,
  recommendedStudents,
  differentiators,
} from "@/data/levelAssessment";

export const metadata = {
  title: "Level Assessment Workbooks — 레벨 진단 학습 교재",
  description:
    "학생의 학년과 현재 Reading Level, SR 수준을 기준으로 구성된 Blossom Books 자체 제작 학습 교재. Reading·Vocabulary·Grammar·Writing 4개 영역을 한 권에서 균형 있게 연습합니다.",
};

export default function LevelAssessmentPage() {
  return (
    <div>
      {/* 히어로 배너 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <span className="eyebrow">Level Assessment Workbooks</span>
          <h1 className="mt-4 font-display text-[30px] font-semibold leading-[1.2] text-navy-950 sm:text-[42px]">
            입학·레벨 진단을 위한
            <br />
            <span className="text-brass-500">4-영역 집중 학습</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Reading", "Vocabulary", "Grammar", "Writing"].map((s) => (
              <span
                key={s}
                className="border border-navy-800/20 bg-ivory-100 px-3.5 py-1.5 font-label text-[12px] tracking-wide text-navy-800"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-charcoal-600">
            학년과 현재 Reading Level을 기준으로 구성된 Blossom Books 자체 제작 학습 교재입니다. 학생에게
            너무 쉽거나 지나치게 어려운 문제를 반복하기보다, 현재 수준에서 필요한 내용을 단계적으로 연습할
            수 있도록 구성했습니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/books?track=level-test"
              className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              교재 둘러보기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-navy-800/25 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              <MessageCircle size={16} />
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>

      {/* 4개 영역 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 py-2 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            핵심 4개 영역을 한 권에서
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-charcoal-600">
            Reading부터 Writing까지, 필요한 4개 영역을 균형 있게. 필요한 영역만 선택해 집중적으로 연습할
            수도 있습니다.
          </p>
          <div className="mt-10">
            <SkillCards />
          </div>
        </div>
      </section>

      {/* Reading Level */}
      <section id="reading-level" className="scroll-mt-24 border-b border-navy-800/12 bg-ivory-100 py-18 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 py-2 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            Reading Level에 맞는 교재를 선택하세요
          </h2>
          <div className="mt-4 max-w-2xl space-y-3 text-[14px] leading-[1.9] text-charcoal-600">
            <p>같은 학년의 학생이라도 실제 Reading Level은 다를 수 있습니다.</p>
            <p>
              Blossom Books는 단순히 학년만을 기준으로 하지 않고, 학생의 현재 읽기 수준을 고려하여 적절한
              난이도의 지문과 문제를 구성합니다. SR 수준이나 현재 Reading Level을 알고 있다면 보다 적합한
              교재를 선택할 수 있습니다.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {srBands.map((b, i) => (
              <div
                key={b.range}
                className="border border-navy-800/12 bg-ivory-200/40 p-5"
              >
                <span className="font-label text-[10px] tracking-[0.1em] text-brass-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-display text-[18px] font-semibold text-navy-950">{b.range}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-charcoal-600">{b.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[12.5px] leading-relaxed text-charcoal-600">
            SR Level은 교재 선택을 돕기 위한 참고 기준으로 활용할 수 있습니다. 학생의 학년, 학습 경험 및
            현재 실력에 따라 적합한 난이도가 달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* 학년 기준 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-18 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 py-2 lg:px-8">
          <div className="flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
            <GraduationCap size={15} /> Grade-Level Workbooks
          </div>
          <h2 className="mt-3 font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            학년으로 교재 찾기
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-charcoal-600">
            학생의 현재 학년을 기준으로 교재를 찾을 수 있습니다. 정확한 난이도는 학년과 Reading Level을 함께
            고려하여 상담으로 안내해 드립니다.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gradeBands.map((g) => (
              <Link
                key={g}
                href="/books?track=level-test"
                className="lift group flex items-center justify-between border border-navy-800/12 bg-ivory-100 px-5 py-4 shadow-card transition-colors hover:border-brass-500/50"
              >
                <span className="font-display text-[16px] font-semibold text-navy-950">{g}</span>
                <ArrowRight size={16} className="text-brass-500 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 이런 학생에게 추천 */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-18 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 py-2 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            이런 학생에게 추천합니다
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {recommendedStudents.map((r) => (
              <div key={r} className="flex items-start gap-3 border border-navy-800/12 bg-ivory-200/40 p-4">
                <Check size={16} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                <span className="text-[13.5px] leading-relaxed text-charcoal-900">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 차별점 */}
      <section className="border-b border-navy-800/12 bg-navy-950 py-18 text-ivory-100 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 py-2 lg:px-8">
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">
            Why it&apos;s different
          </span>
          <h2 className="mt-4 font-display text-[25px] font-semibold sm:text-[30px]">
            단순한 문제 모음이 아닙니다
          </h2>
          <p className="mt-4 max-w-2xl text-[14px] leading-[1.9] text-ivory-200/80">
            Blossom Books의 Level Assessment Workbook은 문제 수를 늘리는 것보다, 학생이 어떤 능력을
            연습해야 하는지를 먼저 고려합니다.
          </p>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div key={d.n} className="border-t border-ivory-100/20 pt-5">
                <span className="font-label text-[12px] tracking-[0.1em] text-brass-400">{d.n}</span>
                <p className="mt-2 font-display text-[19px] font-semibold text-ivory-100">{d.en}</p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ivory-200/75">{d.ko}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 맞춤 제작 */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-18 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 py-2 lg:px-8">
          <h2 className="font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            필요한 수준의 교재가 없다면
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-[1.9] text-charcoal-600">
            학생마다 필요한 난이도와 학습 범위가 다를 수 있습니다. 현재 판매 중인 교재에서 적합한 구성이
            없는 경우, 학년·Reading Level·필요한 영역 및 분량을 기준으로 새로운 교재 제작이 가능합니다.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { k: "Grade", v: "학년" },
                { k: "Reading Level / SR", v: "현재 읽기 수준" },
                { k: "Skills", v: "Reading · Vocabulary · Grammar · Writing" },
                { k: "Difficulty", v: "기초 ~ 응용" },
                { k: "Page Length", v: "40P / 60P / 100P / 200P" },
                { k: "Answer Guide", v: "상세 해설 포함" },
              ].map((o) => (
                <div key={o.k} className="border border-navy-800/12 bg-ivory-100 p-4">
                  <p className="font-label text-[10.5px] uppercase tracking-[0.1em] text-brass-500">{o.k}</p>
                  <p className="mt-1.5 text-[13px] text-charcoal-900">{o.v}</p>
                </div>
              ))}
            </div>

            <div className="border border-navy-800/15 bg-navy-950 p-7 text-ivory-100">
              <FileCheck2 size={22} className="text-brass-400" strokeWidth={1.8} />
              <p className="mt-4 font-display text-[19px] font-semibold">교재 제작 문의</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ivory-200/80">
                학년, Reading Level, 필요한 영역과 분량을 알려주시면 목적에 맞는 교재를 설계해 드립니다.
              </p>
              <Link
                href="/custom-order"
                className="mt-5 inline-flex items-center gap-2 bg-brass-500 px-6 py-3 text-[13.5px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
              >
                교재 제작 문의
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 마무리 CTA */}
      <section className="bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
          <p className="font-display text-[20px] font-medium italic text-navy-900 sm:text-[24px]">
            “학생의 현재 수준에서 시작하는 학습.”
          </p>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-charcoal-600">
            Grade + Reading Level + Skill을 기준으로 교재를 선택하세요. Reading부터 Writing까지, 필요한 4개
            영역을 한 권에서 연습할 수 있습니다.
          </p>
          <Link
            href="/books?track=level-test"
            className="mt-8 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            레벨 진단 교재 둘러보기
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
