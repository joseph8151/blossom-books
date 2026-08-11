import Link from "next/link";
import { ArrowRight, ShieldCheck, Layers3, ClipboardCheck, SearchCheck, Target } from "lucide-react";
import { differentiators } from "@/data/levelAssessment";
import { BLOSSOM_LEVELS, BLOSSOM_LEVEL_KO } from "@/lib/utils";

export const metadata = { title: "블러섬북스 소개" };

const philosophy = [
  "블러섬북스는 학생이 실제로 풀고, 이해하고, 실력을 향상시킬 수 있는 교육 콘텐츠를 연구합니다.",
  "같은 시험을 준비하더라도 학생의 학년, 배경지식, 현재 실력, 학습 기간에 따라 필요한 문제와 학습 방법은 달라집니다. 블러섬북스는 이러한 차이를 고려하여 학생의 학습 목적과 수준에 적합한 교재를 안내하고, 필요한 경우 목적에 맞는 학습 콘텐츠를 별도로 설계합니다.",
  "단순히 많은 문제를 제공하는 것보다 중요한 것은 지금 학생에게 필요한 문제를 정확하게 제공하는 것이라고 생각합니다. 시험의 유형과 출제 구조를 분석하고, 개념 이해부터 문제 적용, 실전 연습까지 자연스럽게 이어질 수 있도록 교재를 구성합니다.",
];

const process = [
  { en: "Research", ko: "학습 목표와 필요한 스킬 분석" },
  { en: "Curriculum Design", ko: "학년과 수준에 맞는 콘텐츠 구조 설계" },
  { en: "Question Development", ko: "단계별 문제 및 학습 활동 제작" },
  { en: "Review & Editing", ko: "문항·난이도·표현·해설 검토" },
  { en: "Final Workbook", ko: "완성형 교재 제작" },
];

const audiences = [
  { en: "Students", ko: "학생" },
  { en: "Parents", ko: "학부모" },
  { en: "Tutors", ko: "과외 선생님" },
  { en: "Academies", ko: "학원" },
  { en: "Schools", ko: "학교" },
  { en: "Education Organizations", ko: "교육기관" },
];

const standards = [
  { icon: ShieldCheck, title: "학년 적합성 검토", body: "학년과 학습 단계에 맞는 개념·지문·어휘 수준인지 확인합니다." },
  { icon: Layers3, title: "난이도 단계화", body: "기초 문제에서 응용까지 난이도가 자연스럽게 이어지도록 배치합니다." },
  { icon: ClipboardCheck, title: "문제·해설 검수", body: "문항과 정답, 해설의 일치 여부와 정확성을 검토합니다." },
  { icon: SearchCheck, title: "반복 표현 및 오류 점검", body: "중복 문항, 표현 오류, 오타 등을 점검하여 완성도를 높입니다." },
  { icon: Target, title: "실제 학습 목적에 맞춘 구성", body: "문제 수보다 학생이 연습해야 할 능력을 기준으로 구성합니다." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Our Philosophy */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">
            Blossom Books · Educational Workbook Publisher
          </p>
          <h1 className="mt-3 font-display text-[34px] font-semibold leading-tight text-navy-950 sm:text-[40px]">
            Our Philosophy
          </h1>
          <p className="mt-2 font-display text-[18px] text-burgundy-700">학생을 기준으로 만드는 교재</p>
          <div className="mt-8 space-y-5">
            {philosophy.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-[17px] font-medium leading-[1.85] text-navy-900"
                    : "text-[15px] leading-[1.9] text-charcoal-600"
                }
              >
                {p}
              </p>
            ))}
          </div>
          <p className="mt-8 border-l-2 border-brass-500 pl-5 font-display text-[19px] font-medium italic text-navy-900">
            “One grade doesn’t mean one level. 학년이 아니라 학생을 기준으로.”
          </p>
        </div>
      </section>

      {/* Our Editorial Approach */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <span className="eyebrow">Our editorial approach</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            제작 과정
          </h2>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
            블러섬북스는 단순히 문제 수를 늘리는 방식으로 교재를 만들지 않습니다. 학생의 학년, 현재 수준,
            학습 목표를 먼저 고려하고, 그에 맞는 난이도와 문제 유형을 설계합니다.
          </p>
          <ol className="mt-10 space-y-4">
            {process.map((s, i) => (
              <li key={s.en} className="flex items-start gap-5 border-t border-navy-800/12 pt-4">
                <span className="font-label text-[13px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-display text-[18px] font-semibold text-navy-950">{s.en}</p>
                  <p className="mt-0.5 text-[13.5px] text-charcoal-600">{s.ko}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How We Design */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <span className="eyebrow">How we design</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            교재 설계 원칙
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.n} className="border-t border-navy-800/15 pt-5">
                <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{d.n}</span>
                <p className="mt-2 font-display text-[19px] font-semibold text-navy-950">{d.en}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">{d.ko}</p>
              </div>
            ))}
          </div>

          {/* Blossom Level System */}
          <div className="mt-12 border border-navy-800/12 bg-ivory-200/50 p-7 lg:p-8">
            <p className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">
              Blossom Level System
            </p>
            <p className="mt-2 font-display text-[19px] font-semibold text-navy-950">자체 난이도 체계</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {BLOSSOM_LEVELS.map((lv, i) => (
                <div key={lv} className="border border-navy-800/12 bg-ivory-100 p-4">
                  <span className="font-label text-[10px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 font-display text-[17px] font-semibold text-navy-950">{lv}</p>
                  <p className="mt-0.5 text-[12.5px] text-charcoal-600">{BLOSSOM_LEVEL_KO[lv]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <span className="eyebrow">Who we serve</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            누구를 위해 만드나요
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.en} className="border border-navy-800/12 bg-ivory-100 p-5">
                <p className="font-display text-[17px] font-semibold text-navy-950">{a.en}</p>
                <p className="mt-1 text-[13px] text-charcoal-600">{a.ko}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <span className="eyebrow">Quality standards</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            제작 기준
          </h2>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
            모든 교재는 아래 기준을 거쳐 완성됩니다. 정답만 제공하는 것이 아니라, 왜 그 답인지·오답은 왜
            틀렸는지·어떤 개념을 확인해야 하는지까지 담은 상세 해설을 제공합니다.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/12 shadow-card sm:grid-cols-2 lg:grid-cols-5">
            {standards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col bg-ivory-100 p-6">
                <div className="flex h-10 w-10 items-center justify-center border border-brass-500/30 bg-brass-500/[0.07] text-brass-500">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <p className="mt-4 font-display text-[16px] font-semibold leading-snug text-navy-950">{title}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-16 text-ivory-100 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
          <h2 className="font-display text-[26px] font-semibold sm:text-[30px]">학생에게 맞는 교재를 찾아보세요</h2>
          <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-ivory-200/80">
            학년, 현재 수준, 학습 목적을 알려주시면 알맞은 교재를 안내해 드립니다.
          </p>
          <Link
            href="/books"
            className="mt-8 inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
          >
            교재 둘러보기
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
