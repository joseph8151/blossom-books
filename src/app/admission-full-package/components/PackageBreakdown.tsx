"use client";

import { useState } from "react";
import { BookOpen, Languages, Calculator, PenLine, MessageCircle, ClipboardCheck, ChevronDown } from "lucide-react";
import { packageCategories } from "../data";

const categoryIcons: Record<string, typeof BookOpen> = {
  Reading: BookOpen,
  Vocabulary: Languages,
  Math: Calculator,
  Writing: PenLine,
  Interview: MessageCircle,
  "Mock Test": ClipboardCheck,
};

export default function PackageBreakdown() {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const toggle = (title: string) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <section className="border-b border-navy-800/10 bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">Structure</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            Admission Full Package 구성
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packageCategories.map((c) => {
            const Icon = categoryIcons[c.title] ?? BookOpen;
            const open = openSet.has(c.title);
            return (
              <div key={c.title} className="border border-navy-800/10 bg-white transition-shadow hover:shadow-card">
                <button
                  type="button"
                  onClick={() => toggle(c.title)}
                  className="flex w-full flex-col p-6 text-left"
                  aria-expanded={open}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef1e8] text-[#5f6f52]">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="font-display text-[26px] font-semibold leading-none text-[#5f6f52]/25">
                      {c.n}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-[18px] font-semibold text-navy-950">{c.title}</p>
                  <p className="mt-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-charcoal-600/60">
                    {c.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#5f6f52]">
                    {open ? "세부 항목 접기" : "세부 항목 보기"}
                    <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {open && (
                  <ul className="space-y-1.5 border-t border-navy-800/10 px-6 pb-6 pt-4 text-[12.5px] leading-relaxed text-charcoal-600">
                    {c.items.map((item) => (
                      <li key={item} className="flex gap-1.5">
                        <span className="text-[#5f6f52]">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
