import { Product } from "@/lib/types";
import { CoverTone } from "@/lib/utils";

// ────────────────────────────────────────────────────────────
// 블러섬북스 자체 교재 시리즈
// 출판사로서의 정체성을 위해 모든 교재를 5개 시리즈로 묶어 안내합니다.
// 각 교재의 시리즈는 seriesFor()가 트랙·과목·난이도를 기준으로 자동 배정합니다.
// ────────────────────────────────────────────────────────────

export type BlossomSeries = "core" | "practice" | "advanced" | "skills" | "workbook";

// 시리즈 노출 순서 (기초 → 실전)
export const seriesOrder: BlossomSeries[] = ["core", "practice", "advanced", "skills", "workbook"];

export interface SeriesInfo {
  key: BlossomSeries;
  name: string; // 영문 시리즈명 (표지·배지용)
  ko: string; // 한글 부제
  tagline: string; // 한 줄 소개
  description: string; // 상세 소개
  focus: string[]; // 대표 학습 포인트
  tone: CoverTone; // 강조 색상 (BookCoverMockup 톤과 통일)
}

export const seriesInfo: Record<BlossomSeries, SeriesInfo> = {
  core: {
    key: "core",
    name: "Blossom Core",
    ko: "개념·기초 다지기",
    tagline: "학습의 토대가 되는 핵심 개념을 확실하게",
    description:
      "본격적인 학습에 앞서 반드시 다져야 할 개념과 기초 유형을 담았습니다. 학년보다 다소 쉬운 수준부터 시작해 스스로 이해하고 넘어갈 수 있도록 구성합니다.",
    focus: ["핵심 개념 정리", "기초 유형 반복", "레벨테스트 입문"],
    tone: "ivory",
  },
  practice: {
    key: "practice",
    name: "Blossom Practice",
    ko: "표준 문제 연습",
    tagline: "학년 수준에 맞춘 표준 문제집",
    description:
      "교육과정 표준 범위를 단원별로 고르게 다루는 문제집입니다. 개념 확인부터 응용까지 자연스럽게 이어지도록 문제의 순서와 난이도를 설계합니다.",
    focus: ["교육과정 표준 범위", "단원별 균형 구성", "개념→응용 연결"],
    tone: "navy",
  },
  advanced: {
    key: "advanced",
    name: "Blossom Advanced",
    ko: "심화·고난도",
    tagline: "AP·SAT 등 상급 과정을 위한 심화 문제집",
    description:
      "AP, SAT처럼 높은 사고력과 응용력을 요구하는 과정을 위한 심화 교재입니다. 자료 해석, 서술형, 자유응답형(FRQ) 등 실제 시험 형식을 반영합니다.",
    focus: ["AP·SAT 대비", "자료 해석·서술형", "실전 난이도"],
    tone: "burgundy",
  },
  skills: {
    key: "skills",
    name: "Blossom Skills",
    ko: "영역별 집중",
    tagline: "리딩·라이팅·문법·스피킹을 영역별로 집중 보완",
    description:
      "특정 영역을 집중적으로 훈련하고 싶은 학생을 위한 시리즈입니다. 리딩, 라이팅, 문법, 어휘, 스피킹 등 목적에 맞는 영역만 골라 학습할 수 있습니다.",
    focus: ["영역별 집중 학습", "공인 영어시험 대비", "약점 보완"],
    tone: "brown",
  },
  workbook: {
    key: "workbook",
    name: "Blossom Workbook",
    ko: "시험·입학 실전",
    tagline: "입학시험·표준화 시험 실전 대비",
    description:
      "국제학교 입학시험, 학업성취도 평가 등 실전 시험을 겨냥한 문제집입니다. 실제 출제 형식과 영역 구성을 반영하여 시험 감각을 익히도록 구성합니다.",
    focus: ["입학·편입 시험", "표준화 시험 대비", "실전 형식 반영"],
    tone: "pink",
  },
};

// 교재의 트랙·과목·난이도를 기준으로 시리즈를 배정합니다.
const skillSubjects = ["Reading", "Writing", "Grammar", "Vocabulary", "English", "Medical English"];

export function seriesFor(p: Product): BlossomSeries {
  // 심화: AP · SAT 수학 등 상급 학술
  if (p.track === "ap") return "advanced";
  if (/SAT/i.test(p.examOrCurriculum) && p.subject === "Mathematics") return "advanced";
  // 국제학교·입학시험 → 실전 워크북
  if (p.track === "admissions") return "workbook";
  // 공인 영어시험 → 영역별 스킬 / 그 외(수학형) → 실전
  if (p.track === "certified-exam") {
    return skillSubjects.includes(p.subject) ? "skills" : "workbook";
  }
  // 레벨테스트 준비 → 기초 다지기
  if (p.track === "level-test") return "core";
  // 미국 교과과정
  if (p.track === "us-curriculum") {
    if (["Reading", "Writing", "Grammar", "Vocabulary"].includes(p.subject)) return "skills";
    if (p.difficulty <= 2) return "core";
    return "practice";
  }
  return "practice";
}

// 특정 시리즈에 속한 교재 목록
export function productsInSeries(list: Product[], key: BlossomSeries): Product[] {
  return list.filter((p) => seriesFor(p) === key);
}
