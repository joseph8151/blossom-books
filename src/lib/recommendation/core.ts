// ────────────────────────────────────────────────────────────
// 교재 자동 추천 — 언어와 무관한 계산 코어.
//
// 이 파일은 "무엇을 추천할지"와 "왜 그런 판정이 나왔는지"를 키(key)로만 계산하고,
// 사람이 읽는 문장은 만들지 않습니다. 문안은 ko.ts / en.ts 가 이 결과를 받아
// 각 언어로 렌더링합니다. 한쪽 언어만 고쳐서 두 페이지가 갈라지는 일을 막기 위한 구조입니다.
//
// 설계 원칙 — 근거 없는 숫자를 만들지 않습니다.
// 내부 점수는 "어떤 교재를 고를지" 순위를 매기는 데만 쓰고, 화면에는
// 근거를 설명할 수 있는 정성 판정만 노출합니다.
// ────────────────────────────────────────────────────────────

import { Product } from "@/lib/types";
import { products } from "@/data/products";
import { isFourSkill } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";

// ── 언어와 무관한 정규 키 ────────────────────────────────────
export type LevelKey = "beginner" | "onLevel" | "advanced" | "unknown";
export type PeriodKey = "2w" | "1m" | "3m" | "undecided";
export type AbroadKey = "" | "none" | "under1" | "1to3" | "over3";
export type SchoolKey = "" | "none" | "kinder" | "intlNow" | "intlPrep";
export type WeakKey = "" | "speed" | "vocab" | "questionType" | "inference" | "none";

// 집중 영역은 두 언어에서 표기가 같아 키를 그대로 씁니다.
export const FOCUS_AREAS = ["Reading", "Vocabulary", "Grammar", "Writing", "Math"];
export const GRADES = ["Preschool / K", "Grade 1–2", "Grade 3–4", "Grade 5–6", "Grade 7–8", "Grade 9–12"];

export interface CoreExtra {
  recentScore: string;
  abroad: AbroadKey;
  school: SchoolKey;
  weak: WeakKey;
}

export const emptyExtra: CoreExtra = { recentScore: "", abroad: "", school: "", weak: "" };

export function hasExtra(e?: CoreExtra): e is CoreExtra {
  return !!e && (e.recentScore.trim() !== "" || e.abroad !== "" || e.school !== "" || e.weak !== "");
}

export interface CoreInput {
  grade: string;
  level: LevelKey;
  sr: string;
  exam: string; // 화면 표기용 시험명
  track: string; // 시험이 속한 커리큘럼 트랙 ("" = 미지정)
  period: PeriodKey;
  areas: string[];
  extra?: CoreExtra;
}

// ── 기간별 학습 전략 ─────────────────────────────────────────
export interface Strategy {
  key: PeriodKey;
  volume: string;
  priorityAreas: string[];
  sessionsPerWeek: number;
  targetWeeks: number; // 이 기간 안에 끝내야 하는 주 수
}

const STRATEGIES: Record<PeriodKey, Strategy> = {
  "2w": { key: "2w", volume: "40P", priorityAreas: ["Practice", "Mock Test"], sessionsPerWeek: 5, targetWeeks: 2 },
  "1m": { key: "1m", volume: "60P", priorityAreas: ["Practice", "Vocabulary"], sessionsPerWeek: 4, targetWeeks: 4 },
  "3m": {
    key: "3m",
    volume: "100P",
    priorityAreas: ["Reading", "Grammar", "Vocabulary", "Mock Test"],
    sessionsPerWeek: 3,
    targetWeeks: 10,
  },
  undecided: { key: "undecided", volume: "60P", priorityAreas: ["Reading", "Vocabulary"], sessionsPerWeek: 3, targetWeeks: 6 },
};

export function strategyFor(period: PeriodKey): Strategy {
  return STRATEGIES[period] ?? STRATEGIES.undecided;
}

// ── 학습 계획 ────────────────────────────────────────────────
export interface StudyPlan {
  pages: number;
  weeksMin: number;
  weeksMax: number;
  sessionsPerWeek: number;
  pagesPerSessionMin: number;
  pagesPerSessionMax: number;
  tight: boolean; // 남은 기간 안에 끝내기 빠듯한 구성인지
}

// 1회 권장 분량은 학년·난이도를 함께 봅니다. (저학년일수록 한 번에 적게)
function pagesPerSession(grade: string, difficulty: number): [number, number] {
  const g = gradeRange(grade)[1];
  if (g <= 2) return [2, 3];
  if (g <= 6) return [3, 5];
  return difficulty >= 4 ? [4, 6] : [5, 7];
}

export function buildStudyPlan(volume: string, input: CoreInput, difficulty: number): StudyPlan {
  const pages = parseInt(volume, 10) || 60;
  const s = strategyFor(input.period);
  const [minP, maxP] = pagesPerSession(input.grade, difficulty);
  const weeksMin = Math.max(1, Math.round(pages / (s.sessionsPerWeek * maxP)));
  const weeksMax = Math.max(weeksMin + 1, Math.round(pages / (s.sessionsPerWeek * minP)));
  return {
    pages,
    weeksMin,
    weeksMax,
    sessionsPerWeek: s.sessionsPerWeek,
    pagesPerSessionMin: minP,
    pagesPerSessionMax: maxP,
    // 시험일이 정해진 경우에만 "빠듯함"을 판단합니다.
    tight: input.period !== "undecided" && weeksMax > s.targetWeeks,
  };
}

// ── 적합도 판정 (키만) ───────────────────────────────────────
export type FitTone = "good" | "fair" | "check";

export interface FitFacts {
  level: "good" | "fair" | "check";
  difficulty: "right" | "high" | "low";
  exam: "high" | "medium" | "none";
}

export const FIT_TONE: Record<string, FitTone> = {
  good: "good",
  fair: "fair",
  check: "check",
  right: "good",
  high: "fair",
  low: "fair",
  medium: "fair",
  none: "check",
};

// 시험 적합도의 "high" 는 좋은 판정이라 별도로 매핑합니다.
export function examTone(v: FitFacts["exam"]): FitTone {
  return v === "high" ? "good" : v === "medium" ? "fair" : "check";
}

// ── 매칭 ────────────────────────────────────────────────────
export function gradeRange(str: string): [number, number] {
  const n = (str.match(/\d+/g) || []).map(Number);
  if (/K|Preschool|유아/i.test(str) && !n.length) return [0, 0];
  if (!n.length) return [0, 12];
  return [Math.min(...n), Math.max(...n)];
}

function overlaps(a: [number, number], b: [number, number]): boolean {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}

// 목표 난이도 — 기본은 현재 수준에서 출발하되, 추가 진단이 있으면 보정합니다.
export function targetDifficulty(input: CoreInput): number {
  let want = input.level === "advanced" ? 4 : input.level === "beginner" ? 2 : 3;
  const e = input.extra;
  if (hasExtra(e)) {
    // 영어권 체류·국제학교 경험은 실제 수준이 학년 표기보다 높은 경우가 많습니다.
    if (e.abroad === "over3" || e.school === "intlNow") want += 1;
    else if (e.abroad === "1to3" || e.school === "kinder") want += 0.5;
    // Reading 에서 기초적인 어려움을 겪으면 난이도를 낮춰 잡습니다.
    if (e.weak === "vocab" || e.weak === "speed") want -= 0.5;
  }
  return Math.max(1, Math.min(5, want));
}

// 추가 진단의 Reading 취약 응답을 집중 영역으로 환산합니다.
export function derivedAreas(input: CoreInput): string[] {
  const e = input.extra;
  if (!hasExtra(e)) return [];
  if (e.weak === "vocab") return ["Vocabulary"];
  if (e.weak === "speed" || e.weak === "inference" || e.weak === "questionType") return ["Reading"];
  return [];
}

export function effectiveAreas(input: CoreInput): string[] {
  return [...new Set([...input.areas, ...derivedAreas(input)])];
}

export interface MatchFlags {
  trackMatch: boolean;
  gradeOk: boolean;
  areaMatch: boolean;
}

function match(input: CoreInput): { product: Product; score: number; flags: MatchFlags } | null {
  const pool = products.filter((p) => p.materialType === "existing" && p.sampleAvailable);
  const want = targetDifficulty(input);
  const g = gradeRange(input.grade);
  const areas = effectiveAreas(input);
  let best: Product | null = null;
  let bestScore = -1;
  let bestFlags: MatchFlags = { trackMatch: false, gradeOk: false, areaMatch: false };

  for (const p of pool) {
    let s = 50;
    const flags: MatchFlags = { trackMatch: false, gradeOk: false, areaMatch: false };
    if (input.track && p.track === input.track) {
      s += 20;
      flags.trackMatch = true;
    }
    if (overlaps(g, gradeRange(p.gradeRange))) {
      s += 15;
      flags.gradeOk = true;
    }
    if (areas.length) {
      const u = p.units.join(" ");
      if (isFourSkill(p) || areas.some((a) => u.includes(a))) {
        s += 10;
        flags.areaMatch = true;
      }
    }
    s += 5 - Math.min(5, Math.abs(p.difficulty - want));
    if (s > bestScore) {
      bestScore = s;
      best = p;
      bestFlags = flags;
    }
  }
  if (!best) return null;
  return { product: best, score: bestScore, flags: bestFlags };
}

function buildFitFacts(p: Product, input: CoreInput): FitFacts {
  const want = targetDifficulty(input);
  const gap = p.difficulty - want;
  const gradeOk = overlaps(gradeRange(input.grade), gradeRange(p.gradeRange));
  return {
    level: gradeOk && Math.abs(gap) <= 0.5 ? "good" : gradeOk || Math.abs(gap) <= 1 ? "fair" : "check",
    difficulty: Math.abs(gap) <= 0.5 ? "right" : gap > 0.5 ? "high" : "low",
    exam: !input.track ? "none" : p.track === input.track ? "high" : "medium",
  };
}

// ── 함께 준비하면 좋은 영역 ──────────────────────────────────
function buildCompanionAreas(p: Product | null, strategy: Strategy, input: CoreInput): string[] {
  const covered = new Set<string>();
  if (p) {
    const u = p.units.join(" ");
    if (isFourSkill(p)) ["Reading", "Vocabulary", "Grammar", "Writing"].forEach((a) => covered.add(a));
    ["Reading", "Vocabulary", "Grammar", "Writing"].forEach((a) => {
      if (u.includes(a)) covered.add(a);
    });
  }
  const out: string[] = [];
  for (const area of [...strategy.priorityAreas, ...input.areas, "Mock Test"]) {
    if (covered.has(area) || out.includes(area)) continue;
    out.push(area);
  }
  return out.slice(0, 4);
}

// ── 코어 결과 ────────────────────────────────────────────────
export interface CoreResult {
  product: Product | null;
  volume: string;
  strategy: Strategy;
  plan: StudyPlan;
  fitFacts: FitFacts | null;
  flags: MatchFlags;
  companionAreas: string[];
  areas: string[]; // 추가 진단까지 반영된 집중 영역
  level: string; // Blossom 난이도 (Foundation/Standard/…)
  suggestCustom: boolean;
  refined: boolean;
}

export function computeCore(input: CoreInput): CoreResult {
  const strategy = strategyFor(input.period);
  const m = match(input);
  const product = m?.product ?? null;
  const plan = buildStudyPlan(strategy.volume, input, product?.difficulty ?? 3);
  return {
    product,
    volume: strategy.volume,
    strategy,
    plan,
    fitFacts: product ? buildFitFacts(product, input) : null,
    flags: m?.flags ?? { trackMatch: false, gradeOk: false, areaMatch: false },
    companionAreas: buildCompanionAreas(product, strategy, input),
    areas: effectiveAreas(input),
    level: product ? blossomLevel(product.difficulty) : "Standard",
    // 매칭 근거가 약하면(트랙·학년 어느 쪽도 맞지 않으면) 맞춤 제작을 제안합니다.
    suggestCustom: !m || m.score < 68,
    refined: hasExtra(input.extra),
  };
}

// ── 언어 팩이 채우는 최종 결과 ───────────────────────────────
export interface FitItem {
  label: string;
  verdict: string;
  tone: FitTone;
  why: string;
}

export interface Companion {
  area: string;
  label: string;
  reason: string;
}

export interface Analysis extends CoreResult {
  strategyHeadline: string;
  strategyDetail: string;
  fit: FitItem[];
  rationale: string[];
  reasons: string[];
  goodFor: string[];
  companions: Companion[];
}
