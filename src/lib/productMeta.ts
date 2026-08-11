import { Product } from "@/lib/types";
import { blossomLevel } from "@/lib/utils";

// 40·60·100·200p 분량 선택이 가능한 교재인지 판별합니다.
export function offersVolumes(p: Product): boolean {
  return (
    (p.levelLabel?.includes("40") ?? false) ||
    p.components.some((c) => c.descriptionKo.includes("40·60·100·200p"))
  );
}

// 상담 없이 40·60·100P를 바로 구매할 수 있는 상품인지 판별합니다.
export function isDirectPurchase(p: Product): boolean {
  return offersVolumes(p);
}

// Reading·Vocabulary·Grammar·Writing 4개 영역 통합 교재인지 판별합니다.
export function isFourSkill(p: Product): boolean {
  const u = p.units.join(" ");
  return /Reading/.test(u) && /Writing/.test(u) && /(Grammar|Vocabulary)/.test(u);
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
