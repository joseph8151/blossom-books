import { Product } from "@/lib/types";

export interface PrepTrack {
  slug: string;
  name: string; // 예: "SR Reading"
  ko: string; // 부제
  intro: string;
  forWhom: string[];
  areas: { area: string; items: string[] }[];
  howWePrepare: string;
  steps: string[]; // 준비 순서 — 단계별 학습 가이드
  faq: { q: string; a: string }[];
  match: (p: Product) => boolean;
  booksTrack?: string; // /books?track= 필터
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
    steps: [
      "현재 SR 점수와 최근 정체 구간을 확인합니다.",
      "무료 샘플로 지문 난이도와 유형이 학생 수준과 맞는지 먼저 확인합니다.",
      "Main Idea·Inference 등 자주 틀리는 유형부터 우선 연습합니다.",
      "해설로 오답 이유를 확인하며 정답 근거를 지문에서 찾는 습관을 기릅니다.",
      "일정 분량 완료 후 재진단하며 다음 분량을 조정합니다.",
    ],
    faq: [
      { q: "우리 아이 SR 수준과 난이도가 맞나요?", a: "학년과 현재 Reading Level을 알려주시면 적합한 구성을 안내해 드립니다. 구매 전 무료 샘플로 난이도를 직접 확인하실 수 있습니다." },
      { q: "SR 점수가 오르나요?", a: "점수 상승을 보장하지는 않습니다. 다만 자주 실수하는 유형을 반복 연습하며 문제에서 무엇을 묻는지 먼저 파악하는 훈련에 집중합니다." },
      { q: "몇 페이지부터 시작하면 좋을까요?", a: "처음이라면 100P로 유형에 익숙해진 뒤, 정체가 심한 경우 200P·300P로 반복량을 늘리시길 권합니다." },
    ],
    match: (p) => /SR/i.test(p.examOrCurriculum) || (p.track === "level-test" && /Reading|English/i.test(p.subject)),
    booksTrack: "level-test",
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
    steps: [
      "학년과 목표 학교의 입학 기준 점수를 확인합니다.",
      "Reading·Language·Math 중 상대적으로 약한 영역을 먼저 파악합니다.",
      "약한 영역 위주로 유형 연습을 시작하고, 균형 잡힌 학생은 전 영역을 고르게 연습합니다.",
      "오답 노트를 활용해 반복되는 실수 패턴을 점검합니다.",
      "시험일이 가까워지면 실전 시간 배분 연습으로 마무리합니다.",
    ],
    faq: [
      { q: "학년별로 다른가요?", a: "네. 학년에 맞는 영역과 난이도로 구성하며, 세부 구성은 상담으로 안내해 드립니다." },
      { q: "영어와 수학을 같이 준비해야 하나요?", a: "학교마다 반영 비중이 달라 다릅니다. 지원하려는 학교의 입학 기준을 확인하신 뒤, 필요한 과목만 선택해 준비하실 수 있습니다." },
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
    steps: [
      "네 개 추론 영역 중 학생이 낯설어하는 유형을 먼저 확인합니다.",
      "비언어·공간 추론처럼 익숙하지 않은 영역부터 유형 연습을 시작합니다.",
      "영역별로 대표 문제 스타일을 반복해 패턴을 읽는 감각을 기릅니다.",
      "네 영역을 고르게 접했는지 점검하고 부족한 영역을 보충합니다.",
    ],
    faq: [
      { q: "영어 실력만으로 준비되나요?", a: "CAT4는 영어 독해 외에도 비언어·수리·공간 추론이 포함되므로, 각 영역의 유형 연습이 필요합니다." },
      { q: "도형·패턴 문제는 어떻게 연습하나요?", a: "실제 평가 자료 수준으로 제작한 비언어·공간 추론 문제를 통해, 규칙을 찾는 접근 방식 자체를 반복 연습합니다." },
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
    steps: [
      "목표 대학의 SAT 권장·평균 점수를 확인합니다.",
      "모의 진단으로 Reading & Writing / Math 중 우선순위 영역을 정합니다.",
      "영역별 문항 유형을 반복 연습하며 시간 배분 감각을 기릅니다.",
      "오답 해설로 개념 공백을 메우고, 같은 유형에서 반복 실수하지 않는지 확인합니다.",
      "시험 4~6주 전부터는 실전과 같은 타이머 환경에서 마무리 연습합니다.",
    ],
    faq: [
      { q: "실제 기출인가요?", a: "아니요. 시험이 평가하는 Skill과 유형을 참고해 독립적으로 제작한 연습 문제입니다." },
      { q: "Math만 따로 준비할 수 있나요?", a: "네. Reading & Writing과 Math를 따로 구매하실 수 있어, 필요한 영역만 집중적으로 준비하실 수 있습니다." },
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
    steps: [
      "과목별 시험 범위와 FRQ 배점 비중을 먼저 확인합니다.",
      "개념 정리로 내용 지식의 공백을 채웁니다.",
      "객관식·자료 해석 문제로 개념 적용 연습을 반복합니다.",
      "FRQ(서술형) 문제로 채점 기준에 맞춰 답안을 구성하는 연습을 합니다.",
      "시험 전 실전 모의고사로 시간 배분과 전체 흐름을 점검합니다.",
    ],
    faq: [
      { q: "어떤 AP 과목이 있나요?", a: "Biology·Chemistry·Physics·Calculus·Statistics·US History·English Language·Economics 등이 있습니다. 교재 찾기에서 확인하세요." },
      { q: "FRQ는 어떻게 채점 기준을 맞추나요?", a: "채점 기준(Rubric)에 맞춘 모범 답안과 해설을 함께 제공해, 어떤 요소가 점수로 이어지는지 확인하며 연습할 수 있습니다." },
    ],
    match: (p) => p.track === "ap",
    booksTrack: "ap",
  },
  {
    slug: "toefl",
    name: "TOEFL iBT Prep",
    ko: "TOEFL iBT 대비",
    intro:
      "TOEFL iBT는 Reading·Listening·Speaking·Writing 네 영역에서 학술 상황의 영어 사용 능력을 평가합니다. Blossom Books는 네 영역을 고르게 연습하면서도, 특히 채점 기준이 명확한 Speaking·Writing 답안 구성 훈련에 집중합니다.",
    forWhom: [
      "유학을 목표로 TOEFL 점수가 필요한 학생·성인",
      "Reading·Listening은 안정적인데 Speaking·Writing 점수가 낮은 응시자",
      "목표 대학의 커트라인에 맞춰 단기간 점수를 끌어올리려는 응시자",
    ],
    areas: [
      { area: "Reading & Listening", items: ["Main Idea", "Detail", "Inference", "Connecting Content", "Note-Taking"] },
      { area: "Speaking & Writing", items: ["Independent Task", "Integrated Task", "Answer Structure", "Time Management"] },
    ],
    howWePrepare:
      "TOEFL iBT 출제 유형을 반영한 4개 영역 실전 문제를 제공하며, 모의고사 리스닝 음원(MP3)을 함께 제공합니다. Speaking·Writing은 채점 기준표와 모범 답안을 나란히 비교하며 답안 구조를 익히도록 구성합니다.",
    steps: [
      "목표 대학이 요구하는 영역별 최소 점수를 확인합니다.",
      "모의 진단으로 네 영역 중 가장 낮은 영역을 파악합니다.",
      "Reading·Listening은 유형 반복으로 먼저 기초 점수를 확보합니다.",
      "Speaking·Writing은 채점 기준표를 기준으로 답안 구조부터 연습합니다.",
      "시험 2~3주 전부터는 네 영역을 실전 시간에 맞춰 통합 연습합니다.",
    ],
    faq: [
      { q: "리스닝 음원은 어떻게 제공되나요?", a: "모의고사 리스닝 음원(MP3)을 함께 제공합니다. 실제 시험과 동일한 운영 시간이나 세부 규정은 ETS 공식 안내로 확인하시길 권합니다." },
      { q: "Speaking·Writing은 첨삭도 받을 수 있나요?", a: "채점 기준표와 모범 답안을 비교하며 스스로 점검하는 방식이며, 별도 첨삭이 필요하시면 상담으로 안내해 드립니다." },
    ],
    match: (p) => /TOEFL/i.test(p.examOrCurriculum),
    booksTrack: "certified-exam",
  },
  {
    slug: "ielts",
    name: "IELTS Prep",
    ko: "IELTS 대비",
    intro:
      "IELTS는 Listening·Reading·Writing·Speaking 네 영역을 통해 실생활과 학술 상황의 영어 능력을 평가합니다. Blossom Books는 아카데믹 모듈을 기준으로, 특히 밴드 점수가 정체되기 쉬운 Writing·Speaking의 답안 구조 훈련에 집중합니다.",
    forWhom: [
      "유학·이민을 목적으로 아카데믹 모듈을 준비하는 응시자",
      "밴드 6.0~6.5 구간에서 점수가 정체된 응시자",
      "Speaking에서 암기 티가 나서 감점되는 응시자",
    ],
    areas: [
      { area: "Listening & Reading", items: ["Main Idea", "Detail Matching", "Paraphrasing", "Map & Diagram"] },
      { area: "Writing & Speaking", items: ["Task Achievement", "Coherence & Cohesion", "Part 1–3 Structure", "Lexical Resource"] },
    ],
    howWePrepare:
      "IELTS 출제 유형을 반영한 4개 영역 실전 문제를 제공하며, 모의고사 리스닝 음원(MP3)을 함께 제공합니다. Writing은 채점 기준표를 기준으로 과제 응답의 완성도와 문단 연결을 점검하고, Speaking은 파트별 답변 구조와 표현 패턴을 연습합니다.",
    steps: [
      "목표 밴드 점수와 응시 목적(유학·이민 등)을 먼저 확인합니다.",
      "네 영역 중 밴드 점수를 가장 끌어내리는 영역을 진단합니다.",
      "Writing은 채점 기준표 기준으로 답안 구조와 문단 연결부터 훈련합니다.",
      "Speaking은 암기가 아닌 표현 패턴 응용 방식으로 연습합니다.",
      "시험 2주 전부터는 실전 시간 배분으로 전 영역을 점검합니다.",
    ],
    faq: [
      { q: "제너럴 모듈도 다루나요?", a: "현재 교재는 아카데믹 모듈을 기준으로 구성됩니다. 제너럴 모듈이 필요하시면 상담으로 별도 안내해 드립니다." },
      { q: "밴드 점수를 보장하나요?", a: "점수를 보장하지는 않습니다. 채점 기준에 맞춰 약점을 진단하고 반복 훈련하는 데 초점을 둡니다." },
    ],
    match: (p) => /IELTS/i.test(p.examOrCurriculum),
    booksTrack: "certified-exam",
  },
  {
    slug: "pte",
    name: "PTE Academic Prep",
    ko: "PTE 대비",
    intro:
      "PTE Academic은 컴퓨터로 응시하고 AI가 채점하는 시험으로, 정해진 발음·표현 패턴에 맞춰 답할수록 점수가 안정적으로 나옵니다. Blossom Books는 채점 기준에 맞춘 반복 훈련으로 감이 아닌 데이터 기반 대비를 돕습니다.",
    forWhom: [
      "해외 이주·취업을 위해 PTE 점수가 필요한 응시자",
      "학원 없이 독학으로 준비하되 채점 기준을 정확히 알고 싶은 응시자",
      "짧은 기간 안에 목표 점수를 맞춰야 하는 응시자",
    ],
    areas: [
      { area: "Speaking & Writing", items: ["Read Aloud", "Repeat Sentence", "Describe Image", "Essay"] },
      { area: "Reading & Listening", items: ["Fill in the Blanks", "Multiple Choice", "Summarize Spoken Text", "Dictation"] },
    ],
    howWePrepare:
      "AI 채점 기준을 반영해 유형별 채점 포인트를 항목별로 정리한 문제집을 제공합니다. 정답만이 아니라 감점 요인을 짚어주어, 스스로 답변을 녹음·점검하며 채점 기준에 맞춰 교정할 수 있도록 구성합니다.",
    steps: [
      "리딩·리스닝처럼 정답이 명확한 영역으로 시험 형식에 먼저 익숙해집니다.",
      "본인 답변을 녹음해 들어보며 스스로 감점 요인을 찾아봅니다.",
      "스피킹은 발음 교정보다 답변 구조와 속도 조절에 집중합니다.",
      "채점 기준표로 라이팅 에세이 구조를 점검하고 반복 훈련합니다.",
      "목표 점수까지 남은 기간에 맞춰 약점 영역 위주로 마무리 연습합니다.",
    ],
    faq: [
      { q: "AI 채점 기준을 어떻게 반영하나요?", a: "유형별로 채점 포인트를 항목화해 정리했습니다. 정확한 세부 채점 기준과 응시료는 시기에 따라 조정될 수 있어 공식 홈페이지 확인을 권합니다." },
      { q: "학원 없이 독학이 가능한가요?", a: "스스로 답변을 점검할 수 있는 학생에게는 충분히 가능합니다. 채점 기준 파악이 어려우시면 상담으로 학습 방향을 안내해 드립니다." },
    ],
    match: (p) => /PTE/i.test(p.examOrCurriculum),
    booksTrack: "certified-exam",
  },
  {
    slug: "oet",
    name: "OET Prep",
    ko: "OET 대비 (의료 영어)",
    intro:
      "OET는 간호사·의사 등 의료 전문직을 위한 영어시험으로, 임상 현장에서 쓰이는 표현과 상황 대응 능력을 평가합니다. Blossom Books는 직군별 채점 기준에 맞춰 임상 현장 표현을 반복 연습하도록 구성합니다.",
    forWhom: [
      "해외 간호사·의료진 취업을 준비하는 응시자",
      "일반 영어시험과 다른 의료 현장 표현에 익숙해지고 싶은 응시자",
      "Speaking·Writing 채점 기준(Rubric)에 맞춰 답안을 구성하고 싶은 응시자",
    ],
    areas: [
      { area: "Listening & Reading", items: ["Clinical Note-Taking", "Case Detail", "Text Function", "Expeditious Reading"] },
      { area: "Writing & Speaking", items: ["Referral Letter", "Clinical Role-Play", "Rubric Criteria", "Clinical Terminology"] },
    ],
    howWePrepare:
      "임상 현장에서 사용하는 표현과 시험 채점 기준을 반영해 실전 감각을 익힐 수 있도록 구성했습니다. 모의고사 리스닝 음원(MP3)과 국문 해설을 함께 제공합니다.",
    steps: [
      "지원 직군(간호·의료 등)에 맞는 채점 기준을 먼저 확인합니다.",
      "Listening·Reading으로 임상 상황의 표현과 용어에 익숙해집니다.",
      "Writing은 Referral Letter 형식과 채점 기준(Rubric)을 기준으로 연습합니다.",
      "Speaking은 실제 임상 상황을 가정한 역할극 형태로 반복 연습합니다.",
      "시험 전 전 영역을 실전 시간에 맞춰 점검합니다.",
    ],
    faq: [
      { q: "직군별로 문제가 다른가요?", a: "네. OET는 직군별 특화 문항이 포함되어, 지원 직군에 맞춘 구성으로 안내해 드립니다." },
      { q: "국문 해설이 포함되나요?", a: "네. 4개 영역 국문 해설을 함께 제공해, 의료 전문 용어와 표현을 한국어로도 확인하실 수 있습니다." },
    ],
    match: (p) => /OET/i.test(p.examOrCurriculum),
    booksTrack: "certified-exam",
  },
];
