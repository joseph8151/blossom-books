import Link from "next/link";
import { Sparkles, Headphones, FileSearch } from "lucide-react";
import { Product } from "@/lib/types";
import { trackLabels } from "@/data/products";
import { coverToneFor } from "@/lib/utils";
import { productBadges, isDirectPurchase, priceDisplay } from "@/lib/productMeta";
import { seriesFor, seriesInfo } from "@/data/series";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";

export default function ProductCard({ product }: { product: Product }) {
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
        <BookCoverMockup
          eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
          title={product.title.split(" — ")[0]}
          subtitle={product.examOrCurriculum}
          tone={coverToneFor(product.id)}
          className="max-w-[150px] transition-transform duration-500 group-hover:scale-[0.96]"
        />
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
          {product.titleKo}
        </h3>
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 border border-brass-500/35 bg-brass-500/[0.06] px-2 py-0.5 font-label text-[10px] uppercase tracking-[0.1em] text-brass-500">
          {seriesInfo[seriesFor(product)].name}
        </span>

        <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600 line-clamp-2">
          {product.summaryKo}
        </p>

        {/* 통일 정보 배지 — 모든 카드 동일 포맷 (Grade · Level · Pages · Skills · Answer Guide) */}
        <div className="mt-4 flex flex-wrap gap-1.5">
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
        </div>

        <div className="mt-6 border-t border-navy-800/10 pt-4">
          {/* 가격 · 구매 가능 여부 */}
          <div className="flex items-center justify-between">
            <p className="font-display text-[17px] font-semibold text-navy-950">
              {isDirectPurchase(product) ? (
                priceDisplay(product)
              ) : (
                <span className="text-[15px]">Price on Request</span>
              )}
            </p>
            <span
              className={`font-label text-[9.5px] uppercase tracking-[0.1em] ${
                isDirectPurchase(product) ? "text-brass-500" : "text-burgundy-700"
              }`}
            >
              {isDirectPurchase(product) ? "Direct Purchase" : "Custom / Extended"}
            </span>
          </div>

          <div className="mt-3.5 flex gap-2">
            <Link
              href={`/books/${product.id}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-navy-900 px-3.5 py-2 text-[12.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
            >
              상세 보기
            </Link>
            <Link
              href={`/books/${product.id}#sample`}
              className="inline-flex items-center justify-center gap-1.5 border border-navy-800/25 px-3.5 py-2 text-[12.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
            >
              <FileSearch size={13} />
              무료 샘플
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
