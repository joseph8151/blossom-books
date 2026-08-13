import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessModels } from "@/data/john";
import LevelMeter from "@/components/ui/LevelMeter";

const [featured, ...rest] = [...businessModels].reverse();
const gridModels = rest.reverse();

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
          {gridModels.map((model, i) => (
            <Link
              key={model.id}
              href={`/business-models#${model.id}`}
              className="card-premium group flex flex-col justify-between gap-6 border border-navy-900/8 p-8 hover:border-coral-500/30"
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
              <div className="flex items-end justify-between gap-4">
                <div className="flex gap-5">
                  <LevelMeter label="Space" level={model.spaceLevel} />
                  <LevelMeter label="Team" level={model.teamLevel} />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-500/10 px-3.5 py-2 font-label text-[12px] font-semibold uppercase tracking-[0.06em] text-coral-600">
                  {model.code}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured — JOHN HYBRID은 여러 모델을 한 공간에 결합하는 기준 모델이라 별도로 강조합니다 */}
        <Link
          href={`/business-models#${featured.id}`}
          className="group relative mt-5 flex flex-col gap-6 overflow-hidden rounded-2xl p-8 transition-all hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between lg:p-10"
          style={{
            background: "linear-gradient(155deg, var(--color-navy-700), var(--color-navy-950) 80%)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full bg-coral-500 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.1em] text-navy-950">
              Combine Everything
            </span>
            <h3 className="mt-4 font-display text-[24px] font-extrabold text-ivory-100 sm:text-[28px]">
              {featured.code}
            </h3>
            <p className="mt-1 text-[13.5px] text-ivory-200/70">{featured.tagline}</p>
          </div>
          <div className="relative z-10 flex items-center gap-8">
            <div className="flex gap-6">
              <LevelMeterLight label="Space" level={featured.spaceLevel} />
              <LevelMeterLight label="Team" level={featured.teamLevel} />
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral-500 px-5 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.06em] text-navy-950">
              Explore
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function LevelMeterLight({ label, level }: { label: string; level: 1 | 2 | 3 }) {
  return (
    <div>
      <p className="font-label text-[10px] uppercase tracking-[0.1em] text-ivory-200/50">{label}</p>
      <div className="mt-2 flex items-end gap-1" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[7px] rounded-full ${i <= level ? "bg-coral-400" : "bg-ivory-100/15"}`}
            style={{ height: `${7 + i * 6}px` }}
          />
        ))}
      </div>
    </div>
  );
}
