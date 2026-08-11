"use client";

import { useEffect, useMemo, useState } from "react";
import { X, FileSearch, MessageCircle, ChevronLeft, ChevronRight, BookOpen, KeyRound } from "lucide-react";
import { Product } from "@/lib/types";
import { siteConfig } from "@/data/site";
import { isFourSkill, productCode } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
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
} from "@/data/sampleBank";

const DIFF_ORDER: Difficulty[] = ["Foundation", "Standard", "Advanced", "Challenge"];

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
    return [
      readingBank[0], readingBank[2], readingBank[3],
      vocabularyBank[0], vocabularyBank[1],
      grammarBank[0], grammarBank[2],
      writingBank[0], writingBank[1],
    ];
  }
  if (/reasoning|cat4|verbal|non-verbal|spatial|general ability/.test(key)) return reasoningBank;
  if (product.track === "certified-exam" && /english|toefl|ielts|met|spa|oet|teps/.test(key)) return certifiedEnglishBank;
  if (/algebra/.test(key)) return cap(algebraBank);
  if (/geometry|calc|precalc|statistic|math|사고력|수학/.test(key) && !/reading|english/.test(key)) return cap(mathBank);
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

  const workbook = useMemo(() => buildWorkbookItems(product), [product]);
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
  // 해설 언어: SAT·AP·성인 공인시험은 영어 해설 중심, 그 외(유아~초등/SR/MAP/레벨테스트 등)는 한글 상세해설 중심
  const advancedExam = product.track === "ap" || /SAT/i.test(product.examOrCurriculum) || product.track === "certified-exam";
  const useKo = !advancedExam;

  function switchTab(t: "workbook" | "answer") {
    setTab(t);
    setPage(0);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
      >
        <FileSearch size={16} /> 무료 샘플 보기 ({workbook.length + answers.length}p)
      </button>

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
              {/* 콘텐츠 목차 */}
              <div className="mb-5">
                <p className="font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">This sample includes</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {items.map((it, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`border px-2 py-1 text-[11px] transition-colors ${
                        i === page ? "border-brass-500 bg-brass-500/10 text-navy-900" : "border-navy-800/15 text-charcoal-600 hover:border-navy-800/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} {it.type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 페이지 뷰 */}
              {item && tab === "workbook" && (
                <article className="paper-rule border border-navy-800/15 bg-ivory-100 p-6 shadow-soft sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-800/15 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">{item.area}</span>
                      <span className="text-navy-800/25">·</span>
                      <span className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-900">{item.type}</span>
                    </div>
                    <DifficultyTag d={item.difficulty} />
                  </div>
                  <p className="mt-2 text-[11.5px] text-charcoal-600">{item.skill}</p>

                  {item.passage && (
                    <p className="mt-4 border-l-2 border-brass-500 pl-4 text-[13.5px] leading-relaxed text-charcoal-900">{item.passage}</p>
                  )}

                  <div className="mt-5 flex gap-3">
                    <span className="font-display text-[16px] font-semibold text-navy-900">{page + 1}.</span>
                    <div className="flex-1">
                      <p className="text-[14.5px] leading-relaxed text-charcoal-900">{item.question}</p>
                      {item.choices ? (
                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[13.5px] text-charcoal-600 sm:grid-cols-2">
                          {item.choices.map((c, ci) => (
                            <span key={ci}>{["①", "②", "③", "④"][ci]} {c}</span>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-3 space-y-2">
                          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Written Response</p>
                          <div className="h-px w-full bg-navy-800/12" />
                          <div className="h-px w-full bg-navy-800/12" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-navy-800/12 pt-3 font-label text-[9px] uppercase tracking-[0.16em] text-charcoal-600/60">
                    <span>Blossom Books · {code}</span>
                    <span>Sample · Workbook {String(page + 1).padStart(2, "0")}</span>
                  </div>
                </article>
              )}

              {item && tab === "answer" && (
                <article className="border border-navy-800/15 bg-navy-950 p-6 text-ivory-100 shadow-soft sm:p-8">
                  <div className="flex items-center justify-between border-b border-ivory-100/15 pb-3">
                    <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-400">
                      Answer &amp; Explanation · {item.type}
                    </span>
                    <span className="border border-brass-400/40 px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.1em] text-brass-400">
                      {useKo ? "한글 상세해설" : "English + 한글 핵심"}
                    </span>
                  </div>
                  <p className="mt-4 text-[13px] text-ivory-200/70">{item.question}</p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">Correct Answer</p>
                      <p className="mt-1 text-[14px] font-medium text-ivory-100">{item.answer}</p>
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
                  <div className="mt-6 flex items-center justify-between border-t border-ivory-100/12 pt-3 font-label text-[9px] uppercase tracking-[0.16em] text-ivory-200/45">
                    <span>Blossom Books · {code}</span>
                    <span>Answer Guide {String(page + 1).padStart(2, "0")}</span>
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
