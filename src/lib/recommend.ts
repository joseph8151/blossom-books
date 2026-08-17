// ────────────────────────────────────────────────────────────
// 교재 추천 엔진 — /find 와 /en/find 가 공유합니다.
// 입력(학년·수준·SR·준비 시험·집중 영역)을 실제 교재와 매칭해
// 적합도(Fit), 항목별 판정, 대안 교재를 계산합니다.
// ────────────────────────────────────────────────────────────
import { products } from "@/data/products";
import { isFourSkill } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
import { Product } from "@/lib/types";

export const FOCUS_AREAS = ["Reading", "Vocabulary", "Grammar", "Writing", "Math"] as const;
export type FocusArea = (typeof FOCUS_AREAS)[number];

// 과목 계열 — 영어 계열 교재를 수학 준비 학생에게(또는 그 반대로) 추천하지 않기 위해 사용합니다.
export type SubjectDomain = "english" | "math" | "mixed";

export type FactorCode = "track" | "grade" | "focus" | "reading" | "difficulty";

// 항목별 판정 — 맞은 것뿐 아니라 아쉬운 부분까지 그대로 보여 주기 위한 구조입니다.
export type FitStatus = "match" | "partial" | "miss";

export interface FitFactor {
  code: FactorCode;
  status: FitStatus;
  value: string; // 교재 쪽 값 (예: "Grade 5–6", "SR 4.5–5.5")
  student?: string; // 학생 입력 값 (예: "Grade 7–8", "12.5")
  missing?: string; // 교재가 다루지 않는 집중 영역
}

export interface RecommendInput {
  grade: string;
  level: string;
  sr: string;
  areas: string[];
}

export interface Recommendation {
  product: Product;
  score: number;
  factors: FitFactor[];
  suggestCustom: boolean;
}

export interface RecommendResult {
  best: Recommendation;
  alternatives: Recommendation[];
}

// 적합도가 이 값보다 낮으면 맞춤 제작·상담을 함께 제안합니다.
export const CUSTOM_SUGGEST_THRESHOLD = 72;
// 대안으로 보여 줄 최소 적합도.
const ALT_MIN_SCORE = 60;

const SCORE_MIN = 30;
const SCORE_MAX = 96;

// 입력한 SR 이 교재 표기 범위에서 이만큼 벗어나면 기존 교재로 맞추기 어렵다고 봅니다.
const SR_FAR = 2;

// 만 나이 → 미국 학년 환산 (만 6세 ≈ Kindergarten, 만 7세 ≈ Grade 1)
const AGE_TO_GRADE = 6;

type Span = [number, number];

function clampGrade(n: number): number {
  return Math.max(0, Math.min(12, n));
}

// "만 6~7세", "Grade 5–7 / SR 5.0–7.0", "K – G12 (학년별 제공)" 같은 표기를
// 모두 미국 학년(K=0 ~ G12) 구간으로 정규화합니다.
export function parseGradeSpan(raw: string): Span {
  if (!raw) return [0, 12];
  // "/" 뒤의 SR·리딩 레벨 표기와 괄호 주석은 학년 파싱에서 제외합니다.
  const text = raw.split("/")[0].replace(/\([^)]*\)/g, "").trim();

  // 만 나이 표기 — 학년 숫자로 오해하지 않도록 먼저 환산합니다.
  const age = text.match(/만\s*(\d+)\s*(?:[–—~-]\s*(\d+))?\s*세/);
  if (age) {
    const from = Number(age[1]);
    const to = age[2] ? Number(age[2]) : from;
    return [clampGrade(from - AGE_TO_GRADE), clampGrade(to - AGE_TO_GRADE)];
  }

  const hasK = /(?:^|[^A-Za-z])K(?:[^A-Za-z]|$)|Preschool|유아|미취학/i.test(text);
  const nums = (text.match(/\d+/g) || []).map(Number).filter((n) => n <= 12);

  if (nums.length) {
    const lo = hasK ? 0 : Math.min(...nums);
    const hi = /\+/.test(text) ? 12 : Math.max(...nums); // "Grade 6+" → 상한 없음
    return [clampGrade(lo), clampGrade(hi)];
  }
  if (hasK) return [0, 0];

  // 한국식 학교급 표기 ("중·고등 / 성인" 등)
  const spans: Span[] = [];
  if (/초등/.test(text)) spans.push([1, 6]);
  if (/중등|중학|중·고|중고/.test(text)) spans.push([7, 9]);
  if (/고등|고교/.test(text)) spans.push([10, 12]);
  if (/성인|adult/i.test(text)) spans.push([12, 12]);
  if (spans.length) {
    return [Math.min(...spans.map((s) => s[0])), Math.max(...spans.map((s) => s[1]))];
  }
  return [0, 12];
}

// 두 학년 구간의 거리 — 겹치면 0, 아니면 떨어진 학년 수.
export function gradeGap(a: Span, b: Span): number {
  if (Math.max(a[0], b[0]) <= Math.min(a[1], b[1])) return 0;
  return a[0] > b[1] ? a[0] - b[1] : b[0] - a[1];
}

const AREA_PATTERNS: Record<FocusArea, RegExp> = {
  Reading: /reading|리딩|독해|main idea|inference|comprehension/i,
  Vocabulary: /vocab|어휘|verbal|analog/i, // CAT4·SCAT 의 Verbal Reasoning/Analogies 포함
  Grammar: /grammar|문법|품사|시제|관계사|가정법|usage/i,
  Writing: /writing|essay|라이팅|작문|쓰기|paragraph/i,
  Math: /math|수학|algebra|geometry|calculus|quantitative|statistic|통계|확률|연산|도형|기하|사고력|수 감각|방정식/i,
};

// 교재가 실제로 다루는 학습 영역 — 과목·시험명·단원 표기에서 판별합니다.
export function coveredAreas(p: Product): FocusArea[] {
  if (isFourSkill(p)) return ["Reading", "Vocabulary", "Grammar", "Writing"];
  const haystack = [p.subject, p.examOrCurriculum, p.title, p.titleKo, ...p.units].join(" ");
  return FOCUS_AREAS.filter((a) => AREA_PATTERNS[a].test(haystack));
}

export function productDomain(p: Product): SubjectDomain {
  const covered = coveredAreas(p);
  const math = covered.includes("Math");
  const english = covered.some((a) => a !== "Math");
  if (math && english) return "mixed";
  if (math) return "math";
  if (english) return "english";
  return "mixed"; // Science·History 등 — 계열 판정 대상이 아닙니다.
}

// 학생에게 필요한 계열 — 집중 영역이 우선하고, 없으면 준비 시험의 계열을 따릅니다.
function wantedDomain(areas: string[], examDomain: SubjectDomain): SubjectDomain {
  const math = areas.includes("Math");
  const english = areas.some((a) => a !== "Math");
  if (math && english) return "mixed";
  if (math) return "math";
  if (english) return "english";
  return examDomain;
}

// "기초 (쉬운 편)" / "Beginner" 처럼 한·영 라벨을 모두 받습니다.
export function desiredDifficulty(level: string): number {
  if (/상위|앞서|Advanced/i.test(level)) return 4;
  if (/기초|쉬운|Beginner/i.test(level)) return 2;
  return 3;
}

function parseNumbers(s?: string): number[] {
  return (s?.match(/\d+(?:\.\d+)?/g) || []).map(Number);
}

function readingSpan(p: Product): Span | null {
  const n = parseNumbers(p.readingLevel);
  return n.length ? [Math.min(...n), Math.max(...n)] : null;
}

function parseSr(s: string): number | null {
  const n = parseNumbers(s);
  return n.length ? n[0] : null;
}

interface Scored extends Recommendation {
  raw: number;
  gap: number;
  srFar: boolean;
}

function scoreProduct(
  p: Product,
  f: RecommendInput,
  ctx: { track: string; domain: SubjectDomain; want: number; studentGrade: Span; sr: number | null }
): Scored {
  let s = 50;
  let srFar = false;
  const factors: FitFactor[] = [];

  // 1) 준비 시험 계열(track)
  if (ctx.track) {
    if (p.track === ctx.track) {
      s += 20;
      factors.push({ code: "track", status: "match", value: p.track });
    } else {
      s -= 6;
      factors.push({ code: "track", status: "miss", value: p.track });
    }
  }

  // 2) 학년 — 겹치지 않을수록 감점 (만 나이 교재가 상위 학년에 잡히던 문제를 막습니다)
  const gap = gradeGap(ctx.studentGrade, parseGradeSpan(p.gradeRange));
  if (gap === 0) {
    s += 18;
    factors.push({ code: "grade", status: "match", value: p.gradeRange });
  } else if (gap === 1) {
    s += 8;
    factors.push({ code: "grade", status: "partial", value: p.gradeRange, student: f.grade });
  } else {
    s -= Math.min(24, 4 + (gap - 1) * 6);
    factors.push({ code: "grade", status: "miss", value: p.gradeRange, student: f.grade });
  }

  // 3) 과목 계열 — 영어 준비 학생에게 수학 교재(또는 그 반대)를 추천하지 않습니다.
  const pDomain = productDomain(p);
  if (ctx.domain !== "mixed" && pDomain !== "mixed" && pDomain !== ctx.domain) s -= 25;

  // 4) 집중 영역
  if (f.areas.length) {
    const covered = coveredAreas(p) as string[];
    const matched = f.areas.filter((a) => covered.includes(a));
    const missing = f.areas.filter((a) => !covered.includes(a));
    if (!missing.length) {
      s += 14;
      factors.push({ code: "focus", status: "match", value: matched.join(" · ") });
    } else if (matched.length) {
      s += 7;
      factors.push({
        code: "focus",
        status: "partial",
        value: matched.join(" · "),
        missing: missing.join(" · "),
      });
    } else {
      s -= 12;
      factors.push({ code: "focus", status: "miss", value: "", missing: missing.join(" · ") });
    }
  }

  // 5) SR / 리딩 레벨 (교재에 표기가 있는 경우에만 반영)
  // 리딩 레벨 표기가 없는 교재가 반사이익을 보지 않도록 가감점 폭을 좁게 유지하고,
  // 크게 벗어난 경우는 순위 대신 "맞춤 제작·상담 제안"으로 처리합니다.
  const rSpan = readingSpan(p);
  if (ctx.sr != null && rSpan) {
    const dist = ctx.sr < rSpan[0] ? rSpan[0] - ctx.sr : ctx.sr > rSpan[1] ? ctx.sr - rSpan[1] : 0;
    const value = p.readingLevel as string;
    if (dist === 0) {
      s += 8;
      factors.push({ code: "reading", status: "match", value });
    } else if (dist <= 1) {
      s += 3;
      factors.push({ code: "reading", status: "partial", value, student: f.sr });
    } else {
      s -= 8;
      srFar = dist > SR_FAR;
      factors.push({ code: "reading", status: "miss", value, student: f.sr });
    }
  }

  // 6) 난이도 — 요청 수준과 가까울수록 가점
  const dGap = Math.abs(p.difficulty - ctx.want);
  s += 5 - Math.min(5, dGap);
  factors.push({
    code: "difficulty",
    status: dGap === 0 ? "match" : dGap === 1 ? "partial" : "miss",
    value: blossomLevel(p.difficulty),
    student: f.level,
  });

  const score = Math.max(SCORE_MIN, Math.min(SCORE_MAX, s));
  return { product: p, score, factors, suggestCustom: false, raw: s, gap, srFar };
}

export function recommend(
  f: RecommendInput,
  track: string,
  examDomain: SubjectDomain = "mixed"
): RecommendResult | null {
  const pool = products.filter((p) => p.materialType === "existing" && p.sampleAvailable);
  if (!pool.length) return null;

  const ctx = {
    track,
    domain: wantedDomain(f.areas, examDomain),
    want: desiredDifficulty(f.level),
    studentGrade: parseGradeSpan(f.grade),
    sr: parseSr(f.sr),
  };

  // 점수 내림차순, 동점이면 학년이 더 잘 맞는 교재를 앞에 둡니다.
  const ranked = pool.map((p) => scoreProduct(p, f, ctx)).sort((a, b) => b.raw - a.raw || a.gap - b.gap);

  const top = ranked[0];
  const best: Recommendation = {
    product: top.product,
    score: top.score,
    factors: top.factors,
    suggestCustom: top.score < CUSTOM_SUGGEST_THRESHOLD || top.srFar,
  };
  const alternatives = ranked
    .slice(1)
    .filter((r) => r.score >= ALT_MIN_SCORE)
    .slice(0, 2)
    .map(({ product, score, factors }) => ({ product, score, factors, suggestCustom: false }));

  return { best, alternatives };
}

// ── 학습 계획 ────────────────────────────────────────────────
export interface StudyPlan {
  pages: number;
  weeks: number;
  perWeek: number;
  perDay: number; // 주 5일 기준
}

// "100P" + 남은 기간(주)을 주당·하루 학습량으로 환산합니다.
export function studyPlan(volume: string, weeks?: number): StudyPlan | null {
  const pages = parseNumbers(volume)[0];
  if (!pages || !weeks) return null;
  const perWeek = Math.ceil(pages / weeks);
  return { pages, weeks, perWeek, perDay: Math.max(1, Math.round(perWeek / 5)) };
}
