import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 표지 색상 테마 — 교재별로 안정적으로(같은 교재는 항상 같은 색) 다양하게 배정합니다.
export const COVER_TONES = ["navy", "burgundy", "brown", "ivory", "pink"] as const;
export type CoverTone = (typeof COVER_TONES)[number];

export function coverToneFor(id: string): CoverTone {
  const sum = [...id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return COVER_TONES[sum % COVER_TONES.length];
}

// 난이도(1~5) → 한글 라벨. 필터·카드·상세 페이지에서 공통으로 사용합니다.
export const DIFFICULTY_LABELS: Record<number, string> = {
  1: "입문",
  2: "기초",
  3: "표준",
  4: "상급",
  5: "심화",
};

export function difficultyLabel(level: number): string {
  return DIFFICULTY_LABELS[level] ?? "표준";
}
