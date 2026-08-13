"use client";

import { useEffect, useMemo, useState } from "react";
import { X, FileSearch, MessageCircle, ChevronLeft, ChevronRight, BookOpen, KeyRound, Check, PenLine } from "lucide-react";
import { Product } from "@/lib/types";
import { siteConfig } from "@/data/site";
import { isFourSkill, productCode } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
import SampleFigure from "./SampleFigure";
import {
  SampleItem,
  Difficulty,
  readingBank,
  vocabularyBank,
  grammarBank,
  writingBank,
  mathBank,
  algebraBank,
  scienceBank,
  reasoningBank,
  certifiedEnglishBank,
  oetBank,
  scatBank,
  geometryBank,
  mathLevelBank,
  apCalcBank,
  apPhysicsBank,
  apStatsBank,
  apBiologyBank,
  apChemistryBank,
  apEconomicsBank,
  apEnglishBank,
  apHistoryBank,
  mapBank,
  satMathBank,
  apExtraByProduct,
  placementReadingByProduct,
  srReadingByProduct,
} from "@/data/sampleBank";

// 제품 id 기반 전용 샘플 세트 (복합 문제 + 도형/그래프)
const BANK_BY_ID: Record<string, SampleItem[]> = {
  "ap-calculus-workbook": apCalcBank,
  "ap-physics-workbook": apPhysicsBank,
  "ap-statistics-workbook": apStatsBank,
  "ap-biology-workbook": apBiologyBank,
  "ap-chemistry-workbook": apChemistryBank,
  "ap-economics-workbook": apEconomicsBank,
  "ap-english-lang-workbook": apEnglishBank,
  "ap-us-history-workbook": apHistoryBank,
  "map-growth-workbook": mapBank,
  "sat-math-workbook": satMathBank,
};

const DIFF_ORDER: Difficulty[] = ["Foundation", "Standard", "Advanced", "Challenge"];

// 학년대별 난이도 티어 — 같은 4영역 레벨테스트라도 학년에 따라 다른 문항을 노출합니다.
const LT_TIER: Record<string, Difficulty> = {
  "english-level-test-g1-2": "Foundation",
  "english-level-test-g3-4": "Standard",
  "english-level-test-g5-6": "Advanced",
};

// 목표 난이도에 가까운 순으로 정렬해 n개를 뽑습니다. (티어 문항이 먼저 오도록)
function pickTier(bank: SampleItem[], tier: Difficulty, n: number): SampleItem[] {
  const target = DIFF_ORDER.indexOf(tier);
  return [...bank]
    .sort((a, b) => Math.abs(DIFF_ORDER.indexOf(a.difficulty) - target) - Math.abs(DIFF_ORDER.indexOf(b.difficulty) - target))
    .slice(0, n);
}

// 첫 페이지에 가장 인상적인 문항(도형/그래프 또는 실전 지문)이 오도록 정렬합니다.
function leadWithVisual(items: SampleItem[]): SampleItem[] {
  if (items.length < 2) return items;
  if (items[0].figure || (items[0].passage?.length ?? 0) > 150) return items;
  const idx = items.findIndex((i) => i.figure || (i.passage?.length ?? 0) > 150);
  if (idx > 0) {
    const c = [...items];
    const [x] = c.splice(idx, 1);
    c.unshift(x);
    return c;
  }
  return items;
}
const DIFF_COLOR: Record<Difficulty, string> = {
  Foundation: "#7d8a6a",
  Standard: "#ad8a4e",
  Advanced: "#b06a3c",
  Challenge: "#8a4b52",
};
const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

// 지문 첫 줄이 제목 형태면 분리해 표지처럼 강조합니다.
function splitPassage(passage: string): { title?: string; body: string } {
  const parts = passage.split("\n\n");
  if (parts.length >= 2 && parts[0].length <= 60 && !/[.!?"']$/.test(parts[0].trim())) {
    return { title: parts[0].trim(), body: parts.slice(1).join("\n\n") };
  }
  return { body: passage };
}

// 상품 특성에 맞는 샘플 문항 세트를 구성합니다 (과목별 유형·난이도 다양).
function buildWorkbookItems(product: Product): SampleItem[] {
  const key = `${product.subject} ${product.examOrCurriculum} ${product.title}`.toLowerCase();
  const peakIdx = DIFF_ORDER.indexOf(blossomLevel(product.difficulty));
  const cap = (items: SampleItem[]) => {
    // Foundation 상품은 Challenge 유형을 제외해 과도하게 어려운 유형이 섞이지 않도록 합니다.
    const maxIdx = Math.max(peakIdx, 1);
    const filtered = items.filter((it) => DIFF_ORDER.indexOf(it.difficulty) <= maxIdx);
    return filtered.length >= 3 ? filtered : items;
  };

  if (isFourSkill(product)) {
    // 학년별 긴 리딩 지문 + 학년대 난이도에 맞춘 Vocabulary·Grammar·Writing (교재별 차별화)
    const reading = placementReadingByProduct[product.id] ?? [readingBank[0], readingBank[2], readingBank[3]];
    const tier = LT_TIER[product.id] ?? blossomLevel(product.difficulty);
    return [
      ...reading,
      ...pickTier(vocabularyBank, tier, 2),
      ...pickTier(grammarBank, tier, 2),
      ...pickTier(writingBank, tier, 2),
    ];
  }
  // SR Reading 전용 제품 — 긴 지문 + 유형 확장
  if (srReadingByProduct[product.id]) return srReadingByProduct[product.id];
  // Algebra 1 / 2 — 난이도로 서로 다른 문항 세트 노출
  if (product.id === "algebra-1-workbook") return algebraBank.filter((i) => ["Foundation", "Standard"].includes(i.difficulty));
  if (product.id === "algebra-2-workbook") return algebraBank.filter((i) => ["Advanced", "Challenge"].includes(i.difficulty));
  // 제품 id 전용 세트 (AP 과목별 · MAP · SAT Math) — 복합 문제 + 도형/그래프
  if (BANK_BY_ID[product.id]) return [...BANK_BY_ID[product.id], ...(apExtraByProduct[product.id] ?? [])];
  if (/scat/.test(key)) return scatBank;
  if (/reasoning|cat4|verbal|non-verbal|spatial|general ability/.test(key)) return reasoningBank;
  if (/oet/.test(key)) return oetBank;
  if (product.track === "certified-exam" && /english|toefl|ielts|met|spa|teps/.test(key)) return certifiedEnglishBank;
  // 수학 레벨테스트(사고력) — 한글 + SVG (큐레이션된 세트, 전부 노출)
  if (product.id === "level-test-math" || /수학 레벨|사고력/.test(key)) return mathLevelBank;
  // Geometry — 그래프·도형·복합문제 (SVG)
  if (/geometry|지오메트리/.test(key)) return geometryBank;
  if (/algebra/.test(key)) return cap(algebraBank);
  if (/calc|precalc|statistic|math|수학/.test(key) && !/reading|english/.test(key)) return cap(mathBank);
  if (/biolog|chemi|physic|science|과학|생물|화학|물리/.test(key)) return cap(scienceBank);
  if (/grammar|문법/.test(key)) return cap(grammarBank);
  if (/writing|라이팅/.test(key)) return writingBank;
  if (/vocab|보카|어휘/.test(key)) return cap(vocabularyBank);
  // Reading / SR / 그 외 기본
  return cap(readingBank);
}

function DifficultyTag({ d }: { d: Difficulty }) {
  const idx = DIFF_ORDER.indexOf(d);
  return (
    <span className="inline-flex items-center gap-1.5 font-label text-[9.5px] uppercase tracking-[0.1em] text-charcoal-600">
      {d}
      <span className="flex gap-0.5">
        {DIFF_ORDER.map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5"
            style={{ background: i <= idx ? "#ad8a4e" : "rgba(28,44,76,0.15)" }}
          />
        ))}
      </span>
    </span>
  );
}

export default function SamplePreviewButton({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"workbook" | "answer">("workbook");
  const [page, setPage] = useState(0);

  const workbook = useMemo(() => leadWithVisual(buildWorkbookItems(product)), [product]);
  const answers = useMemo(
    () => [...workbook].sort((a, b) => (b.wrong || b.steps ? 1 : 0) - (a.wrong || a.steps ? 1 : 0)).slice(0, 3),
    [workbook]
  );
  const items = tab === "workbook" ? workbook : answers;
  const item = items[Math.min(page, items.length - 1)];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, items.length - 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, items.length]);

  if (!product.sampleAvailable) {
    return (
      <button disabled className="inline-flex cursor-not-allowed items-center gap-2 border border-navy-800/15 px-6 py-3 text-[13.5px] font-medium text-charcoal-600/50">
        <FileSearch size={16} /> 샘플 준비 중
      </button>
    );
  }

  const level = blossomLevel(product.difficulty);
  const code = productCode(product);
  const total = workbook.length + answers.length;
  const hasFigure = workbook.some((i) => i.figure);
  const hasLongPassage = workbook.some((i) => (i.passage?.length ?? 0) > 200);
  const diffsCovered = DIFF_ORDER.filter((d) => workbook.some((i) => i.difficulty === d));
  const strengths = [
    hasFigure ? "도형·그래프" : null,
    hasLongPassage ? "실전 지문" : null,
    "정답·상세 해설",
  ].filter(Boolean) as string[];
  // 해설 언어: SAT·AP·성인 공인시험은 영어 해설 중심, 그 외(유아~초등/SR/MAP/레벨테스트 등)는 한글 상세해설 중심
  const advancedExam = product.track === "ap" || /SAT/i.test(product.examOrCurriculum) || product.track === "certified-exam";
  // OET는 한글 해설 중심으로 노출합니다.
  const useKo = !advancedExam || /OET/i.test(product.examOrCurriculum);

  function switchTab(t: "workbook" | "answer") {
    setTab(t);
    setPage(0);
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => { setTab("workbook"); setPage(0); setOpen(true); }}
            className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
          >
            <FileSearch size={16} /> 무료 샘플 {total}p 보기
          </button>
          <div className="flex flex-wrap gap-1.5">
            {strengths.map((s) => (
              <span key={s} className="border border-brass-500/35 bg-brass-500/[0.06] px-2 py-1 font-label text-[9.5px] uppercase tracking-[0.08em] text-brass-500">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* 미리보기 스트립 — 클릭 전에도 내용을 살짝 보여줍니다 */}
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {workbook.slice(0, 3).map((it, i) => (
            <button
              key={i}
              onClick={() => { setTab("workbook"); setPage(i); setOpen(true); }}
              className="group flex flex-col border border-navy-800/12 bg-ivory-100 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-brass-500/45 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="font-label text-[9px] uppercase tracking-[0.1em] text-brass-500">{it.area}</span>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: DIFF_COLOR[it.difficulty] }} />
              </div>
              <span className="mt-1.5 text-[12px] font-medium text-navy-950 line-clamp-1">{it.type}</span>
              <span className="mt-1 text-[11px] leading-snug text-charcoal-600 line-clamp-2">{it.question}</span>
              <span className="mt-2 font-label text-[8.5px] uppercase tracking-[0.12em] text-navy-800/50">Preview {String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy-950/70 p-3 backdrop-blur-sm sm:p-6" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="relative my-4 w-full max-w-4xl border border-navy-800/15 bg-ivory-100 shadow-[0_40px_90px_-30px_rgba(13,22,38,0.7)]">
            {/* 헤더 */}
            <div className="sticky top-0 z-10 border-b border-navy-800/12 bg-ivory-100/95 px-5 py-4 backdrop-blur lg:px-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="eyebrow">Explore the sample</span>
                  <p className="mt-1 font-display text-[18px] font-semibold text-navy-950">{product.titleKo}</p>
                  <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/70">
                    {code} · {level} · {product.gradeRange}
                  </p>
                </div>
                <button onClick={() => setOpen(false)} aria-label="닫기" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-navy-900/5">
                  <X size={20} />
                </button>
              </div>

              {/* 탭 */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => switchTab("workbook")}
                  className={`inline-flex items-center gap-1.5 border px-4 py-2 text-[12.5px] font-medium transition-colors ${
                    tab === "workbook" ? "border-navy-900 bg-navy-900 text-ivory-100" : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                  }`}
                >
                  <BookOpen size={14} /> Student Workbook · {workbook.length}p
                </button>
                <button
                  onClick={() => switchTab("answer")}
                  className={`inline-flex items-center gap-1.5 border px-4 py-2 text-[12.5px] font-medium transition-colors ${
                    tab === "answer" ? "border-navy-900 bg-navy-900 text-ivory-100" : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                  }`}
                >
                  <KeyRound size={14} /> Answer Guide · {answers.length}p
                </button>
              </div>
            </div>

            <div className="px-5 py-6 lg:px-7">
              {/* 설득 한 줄 */}
              <p className="mb-5 border-l-2 border-brass-500 pl-3 text-[12.5px] leading-relaxed text-charcoal-900">
                실제 교재 발췌본입니다. <span className="font-medium">표지가 아니라 문제로 판단하세요.</span>
              </p>

              {/* 콘텐츠 목차 */}
              <div className="mb-5">
                <p className="font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">
                  This sample includes · {items.length} pages
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {items.map((it, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[11px] transition-all ${
                        i === page
                          ? "border-navy-900 bg-navy-900 text-ivory-100 shadow-soft"
                          : "border-navy-800/15 text-charcoal-600 hover:-translate-y-0.5 hover:border-navy-800/35"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: DIFF_COLOR[it.difficulty] }} />
                      <span className="font-label tracking-[0.06em] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                      {it.type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 페이지 뷰 — 실제 출판 교재 페이지처럼 */}
              {item && tab === "workbook" && (
                <article className="relative overflow-hidden border border-navy-800/15 bg-ivory-100 shadow-[0_18px_50px_-28px_rgba(13,22,38,0.5)]">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brass-500 via-brass-400 to-brass-500" />
                  {/* SAMPLE 워터마크 */}
                  <span className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-display text-[92px] font-bold leading-none tracking-tight text-navy-900/[0.035] rotate-90">
                    SAMPLE
                  </span>

                  {/* 러닝 헤더 */}
                  <div className="flex items-center justify-between gap-2 border-b border-navy-800/12 bg-ivory-200/40 px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">{item.area}</span>
                      <span className="text-navy-800/25">·</span>
                      <span className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-900">{item.type}</span>
                    </div>
                    <DifficultyTag d={item.difficulty} />
                  </div>

                  <div className="relative px-6 py-6 sm:px-9 sm:py-8">
                    <p className="font-label text-[10.5px] uppercase tracking-[0.08em] text-charcoal-600/70">{item.skill}</p>

                    {/* 지문 */}
                    {item.passage && (() => {
                      const { title, body } = splitPassage(item.passage!);
                      return (
                        <div className="mt-4 border border-navy-800/12 bg-ivory-200/25">
                          <div className="flex items-center gap-1.5 border-b border-navy-800/10 px-4 py-2">
                            <BookOpen size={12} className="text-brass-500" />
                            <span className="font-label text-[9.5px] uppercase tracking-[0.14em] text-navy-800/60">Reading Passage</span>
                          </div>
                          <div className="max-h-72 overflow-y-auto px-5 py-4">
                            {title && <p className="mb-2 font-display text-[15px] font-semibold text-navy-950">{title}</p>}
                            <p className="whitespace-pre-line text-[13.5px] leading-[1.8] text-charcoal-900">{body}</p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* 문항 */}
                    <div className="mt-6 flex gap-3.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-[14px] font-semibold text-ivory-100">
                        {page + 1}
                      </span>
                      <div className="flex-1">
                        <p className="pt-1 text-[15px] font-medium leading-relaxed text-navy-950">{item.question}</p>
                        {item.figure && (
                          <div className="mt-3 flex justify-center border border-navy-800/10 bg-ivory-200/30 px-3 py-4">
                            <SampleFigure name={item.figure} />
                          </div>
                        )}
                        {item.choices ? (
                          <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            {item.choices.map((c, ci) => (
                              <div
                                key={ci}
                                className="flex items-center gap-2.5 border border-navy-800/15 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 transition-colors hover:border-brass-500/50"
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-navy-800/25 font-label text-[11px] font-semibold text-navy-800">
                                  {OPTION_LETTERS[ci]}
                                </span>
                                {c}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-4 border border-navy-800/12 bg-ivory-200/25 p-4">
                            <p className="flex items-center gap-1.5 font-label text-[9.5px] uppercase tracking-[0.12em] text-charcoal-600/60">
                              <PenLine size={12} className="text-brass-500" /> Written Response
                            </p>
                            <div className="mt-3 space-y-3">
                              <div className="h-px w-full bg-navy-800/12" />
                              <div className="h-px w-full bg-navy-800/12" />
                              <div className="h-px w-3/4 bg-navy-800/12" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 러닝 푸터 */}
                  <div className="flex items-center justify-between border-t border-navy-800/12 bg-ivory-200/40 px-6 py-2.5">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="flex h-4 w-4 items-center justify-center bg-navy-900 font-display text-[7px] font-bold text-ivory-100">BB</span>
                      <span className="font-label text-[9px] uppercase tracking-[0.14em] text-charcoal-600/60">{code}</span>
                    </span>
                    <span className="font-label text-[9px] uppercase tracking-[0.16em] text-charcoal-600/60">
                      Workbook · p.{String(page + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              )}

              {item && tab === "answer" && (
                <article className="relative overflow-hidden border border-navy-800/15 bg-navy-950 p-6 text-ivory-100 shadow-[0_18px_50px_-28px_rgba(13,22,38,0.6)] sm:p-8">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brass-500 via-brass-400 to-brass-500" />
                  <div className="flex items-center justify-between border-b border-ivory-100/15 pb-3">
                    <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-400">
                      Answer &amp; Explanation · {item.type}
                    </span>
                    <span className="border border-brass-400/40 px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.1em] text-brass-400">
                      {useKo ? "한글 상세해설" : "English + 한글 핵심"}
                    </span>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-ivory-200/70">{item.question}</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">Correct Answer</p>
                      <span className="mt-1.5 inline-flex items-center gap-2 border border-brass-400/40 bg-brass-400/10 px-3 py-1.5 text-[14px] font-medium text-ivory-100">
                        <Check size={15} className="text-brass-300" strokeWidth={2.5} /> {item.answer}
                      </span>
                    </div>
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">
                        {useKo ? "왜 정답인가요?" : "Why it is correct"}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-ivory-200/85">{useKo ? item.whyKo : item.why}</p>
                      {!useKo && (
                        <p className="mt-1.5 text-[12px] leading-relaxed text-ivory-200/60">핵심(한글): {item.whyKo}</p>
                      )}
                    </div>
                    {item.steps && (
                      <div>
                        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">Solution steps</p>
                        <ol className="mt-1 space-y-1">
                          {item.steps.map((s, i) => (
                            <li key={i} className="text-[13px] leading-relaxed text-ivory-200/80">{i + 1}. {s}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {(useKo ? item.wrongKo || item.wrong : item.wrong) && (
                      <div>
                        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">
                          {useKo ? "오답 포인트" : "Common mistake"}
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed text-ivory-200/80">{useKo ? item.wrongKo || item.wrong : item.wrong}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-ivory-100/12 pt-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="flex h-4 w-4 items-center justify-center border border-brass-400/50 font-display text-[7px] font-bold text-brass-300">BB</span>
                      <span className="font-label text-[9px] uppercase tracking-[0.14em] text-ivory-200/45">{code}</span>
                    </span>
                    <span className="font-label text-[9px] uppercase tracking-[0.16em] text-ivory-200/45">
                      Answer Guide · p.{String(page + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              )}

              {/* Prev / Next */}
              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  className="inline-flex items-center gap-1 border border-navy-800/20 px-3.5 py-2 text-[12.5px] text-navy-900 transition-colors disabled:opacity-30 enabled:hover:border-navy-800/45"
                >
                  <ChevronLeft size={15} /> 이전
                </button>
                <span className="font-label text-[11px] uppercase tracking-[0.1em] text-charcoal-600">
                  {page + 1} / {items.length}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, items.length - 1))}
                  disabled={page === items.length - 1}
                  className="inline-flex items-center gap-1 border border-navy-800/20 px-3.5 py-2 text-[12.5px] text-navy-900 transition-colors disabled:opacity-30 enabled:hover:border-navy-800/45"
                >
                  다음 <ChevronRight size={15} />
                </button>
              </div>

              {/* 난이도 지도 — 이 교재가 다루는 난이도 범위 */}
              <div className="mt-6 border-t border-navy-800/12 pt-5">
                <p className="font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">이 교재가 다루는 난이도</p>
                <div className="mt-2.5 flex gap-1.5">
                  {DIFF_ORDER.map((d) => {
                    const on = diffsCovered.includes(d);
                    return (
                      <span
                        key={d}
                        className={`flex-1 border px-2 py-1.5 text-center font-label text-[9.5px] uppercase tracking-[0.06em] ${on ? "text-ivory-100" : "border-navy-800/15 text-navy-800/30"}`}
                        style={on ? { background: DIFF_COLOR[d], borderColor: DIFF_COLOR[d] } : undefined}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11.5px] text-charcoal-600">
                  기초 → 표준 → 응용/심화까지, 이 샘플만 봐도 교재의 난이도 스펙트럼을 확인하실 수 있습니다.
                </p>
              </div>

              {/* 안내 + 상담 */}
              <div className="mt-7 flex flex-col items-start gap-3 border-t border-navy-800/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 text-[12px] leading-relaxed text-charcoal-600">
                  <FileSearch size={14} className="mt-0.5 shrink-0 text-brass-500" />
                  실제 시험의 평가 Skill과 유형을 참고해 독립 제작한 예시이며, 기출·유출문제가 아닙니다. 최신
                  업데이트에 따라 디자인·구성이 실제 교재와 다소 다를 수 있습니다.
                </p>
                <a href={siteConfig.kakaoChannelUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 bg-navy-900 px-6 py-3 text-[13px] font-medium text-ivory-100 transition-all hover:-translate-y-0.5 hover:bg-navy-800">
                  <MessageCircle size={15} /> 카카오톡으로 교재 확인
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
