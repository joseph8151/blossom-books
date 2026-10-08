"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, trackLabels } from "@/data/products";
import { CurriculumTrack, MaterialType } from "@/lib/types";
import { difficultyLabel } from "@/lib/utils";
import { BlossomSeries, seriesFor, seriesInfo, seriesOrder } from "@/data/series";
import ProductCard from "@/components/books/ProductCard";
import MissingBookCTA from "@/components/common/MissingBookCTA";
import { trackEvent } from "@/lib/analytics";
import { countryPrograms } from "@/data/countryPrograms";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tracks: (CurriculumTrack | "all")[] = [
  "all",
  "us-curriculum",
  "ap",
  "admissions",
  "level-test",
  "certified-exam",
];

// 기본 화면(필터 없음)에서 트랙별로 묶어 보여줄 때 쓰는 한 줄 소개.
// trackLabels(제목)와 짝을 이루는 보조 설명일 뿐, 가격·구성 등 사실 정보는
// 담지 않습니다.
const trackDescriptions: Record<CurriculumTrack, string> = {
  "us-curriculum": "미국 교과과정 기반 학년별 개념 + 문제집",
  ap: "AP 전 과목 개념 정리와 실전 문제집",
  admissions: "국제학교 입학시험 대비 교재",
  "level-test": "학원·학교 레벨테스트, 반 배정 대비 교재",
  "certified-exam": "공인 영어시험 및 전문시험 대비 교재",
};
const PREVIEW_COUNT = 4;

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

  useEffect(() => {
    trackEvent("view_product_list");
  }, []);

  // 다른 페이지에서 ?track=... / ?q=... 로 진입하면 해당 필터를 미리 적용합니다.
  // (정적 export라 window는 마운트 후에만 접근 가능 — 최초 1회성 URL 동기화이므로 규칙 예외 처리)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("track");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t && (tracks as string[]).includes(t)) setTrack(t as CurriculumTrack);
    const q = params.get("q");
    if (q) setQuery(q);
    const s = params.get("series");
    if (s && seriesOrder.includes(s as BlossomSeries)) setSeries(s as BlossomSeries);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (track !== "all" && p.track !== track) return false;
      if (material !== "all" && p.materialType !== material) return false;
      if (subject !== "all" && p.subject !== subject) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (series !== "all" && seriesFor(p) !== series) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const haystack = `${p.titleKo} ${p.title} ${p.examOrCurriculum} ${p.subject}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, track, material, subject, difficulty, series]);

  const hasRefine = subject !== "all" || difficulty !== "all" || series !== "all";
  const resetRefine = () => {
    setSubject("all");
    setDifficulty("all");
    setSeries("all");
  };

  // 아무 필터도 적용하지 않은 기본 화면에서는 64개 교재를 한 번에 나열하는
  // 대신 트랙별로 묶어 미리보기 4개 + "전체 보기"로 보여줍니다. 검색이나
  // 필터를 하나라도 적용하면 바로 전체 결과 그리드로 전환됩니다.
  const isBrowsing = track === "all" && material === "all" && !hasRefine && !query.trim();
  const groupedByTrack = useMemo(() => {
    if (!isBrowsing) return [];
    return tracks
      .filter((t): t is CurriculumTrack => t !== "all")
      .map((t) => ({
        track: t,
        items: products.filter((p) => p.track === t),
      }))
      .filter((g) => g.items.length > 0);
  }, [isBrowsing]);

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

      {/* 나라별 교과 과정 카드 */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {countryPrograms.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="flex flex-col border border-navy-800/12 bg-ivory-100 p-4 transition-colors hover:border-navy-800/30"
          >
            <p className="font-display text-[14.5px] font-semibold text-navy-950">{c.title}</p>
            <p className="mt-1.5 flex-1 text-[11.5px] leading-relaxed text-charcoal-600">{c.desc}</p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-[11.5px] font-medium text-navy-900">
              구성·가격 보기
              <ArrowRight size={11} />
            </span>
          </Link>
        ))}
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

      {!isBrowsing && (
        <p className="mt-6 text-[12.5px] text-charcoal-600">총 {filtered.length}개 교재</p>
      )}

      {isBrowsing ? (
        <div className="mt-10 space-y-16">
          {groupedByTrack.map((g, i) => (
            <div key={g.track} className={i > 0 ? "border-t border-navy-800/10 pt-14" : ""}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
                    {trackLabels[g.track]}
                  </p>
                  <p className="mt-1.5 text-[13.5px] text-charcoal-600">{trackDescriptions[g.track]}</p>
                </div>
                <button
                  onClick={() => setTrack(g.track)}
                  className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-navy-900 hover:text-brass-500"
                >
                  전체 {g.items.length}개 보기
                  <ArrowRight size={13} />
                </button>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {g.items.slice(0, PREVIEW_COUNT).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isBrowsing && filtered.length === 0 && (
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
