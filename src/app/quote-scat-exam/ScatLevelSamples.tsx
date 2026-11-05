"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import SampleFigure from "@/components/books/SampleFigure";
import { SampleItem } from "@/data/sampleBank";

const DIFF_COLOR: Record<string, string> = {
  Foundation: "#7d8a6a",
  Standard: "#ad8a4e",
  Advanced: "#b06a3c",
  Challenge: "#8a4b52",
};
const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function ScatLevelSamples({ bank, idPrefix }: { bank: SampleItem[]; idPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {bank.map((item, i) => {
        const open = openIndex === i;
        const key = `${idPrefix}-${i}`;
        return (
          <article key={key} className="border border-navy-800/12 bg-white">
            <div className="flex items-center justify-between gap-2 border-b border-navy-800/12 bg-ivory-200/40 px-4 py-2.5">
              <span className="flex items-center gap-2">
                <span className="font-label text-[9.5px] uppercase tracking-[0.1em] text-brass-500">{item.area}</span>
                <span className="text-navy-800/25">·</span>
                <span className="font-label text-[9.5px] uppercase tracking-[0.08em] text-navy-900">{item.type}</span>
              </span>
              <span
                className="font-label text-[9px] uppercase tracking-[0.08em]"
                style={{ color: DIFF_COLOR[item.difficulty] }}
              >
                {item.difficulty}
              </span>
            </div>

            <div className="px-4 py-4">
              <p className="whitespace-pre-line text-[12.5px] font-medium leading-relaxed text-navy-950">
                {item.question}
              </p>

              {item.figure && (
                <div className="mt-3 flex justify-center border border-navy-800/10 bg-ivory-200/25 px-3 py-4">
                  <SampleFigure name={item.figure} />
                </div>
              )}

              {item.choices && (
                <div className="mt-3 grid gap-1.5">
                  {item.choices.map((c, ci) => (
                    <div
                      key={ci}
                      className="flex items-center gap-2 border border-navy-800/15 bg-ivory-100 px-2.5 py-1.5 text-[12px] text-charcoal-900"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-navy-800/25 font-label text-[9.5px] font-semibold text-navy-800">
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
                className="mt-3 flex w-full items-center justify-between gap-2 border border-brass-500/35 bg-brass-500/[0.06] px-3 py-2 text-[11.5px] font-medium text-brass-600 transition-colors hover:bg-brass-500/[0.1]"
              >
                정답 및 해설 보기
                <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="mt-2.5 border-l-2 border-brass-500 bg-ivory-200/30 p-3">
                  <p className="flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.1em] text-brass-600">
                    <Check size={12} className="text-brass-500" strokeWidth={2.5} /> 정답 {item.answer}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-charcoal-700">{item.whyKo}</p>
                  {item.steps && (
                    <ol className="mt-2 space-y-0.5">
                      {item.steps.map((s, si) => (
                        <li key={si} className="text-[11px] leading-relaxed text-charcoal-600">
                          {si + 1}. {s}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
