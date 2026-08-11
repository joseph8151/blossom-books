import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { seriesOrder, seriesInfo, productsInSeries } from "@/data/series";

export default function SeriesShowcase() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow">Our series</span>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
              학습 목적에 따라 나눈
              <br />
              Blossom 교재 시리즈
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-charcoal-600">
              모든 교재는 다섯 개의 시리즈로 구성됩니다. 기초 개념부터 심화·실전까지, 지금 학생에게
              필요한 학습 단계를 골라 시작하세요.
            </p>
          </div>
          <Link
            href="/series"
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-navy-900"
          >
            시리즈 전체 보기
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {seriesOrder.map((key, i) => {
            const s = seriesInfo[key];
            const count = productsInSeries(products, key).length;
            return (
              <Link
                key={key}
                href={`/series#${key}`}
                className="lift group flex flex-col border border-navy-800/12 bg-ivory-100 p-5 shadow-card transition-colors hover:border-brass-500/50"
              >
                <span className="font-label text-[11px] tracking-[0.1em] text-brass-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display text-[18px] font-semibold leading-tight text-navy-950">
                  {s.name}
                </p>
                <p className="mt-1 text-[12.5px] text-burgundy-700">{s.ko}</p>
                <p className="mt-3 flex-1 text-[12.5px] leading-relaxed text-charcoal-600">{s.tagline}</p>
                <span className="mt-4 font-label text-[10px] uppercase tracking-[0.12em] text-navy-800/50">
                  {count}종 교재
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
