// ────────────────────────────────────────────────────────────
// 교재 자동 추천 엔진.
// 입력(학년·수준·시험·기간·집중영역 + 선택 추가진단)을 받아 추천 교재와
// 그 근거·학습 계획·적합도·보완 영역까지 한 번에 계산합니다.
//
// 설계 원칙 — 근거 없는 숫자를 만들지 않습니다.
// 내부 점수는 "어떤 교재를 고를지" 순위를 매기는 데만 쓰고, 화면에는
// 계산 근거를 설명할 수 있는 정성 판정(잘 맞음 / 적정 / 높음)만 노출합니다.
// ────────────────────────────────────────────────────────────

import { Product } from "@/lib/types";
import { products, trackLabels } from "@/data/products";
import { isFourSkill } from "@/lib/productMeta";
import { blossomLevel, BLOSSOM_LEVEL_KO, josa } from "@/lib/utils";

export interface ExtraDiagnosis {
  recentScore: string; // 최근 영어시험 점수·결과
  abroad: string; // 해외 거주 경험
  englishSchool: string; // 영어유치원 / 국제학교 경험
  readingWeak: string; // Reading 에서 어려운 부분
}

export interface FindInput {
  grade: string;
  level: string;
  sr: string;
  exam: string;
  period: string;
  areas: string[];
  extra?: ExtraDiagnosis;
}

export const emptyExtra: ExtraDiagnosis = { recentScore: "", abroad: "", englishSchool: "", readingWeak: "" };

export function hasExtra(e?: ExtraDiagnosis): e is ExtraDiagnosis {
  return !!e && Object.values(e).some((v) => v.trim() !== "");
}

// ── 폼 선택지 ────────────────────────────────────────────────
export const grades = ["Preschool / K", "Grade 1–2", "Grade 3–4", "Grade 5–6", "Grade 7–8", "Grade 9–12"];
export const levels = ["기초 (쉬운 편)", "보통 (학년 수준)", "상위 (앞서가는 편)", "잘 모르겠어요"];
export const focusAreas = ["Reading", "Vocabulary", "Grammar", "Writing", "Math"];

export const exams = [
  { v: "영어학원 / 학교 레벨테스트", track: "level-test" },
  { v: "국제학교 입학/편입 시험", track: "admissions" },
  { v: "SR / STAR Reading", track: "level-test" },
  { v: "MAP Growth", track: "admissions" },
  { v: "CAT4", track: "admissions" },
  { v: "ISEE", track: "admissions" },
  { v: "SSAT", track: "admissions" },
  { v: "WIDA", track: "certified-exam" },
  { v: "TOEFL Junior", track: "certified-exam" },
  { v: "UKiset", track: "admissions" },
  { v: "ISEB Common Pre-Test", track: "admissions" },
  { v: "Digital SAT", track: "certified-exam" },
  { v: "AP", track: "ap" },
  { v: "IGCSE", track: "us-curriculum" },
  { v: "GRE", track: "certified-exam" },
  { v: "LSAT", track: "certified-exam" },
  { v: "PTE", track: "certified-exam" },
  { v: "IELTS", track: "certified-exam" },
  { v: "OET", track: "certified-exam" },
  { v: "미국 교과과정 (보충/선행)", track: "us-curriculum" },
  { v: "기타 / 잘 모르겠어요", track: "" },
];

export const periods = ["2주 이내", "약 1개월", "2~3개월", "아직 미정"];

export const extraOptions = {
  abroad: ["없음", "1년 미만", "1~3년", "3년 이상"],
  englishSchool: ["없음", "영어유치원", "국제학교 재학", "국제학교 준비 중"],
  readingWeak: ["지문 길이·속도", "모르는 단어가 많음", "문제 유형 파악", "추론·주제 찾기", "특별히 없음"],
};

// ── 기간별 학습 전략 ─────────────────────────────────────────
export interface PeriodStrategy {
  period: string;
  volume: string; // 추천 분량
  headline: string; // 예: "실전 문제 + Mock Test 중심"
  detail: string;
  priorityAreas: string[]; // 이 기간에 우선해야 할 영역
  sessionsPerWeek: number;
  targetWeeks: number; // 이 기간 안에 끝내야 하는 주 수 (미정이면 여유 기준)
}

const STRATEGIES: Record<string, PeriodStrategy> = {
  "2주 이내": {
    period: "2주 이내",
    volume: "40P",
    headline: "실전 문제 + Mock Test 중심",
    detail: "새 개념을 넓히기보다, 실제 시험과 같은 형식의 문제를 풀며 유형 감각과 시간 배분을 끌어올리는 단계입니다.",
    priorityAreas: ["실전 문제", "Mock Test"],
    sessionsPerWeek: 5,
    targetWeeks: 2,
  },
  "약 1개월": {
    period: "약 1개월",
    volume: "60P",
    headline: "실전 + Vocabulary 보강",
    detail: "실전 유형을 반복하면서, 점수를 가장 빠르게 끌어올리는 어휘를 함께 채우는 구성이 효율적입니다.",
    priorityAreas: ["실전 문제", "Vocabulary"],
    sessionsPerWeek: 4,
    targetWeeks: 4,
  },
  "2~3개월": {
    period: "2~3개월",
    volume: "100P",
    headline: "Reading + Grammar + Vocabulary + Mock Test",
    detail: "기본기를 다시 세울 시간이 있습니다. 영역별로 고르게 쌓은 뒤 마지막에 실전으로 마무리하는 순서가 가장 안정적입니다.",
    priorityAreas: ["Reading", "Grammar", "Vocabulary", "Mock Test"],
    sessionsPerWeek: 3,
    targetWeeks: 10,
  },
  "아직 미정": {
    period: "아직 미정",
    volume: "60P",
    headline: "현재 수준 점검 + 유형 적응",
    detail: "시험일이 정해지지 않았다면 먼저 현재 수준을 확인하고 유형에 적응하는 것이 우선입니다. 일정이 정해지면 분량을 다시 맞추면 됩니다.",
    priorityAreas: ["Reading", "Vocabulary"],
    sessionsPerWeek: 3,
    targetWeeks: 6,
  },
};

export function strategyFor(period: string): PeriodStrategy {
  return STRATEGIES[period] ?? STRATEGIES["아직 미정"];
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

export function buildStudyPlan(volume: string, input: FindInput, difficulty: number): StudyPlan {
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
    tight: input.period !== "아직 미정" && weeksMax > s.targetWeeks,
  };
}

// ── 적합도 (정성 판정) ───────────────────────────────────────
export type FitTone = "good" | "fair" | "check";

export interface FitItem {
  label: string; // 예: "현재 수준 적합도"
  verdict: string; // 예: "잘 맞음"
  tone: FitTone;
  why: string; // 이 판정의 근거 (숫자를 쓰지 않는 대신 근거를 밝힙니다)
}

// ── 종합 분석 결과 ───────────────────────────────────────────
export interface Companion {
  area: string;
  label: string; // 화면 표기 — 영역은 "Reading 보강", 실전류는 그대로 노출
  reason: string;
}

export interface Analysis {
  product: Product | null;
  volume: string;
  strategy: PeriodStrategy;
  plan: StudyPlan;
  fit: FitItem[];
  rationale: string[]; // 추천 이유 (3~4 문장)
  reasons: string[]; // 매칭 근거 요약
  goodFor: string[]; // 이런 학생에게 추천합니다
  companions: Companion[]; // 함께 준비하면 좋은 영역
  suggestCustom: boolean;
  refined: boolean; // 추가 진단이 반영된 결과인지
}

// ── 매칭 ────────────────────────────────────────────────────
function gradeRange(str: string): [number, number] {
  const n = (str.match(/\d+/g) || []).map(Number);
  if (/K|Preschool|유아/i.test(str) && !n.length) return [0, 0];
  if (!n.length) return [0, 12];
  return [Math.min(...n), Math.max(...n)];
}

function overlaps(a: [number, number], b: [number, number]): boolean {
  return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
}

// 목표 난이도 — 기본은 현재 수준에서 출발하되, 추가 진단이 있으면 보정합니다.
function targetDifficulty(input: FindInput): number {
  let want = input.level.includes("상위") ? 4 : input.level.includes("기초") ? 2 : 3;
  const e = input.extra;
  if (hasExtra(e)) {
    // 영어권 체류·국제학교 경험은 실제 수준이 학년 표기보다 높은 경우가 많습니다.
    if (e.abroad === "3년 이상" || e.englishSchool === "국제학교 재학") want += 1;
    else if (e.abroad === "1~3년" || e.englishSchool === "영어유치원") want += 0.5;
    // Reading 에서 기초적인 어려움을 겪으면 난이도를 낮춰 잡습니다.
    if (e.readingWeak === "모르는 단어가 많음" || e.readingWeak === "지문 길이·속도") want -= 0.5;
  }
  return Math.max(1, Math.min(5, want));
}

// 추가 진단의 Reading 취약 응답을 집중 영역으로 환산합니다.
function derivedAreas(input: FindInput): string[] {
  const e = input.extra;
  if (!hasExtra(e)) return [];
  if (e.readingWeak === "모르는 단어가 많음") return ["Vocabulary"];
  if (e.readingWeak === "지문 길이·속도" || e.readingWeak === "추론·주제 찾기") return ["Reading"];
  if (e.readingWeak === "문제 유형 파악") return ["Reading"];
  return [];
}

function match(input: FindInput, track: string): { product: Product; score: number; reasons: string[] } | null {
  const pool = products.filter((p) => p.materialType === "existing" && p.sampleAvailable);
  const want = targetDifficulty(input);
  const g = gradeRange(input.grade);
  const areas = [...new Set([...input.areas, ...derivedAreas(input)])];
  let best: Product | null = null;
  let bestScore = -1;
  let bestReasons: string[] = [];

  for (const p of pool) {
    let s = 50;
    const reasons: string[] = [];
    if (track && p.track === track) {
      s += 20;
      reasons.push(`준비 시험에 맞는 ${trackLabels[p.track]} 구성`);
    }
    if (overlaps(g, gradeRange(p.gradeRange))) {
      s += 15;
      reasons.push(`학년 범위 ${p.gradeRange}에 적합`);
    }
    if (areas.length) {
      const u = p.units.join(" ");
      if (isFourSkill(p) || areas.some((a) => u.includes(a))) {
        s += 10;
        reasons.push(`집중 영역(${areas.join(" · ")}) 연습 포함`);
      }
    }
    s += 5 - Math.min(5, Math.abs(p.difficulty - want));
    reasons.push(`난이도 ${blossomLevel(p.difficulty)} 수준`);
    if (s > bestScore) {
      bestScore = s;
      best = p;
      bestReasons = reasons;
    }
  }
  if (!best) return null;
  return { product: best, score: bestScore, reasons: bestReasons };
}

// ── 적합도 판정 ──────────────────────────────────────────────
function buildFit(p: Product, input: FindInput, track: string): FitItem[] {
  const want = targetDifficulty(input);
  const gap = p.difficulty - want;
  const gradeOk = overlaps(gradeRange(input.grade), gradeRange(p.gradeRange));
  const levelKo = BLOSSOM_LEVEL_KO[blossomLevel(p.difficulty)];

  const levelFit: FitItem =
    gradeOk && Math.abs(gap) <= 0.5
      ? { label: "현재 수준", verdict: "잘 맞음", tone: "good", why: `${p.gradeRange} 대상 교재이고, 선택하신 수준과 난이도 차이가 크지 않습니다.` }
      : gradeOk || Math.abs(gap) <= 1
      ? { label: "현재 수준", verdict: "대체로 맞음", tone: "fair", why: "학년과 난이도 중 한쪽이 조금 어긋납니다. 상담에서 한 번 더 확인하시길 권합니다." }
      : { label: "현재 수준", verdict: "확인 필요", tone: "check", why: "학년대와 난이도가 모두 어긋납니다. 학생 상태를 직접 확인해야 정확합니다." };

  const difficultyFit: FitItem =
    Math.abs(gap) <= 0.5
      ? { label: "난이도", verdict: "적정", tone: "good", why: `${levelKo}(${blossomLevel(p.difficulty)}) 단계로, 혼자 풀면서 배울 수 있는 수준입니다.` }
      : gap > 0.5
      ? { label: "난이도", verdict: "다소 높음", tone: "fair", why: `${levelKo} 단계라 지금 수준보다 한 단계 위입니다. 지도와 함께라면 도전해 볼 수 있습니다.` }
      : { label: "난이도", verdict: "다소 낮음", tone: "fair", why: `${levelKo} 단계로 기초를 다지기에 좋지만, 이미 익숙하다면 한 단계 위를 권합니다.` };

  const examFit: FitItem = !track
    ? { label: "시험 대비", verdict: "확인 필요", tone: "check", why: "준비 시험이 특정되지 않아 시험 대비 적합도는 판단하지 않았습니다." }
    : p.track === track
    ? { label: "시험 대비", verdict: "높음", tone: "good", why: `${trackLabels[p.track]} 트랙 교재로, 준비하시는 시험과 출제 유형이 같은 계열입니다.` }
    : { label: "시험 대비", verdict: "보통", tone: "fair", why: "같은 계열 교재는 아니지만 기본기를 쌓는 데는 도움이 됩니다. 시험 특화 구성은 상담에서 안내드립니다." };

  return [levelFit, difficultyFit, examFit];
}

// ── 추천 이유 (자연어 3~4문장) ────────────────────────────────
// 시험명·학년처럼 값이 바뀌는 표현 뒤에는 조사를 붙이지 않고 명사를 이어 붙여
// 어떤 입력에서도 문장이 어색해지지 않도록 씁니다.
function buildRationale(p: Product | null, input: FindInput, strategy: PeriodStrategy, plan: StudyPlan): string[] {
  const out: string[] = [];
  const areas = [...new Set([...input.areas, ...derivedAreas(input)])];
  const examPart = input.exam && !input.exam.startsWith("기타") ? `${input.exam} 준비` : "영어 실력 점검";
  const srPart = input.sr.trim() ? ` 알려주신 리딩 레벨은 ${input.sr.trim()}입니다.` : "";

  out.push(`${input.grade} 학생이며 현재 수준은 "${input.level}", 목표는 ${examPart}입니다.${srPart}`);

  const e = input.extra;
  if (hasExtra(e)) {
    const notes: string[] = [];
    if (e.abroad && e.abroad !== "없음") notes.push(`해외 거주 ${e.abroad}`);
    if (e.englishSchool && e.englishSchool !== "없음") notes.push(e.englishSchool);
    if (e.recentScore.trim()) notes.push(`최근 결과 ${e.recentScore.trim()}`);
    if (notes.length) out.push(`추가로 알려주신 ${notes.join(" · ")} 이력을 반영해 난이도를 조정했습니다.`);
    if (e.readingWeak && e.readingWeak !== "특별히 없음") out.push(`Reading에서 "${e.readingWeak}" 부분이 어렵다고 하셨으므로 해당 영역 연습을 우선 배치했습니다.`);
  }

  out.push(
    input.period === "아직 미정"
      ? `시험일이 아직 정해지지 않아, ${strategy.headline} 구성으로 현재 위치를 먼저 확인하는 것을 권합니다.`
      : `시험까지 ${input.period} 남아 ${strategy.headline} 구성이 우선입니다.`
  );

  if (p) {
    const areaPart = areas.length ? `, 특히 ${areas.join(" · ")} 영역 점검` : "";
    out.push(
      `${josa(p.titleKo, "은는")} ${p.gradeRange} 대상 ${trackLabels[p.track]} 교재로, 유형 적응${areaPart}에 바로 쓸 수 있어 추천드립니다. ` +
        `${strategy.volume} 기준 약 ${plan.weeksMin}~${plan.weeksMax}주 분량입니다.`
    );
  } else {
    out.push("기존 교재로는 이 조합을 정확히 맞추기 어려워, 학생에게 맞춘 제작 구성을 제안드립니다.");
  }
  return out;
}

// ── 이런 학생에게 추천합니다 ─────────────────────────────────
function buildGoodFor(p: Product, input: FindInput, track: string): string[] {
  const out: string[] = [];
  const exam = input.exam && !input.exam.startsWith("기타") ? input.exam : "";
  if (exam && p.track === track) out.push(`${exam} 유형에 처음 적응해야 하는 학생`);
  if (p.recommendedForKo) out.push(p.recommendedForKo);
  const areas = [...new Set([...input.areas, ...derivedAreas(input)])];
  if (areas.length) out.push(`${areas.join(" · ")} 실전 문제를 충분히 풀어보고 싶은 학생`);
  out.push(`${p.gradeRange} 수준에서 ${BLOSSOM_LEVEL_KO[blossomLevel(p.difficulty)]} 난이도가 필요한 학생`);
  if (input.period === "2주 이내") out.push("시험 직전 실전 감각을 끌어올려야 하는 학생");
  else if (input.period === "2~3개월") out.push("기본기부터 다시 정리할 시간이 있는 학생");
  return [...new Set(out)].slice(0, 4);
}

// ── 함께 준비하면 좋은 영역 ──────────────────────────────────
const COMPANION_REASON: Record<string, string> = {
  Reading: "지문 길이와 속도에 익숙해질수록 다른 영역 점수도 함께 올라갑니다.",
  Vocabulary: "짧은 기간에 점수를 가장 빠르게 올리는 영역입니다.",
  Grammar: "문장 구조가 잡히면 Reading 과 Writing 이 동시에 안정됩니다.",
  Writing: "서술형·에세이가 포함된 시험이라면 별도 연습이 필요합니다.",
  "Mock Test": "시험 전 한 번은 같은 형식·같은 시간으로 풀어봐야 합니다.",
  "실전 문제": "실제 출제 형식에 맞춘 문제로 시간 배분을 점검합니다.",
};

function buildCompanions(p: Product | null, strategy: PeriodStrategy, input: FindInput): Companion[] {
  const covered = new Set<string>();
  if (p) {
    const u = p.units.join(" ");
    if (isFourSkill(p)) ["Reading", "Vocabulary", "Grammar", "Writing"].forEach((a) => covered.add(a));
    ["Reading", "Vocabulary", "Grammar", "Writing"].forEach((a) => {
      if (u.includes(a)) covered.add(a);
    });
  }
  const candidates = [...strategy.priorityAreas, ...input.areas, "Mock Test"];
  // "실전 문제"·"Mock Test"는 영역이 아니라 학습 단계라 "보강"을 붙이지 않습니다.
  const isSkillArea = (a: string) => ["Reading", "Vocabulary", "Grammar", "Writing", "Math"].includes(a);
  const out: Companion[] = [];
  for (const area of candidates) {
    if (covered.has(area) || out.some((c) => c.area === area)) continue;
    out.push({
      area,
      label: isSkillArea(area) ? `${area} 보강` : area,
      reason: COMPANION_REASON[area] ?? "상담에서 필요 여부를 함께 확인해 드립니다.",
    });
  }
  return out.slice(0, 4);
}

// ── 엔트리 포인트 ────────────────────────────────────────────
export function analyze(input: FindInput): Analysis {
  const track = exams.find((e) => e.v === input.exam)?.track ?? "";
  const strategy = strategyFor(input.period);
  const m = match(input, track);
  const product = m?.product ?? null;
  const plan = buildStudyPlan(strategy.volume, input, product?.difficulty ?? 3);
  // 매칭 근거가 약하면(트랙·학년 어느 쪽도 맞지 않으면) 맞춤 제작을 제안합니다.
  const suggestCustom = !m || m.score < 68;

  return {
    product,
    volume: strategy.volume,
    strategy,
    plan,
    fit: product ? buildFit(product, input, track) : [],
    rationale: buildRationale(product, input, strategy, plan),
    reasons: m?.reasons ?? [],
    goodFor: product ? buildGoodFor(product, input, track) : [],
    companions: buildCompanions(product, strategy, input),
    suggestCustom,
    refined: hasExtra(input.extra),
  };
}
