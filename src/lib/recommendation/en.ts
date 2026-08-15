// English copy pack — renders the verdicts computed in core.ts as English prose.
// Mirrors ko.ts section for section so the two locales stay in step.

import { blossomLevel } from "@/lib/utils";
import { Product } from "@/lib/types";
import {
  computeCore,
  type Analysis,
  type Companion,
  type CoreInput,
  type CoreResult,
  type FitItem,
  type LevelKey,
  type PeriodKey,
  type AbroadKey,
  type SchoolKey,
  type WeakKey,
  type CoreExtra,
  examTone,
  FIT_TONE,
  GRADES,
  FOCUS_AREAS,
  emptyExtra,
} from "./core";

export { GRADES as grades, FOCUS_AREAS as focusAreas, emptyExtra };
export type { CoreExtra as ExtraDiagnosis, CoreInput as FindInput, Analysis };
export type { FitTone } from "./core";

export const trackLabelEn: Record<string, string> = {
  "us-curriculum": "US Curriculum",
  ap: "AP",
  admissions: "Admissions & Entrance",
  "level-test": "Level-Test Prep",
  "certified-exam": "Certified & Professional",
};

// ── Form options ─────────────────────────────────────────────
export const levels: { v: string; key: LevelKey }[] = [
  { v: "Beginner", key: "beginner" },
  { v: "On grade level", key: "onLevel" },
  { v: "Advanced", key: "advanced" },
  { v: "Not sure", key: "unknown" },
];

export const periods: { v: string; key: PeriodKey }[] = [
  { v: "Within 2 weeks", key: "2w" },
  { v: "About a month", key: "1m" },
  { v: "2–3 months", key: "3m" },
  { v: "Not decided", key: "undecided" },
];

export const exams = [
  { v: "Academy / School Level Test", track: "level-test" },
  { v: "International School Admission", track: "admissions" },
  { v: "SR / STAR Reading", track: "level-test" },
  { v: "MAP Growth", track: "admissions" },
  { v: "CAT4", track: "admissions" },
  { v: "SSAT", track: "admissions" },
  { v: "ISEE", track: "admissions" },
  { v: "TOEFL Junior", track: "certified-exam" },
  { v: "Digital SAT", track: "certified-exam" },
  { v: "AP", track: "ap" },
  { v: "IELTS / TOEFL", track: "certified-exam" },
  { v: "OET", track: "certified-exam" },
  { v: "US Curriculum (catch-up / ahead)", track: "us-curriculum" },
  { v: "Other / Not sure", track: "" },
];

export const extraOptions: {
  abroad: { v: string; key: AbroadKey }[];
  school: { v: string; key: SchoolKey }[];
  weak: { v: string; key: WeakKey }[];
} = {
  abroad: [
    { v: "None", key: "none" },
    { v: "Under 1 year", key: "under1" },
    { v: "1–3 years", key: "1to3" },
    { v: "Over 3 years", key: "over3" },
  ],
  school: [
    { v: "None", key: "none" },
    { v: "English kindergarten", key: "kinder" },
    { v: "Currently at an international school", key: "intlNow" },
    { v: "Preparing for an international school", key: "intlPrep" },
  ],
  weak: [
    { v: "Passage length and speed", key: "speed" },
    { v: "Too many unknown words", key: "vocab" },
    { v: "Recognising question types", key: "questionType" },
    { v: "Inference and main idea", key: "inference" },
    { v: "Nothing in particular", key: "none" },
  ],
};

const labelOf = <T extends string>(list: { v: string; key: T }[], key: T): string =>
  list.find((x) => x.key === key)?.v ?? "";

const title = (p: Product) => p.title.split(" — ")[0];

// 상품 데이터의 학년 표기 일부는 한국어입니다. 영문 페이지 문장에 그대로 섞이지 않도록
// 여기서 옮겨 씁니다. (products.ts 는 한국 사이트가 원본이라 데이터를 바꾸지 않습니다.)
const GRADE_EN: Record<string, string> = {
  "중·고등 / 성인": "middle school, high school and adult learners",
  성인: "adult learners",
  "만 6~7세": "ages 6–7",
  "만 9–10세": "ages 9–10",
};
export const gradeEn = (p: Product): string =>
  GRADE_EN[p.gradeRange] ?? p.gradeRange.replace(" (학년별 제공)", " (by grade)").replace(" (레벨별)", " (by level)");

// ── Period strategy copy ─────────────────────────────────────
const STRATEGY_COPY: Record<PeriodKey, { headline: string; detail: string }> = {
  "2w": {
    headline: "Practice sets + Mock Test",
    detail: "Rather than covering new ground, work through questions in the real exam format to sharpen pattern recognition and pacing.",
  },
  "1m": {
    headline: "Practice sets + Vocabulary",
    detail: "Repeat the exam question types while filling in the vocabulary that lifts a score fastest.",
  },
  "3m": {
    headline: "Reading + Grammar + Vocabulary + Mock Test",
    detail: "There is time to rebuild the fundamentals. Build each area evenly, then finish with full practice tests.",
  },
  undecided: {
    headline: "Level check + format familiarity",
    detail: "With no test date set, start by confirming the current level and getting used to the question formats. The volume can be re-fitted once a date is fixed.",
  },
};

// ── Fit assessment copy ──────────────────────────────────────
function buildFit(core: CoreResult, p: Product): FitItem[] {
  const f = core.fitFacts!;
  const level = blossomLevel(p.difficulty);

  const levelFit: FitItem = {
    label: "Current level",
    verdict: f.level === "good" ? "Good match" : f.level === "fair" ? "Mostly a match" : "Needs a check",
    tone: FIT_TONE[f.level],
    why:
      f.level === "good"
        ? `Written for ${gradeEn(p)}, and the difficulty sits close to the level you selected.`
        : f.level === "fair"
        ? "Either the grade band or the difficulty is slightly off. Worth confirming in a consultation."
        : "Both the grade band and the difficulty are off. We should look at the student's work directly.",
  };

  const difficultyFit: FitItem = {
    label: "Difficulty",
    verdict: f.difficulty === "right" ? "Right level" : f.difficulty === "high" ? "Slightly high" : "Slightly low",
    tone: FIT_TONE[f.difficulty],
    why:
      f.difficulty === "right"
        ? `${level} tier — a level the student can work through and learn from independently.`
        : f.difficulty === "high"
        ? `${level} tier, one step above the current level. Workable with guidance.`
        : `${level} tier, good for consolidating the basics — but choose one step up if it already feels familiar.`,
  };

  const examFit: FitItem = {
    label: "Exam readiness",
    verdict: f.exam === "high" ? "Strong" : f.exam === "medium" ? "Moderate" : "Needs a check",
    tone: examTone(f.exam),
    why:
      f.exam === "high"
        ? `A ${trackLabelEn[p.track]} title, so the question types line up with the exam you are preparing for.`
        : f.exam === "medium"
        ? "Not the same exam track, but useful for the underlying skills. We can point you to exam-specific sets in a consultation."
        : "No exam was specified, so exam readiness was not assessed.",
  };

  return [levelFit, difficultyFit, examFit];
}

// ── Why this recommendation (3–4 sentences) ──────────────────
function buildRationale(core: CoreResult, input: CoreInput): string[] {
  const out: string[] = [];
  const levelLabel = labelOf(levels, input.level);
  const goal = input.exam && !input.exam.startsWith("Other") ? input.exam : "a general English check";
  const srPart = input.sr.trim() ? ` The reading level given is ${input.sr.trim()}.` : "";
  out.push(`${input.grade}, currently "${levelLabel}", preparing for ${goal}.${srPart}`);

  const e = input.extra;
  if (core.refined && e) {
    const notes: string[] = [];
    if (e.abroad && e.abroad !== "none") notes.push(`${labelOf(extraOptions.abroad, e.abroad)} abroad`);
    if (e.school && e.school !== "none") notes.push(labelOf(extraOptions.school, e.school));
    if (e.recentScore.trim()) notes.push(`recent result ${e.recentScore.trim()}`);
    if (notes.length) out.push(`We adjusted the difficulty for the background you added: ${notes.join(", ")}.`);
    if (e.weak && e.weak !== "none") {
      out.push(`Since "${labelOf(extraOptions.weak, e.weak)}" was flagged as the hard part of reading, that area is prioritised.`);
    }
  }

  const headline = STRATEGY_COPY[core.strategy.key].headline;
  out.push(
    input.period === "undecided"
      ? `With no test date set, we suggest a ${headline} build to establish where the student stands first.`
      : `With ${labelOf(periods, input.period).toLowerCase()} until the test, a ${headline} build takes priority.`
  );

  const p = core.product;
  if (p) {
    const areaPart = core.areas.length ? `, particularly ${core.areas.join(", ")}` : "";
    out.push(
      `${title(p)} is a ${trackLabelEn[p.track]} workbook for ${gradeEn(p)}, so it can be used straight away for format practice${areaPart}. ` +
        `At ${core.volume} that works out to roughly ${core.plan.weeksMin}–${core.plan.weeksMax} weeks.`
    );
  } else {
    out.push("This combination is hard to match with an existing title, so we would propose a custom-built workbook.");
  }
  return out;
}

// ── Match evidence ───────────────────────────────────────────
function buildReasons(core: CoreResult, p: Product): string[] {
  const out: string[] = [];
  if (core.flags.trackMatch) out.push(`${trackLabelEn[p.track]} track, matching the exam`);
  if (core.flags.gradeOk) out.push(`Written for ${gradeEn(p)}`);
  if (core.flags.areaMatch) out.push(`Covers your focus areas (${core.areas.join(", ")})`);
  out.push(`${blossomLevel(p.difficulty)} difficulty`);
  return out;
}

// ── Who this workbook suits ──────────────────────────────────
function buildGoodFor(core: CoreResult, input: CoreInput, p: Product): string[] {
  const out: string[] = [];
  const exam = input.exam && !input.exam.startsWith("Other") ? input.exam : "";
  if (exam && core.flags.trackMatch) out.push(`Students meeting ${exam} question formats for the first time`);
  if (core.areas.length) out.push(`Students who want enough ${core.areas.join(", ")} practice to feel ready`);
  out.push(`Students among ${gradeEn(p)} who need ${blossomLevel(p.difficulty)}-tier material`);
  if (input.period === "2w") out.push("Students sharpening exam instincts right before the test");
  else if (input.period === "3m") out.push("Students with time to rebuild the fundamentals first");
  return [...new Set(out)].slice(0, 4);
}

// ── Areas worth preparing alongside ──────────────────────────
const COMPANION_COPY: Record<string, { label: string; reason: string }> = {
  Reading: { label: "Reading support", reason: "As passage length and speed stop being a barrier, the other areas rise with it." },
  Vocabulary: { label: "Vocabulary support", reason: "The area that moves a score fastest over a short period." },
  Grammar: { label: "Grammar support", reason: "Once sentence structure is solid, reading and writing steady together." },
  Writing: { label: "Writing support", reason: "Needs separate practice if the exam includes constructed responses or essays." },
  Math: { label: "Math support", reason: "Worth preparing with a separate workbook if the exam has a quantitative section." },
  "Mock Test": { label: "Mock Test", reason: "Sit at least one full test in the real format and timing before exam day." },
  Practice: { label: "Practice sets", reason: "Questions in the real exam format, used to check pacing." },
};

function buildCompanions(core: CoreResult): Companion[] {
  return core.companionAreas.map((area) => ({
    area,
    label: COMPANION_COPY[area]?.label ?? area,
    reason: COMPANION_COPY[area]?.reason ?? "We can confirm whether it is needed during the consultation.",
  }));
}

// ── Entry point ──────────────────────────────────────────────
export function analyze(input: CoreInput): Analysis {
  const core = computeCore(input);
  const copy = STRATEGY_COPY[core.strategy.key];
  return {
    ...core,
    strategyHeadline: copy.headline,
    strategyDetail: copy.detail,
    fit: core.product ? buildFit(core, core.product) : [],
    rationale: buildRationale(core, input),
    reasons: core.product ? buildReasons(core, core.product) : [],
    goodFor: core.product ? buildGoodFor(core, input, core.product) : [],
    companions: buildCompanions(core),
  };
}

// Display labels for the report header
export const displayLevel = (key: LevelKey | ""): string => (key ? labelOf(levels, key) : "");
export const displayPeriod = (key: PeriodKey | ""): string => (key ? labelOf(periods, key) : "");
