"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { blossomLevel, BLOSSOM_LEVEL_KO } from "@/lib/utils";
import { priceDisplay, pagesLabel } from "@/lib/productMeta";
import { seriesFor, seriesInfo } from "@/data/series";

const sorted = [...products].sort((a, b) => a.titleKo.localeCompare(b.titleKo, "ko"));

const rows: { label: string; get: (id: string) => string }[] = [
  { label: "시리즈", get: (id) => seriesInfo[seriesFor(find(id))].name },
  { label: "Target 학년", get: (id) => find(id).gradeRange },
  { label: "Reading Level", get: (id) => find(id).readingLevel ?? "—" },
  { label: "Level", get: (id) => `${blossomLevel(find(id).difficulty)} · ${BLOSSOM_LEVEL_KO[blossomLevel(find(id).difficulty)]}` },
  { label: "Purpose", get: (id) => find(id).examOrCurriculum },
  { label: "Skills", get: (id) => find(id).units.slice(0, 5).join(" · ") },
  { label: "Pages", get: (id) => pagesLabel(find(id)) },
  { label: "Price", get: (id) => priceDisplay(find(id)) },
  { label: "Answer Guide", get: (id) => (find(id).includesAnswerKey ? "포함" : "—") },
  { label: "Audio", get: (id) => (find(id).includesAudio ? "포함 (MP3)" : "—") },
];

function find(id: string) {
  return products.find((p) => p.id === id)!;
}

export default function ComparePage() {
  const [ids, setIds] = useState<string[]>([sorted[0].id, sorted[1].id, ""]);

  const selected = ids.filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Compare workbooks</p>
      <h1 className="mt-3 font-display text-[30px] font-semibold text-navy-950 sm:text-[36px]">교재 비교</h1>
      <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
        최대 3개 교재를 나란히 비교하세요. 학년·Level·목적·영역·분량·가격을 한눈에 확인할 수 있습니다.
      </p>

      {/* 선택 */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <select
            key={i}
            value={ids[i]}
            onChange={(e) => setIds((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
            className="border border-navy-800/20 bg-ivory-100 px-3 py-2.5 text-[13px] text-charcoal-900 outline-none focus:border-navy-800/50"
          >
            <option value="">{i === 2 ? "교재 선택 (선택)" : "교재 선택"}</option>
            {sorted.map((p) => (
              <option key={p.id} value={p.id}>{p.titleKo}</option>
            ))}
          </select>
        ))}
      </div>

      {/* 비교표 */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="border-b border-navy-800/15 bg-ivory-200/50 p-3 text-left font-label text-[10.5px] uppercase tracking-[0.1em] text-navy-800/60">
                항목
              </th>
              {selected.map((id) => (
                <th key={id} className="border-b border-navy-800/15 bg-ivory-200/50 p-3 text-left">
                  <span className="font-display text-[15px] font-semibold text-navy-950">{find(id).titleKo}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="odd:bg-ivory-100 even:bg-ivory-200/30">
                <td className="border-b border-navy-800/8 p-3 font-label text-[10.5px] uppercase tracking-[0.08em] text-brass-500">
                  {r.label}
                </td>
                {selected.map((id) => (
                  <td key={id} className="border-b border-navy-800/8 p-3 text-[13px] text-charcoal-900">{r.get(id)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-3" />
              {selected.map((id) => (
                <td key={id} className="p-3">
                  <Link
                    href={`/books/${id}`}
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4"
                  >
                    상세 보기 <ArrowRight size={13} />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {selected.length < 2 && (
        <p className="mt-6 text-[13px] text-charcoal-600">비교하려면 교재를 2개 이상 선택하세요.</p>
      )}
    </div>
  );
}
