import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { economicsFactors } from "@/data/john";

export default function FranchiseEconomics() {
  return (
    <section className="border-b border-navy-900/12 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <span className="eyebrow eyebrow--center">Franchise Economics</span>
        <h2 className="mt-4 text-balance font-display text-[28px] font-extrabold leading-[1.25] text-navy-950 sm:text-[34px]">
          A Business Model <span className="text-coral-500">Built Around Your Scale.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
          창업 비용과 운영 구조는 아래 조건에 따라 달라질 수 있습니다. 정확한 금액은 상담을 통해
          안내해 드립니다.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {economicsFactors.map((factor) => (
            <span key={factor} className="rounded-full bg-paleblue-100 px-4 py-2.5 text-[13px] font-medium text-navy-900">
              {factor}
            </span>
          ))}
        </div>

        <Link
          href="/consultation"
          className="btn-secondary group mt-10 px-7 py-3.5 text-[14px]"
        >
          내 조건으로 상담 받아보기
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
