"use client";

// 추천 결과 안에서 교재를 미리 확인시키는 블록.
// 표지 · 목차 · 실제 문제 · 해설을 한 화면에 보여줘, 상담 버튼을 누르기 전에
// 상품을 충분히 확인할 수 있게 합니다. (상담 진입 장벽을 낮추는 것이 목적)

import Link from "next/link";
import { BookOpen, KeyRound, ArrowRight } from "lucide-react";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";
import SampleFigure from "@/components/books/SampleFigure";
import { Product } from "@/lib/types";
import { previewItem } from "@/lib/sampleSelection";
import { insideTheWorkbook, usesKoreanExplanation, pagesLabel } from "@/lib/productMeta";
import { coverToneFor, blossomLevel } from "@/lib/utils";

const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

export default function WorkbookPreview({ product }: { product: Product }) {
  const item = previewItem(product);
  const contents = insideTheWorkbook(product);
  const explainKo = usesKoreanExplanation(product);
  const explanation = explainKo ? item?.whyKo : item?.why;

  return (
    <div className="border border-navy-800/12 bg-ivory-100">
      <div className="flex items-center justify-between gap-3 border-b border-navy-800/10 px-5 py-3">
        <p className="font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/55">Inside this workbook</p>
        <span className="font-label text-[10px] tracking-[0.08em] text-charcoal-600">
          {pagesLabel(product)} · {blossomLevel(product.difficulty)}
        </span>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[150px_1fr] lg:gap-7">
        {/* 표지 */}
        <div>
          <BookCoverMockup
            eyebrow="Student Workbook"
            title={product.title.split(" — ")[0]}
            subtitle={product.examOrCurriculum}
            tone={coverToneFor(product.id)}
            size="sm"
            className="mx-auto w-full max-w-[150px]"
          />
          <p className="mt-2 text-center font-label text-[9.5px] uppercase tracking-[0.1em] text-navy-800/45">Cover</p>
        </div>

        {/* 목차 */}
        <div>
          <p className="flex items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">
            <BookOpen size={12} /> Contents
          </p>
          <div className="mt-2.5 space-y-2.5">
            {contents.map((c) => (
              <div key={c.area}>
                <p className="text-[12px] font-medium text-navy-950">{c.area}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-charcoal-600">{c.items.slice(0, 7).join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 실제 문제 + 해설 */}
      {item && (
        <div className="border-t border-navy-800/10 px-5 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">Actual practice question</span>
            <span className="border border-navy-800/15 px-2 py-0.5 font-label text-[9.5px] uppercase tracking-[0.08em] text-charcoal-600">
              {item.area} · {item.type}
            </span>
          </div>

          <div className="mt-3 border border-navy-800/12 bg-ivory-200 p-4">
            {item.passage && (
              <p className="whitespace-pre-line border-l-2 border-brass-500/50 pl-3 text-[12.5px] leading-relaxed text-charcoal-900">
                {item.passage}
              </p>
            )}
            {item.figure && (
              <div className="mt-3 flex justify-center">
                <SampleFigure name={item.figure} />
              </div>
            )}
            <p className="mt-3 text-[13px] font-medium leading-relaxed text-navy-950">{item.question}</p>
            {item.choices && (
              <ul className="mt-2.5 space-y-1.5">
                {item.choices.map((c, i) => (
                  <li key={c} className="flex items-start gap-2 text-[12.5px] leading-snug text-charcoal-900">
                    <span className="mt-[1px] font-label text-[10px] text-navy-800/55">{OPTION_LETTERS[i]}</span>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 해설 워크시트 */}
          <div className="mt-3 border border-brass-500/30 bg-brass-500/[0.06] p-4">
            <p className="flex items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.12em] text-brass-500">
              <KeyRound size={12} /> Answer & Explanation
            </p>
            <p className="mt-2 text-[12.5px] font-medium text-navy-950">정답 · {item.answer}</p>
            {explanation && <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-900">{explanation}</p>}
            {explainKo && item.wrongKo && (
              <p className="mt-1.5 text-[12px] leading-relaxed text-charcoal-600">{item.wrongKo}</p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/books/${product.id}#sample`}
              className="group inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              전체 샘플 더 보기
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
