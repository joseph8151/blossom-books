import { Product } from "@/lib/types";
import { blossomLevel } from "@/lib/utils";
import { fromPriceKRW, formatKRW, volumeByPages } from "@/data/pricing";

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

// 상품 카드/목록에 표시할 가격 라벨.
export function priceDisplay(p: Product): string {
  if (offersVolumes(p)) return `${formatKRW(fromPriceKRW)}부터`;
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
