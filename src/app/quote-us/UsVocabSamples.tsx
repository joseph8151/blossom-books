"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { vocabularyBank } from "@/data/sampleBank";

const OPTION_LETTERS = ["A", "B", "C", "D"];

// 미국교과·AP 영단어장 샘플 — 영어 레벨테스트 단어 문제집, MAP Reading
// 단어장과 겹치지 않도록 다른 4개 문항을 골랐습니다.
const SAMPLE_INDICES = [4, 6, 7, 10];
const items = SAMPLE_INDICES.map((i) => vocabularyBank[i]);

export default function UsVocabSamples() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <article key={i} className="border border-navy-800/12 bg-white">
            <div className="flex items-center justify-between gap-2 border-b border-navy-800/12 bg-ivory-200/40 px-5 py-3">
              <span className="flex items-center gap-2">
                <span className="font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">{item.area}</span>
                <span className="text-navy-800/25">·</span>
                <span className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-900">{item.type}</span>
              </span>
            </div>

            <div className="px-5 py-5">
              <p className="text-[13.5px] font-medium leading-relaxed text-navy-950">{item.question}</p>

              {item.choices && (
                <div className="mt-4 grid gap-2">
                  {item.choices.map((c, ci) => (
                    <div
                      key={ci}
                      className="flex items-center gap-2.5 border border-navy-800/15 bg-ivory-100 px-3 py-2 text-[13px] text-charcoal-900"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-navy-800/25 font-label text-[10px] font-semibold text-navy-800">
                        {OPTION_LETTERS[ci]}
                      </span>
                      {c}
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="mt-4 flex w-full items-center justify-between gap-2 border border-brass-500/35 bg-brass-500/[0.06] px-3.5 py-2.5 text-[12.5px] font-medium text-brass-600 transition-colors hover:bg-brass-500/[0.1]"
              >
                정답 및 해설 보기
                <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="mt-3 border-l-2 border-brass-500 bg-ivory-200/30 p-4">
                  <p className="flex items-center gap-2 font-label text-[9.5px] uppercase tracking-[0.1em] text-brass-600">
                    <Check size={13} className="text-brass-500" strokeWidth={2.5} /> 정답 {item.answer}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-700">{item.whyKo}</p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
