"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

// 3개 진입점을 동등하게 노출하되, 클릭하면 아래로 펼쳐지는 아코디언 카드입니다.
// 국제시험 전문처럼 보이지 않도록 레벨테스트를 co-equal로 배치하면서도,
// 02(입학·레벨테스트)는 가장 많이 들어오는 문의라 살짝 강조합니다.
// 세 카드 모두 "교재 보기"(카탈로그 링크) 대신 카카오톡 상담으로 바로
// 이어지는 CTA를 둡니다 — 과목·난이도·학원 스타일까지 섞인 질문은 카탈로그
// 필터보다 상담에서 정확히 짚어주는 편이 낫다는 판단입니다.
interface CategoryGroup {
  label?: string; // 있으면 칩 형태, 없으면 불릿 리스트
  items: string[];
}

interface Category {
  no: string;
  en: string;
  ko: string;
  teaser: string; // 접힌 상태에서 보이는 한 줄 요약
  areas: string; // 접힌 상태 하단 태그 라인
  intro: string; // 펼친 상태 첫 문장
  groups: CategoryGroup[];
  notes?: string[]; // 펼친 상태, CTA 위 보조 문장
  ctaLabel: string;
  emphasized?: boolean;
}

const categories: Category[] = [
  {
    no: "01",
    en: "International School & Academic Prep",
    ko: "국제학교 · 학년별 학습",
    teaser: "국제학교 재학생과 입학 준비 학생을 위한 과목별 맞춤 학습입니다.",
    areas: "English · Math · Science · Reading",
    intro: "국제학교 재학생과 입학 준비 학생을 위한 학년별·과목별 맞춤 교재를 구성합니다.",
    groups: [
      {
        items: [
          "English · Math · Science · Reading",
          "미국·영국·국제 커리큘럼 대응",
          "학년과 현재 수준에 맞춘 난이도 조정",
          "단원별 보강 · 학기별 복습 · 시험 대비 구성",
        ],
      },
    ],
    ctaLabel: "맞춤 상담하기",
  },
  {
    no: "02",
    en: "Placement & Level Test Prep",
    ko: "입학 · 레벨테스트 대비",
    teaser: "학년이 아니라, 현재 레벨과 목표 학원에 맞춰 구성합니다.",
    areas: "영어 · 국어 · 수학 레벨테스트",
    intro: "같은 학년이라도 목표 학원과 현재 레벨에 따라 필요한 문제 구성은 달라집니다.",
    groups: [
      { label: "맞춤 기준", items: ["학년", "현재 레벨", "목표 학원", "시험 난이도"] },
      { label: "영어", items: ["Reading", "Vocabulary", "Grammar", "Writing"] },
      { label: "국어", items: ["문해력", "어휘", "요지", "추론", "구조 파악"] },
      { label: "수학", items: ["연산", "사고력", "문제해결", "학년별 심화"] },
    ],
    notes: ["바로 구매 가능한 구성과 주문 제작형 모두 가능합니다.", "SR 대비는 별도 카테고리로 운영합니다."],
    ctaLabel: "레벨테스트 상담하기",
    emphasized: true,
  },
  {
    no: "03",
    en: "Standardized Test Prep",
    ko: "표준화 시험 대비",
    teaser: "시험마다 다른 구조에 맞춰 각각 따로 준비합니다.",
    areas: "MAP · CAT4 · SSAT · ISEE · UKiset · SAT · AP · GRE · LSAT",
    intro: "시험마다 보는 능력과 문제 구조가 다르기 때문에 같은 방식으로 교재를 만들지 않습니다.",
    groups: [{ items: ["MAP · CAT4 · SSAT · ISEE · UKiset", "SAT · AP · GRE · LSAT 등"] }],
    notes: ["시험별 영역과 문항 유형에 맞춰 문제·해설·모의형 구성을 제작합니다."],
    ctaLabel: "시험별 상담하기",
  },
];

function CategoryCard({ c }: { c: Category }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex flex-col bg-ivory-100 transition-shadow ${
        c.emphasized
          ? "border-2 border-navy-900 shadow-[0_18px_40px_-28px_rgba(13,22,38,0.35)]"
          : "border border-navy-800/12"
      }`}
    >
      {c.emphasized && (
        <span className="self-start bg-navy-900 px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.12em] text-brass-400">
          가장 많이 문의하는 서비스
        </span>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex flex-col p-7 text-left transition-colors hover:bg-ivory-200/40 lg:p-8"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-display text-[34px] font-semibold leading-none text-navy-800/18">{c.no}</span>
          <ChevronDown
            size={18}
            className={`mt-1 shrink-0 text-navy-800/50 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
        <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.13em] text-brass-500">{c.en}</p>
        <h3 className="mt-2 font-display text-[21px] font-semibold leading-snug text-navy-950">{c.ko}</h3>
        <p className="mt-3 text-[13.5px] leading-[1.8] text-charcoal-600">{c.teaser}</p>
        <p className="mt-5 border-t border-navy-800/10 pt-4 font-label text-[10.5px] uppercase tracking-[0.06em] text-navy-800/60">
          {c.areas}
        </p>
      </button>

      {open && (
        <div className="border-t border-navy-800/10 bg-ivory-200/25 p-7 pt-6 lg:p-8 lg:pt-6">
          <p className="text-[13.5px] leading-[1.8] text-charcoal-700">{c.intro}</p>

          <div className="mt-4 space-y-4">
            {c.groups.map((g, i) =>
              g.label ? (
                <div key={g.label}>
                  <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/60">{g.label}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="border border-navy-800/15 bg-white px-2.5 py-1 text-[12px] text-charcoal-700"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <ul key={`list-${i}`} className="space-y-1.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2 text-[13px] leading-relaxed text-charcoal-700">
                      <span className="text-brass-500">·</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>

          {c.notes && (
            <div className="mt-4 space-y-1.5 border-t border-navy-800/10 pt-4">
              {c.notes.map((n) => (
                <p key={n} className="text-[12px] leading-relaxed text-charcoal-600/85">
                  {n}
                </p>
              ))}
            </div>
          )}

          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 bg-navy-900 px-6 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={15} />
            {c.ctaLabel}
          </a>
        </div>
      )}
    </div>
  );
}

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
            국제시험만 준비하는 곳이 아닙니다. 국제학교·학년별 학습, 입학·레벨테스트 대비, 표준화 시험까지 —
            학년보다 현재 레벨과 목표 학원·시험 유형에 먼저 맞춰 시작합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-start">
          {categories.map((c) => (
            <CategoryCard key={c.no} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
