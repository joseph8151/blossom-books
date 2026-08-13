"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, FileSearch, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { CurriculumTrack } from "@/lib/types";
import { coverToneFor } from "@/lib/utils";
import { productBadges, isDirectPurchase } from "@/lib/productMeta";
import { BookCoverMockup } from "@/components/home/BookCoverMockup";

const trackLabelEn: Record<string, string> = {
  "us-curriculum": "US Curriculum",
  ap: "AP",
  admissions: "Admissions & Entrance",
  "level-test": "Level-Test Prep",
  "certified-exam": "Certified & Professional",
};

const tracks: (CurriculumTrack | "all")[] = ["all", "us-curriculum", "ap", "admissions", "level-test", "certified-exam"];

export default function EnBooksPage() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<CurriculumTrack | "all">("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("track");
    if (t && (tracks as string[]).includes(t)) setTrack(t as CurriculumTrack);
    const q = params.get("q");
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (track !== "all" && p.track !== track) return false;
        if (query.trim()) {
          const q = query.trim().toLowerCase();
          const hay = `${p.title} ${p.examOrCurriculum} ${p.subject}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      }),
    [query, track]
  );

  return (
    <div lang="en" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Catalog</p>
      <h1 className="mt-3 font-display text-[34px] font-semibold text-navy-950 sm:text-[38px]">Browse workbooks</h1>
      <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
        Every title includes a student workbook and a detailed answer key, delivered as a printable PDF.
        Open a free sample to see the actual difficulty and explanation style.
      </p>

      <div className="relative mt-10 max-w-md">
        <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-600/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, exam, or subject"
          className="w-full border border-navy-800/20 bg-ivory-100 py-3 pl-11 pr-4 text-[14px] text-charcoal-900 outline-none focus:border-navy-800/50"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-navy-800/12 pb-6">
        {tracks.map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`px-4 py-2 text-[13px] font-medium transition-colors ${
              track === t ? "bg-navy-900 text-ivory-100" : "bg-ivory-200/60 text-charcoal-600 hover:bg-ivory-200"
            }`}
          >
            {t === "all" ? "All tracks" : trackLabelEn[t]}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[12.5px] text-charcoal-600">{filtered.length} titles</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <div key={p.id} className="lift group flex flex-col overflow-hidden border border-navy-800/12 bg-ivory-100 shadow-card">
            <div className="relative flex items-center justify-center bg-gradient-to-b from-ivory-200/80 to-ivory-200/30 py-9">
              {p.sampleAvailable && (
                <span className="absolute left-3.5 top-3.5 z-10 border border-brass-500/40 bg-ivory-100/90 px-2 py-1 font-label text-[9px] uppercase tracking-[0.14em] text-brass-500">
                  Free sample
                </span>
              )}
              <BookCoverMockup
                eyebrow={p.materialType === "existing" ? "Student Workbook" : "Custom Order"}
                title={p.title.split(" — ")[0]}
                subtitle={p.examOrCurriculum}
                tone={coverToneFor(p.id)}
                size="sm"
                className="max-w-[150px]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">{trackLabelEn[p.track]}</span>
              <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug text-navy-950">{p.title.split(" — ")[0]}</h3>
              <p className="mt-1 text-[12.5px] text-charcoal-600">{p.subject} · {p.gradeRange}</p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {productBadges(p).slice(0, 4).map((b) => (
                  <span key={b} className="border border-navy-800/15 bg-ivory-200/50 px-2 py-1 font-label text-[10px] uppercase tracking-[0.06em] text-navy-800/80">
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-6 border-t border-navy-800/10 pt-4">
                <p className="text-[12px] text-charcoal-600">{isDirectPurchase(p) ? "Options & price on the detail page" : "Custom quote"}</p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/en/books/${p.id}#sample`} className="inline-flex items-center justify-center gap-1.5 border border-navy-800/25 px-3.5 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-800/50">
                    <FileSearch size={13} /> Sample
                  </Link>
                  <Link href={`/en/books/${p.id}`} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-navy-900 px-3.5 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800">
                    Details <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 border border-dashed border-navy-800/20 py-16 text-center">
          <p className="text-[14px] text-charcoal-600">No titles match your search.</p>
          <p className="mt-2 text-[13px] text-charcoal-600">
            Need something we don&apos;t list?{" "}
            <Link href="/en#contact" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4">Ask about a custom workbook</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
