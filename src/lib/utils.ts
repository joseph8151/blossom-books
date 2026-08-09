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
