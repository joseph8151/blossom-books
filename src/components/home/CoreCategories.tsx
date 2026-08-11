import Link from "next/link";
import { ClipboardCheck, Globe2, BookMarked, Layers, ArrowRight, LucideIcon } from "lucide-react";

interface Category {
  icon: LucideIcon;
  en: string;
  ko: string;
  skills?: string;
  desc: string;
  cta: string;
  href: string;
  primary?: boolean;
}

// LEVEL TEST를 첫 번째 핵심 카테고리로 배치합니다. 4개 카드는 동일한 크기로 노출됩니다.
const categories: Category[] = [
  {
    icon: ClipboardCheck,
    en: "Level Test",
    ko: "입학 · 레벨 진단",
    skills: "Reading · Vocabulary · Grammar · Writing",
    desc: "학년 및 Reading Level에 맞춰 구성된 4영역 학습 문제집",
    cta: "레벨테스트 교재 보기",
    href: "/books?track=level-test",
    primary: true,
  },
  {
    icon: Globe2,
    en: "International School",
    ko: "국제학교 학습",
    desc: "국제학교 재학생 및 입학 준비 학생을 위한 영어·수학·학습 콘텐츠",
    cta: "국제학교 교재 보기",
    href: "/books?track=admissions",
  },
  {
    icon: BookMarked,
    en: "U.S. Curriculum",
    ko: "미국 교육과정",
    desc: "Grade별 Reading · Writing · Math · Science 학습 문제집",
    cta: "미국 교육과정 보기",
    href: "/books?track=us-curriculum",
  },
  {
    icon: Layers,
    en: "Academic Workbooks",
    ko: "학년별 학습",
    desc: "기초 · 복습 · 선행 · 심화 학습을 위한 Grade별 문제집",
    cta: "학년별 교재 보기",
    href: "/books",
  },
];

export default function CoreCategories() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Core categories</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            Blossom Books의 핵심 교재 분야
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
            입학·레벨테스트부터 국제학교, 미국 교육과정, 학년별 학습까지 — 학생에게 필요한 교재를 분야별로
            바로 찾아보세요.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, en, ko, skills, desc, cta, href, primary }) => (
            <Link
              key={en}
              href={href}
              className={`lift group relative flex flex-col overflow-hidden border p-6 shadow-card transition-colors ${
                primary
                  ? "border-brass-500/50 bg-ivory-100"
                  : "border-navy-800/12 bg-ivory-100 hover:border-brass-500/40"
              }`}
            >
              {primary && (
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brass-500 to-brass-400" />
              )}
              <div
                className={`flex h-12 w-12 items-center justify-center border ${
                  primary
                    ? "border-brass-500/40 bg-brass-500/[0.08] text-brass-500"
                    : "border-navy-800/20 bg-ivory-200/50 text-navy-800"
                }`}
              >
                <Icon size={22} strokeWidth={1.7} />
              </div>
              <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">{en}</p>
              <h3 className="mt-1.5 font-display text-[20px] font-semibold leading-snug text-navy-950">{ko}</h3>
              {skills && (
                <p className="mt-2 font-label text-[10.5px] uppercase tracking-[0.05em] text-navy-800/60">
                  {skills}
                </p>
              )}
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-charcoal-600">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-900">
                {cta}
                <ArrowRight size={14} className="text-brass-500 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
