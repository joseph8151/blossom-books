"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { CurriculumTrack } from "@/lib/types";
import ProductCard from "@/components/books/ProductCard";
import MissingBookCTA from "@/components/common/MissingBookCTA";

const tracks: (CurriculumTrack | "all")[] = [
  "all",
  "us-curriculum",
  "ap",
  "admissions",
  "level-test",
  "certified-exam",
];

export default function CategorySection() {
  const [active, setActive] = useState<CurriculumTrack | "all">("all");
  const filtered = active === "all" ? products : products.filter((p) => p.track === active);

  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <span className="eyebrow">Catalogue</span>
            <h2 className="mt-4 font-display text-[32px] font-semibold text-navy-950 sm:text-[38px]">
              교육과정과 시험별로 정리된 교재
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
              미국 교과과정, AP, 국제학교 입학시험, 공인 영어시험까지 — 이미 제작된 교재를
              바로 확인하고, 필요한 구성으로 주문 제작도 상담할 수 있습니다.
            </p>
          </div>
          <Link
            href="/books"
            className="inline-flex shrink-0 items-center gap-2 text-[13.5px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
          >
            전체 교재 찾기
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 트랙 필터 탭 */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-navy-800/12 pb-6">
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setActive(track)}
              className={`px-4 py-2 text-[13px] font-medium transition-all ${
                active === track
                  ? "bg-navy-900 text-ivory-100 shadow-soft"
                  : "bg-transparent text-charcoal-600 hover:bg-ivory-100 hover:shadow-soft"
              }`}
            >
              {track === "all" ? "전체" : trackLabels[track]}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 border border-navy-800/25 bg-ivory-100 px-7 py-3.5 text-[14px] font-medium text-navy-900 shadow-soft transition-all hover:-translate-y-0.5 hover:border-navy-800/50 hover:shadow-lift"
          >
            전체 교재 보기
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-16">
          <MissingBookCTA />
        </div>
      </div>
    </section>
  );
}
