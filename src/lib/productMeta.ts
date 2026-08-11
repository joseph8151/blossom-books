import { Product } from "@/lib/types";
import { blossomLevel } from "@/lib/utils";

// 40·60·100·200p 분량 선택이 가능한 교재인지 판별합니다.
export function offersVolumes(p: Product): boolean {
  return (
    (p.levelLabel?.includes("40") ?? false) ||
    p.components.some((c) => c.descriptionKo.includes("40·60·100·200p"))
  );
}

// Reading·Vocabulary·Grammar·Writing 4개 영역 통합 교재인지 판별합니다.
export function isFourSkill(p: Product): boolean {
  const u = p.units.join(" ");
  return /Reading/.test(u) && /Writing/.test(u) && /(Grammar|Vocabulary)/.test(u);
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
