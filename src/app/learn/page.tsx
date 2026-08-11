import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { learnArticles } from "@/data/learnArticles";

export const metadata = {
  title: "학부모 가이드 — Blossom Learn",
  description: "SR Level, 페이지 선택, Reading Level과 학년의 차이, 레벨테스트 준비 등 학부모를 위한 학습 가이드.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Blossom Learn</p>
      <h1 className="mt-3 font-display text-[32px] font-semibold text-navy-950 sm:text-[40px]">학부모 가이드</h1>
      <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
        교재 선택과 시험 준비에 도움이 되는 정보를 정리했습니다. 판매가 아니라, 결정에 도움이 되는 내용을
        먼저 제공합니다.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {learnArticles.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="lift group flex flex-col border border-navy-800/12 bg-ivory-100 p-6 shadow-card transition-colors hover:border-brass-500/50"
          >
            <BookOpen size={20} className="text-brass-500" strokeWidth={1.7} />
            <p className="mt-4 font-display text-[18px] font-semibold leading-snug text-navy-950">{a.title}</p>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-charcoal-600">{a.subtitle}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-navy-900">
              읽어보기 · {a.readMin}분
              <ArrowRight size={14} className="text-brass-500 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
