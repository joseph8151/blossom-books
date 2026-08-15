// ────────────────────────────────────────────────────────────
// 200P+ Premium Edition — Complete Prep Package
//
// 200페이지 이상 구성을 선택한 고객에게 본교재와 함께 제공되는 학습 자료 7종.
// 7종의 뼈대는 모든 상품이 공유하되, 시험·과목별로 제목과 설명이 자동으로 맞춰집니다.
// (모든 과목에 같은 설명이 복사되지 않도록 프로필 단위로 관리합니다.)
//
// 표현 원칙 — "무료 증정 / 사은품 / 덤" 같은 표현은 쓰지 않습니다.
// 상위 등급 상품에 원래 포함된 학습 시스템으로 표현하며, 제공 시점은 구매 시점으로 한정합니다.
// (향후 업데이트·평생 제공 등 이후 의무가 생길 수 있는 문구는 넣지 않습니다.)
// ────────────────────────────────────────────────────────────

import { Product } from "@/lib/types";

export const PREMIUM_MIN_PAGES = 200;
export const PREMIUM_BONUS_COUNT = 7;

export type BonusKey =
  | "quickReview"
  | "bonusPractice"
  | "mockTest"
  | "finalReview"
  | "studyPlan"
  | "weaknessCheck"
  | "errorLog";

export interface BonusItem {
  no: string; // "01"
  key: BonusKey;
  en: string; // 영문 제목 — 타이포그래피 요소로 사용
  ko: string; // 한글 제목
  short: string; // 목록·체크리스트용 한 줄
  description: string; // 카드 본문
}

const ORDER: BonusKey[] = [
  "quickReview",
  "bonusPractice",
  "mockTest",
  "finalReview",
  "studyPlan",
  "weaknessCheck",
  "errorLog",
];

// ── 기본 7종 (메인페이지 및 프로필이 없는 상품) ───────────────
const BASE: Record<BonusKey, Omit<BonusItem, "no" | "key">> = {
  quickReview: {
    en: "QUICK REVIEW",
    ko: "핵심 요약집",
    short: "시험 직전 핵심 압축 정리",
    description:
      "본교재를 모두 다시 읽지 않아도 시험 직전 핵심 개념, 공식, 어휘, 유형을 빠르게 확인할 수 있도록 압축 정리한 Review 자료.",
  },
  bonusPractice: {
    en: "BONUS PRACTICE",
    ko: "추가 문제 세트",
    short: "새로운 문제로 구성된 추가 연습",
    description:
      "본교재의 문제를 그대로 반복하지 않고, 같은 영역과 난이도의 새로운 문제로 구성한 Bonus Practice Set.",
  },
  mockTest: {
    en: "FULL MOCK TEST",
    ko: "실전 모의고사",
    short: "시간을 정해 푸는 실전 모의고사",
    description:
      "실제 시험 또는 평가 상황을 가정하여 시간을 정해 풀어볼 수 있는 별도의 Mock Test.",
  },
  finalReview: {
    en: "FINAL REVIEW",
    ko: "시험 직전 Final 문제",
    short: "마지막 실력 점검",
    description:
      "시험을 앞두고 마지막으로 풀어봐야 할 핵심 유형과 자주 틀리는 영역을 중심으로 구성한 Final Review 자료.",
  },
  studyPlan: {
    en: "8-WEEK STUDY PLAN",
    ko: "8주 학습 플랜",
    short: "주차별 학습량과 순서 안내",
    description:
      "200페이지 이상의 교재를 한꺼번에 공부해야 하는 부담을 줄이도록 Week 1부터 주차별 학습량과 순서를 안내하는 Study Plan.",
  },
  weaknessCheck: {
    en: "WEAKNESS DIAGNOSTIC",
    ko: "취약영역 진단표",
    short: "영역별 약점 확인",
    description:
      "학생이 어느 영역에서 반복적으로 틀리는지 확인할 수 있는 영역별 Self Diagnostic 자료.",
  },
  errorLog: {
    en: "ERROR LOG & PROGRESS TRACKER",
    ko: "오답노트 & 학습진도 관리",
    short: "오답·재풀이·점수 변화 기록",
    description:
      "틀린 문제와 틀린 이유, 관련 개념, 재풀이 결과, 점수 변화를 기록할 수 있는 관리용 Workbook. 많이 푸는 것에서 끝내지 않고 틀린 문제를 다시 학습하는 구조를 제공합니다.",
  },
};

// ── 시험·과목별 프로필 ───────────────────────────────────────
type Override = Partial<Record<BonusKey, Partial<Omit<BonusItem, "no" | "key">>>>;

interface ProfileDef {
  id: string;
  label: string; // "DIGITAL SAT 200P+"
  tagline?: string; // 영문 한 줄 메시지
  copy?: string; // 상품 카피 (상세페이지 Premium 영역 상단)
  match: (p: Product) => boolean;
  overrides: Override;
}

const key = (p: Product) => `${p.id} ${p.subject} ${p.examOrCurriculum} ${p.title}`.toLowerCase();

const PROFILES: ProfileDef[] = [
  {
    id: "sat",
    label: "DIGITAL SAT 200P+",
    match: (p) => /sat/.test(key(p)) && !/scat/.test(key(p)),
    copy: "200페이지 문제풀이에서 끝나지 않습니다. SAT 시험 전 마지막 점검까지 고려한 Complete Preparation Package.",
    overrides: {
      quickReview: { en: "SAT QUICK REVIEW", ko: "핵심 개념·공식 정리", short: "Reading & Writing 핵심 개념 및 Math 공식 정리", description: "Reading & Writing 핵심 개념과 Math 공식을 시험 직전에 빠르게 훑을 수 있도록 정리한 자료." },
      bonusPractice: { en: "SAT BONUS PRACTICE", short: "Reading & Writing / Math 추가 문제", description: "Reading & Writing 과 Math 각각에 대해 본교재와 겹치지 않는 새로운 추가 문제를 제공합니다." },
      mockTest: { en: "SAT MOCK TEST", ko: "Digital SAT 실전 연습", short: "Digital SAT 스타일 실전 연습", description: "Digital SAT 형식에 맞춰 시간을 정해 풀어볼 수 있는 실전 Mock Test." },
      finalReview: { en: "SAT FINAL REVIEW", short: "시험 직전 핵심 유형 Review", description: "시험 직전 마지막으로 확인해야 할 핵심 유형 중심의 Final Review." },
      studyPlan: { en: "SAT STUDY PLAN", ko: "SAT 8주 학습 플랜", short: "SAT 8주 학습 플랜", description: "Reading & Writing 과 Math 를 균형 있게 배분한 8주 단위 SAT 학습 플랜." },
      weaknessCheck: { en: "SAT WEAKNESS CHECK", short: "Reading & Writing / Math 영역별 취약점 체크", description: "Reading & Writing, Math 영역별로 반복해서 틀리는 유형을 확인하는 진단표." },
      errorLog: { en: "SAT ERROR LOG", ko: "오답 유형 및 점수 추적", short: "오답 유형 및 점수 추적", description: "오답 유형을 분류해 기록하고 연습 점수의 변화를 추적할 수 있는 Workbook." },
    },
  },
  {
    id: "map",
    label: "MAP GROWTH 200P+",
    tagline: "Know What to Practice Next.",
    copy: "문제를 푸는 것에서 끝나지 않고, 어느 영역을 더 공부해야 하는지 확인합니다.",
    match: (p) => /map growth|map-growth/.test(key(p)),
    overrides: {
      quickReview: { en: "MAP QUICK REVIEW", short: "학년별 Reading·Math 핵심 개념 정리", description: "학년 수준에 맞춘 Reading 또는 Math 핵심 개념을 정리한 요약 자료." },
      bonusPractice: { en: "MAP BONUS PRACTICE", short: "영역별 추가 MAP-style 문제", description: "영역별로 MAP 출제 형식을 반영한 새로운 추가 문제 세트." },
      mockTest: { en: "MAP PRACTICE TEST", ko: "실전 적응 Practice Set", short: "실전 적응을 위한 추가 Practice Set", description: "실제 응시 환경에 적응할 수 있도록 구성한 별도의 Practice Set." },
      finalReview: { en: "MAP FINAL REVIEW", short: "시험 전 마지막 핵심 문제", description: "응시 직전 마지막으로 점검할 핵심 문제 중심의 Review 자료." },
      studyPlan: { en: "MAP STUDY PLAN", ko: "학습영역별 8주 플랜", short: "학습영역별 8주 플랜", description: "Reading·Math·Language 영역을 나누어 배분한 8주 학습 플랜." },
      weaknessCheck: { en: "MAP SKILL CHECK", ko: "강점·약점 체크", short: "학습 영역별 강점·약점 체크", description: "학습 영역별로 강점과 약점을 구분해 다음에 무엇을 연습할지 판단할 수 있는 자료." },
      errorLog: { en: "MAP PROGRESS TRACKER", ko: "정답률·취약영역 변화 기록", short: "정답률 및 취약영역 변화 기록", description: "영역별 정답률과 취약영역이 어떻게 달라지는지 기록하는 Tracker." },
    },
  },
  {
    id: "ielts",
    label: "IELTS 200P+",
    match: (p) => /ielts/.test(key(p)),
    overrides: {
      quickReview: { en: "IELTS QUICK REVIEW", short: "각 영역별 핵심 전략 요약", description: "Listening·Reading·Writing·Speaking 각 영역의 핵심 전략을 요약한 자료." },
      bonusPractice: { en: "IELTS BONUS PRACTICE", short: "4 Skills 추가 연습", description: "Reading / Listening / Writing / Speaking 각각의 추가 연습 문제." },
      mockTest: { en: "IELTS MOCK TEST", ko: "실전 시험형 Practice", short: "실전 시험형 Practice", description: "실제 시험과 같은 구성으로 시간을 정해 풀어보는 Mock Test." },
      finalReview: { en: "IELTS FINAL REVIEW", short: "시험 직전 Check Point", description: "시험 직전 확인해야 할 영역별 Check Point 정리." },
      studyPlan: { en: "IELTS STUDY PLAN", ko: "목표 Band 기반 학습 플랜", short: "목표 Band Score 기반 학습 플랜", description: "목표 Band Score 를 기준으로 영역별 학습량을 배분한 플랜." },
      weaknessCheck: { en: "IELTS WEAKNESS CHECK", short: "4 Skills 취약영역 체크", description: "4개 영역 중 어느 영역이 목표 점수에 미치지 못하는지 확인하는 진단표." },
      errorLog: { en: "IELTS PROGRESS TRACKER", ko: "Band Score Progress 기록", short: "Band Score Progress 기록", description: "연습 회차별 Band Score 변화를 기록하는 Tracker." },
    },
  },
  {
    id: "pte",
    label: "PTE 200P+",
    match: (p) => /\bpte\b/.test(key(p)),
    overrides: {
      quickReview: { en: "PTE QUICK REVIEW", short: "Task별 핵심 전략", description: "PTE 각 Task 유형별 핵심 전략을 정리한 요약 자료." },
      bonusPractice: { en: "PTE BONUS PRACTICE", short: "4개 영역 추가 Practice", description: "Speaking / Writing / Reading / Listening 추가 연습 문제." },
      mockTest: { en: "PTE MOCK TEST", ko: "실전형 Mock Practice", short: "실전형 Mock Practice", description: "실제 시험 형식에 맞춘 Mock Practice." },
      finalReview: { en: "PTE FINAL REVIEW", short: "시험 직전 주요 Task 점검", description: "시험 직전 주요 Task 를 마지막으로 점검하는 Review." },
      studyPlan: { en: "PTE STUDY PLAN", ko: "PTE 8주 학습 플랜", short: "PTE 8주 학습 플랜", description: "Task 유형별로 배분한 8주 학습 플랜." },
      weaknessCheck: { en: "PTE WEAKNESS CHECK", short: "Task별 취약영역 확인", description: "Task 유형별로 취약한 부분을 확인하는 진단표." },
      errorLog: { en: "PTE SCORE TRACKER", ko: "연습 점수 변화 기록", short: "연습 점수 변화 기록", description: "연습 회차별 점수 변화를 기록하는 Tracker." },
    },
  },
  {
    id: "ukiset",
    label: "UKISET 200P+",
    match: (p) => /ukiset/.test(key(p)),
    overrides: {
      quickReview: { en: "UKISET QUICK REVIEW", short: "시험 영역별 핵심 전략 정리", description: "UKiset 각 영역의 핵심 전략을 정리한 요약 자료." },
      bonusPractice: { en: "UKISET BONUS PRACTICE", short: "Vocabulary / English / Reasoning 추가 문제", description: "Vocabulary, English, Reasoning 영역의 추가 연습 문제." },
      mockTest: { en: "UKISET MOCK TEST", ko: "실전 적응용 Mock Practice", short: "실전 적응용 Mock Practice", description: "실제 응시 환경에 적응하기 위한 Mock Practice." },
      finalReview: { en: "UKISET FINAL REVIEW", short: "시험 전 핵심 유형 Review", description: "시험 직전 핵심 유형을 점검하는 Review 자료." },
      studyPlan: { en: "UKISET STUDY PLAN", ko: "8주 시험 준비 플랜", short: "8주 시험 준비 플랜", description: "영역별로 배분한 8주 준비 플랜." },
      weaknessCheck: { en: "UKISET WEAKNESS CHECK", short: "영역별 취약점 분석표", description: "영역별로 취약한 부분을 분석하는 진단표." },
      errorLog: { en: "UKISET PROGRESS TRACKER", ko: "정답률·진행상황 기록", short: "정답률 및 진행상황 기록", description: "정답률과 학습 진행 상황을 기록하는 Tracker." },
    },
  },
  {
    id: "reasoning",
    label: "REASONING 200P+",
    match: (p) => /cat4|scat|iseb|isee|reasoning|general ability|사고력/.test(key(p)),
    overrides: {
      quickReview: { en: "REASONING QUICK REVIEW", short: "영역별 문제 접근법 정리", description: "Verbal·Non-Verbal·Quantitative 등 각 영역의 문제 접근법을 정리한 요약 자료." },
      bonusPractice: { en: "BONUS REASONING SET", short: "영역별 추가 추론 문제", description: "본교재에 포함된 영역에 맞춰 새로운 추론 문제를 추가로 제공합니다." },
      mockTest: { en: "FULL MOCK TEST", ko: "실전 모의고사", short: "시간 제한 실전 모의고사", description: "시간 제한을 두고 풀어보는 실전 형식의 Mock Test." },
      finalReview: { en: "FINAL REVIEW", short: "시험 전 핵심 유형 점검", description: "시험 직전 자주 나오는 유형을 마지막으로 점검하는 자료." },
      studyPlan: { en: "8-WEEK STUDY PLAN", ko: "영역별 8주 플랜", short: "영역별 8주 학습 플랜", description: "영역별로 학습량을 배분한 8주 플랜." },
      weaknessCheck: { en: "WEAKNESS DIAGNOSTIC", short: "영역별 취약점 분석표", description: "본교재에 포함된 추론 영역별로 취약한 부분을 확인하는 진단표." },
      errorLog: { en: "PROGRESS TRACKER", ko: "정답률·진행상황 기록", short: "정답률 및 진행상황 기록", description: "영역별 정답률과 진행 상황을 기록하는 Tracker." },
    },
  },
  {
    id: "math",
    label: "MATH 200P+",
    match: (p) => /math|algebra|geometry|calc|statistic|수학/.test(key(p)),
    overrides: {
      quickReview: { en: "MATH QUICK REVIEW", ko: "공식 및 핵심 개념 요약", short: "공식 및 핵심 개념 요약", description: "단원별 공식과 핵심 개념을 한 번에 확인할 수 있도록 정리한 요약 자료." },
      bonusPractice: { en: "BONUS PROBLEMS", ko: "추가 문제 세트", short: "단원별 추가 문제", description: "본교재와 겹치지 않는 새로운 문제로 구성한 단원별 추가 문제 세트." },
      mockTest: { en: "CHALLENGE SET", ko: "고난도 문제", short: "고난도 심화 문제", description: "기본 유형을 넘어 사고력을 요구하는 고난도 문제 세트." },
      finalReview: { en: "FINAL REVIEW", ko: "단원 종합 문제", short: "단원 종합 문제", description: "전 단원을 아우르는 종합 문제로 마지막 점검을 진행합니다." },
      studyPlan: { en: "8-WEEK STUDY PLAN", ko: "단원별 학습 플랜", short: "단원별 8주 학습 플랜", description: "단원 순서에 맞춰 주차별 학습량을 배분한 플랜." },
      weaknessCheck: { en: "WEAKNESS CHECK", ko: "취약 단원 체크", short: "취약 단원 체크", description: "어느 단원에서 반복적으로 틀리는지 확인하는 진단표." },
      errorLog: { en: "ERROR LOG", ko: "오답 유형 기록", short: "오답 유형 기록", description: "틀린 문제의 단원과 오답 유형을 기록해 다시 학습할 수 있는 Workbook." },
    },
  },
  {
    id: "science",
    label: "SCIENCE 200P+",
    match: (p) => /science|biolog|chemi|physic|과학|생물|화학|물리/.test(key(p)),
    overrides: {
      quickReview: { en: "SCIENCE QUICK REVIEW", ko: "핵심 개념 및 용어 요약", short: "핵심 개념 및 용어 요약", description: "단원별 핵심 개념과 주요 용어를 정리한 요약 자료." },
      bonusPractice: { en: "BONUS PRACTICE", ko: "단원별 추가 문제", short: "단원별 추가 문제", description: "본교재와 겹치지 않는 단원별 추가 문제." },
      mockTest: { en: "APPLICATION QUESTIONS", ko: "개념 적용 문제", short: "개념 적용 문제", description: "배운 개념을 실제 상황에 적용해 보는 응용 문제 세트." },
      finalReview: { en: "FINAL REVIEW", ko: "단원 종합 Review", short: "단원 종합 Review", description: "전 단원을 종합해 마지막으로 점검하는 Review 자료." },
      studyPlan: { en: "STUDY PLAN", ko: "과학 학습 플랜", short: "단원별 학습 플랜", description: "단원 순서에 맞춰 학습량을 배분한 플랜." },
      weaknessCheck: { en: "CONCEPT CHECK", ko: "취약 개념 체크", short: "취약 개념 체크", description: "어느 개념에서 반복적으로 막히는지 확인하는 진단표." },
      errorLog: { en: "PROGRESS TRACKER", ko: "단원별 학습 결과 기록", short: "단원별 학습 결과 기록", description: "단원별 학습 결과와 재학습 여부를 기록하는 Tracker." },
    },
  },
];

export interface PremiumProfile {
  id: string;
  label: string;
  tagline?: string;
  copy?: string;
  bonuses: BonusItem[];
}

function build(overrides: Override): BonusItem[] {
  return ORDER.map((k, i) => ({
    no: String(i + 1).padStart(2, "0"),
    key: k,
    ...BASE[k],
    ...(overrides[k] ?? {}),
  }));
}

// 메인페이지 등 특정 상품이 없는 화면에서 쓰는 기본 7종
export const premiumBonuses: BonusItem[] = build({});

// 상품에 맞는 프로필 (없으면 기본 7종)
export function premiumProfileFor(product: Product): PremiumProfile {
  const def = PROFILES.find((d) => d.match(product));
  if (!def) {
    return { id: "default", label: "200P+ PREMIUM EDITION", bonuses: premiumBonuses };
  }
  return {
    id: def.id,
    label: def.label,
    tagline: def.tagline,
    copy: def.copy,
    bonuses: build(def.overrides),
  };
}

// 취약영역 진단표에 표시할 영역 — 해당 교재의 실제 구성에 맞춰 바뀝니다.
export function diagnosticAreas(product: Product): string[] {
  const k = key(product);
  const units = product.units.join(" ");
  const pool = ["Reading", "Vocabulary", "Grammar", "Writing", "Listening", "Speaking", "Math"];
  const found = pool.filter((a) => units.includes(a) || k.includes(a.toLowerCase()));
  if (found.length) return found.slice(0, 5);
  if (/math|algebra|geometry|calc|수학/.test(k)) return ["Problem Solving", "Data Analysis", "Computation"];
  if (/science|biolog|chemi|physic|과학/.test(k)) return ["Concepts", "Application", "Data Analysis"];
  if (/cat4|scat|reasoning|general ability/.test(k)) return ["Verbal", "Non-Verbal", "Quantitative", "Spatial"];
  return product.units.slice(0, 4);
}

// ── 상품 등급 ────────────────────────────────────────────────
export const EDITION = {
  standard: { pages: "100P", name: "STANDARD EDITION", tagline: "Focused Practice" },
  premium: { pages: "200P+", name: "PREMIUM EDITION", tagline: "Complete Preparation" },
};

// 구매 패널·What's Included 에서 쓰는 전체 포함 목록
export const premiumIncludes = [
  "200P+ Workbook",
  "Detailed Answer & Explanation",
  ...premiumBonuses.map((b) => b.en),
];

// 100P STANDARD vs 200P+ PREMIUM 비교
export const standardVsPremium = {
  standard: {
    label: "STANDARD 100P",
    tagline: EDITION.standard.tagline,
    items: ["100P Workbook", "Answer & Explanation", "Focused Practice"],
    forWhom: ["특정 영역 집중 연습", "짧은 기간의 보충 학습"],
  },
  premium: {
    label: "PREMIUM 200P+",
    tagline: EDITION.premium.tagline,
    note: "COMPLETE PREPARATION",
    items: [
      "200P+ Workbook",
      "Detailed Answer & Explanation",
      "Quick Review",
      "Bonus Practice",
      "Full Mock Test",
      "Final Review",
      "Study Plan",
      "Weakness Diagnostic",
      "Error Log",
    ],
    forWhom: [
      "시험을 체계적으로 준비하는 학생",
      "충분한 문제풀이가 필요한 학생",
      "한 권으로 전체 Preparation을 진행하고 싶은 학생",
    ],
  },
};

// 200P+ 상세페이지 FAQ (기존 FAQ 뒤에 이어 붙입니다)
export const premiumFaq = [
  {
    q: "200P 교재에는 어떤 추가 자료가 포함되나요?",
    a: "200P 이상 Premium Edition에는 본교재와 해설자료 외에도 Quick Review, Bonus Practice, Full Mock Test, Final Review, 8-Week Study Plan, Weakness Diagnostic, Error Log & Progress Tracker 등 학습을 보조하는 Premium Bonus Materials 7종이 함께 제공됩니다.",
  },
  {
    q: "모든 교재에 Premium Bonus가 제공되나요?",
    a: "Premium Bonus Package는 200페이지 이상으로 구성된 대상 교재에 제공됩니다. 각 상품 페이지에서 Premium 표시 여부를 확인하실 수 있습니다.",
  },
  {
    q: "Bonus 자료는 어떻게 받을 수 있나요?",
    a: "구매가 확인된 후 본교재와 함께 디지털 자료 형태로 안내 및 제공됩니다.",
  },
  {
    q: "Bonus 자료의 내용은 교재마다 같나요?",
    a: "구성은 7종으로 동일하지만, 내용은 해당 교재의 시험·과목·영역에 맞춰 제작됩니다. 예를 들어 수학 교재는 공식 요약과 취약 단원 체크로, 시험 대비 교재는 영역별 전략과 실전 Mock Test로 구성됩니다.",
  },
];
