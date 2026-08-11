import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { products } from "@/data/products";
import { seriesOrder, seriesInfo, productsInSeries } from "@/data/series";
import ProductCard from "@/components/books/ProductCard";

export const metadata = {
  title: "Blossom 교재 시리즈",
  description:
    "블러섬북스의 교재는 학습 목적에 따라 Core·Practice·Advanced·Skills·Workbook 다섯 개 시리즈로 구성됩니다. 시리즈별 특징과 교재를 확인하세요.",
};

export default function SeriesPage() {
  return (
    <div>
      {/* 히어로 */}
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Our series</p>
          <h1 className="mt-3 font-display text-[34px] font-semibold leading-tight text-navy-950 sm:text-[42px]">
            Blossom 교재 시리즈
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-charcoal-600">
            블러섬북스의 모든 교재는 학습 목적에 따라 다섯 개의 시리즈로 구성됩니다. 지금 학생에게 필요한
            학습이 기초 개념인지, 표준 연습인지, 심화인지에 따라 알맞은 시리즈를 선택하실 수 있습니다.
          </p>

          {/* 시리즈 인덱스 */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {seriesOrder.map((key) => {
              const s = seriesInfo[key];
              return (
                <a
                  key={key}
                  href={`#${key}`}
                  className="lift border border-navy-800/12 bg-ivory-100 p-4 shadow-card transition-colors hover:border-brass-500/50"
                >
                  <p className="font-display text-[15px] font-semibold text-navy-950">{s.name}</p>
                  <p className="mt-1 text-[12px] text-charcoal-600">{s.ko}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 시리즈별 상세 */}
      {seriesOrder.map((key, idx) => {
        const s = seriesInfo[key];
        const items = productsInSeries(products, key);
        return (
          <section
            key={key}
            id={key}
            className={`scroll-mt-24 border-b border-navy-800/12 py-20 lg:py-24 ${
              idx % 2 === 0 ? "bg-ivory-200/50" : "bg-ivory-100"
            }`}
          >
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="lg:sticky lg:top-24">
                  <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display text-[28px] font-semibold text-navy-950 sm:text-[32px]">
                    {s.name}
                  </h2>
                  <p className="mt-1.5 font-display text-[17px] text-burgundy-700">{s.ko}</p>
                  <p className="mt-4 text-[14px] font-medium text-navy-900">{s.tagline}</p>
                  <p className="mt-3 max-w-md text-[14px] leading-[1.9] text-charcoal-600">{s.description}</p>
                  <ul className="mt-5 space-y-2">
                    {s.focus.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13.5px] text-charcoal-900">
                        <Check size={15} className="shrink-0 text-brass-500" strokeWidth={2.4} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-label text-[11px] uppercase tracking-[0.12em] text-navy-800/55">
                    {items.length}종 교재
                  </p>
                </div>

                <div>
                  {items.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {items.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  ) : (
                    <div className="border border-dashed border-navy-800/20 p-8 text-[13.5px] text-charcoal-600">
                      해당 시리즈 교재를 준비하고 있습니다. 필요하신 교재는 상담으로 문의해 주세요.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 하단 CTA */}
      <section className="bg-navy-950 py-16 text-ivory-100 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
          <h2 className="font-display text-[26px] font-semibold sm:text-[30px]">
            어떤 시리즈가 맞을지 고민되시나요?
          </h2>
          <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-ivory-200/80">
            학생의 학년과 현재 수준, 학습 목적을 알려주시면 알맞은 시리즈와 교재를 안내해 드립니다.
          </p>
          <Link
            href="/books"
            className="mt-8 inline-flex items-center gap-2 bg-brass-500 px-7 py-3.5 text-[14px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
          >
            전체 교재 둘러보기
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
