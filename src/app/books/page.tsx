"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { CurriculumTrack, MaterialType } from "@/lib/types";
import { difficultyLabel } from "@/lib/utils";
import { BlossomSeries, seriesFor, seriesInfo, seriesOrder } from "@/data/series";
import ProductCard from "@/components/books/ProductCard";
import { premiumEligible } from "@/lib/productMeta";
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

// 과목 필터 — 데이터에서 실제 등장하는 과목만 추출합니다.
const subjects = ["all", ...Array.from(new Set(products.map((p) => p.subject)))];
const difficulties: (number | "all")[] = ["all", 1, 2, 3, 4, 5];

export default function BooksPage() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<CurriculumTrack | "all">("all");
  const [material, setMaterial] = useState<MaterialType | "all">("all");
  const [subject, setSubject] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<number | "all">("all");
  const [series, setSeries] = useState<BlossomSeries | "all">("all");
  const [premiumOnly, setPremiumOnly] = useState(false);

  // 다른 페이지에서 ?track=... / ?q=... 로 진입하면 해당 필터를 미리 적용합니다.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("track");
    if (t && (tracks as string[]).includes(t)) setTrack(t as CurriculumTrack);
    const q = params.get("q");
    if (q) setQuery(q);
    const s = params.get("series");
    if (s && seriesOrder.includes(s as BlossomSeries)) setSeries(s as BlossomSeries);
    // 메인 Premium 섹션에서 ?premium=1 로 진입하면 200P+ 대상 교재만 보여줍니다.
    if (params.get("premium") === "1") setPremiumOnly(true);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (track !== "all" && p.track !== track) return false;
      if (material !== "all" && p.materialType !== material) return false;
      if (subject !== "all" && p.subject !== subject) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (series !== "all" && seriesFor(p) !== series) return false;
      if (premiumOnly && !premiumEligible(p)) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const haystack = `${p.titleKo} ${p.title} ${p.examOrCurriculum} ${p.subject}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, track, material, subject, difficulty, series, premiumOnly]);

  const hasRefine = subject !== "all" || difficulty !== "all" || series !== "all" || premiumOnly;
  const resetRefine = () => {
    setSubject("all");
    setDifficulty("all");
    setSeries("all");
    setPremiumOnly(false);
  };

  const selectClass =
    "border border-navy-800/20 bg-ivory-100 py-2 pl-3 pr-8 text-[13px] text-charcoal-900 outline-none focus:border-navy-800/50";

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Catalogue</p>
        <h1 className="mt-3 font-display text-[36px] font-semibold text-navy-950 sm:text-[35px]">교재 찾기</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-charcoal-600">
          교육과정, 과목, 학년, 난이도, 시리즈별로 교재를 확인하실 수 있습니다. 원하시는 교재가 없다면
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

      {/* 세부 필터 — 과목 · 난이도 · 시리즈 */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] text-navy-800/55">
          <SlidersHorizontal size={13} /> 세부 필터
        </span>

        {/* 200P+ Premium 대상만 보기 */}
        <button
          onClick={() => setPremiumOnly((v) => !v)}
          className={`inline-flex items-center gap-1.5 border px-3 py-2 font-label text-[10.5px] uppercase tracking-[0.12em] transition-colors ${
            premiumOnly
              ? "border-brass-500 bg-brass-500 text-navy-950"
              : "border-brass-500/45 text-brass-500 hover:border-brass-500"
          }`}
        >
          200P+ Premium
        </button>

        <label className="sr-only" htmlFor="subject">과목</label>
        <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={selectClass}>
          {subjects.map((s) => (
            <option key={s} value={s}>{s === "all" ? "과목 전체" : s}</option>
          ))}
        </select>

        <label className="sr-only" htmlFor="difficulty">난이도</label>
        <select
          id="difficulty"
          value={String(difficulty)}
          onChange={(e) => setDifficulty(e.target.value === "all" ? "all" : Number(e.target.value))}
          className={selectClass}
        >
          {difficulties.map((d) => (
            <option key={d} value={String(d)}>
              {d === "all" ? "난이도 전체" : `난이도 ${d} · ${difficultyLabel(d as number)}`}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="series">시리즈</label>
        <select
          id="series"
          value={series}
          onChange={(e) => setSeries(e.target.value as BlossomSeries | "all")}
          className={selectClass}
        >
          <option value="all">시리즈 전체</option>
          {seriesOrder.map((k) => (
            <option key={k} value={k}>{seriesInfo[k].name} · {seriesInfo[k].ko}</option>
          ))}
        </select>

        {hasRefine && (
          <button
            onClick={resetRefine}
            className="inline-flex items-center gap-1 text-[12.5px] text-burgundy-700 hover:underline"
          >
            <X size={13} /> 세부 필터 해제
          </button>
        )}
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
