import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 홈페이지의 "Find Your Prep" 진입 — 4단계로 학생에게 맞는 구성을 안내합니다. (전체 도구는 /find)
const steps = [
  { n: "STEP 1", q: "어떤 시험을 준비하나요?", a: "레벨테스트 · 국제학교 · MAP · CAT4 · SSAT · SAT/AP 등" },
  { n: "STEP 2", q: "현재 학년 또는 수준은?", a: "K–G12 · 현재 Reading Level / SR 기준" },
  { n: "STEP 3", q: "시험일까지 얼마나 남았나요?", a: "단기 점검 · 표준 준비 · 장기 심화" },
  { n: "STEP 4", q: "어느 정도의 연습량이 필요한가요?", a: "Quick · Standard · Intensive" },
];

export default function FindPrepPromo() {
  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-16 text-ivory-100 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">Find Your Prep</span>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight sm:text-[31px]">
              시험 이름은 알아도, 어떤 구성이 맞는지는 모를 수 있습니다
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-[1.85] text-ivory-200/80">
              페이지 수부터 고르지 마세요. 준비하는 시험, 현재 학년과 수준, 남은 기간을 알려주시면 학생에게
              적합한 교재와 구성을 안내해 드립니다.
            </p>
            <Link
              href="/find"
              className="group mt-8 inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14.5px] font-medium text-navy-950 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brass-400"
            >
              내게 맞는 교재 찾기
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden border border-ivory-100/12 bg-ivory-100/10 sm:grid-cols-2">
            {steps.map(({ n, q, a }) => (
              <div key={n} className="bg-navy-950 p-6">
                <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-400">{n}</p>
                <p className="mt-2 font-display text-[16px] font-semibold text-ivory-100">{q}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory-200/70">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
