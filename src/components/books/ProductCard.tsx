import Link from "next/link";
import { FileCheck2, FileText, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import { trackLabels } from "@/data/products";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";

function formatPrice(product: Product) {
  if (product.priceKRW) return `${product.priceKRW.toLocaleString("ko-KR")}원`;
  return "상담 문의";
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col border border-navy-800/12 bg-ivory-100 transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(13,22,38,0.35)]">
      <div className="flex items-center justify-center bg-ivory-200/70 py-8">
        <BookCoverMockup
          eyebrow={product.materialType === "existing" ? "Student Workbook" : "Custom Order"}
          title={product.title.split(" — ")[0]}
          subtitle={product.examOrCurriculum}
          tone={product.coverAccent === "navy" ? "navy" : "ivory"}
          className="max-w-[150px] scale-90"
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
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-navy-800/10 pt-4">
          <span className="font-display text-[17px] font-semibold text-navy-950">
            {formatPrice(product)}
          </span>
          <Link
            href={`/books/${product.id}`}
            className="text-[13px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
          >
            상세 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
