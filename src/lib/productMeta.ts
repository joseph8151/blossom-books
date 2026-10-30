import { Product } from "@/lib/types";
import { blossomLevel } from "@/lib/utils";
import { starterOption, srVolumes, flexibleVolumes } from "@/data/pricing";
import { reviews, Review } from "@/data/reviews";

const DIRECT_PAGES = [60, 100, 200, 300];

// 거의 모든 상품에 공통으로 등장하는 영역명 — 이 단어만 겹치는 건 진짜 관련성이
// 아니므로 매칭 점수에서 제외합니다 (예: Algebra와 SR Reading이 "reading" 하나로 묶이는 것 방지).
const GENERIC_TOKENS = new Set([
  "reading", "writing", "vocabulary", "grammar", "listening", "speaking",
  "english", "math", "mathematics", "science",
  "test", "level", "practice", "prep",
]);

function tokenize(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[·,()]/g, " ")
      .split(/\s+/)
      .filter((t) => t && !GENERIC_TOKENS.has(t))
  );
}

// 정확히 매칭되는 후기가 없을 때, 같은 트랙(카테고리) 안에서라도 관련 있는
// 후기를 보여주기 위한 2차 폴백 키워드. 실제 후기가 없는 트랙(us-curriculum,
// ap)은 비워둡니다 — 가짜로 끼워 맞추는 것보다 안 보여주는 편이 낫습니다.
const TRACK_FALLBACK_TOKENS: Partial<Record<Product["track"], string[]>> = {
  "level-test": ["레벨테스트"],
  admissions: ["국제학교", "입학시험"],
  "certified-exam": ["공인영어시험"],
};

// 상품과 가장 관련 있는 실제 후기 1개를 골라줍니다. 겹치는 키워드가 없으면
// undefined — 엉뚱한 후기를 붙이는 것보다 아무것도 안 보여주는 편이 낫습니다.
export function matchedReview(product: Product): Review | undefined {
  const productTokens = tokenize([product.examOrCurriculum, product.subject, product.units.join(" ")].join(" "));
  let best: Review | undefined;
  let bestScore = 0;
  for (const r of reviews) {
    const reviewTokens = tokenize([r.context, (r.tags ?? []).join(" ")].join(" "));
    let score = 0;
    for (const t of reviewTokens) {
      if (productTokens.has(t)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = r;
    }
  }
  if (best) return best;

  // 1차 매칭 실패 시, 같은 트랙의 일반적인 후기로 폴백합니다.
  const fallbackTokens = TRACK_FALLBACK_TOKENS[product.track];
  if (!fallbackTokens) return undefined;
  for (const r of reviews) {
    const reviewTokens = tokenize([r.context, (r.tags ?? []).join(" ")].join(" "));
    if (fallbackTokens.some((t) => reviewTokens.has(t))) return r;
  }
  return undefined;
}

// 60·100·200·300P 분량 선택이 가능한 교재인지 판별합니다.
// offeredVolumes가 지정된 상품(예: ISEE)은 전체 라인업이 아닌 지정된 일부만 판매합니다.
export function offersVolumes(p: Product): boolean {
  return (
    (p.levelLabel?.includes("60·100·200·300P") ?? false) ||
    p.components.some((c) => c.descriptionKo.includes("60·100·200·300P")) ||
    !!p.offeredVolumes
  );
}

// 상품이 실제로 판매하는 분량 목록 — offeredVolumes가 없으면 전체 라인업입니다.
export function volumesForProduct(p: Product) {
  if (p.offeredVolumes) return flexibleVolumes.filter((v) => p.offeredVolumes!.includes(v.pages));
  return flexibleVolumes;
}

// SR Reading Prep(종합 문제집) 전용 150·200·300P 분량 선택이 가능한 교재인지.
export function offersSrVolumes(p: Product): boolean {
  return p.examOrCurriculum === "SR Reading Level";
}

// 고정 분량(60/100/200/300P)으로 바로 구매 가능한 교재인지.
export function isFixedDirect(p: Product): boolean {
  return !offersVolumes(p) && !offersSrVolumes(p) && p.pageCount != null && DIRECT_PAGES.includes(p.pageCount);
}

// 상담 없이 바로 구매할 수 있는 상품인지 판별합니다.
// (분량 선택형이거나, SR 전용 분량 선택형이거나, 고정 분량인 경우)
export function isDirectPurchase(p: Product): boolean {
  return offersVolumes(p) || offersSrVolumes(p) || isFixedDirect(p);
}

// 진입(Starter, 25P) 구성을 제공하는 상품인지 — 영어 레벨테스트 상품에만 적용합니다.
export function hasStarter(p: Product): boolean {
  return offersVolumes(p) && p.track === "level-test" && /English/i.test(p.subject);
}

// 구매 가능한 분량 목록을 "150 / 200 / 300P" 형태로 표시합니다.
export function volumeOptionsLabel(p: Product): string {
  if (offersSrVolumes(p)) return srVolumes.map((v) => v.pages).join(" / ") + "P";
  if (offersVolumes(p)) {
    const vols = volumesForProduct(p);
    const pages = hasStarter(p) ? [starterOption.pages, ...vols.map((v) => v.pages)] : vols.map((v) => v.pages);
    return pages.join(" / ") + "P";
  }
  return "";
}

// 상품 카드/목록에 표시할 가격 라벨.
// 가격은 더 이상 공개 지면에 노출하지 않습니다 — 카카오톡 상담 또는
// /quote-* 비공개 링크에서만 안내합니다. (과거 "Smart Pricing"으로 가격을
// 숨췄다가 이탈이 늘어 되돌린 이력이 있으니, 이 결정을 다시 바꿀 때는
// 전환율 데이터를 함께 확인하세요.)
export function priceDisplay(p: Product): string {
  void p;
  return "Price on Request";
}

// Product 구조화 데이터(JSON-LD)용 가격 범위. 가격을 공개 지면에 노출하지
// 않기로 했으므로 항상 null을 반환해 offers 자체를 생략합니다.
export function productOfferPrice(p: Product): { price: number } | { lowPrice: number; highPrice: number } | null {
  void p;
  return null;
}

// Reading·Vocabulary·Grammar·Writing 4개 영역 통합 교재인지 판별합니다.
export function isFourSkill(p: Product): boolean {
  const u = p.units.join(" ");
  return /Reading/.test(u) && /Writing/.test(u) && /(Grammar|Vocabulary)/.test(u);
}

const TRACK_CODE: Record<string, string> = {
  "us-curriculum": "US",
  ap: "AP",
  admissions: "AD",
  "level-test": "LT",
  "certified-exam": "CE",
};

// 자체 상품 코드 (ISBN 아님) — 예: BB-SR-G4-150
export function productCode(p: Product): string {
  const track = /SR/i.test(p.examOrCurriculum) ? "SR" : TRACK_CODE[p.track] ?? "BK";
  const g = (p.gradeRange.match(/\d+/) || [])[0];
  const grade = g ? `G${g}` : "GX";
  const pages = p.pageCount ? String(p.pageCount).padStart(3, "0") : "VAR";
  return `BB-${track}-${grade}-${pages}`;
}

// "Inside the Workbook" — 상품에 실제 포함되는 연습 영역.
// 4개 영역(RVGW) 통합 교재는 영역별 세부 유형을, 그 외에는 해당 교재의 단원을 그대로 노출합니다.
export function insideTheWorkbook(p: Product): { area: string; items: string[] }[] {
  if (isFourSkill(p)) {
    return [
      { area: "Reading", items: ["Main Idea", "Supporting Details", "Inference", "Author's Purpose", "Vocabulary in Context", "Text Structure", "Cause & Effect"] },
      { area: "Vocabulary", items: ["Context Clues", "Academic Vocabulary", "Word Meaning", "Synonyms", "Application"] },
      { area: "Grammar", items: ["Sentence Structure", "Usage", "Tenses", "Error Correction"] },
      { area: "Writing", items: ["Sentence Writing", "Paragraph Writing", "Reading Response", "Organization"] },
    ];
  }
  return [{ area: "Key Units", items: p.units }];
}

export function pagesLabel(p: Product): string {
  if (offersSrVolumes(p)) return "150·200·300P";
  if (p.pageCount) return `${p.pageCount}P`;
  if (offersVolumes(p)) return "40·60·100·200P";
  return "구성 상담";
}

// 다음 단계(재구매) 연결 — 명시적 학습 사다리 우선, 없으면 같은 track에서 난이도 높은 교재로 이어집니다.
const NEXT_ID: Record<string, string> = {
  "english-level-test-g1": "english-level-test-g2",
  "english-level-test-g2": "english-level-test-g3",
  "english-level-test-g3": "english-level-test-g4",
  "english-level-test-g4": "english-level-test-g5",
  "english-level-test-g5": "english-level-test-g6",
  "sr-reading-prep-g2-3": "sr-reading-prep-g4-5",
  "sr-reading-prep-g4-5": "sr-reading-prep-g6-8",
  "prealgebra-workbook": "algebra-1-workbook",
  "algebra-1-workbook": "algebra-2-workbook",
  "math-reasoning-level-test": "english-level-test-g1",
};

export function nextWorkbooks(p: Product, all: Product[]): Product[] {
  const out: Product[] = [];
  const push = (x?: Product) => {
    if (x && x.id !== p.id && !out.some((o) => o.id === x.id)) out.push(x);
  };
  push(all.find((x) => x.id === NEXT_ID[p.id]));
  const sameTrack = all.filter((x) => x.track === p.track && x.id !== p.id);
  sameTrack
    .filter((x) => x.difficulty > p.difficulty)
    .sort((a, b) => a.difficulty - b.difficulty)
    .forEach(push);
  sameTrack.forEach(push); // 같은 track 나머지로 보충
  return out.slice(0, 2);
}

// 해설 언어 — SAT·AP·성인 공인시험은 영어 해설 중심, 그 외는 한글 상세해설 중심.
export function usesKoreanExplanation(p: Product): boolean {
  return !(p.track === "ap" || /SAT/i.test(p.examOrCurriculum) || p.track === "certified-exam");
}

export interface ExplanationLanguage {
  labelEn: string;
  labelKo: string;
  note: string;
}

export function explanationLanguage(p: Product): ExplanationLanguage {
  if (usesKoreanExplanation(p)) {
    return {
      labelEn: "Korean Explanation",
      labelKo: "한글 상세해설",
      note: "정답의 이유와 핵심 개념을 한국어로 설명해, 학생이 혼자 복습하고 부모님이 채점·설명해 주기에도 좋습니다.",
    };
  }
  return {
    labelEn: "English Explanation",
    labelKo: "영문 해설 (핵심 한국어)",
    note: "실제 시험 언어에 맞춰 영어로 해설하며, 핵심 포인트는 한국어로 보완해 이해를 돕습니다.",
  };
}

// 권장 학습 방식 — 학부모가 "아이가 혼자 풀 수 있는지"를 판단하도록 돕습니다.
export type StudyMode = "Self Study" | "Parent Guided" | "Tutor Guided";

export interface StudyModeInfo {
  mode: StudyMode;
  ko: string;
  recommended: boolean;
  note: string;
}

export function studyModes(p: Product): StudyModeInfo[] {
  const ko = usesKoreanExplanation(p);
  const advanced = !ko; // SAT·AP·공인시험
  const high = p.difficulty >= 4;
  return [
    {
      mode: "Self Study",
      ko: "자기주도 학습",
      recommended: !!p.includesDetailedExplanations && !high,
      note: "정답·상세 해설이 포함되어 학생이 스스로 채점하고 복습할 수 있습니다.",
    },
    {
      mode: "Parent Guided",
      ko: "부모 지도 학습",
      recommended: ko,
      note: "한글 해설로 부모님이 채점·설명을 도와주기에 적합합니다.",
    },
    {
      mode: "Tutor Guided",
      ko: "지도 학습 권장",
      recommended: advanced || high,
      note: "고난도·시험 특화 구성은 튜터·교사의 지도와 함께할 때 더 효과적입니다.",
    },
  ];
}

// 모든 상품 카드에 동일한 포맷으로 노출할 통일 정보 배지 목록.
// 예: Grade 3–4 · SR 3.0–4.0 · Standard · 100P · 4 Skills · Answer Guide
export function productBadges(p: Product): string[] {
  const badges: string[] = [p.gradeRange];
  if (p.readingLevel) badges.push(p.readingLevel);
  badges.push(blossomLevel(p.difficulty), pagesLabel(p));
  if (isFourSkill(p)) badges.push("4 Skills");
  if (p.includesAnswerKey) badges.push("Answer Guide");
  return badges;
}
