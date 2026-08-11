import Link from "next/link";
import { ArrowRight, FileSearch, Check } from "lucide-react";
import PrepVolumePricing from "@/components/common/PrepVolumePricing";

// 60P 기준, 가격 옆에 함께 보여주는 "받는 가치"
const included = [
  "Student Workbook",
  "Answer & Explanation Guide",
  "목표 시험 유형 반영",
  "학년·수준별 난도 구성",
  "구매 전 Sample 확인",
  "상담원 Fit Check",
  "오류 확인 시 최대 2회 수정",
];

export default function PrepPricing() {
  return (
    <section id="pricing" className="scroll-mt-24 border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">How much practice do you need?</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            분량과 가격, 명확하게 안내합니다
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            40·60·100P는 바로 구매하실 수 있습니다. 페이지 수만 보지 말고, 각 구성이 어떤 학생에게 적합한지
            확인하고 선택하세요.
          </p>
        </div>

        {/* 가격 저항 완화 — Sample 먼저 */}
        <div className="mt-8 border-l-2 border-brass-500 bg-ivory-200/40 p-6">
          <p className="font-display text-[18px] font-semibold text-navy-950 sm:text-[20px]">
            가격 때문에 고민되신다면, 먼저 Sample을 확인해보세요.
          </p>
          <p className="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-charcoal-600">
            Blossom Books는 구매를 서두르게 하지 않습니다. 실제 문제 구성과 해설을 확인하고, 학생에게 필요한
            분량을 확인한 뒤 결정하셔도 됩니다. 모든 학생에게 100P 구성을 권하지 않습니다.
          </p>
        </div>

        <div className="mt-10">
          <PrepVolumePricing />
        </div>

        {/* 가격 옆 가치 + Fit Check */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="border border-navy-800/12 bg-ivory-200/40 p-6">
            <p className="font-label text-[11px] uppercase tracking-[0.14em] text-brass-500">
              What every Blossom workbook includes
            </p>
            <p className="mt-1.5 text-[13px] text-charcoal-600">
              가격은 페이지 수가 아니라, 함께 받는 구성 전체에 대한 것입니다. (예: 60P Standard Prep · 150,000원)
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {included.map((it) => (
                <span key={it} className="inline-flex items-center gap-1.5 text-[13px] text-charcoal-900">
                  <Check size={13} className="text-brass-500" strokeWidth={2.4} />
                  {it}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-navy-800/15 bg-navy-950 p-6 text-ivory-100">
            <p className="font-display text-[17px] font-semibold sm:text-[19px]">
              We don&apos;t recommend the biggest workbook.
              <br />
              <span className="text-brass-400">We recommend the right one.</span>
            </p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ivory-200/80">
              가장 많은 페이지를 권하는 것이 아니라, 학생에게 필요한 구성을 안내합니다. 예산과 준비 기간을
              알려주시면 40P부터 필요한 범위만 안내해 드립니다.
            </p>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 bg-navy-900 px-6 py-3.5 text-[14px] font-medium text-ivory-100 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lift"
          >
            교재 찾기
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-6 py-3.5 text-[14px] font-medium text-navy-900 transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-soft"
          >
            <FileSearch size={16} />
            무료 샘플 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
