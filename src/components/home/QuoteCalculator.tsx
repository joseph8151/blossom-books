"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, Check } from "lucide-react";
import { volumeOptions, extendedOption } from "@/data/pricing";
import { siteConfig } from "@/data/site";

// 구성 빌더 — 분량+과목을 선택하면 카카오톡 상담 메시지에 바로 담을 수 있게
// 구성을 정리해 보여줍니다. 가격은 더 이상 이 화면에서 바로 보여주지 않고
// 카카오톡 상담에서만 안내합니다.
const subjects = ["English (레벨테스트)", "Reading", "Writing", "Math", "Science", "Vocabulary / Grammar"];
const options = [
  ...volumeOptions.map((v) => ({ pages: v.pages, label: v.label, tier: v.tier, tierKo: v.tierKo })),
  { pages: 300, label: extendedOption.label, tier: extendedOption.tier, tierKo: extendedOption.tierKo },
];

const included = ["Student Workbook", "정답 · 상세 해설", "선택 과목 집중 구성", "Digital PDF"];

export default function QuoteCalculator() {
  const [pages, setPages] = useState(60);
  const [subject, setSubject] = useState(subjects[0]);
  const [revealed, setRevealed] = useState(false);
  const opt = options.find((o) => o.pages === pages) ?? options[1];
  const isExtended = pages >= 300;

  function goKakao() {
    window.open(siteConfig.kakaoChannelUrl, "_blank", "noopener,noreferrer");
    setRevealed(true);
  }

  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Build your request</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            구성을 선택하고 바로 상담하세요
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            분량과 과목만 선택하면 그 구성 그대로 카카오톡 상담으로 연결해 드립니다. 가격은 상담에서
            안내됩니다.
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

          {/* 결과 — 카카오톡 상담을 받아야 구성 요약이 공개됩니다 */}
          <div className="flex flex-col border border-navy-800/15 bg-navy-950 p-6 text-ivory-100">
            <p className="font-label text-[10.5px] uppercase tracking-[0.12em] text-brass-400">선택한 구성</p>
            {!revealed ? (
              <>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ivory-200/75">
                  분량·과목 선택이 끝났습니다. 카카오톡 상담을 받으시면 선택하신 구성 요약과 포함 내역을 바로
                  안내해 드립니다.
                </p>
                <button
                  type="button"
                  onClick={goKakao}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 bg-brass-500 px-5 py-2.5 text-[13px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
                >
                  <MessageCircle size={14} /> 카카오톡 상담받고 구성 확인하기
                </button>
                <Link
                  href="/find"
                  className="group mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ivory-100/70 transition-colors hover:text-ivory-100"
                >
                  교재 추천받기
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </>
            ) : (
              <>
                <p className="mt-2 text-[13px] text-ivory-200/70">{opt.tierKo} · {subject}</p>
                <p className="mt-4 font-display text-[22px] font-semibold leading-snug text-ivory-100">
                  {opt.label} · {subject}
                </p>
                <p className="mt-1.5 text-[12.5px] text-ivory-200/70">
                  {isExtended ? "맞춤 견적 문의" : "가격은 카카오톡 상담에서 안내해 드립니다"}
                </p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
