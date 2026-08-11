"use client";

import { useEffect, useState } from "react";
import { X, FileSearch, MessageCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { siteConfig } from "@/data/site";

type SampleQuestion = { text: string; choices?: string[] };
type SampleAnswer = { answer: string; explain: string };
type Sample = {
  category: string;
  passage?: string;
  questions: SampleQuestion[]; // 기본 유형
  advanced: SampleQuestion[]; // 심화 유형
  answers: SampleAnswer[]; // 기본 + 심화 정답·해설
};

// 과목에 맞는 샘플 예시(문항 + 해설)를 생성합니다. 실제 지면이 아닌 대표 예시입니다.
function buildSample(product: Product): Sample {
  const key = `${product.subject} ${product.examOrCurriculum} ${product.title}`.toLowerCase();
  const isMath = /math|algebra|calc|geometry|statistic|사고력|수학/.test(key);
  const isScience = /biolog|chemi|physic|science|과학|생물|화학|물리/.test(key);
  const isEnglish = /english|read|writ|grammar|vocab|toefl|ielts|리딩|영어|문법|라이팅|보카/.test(key);

  if (isMath) {
    return {
      category: "Mathematics",
      questions: [
        { text: "다음 식을 인수분해하시오.  x² − 5x + 6" },
        { text: "일차방정식을 푸시오.  3x − 7 = 2x + 5" },
        { text: "함수 f(x) = 2x − 1 에 대하여 f(4)의 값을 구하시오." },
      ],
      advanced: [
        { text: "두 근이 2, 3인 이차방정식을 x² + bx + c = 0 꼴로 나타낼 때, b + c의 값을 구하시오." },
        { text: "함수 f(x) = x² − 4x + 1의 최솟값과 그때의 x값을 구하시오." },
      ],
      answers: [
        { answer: "(x − 2)(x − 3)", explain: "곱해서 6, 더해서 −5가 되는 두 수는 −2와 −3입니다." },
        { answer: "x = 12", explain: "양변에서 2x를 빼면 x − 7 = 5, 따라서 x = 12." },
        { answer: "7", explain: "f(4) = 2·4 − 1 = 8 − 1 = 7." },
        { answer: "b + c = 1", explain: "근과 계수의 관계로 b = −(2+3) = −5, c = 2·3 = 6 → b + c = 1." },
        { answer: "최솟값 −3 (x = 2)", explain: "f(x) = (x − 2)² − 3 로 완전제곱하면 x = 2에서 최솟값 −3." },
      ],
    };
  }

  if (isEnglish) {
    return {
      category: "English",
      passage:
        "A honeybee visits hundreds of flowers each day. As it collects nectar, pollen sticks to its body and travels to the next flower. In this way, bees help plants make seeds.",
      questions: [
        { text: "What is the main idea of the passage?" },
        { text: "In the passage, the word “collects” is closest in meaning to ___." },
        { text: "What can be inferred about bees and plants?" },
      ],
      advanced: [
        { text: "Which sentence best states the author’s purpose in writing this passage?" },
        { text: "Write one sentence summarizing how bees and plants help each other. (서술형)" },
      ],
      answers: [
        { answer: "Bees help plants reproduce while gathering nectar.", explain: "마지막 문장이 글의 주제를 담고 있습니다." },
        { answer: "gathers", explain: "‘collects’는 ‘모으다(gather)’와 가장 가깝습니다." },
        { answer: "They depend on each other.", explain: "꽃가루 이동으로 서로 도움을 주는 상호 의존 관계를 추론할 수 있습니다." },
        { answer: "To explain how bees help plants reproduce.", explain: "글은 벌의 역할을 ‘설명’하는 정보 전달 목적의 글입니다." },
        { answer: "예) Bees get nectar from flowers, and in return they carry pollen that helps plants make seeds.", explain: "인과·상호작용을 한 문장으로 요약하면 됩니다. 채점 기준(핵심어 포함)에 맞춘 모범 답안을 제공합니다." },
      ],
    };
  }

  if (isScience) {
    return {
      category: "Science",
      questions: [
        { text: "아래 그래프에서 온도가 가장 빠르게 상승한 구간을 고르시오.", choices: ["A", "B", "C", "D"] },
        { text: "광합성에 반드시 필요한 두 가지 요소를 쓰시오." },
        { text: "다음 중 물리적 변화에 해당하는 것은?", choices: ["종이가 타는 것", "물이 어는 것", "철이 녹스는 것", "음식이 상하는 것"] },
      ],
      advanced: [
        { text: "광합성과 세포 호흡의 반응물·생성물을 비교하여 두 반응의 관계를 서술하시오. (서술형)" },
        { text: "실험에서 대조군(control)을 두는 이유를 한 문장으로 설명하시오." },
      ],
      answers: [
        { answer: "B 구간", explain: "기울기(단위 시간당 온도 변화)가 가장 큰 구간이 B입니다." },
        { answer: "빛(에너지)과 이산화탄소", explain: "물과 함께 광합성의 핵심 반응물입니다." },
        { answer: "물이 어는 것", explain: "상태만 바뀌고 새로운 물질이 생기지 않는 물리적 변화입니다." },
        { answer: "서로 반대 방향의 반응", explain: "광합성의 생성물(포도당·산소)이 세포 호흡의 반응물이 되어 서로 순환합니다." },
        { answer: "변인 통제를 위해", explain: "비교 기준을 두어 특정 조건의 효과만 확인하기 위함입니다." },
      ],
    };
  }

  // 기본형 — 단원 기반 예시
  const u = product.units.slice(0, 3);
  return {
    category: product.subject,
    questions: [
      { text: `[${u[0] ?? "핵심 개념"}] 대표 유형 문항 — 개념 확인부터 응용까지 단계적으로 출제됩니다.` },
      { text: `[${u[1] ?? "적용"}] 실제 시험 형식을 반영한 적용·분석형 문항이 포함됩니다.` },
      { text: `[${u[2] ?? "종합"}] 종합·서술형 문항으로 마무리 점검합니다.` },
    ],
    advanced: [
      { text: `[${u[2] ?? "종합"}] 여러 개념을 결합한 심화·응용 문항으로 실전 감각을 점검합니다.` },
      { text: "실제 시험 형식을 반영한 서술형·자료 분석형 심화 문항이 포함됩니다. (서술형)" },
    ],
    answers: [
      { answer: "예시 정답 및 근거", explain: "정답과 함께 풀이 과정·오답 포인트를 상세히 제공합니다." },
      { answer: "예시 정답 및 근거", explain: "자주 틀리는 지점을 짚어 스스로 점검할 수 있습니다." },
      { answer: "예시 정답 및 근거", explain: "채점 기준에 맞춘 모범 답안을 함께 제시합니다." },
      { answer: "예시 정답 및 근거", explain: "심화 문항은 개념 결합·응용 과정을 단계별로 해설합니다." },
      { answer: "예시 정답 및 근거", explain: "서술형은 채점 기준(핵심 요소)에 맞춘 모범 답안을 제공합니다." },
    ],
  };
}

export default function SamplePreviewButton({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!product.sampleAvailable) {
    return (
      <button
        disabled
        className="inline-flex cursor-not-allowed items-center gap-2 border border-navy-800/15 px-6 py-3 text-[13.5px] font-medium text-charcoal-600/50"
      >
        <FileSearch size={16} />
        샘플 준비 중
      </button>
    );
  }

  const sample = buildSample(product);
  const shortTitle = product.title.split(" — ")[0];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
      >
        <FileSearch size={16} />
        샘플 페이지 미리보기
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy-950/70 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-6 w-full max-w-3xl border border-navy-800/15 bg-ivory-100 shadow-[0_40px_90px_-30px_rgba(13,22,38,0.7)]"
          >
            {/* 헤더 */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy-800/12 bg-ivory-100/95 px-6 py-4 backdrop-blur lg:px-8">
              <div>
                <span className="eyebrow">Sample Preview</span>
                <p className="mt-1 font-display text-[18px] font-semibold text-navy-950">
                  {product.titleKo}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-navy-900/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-7 lg:px-8">
              {/* 진행 순서 안내 */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-charcoal-600">
                {["목차", "기본 문제", "심화 문제", "정답·상세해설"].map((label, i) => (
                  <span key={label} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-navy-800/25">→</span>}
                    <span className="border border-navy-800/15 bg-ivory-200/60 px-2.5 py-1 font-label uppercase tracking-[0.08em]">
                      {label}
                    </span>
                  </span>
                ))}
              </div>

              {/* 목차 페이지 */}
              <article className="paper-rule border border-navy-800/15 bg-ivory-100 p-6 shadow-soft sm:p-8">
                <div className="flex items-baseline justify-between border-b border-navy-800/15 pb-3">
                  <p className="font-label text-[10px] uppercase tracking-[0.16em] text-brass-500">Contents · 목차</p>
                  <p className="font-label text-[10px] tracking-[0.1em] text-charcoal-600/70">{shortTitle}</p>
                </div>
                <ol className="mt-5 divide-y divide-navy-800/8">
                  {product.units.map((u, i) => (
                    <li key={u} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="flex items-center gap-3 text-[13.5px] text-charcoal-900">
                        <span className="font-label text-[11px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                        {u}
                      </span>
                      <span className="font-label text-[10px] tracking-[0.1em] text-charcoal-600/50">
                        p.{String(i * 6 + 3).padStart(3, "0")}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex items-center justify-between border-t border-navy-800/12 pt-3 font-label text-[9px] uppercase tracking-[0.16em] text-charcoal-600/60">
                  <span>Blossom Books</span>
                  <span>Contents</span>
                </div>
              </article>

              {/* 기본 문제 페이지 */}
              <article className="paper-rule border border-navy-800/15 bg-ivory-100 p-6 shadow-soft sm:p-8">
                <div className="flex items-baseline justify-between border-b border-navy-800/15 pb-3">
                  <p className="font-label text-[10px] uppercase tracking-[0.16em] text-brass-500">
                    Student Workbook · 기본
                  </p>
                  <p className="font-label text-[10px] tracking-[0.1em] text-charcoal-600/70">
                    {shortTitle} · {sample.category}
                  </p>
                </div>

                {sample.passage && (
                  <p className="mt-5 border-l-2 border-brass-500 pl-4 text-[13.5px] italic leading-relaxed text-charcoal-900">
                    {sample.passage}
                  </p>
                )}

                <ol className="mt-5 space-y-5">
                  {sample.questions.map((q, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-display text-[16px] font-semibold text-navy-900">{i + 1}.</span>
                      <div className="flex-1">
                        <p className="text-[14px] leading-relaxed text-charcoal-900">{q.text}</p>
                        {q.choices && (
                          <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-charcoal-600">
                            {q.choices.map((c, ci) => (
                              <span key={ci}>{["①", "②", "③", "④"][ci]} {c}</span>
                            ))}
                          </div>
                        )}
                        {!q.choices && <div className="mt-3 h-px w-full bg-navy-800/10" />}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-7 flex items-center justify-between border-t border-navy-800/12 pt-3 font-label text-[9px] uppercase tracking-[0.16em] text-charcoal-600/60">
                  <span>Blossom Books</span>
                  <span>Sample · 기본</span>
                </div>
              </article>

              {/* 심화 문제 페이지 */}
              <article className="paper-rule border border-brass-500/40 bg-ivory-200/40 p-6 shadow-soft sm:p-8">
                <div className="flex items-baseline justify-between border-b border-navy-800/15 pb-3">
                  <p className="font-label text-[10px] uppercase tracking-[0.16em] text-burgundy-700">
                    Challenge · 심화
                  </p>
                  <p className="font-label text-[10px] tracking-[0.1em] text-charcoal-600/70">응용·서술형</p>
                </div>
                <ol className="mt-5 space-y-5" start={sample.questions.length + 1}>
                  {sample.advanced.map((q, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-display text-[16px] font-semibold text-burgundy-700">
                        {sample.questions.length + i + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="text-[14px] leading-relaxed text-charcoal-900">{q.text}</p>
                        <div className="mt-3 h-px w-full bg-navy-800/10" />
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-7 flex items-center justify-between border-t border-navy-800/12 pt-3 font-label text-[9px] uppercase tracking-[0.16em] text-charcoal-600/60">
                  <span>Blossom Books</span>
                  <span>Sample · 심화</span>
                </div>
              </article>

              {/* 정답·상세해설 페이지 */}
              <article className="border border-navy-800/15 bg-navy-950 p-6 text-ivory-100 shadow-soft sm:p-8">
                <div className="flex items-baseline justify-between border-b border-ivory-100/15 pb-3">
                  <p className="font-label text-[10px] uppercase tracking-[0.16em] text-brass-400">
                    Answer Key &amp; Explanations · 정답·상세해설
                  </p>
                  <p className="font-label text-[10px] tracking-[0.1em] text-ivory-200/50">기본 + 심화</p>
                </div>

                <ol className="mt-5 space-y-4">
                  {sample.answers.map((a, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-display text-[15px] font-semibold text-brass-400">{i + 1}.</span>
                      <div className="flex-1">
                        <p className="text-[14px] font-medium text-ivory-100">{a.answer}</p>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-ivory-200/75">{a.explain}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex items-center justify-between border-t border-ivory-100/12 pt-3 font-label text-[9px] uppercase tracking-[0.16em] text-ivory-200/45">
                  <span>Blossom Books</span>
                  <span>Answer Key</span>
                </div>
              </article>

              {/* 안내 + 상담 */}
              <div className="flex flex-col items-start gap-3 border-t border-navy-800/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-charcoal-600">
                  <FileSearch size={14} className="mt-0.5 shrink-0 text-brass-500" />
                  샘플은 실제 교재의 구성과 난이도를 보여주는 예시입니다. 최신 업데이트에 따라 디자인과
                  구조(structure)가 실제 교재와 다소 다를 수 있으며, 전체 구성·분량은 상담 시 안내해 드립니다.
                </p>
                <a
                  href={siteConfig.kakaoChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 bg-navy-900 px-6 py-3 text-[13.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
                >
                  <MessageCircle size={15} />
                  카카오톡 상담
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
