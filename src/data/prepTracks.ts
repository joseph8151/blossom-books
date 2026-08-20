import { Product } from "@/lib/types";

export interface PrepTrack {
  slug: string;
  name: string; // 예: "SR Reading"
  ko: string; // 부제
  intro: string;
  forWhom: string[];
  areas: { area: string; items: string[] }[];
  howWePrepare: string;
  faq: { q: string; a: string }[];
  match: (p: Product) => boolean;
  booksTrack?: string; // /books?track= 필터
  srPricing?: boolean; // true면 분량/가격 섹션에 SR 전용(150/200/300P) 가격을 보여줍니다.
}

export const prepTracks: PrepTrack[] = [
  {
    slug: "sr",
    name: "SR Reading Prep",
    ko: "SR / Reading Level 대비",
    intro:
      "SR(Reading Level) 준비의 핵심은 지문을 많이 읽는 것만이 아니라, SR에서 요구되는 독해 유형에 익숙해지는 것입니다. Blossom Books는 학생의 현재 읽기 수준을 기준으로 Main Idea·Inference·Vocabulary in Context 등 SR 독해 유형을 단계적으로 연습하도록 구성합니다.",
    forWhom: [
      "SR 점수가 정체되어 있는 학생",
      "책은 읽지만 SR 문제 유형에 약한 학생",
      "현재 읽기 수준에 맞는 지문으로 연습하고 싶은 학생",
    ],
    areas: [
      { area: "Reading", items: ["Main Idea", "Supporting Details", "Inference", "Vocabulary in Context", "Author's Purpose", "Cause & Effect"] },
    ],
    howWePrepare:
      "다양한 길이·난이도의 독립 제작 지문으로 유형별 연습을 제공하고, 정답 근거를 지문에서 찾는 습관을 기르도록 한글 상세해설을 함께 제공합니다.",
    faq: [
      { q: "우리 아이 SR 수준과 난이도가 맞나요?", a: "학년과 현재 Reading Level을 알려주시면 적합한 구성을 안내해 드립니다. 구매 전 무료 샘플로 난이도를 직접 확인하실 수 있습니다." },
      { q: "SR 점수가 오르나요?", a: "점수 상승을 보장하지는 않습니다. 다만 자주 실수하는 유형을 반복 연습하며 문제에서 무엇을 묻는지 먼저 파악하는 훈련에 집중합니다." },
    ],
    match: (p) => /SR/i.test(p.examOrCurriculum) || (p.track === "level-test" && /Reading|English/i.test(p.subject)),
    booksTrack: "level-test",
    srPricing: true,
  },
  {
    slug: "map",
    name: "MAP Prep",
    ko: "MAP Growth 대비",
    intro:
      "MAP은 학업 성취와 성장을 측정하는 시험으로, 영어(Reading·Language Usage)와 수학 영역을 다룹니다. Blossom Books는 학년 수준에 맞춰 영역별 문제 유형을 균형 있게 연습하도록 구성합니다.",
    forWhom: [
      "국제학교 입학·편입을 위해 MAP을 준비하는 학생",
      "MAP 유형에 익숙해지고 싶은 학생",
      "영어와 수학을 함께 점검하고 싶은 학생",
    ],
    areas: [
      { area: "Reading & Language", items: ["Reading Comprehension", "Vocabulary", "Language Usage", "Informational Text"] },
      { area: "Math", items: ["Operations", "Algebraic Thinking", "Geometry", "Measurement", "Data"] },
    ],
    howWePrepare:
      "MAP 출제 영역을 학년 수준에 맞춰 구성하고, 오답을 반복 연습하며 독해 속도와 어휘를 함께 다집니다. 공식 NWEA 문항을 복제하지 않습니다.",
    faq: [
      { q: "학년별로 다른가요?", a: "네. 학년에 맞는 영역과 난이도로 구성하며, 세부 구성은 상담으로 안내해 드립니다." },
    ],
    match: (p) => /MAP/i.test(p.examOrCurriculum),
    booksTrack: "admissions",
  },
  {
    slug: "cat4",
    name: "CAT4 Prep",
    ko: "CAT4 대비",
    intro:
      "CAT4는 언어·비언어·수리·공간 추론 능력을 평가하는 시험입니다. 단순 영어 독해가 아니라 각 추론 영역에 맞는 문제 유형을 고르게 연습해야 합니다.",
    forWhom: [
      "국제학교 입학을 위해 CAT4를 준비하는 학생",
      "추론 유형(도형·패턴·수열 등)이 낯선 학생",
    ],
    areas: [
      { area: "Reasoning", items: ["Verbal Reasoning", "Non-Verbal Reasoning", "Quantitative Reasoning", "Spatial Reasoning"] },
    ],
    howWePrepare:
      "네 개 추론 영역을 균형 있게 담아, 각 영역의 대표 문제 스타일에 익숙해지도록 구성합니다. 도형·패턴 문항은 교육 평가 자료 수준으로 정밀하게 제작합니다.",
    faq: [
      { q: "영어 실력만으로 준비되나요?", a: "CAT4는 영어 독해 외에도 비언어·수리·공간 추론이 포함되므로, 각 영역의 유형 연습이 필요합니다." },
    ],
    match: (p) => /CAT4/i.test(p.examOrCurriculum),
    booksTrack: "admissions",
  },
  {
    slug: "sat",
    name: "SAT Prep",
    ko: "SAT 대비",
    intro:
      "SAT는 Reading & Writing과 Math 영역에서 사고력과 적용력을 평가합니다. Blossom Books는 현재 시험 구조에 맞춰 필요한 Skill과 문항 스타일을 독립 제작한 문제로 연습하도록 구성합니다.",
    forWhom: [
      "SAT를 준비하는 고등학생",
      "특정 영역(Reading & Writing 또는 Math)을 집중 보완하려는 학생",
    ],
    areas: [
      { area: "Reading & Writing", items: ["Information & Ideas", "Craft & Structure", "Expression of Ideas", "Standard English Conventions"] },
      { area: "Math", items: ["Algebra", "Advanced Math", "Problem-Solving & Data", "Geometry & Trigonometry"] },
    ],
    howWePrepare:
      "현재 시험의 출제 범위와 문항 스타일을 참고해 독립 제작한 실전 문제로 연습합니다. 공식 SAT 문제를 복제하지 않습니다. (SAT 상품의 해설은 영어 중심 + 한글 핵심 설명)",
    faq: [
      { q: "실제 기출인가요?", a: "아니요. 시험이 평가하는 Skill과 유형을 참고해 독립적으로 제작한 연습 문제입니다." },
    ],
    match: (p) => /SAT/i.test(p.examOrCurriculum),
    booksTrack: "certified-exam",
  },
  {
    slug: "ap",
    name: "AP Prep",
    ko: "AP 대비",
    intro:
      "AP는 대학 수준의 과목별 내용 지식과 자유응답형(FRQ) 사고력을 평가합니다. Blossom Books는 과목별 출제 범위와 유형을 반영한 심화 문제와 상세 해설을 제공합니다.",
    forWhom: [
      "AP 과목 시험을 준비하는 학생",
      "내용 지식과 함께 FRQ·자료 해석 유형을 연습하려는 학생",
    ],
    areas: [
      { area: "Content & Skills", items: ["Content Knowledge", "Data / Graph Analysis", "Free-Response Style", "Evidence-Based Reasoning"] },
    ],
    howWePrepare:
      "과목별 핵심 개념과 자료 해석·서술형(FRQ) 유형을 반영해 구성하며, 공식 AP 문항을 복제하지 않습니다. (AP 상품의 해설은 영어 중심 + 한글 핵심 설명)",
    faq: [
      { q: "어떤 AP 과목이 있나요?", a: "Biology·Chemistry·Physics·Calculus·Statistics·US History·English Language·Economics 등이 있습니다. 교재 찾기에서 확인하세요." },
    ],
    match: (p) => p.track === "ap",
    booksTrack: "ap",
  },
];
