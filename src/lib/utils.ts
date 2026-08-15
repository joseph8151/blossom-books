import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 받침 유무 판정 — 교재명·시험명처럼 값이 바뀌는 단어 뒤에 조사를 붙일 때 사용합니다.
// 한글은 종성으로, 숫자는 읽는 소리로, 영문은 끝 글자로 판단합니다.
function hasBatchim(word: string): boolean {
  const last = word.trim().slice(-1);
  const code = last.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28 !== 0;
  if (/[0-9]/.test(last)) return [true, true, false, true, false, false, true, true, true, false][Number(last)]; // 영·일·이·삼…
  if (/[a-zA-Z]/.test(last)) return /[lmn]/i.test(last) || !/[aeiouyr]/i.test(last); // 리을·미음·니은은 받침, r 은 '어'로 끝남
  return false; // 기호·공백 등은 받침 없음으로 처리
}

// 예: josa("문제집", "은는") → "문제집은"
export function josa(word: string, pair: "은는" | "이가" | "을를" | "과와" | "으로로"): string {
  const b = hasBatchim(word);
  const table: Record<string, [string, string]> = {
    은는: ["은", "는"],
    이가: ["이", "가"],
    을를: ["을", "를"],
    과와: ["과", "와"],
    으로로: ["으로", "로"],
  };
  const [withB, withoutB] = table[pair];
  return `${word}${b ? withB : withoutB}`;
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

// Blossom Level System — 자체 난이도 체계. 상품 난이도(1~5)를 4단계 브랜드 레벨로 매핑합니다.
export const BLOSSOM_LEVELS = ["Foundation", "Standard", "Advanced", "Challenge"] as const;
export type BlossomLevel = (typeof BLOSSOM_LEVELS)[number];

export const BLOSSOM_LEVEL_KO: Record<BlossomLevel, string> = {
  Foundation: "기초",
  Standard: "표준",
  Advanced: "상급",
  Challenge: "심화",
};

export function blossomLevel(difficulty: number): BlossomLevel {
  if (difficulty <= 2) return "Foundation";
  if (difficulty === 3) return "Standard";
  if (difficulty === 4) return "Advanced";
  return "Challenge";
}
