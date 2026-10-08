"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MapPin, MessageCircle, Search } from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  allSchools,
  regionFilters,
  assessmentFilters,
  inquireOnlyRegions,
  type RegionTag,
  type School,
} from "../schools";
import { schoolDataCaveat } from "../data";

const chipCls =
  "shrink-0 whitespace-nowrap border border-navy-800/15 bg-white px-3 py-1.5 text-[12px] font-medium text-navy-800 transition-colors hover:border-navy-800/40";
const chipActiveCls =
  "shrink-0 whitespace-nowrap border border-navy-950 bg-navy-950 px-3 py-1.5 text-[12px] font-medium text-ivory-100";

function SchoolCard({ school }: { school: School }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-navy-800/12 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <div>
          <p className="font-display text-[16px] font-semibold text-navy-950">{school.name}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-[12px] text-charcoal-600">
            <MapPin size={12} /> {school.city}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-navy-800/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-navy-800/10 p-5 pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">지원 가능한 학년</p>
              <p className="mt-1 text-[13px] text-charcoal-700">{school.grades}</p>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">추천 Package</p>
              <p className="mt-1 text-[13px] text-charcoal-700">{school.recommendedPackage}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
              예상/공개된 평가 영역
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {school.assessmentAreas.map((a) => (
                <span key={a} className="border border-[#5f6f52]/25 bg-[#eef1e8] px-2 py-0.5 text-[11px] text-[#4f5d45]">
                  {a}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-charcoal-600/60">{schoolDataCaveat}</p>
          </div>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-[42px] items-center justify-center gap-2 bg-navy-950 px-5 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-900"
          >
            <MessageCircle size={14} />
            이 학교로 상담하기
          </a>
        </div>
      )}
    </div>
  );
}

export default function SchoolFinder() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionTag | "all">("all");
  const [assessment, setAssessment] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allSchools.filter((s) => {
      if (q && !`${s.name} ${s.city}`.toLowerCase().includes(q)) return false;
      if (region !== "all" && !s.regions.includes(region)) return false;
      if (assessment !== "all" && !s.assessmentAreas.includes(assessment)) return false;
      return true;
    });
  }, [query, region, assessment]);

  return (
    <section id="schools" className="scroll-mt-16 border-b border-navy-800/10 bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">School Finder</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            학교별 패키지 찾기
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-charcoal-600/80">{schoolDataCaveat}</p>
        </div>

        {/* 검색 + 필터. top-[77px]는 전역 Header(브래스 라인 3px + 내비 74px) 높이만큼
            내려서 고정해, 스크롤 시 헤더 아래에 자연스럽게 붙도록 합니다. */}
        <div className="sticky top-[77px] z-30 mt-10 -mx-5 bg-ivory-100/95 px-5 py-3 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-800/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="학교명 또는 도시로 검색"
              className="w-full border border-navy-800/20 bg-white py-3 pl-11 pr-4 text-[14px] text-navy-900 outline-none focus:border-navy-800/50"
            />
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
            <button type="button" onClick={() => setRegion("all")} className={region === "all" ? chipActiveCls : chipCls}>
              전체 지역
            </button>
            {regionFilters.map((r) => (
              <button key={r} type="button" onClick={() => setRegion(r)} className={region === r ? chipActiveCls : chipCls}>
                {r}
              </button>
            ))}
          </div>

          <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setAssessment("all")}
              className={assessment === "all" ? chipActiveCls : chipCls}
            >
              전체 평가 유형
            </button>
            {assessmentFilters.map((a) => (
              <button key={a} type="button" onClick={() => setAssessment(a)} className={assessment === a ? chipActiveCls : chipCls}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* 학교 카드 목록 */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {filtered.map((s) => (
            <SchoolCard key={s.id} school={s} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-[13.5px] text-charcoal-600">
            조건에 맞는 학교를 찾지 못했습니다. 학교명을 카카오톡으로 알려주시면 확인 후 추가해 드립니다.
          </p>
        )}

        {/* 아직 개별 학교를 등록하지 않은 지역 */}
        <div className="mt-14 border-t border-navy-800/10 pt-10">
          <p className="text-center font-label text-[11px] uppercase tracking-[0.16em] text-charcoal-600/60">
            곧 추가될 지역
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {inquireOnlyRegions.map((r) => (
              <div key={r.region} className="border border-navy-800/10 bg-white p-5 text-center">
                <p className="font-display text-[15px] font-semibold text-navy-950">{r.region}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-charcoal-600">{r.categories.join(" · ")}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-[520px] text-center text-[12.5px] leading-relaxed text-charcoal-600/70">
            위 지역은 특정 학교명을 임의로 올리지 않았습니다. 지원 학교명을 알려주시면 확인 후 패키지를
            구성해 드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
