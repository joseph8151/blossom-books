"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { grammarPrepReadingBank } from "@/data/sampleBank";

const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function GrammarPrepReading() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const passage = grammarPrepReadingBank[0].passage!;

  return (
    <div className="mt-5">
      <div className="border border-navy-800/12 bg-ivory-100 p-5 sm:p-6">
        <p className="font-label text-[9.5px] uppercase tracking-[0.1em] text-navy-800/55">Passage</p>
        <p
          className="mt-2 whitespace-pre-line text-[13.5px] leading-[1.85] text-charcoal-900"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {passage}
        </p>
      </div>

      <div className="mt-5 space-y-5">
        {grammarPrepReadingBank.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="border border-navy-800/12 bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-navy-900 font-display text-[12px] font-semibold text-ivory-100">
                  {i + 1}
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">{item.type}</span>
              </div>
              <p className="mt-3 text-[13.5px] font-medium leading-relaxed text-navy-950">{item.question}</p>

              {item.choices && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
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
                className="mt-3 flex w-full items-center justify-between gap-2 border border-brass-500/35 bg-brass-500/[0.06] px-3.5 py-2.5 text-[12.5px] font-medium text-brass-600 transition-colors hover:bg-brass-500/[0.1]"
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
          );
        })}
      </div>
    </div>
  );
}
