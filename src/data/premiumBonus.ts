// ────────────────────────────────────────────────────────────
// 200P+ Premium Bonus Package
// 200페이지 이상 구성을 선택한 고객에게 본교재와 함께 제공되는 학습 보조 자료 6종.
// 문안은 이 파일에서만 관리하고, 메인 섹션·상세페이지·구매 패널이 같은 내용을 씁니다.
// ────────────────────────────────────────────────────────────

export const PREMIUM_MIN_PAGES = 200;

export interface PremiumBonus {
  no: string; // "01"
  en: string; // 영문 제목 (타이포그래피 요소)
  ko: string; // 한글 제목
  short: string; // 상세페이지 INCLUDED 목록용 한 줄
  description: string; // 메인 섹션 카드 본문
}

export const premiumBonuses: PremiumBonus[] = [
  {
    no: "01",
    en: "QUICK REVIEW",
    ko: "핵심 요약집",
    short: "시험 직전 핵심내용 압축 정리",
    description:
      "시험 전 반드시 확인해야 할 핵심 개념과 주요 포인트를 빠르게 복습할 수 있도록 정리한 압축 Review 자료",
  },
  {
    no: "02",
    en: "BONUS PRACTICE TEST",
    ko: "추가 실전 문제",
    short: "추가 실전 문제",
    description: "본교재 학습 후 실력을 한 번 더 확인할 수 있는 별도 Bonus Practice Set 제공",
  },
  {
    no: "03",
    en: "FINAL REVIEW",
    ko: "시험 직전 Final 문제",
    short: "마지막 실력 점검",
    description:
      "시험 직전 마지막으로 점검할 수 있도록 핵심 유형을 중심으로 구성한 Final Review 문제 제공",
  },
  {
    no: "04",
    en: "STUDY PLAN",
    ko: "맞춤형 학습 플랜",
    short: "체계적인 학습계획",
    description:
      "200페이지 이상의 방대한 교재를 효율적으로 학습할 수 있도록 단계별 학습 순서와 학습 계획 제공",
  },
  {
    no: "05",
    en: "WEAKNESS CHECK",
    ko: "취약영역 진단표",
    short: "취약영역 확인",
    description:
      "Reading, Vocabulary, Grammar, Math 등 교재 및 시험 영역별 자신의 약점을 확인할 수 있는 진단 자료 제공",
  },
  {
    no: "06",
    en: "ERROR LOG",
    ko: "오답노트 & Progress Tracker",
    short: "오답 및 학습진도 관리",
    description:
      "틀린 문제와 취약 개념을 기록하고 학습 진행 상황을 관리할 수 있는 Premium Workbook 제공",
  },
];

// 구매 패널·상세페이지에서 "무엇이 들어있는지" 한눈에 보여줄 목록.
// 앞의 3개는 기본 구성, 나머지는 Premium Bonus.
export const premiumIncludes = [
  "교재 + 상세 해설",
  "핵심 Review 자료",
  "추가 Practice Set",
  "Final Review",
  "Study Plan",
  "Weakness Check",
  "Error Log & Tracker",
];

// 100P STANDARD vs 200P+ PREMIUM 비교
export const standardVsPremium = {
  standard: {
    label: "100P STANDARD",
    tagline: "Focused Practice",
    items: ["100P Workbook", "Answer & Explanation"],
  },
  premium: {
    label: "200P+ PREMIUM",
    tagline: "Complete Preparation",
    note: "BEST FOR COMPLETE PREPARATION",
    items: [
      "200P+ Workbook",
      "Answer & Explanation",
      "Quick Review",
      "Bonus Practice",
      "Final Review",
      "Study Plan",
      "Weakness Check",
      "Error Log",
    ],
  },
};

// 200P+ 상세페이지 FAQ (기존 FAQ 뒤에 이어 붙입니다)
export const premiumFaq = [
  {
    q: "200P 교재에는 어떤 추가 자료가 포함되나요?",
    a: "200P 이상 Premium Edition에는 본교재와 해설자료 외에도 Quick Review, Bonus Practice, Final Review, Study Plan, Weakness Check, Error Log 등 학습을 보조하는 Premium Bonus Materials가 함께 제공됩니다.",
  },
  {
    q: "모든 교재에 Premium Bonus가 제공되나요?",
    a: "Premium Bonus Package는 200페이지 이상으로 구성된 대상 교재에 제공됩니다. 각 상품 페이지에서 Premium 표시 여부를 확인하실 수 있습니다.",
  },
  {
    q: "Bonus 자료는 어떻게 받을 수 있나요?",
    a: "구매가 확인된 후 본교재와 함께 디지털 자료 형태로 안내 및 제공됩니다.",
  },
];
