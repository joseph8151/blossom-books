"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { faqs } from "@/data/john";
import { cn } from "@/lib/utils";

const preview = faqs.slice(0, 6);

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-b border-navy-900/12 bg-ivory-200 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <span className="eyebrow eyebrow--center">FAQ</span>
        <h2 className="mt-3 text-center font-display text-[26px] font-extrabold text-navy-950 sm:text-[30px]">
          자주 묻는 질문
        </h2>

        <div className="mt-12 space-y-3">
          {preview.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="rounded-2xl bg-white px-6 shadow-card">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-navy-950">{item.q}</span>
                  <Plus
                    size={18}
                    className={cn("shrink-0 text-coral-500 transition-transform duration-300", open && "rotate-45")}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-[grid-template-rows] duration-300",
                    open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  )}
                >
                  <p className="overflow-hidden text-[13.5px] leading-relaxed text-charcoal-600">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 rounded-full border border-navy-900/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-900/50"
          >
            FAQ 전체보기
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
