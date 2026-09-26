"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import {
  GRADES,
  ENGLISH_TOC,
  MATH_TOC,
  HS_MATH_COURSES,
  AP_SUBJECTS,
  type Grade,
} from "./curriculumData";

type GradeTab = Grade | "AP";

const HS_MATH_KEYS = Object.keys(HS_MATH_COURSES); // Geometry, Algebra 1, Algebra 2, Precalculus, Calculus, Statistics
// 학년(비-AP)에서 보여줄 전체 과목 칩 — 학년에 안 맞아도 칩 자체는 항상 노출하고 disabled 처리
const ALL_GRADE_SUBJECTS = ["English", "Math", "Pre-Algebra", ...HS_MATH_KEYS];

function isSubjectEnabled(grade: Grade, subject: string): boolean {
  const n = Number(grade.slice(1));
  if (subject === "English" || subject === "Math") return true;
  if (subject === "Pre-Algebra") return n === 7 || n === 8;
  return n >= 9; // Geometry, Algebra 1/2, Precalculus, Calculus, Statistics
}

function subjectsForGrade(grade: GradeTab): string[] {
  if (grade === "AP") return AP_SUBJECTS.map((a) => a.title);
  return ALL_GRADE_SUBJECTS.filter((s) => isSubjectEnabled(grade, s));
}

function buildIntro(kind: "english" | "math" | "hsmath" | "ap", label: string, toc: string[]): string {
  const sample = toc.slice(0, 3).join(", ");
  if (kind === "english") {
    return `이 구성은 ${label} 영어 리딩·라이팅 대비 문제집입니다. ${sample} 등을 중심으로 연습합니다. 학교 교과서 목차와 다를 수 있으며, 필요한 단원은 카카오톡으로 추가 요청하실 수 있습니다.`;
  }
  if (kind === "math") {
    return `이 구성은 ${label} 수학 대비 문제집입니다. ${sample} 등 핵심 범위를 다룹니다. 학교 교과서 목차와 다를 수 있으며, 필요한 단원은 카카오톡으로 추가 요청하실 수 있습니다.`;
  }
  if (kind === "hsmath") {
    return `이 구성은 ${label} 문제집입니다. ${sample} 등 코스 전 범위를 단원별로 연습합니다. 학교 교과서 목차와 다를 수 있으며, 필요한 단원은 카카오톡으로 추가 요청하실 수 있습니다.`;
  }
  return `이 구성은 ${label} 시험 대비 문제집입니다. College Board 공식 유닛 기준으로 ${sample} 등을 다룹니다. 학교 진도와 다를 수 있으며, 필요한 유닛은 카카오톡으로 추가 요청하실 수 있습니다.`;
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

function InquireOnlyPanel({ title }: { title: string }) {
  return (
    <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
      <p className="font-display text-[16px] font-semibold text-navy-950">{title}</p>
      <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">
        이 구성은 학교·학원 커리큘럼에 따라 범위가 다양해 표준 목차를 고정해 두지 않습니다. 카카오톡으로
        필요한 범위를 알려주시면 목차를 맞춰 구성해 드립니다.
      </p>
      <a
        href={siteConfig.kakaoChannelUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 bg-navy-900 px-6 text-[13.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800"
      >
        <MessageCircle size={15} />
        카카오톡으로 범위 문의
      </a>
    </div>
  );
}

export default function SubjectChips() {
  const [gradeTab, setGradeTab] = useState<GradeTab>("G6");
  const [subject, setSubject] = useState<string>("English");

  function handleGradeSelect(g: GradeTab) {
    setGradeTab(g);
    const next = subjectsForGrade(g);
    // 학년을 바꿔도 같은 과목(English/Math)이 있으면 유지, 없으면 첫 번째 과목으로
    setSubject((prev) => (next.includes(prev) ? prev : next[0]));
  }

  const panel = useMemo(() => {
    if (gradeTab === "AP") {
      const ap = AP_SUBJECTS.find((a) => a.title === subject);
      if (!ap) return null;
      if (!ap.toc) return { inquire: true as const, title: ap.title };
      const core = ap.toc.slice(0, Math.ceil(ap.toc.length / 2));
      const p100 = [...core, "Skill Drills"];
      const p200 = [...ap.toc, "Section Review 1", "Section Review 2"];
      const intro = buildIntro("ap", ap.title, ap.toc);
      return { inquire: false as const, title: ap.title, intro, p100, p200 };
    }

    const grade = gradeTab as Grade;
    if (subject === "English") {
      const toc = ENGLISH_TOC[grade];
      return {
        inquire: false as const,
        title: `${grade} English`,
        intro: buildIntro("english", `${grade} English`, toc),
        p100: toc,
        p200: [...toc, "Review Tests"],
      };
    }
    if (subject === "Math") {
      const toc = MATH_TOC[grade];
      return {
        inquire: false as const,
        title: `${grade} Math`,
        intro: buildIntro("math", `${grade} Math`, toc),
        p100: toc,
        p200: [...toc, "Extra Practice", "Mixed Review"],
      };
    }
    if (subject === "Pre-Algebra") {
      return { inquire: true as const, title: `${grade} Pre-Algebra` };
    }
    const course = HS_MATH_COURSES[subject];
    if (course) {
      return {
        inquire: false as const,
        title: course.title,
        intro: buildIntro("hsmath", course.title, course.toc),
        p100: course.toc,
        p200: [...course.toc, "Extra Practice", "Mixed Review"],
      };
    }
    return null;
  }, [gradeTab, subject]);

  return (
    <div>
      {/* 학년 칩 */}
      <div className="mt-4 first:mt-0">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Grade</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          {GRADES.map((g) => {
            const isActive = gradeTab === g;
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
          <button
            type="button"
            aria-pressed={gradeTab === "AP"}
            onClick={() => handleGradeSelect("AP")}
            className={gradeTab === "AP" ? chipActiveCls : chipCls}
          >
            AP
          </button>
        </div>
      </div>

      {/* 과목 칩 — 학년에 맞는 것만 노출/활성화 */}
      <div className="mt-4">
        <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Subject</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {gradeTab === "AP"
            ? AP_SUBJECTS.map((a) => {
                const isActive = subject === a.title;
                return (
                  <button
                    key={a.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSubject(a.title)}
                    className={isActive ? chipActiveCls : chipCls}
                  >
                    {a.title}
                  </button>
                );
              })
            : ALL_GRADE_SUBJECTS.map((s) => {
                const enabled = isSubjectEnabled(gradeTab as Grade, s);
                const isActive = subject === s;
                if (!enabled) {
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

      {/* 패널 */}
      {panel && panel.inquire && <InquireOnlyPanel title={panel.title} />}

      {panel && !panel.inquire && (
        <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
          <p className="font-display text-[16px] font-semibold text-navy-950">{panel.title}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">{panel.intro}</p>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">100P Table of Contents</p>
              <UnitList items={panel.p100} />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">200P Table of Contents</p>
              <p className="mt-2 text-[11.5px] italic text-charcoal-600/70">All 100P units above, plus:</p>
              <UnitList items={panel.p200.slice(panel.p100.length)} />
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
      )}
    </div>
  );
}
