import Link from "next/link";
import { ArrowRight, FileSearch } from "lucide-react";
import PrepVolumePricing from "@/components/common/PrepVolumePricing";

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

        <div className="mt-12">
          <PrepVolumePricing />
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
