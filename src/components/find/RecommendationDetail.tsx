"use client";

import Link from "next/link";
import { Check, Minus, X, ArrowRight, MessageCircle, Phone, Mail, Layers, PenTool } from "lucide-react";
import { Product } from "@/lib/types";
import { FitFactor, FitStatus, FactorCode, Recommendation, StudyPlan } from "@/lib/recommend";
import { insideTheWorkbook } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
import { packageOption, packagePriceLabel } from "@/data/pricing";
import { siteConfig } from "@/data/site";

// 한/영 페이지가 문구만 바꿔 끼우고 구조는 공유합니다.
export interface FindCopy {
  fit: string;
  fitDetailTitle: string;
  insideTitle: string;
  includedTitle: string;
  planTitle: string;
  altTitle: string;
  altNote: string;
  viewBook: string;
  viewSample: string;
  handmadeTitle: string;
  handmadeBody: string;
  packageTitle: string;
  packageSummary: string;
  packageCta: string;
  packagePriceAsk: string;
  consultTitle: string;
  consultBody: string;
  consultPhone: string;
  consultKakao: string;
  consultEmail: string;
  factorLabel: Record<FactorCode, string>;
  productTitle: (p: Product) => string;
  productMeta: (p: Product) => string;
  priceLabel: (p: Product) => string;
  included: (p: Product) => string[];
  factorText: (f: FitFactor) => string;
  planText: (plan: StudyPlan) => string;
}

const STATUS_ICON: Record<FitStatus, typeof Check> = { match: Check, partial: Minus, miss: X };
const STATUS_COLOR: Record<FitStatus, string> = {
  match: "text-brass-500",
  partial: "text-charcoal-600",
  miss: "text-burgundy-700",
};

export default function RecommendationDetail({
  rec,
  alternatives,
  volume,
  plan,
  volumeReason,
  hrefBase,
  copy,
  onKakao,
}: {
  rec: Recommendation;
  alternatives: Recommendation[];
  volume: string;
  plan: StudyPlan | null;
  volumeReason: string;
  hrefBase: string;
  copy: FindCopy;
  onKakao: () => void;
}) {
  const p = rec.product;
  const inside = insideTheWorkbook(p);
  const included = copy.included(p);
  const packagePrice = packagePriceLabel();

  return (
    <div className="mt-3 space-y-3">
      {/* 추천 교재 요약 */}
      <div className="border border-navy-800/15 bg-ivory-100 p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-[18px] font-semibold leading-snug text-navy-950">
              {copy.productTitle(p)}
            </p>
            <p className="mt-1 text-[12.5px] text-charcoal-600">{copy.productMeta(p)}</p>
            <p className="mt-1 text-[12.5px] font-medium text-burgundy-700">{copy.priceLabel(p)}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[24px] font-semibold leading-none text-brass-500">{rec.score}%</p>
            <p className="font-label text-[8.5px] uppercase tracking-[0.1em] text-navy-800/55">{copy.fit}</p>
          </div>
        </div>

        {/* 항목별 적합도 — 맞은 항목과 아쉬운 항목을 함께 보여 줍니다. */}
        <div className="mt-4 border-t border-navy-800/10 pt-3">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">
            {copy.fitDetailTitle}
          </p>
          <ul className="mt-2 space-y-1.5">
            {rec.factors.map((f) => {
              const Icon = STATUS_ICON[f.status];
              return (
                <li key={f.code} className="flex items-start gap-2 text-[12.5px] leading-snug">
                  <Icon size={13} className={`mt-0.5 shrink-0 ${STATUS_COLOR[f.status]}`} strokeWidth={2.4} />
                  <span className="w-[68px] shrink-0 text-charcoal-600">{copy.factorLabel[f.code]}</span>
                  <span className={f.status === "miss" ? "text-burgundy-700" : "text-charcoal-900"}>
                    {copy.factorText(f)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 교재 구성 */}
        <div className="mt-4 border-t border-navy-800/10 pt-3">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">{copy.insideTitle}</p>
          <ul className="mt-2 space-y-1.5">
            {inside.map((a) => (
              <li key={a.area} className="flex items-start gap-2 text-[12.5px] leading-snug text-charcoal-900">
                <span className="w-[68px] shrink-0 font-medium text-navy-950">{a.area}</span>
                <span className="text-charcoal-600">{a.items.slice(0, 6).join(" · ")}</span>
              </li>
            ))}
          </ul>
          {included.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {included.map((b) => (
                <span
                  key={b}
                  className="border border-navy-800/15 px-2 py-1 text-[11px] text-charcoal-600"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`${hrefBase}/${p.id}`}
            className="group inline-flex items-center gap-1.5 bg-navy-900 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            {copy.viewBook}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={`${hrefBase}/${p.id}#sample`}
            className="inline-flex items-center gap-1.5 border border-navy-800/25 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
          >
            {copy.viewSample}
          </Link>
        </div>
      </div>

      {/* 추천 분량 + 학습 계획 */}
      <div className="border border-navy-800/12 bg-ivory-100 p-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-[20px] font-semibold text-navy-950">{volume}</span>
          <span className="text-[12.5px] leading-snug text-charcoal-600">{volumeReason}</span>
        </div>
        {plan && (
          <p className="mt-2.5 border-t border-navy-800/10 pt-2.5 text-[12.5px] leading-snug text-charcoal-900">
            <span className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">
              {copy.planTitle}
            </span>
            <br />
            {copy.planText(plan)}
          </p>
        )}
      </div>

      {/* 수기 제작 안내 — 문항이 자동 생성된 것으로 오해받지 않도록 제작 방식을 밝힙니다. */}
      <div className="border border-navy-800/12 bg-ivory-100 p-4">
        <div className="flex items-start gap-2.5">
          <PenTool size={16} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2} />
          <div>
            <p className="text-[13.5px] font-semibold text-navy-950">{copy.handmadeTitle}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">{copy.handmadeBody}</p>
          </div>
        </div>
      </div>

      {/* 함께 검토해 볼 교재 */}
      {alternatives.length > 0 && (
        <div className="border border-navy-800/12 bg-ivory-100 p-4">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-navy-800/55">{copy.altTitle}</p>
          <p className="mt-1 text-[12px] leading-snug text-charcoal-600">{copy.altNote}</p>
          <ul className="mt-3 space-y-2">
            {alternatives.map((a) => (
              <li key={a.product.id}>
                <Link
                  href={`${hrefBase}/${a.product.id}`}
                  className="group flex items-start justify-between gap-3 border border-navy-800/12 px-3 py-2.5 transition-colors hover:border-navy-800/35"
                >
                  <span>
                    <span className="block text-[13px] font-medium leading-snug text-navy-950">
                      {copy.productTitle(a.product)}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-charcoal-600">
                      {a.product.gradeRange} · {blossomLevel(a.product.difficulty)}
                    </span>
                  </span>
                  <span className="shrink-0 font-display text-[15px] font-semibold text-brass-500">
                    {a.score}%
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 200P 장기·심화 패키지 */}
      <div className="border border-brass-500/45 bg-brass-500/[0.06] p-4">
        <div className="flex items-start gap-2.5">
          <Layers size={16} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.2} />
          <div>
            <p className="text-[13.5px] font-semibold text-navy-950">{copy.packageTitle}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-charcoal-600">{copy.packageSummary}</p>
            <p className="mt-2 text-[12.5px] font-medium text-burgundy-700">
              {packageOption.label} · {packageOption.duration} ·{" "}
              {packagePrice ?? copy.packagePriceAsk}
            </p>
            <button
              onClick={onKakao}
              className="mt-3 inline-flex items-center gap-1.5 border border-navy-800/25 bg-ivory-100 px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50"
            >
              {copy.packageCta}
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 전문 프랩 선생님 상담 유도 */}
      <div className="border border-navy-800/20 bg-navy-900 p-5">
        <p className="font-display text-[16px] font-semibold text-ivory-100">{copy.consultTitle}</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory-100/75">{copy.consultBody}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {siteConfig.consultPhone && (
            <a
              href={`tel:${siteConfig.consultPhone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 bg-brass-500 px-5 py-2.5 text-[13px] font-semibold text-navy-950 transition-opacity hover:opacity-90"
            >
              <Phone size={14} strokeWidth={2.4} />
              {copy.consultPhone} {siteConfig.consultPhone}
            </a>
          )}
          <button
            onClick={onKakao}
            className="inline-flex items-center gap-2 bg-ivory-100 px-5 py-2.5 text-[13px] font-medium text-navy-900 transition-opacity hover:opacity-90"
          >
            <MessageCircle size={14} /> {copy.consultKakao}
          </button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 border border-ivory-100/35 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/70"
          >
            <Mail size={14} /> {copy.consultEmail}
          </a>
        </div>
        {siteConfig.consultHours && (
          <p className="mt-3 text-[11.5px] text-ivory-100/55">{siteConfig.consultHours}</p>
        )}
      </div>
    </div>
  );
}
