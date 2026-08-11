"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, MessageCircle, Check, FileSearch, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";
import { volumeOptions, extendedOption, formatKRW, volumeByPages } from "@/data/pricing";
import { offersVolumes } from "@/lib/productMeta";
import { siteConfig } from "@/data/site";

const trustItems = [
  "구매 전 Sample 확인 가능",
  "상세 정답 및 해설 포함",
  "Digital PDF 제공",
  "학년·레벨 기반 구성",
  "문의 후 적합한 구성 확인 가능",
];

export default function PurchasePanel({ product, isDirect }: { product: Product; isDirect: boolean }) {
  const flexible = offersVolumes(product); // 40/60/100 분량 선택 가능 여부
  const fixedVol = !flexible && product.pageCount ? volumeByPages(product.pageCount) : undefined;
  const [pages, setPages] = useState(flexible ? 60 : fixedVol?.pages ?? 60); // 기본값: BEST VALUE
  const selected = volumeOptions.find((v) => v.pages === pages) ?? fixedVol ?? volumeOptions[1];

  const includes = [
    "Student Workbook",
    product.includesAnswerKey ? "Answer Key" : null,
    product.includesDetailedExplanations ? "Detailed Explanation" : null,
    "Digital PDF",
    product.includesAudio ? "Listening Audio (MP3)" : null,
  ].filter(Boolean) as string[];

  const buyHref = `/checkout?product=${product.id}&volume=${pages}`;
  const subjectLine = product.units.slice(0, 4).join(" · ");

  return (
    <>
      <div className="border border-navy-800/15 bg-ivory-100 p-6 shadow-card">
        <p className="font-display text-[19px] font-semibold leading-snug text-navy-950">{product.titleKo}</p>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">{subjectLine}</p>

        {isDirect ? (
          <>
            {flexible ? (
              <>
                <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                  Choose Your Prep Volume
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {volumeOptions.map((v) => {
                    const on = v.pages === pages;
                    return (
                      <button
                        key={v.pages}
                        onClick={() => setPages(v.pages)}
                        className={`relative flex flex-col items-center border px-2 py-3 transition-colors ${
                          on ? "border-navy-900 bg-ivory-200/60" : "border-navy-800/20 hover:border-navy-800/40"
                        }`}
                      >
                        {v.badge && (
                          <span className="absolute -top-2 bg-brass-500 px-1.5 py-0.5 font-label text-[8px] uppercase tracking-[0.08em] text-navy-950">
                            {v.badge}
                          </span>
                        )}
                        <span className="font-display text-[17px] font-semibold text-navy-950">{v.label}</span>
                        <span className="mt-0.5 text-[11px] text-charcoal-600">{formatKRW(v.priceKRW)}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11.5px] text-charcoal-600/80">
                  {extendedOption.label} 이상 · 추가 영역은{" "}
                  <a href={siteConfig.kakaoChannelUrl} target="_blank" rel="noreferrer" className="underline">
                    가격 문의
                  </a>
                </p>
              </>
            ) : (
              <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                {selected.tier} · {selected.label}
              </p>
            )}

            <div className="mt-5 flex items-baseline justify-between border-t border-navy-800/12 pt-4">
              <span className="text-[13px] text-charcoal-600">{selected.tier} · {selected.label}</span>
              <span className="font-display text-[24px] font-semibold text-navy-950">
                {formatKRW(selected.priceKRW)}
              </span>
            </div>

            <Link
              href={buyHref}
              className="mt-4 flex items-center justify-center gap-2 bg-navy-900 px-6 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              <ShoppingBag size={16} />
              지금 구매하기
            </Link>
            <p className="mt-2 text-center text-[11px] text-charcoal-600/80">
              PDF 발송 완료 후 환불이 불가합니다.
            </p>
          </>
        ) : (
          <>
            <p className="mt-5 font-display text-[20px] font-semibold text-burgundy-700">Price on Request</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
              시험 유형과 구성에 따라 별도 안내됩니다. 구성을 알려주시면 빠르게 견적을 드립니다.
            </p>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-navy-900 px-6 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
            >
              <MessageCircle size={16} />
              구성·가격 문의
            </a>
          </>
        )}

        <a
          href="#sample"
          className="mt-2.5 flex items-center justify-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
        >
          <FileSearch size={15} />
          무료 샘플 먼저 보기
        </a>

        <p className="mt-3 text-center text-[12px] text-charcoal-600">
          학생에게 맞는 구성인지 모르시나요?{" "}
          <Link href="/consultation" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">
            구매 전 상담
          </Link>
        </p>

        {/* 포함 구성 */}
        <div className="mt-5 border-t border-navy-800/12 pt-4">
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">Includes</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {includes.map((it) => (
              <span key={it} className="inline-flex items-center gap-1 text-[12px] text-charcoal-900">
                <Check size={12} className="text-brass-500" strokeWidth={2.4} />
                {it}
              </span>
            ))}
          </div>
        </div>

        {/* Trust */}
        <ul className="mt-4 space-y-1.5 border-t border-navy-800/12 pt-4">
          {trustItems.map((t) => (
            <li key={t} className="flex items-start gap-2 text-[12px] text-charcoal-600">
              <Check size={13} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
              {t}
            </li>
          ))}
        </ul>

        {/* Digital Product Notice */}
        <div className="mt-4 border-t border-navy-800/12 pt-4">
          <p className="font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">Digital Product Notice</p>
          <ul className="mt-2 space-y-1">
            {[
              "Digital PDF 상품",
              "구매 전 Sample 확인 가능",
              "발송 완료 후 환불 불가",
              "Blossom Books 측 오류 확인 시 최대 2회 수정",
              "추가 제작·구성 변경은 별도 문의",
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5 text-[11.5px] text-charcoal-600">
                <Check size={11} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/policy"
            className="mt-2.5 inline-block text-[12px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2"
          >
            구매 및 환불 정책 자세히 보기
          </Link>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-navy-800/12 pt-4 text-[11px] text-navy-800/70">
          <ShieldCheck size={14} className="text-brass-500" />
          <span className="font-label uppercase tracking-[0.1em]">Blossom Editorial Standard</span>
        </div>
      </div>

      {/* 모바일 스티키 구매 바 */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-navy-800/15 bg-ivory-100/97 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        {isDirect ? (
          <>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-navy-950">
                {selected.label} · {formatKRW(selected.priceKRW)}
              </p>
              <p className="text-[10.5px] text-charcoal-600">{selected.tier}</p>
            </div>
            <Link
              href={buyHref}
              className="inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13.5px] font-medium text-ivory-100"
            >
              <ShoppingBag size={15} />
              지금 구매
            </Link>
          </>
        ) : (
          <>
            <p className="font-display text-[15px] font-semibold text-navy-950">Price on Request</p>
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13.5px] font-medium text-ivory-100"
            >
              <MessageCircle size={15} />
              구성 문의
            </a>
          </>
        )}
      </div>
    </>
  );
}
