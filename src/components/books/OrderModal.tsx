"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, MessageCircle, FileSearch, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { flexibleVolumes, srVolumes, starterOption, formatKRW } from "@/data/pricing";
import { offersVolumes, offersSrVolumes, hasStarter, isDirectPurchase } from "@/lib/productMeta";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// 상품 카드에서 "이 교재 주문하기"를 눌렀을 때 카카오톡으로 바로 튕기지 않고
// 먼저 보여주는 주문 확인 모달. 상품명·분량·가격·주문 절차를 한 번 더
// 확인시킨 뒤에만 카카오톡으로 연결합니다. 실제 결제는 이 사이트에서
// 진행하지 않습니다 — 카카오톡 상담 후 결제 안내로 이어집니다.
export default function OrderModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const srFlexible = offersSrVolumes(product);
  const flexible = offersVolumes(product);
  const direct = isDirectPurchase(product);
  const vols = srFlexible
    ? srVolumes
    : hasStarter(product)
    ? [starterOption, ...flexibleVolumes]
    : flexibleVolumes;
  const defaultPages = srFlexible ? srVolumes[0].pages : 60;
  const [pages, setPages] = useState(defaultPages);
  const selected = vols.find((v) => v.pages === pages) ?? vols[0];

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function goKakao() {
    const lines = [
      "안녕하세요. Blossom Books 홈페이지에서 보고 주문 문의드립니다.",
      `상품: ${product.titleKo}`,
    ];
    if (direct && (flexible || srFlexible)) {
      lines.push(`선택: ${selected.label} (${selected.tier})`);
      lines.push(`가격: ${formatKRW(selected.priceKRW)}`);
    } else if (direct && product.pageCount) {
      lines.push(`분량: ${product.pageCount}P`);
    }
    lines.push("주문을 진행하고 싶습니다.");
    try {
      navigator.clipboard?.writeText(lines.join("\n"));
    } catch {
      /* 클립보드 미지원 환경은 무시 */
    }
    trackEvent("click_kakao", { product_id: product.id, location: "order_modal" });
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-navy-950/55 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-t-2xl bg-ivory-100 p-6 shadow-card sm:rounded-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
              {product.examOrCurriculum}
            </p>
            <p className="mt-1 font-display text-[19px] font-semibold leading-snug text-navy-950">
              {product.titleKo} 주문
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-charcoal-600 transition-colors hover:bg-navy-800/5"
          >
            <X size={18} />
          </button>
        </div>

        {direct && (flexible || srFlexible) && (
          <div className="mt-5">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">분량 선택</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {vols.map((v) => (
                <button
                  key={v.pages}
                  type="button"
                  onClick={() => {
                    setPages(v.pages);
                    trackEvent("select_page_option", { product_id: product.id, pages: v.pages, location: "order_modal" });
                  }}
                  className={cn(
                    "border px-3.5 py-2 text-[13px] font-medium transition-colors",
                    v.pages === pages
                      ? "border-navy-900 bg-ivory-200/70 text-navy-950"
                      : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-y border-navy-800/10 py-4">
          <div>
            <p className="text-[13px] text-charcoal-600">
              {direct ? `${selected.label} · ${selected.tier}` : "구성"}
            </p>
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-charcoal-600/80">
              <span>PDF Workbook</span>
              <span>정답 · 상세해설 포함</span>
            </p>
          </div>
          <p className="font-display text-[24px] font-semibold text-navy-950">
            {direct ? formatKRW(selected.priceKRW) : "Price on Request"}
          </p>
        </div>

        <div className="mt-5">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">주문 절차</p>
          <ol className="mt-2.5 space-y-1.5">
            {["카카오톡 주문 요청", "결제 방법 안내", "결제 확인", "PDF 발송"].map((step, i) => (
              <li key={step} className="flex items-center gap-2.5 text-[12.5px] text-charcoal-900">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-navy-900/[0.06] font-label text-[10px] text-navy-800">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={goKakao}
            className="flex w-full items-center justify-center gap-2 bg-navy-900 px-6 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
          >
            <MessageCircle size={16} />
            카카오톡으로 주문 요청
          </button>
          <Link
            href={`/books/${product.id}#sample`}
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
          >
            <FileSearch size={15} />
            샘플 먼저 보기
          </Link>
        </div>

        <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-charcoal-600/70">
          <Check size={12} className="mt-0.5 shrink-0 text-brass-500" />
          결제는 카카오톡 상담 후 계좌이체 또는 카드로 진행되며, 결제 확인 후 PDF가 발송됩니다.
        </p>
      </div>
    </div>
  );
}
