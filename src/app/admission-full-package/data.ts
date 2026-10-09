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

// 서브브랜드 표기. Blossom Books와 별개 회사처럼 보이지 않도록 항상
// "by Blossom Books"와 함께 노출합니다(Hero, 메타데이터 등).
export const subBrand = {
  name: "Blossom Admissions",
  parent: "by Blossom Books",
  tagline: "International School Admission Preparation",
};

// Hero 우측의 "Admission Card" 예시 — 실제 KIS Jeju의 확정된 요구사항이
// 아니라 서비스 결과물이 어떻게 보이는지 보여주는 순수 예시입니다.
// Hero.tsx에서 "예시"임을 명확히 라벨링합니다.
export const heroCardExample = {
  school: "KIS Jeju",
  subtitle: "Grade 5 Admission",
  rows: [
    { area: "Reading", level: "Target" },
    { area: "Math", level: "Advanced" },
    { area: "Writing", level: "Booster" },
    { area: "Interview", level: "Included" },
  ],
  recommended: "Premium Admission Program",
};

// Hero 바로 아래 한 줄로 지나가는 4단계 서비스 흐름.
export const admissionPlanSteps = [
  { n: "01", title: "School", desc: "지원 학교와 학년 확인" },
  { n: "02", title: "Student", desc: "현재 Reading · Math · Writing 수준 확인" },
  { n: "03", title: "Assessment", desc: "학교가 요구하는 시험 유형 확인" },
  { n: "04", title: "Preparation", desc: "맞춤 Workbook · Interview · Mock Test 구성" },
];

// "Admissions Desk" 시그니처 섹션 — 학교×학생 기준으로 설계한다는 메시지를
// 서류 3장 비유로 보여줍니다.
export const admissionsDesk = {
  quote: "Every admission package starts with a school and a student — not a page count.",
  cards: [
    { title: "School Brief", desc: "지원 학교 평가 방식" },
    { title: "Student Profile", desc: "현재 수준과 약점" },
    { title: "Preparation Plan", desc: "시험일까지 학습 구성" },
  ],
};

export interface PackageCategory {
  n: string;
  title: string;
  tagline: string;
  items: string[];
}

export const packageCategories: PackageCategory[] = [
  {
    n: "1",
    title: "Reading",
    tagline: "Academic Reading & Comprehension",
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
    tagline: "Academic Vocabulary",
    items: ["Meaning in Context", "Synonym", "Antonym", "Word Choice", "Sentence Completion", "Academic Vocabulary"],
  },
  {
    n: "3",
    title: "Math",
    tagline: "Placement & Problem Solving",
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
    tagline: "Essay & Written Response",
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
    tagline: "Student & Follow-up Interview",
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
    tagline: "School-Specific Simulation",
    items: ["Baseline Test", "Target Test", "Challenge Test"],
  },
];

// 위 6개 영역은 모든 학생에게 똑같이 제공되는 고정 패키지가 아니라, 지원
// 학교가 요구하는 평가 방식에 따라 교체·재구성되는 "출발점"입니다. 아래
// Test-Specific Configuration 섹션에서 이 기준값(baseAreas)을 그대로 보여주고,
// 학교별로 무엇이 무엇으로 바뀌는지 Before → After로 표현합니다.
export const baseAreas = ["Reading", "Vocabulary", "Math", "Writing", "Interview", "Mock Test"];

export interface TestConfiguration {
  test: string;
  replaces: string; // 대체되는 기본 영역 → 교체 결과 (한 줄 요약)
  note: string;
  items: string[]; // 실제 구성 예
}

export const testConfigurations: TestConfiguration[] = [
  {
    test: "MAP (MAP Growth)",
    replaces: "Reading → MAP Reading · Math → MAP Math",
    note: "적응형 시험 특성을 고려해 학생의 현재 수준과 목표 구간에 맞춰 난도를 구성합니다.",
    items: ["RIT 구간별 Reading", "RIT 구간별 Math", "Adaptive-style Practice", "MAP Mock Test"],
  },
  {
    test: "CAT4",
    replaces: "Vocabulary / Math Reasoning → CAT4 Reasoning",
    note: "일반 영어·수학 문제를 추가하는 것이 아니라, CAT4의 추론 구조에 맞게 문제집 구성을 변경합니다.",
    items: ["Verbal Reasoning", "Non-verbal Reasoning", "Quantitative Reasoning", "Spatial Reasoning"],
  },
  {
    test: "PTE (Pearson Test of English)",
    replaces: "Reading / Vocabulary / Writing / Listening·Speaking → PTE Preparation",
    note: "영역별로 따로 준비하지 않고, PTE 시험 방식에 맞춰 하나로 통합·재구성합니다.",
    items: ["PTE Reading", "PTE Writing", "Listening", "Speaking", "Integrated Language Practice"],
  },
  {
    test: "PTM (Pearson Test of Maths)",
    replaces: "Math → PTM Mathematics",
    note: "일반 Math 대신 PTM이 실제로 평가하는 영역 구성으로 교체합니다.",
    items: ["Number", "Calculation", "Problem Solving", "Geometry", "Measurement", "Data Handling"],
  },
  {
    test: "자체 시험 (School-specific Assessment)",
    replaces: "기본 6영역 중 필요한 항목만 선택 또는 교체",
    note: "학교가 공개한 입학 평가 영역과 학생의 학년을 확인한 뒤 Reading, Math, Writing, Interview, Reasoning 등의 비중을 다시 설계합니다.",
    items: [],
  },
];

// Before → After 대표 예시 3개. "시험을 추가"하는 게 아니라 기본 6영역이
// 학교 요구에 맞춰 "교체"된다는 것을 한눈에 보여줍니다.
export interface ConfigExample {
  label: string;
  after: string[];
  note?: string;
}

export const configExamples: ConfigExample[] = [
  {
    label: "MAP 요구 학교",
    after: ["MAP Reading", "MAP Math", "Writing", "Interview", "MAP-style Mock Test"],
  },
  {
    label: "CAT4 요구 학교",
    after: [
      "Verbal Reasoning",
      "Non-verbal Reasoning",
      "Quantitative Reasoning",
      "Spatial Reasoning",
      "Writing",
      "Interview",
      "CAT4 Practice Test",
    ],
  },
  {
    label: "MAP + CAT4 요구 학교",
    after: [
      "MAP Reading",
      "MAP Math",
      "CAT4 Verbal Reasoning",
      "CAT4 Non-verbal Reasoning",
      "CAT4 Quantitative Reasoning",
      "CAT4 Spatial Reasoning",
      "Writing",
      "Interview",
      "Mock Test",
    ],
    note: "모든 영역을 무조건 넣는 것이 아니라, 지원 학교와 학생 수준에 따라 필요한 항목만 선택합니다.",
  },
];

// 같은 학년이라도 지원 학교 요구 시험에 따라 준비 구성이 달라진다는 것을
// 보여주는 4개 학생 예시.
export const studentConfigExamples = [
  { label: "Student A", requirement: "School requires MAP", config: "MAP Reading + MAP Math + Writing + Interview" },
  { label: "Student B", requirement: "School requires CAT4", config: "CAT4 Reasoning + Writing + Interview" },
  {
    label: "Student C",
    requirement: "School uses its own assessment",
    config: "Reading + Math Placement + Writing + Interview",
  },
  {
    label: "Student D",
    requirement: "School requires MAP + CAT4",
    config: "MAP Reading + MAP Math + CAT4 Reasoning + Interview",
  },
];

export interface PricingTier {
  id: "standard" | "premium" | "signature";
  name: string;
  tagline: string;
  priceKRW: number;
  pages: string;
  mostPopular?: boolean;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: "standard",
    name: "Standard",
    tagline: "Essential Admission Preparation",
    priceKRW: 490000,
    pages: "Typical volume: approximately 200 pages",
    features: [
      "지원 학교 1곳 기준 분석",
      "핵심 시험 영역 중심 구성",
      "기본 Writing",
      "기본 Interview",
      "기본 Mock Test",
      "Study Guide",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Personalized Admission Program",
    priceKRW: 790000,
    pages: "Typical volume: approximately 300 pages",
    mostPopular: true,
    features: [
      "학교 요구 시험에 맞춘 상세 재구성",
      "상세 Level Mapping · 난도 세분화",
      "Writing 확장",
      "Interview 확장",
      "Mock Test 2회",
      "Weakness Booster",
      "Vocabulary Flashcards",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "Complete Admission Preparation",
    priceKRW: 1290000,
    pages: "Typical volume: approximately 400+ pages",
    features: [
      "복합 평가 유형 대응 (예: MAP + CAT4)",
      "Challenge Level 구성",
      "다단계 Mock Test (3회)",
      "Weakness Booster 확대",
      "6~8주 Admission Roadmap",
      "Parent Admission Guide",
      "우선 제작 · 빠른 납품",
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
  { n: "02", title: "Math Preparation Book" },
  { n: "03", title: "Writing Preparation Book" },
  { n: "04", title: "Interview Preparation Guide" },
  { n: "05", title: "Mock Test A" },
  { n: "06", title: "Mock Test B" },
  { n: "07", title: "Answer & Explanation Book" },
  { n: "08", title: "Study Plan" },
  { n: "09", title: "School-Specific Checklist" },
];

// Premium부터 포함되는 추가 파일. Signature는 여기에 더해 Mock Test C·
// Additional Practice·학부모 가이드까지 포함합니다(pricingTiers의 features와 연동).
export const premiumExtraFiles = ["Vocabulary Flashcards"];
export const signatureExtraFiles = [
  "Vocabulary Flashcards",
  "Mock Test C",
  "Additional Practice",
  "Parent Admission Guide",
];

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
