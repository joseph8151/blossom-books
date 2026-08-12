// ────────────────────────────────────────────────────────────
// 샘플 문제 은행 — 문제집 본문은 영어, 해설은 한글 중심(+영어 병기).
// 실제 공식 시험 문제를 복제하지 않으며, 시험이 평가하는 Skill과 일반적인
// 유형을 참고해 독립 제작한 예시입니다.
// ────────────────────────────────────────────────────────────

export type Difficulty = "Foundation" | "Standard" | "Advanced" | "Challenge";

export interface SampleItem {
  area: string;
  type: string;
  skill: string; // English skill label
  difficulty: Difficulty;
  passage?: string;
  question: string;
  choices?: string[];
  answer: string;
  why: string; // English explanation (SAT/AP/성인 시험용)
  whyKo: string; // 한글 상세 해설 (유아~초등/SR/MAP/레벨테스트 등)
  wrong?: string;
  wrongKo?: string;
  steps?: string[];
  figure?: string; // SVG 도형 키 (CAT4 등 시각 문항)
}

// ── Reading ─────────────────────────────────────────────
export const readingBank: SampleItem[] = [
  {
    area: "Reading", type: "Main Idea", skill: "Identify the central idea", difficulty: "Foundation",
    passage: "A honeybee visits hundreds of flowers each day. As it drinks nectar, pollen sticks to its body and travels to the next flower. In this way, bees help plants make seeds.",
    question: "What is the passage mainly about?",
    choices: ["How bees build their hives", "How bees help plants make seeds", "Why flowers change color", "Where bees sleep at night"],
    answer: "How bees help plants make seeds",
    why: "The last sentence sums up the main point of the whole passage.",
    whyKo: "마지막 문장이 글 전체의 중심 내용을 요약합니다. 벌이 꿀을 모으는 과정에서 꽃가루를 옮겨 씨앗이 만들어지도록 돕는다는 것이 핵심입니다.",
    wrong: "The other choices are minor details or ideas the passage never mentions.",
    wrongKo: "다른 보기는 지문에서 다루지 않은 세부 소재이거나 언급되지 않은 내용입니다.",
  },
  {
    area: "Reading", type: "Supporting Details", skill: "Locate specific details", difficulty: "Foundation",
    passage: "Sea otters float on their backs while they eat. They often wrap themselves in seaweed so they do not drift away while sleeping.",
    question: "Why do sea otters wrap themselves in seaweed?",
    choices: ["To stay warm", "To catch fish", "To keep from drifting away", "To hide their food"],
    answer: "To keep from drifting away",
    why: "The passage directly states this reason: 'so they do not drift away.'",
    whyKo: "지문에 근거가 직접 나옵니다: ‘so they do not drift away’(떠내려가지 않도록). 세부 정보 유형은 지문에서 답의 근거 문장을 찾는 연습입니다.",
  },
  {
    area: "Reading", type: "Inference", skill: "Infer from context", difficulty: "Standard",
    passage: "By the time Maya reached the bus stop, the taillights were already disappearing around the corner. She sighed and pulled out her phone to check when the next one would come.",
    question: "What can be inferred from the passage?",
    choices: ["Maya missed the bus", "Maya was early", "The bus was broken", "Maya took a taxi"],
    answer: "Maya missed the bus",
    why: "The disappearing taillights and her checking for the next bus imply she just missed it.",
    whyKo: "버스의 뒷불빛(taillights)이 사라지고, 다음 버스 시간을 확인하는 행동에서 ‘버스를 놓쳤다’를 추론할 수 있습니다.",
    wrong: "The word 'missed' never appears, but the situational clues support this inference.",
    wrongKo: "지문에 ‘missed’라는 단어는 없지만 상황 단서로 추론합니다. 나머지 보기는 근거가 없습니다.",
  },
  {
    area: "Reading", type: "Vocabulary in Context", skill: "Determine word meaning in context", difficulty: "Standard",
    passage: "The scientist's theory was novel; no one had proposed such an idea before.",
    question: "In this passage, the word “novel” most nearly means ___.",
    choices: ["boring", "new", "difficult", "long"],
    answer: "new",
    why: "'no one had proposed such an idea before' signals that 'novel' means new.",
    whyKo: "‘no one had proposed such an idea before(전에 아무도 제안한 적 없다)’가 단서가 되어 novel = ‘새로운(new)’임을 알 수 있습니다. novel은 ‘소설’ 외에 ‘새로운’이라는 뜻이 있습니다.",
  },
  {
    area: "Reading", type: "Author's Purpose", skill: "Identify the author's purpose", difficulty: "Advanced",
    passage: "Turning off lights you are not using is a small habit, but across a whole city these small choices add up to real savings of energy.",
    question: "Why did the author most likely write this passage?",
    choices: ["To tell a story", "To persuade readers to save energy", "To describe a city", "To explain how bulbs work"],
    answer: "To persuade readers to save energy",
    why: "The persuasive tone, recommending a habit and stressing its effect, reveals the purpose.",
    whyKo: "습관을 권하고 그 효과를 강조하는 설득적 어조에서 글의 목적을 파악합니다. 목적 유형은 ‘정보 전달 / 설득 / 묘사 / 서사’ 중 무엇인지 구분하는 연습입니다.",
  },
  {
    area: "Reading", type: "Cause & Effect", skill: "Analyze cause and effect", difficulty: "Advanced",
    passage: "Because the river flooded after weeks of heavy rain, the town cancelled its outdoor festival and moved the market indoors.",
    question: "What caused the town to move the market indoors?",
    choices: ["A cold winter", "The river flooding", "A lack of visitors", "A new law"],
    answer: "The river flooding",
    why: "'Because the river flooded' is stated as the direct cause of moving the market.",
    whyKo: "‘Because the river flooded(강이 범람했기 때문에)’가 시장을 실내로 옮긴 직접적인 원인입니다. because, so, as a result 같은 표현이 인과 단서입니다.",
  },
];

// ── Vocabulary ───────────────────────────────────────────
export const vocabularyBank: SampleItem[] = [
  {
    area: "Vocabulary", type: "Context Clues", skill: "Use context clues", difficulty: "Foundation",
    question: "The room was so cluttered that we could barely walk. “Cluttered” means ___.",
    choices: ["empty", "messy", "bright", "quiet"],
    answer: "messy",
    why: "'could barely walk' is a clue that 'cluttered' means messy.",
    whyKo: "‘could barely walk(거의 걸을 수 없었다)’가 단서가 되어 cluttered = ‘어질러진(messy)’임을 알 수 있습니다.",
  },
  {
    area: "Vocabulary", type: "Synonyms", skill: "Recognize synonyms", difficulty: "Standard",
    question: "Choose the word closest in meaning to “rapid.”",
    choices: ["slow", "fast", "loud", "heavy"],
    answer: "fast",
    why: "'rapid' is closest in meaning to 'fast.'",
    whyKo: "rapid은 ‘빠른(fast)’과 가장 가까운 유의어입니다. 반의어는 slow입니다.",
  },
  {
    area: "Vocabulary", type: "Prefixes & Roots", skill: "Analyze prefixes and roots", difficulty: "Advanced",
    question: "The prefix “re-” in “rewrite” means ___.",
    choices: ["not", "again", "before", "against"],
    answer: "again",
    why: "'re-' means 'again,' so rewrite means to write again.",
    whyKo: "접두사 re-는 ‘다시’를 뜻하므로 rewrite는 ‘다시 쓰다’입니다. (예: redo 다시 하다, replay 다시 재생하다)",
  },
  {
    area: "Vocabulary", type: "Academic Vocabulary", skill: "Apply academic vocabulary", difficulty: "Advanced",
    question: "Which sentence uses “analyze” correctly?",
    choices: ["We analyze the data to find patterns.", "We analyze to the store yesterday.", "The cake was very analyze.", "She analyze happy today."],
    answer: "We analyze the data to find patterns.",
    why: "'analyze' is a verb meaning to examine closely; it takes an object such as 'data.'",
    whyKo: "analyze는 ‘분석하다’라는 동사로 목적어(data)와 함께 씁니다. 나머지 문장은 동사 자리가 아니거나 문법적으로 맞지 않습니다.",
  },
];

// ── Grammar ──────────────────────────────────────────────
export const grammarBank: SampleItem[] = [
  {
    area: "Grammar", type: "Subject–Verb Agreement", skill: "Match subject and verb", difficulty: "Foundation",
    question: "Choose the correct verb: The list of items ___ on the desk.",
    choices: ["are", "is", "were", "be"],
    answer: "is",
    why: "The head of the subject is the singular 'list,' so the verb is 'is.'",
    whyKo: "주어의 핵심은 단수 명사 ‘list’이므로 단수 동사 ‘is’를 씁니다.",
    wrong: "'items' tempts you to pick 'are,' but a noun inside a prepositional phrase is not the subject.",
    wrongKo: "바로 앞의 ‘items’ 때문에 are를 고르기 쉽지만, 전치사구(of items) 안의 명사는 주어가 아닙니다.",
  },
  {
    area: "Grammar", type: "Verb Tense", skill: "Choose the correct tense", difficulty: "Standard",
    question: "Choose the correct form: By next year, she ___ here for a decade.",
    choices: ["works", "worked", "will have worked", "is working"],
    answer: "will have worked",
    why: "'By next year' marks a future-completed point, so the future perfect fits.",
    whyKo: "‘By next year(내년쯤이면)’는 미래의 완료 시점을 나타내므로 미래완료(will have worked)가 적절합니다.",
  },
  {
    area: "Grammar", type: "Error Identification", skill: "Find the sentence error", difficulty: "Standard",
    question: "Find the error: “Each of the students have their own locker.”",
    choices: ["Each", "of the students", "have", "own locker"],
    answer: "have",
    why: "'Each' is singular, so it needs 'has,' not 'have.'",
    whyKo: "‘Each’는 단수 취급하므로 have가 아니라 has가 되어야 합니다.",
  },
  {
    area: "Grammar", type: "Punctuation & Editing", skill: "Apply punctuation and editing", difficulty: "Advanced",
    question: "Which sentence is punctuated correctly?",
    choices: ["Its a long way, but were almost there.", "It's a long way, but we're almost there.", "Its' a long way but were almost there.", "It's a long way but we're almost, there."],
    answer: "It's a long way, but we're almost there.",
    why: "'It's = it is,' 'we're = we are,' and a comma precedes the conjunction 'but.'",
    whyKo: "It’s = it is, we’re = we are로 축약이 맞아야 하고, 접속사 but 앞에는 쉼표가 옵니다.",
  },
];

// ── Writing ──────────────────────────────────────────────
export const writingBank: SampleItem[] = [
  {
    area: "Writing", type: "Sentence Building", skill: "Combine and build sentences", difficulty: "Foundation",
    question: "Combine into one sentence: “The dog was tired. The dog slept.”",
    answer: "e.g., The tired dog slept.",
    why: "Combine using the adjective 'tired.' Scoring: one sentence, meaning kept.",
    whyKo: "형용사 tired로 두 문장을 한 문장으로 자연스럽게 결합합니다. 채점 기준: 한 문장으로 만들었는지, 원래 의미를 유지했는지.",
  },
  {
    area: "Writing", type: "Paragraph Organization", skill: "Organize a paragraph", difficulty: "Standard",
    question: "Write a topic sentence for a paragraph about why reading is helpful.",
    answer: "e.g., Reading every day helps students grow their vocabulary and imagination.",
    why: "A topic sentence states the main idea of the paragraph in one clear sentence.",
    whyKo: "주제문(topic sentence)은 문단의 중심 생각을 한 문장으로 제시해야 합니다. 채점 기준: 문단 전체를 아우르는 한 문장인지.",
  },
  {
    area: "Writing", type: "Reading Response", skill: "Write a text-based response", difficulty: "Advanced",
    passage: "Prompt: A character in the story shares her lunch with a new student.",
    question: "In 2–3 sentences, explain what this action shows about the character. Use evidence.",
    answer: "e.g., It shows she is kind and welcoming, because she notices the new student is alone and chooses to share.",
    why: "Scoring: a claim + textual evidence + a clear explanation.",
    whyKo: "채점 기준: 주장(친절하다) + 지문 근거(혼자인 학생을 알아채고 나눔) + 명확한 설명을 모두 포함했는지.",
  },
];

// ── Math (general) ───────────────────────────────────────
export const mathBank: SampleItem[] = [
  {
    area: "Math", type: "Computation", skill: "Basic computation", difficulty: "Foundation",
    question: "3/4 + 1/8 = ?",
    answer: "7/8",
    why: "Use a common denominator: 6/8 + 1/8 = 7/8.",
    whyKo: "통분하면 3/4 = 6/8, 따라서 6/8 + 1/8 = 7/8.",
    steps: ["Convert 3/4 to eighths: 6/8", "6/8 + 1/8 = 7/8"],
  },
  {
    area: "Math", type: "Word Problem", skill: "Interpret word problems", difficulty: "Standard",
    question: "A book costs $12. It is on sale for 25% off. What is the sale price?",
    answer: "$9",
    why: "Discount = 12 × 0.25 = 3, so sale price = 12 − 3 = 9.",
    whyKo: "할인액 = 12 × 0.25 = 3달러, 판매가 = 12 − 3 = 9달러.",
    steps: ["25% → 0.25", "Discount = 12 × 0.25 = 3", "Sale price = 12 − 3 = 9"],
  },
  {
    area: "Math", type: "Data Interpretation", skill: "Read tables and graphs", difficulty: "Standard",
    question: "A table shows sales: Mon 4, Tue 6, Wed 5, Thu 9. What is the mean?",
    answer: "6",
    why: "(4 + 6 + 5 + 9) / 4 = 24 / 4 = 6.",
    whyKo: "평균 = (4 + 6 + 5 + 9) ÷ 4 = 24 ÷ 4 = 6.",
    steps: ["Sum = 4 + 6 + 5 + 9 = 24", "Mean = 24 ÷ 4 = 6"],
  },
  {
    area: "Math", type: "Multi-Step Problem", skill: "Multi-step reasoning", difficulty: "Advanced",
    question: "A rectangle is 3 cm longer than it is wide. Its perimeter is 26 cm. Find its width.",
    answer: "5 cm",
    why: "Let width = w. Then 2(w + w + 3) = 26, so 4w + 6 = 26 and w = 5.",
    whyKo: "폭을 w라 하면 길이는 w+3. 둘레 2(w + w+3) = 26 → 4w+6=26 → 4w=20 → w=5cm.",
    steps: ["Length = w + 3", "Perimeter: 2(w + w + 3) = 26", "4w + 6 = 26 → 4w = 20 → w = 5"],
  },
];

// ── Algebra ──────────────────────────────────────────────
export const algebraBank: SampleItem[] = [
  {
    area: "Algebra", type: "Simplifying Expressions", skill: "Simplify expressions", difficulty: "Foundation",
    question: "Simplify: 3x + 2x − 4 + 7",
    answer: "5x + 3",
    why: "Combine like terms: 3x + 2x = 5x and −4 + 7 = 3.",
    whyKo: "동류항끼리 정리합니다. 3x + 2x = 5x, −4 + 7 = 3.",
    steps: ["3x + 2x = 5x", "−4 + 7 = 3", "→ 5x + 3"],
  },
  {
    area: "Algebra", type: "Solving Equations", skill: "Solve equations", difficulty: "Standard",
    question: "Solve for x: 3x − 7 = 2x + 5",
    answer: "x = 12",
    why: "Subtract 2x from both sides: x − 7 = 5, so x = 12.",
    whyKo: "양변에서 2x를 빼면 x − 7 = 5, 따라서 x = 12.",
    steps: ["3x − 2x − 7 = 5", "x − 7 = 5", "x = 12"],
  },
  {
    area: "Algebra", type: "Factoring", skill: "Factor expressions", difficulty: "Advanced",
    question: "Factor: x² − 5x + 6",
    answer: "(x − 2)(x − 3)",
    why: "Two numbers with product 6 and sum −5 are −2 and −3.",
    whyKo: "곱해서 6, 더해서 −5가 되는 두 수는 −2와 −3입니다. 따라서 (x−2)(x−3).",
    steps: ["Find two numbers: product 6, sum −5 → −2, −3", "→ (x − 2)(x − 3)"],
  },
  {
    area: "Algebra", type: "Quadratic Application", skill: "Apply quadratic functions", difficulty: "Challenge",
    question: "The minimum value of f(x) = x² − 4x + 1 is ___, at x = ___.",
    answer: "min = −3 at x = 2",
    why: "Complete the square: f(x) = (x − 2)² − 3, so the minimum is −3 at x = 2.",
    whyKo: "완전제곱하면 f(x) = (x−2)² − 3이므로, x=2에서 최솟값 −3을 가집니다.",
    steps: ["x² − 4x + 1 = (x − 2)² − 4 + 1", "= (x − 2)² − 3", "Minimum −3 at x = 2"],
  },
];

// ── Science ──────────────────────────────────────────────
export const scienceBank: SampleItem[] = [
  {
    area: "Science", type: "Concept Knowledge", skill: "Understand core concepts", difficulty: "Foundation",
    question: "Which two things does a plant need for photosynthesis, along with water?",
    choices: ["Sound and soil", "Light and carbon dioxide", "Oxygen and salt", "Heat and sugar"],
    answer: "Light and carbon dioxide",
    why: "Photosynthesis uses light (energy), carbon dioxide, and water.",
    whyKo: "광합성의 핵심 반응물은 빛(에너지), 이산화탄소, 물입니다. 산소와 포도당은 생성물입니다.",
  },
  {
    area: "Science", type: "Graph Analysis", skill: "Interpret graphs", difficulty: "Standard",
    question: "On a temperature-vs-time graph, the steepest upward section shows ___.",
    choices: ["no change", "the fastest temperature increase", "cooling", "a constant temperature"],
    answer: "the fastest temperature increase",
    why: "A steeper slope (change per unit time) means a faster temperature rise.",
    whyKo: "기울기(단위 시간당 변화량)가 가장 큰 구간이 온도가 가장 빠르게 상승하는 구간입니다.",
  },
  {
    area: "Science", type: "Experiment / Variables", skill: "Design and control variables", difficulty: "Advanced",
    question: "Why does an experiment include a control group?",
    answer: "To control variables — a comparison baseline isolates the effect of the tested condition.",
    why: "A control group lets you attribute results to the experimental condition alone.",
    whyKo: "대조군(control group)을 두면 비교 기준이 생겨 특정 조건의 효과만 분리해 판단할 수 있습니다. (변인 통제)",
  },
  {
    area: "Science", type: "Claim–Evidence–Reasoning", skill: "Support a claim with evidence", difficulty: "Challenge",
    question: "How are photosynthesis and cellular respiration related? Explain with evidence.",
    answer: "They are opposite, cycling reactions — the products of photosynthesis (glucose, oxygen) are the reactants of respiration.",
    why: "Scoring: a claim (opposite/cycle) plus evidence (products ↔ reactants).",
    whyKo: "채점 기준: 주장(서로 반대·순환하는 반응) + 근거(광합성의 생성물인 포도당·산소가 세포호흡의 반응물이 됨)를 함께 서술했는지.",
  },
];

// ── Reasoning (CAT4 등) ─────────────────────────────────
export const reasoningBank: SampleItem[] = [
  {
    area: "Verbal Reasoning", type: "Analogy", skill: "Verbal analogy", difficulty: "Standard",
    question: "Bird is to sky as fish is to ___.",
    choices: ["nest", "water", "wing", "tree"],
    answer: "water",
    why: "A bird lives in the sky; a fish lives in water.",
    whyKo: "새의 서식 공간이 하늘이듯, 물고기의 서식 공간은 물입니다. (서식지 관계)",
  },
  {
    area: "Quantitative Reasoning", type: "Number Pattern", skill: "Find quantitative patterns", difficulty: "Standard",
    figure: "square-seq",
    question: "The figures below are made of small squares (1, 4, 9, 16, …). How many small squares are in Figure 5?",
    choices: ["20", "24", "25", "30"],
    answer: "25",
    why: "1, 4, 9, 16 are 1², 2², 3², 4². The next is 5² = 25.",
    whyKo: "1, 4, 9, 16 은 각각 1², 2², 3², 4² 입니다. 따라서 다음 도형은 5² = 25개.",
  },
  {
    area: "Non-Verbal Reasoning", type: "Figure Pattern", skill: "Recognize figure patterns", difficulty: "Advanced",
    figure: "rotate-seq",
    question: "The shaded corner rotates 90° clockwise each step. Which position comes next (the “?” box)?",
    choices: ["Top-left", "Bottom-left", "Top-right", "Bottom-right"],
    answer: "Bottom-left",
    why: "Continuing the 90° clockwise rotation (TL → TR → BR → …), the next position is bottom-left.",
    whyKo: "시계 방향으로 90°씩 회전하면 좌상 → 우상 → 우하 → 좌하 순서이므로, 다음은 좌하단(bottom-left)입니다.",
  },
  {
    area: "Non-Verbal Reasoning", type: "Matrix", skill: "Complete the matrix", difficulty: "Advanced",
    figure: "matrix",
    question: "In each row the number of dots increases by one. How many dots complete the bottom-right cell (“?”)?",
    choices: ["3", "4", "5", "6"],
    answer: "5",
    why: "Each row increases by one dot, so the bottom row is 3, 4, 5.",
    whyKo: "각 행에서 점이 1개씩 늘어납니다. 마지막 행이 3, 4, 5 이므로 빈 칸은 5개입니다.",
  },
  {
    area: "Spatial Reasoning", type: "Net & Shape", skill: "Work with nets and space", difficulty: "Advanced",
    figure: "cube-net",
    question: "The net below folds into a cube. How many faces meet at each corner of the cube?",
    choices: ["2", "3", "4", "6"],
    answer: "3",
    why: "Three faces always meet at each corner of a cube.",
    whyKo: "정육면체의 한 꼭짓점에서는 항상 세 면이 만납니다.",
  },
];

// ── OET (의료 영어 · 성인 전문시험) ─────────────────────
export const oetBank: SampleItem[] = [
  {
    area: "Reading", type: "Detail (Part A)", skill: "Skim clinical texts for specific detail", difficulty: "Standard",
    passage: "Guideline: For adult patients with a fever above 38.5°C lasting more than three days, record temperature every four hours and notify the physician.",
    question: "How often should the temperature be recorded?",
    choices: ["Every hour", "Every four hours", "Once a day", "Every three days"],
    answer: "Every four hours",
    why: "The guideline states 'record temperature every four hours.'",
    whyKo: "지침에 ‘record temperature every four hours(4시간마다 기록)’이라고 명시되어 있습니다. OET Reading은 임상 자료에서 필요한 정보를 빠르게 찾는 능력을 평가합니다.",
  },
  {
    area: "Listening", type: "Consultation (Part A)", skill: "Note-taking from a consultation (audio)", difficulty: "Standard",
    passage: "[Audio transcript] Nurse: “The patient reports a sharp pain in the lower right abdomen that started last night and worsens when walking.”",
    question: "Where is the patient's pain located?",
    choices: ["Upper left abdomen", "Lower right abdomen", "Lower back", "Chest"],
    answer: "Lower right abdomen",
    why: "The speaker states 'a sharp pain in the lower right abdomen.'",
    whyKo: "화자가 ‘lower right abdomen(우하복부)’의 통증이라고 말합니다. 실제 교재는 청취용 MP3 오디오를 제공하며, 상담 내용을 메모하는 유형입니다.",
  },
  {
    area: "Writing", type: "Referral Letter", skill: "Plan a referral / discharge letter", difficulty: "Advanced",
    question: "Which sentence is the most appropriate opening for a referral letter about a patient being transferred for further care?",
    choices: [
      "Hi, please take my patient, thanks.",
      "I am writing to refer Mr. Lee, a 68-year-old patient, for further assessment and management.",
      "This guy needs help now.",
      "Refer patient. See notes.",
    ],
    answer: "I am writing to refer Mr. Lee, a 68-year-old patient, for further assessment and management.",
    why: "A referral letter opens formally, stating the purpose, the patient, and the reason for referral.",
    whyKo: "레퍼럴(의뢰) 편지는 목적·환자·의뢰 이유를 격식 있게 밝히며 시작해야 합니다. OET Writing 채점 기준(목적 명확성·전문적 어조·정보 정확성)에 부합하는 문장입니다.",
    wrong: "The other options are too casual or omit required information.",
    wrongKo: "나머지 보기는 지나치게 캐주얼하거나 필요한 정보(환자·목적)를 빠뜨려 OET Writing 기준에 맞지 않습니다.",
  },
  {
    area: "Speaking", type: "Role-play", skill: "Explain and reassure a patient", difficulty: "Advanced",
    question: "A patient is anxious about a minor procedure. Which response best shows empathy while giving clear information?",
    choices: [
      "Don't worry about it.",
      "I understand this feels stressful. The procedure is short, and I'll explain each step as we go.",
      "It's nothing. Let's start.",
      "You'll be fine, next patient please.",
    ],
    answer: "I understand this feels stressful. The procedure is short, and I'll explain each step as we go.",
    why: "It acknowledges the patient's feelings (empathy) and gives clear, reassuring information.",
    whyKo: "환자의 감정을 먼저 인정(공감)하고, 절차에 대해 명확하고 안심되는 정보를 제공합니다. OET Speaking은 공감·정보 전달·환자 중심 소통을 평가합니다.",
  },
];

// ── Certified English (TOEFL/IELTS/OET 등) ───────────────
export const certifiedEnglishBank: SampleItem[] = [
  {
    area: "Reading", type: "Detail", skill: "Locate specific details", difficulty: "Standard",
    passage: "The workshop begins at 9 a.m. and includes a one-hour break at noon. Participants should bring a laptop.",
    question: "What should participants bring?",
    choices: ["A textbook", "A laptop", "Lunch", "A printer"],
    answer: "A laptop",
    why: "The text states, 'Participants should bring a laptop.'",
    whyKo: "지문에 ‘Participants should bring a laptop(노트북을 지참)’이 직접 명시되어 있습니다.",
  },
  {
    area: "Listening", type: "Audio Comprehension", skill: "Listening comprehension (audio provided)", difficulty: "Standard",
    passage: "[Audio transcript] Speaker: “Your appointment has been moved from Tuesday to Thursday at 3 p.m.”",
    question: "When is the new appointment?",
    choices: ["Tuesday 3 p.m.", "Thursday 3 p.m.", "Thursday 2 p.m.", "Tuesday 2 p.m."],
    answer: "Thursday 3 p.m.",
    why: "The audio clearly announces the new day and time. The full workbook includes MP3 audio.",
    whyKo: "오디오에서 요일과 시간(화요일 → 목요일 오후 3시)을 명확히 변경 안내합니다. 실제 교재는 MP3 오디오를 제공합니다.",
  },
  {
    area: "Writing", type: "Task Response", skill: "Write a task response", difficulty: "Advanced",
    question: "In 2–3 sentences, describe a chart that shows sales rising from January to March.",
    answer: "e.g., Sales rose steadily from January to March, with the sharpest increase between February and March.",
    why: "Scoring: the overall trend (rising) plus a specific comparison.",
    whyKo: "채점 기준: 전체 추세(상승) + 구체적 비교(2~3월 사이 가장 큰 증가) 표현을 포함했는지.",
  },
];
