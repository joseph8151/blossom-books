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
  COURSE_CATEGORIES,
  CORE_SCIENCE,
  type Grade,
} from "./curriculumData";

type Mode = "us" | "ap";
type SubMode = "grade" | "course";
type Stage = "STANDARD" | "ADVANCED";
type GradeSubject = "English" | "Math" | "Science";
type CourseCategory = keyof typeof COURSE_CATEGORIES;

const COURSE_CATEGORY_NAMES = Object.keys(COURSE_CATEGORIES) as CourseCategory[];

function buildIntro(kind: "english" | "math" | "course", label: string, toc: string[]): string {
  const sample = toc.slice(0, 3).join(", ");
  if (kind === "english") {
    return `이 구성은 ${label} 영어 리딩·라이팅 대비 문제집입니다. ${sample} 등을 중심으로 연습합니다. 학교 교과서 목차와 다를 수 있으며, 필요한 단원은 카카오톡으로 추가 요청하실 수 있습니다.`;
  }
  if (kind === "math") {
    return `이 구성은 ${label} 수학 대비 문제집입니다. ${sample} 등 핵심 범위를 다룹니다. 학교 교과서 목차와 다를 수 있으며, 필요한 단원은 카카오톡으로 추가 요청하실 수 있습니다.`;
  }
  return `이 구성은 ${label} 문제집입니다. ${sample} 등 코스 전 범위를 단원별로 연습합니다. 학교 교과서 목차와 다를 수 있으며, 필요한 단원은 카카오톡으로 추가 요청하실 수 있습니다.`;
}

const tabCls =
  "flex-1 border border-ivory-300 bg-white px-4 py-2.5 text-center text-[13px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const tabActiveCls = "flex-1 border border-navy-900 bg-navy-900 px-4 py-2.5 text-center text-[13px] font-medium text-ivory-100";

const subTabCls =
  "flex-1 border px-3 py-2 text-center text-[12px] font-medium transition-colors border-ivory-300 bg-white text-charcoal-600 hover:border-navy-900/40";
const subTabActiveCls =
  "flex-1 border px-3 py-2 text-center text-[12px] font-medium transition-colors border-navy-900/60 bg-ivory-200/60 text-navy-900";

const catCls =
  "shrink-0 whitespace-nowrap border border-ivory-300 bg-white px-3.5 py-1.5 text-[12px] font-medium text-charcoal-600 transition-colors hover:border-navy-900/50";
const catActiveCls =
  "shrink-0 whitespace-nowrap border border-navy-900/70 bg-ivory-200/70 px-3.5 py-1.5 text-[12px] font-medium text-navy-900";

const chipCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-ivory-100 px-4 py-1.5 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-950 hover:text-ivory-100";
const chipActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-1.5 text-[12.5px] font-medium text-ivory-100 transition-colors";

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

// Advanced 목차는 아직 확정된 데이터가 없습니다. 실제 데이터가 없는 구성을
// 임의로 만들어내지 않고, 상담을 통해 확인하도록 안내합니다.
function AdvancedInquirePanel({ title }: { title: string }) {
  return (
    <div className="mt-4 rounded-xl border border-navy-950 bg-navy-950 p-6">
      <p className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-400">Advanced</p>
      <p className="mt-2 font-display text-[16px] font-semibold text-ivory-100">{title} Advanced</p>
      <p className="mt-3 text-[13px] leading-relaxed text-ivory-100/75">
        Standard보다 한 단계 높은 심화·응용 문제로 별도 구성됩니다. 과목·학년에 따라 실제 구성이 달라
        카카오톡 상담을 통해 확인 후 진행합니다. 가격은 같은 분량의 Standard와 동일합니다.
      </p>
      <a
        href={siteConfig.kakaoChannelUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 bg-brass-500 px-6 text-[13.5px] font-medium text-navy-950 transition-colors hover:bg-brass-400"
      >
        <MessageCircle size={15} />
        {title} Advanced 상담하기
      </a>
    </div>
  );
}

export default function SubjectChips() {
  const [mode, setMode] = useState<Mode>("us");
  const [subMode, setSubMode] = useState<SubMode>("grade");
  const [grade, setGrade] = useState<Grade>("G6");
  const [gradeSubject, setGradeSubject] = useState<GradeSubject>("English");
  const [courseCategory, setCourseCategory] = useState<CourseCategory>("Math");
  const [course, setCourse] = useState<string>("Algebra 1");
  const [apSubject, setApSubject] = useState<string>(AP_SUBJECTS[0].title);
  const [stage, setStage] = useState<Stage>("STANDARD");

  function handleCategorySelect(cat: CourseCategory) {
    setCourseCategory(cat);
    setCourse(COURSE_CATEGORIES[cat][0]);
  }

  const standardPanel = useMemo(() => {
    if (mode === "ap") {
      const ap = AP_SUBJECTS.find((a) => a.title === apSubject);
      if (!ap) return null;
      if (!ap.toc) return { inquire: true as const, title: ap.title };
      const core = ap.toc.slice(0, Math.ceil(ap.toc.length / 2));
      const p100 = [...core, "Skill Drills"];
      const p200 = [...ap.toc, "Section Review 1", "Section Review 2"];
      const sample = ap.toc.slice(0, 3).join(", ");
      const intro = `이 구성은 ${ap.title} 시험 대비 문제집입니다. College Board 공식 유닛 기준으로 ${sample} 등을 다룹니다. 학교 진도와 다를 수 있으며, 필요한 유닛은 카카오톡으로 추가 요청하실 수 있습니다.`;
      return { inquire: false as const, title: ap.title, intro, p100, p200 };
    }

    if (subMode === "grade") {
      if (gradeSubject === "Science") return { inquire: true as const, title: `${grade} Science` };
      const toc = gradeSubject === "English" ? ENGLISH_TOC[grade] : MATH_TOC[grade];
      return {
        inquire: false as const,
        title: `${grade} ${gradeSubject}`,
        intro: buildIntro(gradeSubject === "English" ? "english" : "math", `${grade} ${gradeSubject}`, toc),
        p100: toc,
        p200:
          gradeSubject === "English" ? [...toc, "Review Tests"] : [...toc, "Extra Practice", "Mixed Review"],
      };
    }

    // subMode === "course" — Math 카테고리 일부만 실제 목차가 있고,
    // 나머지 카테고리(Science/Social Studies/English & Literature)와 Math의
    // 신규 코스는 아직 목차 데이터가 없어 상담 안내로 처리합니다.
    const data = HS_MATH_COURSES[course];
    if (!data) return { inquire: true as const, title: course };
    return {
      inquire: false as const,
      title: data.title,
      intro: buildIntro("course", data.title, data.toc),
      p100: data.toc,
      p200: [...data.toc, "Extra Practice", "Mixed Review"],
    };
  }, [mode, subMode, grade, gradeSubject, course, apSubject]);

  const currentTitle =
    mode === "ap" ? apSubject : subMode === "grade" ? `${grade} ${gradeSubject}` : course;

  return (
    <div>
      {/* US Curriculum / AP Courses */}
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode("us")} className={mode === "us" ? tabActiveCls : tabCls}>
          US Curriculum
        </button>
        <button type="button" onClick={() => setMode("ap")} className={mode === "ap" ? tabActiveCls : tabCls}>
          AP Courses
        </button>
      </div>

      {mode === "us" && (
        <>
          {/* Grade-Based / Course-Based */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setSubMode("grade")}
              className={subMode === "grade" ? subTabActiveCls : subTabCls}
            >
              Grade-Based (English · Math · Science)
            </button>
            <button
              type="button"
              onClick={() => setSubMode("course")}
              className={subMode === "course" ? subTabActiveCls : subTabCls}
            >
              Course-Based (Math · Science · Social Studies · English)
            </button>
          </div>

          {subMode === "grade" ? (
            <>
              <div className="mt-4">
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Grade</p>
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={grade === g}
                      onClick={() => setGrade(g)}
                      className={grade === g ? chipActiveCls : chipCls}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">Subject</p>
                <div className="mt-2 flex gap-2">
                  {(["English", "Math", "Science"] as GradeSubject[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={gradeSubject === s}
                      onClick={() => setGradeSubject(s)}
                      className={gradeSubject === s ? chipActiveCls : chipCls}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-4">
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
                  Category
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-charcoal-600/70">
                  특정 학년에 고정하지 않습니다. 학생 학년은 카카오톡 상담에서 알려주세요.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {COURSE_CATEGORY_NAMES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={courseCategory === cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={courseCategory === cat ? catActiveCls : catCls}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
                  {courseCategory} Courses
                </p>
                {courseCategory === "Science" ? (
                  <>
                    <p className="mt-2 text-[10.5px] uppercase tracking-[0.08em] text-charcoal-600/50">
                      Core Science
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {CORE_SCIENCE.map((c) => (
                        <button
                          key={c}
                          type="button"
                          aria-pressed={course === c}
                          onClick={() => setCourse(c)}
                          className={course === c ? chipActiveCls : chipCls}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-[10.5px] uppercase tracking-[0.08em] text-charcoal-600/50">
                      Additional Science
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {COURSE_CATEGORIES.Science.filter((c) => !CORE_SCIENCE.includes(c)).map((c) => (
                        <button
                          key={c}
                          type="button"
                          aria-pressed={course === c}
                          onClick={() => setCourse(c)}
                          className={course === c ? chipActiveCls : chipCls}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {COURSE_CATEGORIES[courseCategory].map((c) => (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={course === c}
                        onClick={() => setCourse(c)}
                        className={course === c ? chipActiveCls : chipCls}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Standard / Advanced — AP에는 적용하지 않습니다 */}
          <div className="mt-5">
            <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
              Difficulty
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["STANDARD", "ADVANCED"] as Stage[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={stage === s}
                  onClick={() => setStage(s)}
                  className={stage === s ? chipActiveCls : chipCls}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {mode === "ap" && (
        <div className="mt-4">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
            AP Course · Standard/Advanced 구분 없이 기존 구성 그대로 판매합니다
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AP_SUBJECTS.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={apSubject === a.title}
                onClick={() => setApSubject(a.title)}
                className={apSubject === a.title ? chipActiveCls : chipCls}
              >
                {a.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 패널 — AP는 Standard/Advanced 구분 없이 항상 기존 구성 그대로.
          US Curriculum은 Standard일 때만 실제 목차를 보여주고, Advanced는
          아직 확정된 목차 데이터가 없으므로 상담 안내로 대체합니다. */}
      {mode === "us" && stage === "ADVANCED" ? (
        <AdvancedInquirePanel title={currentTitle} />
      ) : standardPanel?.inquire ? (
        <InquireOnlyPanel title={mode === "ap" ? standardPanel.title : `${currentTitle} (Standard)`} />
      ) : standardPanel ? (
        <div className="mt-4 rounded-xl border border-ivory-300 bg-ivory-100 p-6">
          {mode === "us" && (
            <p className="font-label text-[10px] uppercase tracking-[0.14em] text-navy-800/60">Standard</p>
          )}
          <p className="mt-1 font-display text-[16px] font-semibold text-navy-950">{standardPanel.title}</p>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">{standardPanel.intro}</p>

          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">100P Table of Contents</p>
              <UnitList items={standardPanel.p100} />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-navy-950">200P Table of Contents</p>
              <p className="mt-2 text-[11.5px] italic text-charcoal-600/70">
                Same coverage as 100P, with more practice:
              </p>
              <UnitList items={standardPanel.p200.slice(standardPanel.p100.length)} />
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
      ) : null}
    </div>
  );
}
