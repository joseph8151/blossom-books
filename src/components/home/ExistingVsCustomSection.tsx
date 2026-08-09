import { Check } from "lucide-react";
import Link from "next/link";

const existing = [
  "이미 제작이 완료된 교재",
  "상담 후 바로 구매 가능",
  "학생용 문제집과 정답·해설집 제공",
  "이메일을 통한 PDF 발송",
  "다양한 시험과 과목 보유",
  "빠르게 학습을 시작하고 싶은 고객에게 적합",
];

const custom = [
  "원하는 교재가 기존 목록에 없는 경우 진행",
  "학년, 실력, 시험 목적에 맞춘 구성",
  "문제 유형과 난이도 조정",
  "학원 또는 기관의 수업 방식 반영 가능",
  "단원별 문제집과 자체 모의고사 제작 가능",
  "제작 범위와 일정은 상담 후 안내",
];

export default function ExistingVsCustomSection() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Two ways to start</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            기존 교재, 또는 나에게 맞춘 주문 제작
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
            블러섬북스는 이미 제작된 교재를 다양하게 보유하고 있으며, 필요한 교재가
            없는 경우에만 별도 제작을 진행합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-navy-800/15 bg-navy-800/15 shadow-card lg:grid-cols-2">
          <div className="bg-ivory-100 p-9">
            <span className="font-label text-[11px] uppercase tracking-[0.14em] text-navy-800/70">Option 01</span>
            <h3 className="mt-2 font-display text-[24px] font-semibold text-navy-950">기존 교재</h3>
            <ul className="mt-6 space-y-3">
              {existing.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-charcoal-600">
                  <Check size={16} className="mt-0.5 shrink-0 text-navy-800" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/books"
              className="mt-8 inline-block bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              교재 둘러보기
            </Link>
          </div>

          <div className="bg-navy-950 p-9 text-ivory-100">
            <span className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-400">Option 02</span>
            <h3 className="mt-2 font-display text-[24px] font-semibold">주문 제작</h3>
            <ul className="mt-6 space-y-3">
              {custom.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-ivory-200/85">
                  <Check size={16} className="mt-0.5 shrink-0 text-brass-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/custom-order"
              className="mt-8 inline-block border border-ivory-100/30 px-6 py-3 text-[13.5px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/60"
            >
              주문 제작 상담
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
