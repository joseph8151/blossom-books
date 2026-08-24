"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Check, FileSearch, ShieldCheck, Copy } from "lucide-react";
import { Product } from "@/lib/types";
import { flexibleVolumes, srVolumes, starterOption, extendedOption, formatKRW, volumeByPages } from "@/data/pricing";
import { offersVolumes, offersSrVolumes, hasStarter } from "@/lib/productMeta";
import { siteConfig } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const trustItems = [
  "정답 및 상세 해설 포함",
  "Digital PDF 제공",
  "구매 전 Sample 확인 가능",
  "결제 확인 후 발송",
  "시험 및 학년별 선택 가능",
  "카카오톡 상담원 안내",
];

export default function PurchasePanel({ product, isDirect }: { product: Product; isDirect: boolean }) {
  const srFlexible = offersSrVolumes(product); // SR Reading Prep 전용 150/200/300 분량 선택 가능 여부
  const flexible = offersVolumes(product); // 40/60/100/200 분량 선택 가능 여부
  // 영어 레벨테스트 상품에는 Starter(25P) 진입 구성을 함께 제공합니다.
  const vols = srFlexible ? srVolumes : hasStarter(product) ? [starterOption, ...flexibleVolumes] : flexibleVolumes;
  const fixedVol = !flexible && !srFlexible && product.pageCount ? volumeByPages(product.pageCount) : undefined;
  const [pages, setPages] = useState(srFlexible ? srVolumes[0].pages : flexible ? 60 : fixedVol?.pages ?? 60);
  const [copied, setCopied] = useState(false);
  const [addOns, setAddOns] = useState<string[]>([]);
  const selected = vols.find((v) => v.pages === pages) ?? fixedVol ?? vols.find((v) => v.pages === 60) ?? vols[0];

  // 함께 준비하면 좋은 영역 — 현재 교재 과목과 겹치지 않는 항목만 제안 (Smart Upsell)
  const addOnPool = ["Reading", "Vocabulary", "Grammar", "Writing", "Math"];
  const subj = product.subject.toLowerCase();
  const addOnOptions = addOnPool.filter((a) => !subj.includes(a.toLowerCase()));

  function toggleAddOn(a: string) {
    setAddOns((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  const includes = [
    "Student Workbook",
    product.includesAnswerKey ? "Answer Key" : null,
    product.includesDetailedExplanations ? "Detailed Explanation" : null,
    "Digital PDF",
    product.includesAudio ? "Listening Audio (MP3)" : null,
  ].filter(Boolean) as string[];

  const subjectLine = product.units.slice(0, 4).join(" · ");

  // 카카오톡 주문 요청 시 자동으로 복사되는 메시지 (고객이 다시 타이핑할 필요 없이 붙여넣기)
  function orderMessage(): string {
    const lines = [
      "안녕하세요. Blossom Books 홈페이지에서 보고 주문 문의드립니다.",
      `상품: ${product.titleKo}`,
    ];
    if (isDirect) {
      lines.push(`선택: ${selected.label} (${selected.tier})`);
      lines.push(`가격: ${formatKRW(selected.priceKRW)}`);
    } else {
      lines.push("구성: 별도 구성 (가격 문의)");
    }
    lines.push(`학생 학년(참고): ${product.gradeRange}`);
    if (addOns.length) lines.push(`함께 준비 희망 영역: ${addOns.join(", ")} (별도 구성 안내)`);
    lines.push("주문을 진행하고 싶습니다.");
    return lines.join("\n");
  }

  function goKakao() {
    try {
      navigator.clipboard?.writeText(orderMessage());
      setCopied(true);
    } catch {
      /* 클립보드 미지원 환경은 무시 */
    }
    trackEvent("click_kakao", { product_id: product.id, location: "purchase_panel" });
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <div className="border border-navy-800/15 bg-ivory-100 p-6 shadow-card">
        <p className="font-display text-[19px] font-semibold leading-snug text-navy-950">{product.titleKo}</p>
        <p className="mt-1.5 text-[12.5px] text-charcoal-600">{subjectLine}</p>

        {isDirect ? (
          <>
            {flexible || srFlexible ? (
              <>
                <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                  Choose Your Volume
                </p>
                <div className={`mt-3 grid gap-2 ${vols.length >= 4 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {vols.map((v) => {
                    const on = v.pages === pages;
                    return (
                      <button
                        key={v.pages}
                        onClick={() => {
                          setPages(v.pages);
                          trackEvent("select_page_option", { product_id: product.id, pages: v.pages });
                        }}
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
                  {srFlexible ? "300P+" : extendedOption.label} 이상 · 추가 영역은 가격 문의
                </p>
              </>
            ) : (
              <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                {selected.tier} · {selected.label}
              </p>
            )}

            <div className="mt-5 flex items-baseline justify-between border-t border-navy-800/12 pt-4">
              <span className="text-[13px] text-charcoal-600">선택: {selected.label}</span>
              <span className="font-display text-[24px] font-semibold text-navy-950">
                {formatKRW(selected.priceKRW)}
              </span>
            </div>

            <button
              onClick={goKakao}
              className="mt-4 flex w-full items-center justify-center gap-2 bg-navy-900 px-6 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
            >
              <MessageCircle size={16} />
              카카오톡으로 주문 요청
            </button>
          </>
        ) : (
          <>
            <p className="mt-5 font-display text-[20px] font-semibold text-burgundy-700">Price on Request</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
              시험 유형과 구성에 따라 별도 안내됩니다. 구성을 알려주시면 빠르게 견적을 드립니다.
            </p>
            <button
              onClick={goKakao}
              className="mt-4 flex w-full items-center justify-center gap-2 bg-navy-900 px-6 py-3.5 text-[14.5px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
            >
              <MessageCircle size={16} />
              카카오톡으로 구매 문의
            </button>
          </>
        )}

        {copied && (
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[11.5px] text-brass-500">
            <Copy size={12} /> 주문 정보가 복사되었습니다. 카카오톡 채팅창에 붙여넣어 주세요.
          </p>
        )}

        <a
          href="#sample"
          onClick={() => trackEvent("click_sample", { product_id: product.id, location: "purchase_panel" })}
          className="mt-2.5 flex items-center justify-center gap-2 border border-navy-800/25 px-6 py-3 text-[13.5px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50"
        >
          <FileSearch size={15} />
          무료 샘플 먼저 보기
        </a>

        <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600">
          카카오톡 주문 요청 후 결제 방법을 안내드리며, 결제 확인 후 교재(PDF)를 이메일로 보내드립니다.{" "}
          <Link href="/consultation" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-2">
            구성 상담
          </Link>
        </p>

        {/* Smart Upsell — 함께 준비하면 좋은 영역 (별도 구성 문의) */}
        {isDirect && addOnOptions.length > 0 && (
          <div className="mt-4 border-t border-navy-800/12 pt-4">
            <p className="font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/55">Add focused practice</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-charcoal-600">
              필요한 영역을 함께 준비하시나요? 선택하면 문의에 포함됩니다. (구성·가격은 상담 시 안내)
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {addOnOptions.map((a) => {
                const on = addOns.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAddOn(a)}
                    className={`inline-flex items-center gap-1 border px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                      on ? "border-navy-900 bg-navy-900 text-ivory-100" : "border-navy-800/20 text-charcoal-600 hover:border-navy-800/40"
                    }`}
                  >
                    {on ? "✓" : "+"} {a}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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

      {/* 모바일 스티키 주문 바 */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-navy-800/15 bg-ivory-100/97 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        {isDirect ? (
          <>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-navy-950">
                {selected.label} · {formatKRW(selected.priceKRW)}
              </p>
              <p className="text-[10.5px] text-charcoal-600">{selected.tier}</p>
            </div>
            <button
              onClick={goKakao}
              className="inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13.5px] font-medium text-ivory-100"
            >
              <MessageCircle size={15} />
              주문 요청
            </button>
          </>
        ) : (
          <>
            <p className="font-display text-[15px] font-semibold text-navy-950">Price on Request</p>
            <button
              onClick={goKakao}
              className="inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13.5px] font-medium text-ivory-100"
            >
              <MessageCircle size={15} />
              구매 문의
            </button>
          </>
        )}
      </div>
    </>
  );
}
