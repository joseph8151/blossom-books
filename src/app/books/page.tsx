"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { CurriculumTrack, MaterialType } from "@/lib/types";
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

const materialFilters: { value: MaterialType | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "existing", label: "바로 구매 가능" },
  { value: "custom", label: "주문 제작 가능" },
];

export default function BooksPage() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<CurriculumTrack | "all">("all");
  const [material, setMaterial] = useState<MaterialType | "all">("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (track !== "all" && p.track !== track) return false;
      if (material !== "all" && p.materialType !== material) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const haystack = `${p.titleKo} ${p.title} ${p.examOrCurriculum} ${p.subject}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, track, material]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Catalogue</p>
        <h1 className="mt-3 font-display text-[36px] font-semibold text-navy-950 sm:text-[42px]">교재 찾기</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
          교육과정, 시험, 학년, 난이도별로 교재를 확인하실 수 있습니다. 원하시는 교재가 없다면
          주문 제작을 상담해보세요.
        </p>
      </div>

      {/* 검색 */}
      <div className="relative mt-10 max-w-md">
        <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-600/50" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="교재명, 시험명, 과목으로 검색"
          className="w-full border border-navy-800/20 bg-ivory-100 py-3 pl-11 pr-4 text-[14px] text-charcoal-900 outline-none focus:border-navy-800/50"
        />
      </div>

      {/* 교육과정 트랙 필터 */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-navy-800/12 pb-6">
        {tracks.map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`px-4 py-2 text-[13px] font-medium transition-colors ${
              track === t ? "bg-navy-900 text-ivory-100" : "bg-ivory-200/60 text-charcoal-600 hover:bg-ivory-200"
            }`}
          >
            {t === "all" ? "전체 교육과정" : trackLabels[t]}
          </button>
        ))}
      </div>

      {/* 구매 방식 필터 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {materialFilters.map((m) => (
          <button
            key={m.value}
            onClick={() => setMaterial(m.value)}
            className={`px-3.5 py-1.5 text-[12.5px] font-medium border transition-colors ${
              material === m.value
                ? "border-burgundy-700 text-burgundy-700"
                : "border-navy-800/15 text-charcoal-600 hover:border-navy-800/35"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[12.5px] text-charcoal-600">총 {filtered.length}개 교재</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 border border-dashed border-navy-800/20 py-16 text-center">
          <p className="text-[14px] text-charcoal-600">조건에 맞는 교재를 찾지 못했습니다.</p>
          <p className="mt-2 text-[13px] text-charcoal-600">
            원하시는 교재가 없다면{" "}
            <a href="/custom-order" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4">
              주문 제작
            </a>
            을 상담해보세요.
          </p>
        </div>
      )}

      <div className="mt-16">
        <MissingBookCTA />
      </div>
    </div>
  );
}
