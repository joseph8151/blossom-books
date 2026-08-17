"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { fromPriceKRW } from "@/data/pricing";

// 가격 직후의 망설임을 그대로 다루는 FAQ.
// 금액 표현은 pricing 데이터에서 파생시켜 가격 정책과 어긋나지 않게 합니다.
const priceInManwon = Math.round(fromPriceKRW / 10000);

const faqs = [
  {
    q: `${priceInManwon}만원짜리 문제집은 일반 문제집과 무엇이 다른가요?`,
    a: "Blossom Books는 일반적인 학년별 문제집보다 목표 시험, 현재 수준, 필요한 Skill을 기준으로 구성된 Prep Workbook입니다. Student Workbook과 정답·상세 해설이 함께 제공됩니다.",
  },
  {
    q: "처음부터 100P를 구매해야 하나요?",
    a: "아닙니다. 시험일까지 남은 기간과 필요한 학습량에 따라 40P 또는 60P로도 충분할 수 있습니다. 필요 이상의 분량을 권하지 않습니다.",
  },
  {
    q: "구매하기 전에 문제를 볼 수 있나요?",
    a: "네. 무료 Sample을 통해 문제 구성과 난이도, 해설 스타일을 먼저 확인할 수 있습니다.",
  },
  {
    q: "아이에게 너무 어렵거나 쉬우면 어떻게 하나요?",
    a: "결제 전 학생의 학년, 현재 수준, 준비 시험을 간단히 확인한 뒤 적합한 교재를 안내합니다.",
  },
  {
    q: "교재만 보내주고 끝나는 건가요?",
    a: "구매 과정에서 교재 선택 및 수령에 관한 공식 카카오톡 Purchase Support를 제공합니다.",
  },
];

export default function PurchaseFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Before you decide</span>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
              구매 전 가장 많이 고민하는 질문
            </h2>
            <Link
              href="/books"
              className="mt-7 inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-5 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
            >
              <FileSearch size={15} />
              무료 Sample 보기
            </Link>
          </div>

          <div className="divide-y divide-navy-800/12 border-y border-navy-800/12">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-[15.5px] font-medium leading-snug text-navy-950 sm:text-[16.5px]">
                    {f.q}
                  </span>
                  <Plus
                    size={18}
                    className={cn(
                      "mt-0.5 shrink-0 text-brass-500 transition-transform duration-200",
                      open === i && "rotate-45"
                    )}
                  />
                </button>
                {open === i && (
                  <p className="-mt-1 pb-5 pr-8 text-[13.5px] leading-relaxed text-charcoal-600">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
