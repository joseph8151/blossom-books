"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { faqs } from "@/data/john";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <section className="border-b border-navy-900/12 bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <span className="eyebrow eyebrow--center">Support</span>
          <h1 className="mt-4 font-display text-[28px] font-extrabold text-navy-950 sm:text-[33px]">
            자주 묻는 질문
          </h1>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            가맹 상담 전 궁금하신 점을 확인해보세요. 목록에 없는 내용은 상담을 통해 안내해드립니다.
          </p>
        </div>
      </section>

      <section className="bg-ivory-100 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="space-y-3">
            {faqs.map((item, i) => {
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

          <div className="mt-14 flex flex-col items-center gap-4 pt-4 text-center">
            <p className="font-display text-[17px] font-semibold text-navy-950 sm:text-[19px]">
              더 궁금하신 점이 있으신가요?
            </p>
            <Link
              href="/consultation"
              className="group inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-[13.5px] font-semibold text-navy-950 shadow-coral transition-all hover:-translate-y-0.5 hover:bg-coral-400"
            >
              가맹 상담 신청
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
