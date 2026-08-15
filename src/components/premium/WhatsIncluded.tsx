import { Check, MessageCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { premiumProfileFor, PREMIUM_BONUS_COUNT } from "@/data/premiumBonus";
import { siteConfig } from "@/data/site";

// 200P+ 상품 상세 — 본교재부터 Bonus 까지 "무엇이 들어있는지"를 한 목록으로 보여줍니다.
// 앞의 2개는 본교재 구성, 나머지 7개가 Premium Bonus Materials 입니다.

export default function WhatsIncluded({ product }: { product: Product }) {
  const profile = premiumProfileFor(product);
  const core = [
    { label: "200P+ Workbook", note: "200페이지 이상 본교재" },
    {
      label: "Detailed Answer & Explanation",
      note: product.includesDetailedExplanations ? "정답 및 상세 해설집" : "정답 및 해설",
    },
  ];

  return (
    <section className="mt-10 border border-navy-800/12 bg-ivory-200/40 p-6 lg:p-8">
      <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-500">What&apos;s Included</span>
      <h2 className="mt-2 font-display text-[20px] font-semibold text-navy-950 sm:text-[23px]">
        200P+ Premium Edition 구성
      </h2>

      <div className="mt-5 grid gap-px border border-navy-800/12 bg-navy-800/12 sm:grid-cols-2">
        {core.map((c) => (
          <div key={c.label} className="flex items-start gap-2.5 bg-ivory-100 p-4">
            <Check size={15} className="mt-0.5 shrink-0 text-navy-900" strokeWidth={2.4} />
            <span>
              <span className="text-[13.5px] font-medium text-navy-950">{c.label}</span>
              <span className="mt-0.5 block text-[12px] text-charcoal-600">{c.note}</span>
            </span>
          </div>
        ))}
        {profile.bonuses.map((b) => (
          <div key={b.key} className="flex items-start gap-2.5 bg-ivory-100 p-4">
            <Check size={15} className="mt-0.5 shrink-0 text-brass-500" strokeWidth={2.4} />
            <span>
              <span className="text-[13.5px] font-medium text-navy-950">{b.en}</span>
              <span className="mt-0.5 block text-[12px] text-charcoal-600">{b.short}</span>
            </span>
          </div>
        ))}
      </div>

      {/* 마무리 강조 */}
      <div className="mt-6 border-t border-navy-800/12 pt-6 text-center">
        <p className="font-display text-[22px] font-semibold leading-tight tracking-tight text-navy-950 sm:text-[26px]">
          {PREMIUM_BONUS_COUNT} PREMIUM BONUS MATERIALS
          <br />
          <span className="text-brass-500">INCLUDED WITH 200P+</span>
        </p>
        <a
          href={siteConfig.kakaoChatUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-navy-900 px-7 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800"
        >
          <MessageCircle size={16} /> 200P+ Premium Package 상담하기
        </a>
        <p className="mx-auto mt-3 max-w-md text-[12px] leading-relaxed text-charcoal-600">
          어떤 교재가 필요한지 모르시겠다면 학생의 학년, 시험, 현재 수준과 목표를 알려주세요. 가장 적합한
          교재를 안내해 드립니다.
        </p>
      </div>
    </section>
  );
}
