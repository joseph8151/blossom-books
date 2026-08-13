"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, Check } from "lucide-react";
import { volumeOptions, extendedOption, formatKRW } from "@/data/pricing";
import { siteConfig } from "@/data/site";

// 견적 계산기 — 분량+과목 선택 시 예상 가격을 바로 안내해 가격 문의를 줄입니다.
const subjects = ["English (레벨테스트)", "Reading", "Writing", "Math", "Science", "Vocabulary / Grammar"];
const options = [
  ...volumeOptions.map((v) => ({ pages: v.pages, label: v.label, tier: v.tier, tierKo: v.tierKo, priceKRW: v.priceKRW })),
  { pages: 150, label: "150P+", tier: extendedOption.tier, tierKo: extendedOption.tierKo, priceKRW: 0 },
];

const included = ["Student Workbook", "정답 · 상세 해설", "선택 과목 집중 구성", "Digital PDF"];

export default function QuoteCalculator() {
  const [pages, setPages] = useState(60);
  const [subject, setSubject] = useState(subjects[0]);
  const opt = options.find((o) => o.pages === pages) ?? options[1];
  const isExtended = pages >= 150;

  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Quick estimate</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            예상 가격을 바로 확인하세요
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            분량과 과목만 선택하면 예상 금액을 안내해 드립니다. 정확한 최종 금액은 구성 확인 후 결제 전에
            다시 안내됩니다.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* 선택 */}
          <div className="border border-navy-800/12 bg-ivory-200/40 p-6">
            <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">분량 선택</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {options.map((o) => (
                <button
                  key={o.pages}
                  onClick={() => setPages(o.pages)}
                  className={`flex flex-col items-start border px-3 py-2.5 text-left transition-colors ${
                    pages === o.pages ? "border-navy-900 bg-ivory-100" : "border-navy-800/20 hover:border-navy-800/40"
                  }`}
                >
                  <span className="font-display text-[16px] font-semibold text-navy-950">{o.label}</span>
                  <span className="text-[11px] text-charcoal-600">{o.tier}</span>
                </button>
              ))}
            </div>

            <p className="mt-5 font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-500">과목</p>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-3 w-full border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13.5px] text-charcoal-900 outline-none focus:border-navy-800/50"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* 결과 */}
          <div className="flex flex-col border border-navy-800/15 bg-navy-950 p-6 text-ivory-100">
            <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-400">예상 견적</p>
            <p className="mt-2 text-[13px] text-ivory-200/70">{opt.tierKo} · {subject}</p>
            {isExtended ? (
              <p className="mt-4 font-display text-[26px] font-semibold text-ivory-100">맞춤 견적 문의</p>
            ) : (
              <p className="mt-4 font-display text-[32px] font-semibold leading-none text-ivory-100">
                {formatKRW(opt.priceKRW)}
                <span className="ml-1 text-[13px] font-normal text-ivory-200/60">부터</span>
              </p>
            )}
            <ul className="mt-5 flex-1 space-y-1.5">
              {included.map((it) => (
                <li key={it} className="flex items-center gap-2 text-[12.5px] text-ivory-200/85">
                  <Check size={13} className="text-brass-400" strokeWidth={2.4} /> {it}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-brass-500 px-5 py-2.5 text-[13px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
              >
                <MessageCircle size={14} /> 이 구성으로 상담
              </a>
              <Link
                href="/find"
                className="group inline-flex items-center gap-1.5 border border-ivory-100/25 px-5 py-2.5 text-[13px] font-medium text-ivory-100 transition-colors hover:border-ivory-100/50"
              >
                교재 추천받기
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-ivory-200/55">
              * 과목·구성에 따라 일부 상품은 별도 안내될 수 있습니다. 최종 금액은 결제 전 확인됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
