import Link from "next/link";
import { FileCheck2, FileText, Sparkles, MessageCircle, Headphones } from "lucide-react";
import { Product } from "@/lib/types";
import { trackLabels } from "@/data/products";
import { siteConfig } from "@/data/site";
import { coverToneFor } from "@/lib/utils";
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
        <p className="mt-1 text-[12.5px] text-charcoal-600">{product.gradeRange}</p>

        <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600 line-clamp-2">
          {product.summaryKo}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-charcoal-600">
          {product.includesAnswerKey && (
            <span className="inline-flex items-center gap-1">
              <FileCheck2 size={13} className="text-navy-800" /> 정답·해설집 포함
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <FileText size={13} className="text-navy-800" /> PDF 제공
          </span>
          {product.includesAudio && (
            <span className="inline-flex items-center gap-1">
              <Headphones size={13} className="text-navy-800" /> 리스닝 파일
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-2 border-t border-navy-800/10 pt-4">
          <Link
            href={`/books/${product.id}`}
            className="text-[13px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
          >
            상세 보기
          </Link>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-navy-900 px-3.5 py-1.5 text-[12px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
          >
            <MessageCircle size={13} />
            상담
          </a>
        </div>
      </div>
    </div>
  );
}
