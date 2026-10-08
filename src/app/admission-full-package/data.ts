// /admission-full-package 전용 데이터. 이 페이지는 홈페이지 메인 구조와
// 분리된 독립 랜딩페이지이며, 여기 있는 가격·구성은 다른 /quote-* 페이지나
// 실제 교재 카탈로그(src/data/products.ts)와 무관합니다.

export const assessmentTypes = [
  "MAP",
  "CAT4",
  "WIDA",
  "자체 Reading Test",
  "Math Placement Test",
  "Writing Assessment",
  "Essay",
  "Interview",
  "Parent Interview",
  "SSAT",
  "ISEE",
  "TOEFL Junior",
  "PTE/PTM",
  "학교 자체 온라인 Assessment",
];

export interface PackageCategory {
  n: string;
  title: string;
  items: string[];
}

export const packageCategories: PackageCategory[] = [
  {
    n: "1",
    title: "Reading",
    items: [
      "Fiction / Nonfiction",
      "Main Idea",
      "Detail",
      "Inference",
      "Vocabulary in Context",
      "Author's Purpose",
      "Evidence",
      "Compare & Contrast",
    ],
  },
  {
    n: "2",
    title: "Vocabulary",
    items: ["Meaning in Context", "Synonym", "Antonym", "Word Choice", "Sentence Completion", "Academic Vocabulary"],
  },
  {
    n: "3",
    title: "Math",
    items: [
      "Number & Operations",
      "Fractions",
      "Decimals",
      "Geometry",
      "Measurement",
      "Data & Graphs",
      "Word Problems",
      "Pre-Algebra",
    ],
  },
  {
    n: "4",
    title: "Writing",
    items: [
      "Opinion",
      "Narrative",
      "Informative",
      "Compare & Contrast",
      "Problem & Solution",
      "School Essay",
      "Planning Sheet",
      "Model Response",
      "Self-check",
    ],
  },
  {
    n: "5",
    title: "Interview",
    items: [
      "Self Introduction",
      "School Life",
      "Favorite Subject",
      "Reading",
      "Hobbies",
      "Challenge",
      "Why This School",
      "Situational Questions",
      "Follow-up Questions",
    ],
  },
  {
    n: "6",
    title: "Mock Test",
    items: ["Baseline Test", "Target Test", "Challenge Test"],
  },
];

export interface PricingTier {
  id: "standard" | "premium" | "signature";
  name: string;
  priceKRW: number;
  pages: string;
  mostPopular?: boolean;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: "standard",
    name: "Standard",
    priceKRW: 490000,
    pages: "약 200페이지",
    features: [
      "Reading",
      "Vocabulary",
      "Math",
      "Writing 4~6개",
      "Interview 30~50문항",
      "Mock Test 1회",
      "기본 학습 가이드",
      "학교/학년 맞춤 구성",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceKRW: 790000,
    pages: "약 300페이지",
    mostPopular: true,
    features: [
      "Reading",
      "Vocabulary",
      "Math",
      "Writing 8~10개",
      "Interview 60~80문항",
      "Mock Test 2회",
      "Writing Sample",
      "4주 학습 플랜",
      "학생 수준별 세부 난도 조정",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    priceKRW: 1290000,
    pages: "약 400페이지 이상",
    features: [
      "Reading Advanced",
      "Vocabulary Advanced",
      "Math Target + Challenge",
      "Writing 12~15개",
      "Interview 100문항 이상",
      "Mock Test 3회",
      "Writing 단계별 Sample",
      "6~8주 Study Plan",
      "지원 학교/학생 맞춤형 구성",
      "부족 영역 집중 구성",
    ],
  },
];

export function formatKRW(n: number): string {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export interface StudentExample {
  label: string;
  profile: string[];
  outcomes: string[];
}

export const studentExamples: StudentExample[] = [
  {
    label: "예시 1",
    profile: ["G5 지원", "SR 4.8", "Writing 약함", "Math G6 선행"],
    outcomes: ["Reading Target", "Writing 비중 확대", "Math Challenge 일부 포함", "Interview Follow-up 강화"],
  },
  {
    label: "예시 2",
    profile: ["G7 지원", "Reading 강함", "Math Word Problem 약함", "Speaking 짧음"],
    outcomes: ["Reading Advanced", "Math Word Problem 집중", "Speaking Follow-up Question 확대"],
  },
];

export const deliveryFiles = [
  { n: "01", title: "Admission Workbook" },
  { n: "02", title: "Writing Preparation Book" },
  { n: "03", title: "Interview Preparation Guide" },
  { n: "04", title: "Mock Test A" },
  { n: "05", title: "Mock Test B" },
  { n: "06", title: "Answer & Explanation Book" },
  { n: "07", title: "Study Plan" },
];

export const signatureExtraFiles = ["Mock Test C", "Additional Practice"];

export const disclaimers = [
  "실제 학교의 비공개 기출문제를 복제하지 않습니다.",
  "학교 공식 공개자료 및 공개된 시험 형식, 학년별 교육과정, 일반적인 국제학교 입학평가 유형을 바탕으로 연습 자료를 제작합니다.",
  "시험 형식은 학교, 캠퍼스, 지원 학년, 지원 연도에 따라 달라질 수 있습니다.",
  "최신 입학시험 형식은 지원 학교의 공식 Admissions Office 안내를 우선 확인해야 합니다.",
  "제작 후 전자파일 형태로 전달합니다.",
  "맞춤 제작 상품 특성상 제작 시작 후 변경 범위에 제한이 있을 수 있습니다.",
];

// 학교 카드의 "예상/공개된 평가 영역"에 공통으로 붙는 안내 문구.
export const schoolDataCaveat =
  "최근 공개된 학교 안내 기준이며, 지원 학년 및 연도에 따라 달라질 수 있습니다.";
