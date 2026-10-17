"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Check, FileSearch, Star } from "lucide-react";
import SampleFigure from "@/components/books/SampleFigure";
import { IbPage, IbSample } from "../ibSampleContent";

function ExtraQuestion({ q }: { q: { prompt: string; answer: string } }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-4 border-t border-ivory-300 pt-3.5">
      <p className="text-[13px] leading-relaxed text-navy-950">{q.prompt}</p>
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="mt-2 text-[11.5px] font-medium text-navy-800/70 underline underline-offset-2 transition-colors hover:text-navy-900"
      >
        {show ? "정답 숨기기" : "정답 보기"}
      </button>
      {show && (
        <p className="mt-1.5 inline-flex items-start gap-1.5 border border-brass-500/40 bg-brass-500/10 px-2.5 py-1.5 text-[12.5px] text-navy-950">
          <Check size={13} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.5} /> {q.answer}
        </p>
      )}
    </div>
  );
}

function PageView({ page }: { page: IbPage }) {
  switch (page.kind) {
    case "data":
      return (
        <div>
          <p className="font-label text-[9px] uppercase tracking-[0.12em] text-charcoal-600/60">Data</p>
          <p className="mt-1.5 whitespace-pre-line text-[13px] leading-relaxed text-charcoal-900">{page.caption}</p>
          {page.figure && (
            <div className="mt-3.5 flex justify-center border border-navy-800/10 bg-ivory-100 px-3 py-4">
              <SampleFigure name={page.figure} />
            </div>
          )}
          {page.table && (
            <div className="mt-3.5 overflow-x-auto border border-navy-800/12">
              <table className="w-full border-collapse text-[12px]">
                <tbody>
                  {[page.table.headers, ...page.table.rows].map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`border border-navy-800/10 px-3 py-2 text-center ${
                            ri === 0 || ci === 0 ? "bg-ivory-200/50 font-medium text-navy-950" : "text-charcoal-900"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {page.note && <p className="mt-3 whitespace-pre-line text-[12px] leading-relaxed text-charcoal-600/80">{page.note}</p>}
          {page.extraQuestion && <ExtraQuestion q={page.extraQuestion} />}
        </div>
      );

    case "problem":
      return (
        <div>
          <p className="font-label text-[9px] uppercase tracking-[0.12em] text-charcoal-600/60">{page.topic}</p>
          {page.stimulus && (
            <div className="mt-2.5 border border-navy-800/12 bg-ivory-100 px-4 py-3">
              <p className="text-[12.5px] leading-relaxed text-charcoal-900">{page.stimulus}</p>
            </div>
          )}
          {page.figure && (
            <div className="mt-3.5 flex justify-center border border-navy-800/10 bg-ivory-100 px-3 py-4">
              <SampleFigure name={page.figure} />
            </div>
          )}
          <div className="mt-3.5 space-y-2.5">
            {page.parts.map((p) => (
              <p key={p.label} className="text-[13.5px] leading-relaxed text-navy-950">
                <span className="font-medium">{p.label}</span> {p.prompt}
              </p>
            ))}
          </div>
          <div className="mt-4 border-t border-ivory-300 pt-3">
            <p className="font-label text-[9px] uppercase tracking-[0.1em] text-brass-500">이 페이지에서 확인하는 것</p>
            <ul className="mt-1.5 space-y-1 text-[11.5px] leading-relaxed text-charcoal-600">
              {page.checksFor.map((c) => (
                <li key={c}>· {c}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "explanation":
      return (
        <div className="space-y-4">
          {page.entries.map((e) => (
            <div key={e.label} className="border-t border-ivory-300 pt-3 first:border-t-0 first:pt-0">
              <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-500">{e.label}</p>
              {e.why && (
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-700">
                  <span className="font-medium text-navy-900">Why </span>
                  {e.why}
                </p>
              )}
              <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-700">
                <span className="font-medium text-navy-900">Approach </span>
                {e.approach}
              </p>
              {e.working && (
                <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-700">
                  <span className="font-medium text-navy-900">Working </span>
                  {e.working}
                </p>
              )}
              <p className="mt-1.5 inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/10 px-2.5 py-1 text-[13px] font-medium text-navy-950">
                <Check size={12} className="text-brass-500" strokeWidth={2.5} /> {e.answer}
              </p>
              {e.commonMistake && (
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-charcoal-600/80">
                  <span className="font-medium">Common mistake </span>
                  {e.commonMistake}
                </p>
              )}
            </div>
          ))}
        </div>
      );

    case "checklist":
      return (
        <div>
          <p className="font-display text-[15px] font-semibold text-navy-950">{page.title}</p>
          <ul className="mt-3 space-y-2">
            {page.items.map((it) => (
              <li key={it} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-charcoal-900">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-navy-800/35" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      );

    case "planner":
      return (
        <div>
          <p className="font-display text-[15px] font-semibold text-navy-950">{page.title}</p>
          {page.note && <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">{page.note}</p>}
          {page.figure && (
            <div className="mt-3.5 flex justify-center border border-navy-800/10 bg-ivory-100 px-3 py-4">
              <SampleFigure name={page.figure} />
            </div>
          )}
          <div className="mt-3.5 grid gap-px overflow-hidden border border-navy-800/12 bg-navy-800/12" style={{ gridTemplateColumns: `repeat(${page.columns.length}, 1fr)` }}>
            {page.columns.map((c) => (
              <div key={c} className="bg-ivory-200/50 px-2.5 py-2 text-center font-label text-[9.5px] uppercase tracking-[0.04em] text-navy-900">
                {c}
              </div>
            ))}
            {page.columns.map((c) => (
              <div key={`${c}-row`} className="h-16 bg-white" />
            ))}
          </div>
        </div>
      );

    case "flow":
      return (
        <div>
          <p className="font-display text-[15px] font-semibold text-navy-950">{page.title}</p>
          <div className="mt-4 flex flex-col items-center gap-1">
            {page.steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center">
                <div className="w-full min-w-[180px] max-w-[320px] border border-navy-800/20 bg-white px-4 py-2.5 text-center text-[12.5px] font-medium text-navy-950">
                  {s}
                </div>
                {i < page.steps.length - 1 && <span className="my-1 text-navy-800/40">↓</span>}
              </div>
            ))}
          </div>
          {page.note && <p className="mt-4 text-[11.5px] leading-relaxed text-charcoal-600/70">{page.note}</p>}
        </div>
      );

    case "terms":
      return (
        <div>
          <p className="font-display text-[15px] font-semibold text-navy-950">{page.title}</p>
          <div className="mt-3 space-y-3">
            {page.terms.map((t) => (
              <div key={t.term} className="border border-navy-800/12 bg-white p-3.5">
                <p className="font-label text-[11px] uppercase tracking-[0.08em] text-brass-500">{t.term}</p>
                <p className="mt-1 text-[12.5px] text-charcoal-900">{t.meaning}</p>
                <p className="mt-1.5 text-[11.5px] italic leading-relaxed text-charcoal-600">{t.example}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "examHeader":
      return (
        <div className="text-center">
          <p className="font-label text-[9px] uppercase tracking-[0.14em] text-charcoal-600/60">IB Practice Mock · Blossom Books</p>
          <p className="mt-2 font-display text-[20px] font-semibold text-navy-950">Subject: {page.subject}</p>
          <div className="mx-auto mt-4 grid max-w-[320px] gap-1.5 text-left">
            {page.info.map((i) => (
              <div key={i.label} className="flex items-center justify-between border-b border-ivory-300 py-1.5 text-[12.5px]">
                <span className="text-charcoal-600">{i.label}</span>
                <span className="font-medium text-navy-950">{i.value}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "result":
      return (
        <div>
          <p className="font-display text-[15px] font-semibold text-navy-950">{page.title}</p>
          <div className="mt-3 space-y-2">
            {page.bars.map((b) => (
              <div key={b.label} className="flex items-center justify-between gap-3">
                <span className="text-[12.5px] text-charcoal-900">{b.label}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < b.filled ? "fill-brass-500 text-brass-500" : "text-navy-800/15"} />
                  ))}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600/70">{page.note}</p>
        </div>
      );

    default:
      return null;
  }
}

const PAGE_LABELS: Record<IbPage["kind"], string> = {
  data: "Data",
  problem: "Problem",
  explanation: "Explanation",
  checklist: "Checklist",
  planner: "Planner",
  flow: "Flow",
  terms: "Terms",
  examHeader: "Cover",
  result: "Result",
};

export default function IbSampleModal({
  title,
  sample,
  open,
  onClose,
}: {
  title: string;
  sample: IbSample | undefined;
  open: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);

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

  if (!open || !sample) return null;
  const current = sample.pages[page];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="my-4 w-full max-w-xl border border-navy-800/15 bg-white shadow-[0_30px_80px_-28px_rgba(13,22,38,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-navy-800/12 px-5 py-4 sm:px-7">
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

        <div className="px-5 py-5 sm:px-7">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {sample.pages.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                className={`border px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.1em] transition-colors ${
                  i === page ? "border-navy-900 bg-navy-900 text-ivory-100" : "border-ivory-300 text-charcoal-600"
                }`}
              >
                {i + 1}. {PAGE_LABELS[p.kind]}
              </button>
            ))}
          </div>

          <div className="mt-4 border border-navy-800/15 bg-ivory-100 p-5 sm:p-6">
            <PageView page={current} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="inline-flex items-center gap-1 border border-navy-800/20 px-3 py-1.5 text-[12px] text-navy-900 transition-colors disabled:opacity-30 enabled:hover:border-navy-800/45"
            >
              <ChevronLeft size={14} /> 이전
            </button>
            <span className="font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600">
              {page + 1} / {sample.pages.length}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, sample.pages.length - 1))}
              disabled={page === sample.pages.length - 1}
              className="inline-flex items-center gap-1 border border-navy-800/20 px-3 py-1.5 text-[12px] text-navy-900 transition-colors disabled:opacity-30 enabled:hover:border-navy-800/45"
            >
              다음 <ChevronRight size={14} />
            </button>
          </div>

          <p className="mt-5 flex items-start gap-2 border-t border-ivory-300 pt-4 text-[11px] leading-relaxed text-charcoal-600/60">
            <FileSearch size={13} className="mt-0.5 shrink-0 text-brass-500" />
            Independently created by Blossom Books. Unofficial study material. Not affiliated with or endorsed by
            the International Baccalaureate Organization.
          </p>
        </div>
      </div>
    </div>
  );
}
