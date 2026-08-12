import Link from "next/link";
import { ArrowRight } from "lucide-react";

// 3개 진입점을 동등하게 노출합니다. 국제시험 전문처럼 보이지 않도록 레벨테스트를 co-equal로 배치.
interface Category {
  no: string;
  en: string;
  ko: string;
  desc: string;
  areas: string;
  cta: string;
  href: string;
}

const categories: Category[] = [
  {
    no: "01",
    en: "International School & Academic Prep",
    ko: "국제학교 · 학년별 학습",
    desc:
      "국제학교 재학생과 입학 준비 학생, 그리고 미국·영국 교육과정 학습이 필요한 학생을 위한 과목별 학습 콘텐츠입니다.",
    areas: "English · Math · Science · Reading",
    cta: "국제학교·학습 교재 보기",
    href: "/books?track=admissions",
  },
  {
    no: "02",
    en: "Placement & Level Test Prep",
    ko: "입학 · 레벨테스트 대비",
    desc:
      "학원·학교 입학, 반 배정, 레벨 확인을 위한 시험 대비. 학생의 학년과 현재 Reading Level에 맞춰 필요한 영역을 구성합니다.",
    areas: "Reading · Vocabulary · Grammar · Writing · Math",
    cta: "레벨테스트 교재 보기",
    href: "/books?track=level-test",
  },
  {
    no: "03",
    en: "Standardized Test Prep",
    ko: "표준화 시험 대비",
    desc:
      "MAP · CAT4 · SSAT · ISEE · UKiset · SAT · AP · GRE · LSAT 등 표준화 시험의 평가 영역과 문항 유형에 맞춘 준비 교재입니다.",
    areas: "Reading · Writing · Math · Reasoning",
    cta: "표준화 시험 교재 보기",
    href: "/books?track=ap",
  },
];

export default function CoreCategories() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">What we prepare</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            준비하는 시험의 성격에 따라 시작하세요
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.85] text-charcoal-600">
            국제시험만 준비하는 곳이 아닙니다. 학원·학교 입학 레벨테스트, 국제학교·학년별 학습, 표준화
            시험까지 — 세 가지 준비 목적을 동등하게 지원합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/10 lg:grid-cols-3">
          {categories.map(({ no, en, ko, desc, areas, cta, href }) => (
            <Link
              key={no}
              href={href}
              className="group flex flex-col bg-ivory-100 p-7 transition-colors hover:bg-ivory-200/40 lg:p-8"
            >
              <span className="font-display text-[34px] font-semibold leading-none text-navy-800/18">{no}</span>
              <p className="mt-6 font-label text-[10.5px] uppercase tracking-[0.13em] text-brass-500">{en}</p>
              <h3 className="mt-2 font-display text-[21px] font-semibold leading-snug text-navy-950">{ko}</h3>
              <p className="mt-3 flex-1 text-[13.5px] leading-[1.8] text-charcoal-600">{desc}</p>
              <p className="mt-5 border-t border-navy-800/10 pt-4 font-label text-[10.5px] uppercase tracking-[0.06em] text-navy-800/60">
                {areas}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-900">
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
