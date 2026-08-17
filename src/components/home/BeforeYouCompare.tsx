import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";

// 가격표 직전 — "문제집 한 권"이 아니라 "Prep Package"라는 기준을 먼저 세웁니다.
const cards = [
  {
    no: "01",
    title: "Student Workbook",
    body: "학생 수준과 목표 시험에 맞춘 문제 및 연습 콘텐츠",
  },
  {
    no: "02",
    title: "Answer & Explanation Guide",
    body: "정답뿐 아니라 풀이 과정과 오답 포인트까지 확인",
  },
  {
    no: "03",
    title: "Test-Specific Practice",
    body: "목표 시험에서 요구하는 Skill과 Question Type 중심 구성",
  },
  {
    no: "04",
    title: "Purchase Fit Check",
    body: "구매 전 학생에게 적합한 교재와 분량인지 상담원이 확인",
  },
];

export default function BeforeYouCompare() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Before you compare the price</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            문제집 한 권의 가격으로 비교하지 마세요.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            Blossom Books는 서점에서 판매되는 일반 문제집과 목적이 다릅니다.
          </p>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-charcoal-600">
            학생이 준비하는 시험과 현재 수준을 기준으로 문제 유형을 선별하고, Student Workbook과 Answer &amp;
            Explanation Guide를 하나의 Prep Package로 제공합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/12 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.no} className="flex flex-col bg-ivory-100 p-6">
              <span className="font-display text-[22px] font-semibold leading-none text-brass-500">{c.no}</span>
              <p className="mt-4 font-display text-[16px] font-semibold leading-snug text-navy-950">{c.title}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-600">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-navy-800/15 bg-navy-950 p-8 text-ivory-100 lg:p-10">
          <p className="font-display text-[19px] font-semibold leading-snug sm:text-[22px]">
            단순 PDF 파일을 구매하는 것이 아니라,
            <br />
            <span className="text-brass-400">시험 준비에 필요한 하나의 학습 패키지를 선택하는 것입니다.</span>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
          >
            <FileSearch size={16} />
            무료 Sample 먼저 확인하기
          </Link>
          <Link
            href="/find"
            className="group inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
          >
            내 아이에게 맞는 교재 물어보기
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
