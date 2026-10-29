"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { GRADES, ALL_SUBJECTS, enabledSubjectsForGrade, resolveToc, type Grade } from "./curriculumData";

function buildIntro(grade: Grade, subject: string, toc: string[]): string {
  const sample = toc.slice(0, 3).join(", ");
  if (subject === "English") {
    return `이 구성은 ${grade} English 문제집입니다. ${sample} 등을 중심으로 연습합니다. 주(온타리오·BC·알버타 등)마다 코스 이름이 다를 수 있으며, 기본 목차는 Common Topics 기준입니다.`;
  }
  return `이 구성은 ${grade} ${subject} 문제집입니다. ${sample} 등을 다룹니다. 주마다 코스 이름이 다를 수 있으며, 기본 목차는 Common Topics 기준입니다.`;
}

const isSeniorMath = (subject: string) =>
  ["Academic Math", "Foundations of Math", "Pre-Calculus", "Calculus"].includes(subject);

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
  const [grade, setGrade] = useState<Grade>("G7");
  const [subject, setSubject] = useState<string>("English");

  function handleGradeSelect(g: Grade) {
    setGrade(g);
    const next = enabledSubjectsForGrade(g);
    setSubject((prev) => (next.includes(prev) ? prev : next[0]));
  }

  const enabled = enabledSubjectsForGrade(grade);
  const toc = resolveToc(grade, subject);
  const p100 = toc;
  const p200 = [...toc, "Extra Practice", "Mixed Review"];
  const intro = buildIntro(grade, subject, toc);

  return (
    <div>
      <div className="mt-4 first:mt-0">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Grade</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {GRADES.map((g) => {
            const isActive = grade === g;
            return (
              <button
                key={g}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleGradeSelect(g)}
                className={isActive ? chipActiveCls : chipCls}
              >
                {g}
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
          {grade} {subject}
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

        {isSeniorMath(subject) && (
          <p className="mt-4 text-[12px] leading-relaxed text-charcoal-600/70">
            Send course code on Kakao (e.g., MCR3U, Pre-Calc 11).
          </p>
        )}

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
