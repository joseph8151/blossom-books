"use client";

import { useState } from "react";
import { FileSearch, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { formatKRW } from "@/data/pricing";
import { CORE_GUIDE_PRICING, CORE_GUIDE_NOTE } from "../ibContent";
import { IA_GUIDE_SAMPLE, EE_GUIDE_SAMPLE, TOK_GUIDE_SAMPLE, IbSample } from "../ibSampleContent";
import IbSampleModal from "./IbSampleModal";

const GUIDE_SAMPLES: Record<string, IbSample> = { ia: IA_GUIDE_SAMPLE, ee: EE_GUIDE_SAMPLE, tok: TOK_GUIDE_SAMPLE };

export default function CoreGuidesSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [ia, ee, tok, bundle] = CORE_GUIDE_PRICING;

  return (
    <section id="core-guides" className="mt-16 scroll-mt-20 border-t border-ivory-300 pt-12">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">C</p>
      <h2 className="mt-1 font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">IB Core 과제 가이드</h2>
      <p className="mt-2 max-w-[620px] text-[13.5px] leading-relaxed text-charcoal-600">{CORE_GUIDE_NOTE}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[ia, ee, tok].map((g) => (
          <div key={g.id} className="border border-ivory-300 bg-white p-5">
            <p className="font-display text-[17px] font-semibold text-navy-950">{g.name}</p>
            <p className="mt-1.5 font-display text-[19px] font-semibold text-navy-950">{formatKRW(g.priceKRW)}</p>
            <button
              type="button"
              onClick={() => setOpenId(g.id)}
              className="mt-4 inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/[0.06] px-3 py-1.5 text-[12px] font-medium text-brass-500 transition-colors hover:bg-brass-500/[0.12]"
            >
              <FileSearch size={13} /> 교재 샘플 보기
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-dashed border-navy-800/25 bg-ivory-200/40 p-4">
        <p className="text-[13px] text-charcoal-900">
          <span className="font-medium text-navy-950">{bundle.name}</span> — 세 가이드를 함께 구매하면{" "}
          <span className="font-medium text-navy-950">{formatKRW(bundle.priceKRW)}</span>입니다.
        </p>
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 bg-navy-900 px-3.5 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={14} /> Core Guides 문의
        </a>
      </div>

      <IbSampleModal
        key={openId ?? "closed"}
        title={openId ? [ia, ee, tok].find((g) => g.id === openId)!.name : ""}
        sample={openId ? GUIDE_SAMPLES[openId] : undefined}
        open={!!openId}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}
