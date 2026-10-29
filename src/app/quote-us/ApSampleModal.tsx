"use client";

import { useEffect, useState } from "react";
import { X, Check, PenLine, FileSearch } from "lucide-react";
import { SampleItem } from "@/data/sampleBank";
import SampleFigure from "@/components/books/SampleFigure";

const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

function SampleCard({ item, index }: { item: SampleItem; index: number }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border border-navy-800/15 bg-ivory-100 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-navy-900 font-display text-[12px] font-semibold text-ivory-100">
          {index + 1}
        </span>
        <span className="font-label text-[9.5px] uppercase tracking-[0.12em] text-brass-500">{item.area}</span>
        <span className="text-navy-800/25">·</span>
        <span className="font-label text-[9.5px] uppercase tracking-[0.1em] text-navy-900">{item.type}</span>
      </div>

      {item.passage && (
        <div className="mt-3.5 border border-navy-800/12 bg-white px-4 py-3.5">
          <p
            className="whitespace-pre-line text-[13px] leading-[1.8] text-charcoal-900"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {item.passage}
          </p>
        </div>
      )}

      <p className="mt-3.5 whitespace-pre-line text-[13.5px] font-medium leading-relaxed text-navy-950">
        {item.question}
      </p>

      {item.figure && (
        <div className="mt-3.5 flex justify-center border border-navy-800/10 bg-white px-3 py-4">
          <SampleFigure name={item.figure} />
        </div>
      )}

      {item.choices ? (
        <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
          {item.choices.map((c, ci) => (
            <div
              key={ci}
              className="flex items-center gap-2.5 border border-navy-800/15 bg-white px-3 py-2 text-[13px] text-charcoal-900"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-navy-800/25 font-label text-[10.5px] font-semibold text-navy-800">
                {OPTION_LETTERS[ci]}
              </span>
              {c}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3.5 border border-navy-800/12 bg-white p-3.5">
          <p className="flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.1em] text-charcoal-600/60">
            <PenLine size={12} className="text-brass-500" /> Write your response
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
        onClick={() => setShowAnswer((v) => !v)}
        className="mt-3.5 text-[12px] font-medium text-navy-800/70 underline underline-offset-2 transition-colors hover:text-navy-900"
      >
        {showAnswer ? "정답 숨기기" : "정답 보기"}
      </button>

      {showAnswer && (
        <div className="mt-3 border-t border-ivory-300 pt-3">
          <span className="inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/10 px-2.5 py-1 text-[13px] font-medium text-navy-950">
            <Check size={13} className="text-brass-500" strokeWidth={2.5} /> {item.answer}
          </span>
          <p className="mt-2 text-[12.5px] leading-relaxed text-charcoal-700">{item.whyKo}</p>
        </div>
      )}
    </div>
  );
}

export default function ApSampleModal({
  title,
  items,
  open,
  onClose,
}: {
  title: string;
  items: SampleItem[];
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-950/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="my-4 w-full max-w-2xl border border-navy-800/15 bg-white shadow-[0_30px_80px_-28px_rgba(13,22,38,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-navy-800/12 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">Sample</span>
            <p className="mt-1 font-display text-[18px] font-semibold text-navy-950">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-navy-900/5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-7">
          {items.map((item, i) => (
            <SampleCard key={i} item={item} index={i} />
          ))}
          <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-charcoal-600/60">
            <FileSearch size={13} className="mt-0.5 shrink-0 text-brass-500" />
            실제 시험의 평가 Skill과 College Board 공식 유닛을 참고해 독립 제작한 예시이며, 기출·유출문제가
            아닙니다.
          </p>
        </div>
      </div>
    </div>
  );
}
