"use client";

import { useState } from "react";
import { Check, ChevronDown, Headphones, BookOpen, PenLine, Mic } from "lucide-react";
import { SampleItem } from "@/data/sampleBank";

const OPTION_LETTERS = ["A", "B", "C", "D"];
const AREA_ICON: Record<string, typeof Headphones> = {
  Listening: Headphones,
  Reading: BookOpen,
  Writing: PenLine,
  Speaking: Mic,
};

export default function WidaSamples({ bank, idPrefix }: { bank: SampleItem[]; idPrefix: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      {bank.map((item, i) => {
        const open = openIndex === i;
        const isListening = item.area === "Listening";
        const Icon = AREA_ICON[item.area] ?? BookOpen;
        return (
          <article key={`${idPrefix}-${i}`} className="border border-navy-800/12 bg-white">
            <div className="flex items-center justify-between gap-2 border-b border-navy-800/12 bg-ivory-200/40 px-5 py-3">
              <span className="flex items-center gap-2">
                <Icon size={13} className="text-brass-500" />
                <span className="font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">{item.area}</span>
                <span className="text-navy-800/25">·</span>
                <span className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-900">{item.type}</span>
              </span>
            </div>

            <div className="px-5 py-5">
              {item.passage && (
                <div className="mb-4 border border-navy-800/10 bg-ivory-200/25 px-4 py-3">
                  <p className="flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.1em] text-navy-800/55">
                    {isListening ? "Audio Transcript" : "Passage"}
                  </p>
                  <p
                    className="mt-1.5 whitespace-pre-line text-[12.5px] leading-relaxed text-charcoal-900"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {item.passage.replace("[Audio transcript]\n", "")}
                  </p>
                </div>
              )}

              <p className="whitespace-pre-line text-[13.5px] font-medium leading-relaxed text-navy-950">
                {item.question}
              </p>

              {item.choices ? (
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
              ) : (
                <div className="mt-4 border border-navy-800/12 bg-ivory-200/25 p-4">
                  <p className="flex items-center gap-1.5 font-label text-[9.5px] uppercase tracking-[0.12em] text-charcoal-600/60">
                    <PenLine size={12} className="text-brass-500" /> {isListening || item.area === "Speaking" ? "Speak your response" : "Write your response"}
                  </p>
                  <div className="mt-3 space-y-3">
                    <div className="h-px w-full bg-navy-800/12" />
                    <div className="h-px w-full bg-navy-800/12" />
                    <div className="h-px w-2/3 bg-navy-800/12" />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="mt-4 flex w-full items-center justify-between gap-2 border border-brass-500/35 bg-brass-500/[0.06] px-3.5 py-2.5 text-[12.5px] font-medium text-brass-600 transition-colors hover:bg-brass-500/[0.1]"
              >
                {item.choices ? "정답 및 해설 보기" : "모범 답안 및 채점 기준 보기"}
                <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="mt-3 border-l-2 border-brass-500 bg-ivory-200/30 p-4">
                  <p className="flex items-center gap-2 font-label text-[9.5px] uppercase tracking-[0.1em] text-brass-600">
                    <Check size={13} className="text-brass-500" strokeWidth={2.5} />
                    {item.choices ? `정답 ${item.answer}` : "모범 답안"}
                  </p>
                  {!item.choices && (
                    <p className="mt-1.5 text-[12.5px] italic leading-relaxed text-charcoal-900">{item.answer}</p>
                  )}
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
