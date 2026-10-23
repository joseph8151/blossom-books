"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

// 3개 핵심 서비스는 모두 동등하게 중요합니다 — 특정 카드만 강조하지 않습니다.
// 클릭하면 다른 페이지로 이동하지 않고, 카드 바로 아래에 상세 패널이
// 펼쳐집니다("자세히 보기 +" / "접기 −"). 상세 패널은 전부 카카오톡 상담
// CTA로 끝납니다 — 과목·난이도·학원 스타일이 섞인 질문은 카탈로그 필터보다
// 상담에서 정확히 짚어주는 편이 낫다는 판단입니다.
interface CategoryGroup {
  label: string;
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
  notes: string[]; // 펼친 상태, CTA 위 보조 문장
  ctaLabel: string;
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
        label: "포함 예시",
        items: [
          "English",
          "Math",
          "Science",
          "Reading",
          "미국·영국·국제 커리큘럼",
          "학년별 학습",
          "단원별 보강",
          "학기별 복습",
          "시험 대비",
        ],
      },
    ],
    notes: [
      "학년만 기준으로 만들지 않고, 학생의 현재 수준과 필요한 과목, 학습 목적에 맞춰 난이도와 구성을 조정합니다.",
    ],
    ctaLabel: "국제학교 교재 상담하기",
  },
  {
    no: "02",
    en: "Placement & Level Test Prep",
    ko: "입학 · 레벨테스트 대비",
    teaser: "학년이 아니라, 현재 레벨과 목표 학원에 맞춰 구성합니다.",
    areas: "영어 · 국어 · 수학 레벨테스트",
    intro:
      "같은 학년이라도 현재 레벨, 목표 학원, 시험 난이도에 따라 필요한 문제 구성은 달라집니다. Blossom Books에서는 아래 기준으로 맞춤 구성합니다.",
    groups: [
      { label: "맞춤 기준", items: ["학년", "현재 레벨", "목표 학원", "시험 난이도", "필요한 영역"] },
      { label: "영어 레벨테스트", items: ["Reading", "Vocabulary", "Grammar", "Writing", "Interview"] },
      { label: "국어 레벨테스트", items: ["문해력", "어휘", "핵심 요지", "내용 파악", "추론", "구조 파악"] },
      { label: "수학 레벨테스트", items: ["연산", "사고력", "문제해결", "학년별 심화", "입학·반배정용 문제"] },
    ],
    notes: ["바로 구매 가능한 구성과 주문 제작형 교재 모두 제공합니다.", "SR 대비는 별도 카테고리에서 안내합니다."],
    ctaLabel: "레벨테스트 상담하기",
  },
  {
    no: "03",
    en: "Standardized Test Prep",
    ko: "표준화 시험 대비",
    teaser: "시험마다 다른 구조에 맞춰 각각 따로 준비합니다.",
    areas: "MAP · CAT4 · SSAT · ISEE · UKiset · SAT · AP · GRE · LSAT",
    intro: "시험마다 평가 영역과 문제 구조가 다르기 때문에 같은 방식으로 교재를 구성하지 않습니다.",
    groups: [
      { label: "예시 시험", items: ["MAP", "CAT4", "SSAT", "ISEE", "UKiset", "SAT", "AP", "GRE", "LSAT"] },
    ],
    notes: ["각 시험의 평가 영역, 문항 유형, 난이도에 맞춰 문제집·해설집·모의형 구성 등을 제작합니다."],
    ctaLabel: "시험별 상담하기",
  },
];

function CategoryCard({ c }: { c: Category }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col border border-navy-800/12 bg-ivory-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex flex-col p-7 text-left transition-colors hover:bg-ivory-200/40 lg:p-8"
      >
        <span className="font-display text-[34px] font-semibold leading-none text-navy-800/18">{c.no}</span>
        <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.13em] text-brass-500">{c.en}</p>
        <h3 className="mt-2 font-display text-[21px] font-semibold leading-snug text-navy-950">{c.ko}</h3>
        <p className="mt-3 text-[13.5px] leading-[1.8] text-charcoal-600">{c.teaser}</p>
        <p className="mt-5 border-t border-navy-800/10 pt-4 font-label text-[10.5px] uppercase tracking-[0.06em] text-navy-800/60">
          {c.areas}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-brass-500">
          {open ? "접기" : "자세히 보기"}
          <span className="text-[14px] leading-none">{open ? "−" : "+"}</span>
        </span>
      </button>

      {open && (
        <div className="border-t border-navy-800/10 bg-ivory-200/25 p-7 pt-6 lg:p-8 lg:pt-6">
          <p className="text-[13.5px] leading-[1.8] text-charcoal-700">{c.intro}</p>

          <div className="mt-4 space-y-4">
            {c.groups.map((g) => (
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
            ))}
          </div>

          <div className="mt-4 space-y-1.5 border-t border-navy-800/10 pt-4">
            {c.notes.map((n) => (
              <p key={n} className="text-[12px] leading-relaxed text-charcoal-600/85">
                {n}
              </p>
            ))}
          </div>

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
