import { Product } from "@/lib/types";
import { blossomLevel } from "@/lib/utils";
import { fromPriceKRW, formatKRW, volumeByPages, starterOption } from "@/data/pricing";

const DIRECT_PAGES = [40, 60, 100];

// 40·60·100·200p 분량 선택이 가능한 교재인지 판별합니다.
export function offersVolumes(p: Product): boolean {
  return (
    (p.levelLabel?.includes("40") ?? false) ||
    p.components.some((c) => c.descriptionKo.includes("40·60·100·200p"))
  );
}

// 고정 분량(40/60/100P)으로 바로 구매 가능한 교재인지.
export function isFixedDirect(p: Product): boolean {
  return !offersVolumes(p) && p.pageCount != null && DIRECT_PAGES.includes(p.pageCount);
}

// 상담 없이 바로 구매할 수 있는 상품인지 판별합니다.
// (분량 선택형이거나, 40/60/100P 고정 분량인 경우)
export function isDirectPurchase(p: Product): boolean {
  return offersVolumes(p) || isFixedDirect(p);
}

// 진입(Starter, 25P) 구성을 제공하는 상품인지 — 영어 레벨테스트 상품에만 적용합니다.
export function hasStarter(p: Product): boolean {
  return offersVolumes(p) && p.track === "level-test" && /English/i.test(p.subject);
}

// 상품 카드/목록에 표시할 가격 라벨.
export function priceDisplay(p: Product): string {
  if (offersVolumes(p)) {
    return hasStarter(p) ? `${formatKRW(starterOption.priceKRW)}부터` : `${formatKRW(fromPriceKRW)}부터`;
  }
  if (isFixedDirect(p)) {
    const v = volumeByPages(p.pageCount as number);
    return v ? formatKRW(v.priceKRW) : "Price on Request";
  }
  return "Price on Request";
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
  if (p.pageCount) return `${p.pageCount}P`;
  if (offersVolumes(p)) return "40·60·100·200P";
  return "구성 상담";
}

// 다음 단계(재구매) 연결 — 명시적 학습 사다리 우선, 없으면 같은 track에서 난이도 높은 교재로 이어집니다.
const NEXT_ID: Record<string, string> = {
  "english-level-test-g1-2": "english-level-test-g3-4",
  "english-level-test-g3-4": "english-level-test-g5-6",
  "sr-reading-prep-g2-3": "sr-reading-prep-g4-5",
  "sr-reading-prep-g4-5": "sr-reading-prep-g6-8",
  "prealgebra-workbook": "algebra-1-workbook",
  "algebra-1-workbook": "algebra-2-workbook",
  "math-reasoning-level-test": "english-level-test-g1-2",
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
