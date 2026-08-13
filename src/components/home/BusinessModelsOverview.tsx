import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessModels } from "@/data/john";

export default function BusinessModelsOverview() {
  return (
    <section id="business-models" className="border-b border-navy-900/12 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="eyebrow">Business Models</span>
            <h2 className="mt-4 max-w-xl text-balance font-display text-[30px] font-extrabold leading-[1.15] text-navy-950 sm:text-[36px]">
              One Brand. <span className="text-coral-500">Different Ways to Build.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-charcoal-600">
              공간 규모, 교육 대상, 운영 방식에 따라 나에게 맞는 JOHN 사업 모델을 선택할 수 있습니다.
            </p>
          </div>
          <Link
            href="/business-models"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-navy-900/25 px-6 py-3.5 text-[13.5px] font-semibold text-navy-900 transition-colors hover:border-navy-900/50"
          >
            전체 비교표 보기
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businessModels.map((model, i) => (
            <Link
              key={model.id}
              href={`/business-models#${model.id}`}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-navy-900/10 bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:border-coral-500/40"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="num-badge h-8 w-8 text-[12px]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.14em] text-charcoal-600/60">
                    {model.studentType}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[19px] font-extrabold text-navy-950">{model.code}</h3>
                <p className="mt-1 text-[13px] font-medium text-charcoal-600">{model.name}</p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-600">{model.tagline}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-500/10 px-3.5 py-2 font-label text-[12px] font-semibold uppercase tracking-[0.06em] text-coral-600 w-fit">
                Explore {model.code}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
