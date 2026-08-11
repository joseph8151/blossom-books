import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// 첫 번째 버튼은 반드시 "입학·레벨테스트"로 배치합니다.
const entries = [
  { label: "입학·레벨테스트", href: "/books?track=level-test", primary: true },
  { label: "국제학교 학습", href: "/books?track=admissions" },
  { label: "미국 교육과정", href: "/books?track=us-curriculum" },
  { label: "학년별 문제집", href: "/books" },
  { label: "과목별 문제집", href: "/books" },
  { label: "맞춤 교재 제작", href: "/custom-order" },
];

export default function QuickEntry() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow">What are you looking for?</span>
          <h2 className="mt-3 font-display text-[24px] font-semibold text-navy-950 sm:text-[28px]">
            어떤 교재를 찾고 계신가요?
          </h2>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(({ label, href, primary }) => (
            <Link
              key={label}
              href={href}
              className={`group flex items-center justify-between border px-5 py-4 text-[14.5px] font-medium transition-all hover:-translate-y-0.5 ${
                primary
                  ? "border-transparent bg-navy-900 text-ivory-100 shadow-soft hover:bg-navy-800 hover:shadow-lift"
                  : "border-navy-800/20 bg-ivory-100 text-navy-900 hover:border-brass-500/50 hover:shadow-soft"
              }`}
            >
              {label}
              <ArrowUpRight
                size={16}
                className={`transition-transform group-hover:translate-x-0.5 ${
                  primary ? "text-brass-400" : "text-brass-500"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
