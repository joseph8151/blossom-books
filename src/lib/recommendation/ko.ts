// 한국어 문안 팩 — core.ts 가 계산한 판정을 한국어 문장으로 렌더링합니다.
// 시험명·교재명처럼 값이 바뀌는 표현 뒤에는 josa() 로 조사를 붙이거나,
// 조사 대신 명사를 이어 붙여 어떤 입력에서도 문장이 어색해지지 않게 씁니다.

import { trackLabels } from "@/data/products";
import { blossomLevel, BLOSSOM_LEVEL_KO, josa } from "@/lib/utils";
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

// ── 폼 선택지 ────────────────────────────────────────────────
export const levels: { v: string; key: LevelKey }[] = [
  { v: "기초 (쉬운 편)", key: "beginner" },
  { v: "보통 (학년 수준)", key: "onLevel" },
  { v: "상위 (앞서가는 편)", key: "advanced" },
  { v: "잘 모르겠어요", key: "unknown" },
];

export const periods: { v: string; key: PeriodKey }[] = [
  { v: "2주 이내", key: "2w" },
  { v: "약 1개월", key: "1m" },
  { v: "2~3개월", key: "3m" },
  { v: "아직 미정", key: "undecided" },
];

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

export const extraOptions: {
  abroad: { v: string; key: AbroadKey }[];
  school: { v: string; key: SchoolKey }[];
  weak: { v: string; key: WeakKey }[];
} = {
  abroad: [
    { v: "없음", key: "none" },
    { v: "1년 미만", key: "under1" },
    { v: "1~3년", key: "1to3" },
    { v: "3년 이상", key: "over3" },
  ],
  school: [
    { v: "없음", key: "none" },
    { v: "영어유치원", key: "kinder" },
    { v: "국제학교 재학", key: "intlNow" },
    { v: "국제학교 준비 중", key: "intlPrep" },
  ],
  weak: [
    { v: "지문 길이·속도", key: "speed" },
    { v: "모르는 단어가 많음", key: "vocab" },
    { v: "문제 유형 파악", key: "questionType" },
    { v: "추론·주제 찾기", key: "inference" },
    { v: "특별히 없음", key: "none" },
  ],
};

const labelOf = <T extends string>(list: { v: string; key: T }[], key: T): string =>
  list.find((x) => x.key === key)?.v ?? "";

// ── 기간별 전략 문안 ─────────────────────────────────────────
const STRATEGY_COPY: Record<PeriodKey, { headline: string; detail: string }> = {
  "2w": {
    headline: "실전 문제 + Mock Test 중심",
    detail: "새 개념을 넓히기보다, 실제 시험과 같은 형식의 문제를 풀며 유형 감각과 시간 배분을 끌어올리는 단계입니다.",
  },
  "1m": {
    headline: "실전 + Vocabulary 보강",
    detail: "실전 유형을 반복하면서, 점수를 가장 빠르게 끌어올리는 어휘를 함께 채우는 구성이 효율적입니다.",
  },
  "3m": {
    headline: "Reading + Grammar + Vocabulary + Mock Test",
    detail: "기본기를 다시 세울 시간이 있습니다. 영역별로 고르게 쌓은 뒤 마지막에 실전으로 마무리하는 순서가 가장 안정적입니다.",
  },
  undecided: {
    headline: "현재 수준 점검 + 유형 적응",
    detail: "시험일이 정해지지 않았다면 먼저 현재 수준을 확인하고 유형에 적응하는 것이 우선입니다. 일정이 정해지면 분량을 다시 맞추면 됩니다.",
  },
};

// ── 적합도 문안 ──────────────────────────────────────────────
function buildFit(core: CoreResult, p: Product): FitItem[] {
  const f = core.fitFacts!;
  const levelKo = BLOSSOM_LEVEL_KO[blossomLevel(p.difficulty)];

  const level: FitItem = {
    label: "현재 수준",
    verdict: f.level === "good" ? "잘 맞음" : f.level === "fair" ? "대체로 맞음" : "확인 필요",
    tone: FIT_TONE[f.level],
    why:
      f.level === "good"
        ? `${p.gradeRange} 대상 교재이고, 선택하신 수준과 난이도 차이가 크지 않습니다.`
        : f.level === "fair"
        ? "학년과 난이도 중 한쪽이 조금 어긋납니다. 상담에서 한 번 더 확인하시길 권합니다."
        : "학년대와 난이도가 모두 어긋납니다. 학생 상태를 직접 확인해야 정확합니다.",
  };

  const difficulty: FitItem = {
    label: "난이도",
    verdict: f.difficulty === "right" ? "적정" : f.difficulty === "high" ? "다소 높음" : "다소 낮음",
    tone: FIT_TONE[f.difficulty],
    why:
      f.difficulty === "right"
        ? `${levelKo}(${blossomLevel(p.difficulty)}) 단계로, 혼자 풀면서 배울 수 있는 수준입니다.`
        : f.difficulty === "high"
        ? `${levelKo} 단계라 지금 수준보다 한 단계 위입니다. 지도와 함께라면 도전해 볼 수 있습니다.`
        : `${levelKo} 단계로 기초를 다지기에 좋지만, 이미 익숙하다면 한 단계 위를 권합니다.`,
  };

  const exam: FitItem = {
    label: "시험 대비",
    verdict: f.exam === "high" ? "높음" : f.exam === "medium" ? "보통" : "확인 필요",
    tone: examTone(f.exam),
    why:
      f.exam === "high"
        ? `${trackLabels[p.track]} 트랙 교재로, 준비하시는 시험과 출제 유형이 같은 계열입니다.`
        : f.exam === "medium"
        ? "같은 계열 교재는 아니지만 기본기를 쌓는 데는 도움이 됩니다. 시험 특화 구성은 상담에서 안내드립니다."
        : "준비 시험이 특정되지 않아 시험 대비 적합도는 판단하지 않았습니다.",
  };

  return [level, difficulty, exam];
}

// ── 추천 이유 (자연어 3~4문장) ────────────────────────────────
function buildRationale(core: CoreResult, input: CoreInput): string[] {
  const out: string[] = [];
  const levelLabel = labelOf(levels, input.level);
  const examPart = input.exam && !input.exam.startsWith("기타") ? `${input.exam} 준비` : "영어 실력 점검";
  const srPart = input.sr.trim() ? ` 알려주신 리딩 레벨은 ${input.sr.trim()}입니다.` : "";
  out.push(`${input.grade} 학생이며 현재 수준은 "${levelLabel}", 목표는 ${examPart}입니다.${srPart}`);

  const e = input.extra;
  if (core.refined && e) {
    const notes: string[] = [];
    if (e.abroad && e.abroad !== "none") notes.push(`해외 거주 ${labelOf(extraOptions.abroad, e.abroad)}`);
    if (e.school && e.school !== "none") notes.push(labelOf(extraOptions.school, e.school));
    if (e.recentScore.trim()) notes.push(`최근 결과 ${e.recentScore.trim()}`);
    if (notes.length) out.push(`추가로 알려주신 ${notes.join(" · ")} 이력을 반영해 난이도를 조정했습니다.`);
    if (e.weak && e.weak !== "none") {
      out.push(`Reading에서 "${labelOf(extraOptions.weak, e.weak)}" 부분이 어렵다고 하셨으므로 해당 영역 연습을 우선 배치했습니다.`);
    }
  }

  const headline = STRATEGY_COPY[core.strategy.key].headline;
  out.push(
    input.period === "undecided"
      ? `시험일이 아직 정해지지 않아, ${headline} 구성으로 현재 위치를 먼저 확인하는 것을 권합니다.`
      : `시험까지 ${labelOf(periods, input.period)} 남아 ${headline} 구성이 우선입니다.`
  );

  const p = core.product;
  if (p) {
    const areaPart = core.areas.length ? `, 특히 ${core.areas.join(" · ")} 영역 점검` : "";
    out.push(
      `${josa(p.titleKo, "은는")} ${p.gradeRange} 대상 ${trackLabels[p.track]} 교재로, 유형 적응${areaPart}에 바로 쓸 수 있어 추천드립니다. ` +
        `${core.volume} 기준 약 ${core.plan.weeksMin}~${core.plan.weeksMax}주 분량입니다.`
    );
  } else {
    out.push("기존 교재로는 이 조합을 정확히 맞추기 어려워, 학생에게 맞춘 제작 구성을 제안드립니다.");
  }
  return out;
}

// ── 매칭 근거 요약 ───────────────────────────────────────────
function buildReasons(core: CoreResult, p: Product): string[] {
  const out: string[] = [];
  if (core.flags.trackMatch) out.push(`준비 시험에 맞는 ${trackLabels[p.track]} 구성`);
  if (core.flags.gradeOk) out.push(`학년 범위 ${p.gradeRange}에 적합`);
  if (core.flags.areaMatch) out.push(`집중 영역(${core.areas.join(" · ")}) 연습 포함`);
  out.push(`난이도 ${blossomLevel(p.difficulty)} 수준`);
  return out;
}

// ── 이런 학생에게 추천합니다 ─────────────────────────────────
function buildGoodFor(core: CoreResult, input: CoreInput, p: Product): string[] {
  const out: string[] = [];
  const exam = input.exam && !input.exam.startsWith("기타") ? input.exam : "";
  if (exam && core.flags.trackMatch) out.push(`${exam} 유형에 처음 적응해야 하는 학생`);
  if (p.recommendedForKo) out.push(p.recommendedForKo);
  if (core.areas.length) out.push(`${core.areas.join(" · ")} 실전 문제를 충분히 풀어보고 싶은 학생`);
  out.push(`${p.gradeRange} 수준에서 ${BLOSSOM_LEVEL_KO[blossomLevel(p.difficulty)]} 난이도가 필요한 학생`);
  if (input.period === "2w") out.push("시험 직전 실전 감각을 끌어올려야 하는 학생");
  else if (input.period === "3m") out.push("기본기부터 다시 정리할 시간이 있는 학생");
  return [...new Set(out)].slice(0, 4);
}

// ── 함께 준비하면 좋은 영역 ──────────────────────────────────
const COMPANION_COPY: Record<string, { label: string; reason: string }> = {
  Reading: { label: "Reading 보강", reason: "지문 길이와 속도에 익숙해질수록 다른 영역 점수도 함께 올라갑니다." },
  Vocabulary: { label: "Vocabulary 보강", reason: "짧은 기간에 점수를 가장 빠르게 올리는 영역입니다." },
  Grammar: { label: "Grammar 보강", reason: "문장 구조가 잡히면 Reading 과 Writing 이 동시에 안정됩니다." },
  Writing: { label: "Writing 보강", reason: "서술형·에세이가 포함된 시험이라면 별도 연습이 필요합니다." },
  Math: { label: "Math 보강", reason: "수리 영역이 포함된 시험이라면 별도 문제집으로 함께 준비하는 편이 좋습니다." },
  "Mock Test": { label: "Mock Test", reason: "시험 전 한 번은 같은 형식·같은 시간으로 풀어봐야 합니다." },
  Practice: { label: "실전 문제", reason: "실제 출제 형식에 맞춘 문제로 시간 배분을 점검합니다." },
};

function buildCompanions(core: CoreResult): Companion[] {
  return core.companionAreas.map((area) => ({
    area,
    label: COMPANION_COPY[area]?.label ?? area,
    reason: COMPANION_COPY[area]?.reason ?? "상담에서 필요 여부를 함께 확인해 드립니다.",
  }));
}

// ── 엔트리 포인트 ────────────────────────────────────────────
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

// 화면 표시용 라벨 (리포트 헤더 등)
export const displayLevel = (key: LevelKey | ""): string => (key ? labelOf(levels, key) : "");
export const displayPeriod = (key: PeriodKey | ""): string => (key ? labelOf(periods, key) : "");
