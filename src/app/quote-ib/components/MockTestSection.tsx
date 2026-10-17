"use client";

import { useState } from "react";
import { FileSearch, MessageCircle, Check } from "lucide-react";
import { siteConfig } from "@/data/site";
import { formatKRW } from "@/data/pricing";
import { MOCK_TEST_PRICING, MOCK_TEST_INCLUDES, MOCK_TEST_NOTE } from "../ibContent";
import { MOCK_TEST_SAMPLE } from "../ibSampleContent";
import IbSampleModal from "./IbSampleModal";

export default function MockTestSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="mock" className="mt-16 scroll-mt-20 border-t border-ivory-300 pt-12">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">B</p>
      <h2 className="mt-1 font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">IB 모의고사</h2>

      <div className="mt-6 border border-ivory-300 bg-white p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {MOCK_TEST_PRICING.map((m) => (
            <div key={m.id} className="border border-ivory-300 bg-ivory-100 p-4 text-center">
              <p className="font-display text-[17px] font-semibold text-navy-950">{m.name}</p>
              <p className="mt-1 font-display text-[20px] font-semibold text-navy-950">{formatKRW(m.priceKRW)}</p>
            </div>
          ))}
        </div>

        <ul className="mt-4 space-y-1">
          {MOCK_TEST_INCLUDES.map((it) => (
            <li key={it} className="flex items-center gap-1.5 text-[12.5px] text-charcoal-900">
              <Check size={13} className="text-brass-500" strokeWidth={2.4} /> {it}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11.5px] leading-relaxed text-charcoal-600/70">{MOCK_TEST_NOTE}</p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/[0.06] px-3.5 py-2 text-[12.5px] font-medium text-brass-500 transition-colors hover:bg-brass-500/[0.12]"
          >
            <FileSearch size={14} /> 교재 샘플 보기
          </button>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-navy-900 px-3.5 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={14} /> 모의고사 문의
          </a>
        </div>
      </div>

      <IbSampleModal title="IB Mock Test" sample={MOCK_TEST_SAMPLE} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
