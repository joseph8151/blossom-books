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
  {
    area: "Math", type: "Data & Graphs", skill: "Read a bar graph", difficulty: "Foundation",
    question: "The bar graph shows how many books a student read each day. How many more books were read on the busiest day than on the slowest day?",
    figure: "bar-graph",
    choices: ["3", "4", "5", "6"],
    answer: "5",
    why: "The tallest bar is Thursday (8) and the shortest is Monday (3): 8 − 3 = 5.",
    whyKo: "가장 높은 막대는 목요일(8권), 가장 낮은 막대는 월요일(3권)입니다. 8 − 3 = 5권 차이입니다.",
  },
  {
    area: "Math", type: "Number & Operations", skill: "Read a number line", difficulty: "Foundation",
    question: "What number does point A show on the number line?",
    figure: "number-line",
    choices: ["5", "6", "7", "8"],
    answer: "7",
    why: "Point A sits on the seventh tick mark to the right of 0.",
    whyKo: "점 A는 0에서 오른쪽으로 일곱 번째 눈금 위에 있으므로 7을 나타냅니다.",
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
  {
    area: "Algebra", type: "Linear Functions", skill: "Find slope from a graph", difficulty: "Standard",
    question: "The line on the graph passes through (1, 1) and (3, 5). What is the slope of the line?",
    figure: "coord-line",
    choices: ["1", "2", "3", "1/2"],
    answer: "2",
    why: "Slope = (5 − 1) / (3 − 1) = 4 / 2 = 2.",
    whyKo: "기울기 = (y의 변화)/(x의 변화) = (5−1)/(3−1) = 4/2 = 2 입니다.",
    steps: ["Δy = 5 − 1 = 4", "Δx = 3 − 1 = 2", "slope = 4 ÷ 2 = 2"],
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

// ── SCAT (Verbal Analogy · Quantitative Comparison) ─────
export const scatBank: SampleItem[] = [
  {
    area: "Verbal", type: "Analogy", skill: "Verbal analogy (word relationship)", difficulty: "Standard",
    question: "Kitten is to cat as puppy is to ___.",
    choices: ["dog", "bark", "tail", "bone"],
    answer: "dog",
    why: "A kitten is a young cat, so a puppy is a young dog (young-to-adult relationship).",
    whyKo: "새끼 고양이(kitten)와 고양이(cat)의 관계처럼, 새끼 개(puppy)에 대응하는 것은 개(dog)입니다. (새끼–성체 관계)",
  },
  {
    area: "Verbal", type: "Analogy", skill: "Verbal analogy (creator–work)", difficulty: "Advanced",
    question: "Author is to book as composer is to ___.",
    choices: ["song", "orchestra", "stage", "audience"],
    answer: "song",
    why: "An author creates a book; a composer creates a song/piece of music (creator-to-work).",
    whyKo: "작가가 책을 쓰듯, 작곡가는 곡(song·음악)을 만듭니다. (창작자–창작물 관계) 나머지 보기는 관계가 맞지 않습니다.",
  },
  {
    area: "Quantitative", type: "Quantitative Comparison", skill: "Compare two quantities", difficulty: "Standard",
    question: "Column A: 3 × 4    Column B: 5 + 6.  Which statement is true?",
    choices: ["A is greater", "B is greater", "The two are equal", "Cannot be determined"],
    answer: "A is greater",
    why: "A = 12 and B = 11, so A is greater.",
    whyKo: "A = 3 × 4 = 12, B = 5 + 6 = 11. 따라서 A가 더 큽니다.",
    steps: ["A = 3 × 4 = 12", "B = 5 + 6 = 11", "12 > 11 → A is greater"],
  },
  {
    area: "Quantitative", type: "Quantitative Comparison", skill: "Compare two quantities", difficulty: "Standard",
    question: "Column A: 1/2 of 20    Column B: 25% of 40.  Which statement is true?",
    choices: ["A is greater", "B is greater", "The two are equal", "Cannot be determined"],
    answer: "The two are equal",
    why: "A = 10 and B = 10, so the two are equal.",
    whyKo: "A = 20의 1/2 = 10, B = 40의 25% = 10. 두 값이 같습니다.",
    steps: ["A = 20 × 1/2 = 10", "B = 40 × 0.25 = 10", "10 = 10 → equal"],
  },
  {
    area: "Quantitative", type: "Quantitative Comparison", skill: "Reason about variables", difficulty: "Challenge",
    question: "n is a positive integer greater than 1. Column A: n²    Column B: 2n.  Which statement is true?",
    choices: ["A is greater", "B is greater", "The two are equal", "Cannot be determined"],
    answer: "Cannot be determined",
    why: "If n = 2, n² = 4 = 2n (equal); if n = 3, n² = 9 > 6 = 2n. The relationship changes with n.",
    whyKo: "n = 2이면 n² = 4, 2n = 4로 같고, n = 3이면 9 > 6으로 A가 큽니다. n값에 따라 달라지므로 하나로 결정할 수 없습니다. (변수 비교 함정 유형)",
    steps: ["n = 2 → A = 4, B = 4 (equal)", "n = 3 → A = 9, B = 6 (A greater)", "값에 따라 달라짐 → Cannot be determined"],
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

// ── 영어 레벨테스트 학년별 리딩 지문 (긴 지문 + 다문항) ──────────────
// 문제집 본문은 영어, 해설은 한글. 각 학년대의 목표 Reading Level에 맞춰 길이·어휘·문장 구조를 조정합니다.

// G1–2 · 약 300 단어 · SR 3.0 수준
const passageG1_2 = `Penguins: Birds That Cannot Fly

Penguins are birds, but they cannot fly. Instead, they are great swimmers. Their wings are shaped like flippers. The flippers help them push through the cold water very fast. In the water, penguins almost look like they are flying.

Most penguins live where it is cold and snowy. They have thick feathers that keep their bodies warm and dry. Under their feathers is a layer of fat. The fat works like a warm coat. It helps the penguins stay warm even in icy wind.

Penguins eat fish, squid, and tiny sea animals. They dive deep into the ocean to catch their food. A penguin can hold its breath for a long time while it hunts. When it is full, it swims back to land to rest.

Penguins live together in big groups. A large group of penguins is called a colony. Living in a colony helps keep the penguins safe. When the weather is very cold, the penguins stand close together. They take turns standing in the middle, where it is warmest. This way, every penguin gets a chance to stay warm.

Mother and father penguins work as a team. One parent keeps the egg warm while the other goes to find food. When the chick hatches, it is small and gray. The parents feed the chick until it is big enough to swim and hunt on its own.

Penguins are special birds. They cannot fly in the sky, but they can swim, dive, and live in some of the coldest places on Earth.`;

// G3–4 · 약 350 단어 · SR 5.0 수준
const passageG3_4 = `The Octopus: A Master of Disguise

The octopus is one of the most remarkable creatures in the ocean. It has a soft, boneless body, eight flexible arms, and a surprising set of survival skills. Because it has no bones, an octopus can squeeze its entire body through openings no wider than a coin. This ability alone helps it escape predators that could never follow.

Perhaps the octopus's most astonishing talent is its power to change color. In less than a second, it can shift the shade and even the texture of its skin. Resting against a rock, an octopus may turn gray and bumpy; gliding over sand, it becomes a pale, speckled brown. Scientists call this trick camouflage. By blending into its surroundings, the octopus hides from hungry enemies and sneaks up on the crabs and fish it hunts.

Each of the octopus's arms is lined with rows of round suckers. These suckers grip rocks, hold prey, and, remarkably, allow the octopus to taste whatever it touches. If an arm brushes against a crab buried in the sand, the octopus instantly knows a meal is within reach.

Octopuses are also considered among the most intelligent animals without a backbone. In laboratory tests, they have learned to unscrew jars to reach the food inside. In the wild, some gather shells and stones to build small shelters that protect them while they rest.

When danger is unavoidable, the octopus has a final defense. It releases a thick cloud of dark ink that clouds the water and confuses its attacker. In the seconds the enemy spends blinded, the octopus jets away to safety.

Every feature of the octopus serves a clear purpose. Its shapeless body, color-changing skin, sensitive arms, and inky escape all work together, allowing this strange and clever animal to survive in a vast and dangerous sea.`;

// G5–6 · 약 450 단어 · SR 6.0–6.5 수준
const passageG5_6 = `The Secret Language of Honeybees

When a honeybee discovers a patch of flowers rich with nectar, it faces an unusual problem: how can it tell the thousands of bees back in the hive exactly where to find the food? Bees cannot speak, draw maps, or point the way. Yet somehow, within minutes, dozens of workers fly straight to a blossoming field that may be more than a kilometer away. For many years this mystery puzzled scientists, until researchers discovered that honeybees communicate through an elaborate series of movements known as the "waggle dance."

The waggle dance takes place in the darkness of the hive, on the vertical surface of the honeycomb. A returning bee runs forward in a straight line while rapidly shaking, or "waggling," its body. Then it circles back to the starting point and repeats the pattern, tracing a shape similar to a figure eight. Although the dance may look random, every detail carries meaning. The direction of the straight run tells the other bees which way to fly in relation to the sun. The length of the run reveals how far away the flowers are: a longer waggle signals a greater distance.

Remarkably, the dancing bee adjusts its message as conditions change. Because the sun moves across the sky throughout the day, the angle of the dance shifts to match it. Bees that watch the performance crowd close and touch the dancer with their antennae to sense the vibrations, since they cannot see in the pitch-black hive. In this way information passes from one insect to many, and the colony can direct its energy toward the richest sources of food.

The discovery of the waggle dance changed the way scientists think about animals. It showed that creatures with tiny brains are capable of sharing precise, detailed information—a skill once believed to belong only to humans. Researchers now understand that communication in the animal world can be far more complex than it appears.

Understanding the language of bees is more than a fascinating puzzle. Honeybees pollinate a large share of the crops that people depend on, from apples to almonds. When bees guide one another efficiently to flowers, they pollinate more plants and strengthen the food supply for humans and wildlife alike. By studying a dance performed in complete darkness, scientists have uncovered lessons about cooperation, survival, and the surprising intelligence hidden within the natural world.`;

export const placementReadingByProduct: Record<string, SampleItem[]> = {
  "english-level-test-g1-2": [
    {
      area: "Reading", type: "Main Idea", skill: "Identify the central idea", difficulty: "Foundation",
      passage: passageG1_2,
      question: "What is the passage MAINLY about?",
      choices: ["How penguins build their nests", "How penguins live and stay alive", "Why the ocean is cold", "How birds learn to fly"],
      answer: "How penguins live and stay alive",
      why: "The passage describes how penguins swim, stay warm, find food, and care for their chicks.",
      whyKo: "지문은 펭귄이 헤엄치고, 몸을 따뜻하게 유지하고, 먹이를 찾고, 새끼를 돌보는 방법을 설명합니다. 즉 ‘펭귄이 어떻게 살아가는가’가 글 전체의 중심 내용입니다.",
      wrong: "The other choices are small details or ideas the passage never states.",
      wrongKo: "나머지 보기는 지문에 나오지 않거나 아주 작은 세부일 뿐, 글 전체의 주제가 아닙니다.",
    },
    {
      area: "Reading", type: "Supporting Details", skill: "Locate key details", difficulty: "Foundation",
      passage: passageG1_2,
      question: "How do penguins stay warm in icy wind?",
      choices: ["They fly to a warm place", "They have thick feathers and a layer of fat", "They stop eating fish", "They sleep all winter"],
      answer: "They have thick feathers and a layer of fat",
      why: "The second paragraph states penguins have thick feathers and a layer of fat that works like a warm coat.",
      whyKo: "두 번째 문단에 근거가 직접 나옵니다: 두꺼운 깃털(thick feathers)과 지방층(a layer of fat)이 따뜻한 외투처럼 몸을 데워 줍니다.",
    },
    {
      area: "Reading", type: "Vocabulary in Context", skill: "Determine word meaning in context", difficulty: "Standard",
      passage: passageG1_2,
      question: "In this passage, the word colony means —",
      choices: ["a kind of fish", "a large group of penguins living together", "a warm coat", "a place to hide food"],
      answer: "a large group of penguins living together",
      why: "The text says, 'A large group of penguins is called a colony.'",
      whyKo: "지문에 정의가 그대로 나옵니다: ‘A large group of penguins is called a colony.’ 앞뒤 문맥으로 뜻을 확인하는 어휘 유형입니다.",
    },
  ],
  "english-level-test-g3-4": [
    {
      area: "Reading", type: "Main Idea", skill: "Identify the central idea", difficulty: "Standard",
      passage: passageG3_4,
      question: "Which sentence BEST states the main idea of the passage?",
      choices: [
        "Octopuses are the largest animals in the ocean.",
        "Every part of the octopus's body helps it survive.",
        "Octopuses are difficult for scientists to study.",
        "The octopus is the only animal that can change color.",
      ],
      answer: "Every part of the octopus's body helps it survive.",
      why: "The final paragraph states that every feature serves a purpose and works together for survival.",
      whyKo: "마지막 문단이 핵심을 요약합니다: 각 특징(몸·피부·팔·먹물)이 저마다 ‘분명한 목적’을 가지고 함께 작동해 생존을 돕는다는 것이 주제입니다.",
      wrong: "The other choices are either not stated or are only one small detail.",
      wrongKo: "나머지는 지문에 없거나 하나의 작은 세부일 뿐이라 글 전체의 중심 생각이 될 수 없습니다.",
    },
    {
      area: "Reading", type: "Inference", skill: "Draw a conclusion from evidence", difficulty: "Advanced",
      passage: passageG3_4,
      question: "The passage suggests that the octopus's ink is most useful when it needs to —",
      choices: ["find food", "build a shelter", "escape from an enemy", "taste its surroundings"],
      answer: "escape from an enemy",
      why: "The ink clouds the water and confuses an attacker, giving the octopus time to jet away to safety.",
      whyKo: "먹물은 물을 흐리게 해 공격자를 혼란시키고, 그 사이 문어가 안전하게 도망치도록 돕습니다. 따라서 ‘적에게서 달아날 때’ 가장 유용하다고 추론할 수 있습니다.",
      wrong: "Finding food and tasting use the arms/suckers; shelters use shells and stones — not the ink.",
      wrongKo: "먹이 찾기·맛보기는 팔과 빨판이, 은신처는 조개·돌이 하는 일입니다. 먹물의 기능과는 다릅니다.",
    },
    {
      area: "Reading", type: "Vocabulary in Context", skill: "Determine word meaning in context", difficulty: "Standard",
      passage: passageG3_4,
      question: "In this passage, camouflage most nearly means —",
      choices: ["swimming very quickly", "blending in to hide from view", "growing a new arm", "squeezing through a small hole"],
      answer: "blending in to hide from view",
      why: "The sentences before the word describe the octopus changing color to match rocks and sand.",
      whyKo: "‘camouflage’ 앞 문장에서 문어가 바위·모래에 맞춰 색을 바꿔 ‘주변에 섞여 숨는다’고 설명합니다. 문맥으로 ‘위장(주변에 섞여 숨기)’ 뜻을 확인합니다.",
    },
  ],
  "english-level-test-g5-6": [
    {
      area: "Reading", type: "Main Idea", skill: "Identify the central idea", difficulty: "Standard",
      passage: passageG5_6,
      question: "This passage is MAINLY about —",
      choices: [
        "why honeybees cannot see in the dark",
        "how honeybees use a special dance to share the location of food",
        "how scientists raise honeybees in laboratories",
        "why apples and almonds need sunlight to grow",
      ],
      answer: "how honeybees use a special dance to share the location of food",
      why: "The whole passage explains the waggle dance and how it communicates direction and distance to food.",
      whyKo: "글 전체가 ‘와글 댄스(waggle dance)’를 통해 먹이의 방향과 거리를 알려 주는 방법을 설명합니다. 이것이 중심 내용입니다.",
      wrong: "The other choices touch on details but miss the overall topic.",
      wrongKo: "나머지 보기는 세부 정보를 건드리지만 글 전체의 주제를 담지 못합니다.",
    },
    {
      area: "Reading", type: "Inference", skill: "Draw a conclusion from evidence", difficulty: "Advanced",
      passage: passageG5_6,
      question: "Why do watching bees touch the dancer with their antennae?",
      choices: [
        "to copy the dancer's colors",
        "to sense the movements because they cannot see in the dark hive",
        "to share nectar with the dancer",
        "to warn the dancer about a predator",
      ],
      answer: "to sense the movements because they cannot see in the dark hive",
      why: "The passage says bees touch the dancer to sense the vibrations 'since they cannot see in the pitch-black hive.'",
      whyKo: "지문에 근거가 있습니다: 벌집 안은 완전히 어두워(pitch-black) 볼 수 없기 때문에, 더듬이로 진동을 느껴 정보를 받아들입니다.",
      wrong: "The other choices are not supported anywhere in the text.",
      wrongKo: "나머지 보기는 지문 어디에서도 근거를 찾을 수 없습니다.",
    },
    {
      area: "Reading", type: "Vocabulary in Context", skill: "Determine word meaning in context", difficulty: "Challenge",
      passage: passageG5_6,
      question: "In this passage, the word elaborate most nearly means —",
      choices: ["quick and simple", "detailed and complex", "loud and noisy", "old and forgotten"],
      answer: "detailed and complex",
      why: "The dance is described as a precise, multi-part series of movements that carries specific meaning, so 'elaborate' means detailed and complex.",
      whyKo: "‘elaborate series of movements’는 방향·거리 같은 구체적 정보를 담은 정교하고 복잡한 동작을 뜻합니다. 문맥상 ‘정교한/복잡한’이 알맞습니다.",
    },
  ],
};

// ── SR Reading 학년별 (긴 지문 + 유형 확장) ──────────────
// SR 제품은 Reading 전용이므로 지문 하나에 다양한 유형(주제·세부·추론·어휘·의도·구조)을 담아 풍성하게 구성합니다.
export const srReadingByProduct: Record<string, SampleItem[]> = {
  "sr-reading-prep-g2-3": [
    ...placementReadingByProduct["english-level-test-g1-2"],
    {
      area: "Reading", type: "Author's Purpose", skill: "Identify the author's purpose", difficulty: "Standard",
      passage: passageG1_2,
      question: "Why did the author most likely write this passage?",
      choices: ["To tell a make-believe story about a penguin", "To give readers facts about how penguins live", "To teach readers how to swim", "To sell penguin toys"],
      answer: "To give readers facts about how penguins live",
      why: "The passage gives true information about penguins, so its purpose is to inform.",
      whyKo: "지문은 펭귄에 대한 사실 정보를 전달합니다. 따라서 글쓴이의 목적은 ‘정보를 알려 주기(inform)’입니다. 지어낸 이야기(허구)나 설득·판매가 아닙니다.",
    },
    {
      area: "Reading", type: "Sequence", skill: "Understand order of events", difficulty: "Standard",
      passage: passageG1_2,
      question: "According to the passage, what happens right after a penguin chick hatches?",
      choices: ["It flies away", "It is small and gray, and its parents feed it", "It builds a nest by itself", "It dives into the ocean alone"],
      answer: "It is small and gray, and its parents feed it",
      why: "The last body paragraph states the chick hatches small and gray and the parents feed it until it can swim and hunt.",
      whyKo: "마지막 문단에 순서가 나옵니다: 새끼는 작고 회색으로 태어나며(small and gray), 스스로 헤엄치고 사냥할 수 있을 때까지 부모가 먹여 줍니다.",
    },
  ],
  "sr-reading-prep-g4-5": [
    ...placementReadingByProduct["english-level-test-g3-4"],
    {
      area: "Reading", type: "Author's Purpose", skill: "Identify the author's purpose", difficulty: "Advanced",
      passage: passageG3_4,
      question: "The author wrote this passage mainly to —",
      choices: ["describe how the octopus's body helps it survive", "warn people to stay away from octopuses", "compare octopuses with fish", "explain how to catch an octopus"],
      answer: "describe how the octopus's body helps it survive",
      why: "Each paragraph explains a body feature and how it aids survival, so the purpose is to describe/inform.",
      whyKo: "각 문단이 문어의 신체 특징과 생존에 어떻게 도움이 되는지를 설명합니다. 따라서 목적은 ‘문어의 몸이 생존을 어떻게 돕는지 설명하기’입니다.",
    },
    {
      area: "Reading", type: "Text Structure", skill: "Analyze how a text is organized", difficulty: "Advanced",
      passage: passageG3_4,
      question: "How is the information in this passage mostly organized?",
      choices: ["by telling events in the order they happened", "by describing different body parts and what each one does", "by comparing two different animals", "by listing steps to follow"],
      answer: "by describing different body parts and what each one does",
      why: "The passage moves feature by feature — boneless body, color-changing skin, suckers, intelligence, ink.",
      whyKo: "지문은 ‘뼈 없는 몸 → 색을 바꾸는 피부 → 빨판 → 지능 → 먹물’처럼 신체 특징을 하나씩 소개하며 그 기능을 설명하는 구조입니다.",
    },
  ],
  "sr-reading-prep-g6-8": [
    ...placementReadingByProduct["english-level-test-g5-6"],
    {
      area: "Reading", type: "Author's Purpose", skill: "Identify the author's purpose", difficulty: "Advanced",
      passage: passageG5_6,
      question: "The author most likely wrote this passage to —",
      choices: ["persuade readers to keep bees as pets", "explain how bees communicate and why it matters", "describe one day in the life of a single bee", "argue that bees are dangerous"],
      answer: "explain how bees communicate and why it matters",
      why: "The passage explains the waggle dance and ends by noting why bee communication matters for food supply.",
      whyKo: "지문은 와글 댄스로 벌이 소통하는 방법을 설명하고, 마지막에 그 소통이 작물 수분·식량 공급에 왜 중요한지까지 밝힙니다. 따라서 목적은 ‘벌의 소통 방식과 그 중요성 설명’입니다.",
    },
    {
      area: "Reading", type: "Cause & Effect", skill: "Identify cause-and-effect relationships", difficulty: "Challenge",
      passage: passageG5_6,
      question: "According to the passage, what happens when bees guide one another efficiently to flowers?",
      choices: ["They pollinate more plants and strengthen the food supply", "They stop making honey", "They leave the hive forever", "The sun changes position in the sky"],
      answer: "They pollinate more plants and strengthen the food supply",
      why: "The final paragraph states efficient guidance lets bees pollinate more plants, strengthening the food supply.",
      whyKo: "마지막 문단에 인과가 나옵니다: 벌이 서로를 효율적으로 안내하면(원인) 더 많은 식물을 수분시키고 식량 공급을 강화한다(결과)는 내용입니다.",
    },
  ],
};

// ── Geometry (그래프·도형·복합문제, SVG 포함) ──────────────
export const geometryBank: SampleItem[] = [
  {
    area: "Geometry", type: "Area of a Triangle", skill: "Compute the area of a triangle", difficulty: "Foundation",
    question: "Find the area of the triangle with base 8 and height 5.",
    figure: "triangle-bh",
    choices: ["13", "20", "24", "40"],
    answer: "20",
    why: "Area of a triangle = 1/2 × base × height = 1/2 × 8 × 5 = 20.",
    whyKo: "삼각형의 넓이 = 1/2 × 밑변 × 높이 = 1/2 × 8 × 5 = 20.",
    steps: ["Area = 1/2 × base × height", "= 1/2 × 8 × 5", "= 20"],
  },
  {
    area: "Geometry", type: "Angles on a Line", skill: "Use angle relationships", difficulty: "Foundation",
    question: "Two angles lie on a straight line. If one angle is 120°, find x.",
    figure: "angles-line",
    choices: ["50", "60", "70", "80"],
    answer: "60",
    why: "Angles on a straight line add up to 180°, so 120 + x = 180 and x = 60.",
    whyKo: "직선 위의 각의 합은 180°입니다. 120 + x = 180 → x = 60°.",
  },
  {
    area: "Geometry", type: "Pythagorean Theorem", skill: "Apply the Pythagorean theorem", difficulty: "Standard",
    question: "A right triangle has legs of length 3 and 4. Find the length of the hypotenuse.",
    figure: "right-triangle",
    choices: ["5", "6", "7", "12"],
    answer: "5",
    why: "By the Pythagorean theorem, 3² + 4² = 9 + 16 = 25, so the hypotenuse = √25 = 5.",
    whyKo: "피타고라스 정리: 3² + 4² = 9 + 16 = 25, 빗변 = √25 = 5.",
    steps: ["3² + 4² = 9 + 16 = 25", "hypotenuse = √25", "= 5"],
  },
  {
    area: "Geometry", type: "Area of a Circle", skill: "Compute the area of a circle", difficulty: "Standard",
    question: "Find the area of a circle with radius 6. (Leave your answer in terms of π.)",
    figure: "circle-r",
    choices: ["12π", "18π", "36π", "6π"],
    answer: "36π",
    why: "Area = π r² = π × 6² = 36π.",
    whyKo: "원의 넓이 = π r² = π × 6² = 36π.",
  },
  {
    area: "Geometry", type: "Slope on a Graph", skill: "Find slope from a coordinate graph", difficulty: "Standard",
    question: "The line passes through (1, 1) and (3, 5). Find its slope.",
    figure: "coord-line",
    choices: ["1", "2", "3", "1/2"],
    answer: "2",
    why: "Slope = (5 − 1) / (3 − 1) = 4 / 2 = 2.",
    whyKo: "기울기 = (y의 변화)/(x의 변화) = (5−1)/(3−1) = 4/2 = 2.",
    steps: ["Δy = 5 − 1 = 4", "Δx = 3 − 1 = 2", "slope = 4 ÷ 2 = 2"],
  },
  {
    area: "Geometry", type: "Composite Area", skill: "Find the area of a composite figure", difficulty: "Advanced",
    question: "The figure is a 6 × 5 rectangle with a 4 × 3 rectangular piece removed from the top-right corner. Find the area of the shaded shape.",
    figure: "composite-L",
    choices: ["12", "18", "24", "30"],
    answer: "18",
    why: "Whole rectangle = 6 × 5 = 30. Removed piece = 4 × 3 = 12. Shaded area = 30 − 12 = 18.",
    whyKo: "전체 직사각형 = 6 × 5 = 30. 빠진 부분 = 4 × 3 = 12. 색칠된 도형의 넓이 = 30 − 12 = 18.",
    steps: ["Whole = 6 × 5 = 30", "Removed = 4 × 3 = 12", "Area = 30 − 12 = 18"],
  },
];

// ── 수학 레벨테스트 · 사고력 (한글, SVG 포함) ──────────────
export const mathLevelBank: SampleItem[] = [
  {
    area: "사고력", type: "규칙 찾기", skill: "규칙을 찾아 다음을 예측", difficulty: "Foundation",
    question: "규칙에 따라 점을 놓았습니다. 4번째에 올 점의 개수는 몇 개인가요?",
    figure: "dots-pattern",
    choices: ["6", "7", "8", "9"],
    answer: "7",
    why: "The number of dots increases by 2 each time: 1, 3, 5, 7.",
    whyKo: "점의 개수가 1, 3, 5로 2개씩 늘어나는 규칙입니다. 따라서 4번째는 5 + 2 = 7개입니다.",
  },
  {
    area: "사고력", type: "수 규칙", skill: "수의 배열 규칙 찾기", difficulty: "Standard",
    question: "규칙을 찾아 빈칸에 알맞은 수를 구하세요.  2, 4, 8, 16, ___",
    choices: ["18", "20", "24", "32"],
    answer: "32",
    why: "Each term is doubled: 16 × 2 = 32.",
    whyKo: "앞의 수에 2를 곱하는 규칙입니다(×2). 16 × 2 = 32.",
    steps: ["2×2=4", "4×2=8", "8×2=16", "16×2=32"],
  },
  {
    area: "사고력", type: "양팔저울", skill: "무게 관계 추론", difficulty: "Standard",
    question: "양팔 저울이 균형을 이루고 있습니다. 삼각형 1개의 무게는 원 몇 개와 같은가요?",
    figure: "balance-scale",
    choices: ["2", "3", "4", "6"],
    answer: "3",
    why: "2 triangles balance 6 circles, so 1 triangle = 6 ÷ 2 = 3 circles.",
    whyKo: "삼각형 2개가 원 6개와 균형을 이루므로, 삼각형 1개 = 6 ÷ 2 = 원 3개와 같습니다.",
    steps: ["삼각형 2개 = 원 6개", "삼각형 1개 = 6 ÷ 2", "= 원 3개"],
  },
  {
    area: "사고력", type: "쌓기나무", skill: "입체 개수 세기", difficulty: "Standard",
    question: "쌓기나무를 그림과 같이 쌓았습니다. 사용한 쌓기나무는 모두 몇 개인가요?",
    figure: "cube-stack",
    choices: ["5", "6", "7", "9"],
    answer: "6",
    why: "The layers hold 3, 2, and 1 blocks: 3 + 2 + 1 = 6.",
    whyKo: "층별로 아래부터 3개, 2개, 1개입니다. 3 + 2 + 1 = 6개.",
  },
  {
    area: "사고력", type: "마방진", skill: "합이 같도록 수 배열", difficulty: "Advanced",
    question: "가로, 세로, 대각선 세 수의 합이 모두 같도록 만들려고 합니다. ?에 알맞은 수는 무엇인가요?",
    figure: "magic-square",
    choices: ["5", "7", "8", "9"],
    answer: "7",
    why: "Each line must sum to 15. Middle row: 3 + 5 + ? = 15 → ? = 7.",
    whyKo: "각 줄의 합이 15가 되어야 합니다. 가운데 가로줄 3 + 5 + ? = 15 → ? = 7.",
    steps: ["한 줄의 합 = 15", "3 + 5 + ? = 15", "? = 7"],
  },
  {
    area: "문제해결", type: "나눗셈 활용", skill: "실생활 나눗셈", difficulty: "Standard",
    question: "사탕 24개를 한 봉지에 6개씩 남김없이 나누어 담으면 모두 몇 봉지가 되나요?",
    choices: ["3", "4", "5", "6"],
    answer: "4",
    why: "24 ÷ 6 = 4 bags.",
    whyKo: "24 ÷ 6 = 4봉지입니다.",
  },
];
