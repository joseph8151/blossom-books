"use client";

import { useState } from "react";
import { FileSearch, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { formatKRW } from "@/data/pricing";
import { MINI_PACK_PRICING } from "../ibContent";
import { COMMAND_TERMS_SAMPLE, GRAPH_DATA_PACK_SAMPLE, CALCULATION_PACK_SAMPLE, DIAGNOSTIC_SAMPLE, IbSample } from "../ibSampleContent";
import IbSampleModal from "./IbSampleModal";

const PACK_SAMPLES: Record<string, IbSample> = {
  "command-terms": COMMAND_TERMS_SAMPLE,
  "graph-data": GRAPH_DATA_PACK_SAMPLE,
  calculation: CALCULATION_PACK_SAMPLE,
  diagnostic: DIAGNOSTIC_SAMPLE,
};

export default function MiniPacksSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = MINI_PACK_PRICING.find((m) => m.id === openId);

  return (
    <section id="mini-packs" className="mt-16 scroll-mt-20 border-t border-ivory-300 pt-12">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">D</p>
      <h2 className="mt-1 font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">저가 입문·보조 상품</h2>
      <p className="mt-2 max-w-[600px] text-[13.5px] leading-relaxed text-charcoal-600">
        큰 문제집을 구매하기 전, 부담 없이 사용해 볼 수 있는 상품입니다.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MINI_PACK_PRICING.map((m) => (
          <div key={m.id} className="border border-ivory-300 bg-white p-5">
            <p className="font-display text-[15px] font-semibold leading-snug text-navy-950">{m.name}</p>
            <p className="mt-1.5 font-display text-[18px] font-semibold text-navy-950">{formatKRW(m.priceKRW)}</p>
            <button
              type="button"
              onClick={() => setOpenId(m.id)}
              className="mt-4 inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/[0.06] px-3 py-1.5 text-[12px] font-medium text-brass-500 transition-colors hover:bg-brass-500/[0.12]"
            >
              <FileSearch size={13} /> 샘플 보기
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 bg-navy-900 px-3.5 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
        >
          <MessageCircle size={14} /> 입문 상품 문의
        </a>
      </div>

      <IbSampleModal
        key={openId ?? "closed"}
        title={open?.name ?? ""}
        sample={openId ? PACK_SAMPLES[openId] : undefined}
        open={!!openId}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}
