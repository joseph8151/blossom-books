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
  {
    area: "Reading", type: "Main Idea", skill: "Identify the central idea of a longer passage", difficulty: "Standard",
    passage: `Ant Teamwork

Ants are small, but together they can do surprising things. A single ant is not very strong, yet a whole colony can build tunnels, carry food many times its own weight, and even cross water. They do this by working as a team.

When ants find food, they leave a trail of scent on the ground as they carry pieces back to the nest. Other ants follow the trail and add their own scent, making the path stronger. Soon a steady line of ants moves back and forth, sharing the work.

If the path is blocked by water, some ants link their bodies together to form a living bridge. Others walk safely across the top. No single ant is in charge, yet the whole colony solves the problem quickly.

Scientists study ants to learn how simple actions, repeated by many, can solve hard problems. The secret is not the strength of one ant, but the teamwork of the whole colony.`,
    question: "What is the passage MAINLY about?",
    choices: ["How ants build one straight tunnel", "How ants solve problems by working together", "Why ants are afraid of water", "How scientists catch ants"],
    answer: "How ants solve problems by working together",
    why: "Every paragraph gives an example of ants cooperating, and the last sentence states the main point: teamwork.",
    whyKo: "각 문단이 개미가 협력하는 예시(먹이 나르기·냄새 길·다리 만들기)를 들고, 마지막 문장이 핵심을 요약합니다: 힘이 아니라 ‘협동(teamwork)’이 비결이라는 것이 주제입니다.",
    wrong: "The other choices are small details or ideas the passage never states.",
    wrongKo: "나머지 보기는 지문에 없거나 아주 작은 세부일 뿐, 글 전체의 주제가 아닙니다.",
  },
  {
    area: "Reading", type: "Inference", skill: "Draw a conclusion from a longer passage", difficulty: "Standard",
    passage: `Ant Teamwork

Ants are small, but together they can do surprising things. A single ant is not very strong, yet a whole colony can build tunnels, carry food many times its own weight, and even cross water. They do this by working as a team.

When ants find food, they leave a trail of scent on the ground as they carry pieces back to the nest. Other ants follow the trail and add their own scent, making the path stronger. Soon a steady line of ants moves back and forth, sharing the work.

If the path is blocked by water, some ants link their bodies together to form a living bridge. Others walk safely across the top. No single ant is in charge, yet the whole colony solves the problem quickly.

Scientists study ants to learn how simple actions, repeated by many, can solve hard problems. The secret is not the strength of one ant, but the teamwork of the whole colony.`,
    question: "The passage suggests that a colony of ants is successful MAINLY because —",
    choices: ["each ant is very strong", "one ant leads all the others", "the ants cooperate and share the work", "the ants avoid difficult tasks"],
    answer: "the ants cooperate and share the work",
    why: "The passage repeatedly shows ants sharing work and states 'No single ant is in charge,' so success comes from cooperation, not individual strength.",
    whyKo: "지문은 개미들이 일을 나누어 하는 모습을 반복해서 보여 주고 ‘어느 한 마리가 지휘하지 않는다(No single ant is in charge)’고 밝힙니다. 따라서 성공의 비결은 개별 힘이 아니라 ‘협동’이라고 추론할 수 있습니다.",
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
    area: "Science", type: "Graph Analysis", skill: "Interpret a line graph", difficulty: "Standard",
    question: "The line graph shows temperature over time. Between which hours does the temperature rise the FASTEST?",
    figure: "line-graph",
    choices: ["0h–1h", "1h–2h", "2h–3h", "3h–4h"],
    answer: "3h–4h",
    why: "The steepest segment shows the fastest rise: from 3h to 4h the temperature climbs from 24° to 32° (+8), more than any other hour.",
    whyKo: "선그래프에서 기울기가 가장 가파른 구간이 온도가 가장 빠르게 오르는 구간입니다. 3h→4h에서 24°→32°로 +8°C 올라, 다른 어느 구간보다 큽니다.",
  },
  {
    area: "Science", type: "Ecosystems", skill: "Interpret a food chain", difficulty: "Foundation",
    question: "The diagram shows a food chain. What would MOST likely happen to the foxes if all the rabbits disappeared?",
    figure: "food-chain",
    choices: ["Their number would increase", "Their number would decrease", "Nothing would change", "Foxes would start eating grass"],
    answer: "Their number would decrease",
    why: "Foxes depend on rabbits for food. Removing their main food source would reduce the fox population.",
    whyKo: "먹이 사슬에서 여우는 토끼를 먹이로 삼습니다(Grass → Rabbit → Fox). 토끼가 사라지면 먹이가 줄어 여우의 수도 감소합니다.",
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
    area: "Reading", type: "Comprehension (Part B/C)", skill: "Read a longer clinical text for meaning", difficulty: "Advanced",
    passage: `Hand Hygiene in Clinical Practice

Hand hygiene remains the single most effective way to prevent the spread of infection in healthcare settings. Despite widespread awareness, studies consistently show that compliance among busy staff can fall below recommended levels, particularly during periods of high workload. Healthcare workers are therefore encouraged to follow the "Five Moments for Hand Hygiene" identified by the World Health Organization.

These five moments are: before touching a patient, before a clean or aseptic procedure, after exposure to body fluids, after touching a patient, and after contact with the patient's surroundings. Cleaning the hands at each of these points interrupts the transfer of microorganisms that can cause healthcare-associated infections.

Alcohol-based hand rub is suitable for most clinical situations because it acts quickly and is gentle on the skin when used correctly. However, when the hands are visibly soiled, or after caring for a patient with certain infections such as those causing diarrhoea, washing with soap and water is required, as alcohol rub may be less effective against some organisms.

Facilities can support good practice by placing hand-rub dispensers at the point of care, providing regular training, and displaying clear reminders. Ultimately, protecting patients depends not only on individual effort but on a workplace culture that treats hand hygiene as a shared responsibility.`,
    question: "According to the text, when is washing with soap and water required INSTEAD of alcohol-based hand rub?",
    choices: [
      "Before every patient consultation",
      "When the hands are visibly soiled or after certain infections such as diarrhoea",
      "Only at the start of a shift",
      "Whenever alcohol rub is unavailable",
    ],
    answer: "When the hands are visibly soiled or after certain infections such as diarrhoea",
    why: "The third paragraph states soap and water is required when hands are visibly soiled or after caring for a patient with infections such as those causing diarrhoea.",
    whyKo: "세 번째 문단에 근거가 있습니다: 손이 눈에 띄게 오염되었거나(visibly soiled), 설사를 유발하는 감염 등 특정 감염 환자를 돌본 뒤에는 비누와 물로 씻어야 한다고 명시합니다. OET Reading Part B/C는 긴 임상 지문의 의미를 정확히 파악하는 유형입니다.",
    wrong: "Alcohol rub is described as suitable for most situations, so the other options are too broad or not stated.",
    wrongKo: "알코올 손소독제는 대부분의 상황에 적합하다고 했으므로, 나머지 보기는 지나치게 포괄적이거나 지문에 없는 내용입니다.",
  },
  {
    area: "Reading", type: "Inference (Part B/C)", skill: "Infer the writer's overall point", difficulty: "Advanced",
    passage: `Hand Hygiene in Clinical Practice

Hand hygiene remains the single most effective way to prevent the spread of infection in healthcare settings. Despite widespread awareness, studies consistently show that compliance among busy staff can fall below recommended levels, particularly during periods of high workload. Healthcare workers are therefore encouraged to follow the "Five Moments for Hand Hygiene" identified by the World Health Organization.

These five moments are: before touching a patient, before a clean or aseptic procedure, after exposure to body fluids, after touching a patient, and after contact with the patient's surroundings. Cleaning the hands at each of these points interrupts the transfer of microorganisms that can cause healthcare-associated infections.

Alcohol-based hand rub is suitable for most clinical situations because it acts quickly and is gentle on the skin when used correctly. However, when the hands are visibly soiled, or after caring for a patient with certain infections such as those causing diarrhoea, washing with soap and water is required, as alcohol rub may be less effective against some organisms.

Facilities can support good practice by placing hand-rub dispensers at the point of care, providing regular training, and displaying clear reminders. Ultimately, protecting patients depends not only on individual effort but on a workplace culture that treats hand hygiene as a shared responsibility.`,
    question: "The passage suggests that improving hand hygiene depends MAINLY on —",
    choices: [
      "buying more expensive hand rub",
      "both individual effort and a supportive workplace culture",
      "reducing the number of patients each nurse sees",
      "replacing soap and water with alcohol rub entirely",
    ],
    answer: "both individual effort and a supportive workplace culture",
    why: "The final sentence states protecting patients depends 'not only on individual effort but on a workplace culture that treats hand hygiene as a shared responsibility.'",
    whyKo: "마지막 문장이 핵심입니다: 환자 보호는 ‘개인의 노력뿐 아니라, 손위생을 공동 책임으로 여기는 조직 문화’에 달려 있다고 밝힙니다. 따라서 개인+조직 문화 모두가 중요하다는 것이 글의 결론입니다.",
  },
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
  {
    area: "Speaking", type: "Role-play (Opening)", skill: "Open a consultation and build rapport", difficulty: "Standard",
    question: "At the start of a consultation with a worried patient, which opening BEST builds rapport?",
    choices: [
      "So, what's wrong with you today?",
      "Hello, I'm the nurse looking after you today. Thank you for coming in — can you tell me what's been troubling you?",
      "Take a seat. I don't have much time.",
      "You again? What is it this time?",
    ],
    answer: "Hello, I'm the nurse looking after you today. Thank you for coming in — can you tell me what's been troubling you?",
    why: "A good opening introduces the clinician, thanks the patient, and invites them to share their concern in an open, respectful way.",
    whyKo: "좋은 도입부는 의료진을 소개하고, 환자에게 감사를 전하며, 열린 질문으로 걱정을 이야기하도록 이끕니다. OET Speaking은 라포(신뢰 관계) 형성과 환자 중심 소통을 평가합니다.",
  },
  {
    area: "Writing", type: "Case Notes → Relevance", skill: "Select relevant information for a letter", difficulty: "Standard",
    question: "A referral letter should include only relevant information. For a referral about ongoing wound care, which detail is LEAST likely to be relevant?",
    choices: [
      "The current size and appearance of the wound",
      "The dressing type and how often it is changed",
      "The patient's favourite hobby",
      "Relevant current medication",
    ],
    answer: "The patient's favourite hobby",
    why: "A referral should carry clinically relevant details; a personal hobby does not affect wound management and should be left out.",
    whyKo: "레퍼럴 편지에는 임상적으로 관련된 정보만 담아야 합니다. 상처 관리와 무관한 개인 취미는 제외하는 것이 맞습니다. OET Writing은 ‘관련 정보 선별’ 능력을 평가합니다.",
    wrong: "Wound size, dressing routine, and current medication all directly affect ongoing wound care.",
    wrongKo: "상처 크기·드레싱 방법·현재 복용 약은 모두 지속적인 상처 관리에 직접 영향을 주므로 반드시 포함해야 합니다.",
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
    area: "Quantitative", type: "Figure Comparison", skill: "Compare a figure's measure with a value", difficulty: "Standard",
    question: "The triangle has base 8 and height 5.  Column A: the area of the triangle.  Column B: 18.  Which statement is true?",
    figure: "triangle-bh",
    choices: ["A is greater", "B is greater", "The two are equal", "Cannot be determined"],
    answer: "A is greater",
    why: "Area = 1/2 × base × height = 1/2 × 8 × 5 = 20, which is greater than 18.",
    whyKo: "삼각형의 넓이 = 1/2 × 밑변 × 높이 = 1/2 × 8 × 5 = 20. 20 > 18 이므로 A(삼각형의 넓이)가 더 큽니다.",
    steps: ["Area = 1/2 × 8 × 5 = 20", "Compare 20 and 18", "20 > 18 → A is greater"],
  },
  {
    area: "Quantitative", type: "Figure Pattern", skill: "Find the next term in a visual pattern", difficulty: "Standard",
    question: "The groups of dots follow a rule (1, 3, 5, …). How many dots belong in the 4th group?",
    figure: "dots-pattern",
    choices: ["6", "7", "8", "9"],
    answer: "7",
    why: "The number of dots increases by 2 each time: 1, 3, 5, 7.",
    whyKo: "점의 개수가 1, 3, 5로 2개씩 늘어나는 규칙입니다. 따라서 4번째 묶음은 7개입니다.",
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

// ── AP · 심화 과목별 (복합 문제 + 도형/그래프 SVG, 영어 본문·해설 + 한글 핵심) ──
export const apCalcBank: SampleItem[] = [
  {
    area: "Calculus", type: "Derivative (Tangent)", skill: "Interpret the derivative as a slope", difficulty: "Advanced",
    question: "The graph shows y = x². What is the slope of the tangent line at the point (1, 1)?",
    figure: "curve-tangent",
    choices: ["1", "2", "2x", "1/2"],
    answer: "2",
    why: "f(x) = x² gives f′(x) = 2x, so the slope of the tangent at x = 1 is f′(1) = 2.",
    whyKo: "f(x)=x²의 도함수는 f′(x)=2x. 접선의 기울기 = f′(1) = 2. 접선은 곡선 위 한 점에서의 순간 변화율을 나타냅니다.",
  },
  {
    area: "Calculus", type: "Definite Integral (Area)", skill: "Interpret area under a curve", difficulty: "Advanced",
    question: "A particle's velocity (m/s) is shown on the v–t graph. What is the total distance traveled in the first 4 seconds?",
    figure: "vt-graph",
    choices: ["8 m", "12 m", "16 m", "32 m"],
    answer: "16 m",
    why: "Distance = ∫v dt = area under the v–t line = ½ × base × height = ½ × 4 × 8 = 16 m.",
    whyKo: "이동 거리 = ∫v dt = v–t 그래프 아래 삼각형의 넓이 = ½ × 4 × 8 = 16 m. 정적분은 그래프 아래 넓이로 해석합니다.",
    steps: ["Distance = area under v–t graph", "= ½ × 4 × 8", "= 16 m"],
  },
  {
    area: "Calculus", type: "Limits", skill: "Evaluate a limit by factoring", difficulty: "Standard",
    question: "Evaluate: lim (x→2) (x² − 4)/(x − 2).",
    choices: ["0", "2", "4", "undefined"],
    answer: "4",
    why: "Factor the numerator: (x−2)(x+2)/(x−2) = x + 2. As x → 2, the limit is 4.",
    whyKo: "분자 인수분해: (x−2)(x+2)/(x−2) = x+2. x→2이면 4. (0/0 꼴은 인수분해로 약분해 계산)",
    steps: ["(x² − 4) = (x − 2)(x + 2)", "cancel (x − 2) → x + 2", "x → 2 gives 4"],
  },
];

export const apPhysicsBank: SampleItem[] = [
  {
    area: "Physics", type: "Free-Body Diagram", skill: "Compute net force", difficulty: "Standard",
    question: "The free-body diagram shows a box with an applied force of 10 N and friction of 4 N. What is the net horizontal force?",
    figure: "force-diagram",
    choices: ["4 N", "6 N", "10 N", "14 N"],
    answer: "6 N",
    why: "Net horizontal force = applied − friction = 10 − 4 = 6 N (in the direction of the applied force).",
    whyKo: "수평 알짜힘 = 가한 힘 − 마찰력 = 10 − 4 = 6 N. 수직 방향의 N과 W는 서로 상쇄됩니다.",
  },
  {
    area: "Physics", type: "Newton's Second Law", skill: "Apply F = ma", difficulty: "Standard",
    question: "From the same diagram, the box has a mass of 2 kg and a net force of 6 N. What is its acceleration?",
    figure: "force-diagram",
    choices: ["2 m/s²", "3 m/s²", "6 m/s²", "12 m/s²"],
    answer: "3 m/s²",
    why: "By Newton's second law, a = F / m = 6 N / 2 kg = 3 m/s².",
    whyKo: "뉴턴 제2법칙: a = F/m = 6 ÷ 2 = 3 m/s².",
    steps: ["a = F / m", "= 6 / 2", "= 3 m/s²"],
  },
  {
    area: "Physics", type: "Kinematics (Graph)", skill: "Read acceleration from a v–t graph", difficulty: "Standard",
    question: "The velocity–time graph is a straight line rising from 0 to 8 m/s over 4 s. What is the acceleration?",
    figure: "vt-graph",
    choices: ["1 m/s²", "2 m/s²", "4 m/s²", "8 m/s²"],
    answer: "2 m/s²",
    why: "Acceleration = slope of the v–t graph = Δv / Δt = 8 / 4 = 2 m/s².",
    whyKo: "가속도 = v–t 그래프의 기울기 = Δv/Δt = 8 ÷ 4 = 2 m/s².",
  },
];

export const apStatsBank: SampleItem[] = [
  {
    area: "Statistics", type: "Scatter & Correlation", skill: "Describe correlation from a scatter plot", difficulty: "Standard",
    question: "The scatter plot shows the relationship between two variables. Which best describes the correlation?",
    figure: "scatter-plot",
    choices: ["Strong negative", "No correlation", "Positive", "Exactly y = x"],
    answer: "Positive",
    why: "As x increases, y tends to increase, and the points rise from lower-left to upper-right — a positive correlation.",
    whyKo: "x가 커질수록 y도 커지는 경향(왼쪽 아래 → 오른쪽 위)이므로 양의 상관관계입니다.",
  },
  {
    area: "Statistics", type: "Normal Distribution", skill: "Apply the empirical rule", difficulty: "Standard",
    question: "For an approximately normal distribution, about what percent of the data lies within 1 standard deviation of the mean?",
    figure: "normal-curve",
    choices: ["34%", "50%", "68%", "95%"],
    answer: "68%",
    why: "By the empirical (68–95–99.7) rule, about 68% of data falls within ±1σ of the mean.",
    whyKo: "경험적 규칙(68–95–99.7): 평균 ±1σ 안에 약 68%의 자료가 들어갑니다.",
  },
  {
    area: "Statistics", type: "Probability", skill: "Compute a binomial probability", difficulty: "Advanced",
    question: "A fair coin is flipped 3 times. What is the probability of getting exactly 2 heads?",
    choices: ["1/8", "1/4", "3/8", "1/2"],
    answer: "3/8",
    why: "There are C(3,2) = 3 favorable outcomes out of 2³ = 8 total, so 3/8.",
    whyKo: "경우의 수 = C(3,2) = 3, 전체 = 2³ = 8. 따라서 3/8.",
    steps: ["Favorable = C(3,2) = 3", "Total = 2³ = 8", "P = 3/8"],
  },
];

export const apBiologyBank: SampleItem[] = [
  {
    area: "Biology", type: "Genetics (Punnett)", skill: "Predict genotype ratios", difficulty: "Standard",
    question: "Two heterozygous parents (Aa × Aa) are crossed. From the Punnett square, what is the probability that an offspring is homozygous recessive (aa)?",
    figure: "punnett",
    choices: ["1/4", "1/2", "3/4", "1"],
    answer: "1/4",
    why: "Only one of the four boxes is aa, so the probability is 1/4.",
    whyKo: "퍼넷 사각형의 네 칸 중 aa는 한 칸이므로 확률은 1/4입니다.",
  },
  {
    area: "Biology", type: "Genetics (Phenotype)", skill: "Predict phenotype ratios", difficulty: "Standard",
    question: "For the same Aa × Aa cross, what is the expected phenotypic ratio (dominant : recessive)?",
    figure: "punnett",
    choices: ["1 : 1", "2 : 1", "3 : 1", "4 : 0"],
    answer: "3 : 1",
    why: "Three offspring show the dominant trait (AA, Aa, Aa) and one is recessive (aa): a 3 : 1 ratio.",
    whyKo: "우성 표현형 3(AA, Aa, Aa) : 열성 표현형 1(aa) = 3 : 1.",
  },
  {
    area: "Biology", type: "Cellular Respiration", skill: "Explain the role of oxygen", difficulty: "Advanced",
    question: "In aerobic cellular respiration, what is the primary role of oxygen?",
    choices: [
      "It is broken down to release sugar",
      "It acts as the final electron acceptor in the electron transport chain",
      "It is produced as a waste product",
      "It provides carbon for glucose",
    ],
    answer: "It acts as the final electron acceptor in the electron transport chain",
    why: "Oxygen accepts electrons at the end of the electron transport chain, forming water and allowing ATP production to continue.",
    whyKo: "산소는 전자전달계 마지막에서 최종 전자 수용체로 작용해 물을 만들고, ATP 생성이 계속되게 합니다.",
  },
];

export const apChemistryBank: SampleItem[] = [
  {
    area: "Chemistry", type: "Reaction Energy Diagram", skill: "Classify a reaction from an energy diagram", difficulty: "Standard",
    question: "The reaction energy diagram shows the products at a lower energy than the reactants. This reaction is —",
    figure: "energy-diagram",
    choices: ["Endothermic", "Exothermic", "At equilibrium", "Impossible"],
    answer: "Exothermic",
    why: "When products are lower in energy than reactants, energy is released, so ΔH < 0 and the reaction is exothermic.",
    whyKo: "생성물의 에너지가 반응물보다 낮으면 에너지가 방출됩니다(ΔH < 0) → 발열 반응.",
  },
  {
    area: "Chemistry", type: "Activation Energy", skill: "Interpret the diagram peak", difficulty: "Standard",
    question: "On the same diagram, what does the height of the peak above the reactants (Eₐ) represent?",
    figure: "energy-diagram",
    choices: ["The enthalpy change", "The activation energy", "The product energy", "The reaction temperature"],
    answer: "The activation energy",
    why: "The peak measured from the reactant level is the activation energy — the minimum energy needed for the reaction to proceed.",
    whyKo: "반응물 높이에서 봉우리까지의 높이가 활성화 에너지(Eₐ)입니다. 반응이 일어나는 데 필요한 최소 에너지입니다.",
  },
  {
    area: "Chemistry", type: "Stoichiometry", skill: "Use mole ratios", difficulty: "Standard",
    question: "For 2H₂ + O₂ → 2H₂O, how many moles of O₂ are needed to react completely with 2 mol of H₂?",
    choices: ["0.5 mol", "1 mol", "2 mol", "4 mol"],
    answer: "1 mol",
    why: "The mole ratio of H₂ to O₂ is 2 : 1, so 2 mol H₂ reacts with 1 mol O₂.",
    whyKo: "H₂ : O₂ 몰비 = 2 : 1이므로, H₂ 2몰에는 O₂ 1몰이 필요합니다.",
    steps: ["Ratio H₂ : O₂ = 2 : 1", "2 mol H₂ → 1 mol O₂"],
  },
];

export const apEconomicsBank: SampleItem[] = [
  {
    area: "Economics", type: "Supply & Demand", skill: "Identify market equilibrium", difficulty: "Standard",
    question: "In the graph, point E is where the supply (S) and demand (D) curves intersect. Point E represents —",
    figure: "supply-demand",
    choices: ["A surplus", "A shortage", "Market equilibrium", "A price ceiling"],
    answer: "Market equilibrium",
    why: "The intersection of supply and demand gives the equilibrium price and quantity, where quantity supplied equals quantity demanded.",
    whyKo: "공급 곡선과 수요 곡선이 만나는 점 E는 공급량 = 수요량이 되는 시장 균형(균형가격·균형수량)입니다.",
  },
  {
    area: "Economics", type: "Demand Shift", skill: "Predict the effect of a shift", difficulty: "Advanced",
    question: "If consumer demand increases (the demand curve shifts right) while supply is unchanged, what happens to the equilibrium price?",
    figure: "supply-demand",
    choices: ["It falls", "It rises", "It stays the same", "It becomes zero"],
    answer: "It rises",
    why: "A rightward shift in demand raises both the equilibrium price and the equilibrium quantity.",
    whyKo: "수요 증가(수요 곡선 오른쪽 이동)는 균형가격과 균형수량을 모두 상승시킵니다.",
  },
  {
    area: "Economics", type: "Core Concept", skill: "Define opportunity cost", difficulty: "Standard",
    question: "What does the term 'opportunity cost' mean?",
    choices: [
      "The money paid for a good",
      "The value of the next-best alternative given up",
      "The total cost of production",
      "A tax charged by the government",
    ],
    answer: "The value of the next-best alternative given up",
    why: "Opportunity cost is what you sacrifice — the value of the best alternative you did not choose.",
    whyKo: "기회비용은 어떤 선택을 위해 포기한 대안 중 가장 가치 있는 것의 가치입니다.",
  },
];

export const apEnglishBank: SampleItem[] = [
  {
    area: "Rhetoric", type: "Rhetorical Strategy", skill: "Analyze figurative language and argument", difficulty: "Advanced",
    passage: `Adapted excerpt:

We are told that progress is inevitable — that the march of technology will carry us forward whether we choose it or not. But progress is not a river that flows on its own; it is a road we build, stone by stone, with every decision we make. To hand that choice to machines is not to advance. It is to abdicate.`,
    question: "The author's metaphor comparing progress to \"a road we build, stone by stone\" primarily serves to —",
    choices: [
      "argue that technology always improves society",
      "emphasize that progress results from deliberate human choices, not inevitability",
      "describe the history of road construction",
      "suggest that progress is slow and painful",
    ],
    answer: "emphasize that progress results from deliberate human choices, not inevitability",
    why: "By replacing the passive 'river' with a 'road we build,' the author reframes progress as something people actively create through choices, countering the claim that it is inevitable.",
    whyKo: "저자는 스스로 흐르는 ‘강’ 대신 ‘우리가 쌓아 만드는 길’이라는 은유로, 진보가 필연이 아니라 인간의 능동적 ‘선택’으로 만들어진다는 점을 강조합니다.",
    wrong: "The other options miss the metaphor's purpose or misread the author's stance.",
    wrongKo: "나머지 보기는 은유의 목적을 놓쳤거나 저자의 입장을 잘못 읽은 것입니다.",
  },
  {
    area: "Rhetoric", type: "Tone", skill: "Identify tone", difficulty: "Advanced",
    passage: `Adapted excerpt:

We are told that progress is inevitable — that the march of technology will carry us forward whether we choose it or not. But progress is not a river that flows on its own; it is a road we build, stone by stone, with every decision we make. To hand that choice to machines is not to advance. It is to abdicate.`,
    question: "The tone of the final two sentences is best described as —",
    choices: ["nostalgic", "cautionary", "cheerful", "indifferent"],
    answer: "cautionary",
    why: "The blunt warning — that surrendering choice is to 'abdicate' — creates a cautionary, warning tone.",
    whyKo: "‘선택을 넘기는 것은 곧 (책임을) 포기하는 것’이라는 단호한 경고에서 경계·주의(cautionary)의 어조가 드러납니다.",
  },
];

export const apHistoryBank: SampleItem[] = [
  {
    area: "History", type: "Source Analysis", skill: "Connect a source to its historical context", difficulty: "Advanced",
    passage: `Adapted from a late-18th-century political document:

"Governments are instituted among people, deriving their just powers from the consent of the governed; and whenever any form of government becomes destructive of these ends, it is the right of the people to alter or abolish it."`,
    question: "The idea that a government's power comes from 'the consent of the governed' most directly provided justification for —",
    choices: [
      "the divine right of kings",
      "the American Revolution and independence from Britain",
      "the expansion of the slave trade",
      "the establishment of a state religion",
    ],
    answer: "the American Revolution and independence from Britain",
    why: "Enlightenment social-contract ideas — government by consent and the right to alter unjust rule — were used to justify the colonists' break from Britain.",
    whyKo: "‘피통치자의 동의’와 ‘부당한 정부를 바꿀 권리’라는 계몽사상(사회계약론)은 식민지인들이 영국으로부터 독립을 정당화하는 근거가 되었습니다.",
  },
  {
    area: "History", type: "Point of View", skill: "Analyze the author's argument", difficulty: "Advanced",
    passage: `Adapted from a late-18th-century political document:

"Governments are instituted among people, deriving their just powers from the consent of the governed; and whenever any form of government becomes destructive of these ends, it is the right of the people to alter or abolish it."`,
    question: "According to the excerpt, under what condition do the people have the right to change their government?",
    choices: [
      "Whenever taxes are raised",
      "When the government becomes destructive of the people's rights and consent",
      "Only during a foreign war",
      "Never, once a government is formed",
    ],
    answer: "When the government becomes destructive of the people's rights and consent",
    why: "The text states the people may alter or abolish a government that 'becomes destructive of these ends' — that is, one that no longer protects rights or rules by consent.",
    whyKo: "지문은 정부가 그 목적(권리 보호·동의에 의한 통치)을 해칠 때 국민이 정부를 바꾸거나 폐지할 권리가 있다고 밝힙니다.",
  },
];

// ── MAP Growth (Math · Reading · Language 혼합) ──────────
export const mapBank: SampleItem[] = [
  readingBank[2], // Reading · Inference (짧은 지문)
  readingBank[6], // Reading · 긴 지문(Ant Teamwork) 주제 파악
  {
    area: "Mathematics", type: "Data & Graphs", skill: "Read a bar graph", difficulty: "Standard",
    question: "The bar graph shows how many books were read each day. How many more were read on the busiest day than the slowest day?",
    figure: "bar-graph",
    choices: ["3", "4", "5", "6"],
    answer: "5",
    why: "Tallest bar (Thu) is 8, shortest (Mon) is 3: 8 − 3 = 5.",
    whyKo: "가장 높은 막대(목 8권)와 가장 낮은 막대(월 3권)의 차이: 8 − 3 = 5권.",
  },
  {
    area: "Mathematics", type: "Algebraic Thinking", skill: "Find slope from a graph", difficulty: "Standard",
    question: "A line passes through (1, 1) and (3, 5). What is its slope?",
    figure: "coord-line",
    choices: ["1", "2", "3", "1/2"],
    answer: "2",
    why: "Slope = (5 − 1)/(3 − 1) = 4/2 = 2.",
    whyKo: "기울기 = (5−1)/(3−1) = 4/2 = 2.",
  },
  grammarBank[0], // Language Usage · 주어–동사 일치
  vocabularyBank[1], // Language Usage · 유의어
];

// ── Digital SAT · Math (도형·그래프 포함) ────────────────
export const satMathBank: SampleItem[] = [
  {
    area: "Algebra", type: "Linear Functions", skill: "Find slope from a graph", difficulty: "Standard",
    question: "The line shown passes through (1, 1) and (3, 5). What is the slope of the line?",
    figure: "coord-line",
    choices: ["1", "2", "3", "1/2"],
    answer: "2",
    why: "Slope = (5 − 1) / (3 − 1) = 4 / 2 = 2.",
    whyKo: "기울기 = (5−1)/(3−1) = 4/2 = 2.",
  },
  {
    area: "Advanced Math", type: "Quadratic Functions", skill: "Find the vertex / minimum", difficulty: "Advanced",
    question: "The function f(x) = x² − 4x + 1 has a minimum value. What is it?",
    choices: ["−3", "1", "−1", "2"],
    answer: "−3",
    why: "Complete the square: f(x) = (x − 2)² − 3, so the minimum is −3 at x = 2.",
    whyKo: "완전제곱: f(x) = (x−2)² − 3. 따라서 x=2에서 최솟값 −3.",
    steps: ["x² − 4x + 1 = (x − 2)² − 4 + 1", "= (x − 2)² − 3", "min = −3 at x = 2"],
  },
  {
    area: "Problem-Solving & Data Analysis", type: "Graph Interpretation", skill: "Interpret a bar graph", difficulty: "Standard",
    question: "Using the bar graph, what is the difference between the greatest and least value?",
    figure: "bar-graph",
    choices: ["3", "4", "5", "6"],
    answer: "5",
    why: "Greatest is 8 and least is 3: 8 − 3 = 5.",
    whyKo: "최댓값 8, 최솟값 3의 차이: 8 − 3 = 5.",
  },
  {
    area: "Geometry & Trigonometry", type: "Pythagorean Theorem", skill: "Apply the Pythagorean theorem", difficulty: "Standard",
    question: "A right triangle has legs of length 3 and 4. Find the length of the hypotenuse.",
    figure: "right-triangle",
    choices: ["5", "6", "7", "12"],
    answer: "5",
    why: "3² + 4² = 9 + 16 = 25, so the hypotenuse = √25 = 5.",
    whyKo: "3² + 4² = 25, 빗변 = √25 = 5.",
  },
];
