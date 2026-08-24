"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Headphones, FileSearch, MessageCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { trackLabels } from "@/data/products";
import { coverToneFor } from "@/lib/utils";
import { productBadges, priceDisplay, explanationLanguage } from "@/lib/productMeta";
import { seriesFor, seriesInfo } from "@/data/series";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";
import { BlossomSeal } from "@/components/books/BlossomSeal";
import WishlistButton from "@/components/books/WishlistButton";
import OrderModal from "@/components/books/OrderModal";
import { trackEvent } from "@/lib/analytics";

// 가격을 명확히 보여주는 카드 — 방문자가 목록에서 바로 가격까지 확인할 수
// 있어야 카카오톡 문의까지 이어질 확률이 높아집니다 (Smart Pricing 방식은
// 폐기: 가격을 숨기면 오히려 이탈이 늘었습니다).
export default function ProductCard({ product }: { product: Product }) {
  const lang = explanationLanguage(product);
  const coreAreas = product.units.slice(0, 3).join(" · ");
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <div className="lift group relative flex flex-col overflow-hidden border border-navy-800/12 bg-ivory-100 shadow-card">
      {/* 호버 시 상단 브래스 하이라이트 */}
      <span className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brass-500 to-brass-400 transition-transform duration-300 group-hover:scale-x-100" />
      <div className="relative flex items-center justify-center bg-gradient-to-b from-ivory-200/80 to-ivory-200/30 py-9">
        {product.sampleAvailable && (
          <span className="absolute left-3.5 top-3.5 z-10 border border-brass-500/40 bg-ivory-100/90 px-2 py-1 font-label text-[9px] uppercase tracking-[0.14em] text-brass-500">
            무료 샘플
          </span>
        )}
        <WishlistButton productId={product.id} className="absolute right-3 top-3 z-30" />
        <BookCoverMockup
          eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
          title={product.title.split(" — ")[0]}
          subtitle={product.examOrCurriculum}
          tone={coverToneFor(product.id)}
          size="sm"
          className="max-w-[150px] transition-transform duration-500 group-hover:scale-[0.96]"
        />

        {/* 호버 시 샘플 페이지 썸네일 + CTA */}
        {product.sampleAvailable && (
          <Link
            href={`/books/${product.id}#sample`}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 bg-navy-950/0 opacity-0 transition-all duration-300 group-hover:bg-navy-950/75 group-hover:opacity-100"
          >
            <div className="flex gap-1.5">
              {product.units.slice(0, 3).map((u, i) => (
                <span
                  key={i}
                  className="flex h-16 w-11 translate-y-2 flex-col items-center justify-center border border-ivory-100/35 bg-ivory-100/10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ transitionDelay: `${80 + i * 70}ms` }}
                >
                  <FileSearch size={12} className="text-ivory-100/50" />
                  <span className="mt-1 px-1 text-center font-label text-[7px] uppercase leading-tight tracking-wide text-ivory-100/85 line-clamp-2">{u}</span>
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ivory-100">
              <FileSearch size={14} /> 실제 문제 확인하기
            </span>
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
            {trackLabels[product.track]}
          </span>
          {product.materialType === "custom" && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-burgundy-700">
              <Sparkles size={11} /> 주문 제작
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug text-navy-950">
          <Link
            href={`/books/${product.id}`}
            onClick={() => trackEvent("select_product", { product_id: product.id, location: "product_card" })}
            className="transition-colors hover:text-brass-500"
          >
            {product.titleKo}
          </Link>
        </h3>
        <p className="mt-1 text-[12px] text-charcoal-600">{product.subject}</p>
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 border border-brass-500/35 bg-brass-500/[0.06] px-2 py-0.5 font-label text-[10px] uppercase tracking-[0.1em] text-brass-500">
          {seriesInfo[seriesFor(product)].name}
        </span>

        <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600 line-clamp-2">
          {product.summaryKo}
        </p>

        {/* 핵심 영역 */}
        {coreAreas && (
          <p className="mt-3 font-label text-[10.5px] uppercase tracking-[0.05em] text-navy-800/55 line-clamp-1">
            {coreAreas}
          </p>
        )}

        {/* 통일 정보 배지 — Grade · Level · Pages · Skills · Answer Guide (가격 아님) */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {productBadges(product).map((b) => (
            <span
              key={b}
              className="border border-navy-800/15 bg-ivory-200/50 px-2 py-1 font-label text-[10px] uppercase tracking-[0.06em] text-navy-800/80"
            >
              {b}
            </span>
          ))}
          {product.includesAudio && (
            <span className="inline-flex items-center gap-1 border border-navy-800/15 bg-ivory-200/50 px-2 py-1 font-label text-[10px] uppercase tracking-[0.06em] text-navy-800/80">
              <Headphones size={11} /> Audio
            </span>
          )}
          {product.includesAnswerKey && (
            <span className="border border-brass-500/30 bg-brass-500/[0.05] px-2 py-1 font-label text-[10px] uppercase tracking-[0.06em] text-brass-500">
              {lang.labelEn}
            </span>
          )}
        </div>

        <div className="mt-6 border-t border-navy-800/10 pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[20px] font-semibold text-navy-950">{priceDisplay(product)}</p>
            <BlossomSeal />
          </div>

          <div className="mt-3 flex gap-2">
            <Link
              href={`/books/${product.id}#sample`}
              onClick={() => trackEvent("click_sample", { product_id: product.id, location: "product_card" })}
              className="inline-flex items-center justify-center gap-1.5 border border-navy-800/25 px-3.5 py-2 text-[12.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
            >
              <FileSearch size={13} />
              샘플 보기
            </Link>
            <button
              type="button"
              onClick={() => {
                trackEvent("click_order", { product_id: product.id, location: "product_card" });
                setOrderOpen(true);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-navy-900 px-3.5 py-2 text-[12.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
            >
              <MessageCircle size={13} />
              이 교재 주문하기
            </button>
          </div>
        </div>
      </div>

      <OrderModal product={product} open={orderOpen} onClose={() => setOrderOpen(false)} />
    </div>
  );
}
