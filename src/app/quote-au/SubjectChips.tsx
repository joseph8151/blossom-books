"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { YEARS, ALL_SUBJECTS, enabledSubjectsForYear, resolveToc, type Year } from "./curriculumData";

function buildIntro(year: Year, subject: string, toc: string[]): string {
  const sample = toc.slice(0, 3).join(", ");
  return `이 구성은 ${year} ${subject} 문제집입니다. ${sample} 등을 중심으로 연습합니다. Australian Curriculum v9 기준으로 단원을 잡으며, VCE / HSC / QCE 과목명은 카카오톡에 주 이름을 주시면 맞춥니다.`;
}

const chipCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-100 px-4 py-1.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-ivory-100";
const chipActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-1.5 text-[12.5px] font-medium text-ivory-100 transition-colors";
const chipDisabledCls =
  "shrink-0 cursor-not-allowed whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-200/40 px-4 py-1.5 text-[12.5px] font-medium text-charcoal-600/35";

function UnitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
      {items.map((item) => (
        <li key={item}>· {item}</li>
      ))}
    </ul>
  );
}

export default function SubjectChips() {
  const [year, setYear] = useState<Year>("Y7");
  const [subject, setSubject] = useState<string>("English");

  function handleYearSelect(y: Year) {
    setYear(y);
    const next = enabledSubjectsForYear(y);
    setSubject((prev) => (next.includes(prev) ? prev : next[0]));
  }

  const enabled = enabledSubjectsForYear(year);
  const toc = resolveToc(year, subject);
  const p100 = toc;
  const p200 = [...toc, "Extra Practice", "Mixed Review"];
  const intro = buildIntro(year, subject, toc);

  return (
    <div>
      <div className="mt-4 first:mt-0">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Year</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {YEARS.map((y) => {
            const isActive = year === y;
            return (
              <button
                key={y}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleYearSelect(y)}
                className={isActive ? chipActiveCls : chipCls}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Subject</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALL_SUBJECTS.map((s) => {
            const isOn = enabled.includes(s);
            const isActive = subject === s;
            if (!isOn) {
              return (
                <span key={s} aria-disabled="true" className={chipDisabledCls}>
                  {s}
                </span>
              );
            }
            return (
              <button
                key={s}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSubject(s)}
                className={isActive ? chipActiveCls : chipCls}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
        <p className="font-display text-[16px] font-semibold text-navy-950">
          {year} {subject}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">{intro}</p>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[12.5px] font-medium text-navy-950">100P Table of Contents</p>
            <UnitList items={p100} />
          </div>
          <div>
            <p className="text-[12.5px] font-medium text-navy-950">200P Table of Contents</p>
            <p className="mt-2 text-[11.5px] italic text-charcoal-600/70">All 100P units above, plus:</p>
            <UnitList items={p200.slice(p100.length)} />
          </div>
        </div>

        <div className="mt-5 border-t border-ivory-300 pt-4">
          <p className="text-[12.5px] font-medium text-navy-950">What&rsquo;s Inside</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-charcoal-600">
            Workbook + Answer Key (해설은 한글 가능, 목차는 영어).
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2.5 border-t border-ivory-300 pt-5 sm:flex-row">
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-navy-900 px-6 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
          >
            <MessageCircle size={15} />
            이 구성 카톡 문의
          </a>
          <a
            href={siteConfig.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 border border-navy-900/30 px-6 text-[13.5px] font-medium text-navy-900 transition-colors hover:border-navy-900"
          >
            Special Package 문의
          </a>
        </div>
      </div>
    </div>
  );
}
