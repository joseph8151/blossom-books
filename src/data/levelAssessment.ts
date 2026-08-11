// ────────────────────────────────────────────────────────────
// Level Assessment Workbooks — 입학·레벨 진단 대비 자체 제작 학습 교재 데이터
// 특정 기관/시험 문제를 재현하지 않으며, 학년·Reading Level·학습 단계를 기준으로
// 구성된 진단·학습용 교재라는 브랜드 포지셔닝을 유지합니다.
// ────────────────────────────────────────────────────────────

export type SkillIcon = "reading" | "vocabulary" | "grammar" | "writing";

export const coreSkills: {
  key: SkillIcon;
  name: string;
  ko: string;
  body: string;
  tags: string;
}[] = [
  {
    key: "reading",
    name: "Reading",
    ko: "리딩",
    body: "다양한 길이와 난이도의 지문을 통해 독해력, 핵심 내용 파악, 세부 정보 이해, 추론 능력을 단계적으로 연습합니다.",
    tags: "Main Idea · Detail · Inference · Context",
  },
  {
    key: "vocabulary",
    name: "Vocabulary",
    ko: "보카",
    body: "학생의 학년과 Reading Level에 맞는 어휘를 중심으로 문맥 속 의미 이해와 실제 활용 능력을 연습합니다.",
    tags: "Academic Vocabulary · Context Clues · Word Meaning",
  },
  {
    key: "grammar",
    name: "Grammar",
    ko: "문법",
    body: "문장 구조와 문법 개념을 단순 암기보다 실제 문장 안에서 이해하고 적용할 수 있도록 구성합니다.",
    tags: "Sentence Structure · Usage · Editing · Grammar",
  },
  {
    key: "writing",
    name: "Writing",
    ko: "라이팅",
    body: "학생 수준에 맞는 문장 작성부터 Paragraph Writing, Reading Response까지 단계별 Writing 연습을 제공합니다.",
    tags: "Sentence · Paragraph · Response · Composition",
  },
];

export const srBands: { range: string; label: string }[] = [
  { range: "SR 2.0–2.9", label: "Foundation Reading" },
  { range: "SR 3.0–3.9", label: "Developing Reading" },
  { range: "SR 4.0–4.9", label: "Intermediate Reading" },
  { range: "SR 5.0–5.9", label: "Upper Intermediate Reading" },
  { range: "SR 6.0+", label: "Advanced Reading" },
];

export const gradeBands: string[] = [
  "Preschool / Kindergarten",
  "Grade 1–2",
  "Grade 3–4",
  "Grade 5–6",
  "Grade 7–8",
  "Grade 9–12",
];

export const recommendedStudents: string[] = [
  "새로운 학교 또는 교육기관 입학을 준비하는 학생",
  "영어 레벨 진단을 앞두고 있는 학생",
  "현재 자신의 Reading 수준에 맞는 문제를 찾는 학생",
  "Reading뿐 아니라 Vocabulary, Grammar, Writing까지 함께 준비하고 싶은 학생",
  "영어권 커리큘럼 적응을 준비하는 학생",
  "학년 대비 영어 수준을 확인하고 부족한 영역을 보완하고 싶은 학생",
];

export const differentiators: { n: string; en: string; ko: string }[] = [
  { n: "01", en: "Level-Based Content", ko: "학년과 Reading Level을 고려한 난이도 구성" },
  { n: "02", en: "Four Core Skills", ko: "Reading · Vocabulary · Grammar · Writing의 균형 있는 구성" },
  { n: "03", en: "Progressive Difficulty", ko: "기초 문제에서 응용 문제까지 단계적인 난이도" },
  { n: "04", en: "Detailed Explanations", ko: "단순 정답 제공이 아니라 문제를 이해할 수 있도록 구성한 해설" },
];
