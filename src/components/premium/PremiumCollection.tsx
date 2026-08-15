import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { premiumEligible } from "@/lib/productMeta";
import { PREMIUM_BONUS_COUNT } from "@/data/premiumBonus";
import { premiumVolume, formatKRW } from "@/data/pricing";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";
import { coverToneFor } from "@/lib/utils";
import { trackLabels } from "@/data/products";

// 200P+ 대상 교재 모음 — premiumEligible() 로 자동 수집합니다.
// 상품이 추가되거나 구성이 바뀌면 별도 수정 없이 이 섹션에 반영됩니다.

export default function PremiumCollection() {
  const items = products.filter(premiumEligible).slice(0, 8);
  if (!items.length) return null;

  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">
              Our Most Complete Workbooks
            </span>
            <h2 className="mt-3 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
              200P+ PREMIUM COLLECTION
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-charcoal-600">
              200페이지 이상 구성을 선택할 수 있는 교재입니다. 어떤 교재를 고르셔도 Premium Bonus Materials{" "}
              {PREMIUM_BONUS_COUNT}종이 함께 제공됩니다.
            </p>
          </div>
          <Link
            href="/books?premium=1"
            className="group inline-flex shrink-0 items-center gap-2 border border-navy-800/25 px-5 py-3 text-[13px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
          >
            Explore Premium Workbooks
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-px border border-navy-800/12 bg-navy-800/12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/books/${p.id}`}
              className="group flex flex-col bg-ivory-100 p-5 transition-colors hover:bg-ivory-200/50"
            >
              <div className="flex items-start justify-between gap-3">
                <BookCoverMockup
                  eyebrow="Student Workbook"
                  title={p.title.split(" — ")[0]}
                  subtitle={p.examOrCurriculum}
                  tone={coverToneFor(p.id)}
                  size="sm"
                  className="w-[92px] shrink-0 transition-transform duration-500 group-hover:scale-[0.97]"
                />
                <span className="border border-brass-500/45 px-1.5 py-0.5 font-label text-[8px] uppercase tracking-[0.1em] text-brass-500">
                  200P+
                </span>
              </div>
              <p className="mt-4 font-display text-[15px] font-semibold leading-snug text-navy-950">{p.titleKo}</p>
              <p className="mt-1 text-[11.5px] text-charcoal-600">
                {trackLabels[p.track]} · {p.gradeRange}
              </p>
              <p className="mt-3 border-t border-navy-800/10 pt-2.5 font-label text-[9px] uppercase tracking-[0.1em] text-brass-500">
                {PREMIUM_BONUS_COUNT} Bonus Materials
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-[12px] text-charcoal-600/75">
          200P+ Premium Edition {formatKRW(premiumVolume.priceKRW)} · 본교재와 Premium Bonus Materials가 함께
          제공됩니다.
        </p>
      </div>
    </section>
  );
}
