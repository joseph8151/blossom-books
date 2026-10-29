// /quote-ib 페이지 전용 콘텐츠 데이터.
//
// 상품은 A~E 다섯 종류로 정리합니다. 메인 상품은 A(IB 맞춤 문제집)이고
// B~E는 보조 상품입니다. A·E의 100P/200P 가격은 @/data/pricing의 기존
// 공용 단가(flexibleVolumes)를 그대로 가져와 쓰고, B·C·D는 이 페이지에서만
// 쓰는 고정가라 아래에 직접 정의합니다 — 전부 사용자가 명시적으로 준 금액이며
// 임의로 추가·변경하지 않았습니다.

export interface SubjectInfo {
  id: string;
  name: string; // "Math AA"
  level: string; // "SL · HL"
  tagline: string; // 과목 카드 한 줄 설명
  focusAreas: string[]; // 다루는 영역/주제
  description: string; // 짧은 설명 (1~2문장)
  accent: string;
  accentSoft: string;
}

export const SUBJECTS: SubjectInfo[] = [
  {
    id: "math-aa",
    name: "Math AA",
    level: "SL · HL",
    tagline: "식·그래프·표·조건·응용 문제를 섞어 연습합니다.",
    focusAreas: ["Functions", "Algebra", "Trigonometry", "Statistics", "Calculus"],
    description: "학생에게 필요한 영역을 골라 구성합니다. 계산 문제만 반복하기보다 식, 그래프, 표, 조건, 응용 문제를 섞어 연습할 수 있도록 만듭니다.",
    accent: "#4c5f8a",
    accentSoft: "#eef1f6",
  },
  {
    id: "math-ai",
    name: "Math AI",
    level: "SL · HL",
    tagline: "실제 자료와 수학을 연결하는 문제 중심입니다.",
    focusAreas: ["Statistics", "Probability", "Functions", "Graphs", "Data", "Modeling"],
    description: "통계, 확률, 함수, 그래프, 데이터, 모델링 등 실제 자료와 수학을 연결하는 문제를 중심으로 구성합니다.",
    accent: "#4c5f8a",
    accentSoft: "#eef1f6",
  },
  {
    id: "biology",
    name: "Biology",
    level: "SL · HL",
    tagline: "개념, 자료 해석, 설명형 문제를 함께 구성합니다.",
    focusAreas: ["Concept Check", "그림·과정", "실험 자료", "그래프 해석", "설명형 문제"],
    description: "개념 확인, 그림 및 과정, 실험 자료, 그래프 해석, 설명형 문제를 함께 구성합니다.",
    accent: "#5f6f52",
    accentSoft: "#eef1e8",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    level: "SL · HL",
    tagline: "개념과 계산, 자료 해석을 함께 배치합니다.",
    focusAreas: ["개념", "계산", "반응", "데이터", "그래프", "설명형 문제"],
    description: "개념, 계산, 반응, 데이터, 그래프, 설명형 문제를 학생 수준에 맞게 배치합니다.",
    accent: "#5b6670",
    accentSoft: "#eef0f1",
  },
  {
    id: "physics",
    name: "Physics",
    level: "SL · HL",
    tagline: "상황 이해부터 결과 해석까지 순서대로 연습합니다.",
    focusAreas: ["문제 상황 이해", "그림", "공식 선택", "계산", "결과 해석"],
    description: "문제 상황 이해 → 그림 → 필요한 공식 선택 → 계산 → 결과 해석 순서로 연습합니다.",
    accent: "#1c2c4c",
    accentSoft: "#eceff4",
  },
  {
    id: "economics",
    name: "Economics",
    level: "SL · HL",
    tagline: "개념과 그래프, 서술형 답안을 연결합니다.",
    focusAreas: ["개념", "그래프", "경제 상황", "원인과 결과", "서술형 답안"],
    description: "개념, 그래프, 경제 상황, 원인과 결과, 서술형 답안을 연결해서 구성합니다.",
    accent: "#6d2432",
    accentSoft: "#f3e9ea",
  },
  {
    id: "business",
    name: "Business Management",
    level: "SL · HL",
    tagline: "기업 사례를 읽고 적용 → 분석 → 평가로 이어집니다.",
    focusAreas: ["사례 읽기", "개념 적용", "분석", "평가"],
    description: "기업 사례를 읽은 뒤 개념 적용, 분석, 평가까지 이어지는 문제로 구성합니다.",
    accent: "#7d7a45",
    accentSoft: "#f2f1e6",
  },
  {
    id: "ess",
    name: "ESS",
    level: "SL · HL",
    tagline: "환경·생태·자원 문제를 자료와 함께 다룹니다.",
    focusAreas: ["환경 시스템", "생태", "자원", "오염", "기후변화", "지속가능성", "그래프·데이터"],
    description: "환경 시스템, 생태, 자원, 오염, 기후변화, 지속가능성과 관련된 그래프·데이터 문제로 구성합니다.",
    accent: "#5f6f52",
    accentSoft: "#eef1e8",
  },
];

export interface SubjectGroup {
  label: string;
  subjectIds: string[]; // SUBJECTS에서 상세 카드로 보여줄 과목
  inquireOnly?: string[]; // 상세 없이 "문의 가능"으로만 표시할 과목명
}

export const SUBJECT_GROUPS: SubjectGroup[] = [
  { label: "Mathematics", subjectIds: ["math-aa", "math-ai"] },
  { label: "Sciences", subjectIds: ["biology", "chemistry", "physics", "ess"] },
  { label: "Individuals & Societies", subjectIds: ["economics", "business"], inquireOnly: ["Psychology"] },
  { label: "Languages / 기타", subjectIds: [], inquireOnly: ["English A", "English B", "Computer Science", "History", "Geography"] },
];

// ── 100P vs 200P ──────────────────────────────────────────
export const VOLUME_COMPARE = {
  p100: {
    recommend: "특정 단원, 취약 영역, 시험 전 집중 연습이 필요한 학생에게 추천합니다.",
    examples: ["Math AA에서 Calculus 집중", "Biology에서 Data Analysis 집중", "Economics에서 Graph + Written Response 집중"],
    breakdown: [
      { label: "개념 및 기본 문제", pages: "약 20P" },
      { label: "핵심 문제", pages: "약 40P" },
      { label: "응용 문제", pages: "약 20P" },
      { label: "Mixed Review", pages: "약 20P" },
    ],
    who: ["한두 개 Unit이 약한 학생", "시험 전 특정 부분을 집중하고 싶은 학생", "현재 학교 진도만 연습하고 싶은 학생"],
  },
  p200: {
    recommend: "여러 단원을 함께 준비하거나 한 과목을 보다 넓게 연습하려는 학생에게 추천합니다.",
    examples: ["Math AA 주요 단원 + Mixed Review", "Biology 개념 + 데이터 + 서술형", "Chemistry 계산 + 개념 + 자료 해석", "Economics 개념 + 그래프 + 서술형"],
    breakdown: [
      { label: "여러 Unit 기본 문제" },
      { label: "응용 문제" },
      { label: "Data / Graph" },
      { label: "Written Response" },
      { label: "Mixed Review" },
      { label: "Mock-style Practice" },
    ],
    who: ["여러 Unit을 함께 준비하는 학생", "SL·HL 과목 전체를 넓게 연습하려는 학생", "Final 또는 Mock 전 누적 복습이 필요한 학생"],
  },
};

// ── 주문 방식 ─────────────────────────────────────────────
export const ORDER_STEPS = [
  { n: "01", title: "과목 선택" },
  { n: "02", title: "SL / HL 선택" },
  { n: "03", title: "100P / 200P 선택" },
  { n: "04", title: "현재 진도 및 필요한 Unit 전달" },
  { n: "05", title: "Blossom Books에서 교재 구성" },
  { n: "06", title: "PDF 제공" },
];

// ── FAQ ───────────────────────────────────────────────────
export const IB_FAQ = [
  { q: "IB 공식 교재인가요?", a: "아니며 Blossom Books에서 독립적으로 제작한 Unofficial 학습 자료입니다." },
  { q: "기출문제인가요?", a: "기출을 그대로 복사하지 않고, 과목의 개념과 문제 유형을 바탕으로 자체 제작합니다." },
  { q: "SL과 HL 가격이 다른가요?", a: "페이지 수 기준으로 동일합니다." },
  { q: "특정 Unit만 만들 수 있나요?", a: "가능합니다." },
  { q: "100P와 200P 중 무엇을 선택해야 하나요?", a: "한두 개 취약 단원 중심이면 100P, 여러 단원 및 누적 연습이면 200P를 권장합니다." },
  { q: "해설이 포함되나요?", a: "문제 구성에 맞춰 해설을 함께 제공합니다." },
];

// ── B. IB 모의고사 ────────────────────────────────────────
export const MOCK_TEST_PRICING = [
  { id: "mock-1", name: "1회", priceKRW: 69000 },
  { id: "mock-2", name: "2회", priceKRW: 119000 },
];
export const MOCK_TEST_INCLUDES = ["Question Paper", "Answer / Solution Guide"];
export const MOCK_TEST_NOTE =
  "과목별 시험 구조(Paper 수, 문항 수 등)는 학교·시점에 따라 다를 수 있어, 이 페이지에서 임의로 고정하지 않습니다. 정확한 구성은 상담에서 확인합니다.";

// ── C. IB Core 과제 가이드 ────────────────────────────────
export const CORE_GUIDE_PRICING = [
  { id: "ia", name: "IA Guide", priceKRW: 59000 },
  { id: "ee", name: "EE Guide", priceKRW: 69000 },
  { id: "tok", name: "TOK Guide", priceKRW: 59000 },
  { id: "bundle", name: "IA + EE + TOK", priceKRW: 149000 },
];
export const CORE_GUIDE_NOTE =
  "과제를 대신 작성하는 서비스가 아닙니다. 완성된 IA·EE·TOK 답안을 제공하지 않으며, 학생이 직접 작성할 수 있도록 주제를 좁히고, 자료를 정리하고, 초안을 점검하는 과정을 돕는 학습용 가이드입니다.";

// ── D. 저가 입문·보조 상품 ────────────────────────────────
export const MINI_PACK_PRICING = [
  { id: "command-terms", name: "IB Command Terms Pack", priceKRW: 39000 },
  { id: "graph-data", name: "IB Graph & Data Pack", priceKRW: 49000 },
  { id: "calculation", name: "IB Calculation Pack", priceKRW: 49000 },
  { id: "diagnostic", name: "IB Diagnostic", priceKRW: 39000 },
];

// ── E. 확장 라인 (가격은 A와 동일: 100P/200P) ────────────
export const EXTENDED_LINE = [
  { id: "bridge", name: "MYP → DP Bridge", desc: "MYP를 마친 학생이 DP 과목을 바로 시작하기 전에 쓰는 연결 교재입니다." },
  { id: "final-review", name: "IB Final Review", desc: "시험 전, 여러 단원을 섞어 누적 복습하는 Mixed Review 중심 교재입니다." },
  { id: "hl-intensive", name: "IB HL Intensive", desc: "여러 개념을 한 문제 안에서 연결하는 심화 Challenge 문제 중심 교재입니다." },
];
