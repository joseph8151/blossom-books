import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 개인정보 없는 익명 "구성 예시" — 실제 후기가 아니라 교재가 어떻게 선택·구성되는지를 보여줍니다.
const cases = [
  {
    profile: "Grade 4 · SR 3.8",
    focus: "Reading + Vocabulary 집중 구성",
    spec: "100-page workbook · Standard",
  },
  {
    profile: "Grade 2 · SR 2.3",
    focus: "Reading + Grammar 기초 다지기",
    spec: "60-page workbook · Foundation",
  },
  {
    profile: "Grade 6 · SR 5.2",
    focus: "Reading · Vocabulary · Grammar · Writing 통합",
    spec: "200-page workbook · Standard",
  },
];

export default function SelectionExamples() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Selection examples</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            학생에 맞춰 교재를 이렇게 구성합니다
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
            학년과 Reading Level, 필요한 영역에 따라 교재 구성이 달라집니다. 아래는 실제 후기가 아니라, 교재가
            어떻게 선택·구성되는지를 보여주는 익명 예시입니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <div key={i} className="relative flex flex-col border border-navy-800/12 bg-ivory-200/40 p-7 shadow-card">
              <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">
                Case {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-display text-[22px] font-semibold text-navy-950">{c.profile}</p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-900">{c.focus}</p>
              <p className="mt-2 font-label text-[11px] uppercase tracking-[0.08em] text-navy-800/60">
                {c.spec}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/level-assessment"
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-navy-900"
          >
            레벨 진단 교재 구성 살펴보기
            <ArrowRight size={15} className="text-brass-500 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="text-[12px] text-charcoal-600/70">
            * 위 예시는 이해를 돕기 위한 구성 예시이며 특정 학생의 정보가 아닙니다.
          </span>
        </div>
      </div>
    </section>
  );
}
