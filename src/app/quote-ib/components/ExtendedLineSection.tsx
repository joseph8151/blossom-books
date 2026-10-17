"use client";

import { useState } from "react";
import { FileSearch, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { flexibleVolumes, formatKRW } from "@/data/pricing";
import { EXTENDED_LINE } from "../ibContent";
import { BRIDGE_SAMPLE, FINAL_REVIEW_SAMPLE, HL_INTENSIVE_SAMPLE, IbSample } from "../ibSampleContent";
import IbSampleModal from "./IbSampleModal";

const p100 = flexibleVolumes.find((v) => v.pages === 100)!;
const p200 = flexibleVolumes.find((v) => v.pages === 200)!;

const EXTENDED_SAMPLES: Record<string, IbSample> = {
  bridge: BRIDGE_SAMPLE,
  "final-review": FINAL_REVIEW_SAMPLE,
  "hl-intensive": HL_INTENSIVE_SAMPLE,
};

export default function ExtendedLineSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = EXTENDED_LINE.find((e) => e.id === openId);

  return (
    <section id="extended" className="mt-16 scroll-mt-20 border-t border-ivory-300 pt-12">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">E</p>
      <h2 className="mt-1 font-display text-[22px] font-semibold text-navy-950 sm:text-[26px]">확장 라인</h2>
      <p className="mt-2 max-w-[600px] text-[13.5px] leading-relaxed text-charcoal-600">
        모두 맞춤 제작이며, 가격은 IB 맞춤 문제집과 동일합니다 — {p100.label} {formatKRW(p100.priceKRW)} ·{" "}
        {p200.label} {formatKRW(p200.priceKRW)}.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {EXTENDED_LINE.map((e) => (
          <div key={e.id} className="border border-ivory-300 bg-white p-5">
            <p className="font-display text-[16px] font-semibold text-navy-950">{e.name}</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">{e.desc}</p>
            <button
              type="button"
              onClick={() => setOpenId(e.id)}
              className="mt-4 inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/[0.06] px-3 py-1.5 text-[12px] font-medium text-brass-500 transition-colors hover:bg-brass-500/[0.12]"
            >
              <FileSearch size={13} /> 교재 샘플 보기
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
          <MessageCircle size={14} /> 확장 라인 문의
        </a>
      </div>

      <IbSampleModal
        key={openId ?? "closed"}
        title={open?.name ?? ""}
        sample={openId ? EXTENDED_SAMPLES[openId] : undefined}
        open={!!openId}
        onClose={() => setOpenId(null)}
      />
    </section>
  );
}
