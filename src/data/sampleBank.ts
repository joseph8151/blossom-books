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
  essay?: { intro: string; body: string[]; conclusion: string }; // Writing 모범답안(서론·본론·결론)
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
  {
    area: "Vocabulary", type: "Context Clues", skill: "Use context clues", difficulty: "Foundation",
    question: "The puppy was so timid that it hid under the bed. “Timid” means ___.",
    choices: ["shy", "hungry", "loud", "fast"],
    answer: "shy",
    why: "Hiding under the bed is a clue that 'timid' means shy or easily frightened.",
    whyKo: "침대 밑에 숨는다는 단서로 timid = ‘겁 많은/수줍은(shy)’임을 알 수 있습니다.",
  },
  {
    area: "Vocabulary", type: "Word Meaning", skill: "Choose the precise word form", difficulty: "Standard",
    question: "Choose the word that best completes the sentence: The scientist made a careful ___ of the results.",
    choices: ["summary", "summarize", "summarily", "summed"],
    answer: "summary",
    why: "A noun is needed after 'a careful,' and 'summary' is the noun form.",
    whyKo: "‘a careful ___’ 자리에는 명사가 필요하므로 명사형 summary가 알맞습니다. (동사·부사형은 부적절)",
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
  {
    area: "Grammar", type: "Plural Nouns", skill: "Form irregular plurals", difficulty: "Foundation",
    question: "Choose the correct plural: There are three ___ on the farm.",
    choices: ["gooses", "geese", "goosen", "goose"],
    answer: "geese",
    why: "'Goose' has an irregular plural: 'geese.'",
    whyKo: "goose는 불규칙 복수형으로 geese가 됩니다. (예: foot→feet, tooth→teeth)",
  },
  {
    area: "Grammar", type: "Misplaced Modifiers", skill: "Fix misplaced/dangling modifiers", difficulty: "Advanced",
    question: "Which sentence is written correctly?",
    choices: [
      "Walking to school, the rain soaked Mia.",
      "Walking to school, Mia was soaked by the rain.",
      "The rain, walking to school, soaked Mia.",
      "Soaked by walking to school, the rain hit Mia.",
    ],
    answer: "Walking to school, Mia was soaked by the rain.",
    why: "The introductory phrase 'Walking to school' must describe the one doing the walking — Mia, not the rain.",
    whyKo: "도입 분사구 ‘Walking to school’은 걷는 주체(Mia)를 수식해야 합니다. 나머지는 비(rain)가 걷는 꼴이 되는 수식어 오류입니다.",
    wrong: "The other options attach the phrase to 'the rain,' which cannot walk.",
    wrongKo: "나머지 보기는 분사구가 ‘비(rain)’를 수식하게 되어 비가 걷는 어색한 문장이 됩니다.",
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
  {
    area: "Writing", type: "Sentence Writing", skill: "Write a complete sentence", difficulty: "Foundation",
    question: "Write one complete sentence about your favorite season. (Use a subject and a verb.)",
    answer: "e.g., I love summer because I can swim every day.",
    why: "Scoring: a complete sentence with a clear subject and verb, on topic.",
    whyKo: "채점 기준: 주어와 동사를 갖춘 완전한 한 문장이며 주제(좋아하는 계절)에 맞는지.",
  },
  {
    area: "Writing", type: "Supporting Details", skill: "Add supporting details", difficulty: "Standard",
    question: "Add two supporting details to this topic sentence: “Recess is important for students.”",
    answer: "e.g., It gives them a break to rest their minds, and it lets them exercise and make friends.",
    why: "Scoring: two clear, relevant details that support the topic sentence.",
    whyKo: "채점 기준: 주제문을 뒷받침하는 구체적이고 관련 있는 근거 두 가지를 제시했는지.",
  },
  {
    area: "Writing", type: "Opinion & Evidence", skill: "State and support an opinion", difficulty: "Advanced",
    question: "In 3–4 sentences, state whether schools should have longer lunch breaks and give two reasons.",
    answer: "e.g., Schools should have longer lunch breaks. First, students need enough time to eat well, which helps them focus. Second, a longer break lets them relax and return to class ready to learn.",
    why: "Scoring: a clear opinion (claim) + at least two supporting reasons + organized sentences.",
    whyKo: "채점 기준: 분명한 의견(주장) + 뒷받침 이유 두 가지 이상 + 짜임새 있는 문장 구성.",
  },
  {
    area: "Writing", type: "Creative Essay", skill: "Write a short creative/narrative essay (약 150 words)", difficulty: "Standard",
    passage: "Prompt: Write a short story about a day when something surprising happened to you. Use your imagination, and show how you felt.",
    question: "Plan and write your story. (약 150 words)",
    answer: "모범답안: 아래 이야기를 참고하세요.",
    essay: {
      intro:
        "Last Saturday started like any normal day, but it turned into one I will never forget. I looked out my window and saw a small, lost puppy shivering on our porch in the rain.",
      body: [
        "I ran outside without a coat and spoke softly so it would not be scared. Slowly, the puppy came closer and let me pick it up. I wrapped it in a warm towel while my mom called the local animal shelter.",
        "The puppy fell asleep in my lap while we waited. I felt proud that I had helped a scared animal feel safe. An hour later, the shelter called back — someone was searching for him!",
      ],
      conclusion:
        "When the owner arrived and hugged his puppy with tears in his eyes, I understood that even a small act of kindness can make someone's whole day special.",
    },
    why: "A strong creative essay uses vivid details, follows a clear story order (beginning–middle–end), and shows the writer's feelings or reflection at the end.",
    whyKo: "좋은 창작 에세이는 생생한 디테일을 사용하고, 이야기 순서(처음–중간–끝)를 분명히 따르며, 글 끝에서 글쓴이의 느낌이나 깨달음을 보여줍니다. 150단어 정도의 짧은 글이라도 기승전결이 있으면 좋은 점수를 받습니다.",
  },
  {
    area: "Writing", type: "Opinion Essay", skill: "Write a structured essay (Introduction · Body · Conclusion, 약 250 words)", difficulty: "Advanced",
    passage: "Prompt: Do you think students should be allowed to use smartphones at school? Write about 250 words using an Introduction – Body – Conclusion structure.",
    question: "Plan and write your essay. (Introduction · Body · Conclusion)",
    answer: "모범답안: 아래 서론–본론–결론 구조를 참고하세요.",
    essay: {
      intro:
        "Smartphones are a big part of our lives today. Some people think students should be allowed to use them at school, while others disagree. In my opinion, students should not use smartphones during class, because they cause distraction and reduce real communication.",
      body: [
        "First, smartphones make it hard to focus. When a phone buzzes, students want to check it right away, and they miss what the teacher is saying. In my class, students who keep their phones in their bags usually finish their work faster and make fewer mistakes.",
        "Second, using phones too much reduces face-to-face communication. During break time, many students stare at their screens instead of talking or playing together. Talking with friends in person helps us build better relationships and stronger social skills.",
      ],
      conclusion:
        "In conclusion, although smartphones are useful, they should not be used during school hours. Keeping phones away helps students concentrate and connect with each other. Schools could still allow phone use for emergencies or for special lessons.",
    },
    why: "A strong essay states a clear opinion in the introduction, supports it with reasons and examples in the body, and restates the position in the conclusion.",
    whyKo: "좋은 에세이는 서론에서 분명한 입장을 밝히고, 본론에서 이유와 예시로 뒷받침하며, 결론에서 입장을 다시 정리합니다. 서론 → 본론 → 결론 구조로 쓰면 점수가 안정적으로 나옵니다.",
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
  {
    area: "Algebra", type: "Systems of Equations", skill: "Solve a linear system", difficulty: "Standard",
    question: "Solve the system:  y = x + 1  and  y = 2x − 3.",
    choices: ["x = 4, y = 5", "x = 2, y = 3", "x = 3, y = 4", "x = 1, y = 2"],
    answer: "x = 4, y = 5",
    why: "Set the two expressions equal: x + 1 = 2x − 3 → x = 4, then y = 4 + 1 = 5.",
    whyKo: "두 식을 같다고 놓습니다: x + 1 = 2x − 3 → x = 4. 대입하면 y = 4 + 1 = 5.",
    steps: ["x + 1 = 2x − 3", "4 = x", "y = 4 + 1 = 5"],
  },
  {
    area: "Algebra", type: "Exponent Rules", skill: "Apply laws of exponents", difficulty: "Advanced",
    question: "Simplify: (2x³)² · x⁴.",
    choices: ["2x¹⁰", "4x¹⁰", "4x²⁴", "2x²⁴"],
    answer: "4x¹⁰",
    why: "(2x³)² = 4x⁶; then 4x⁶ · x⁴ = 4x¹⁰ (add exponents when multiplying like bases).",
    whyKo: "(2x³)² = 4x⁶. 이후 4x⁶ · x⁴ = 4x¹⁰. 같은 밑끼리 곱할 때는 지수를 더합니다.",
    steps: ["(2x³)² = 4x⁶", "4x⁶ · x⁴ = 4x^(6+4)", "= 4x¹⁰"],
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
  {
    area: "Spatial Reasoning", type: "Paper Folding", skill: "Predict holes after unfolding", difficulty: "Standard",
    figure: "paper-fold",
    question: "A square sheet is folded in half and one hole is punched through both layers. When the paper is unfolded, how many holes are there?",
    choices: ["1", "2", "3", "4"],
    answer: "2",
    why: "Folding creates a mirror line. One punch passes through both layers, so the unfolded paper shows 2 holes, symmetric about the fold.",
    whyKo: "접으면 접힌 선이 대칭축이 됩니다. 한 번 뚫으면 두 겹을 함께 관통하므로, 펼치면 접힌 선을 기준으로 대칭인 구멍 2개가 생깁니다.",
    wrong: "Choosing 1 ignores the second (mirrored) layer.",
    wrongKo: "1개로 고르면 반대쪽(대칭으로 겹쳐진) 겹에 생기는 구멍을 빠뜨린 것입니다.",
  },
  {
    area: "Spatial Reasoning", type: "Rotation", skill: "Rotate a figure mentally", difficulty: "Foundation",
    figure: "arrow-rotate",
    question: "The arrow points to the right. If it is rotated 90° clockwise, which direction will it point?",
    choices: ["Up", "Down", "Left", "Right"],
    answer: "Down",
    why: "Rotating a right-pointing arrow 90° clockwise turns it to point downward.",
    whyKo: "오른쪽(→)을 가리키는 화살표를 시계 방향으로 90° 돌리면 아래쪽(↓)을 가리키게 됩니다. (오른→아래→왼→위 순서)",
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

// 영어 레벨테스트는 학년마다 따로 나온 단행본입니다(G1–2처럼 묶은 시리즈가
// 아닙니다). 다만 실제 샘플 지문·문항은 인접한 두 학년(G1·G2 / G3·G4 / G5·G6)이
// 같은 출제 분석을 바탕으로 만들어져 지문 풀을 공유합니다 — 가상의 샘플을
// 새로 만들어내지 않고, 실제 존재하는 지문·문항을 그대로 재사용합니다.
const g1_2Reading: SampleItem[] = [
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
];

const g3_4Reading: SampleItem[] = [
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
];

const g5_6Reading: SampleItem[] = [
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
];

// 국어 문해력 레벨테스트 대비 — 학교·기관 기출을 복제하지 않고, 어휘·핵심
// 요지·내용 파악·문맥·구조·추론을 한 지문 안에서 연습하도록 독립 제작한
// 정보글 지문입니다.
const koreanLiteracyPassage1 = `도시의 빈 옥상이 바뀌고 있다. 몇몇 학교는 옥상에 흙을 얇게 깔고 상추와 방울토마토를 심었다. 흙은 여름 햇볕을 덜 받아들이게 해서 건물 안 온도가 조금 낮아진다. 학생들은 매주 물을 주고 수확한 채소를 급식실에 보낸다. 옥상 텃밭이 만능은 아니다. 바람이 세면 화분이 쓰러지고, 겨울에는 작물이 잘 자라지 않는다. 그래도 교실에서만 보던 '환경'이라는 말이 손과 흙으로 연결된다는 점에서, 학교는 이 수업을 계속하기로 했다.`;

const koreanLiteracyReading: SampleItem[] = [
  {
    area: "Reading",
    type: "핵심 요지",
    skill: "글의 핵심 요지 파악하기",
    difficulty: "Standard",
    passage: koreanLiteracyPassage1,
    question: "이 글의 핵심 요지로 가장 알맞은 것은?",
    choices: [
      "모든 도시 건물은 옥상 텃밭을 만들어야 한다.",
      "학교는 한계를 알면서도 옥상 텃밭 수업을 이어 가기로 했다.",
      "옥상 텃밭은 겨울에 가장 잘 자란다.",
      "급식실 채소는 모두 옥상에서 온다.",
    ],
    answer: "학교는 한계를 알면서도 옥상 텃밭 수업을 이어 가기로 했다.",
    why: "글은 옥상 텃밭의 효과와 한계를 말한 뒤, 그래도 수업을 계속한다고 맺습니다.",
    whyKo:
      "글은 옥상 텃밭의 효과와 한계를 말한 뒤, 그래도 수업을 계속한다고 맺습니다. A는 글이 주장하지 않습니다. C·D는 지문과 반대이거나 과장입니다.",
  },
  {
    area: "Reading",
    type: "문맥 · 어휘",
    skill: "밑줄 친 표현의 의미를 문맥으로 파악하기",
    difficulty: "Standard",
    passage: koreanLiteracyPassage1,
    question: "밑줄 친 '만능은 아니다'의 의미로 가장 알맞은 것은?",
    choices: [
      "옥상 텃밭에는 장점만 있다",
      "옥상 텃밭은 어떤 문제에도 완벽한 해답이 아니다",
      "옥상 텃밭은 수업을 할 수 없다",
      "옥상 텃밭은 비용이 전혀 들지 않는다",
    ],
    answer: "옥상 텃밭은 어떤 문제에도 완벽한 해답이 아니다",
    why: "바로 다음 문장에 바람과 겨울 문제가 나옵니다.",
    whyKo:
      "바로 다음 문장에 바람과 겨울 문제가 나옵니다. '만능'은 모든 상황을 해결한다는 뜻이므로, 그렇지 않다는 말입니다.",
  },
  {
    area: "Reading",
    type: "추론",
    skill: "글을 바탕으로 추론하기",
    difficulty: "Standard",
    passage: koreanLiteracyPassage1,
    question: "이 글을 바탕으로 추론할 수 있는 것은?",
    choices: [
      "학교는 환경 수업을 손과 경험으로 연결하려 한다.",
      "옥상 텃밭만 있으면 에어컨이 필요 없다.",
      "학생들은 텃밭 일을 싫어한다.",
      "모든 가정에도 옥상 텃밭이 있다.",
    ],
    answer: "학교는 환경 수업을 손과 경험으로 연결하려 한다.",
    why: "마지막 문장의 '손과 흙으로 연결'이 근거입니다.",
    whyKo: "마지막 문장의 '손과 흙으로 연결'이 근거입니다. B·C·D는 지문에 없습니다.",
  },
];

export const placementReadingByProduct: Record<string, SampleItem[]> = {
  "english-level-test-g1": g1_2Reading,
  "english-level-test-g2": g1_2Reading,
  "english-level-test-g3": g3_4Reading,
  "english-level-test-g4": g3_4Reading,
  "english-level-test-g5": g5_6Reading,
  "english-level-test-g6": g5_6Reading,
  "korean-literacy-level-test": koreanLiteracyReading,
};

// ── SR Reading 학년별 (긴 지문 + 유형 확장) ──────────────
// SR 제품은 Reading 전용이므로 지문 하나에 다양한 유형(주제·세부·추론·어휘·의도·구조)을 담아 풍성하게 구성합니다.
export const srReadingByProduct: Record<string, SampleItem[]> = {
  "sr-reading-prep-g2-3": [
    ...g1_2Reading,
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
    ...g3_4Reading,
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
    ...g5_6Reading,
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

// Physics 2 / Physics C: E&M은 역학(Physics 1/C: Mechanics)과 달리 회로·전자기를
// 다루므로 별도 뱅크를 둡니다.
export const apPhysicsEmBank: SampleItem[] = [
  {
    area: "Physics", type: "Circuits (Ohm's Law)", skill: "Apply V = IR", difficulty: "Standard",
    question: "The circuit shows a 12 V battery connected in series with a 4 Ω resistor. What is the current flowing through the circuit?",
    figure: "circuit-simple",
    choices: ["0.33 A", "3 A", "8 A", "48 A"],
    answer: "3 A",
    why: "By Ohm's law, I = V / R = 12 V / 4 Ω = 3 A.",
    whyKo: "옴의 법칙: I = V/R = 12V ÷ 4Ω = 3A.",
    steps: ["I = V / R", "= 12 / 4", "= 3 A"],
  },
  {
    area: "Physics", type: "Circuits (Series)", skill: "Reason about series resistance", difficulty: "Advanced",
    question: "In the same circuit, a second 4 Ω resistor is added in series with the first. What happens to the current?",
    choices: ["It doubles", "It stays the same", "It is cut in half", "It becomes zero"],
    answer: "It is cut in half",
    why: "Adding a series resistor increases total resistance from 4 Ω to 8 Ω. Since I = V/R, doubling R halves the current (12V / 8Ω = 1.5 A, half of 3 A).",
    whyKo: "직렬로 저항을 추가하면 전체 저항이 4Ω에서 8Ω으로 늘어납니다. I=V/R이므로 저항이 2배가 되면 전류는 절반이 됩니다(12V÷8Ω=1.5A, 기존 3A의 절반).",
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

// ── AP 보충 문항 (샘플 분량·난이도 스펙트럼 보강) ──────────
export const apExtraByProduct: Record<string, SampleItem[]> = {
  "ap-calculus-workbook": [
    {
      area: "Calculus", type: "Chain Rule", skill: "Differentiate composite functions", difficulty: "Advanced",
      question: "Find the derivative of f(x) = (3x + 1)⁵.",
      choices: ["5(3x + 1)⁴", "15(3x + 1)⁴", "15(3x + 1)⁵", "3(3x + 1)⁴"],
      answer: "15(3x + 1)⁴",
      why: "By the chain rule, f′(x) = 5(3x + 1)⁴ · 3 = 15(3x + 1)⁴.",
      whyKo: "연쇄법칙: 바깥함수 미분 5(3x+1)⁴ 곱하기 안함수 미분 3 = 15(3x+1)⁴.",
      steps: ["outer: 5(3x + 1)⁴", "inner derivative: 3", "product: 15(3x + 1)⁴"],
    },
    {
      area: "Calculus", type: "Optimization", skill: "Use derivatives to find a maximum", difficulty: "Advanced",
      question: "A ball's height is h(t) = 20t − 5t². At what time t is the height greatest?",
      choices: ["t = 1", "t = 2", "t = 4", "t = 5"],
      answer: "t = 2",
      why: "Set h′(t) = 20 − 10t = 0, giving t = 2 (the vertex/maximum).",
      whyKo: "h′(t) = 20 − 10t = 0 → t = 2에서 최고 높이(꼭짓점)에 도달합니다.",
      steps: ["h′(t) = 20 − 10t", "20 − 10t = 0", "t = 2"],
    },
  ],
  "ap-physics-workbook": [
    {
      area: "Physics", type: "Kinetic Energy", skill: "Apply KE = ½mv²", difficulty: "Standard",
      question: "A 2 kg object moves at 3 m/s. What is its kinetic energy?",
      choices: ["6 J", "9 J", "12 J", "18 J"],
      answer: "9 J",
      why: "KE = ½mv² = ½ × 2 × 3² = ½ × 2 × 9 = 9 J.",
      whyKo: "운동에너지 = ½mv² = ½ × 2 × 3² = 9 J.",
      steps: ["KE = ½ × 2 × 3²", "= ½ × 2 × 9", "= 9 J"],
    },
    {
      area: "Physics", type: "Free Fall", skill: "Use kinematics under gravity", difficulty: "Standard",
      question: "An object is dropped from rest. Ignoring air resistance, how far does it fall in 2 s? (g = 10 m/s²)",
      choices: ["10 m", "20 m", "40 m", "5 m"],
      answer: "20 m",
      why: "d = ½gt² = ½ × 10 × 2² = ½ × 10 × 4 = 20 m.",
      whyKo: "d = ½gt² = ½ × 10 × 2² = 20 m.",
      steps: ["d = ½gt²", "= ½ × 10 × 4", "= 20 m"],
    },
  ],
  "ap-statistics-workbook": [
    {
      area: "Statistics", type: "Center", skill: "Find the median", difficulty: "Standard",
      question: "Find the median of the data set: 3, 5, 7, 7, 8.",
      choices: ["5", "6", "7", "7.5"],
      answer: "7",
      why: "With five ordered values, the median is the 3rd value, which is 7.",
      whyKo: "값이 5개(정렬됨)이면 가운데(3번째) 값이 중앙값입니다 → 7.",
    },
    {
      area: "Statistics", type: "Sampling", skill: "Reduce sampling bias", difficulty: "Standard",
      question: "Which method is LEAST likely to introduce bias when choosing a sample?",
      choices: ["Asking only your friends", "Simple random sampling", "Surveying people at one store", "Choosing volunteers only"],
      answer: "Simple random sampling",
      why: "Random selection gives every member an equal chance, reducing selection bias.",
      whyKo: "단순 무작위 추출은 모든 대상에게 동일한 선택 확률을 주어 선택 편향을 줄입니다.",
    },
  ],
  "ap-biology-workbook": [
    {
      area: "Biology", type: "Natural Selection", skill: "Explain evolutionary mechanisms", difficulty: "Advanced",
      question: "Which statement BEST describes natural selection?",
      choices: [
        "All individuals in a population reproduce equally",
        "Individuals with favorable traits tend to survive and reproduce more",
        "Organisms change their genes on purpose to fit the environment",
        "Traits acquired during life are always passed to offspring",
      ],
      answer: "Individuals with favorable traits tend to survive and reproduce more",
      why: "Natural selection favors heritable traits that improve survival and reproduction, so those traits become more common over generations.",
      whyKo: "자연선택은 생존·번식에 유리한 유전 형질을 가진 개체가 더 많이 살아남아 번식하게 하여, 그 형질이 세대를 거치며 흔해지는 과정입니다.",
    },
    {
      area: "Biology", type: "Enzymes", skill: "Describe enzyme function", difficulty: "Standard",
      question: "What is the primary role of an enzyme in a chemical reaction?",
      choices: [
        "It is used up and cannot be reused",
        "It lowers the activation energy, speeding the reaction",
        "It raises the activation energy",
        "It provides energy to the reaction",
      ],
      answer: "It lowers the activation energy, speeding the reaction",
      why: "Enzymes are biological catalysts: they lower activation energy and are not consumed, so they can be reused.",
      whyKo: "효소는 생체 촉매로, 활성화 에너지를 낮춰 반응을 빠르게 하며 반응 후에도 소모되지 않아 재사용됩니다.",
    },
  ],
  "ap-chemistry-workbook": [
    {
      area: "Chemistry", type: "pH", skill: "Calculate pH", difficulty: "Standard",
      question: "A solution has [H⁺] = 1 × 10⁻³ M. What is its pH?",
      choices: ["1", "3", "7", "11"],
      answer: "3",
      why: "pH = −log[H⁺] = −log(10⁻³) = 3.",
      whyKo: "pH = −log[H⁺] = −log(10⁻³) = 3.",
    },
    {
      area: "Chemistry", type: "Periodic Trends", skill: "Predict periodic trends", difficulty: "Standard",
      question: "Moving from left to right across a period, atomic radius generally —",
      choices: ["increases", "decreases", "stays the same", "doubles"],
      answer: "decreases",
      why: "Across a period, increasing nuclear charge pulls electrons closer, so the atomic radius decreases.",
      whyKo: "주기를 따라 오른쪽으로 갈수록 핵전하가 커져 전자를 더 강하게 당기므로 원자 반지름은 대체로 감소합니다.",
    },
  ],
  "ap-economics-workbook": [
    {
      area: "Economics", type: "Elasticity", skill: "Interpret price elasticity", difficulty: "Advanced",
      question: "A 10% price increase causes a 20% drop in quantity demanded. Demand is —",
      choices: ["inelastic", "elastic", "unit elastic", "perfectly inelastic"],
      answer: "elastic",
      why: "% change in quantity (20%) exceeds % change in price (10%), so demand is elastic (elasticity > 1).",
      whyKo: "수요량 변화율(20%)이 가격 변화율(10%)보다 크므로 수요는 탄력적입니다(탄력성 > 1).",
    },
    {
      area: "Economics", type: "Macro Indicators", skill: "Define inflation", difficulty: "Standard",
      question: "What does inflation measure?",
      choices: [
        "The unemployment rate",
        "A general rise in the price level over time",
        "The total number of goods produced",
        "The value of exports",
      ],
      answer: "A general rise in the price level over time",
      why: "Inflation is the sustained increase in the overall price level, which reduces purchasing power.",
      whyKo: "인플레이션은 전반적인 물가 수준이 지속적으로 오르는 것으로, 구매력을 떨어뜨립니다.",
    },
  ],
  "ap-english-lang-workbook": [
    {
      area: "Rhetoric", type: "Thesis / Claim", skill: "Identify the function of a thesis", difficulty: "Standard",
      question: "In an argumentative essay, the thesis statement primarily serves to —",
      choices: [
        "summarize the sources used",
        "state the writer's main claim or position",
        "list every fact the essay contains",
        "entertain the reader with a story",
      ],
      answer: "state the writer's main claim or position",
      why: "A thesis presents the central argument the rest of the essay develops and supports.",
      whyKo: "논증적 글의 논지문(thesis)은 글 전체가 전개·뒷받침할 중심 주장을 제시하는 문장입니다.",
    },
    {
      area: "Rhetoric", type: "Style & Syntax", skill: "Recognize parallel structure", difficulty: "Advanced",
      question: "Which sentence uses parallel structure correctly?",
      choices: [
        "She likes reading, to write, and painting.",
        "She likes reading, writing, and painting.",
        "She likes to read, writing, and paint.",
        "She likes read, write, and to paint.",
      ],
      answer: "She likes reading, writing, and painting.",
      why: "Parallel structure keeps items in a series in the same grammatical form — here, three -ing gerunds.",
      whyKo: "병렬 구조는 나열되는 항목을 같은 문법 형태로 맞춥니다. 여기서는 -ing 동명사 세 개(reading, writing, painting)로 통일됩니다.",
    },
  ],
  "ap-us-history-workbook": [
    {
      area: "History", type: "Historical Thinking", skill: "Define a primary source", difficulty: "Standard",
      question: "Which of the following is a PRIMARY source?",
      choices: [
        "A modern textbook chapter about the 1700s",
        "A letter written by a soldier during the war",
        "An encyclopedia article summarizing an era",
        "A recent documentary narrated by a historian",
      ],
      answer: "A letter written by a soldier during the war",
      why: "A primary source is created by someone who witnessed or took part in the event; the soldier's letter is firsthand.",
      whyKo: "1차 사료는 사건을 직접 겪거나 목격한 사람이 남긴 자료입니다. 전쟁 중 군인이 쓴 편지가 이에 해당합니다(직접 증언).",
    },
    {
      area: "History", type: "Causation", skill: "Distinguish long-term from immediate causes", difficulty: "Advanced",
      question: "Which is best described as a LONG-TERM cause of a revolution?",
      choices: [
        "A single tax passed the week before",
        "Years of unfair taxation and lack of representation",
        "One protest on a single day",
        "A rumor spread in one town",
      ],
      answer: "Years of unfair taxation and lack of representation",
      why: "Long-term causes build up over time; a single event is an immediate (short-term) trigger.",
      whyKo: "장기적 원인은 오랜 시간에 걸쳐 누적됩니다. 단발성 사건은 즉각적(단기) 계기에 해당합니다. ‘수년간의 부당 과세·대표권 부재’가 장기적 원인입니다.",
    },
  ],
};

// ── AP Precalculus ───────────────────────────────────────
export const apPrecalcBank: SampleItem[] = [
  {
    area: "Functions", type: "Composition", skill: "Evaluate a composite function", difficulty: "Standard",
    question: "If f(x) = 2x + 1 and g(x) = x², what is f(g(3))?",
    choices: ["7", "10", "19", "37"],
    answer: "19",
    why: "g(3) = 3² = 9, then f(9) = 2(9) + 1 = 19.",
    whyKo: "g(3) = 3² = 9, 이어서 f(9) = 2(9) + 1 = 19. 합성함수는 안쪽 함수부터 먼저 계산합니다.",
    steps: ["g(3) = 9", "f(9) = 2(9) + 1", "= 19"],
  },
  {
    area: "Trigonometric Functions", type: "Unit Circle", skill: "Evaluate a trig function at a special angle", difficulty: "Advanced",
    question: "What is the exact value of sin(120°)?",
    choices: ["1/2", "√2/2", "√3/2", "−√3/2"],
    answer: "√3/2",
    why: "120° has a reference angle of 60° in the second quadrant, where sine is positive: sin(120°) = sin(60°) = √3/2.",
    whyKo: "120°의 참조각은 60°이고 2사분면에서는 sin이 양수입니다. 따라서 sin(120°) = sin(60°) = √3/2.",
  },
];

// ── Algebra 1 (US Curriculum, Course-Based) ───────────────
export const algebra1Bank: SampleItem[] = [
  {
    area: "Linear Equations and Inequalities", type: "Solving Equations", skill: "Solve a multi-step linear equation", difficulty: "Standard",
    question: "Solve for x: 3(x − 4) + 2 = 2x + 5",
    choices: ["x = 7", "x = 9", "x = 11", "x = 15"],
    answer: "x = 15",
    why: "Distribute, combine like terms, then isolate x: 3x − 10 = 2x + 5 → x = 15.",
    whyKo: "분배법칙을 적용한 뒤 동류항을 정리하고 x를 구합니다: 3x − 10 = 2x + 5 → x = 15.",
    steps: ["3x − 12 + 2 = 2x + 5", "3x − 10 = 2x + 5", "x = 15"],
  },
  {
    area: "Quadratic Functions", type: "Factoring", skill: "Solve a quadratic equation by factoring", difficulty: "Advanced",
    question: "Solve for x: x² − 5x + 6 = 0",
    choices: ["x = 2, 3", "x = −2, −3", "x = 1, 6", "x = −1, −6"],
    answer: "x = 2, 3",
    why: "Factor as (x − 2)(x − 3) = 0, so x = 2 or x = 3.",
    whyKo: "(x − 2)(x − 3) = 0 형태로 인수분해하면 x = 2 또는 x = 3입니다.",
    steps: ["x² − 5x + 6 = 0", "(x − 2)(x − 3) = 0", "x = 2 또는 x = 3"],
  },
];

// ── Algebra 2 (US Curriculum, Course-Based) ───────────────
export const algebra2Bank: SampleItem[] = [
  {
    area: "Exponential and Logarithmic Functions", type: "Solving Equations", skill: "Solve an exponential equation", difficulty: "Standard",
    question: "Solve for x: 2^(x+1) = 32",
    choices: ["x = 3", "x = 4", "x = 5", "x = 16"],
    answer: "x = 4",
    why: "Rewrite 32 as 2⁵, so x + 1 = 5, giving x = 4.",
    whyKo: "32를 2⁵로 바꾸면 x + 1 = 5이므로 x = 4입니다.",
    steps: ["2^(x+1) = 2⁵", "x + 1 = 5", "x = 4"],
  },
  {
    area: "Quadratic Functions", type: "Vertex Form", skill: "Find the vertex of a parabola", difficulty: "Advanced",
    question: "What is the vertex of f(x) = 2x² − 8x + 3?",
    choices: ["(2, −5)", "(−2, 27)", "(2, 3)", "(4, 3)"],
    answer: "(2, −5)",
    why: "The x-coordinate of the vertex is −b/2a = 8/4 = 2. Substituting gives f(2) = 2(4) − 16 + 3 = −5.",
    whyKo: "꼭짓점의 x좌표는 −b/2a = 8/4 = 2입니다. 대입하면 f(2) = 2(4) − 16 + 3 = −5.",
    steps: ["x = −b/2a = 8/4 = 2", "f(2) = 2(4) − 16 + 3", "= −5"],
    figure: "parabola-vertex",
  },
];

// ── US Curriculum, Grade-Based English (G1–G12) ───────────
export const ENGLISH_GRADE_SAMPLES: Record<string, SampleItem[]> = {
  G1: [
    {
      area: "Phonics and Sight Words", type: "Fill in the Blank", skill: "Use a sight word to complete a sentence", difficulty: "Foundation",
      question: "Fill in the blank with the correct word.\n\"___ is a sunny day.\"",
      choices: ["It", "Cat", "Run", "Jump"],
      answer: "It",
      why: "\"It\" is a common sight word used to start sentences about weather; the sentence needs a subject before \"is.\"",
      whyKo: "'It'은 날씨를 나타낼 때 문장 맨 앞에 자주 오는 사이트워드입니다. 'is' 앞에는 주어가 필요하므로 'It'이 들어갑니다.",
    },
  ],
  G2: [
    {
      area: "Short Passages", type: "Story Sequence", skill: "Identify the beginning of a story", difficulty: "Foundation",
      passage: "Mia woke up early. She brushed her teeth and ate breakfast. Then she packed her bag and walked to school with her dog, Max.",
      question: "What happens at the beginning of the story?",
      choices: ["Mia walks to school.", "Mia wakes up early.", "Mia packs her bag.", "Mia eats breakfast with Max."],
      answer: "Mia wakes up early.",
      why: "The first event in the passage is Mia waking up, which marks the beginning of the story.",
      whyKo: "이야기의 첫 번째 사건은 미아가 일찍 일어나는 것으로, 이것이 이야기의 '시작' 부분입니다.",
    },
  ],
  G3: [
    {
      area: "Context Clues", type: "Vocabulary in Context", skill: "Use context clues to determine word meaning", difficulty: "Standard",
      passage: "Ben felt famished after the long hike, so he quickly ate three sandwiches and a bag of chips.",
      question: "What does the word \"famished\" most likely mean?",
      choices: ["Tired", "Very hungry", "Happy", "Confused"],
      answer: "Very hungry",
      why: "The context clue \"quickly ate three sandwiches and a bag of chips\" shows Ben was extremely hungry, so \"famished\" means very hungry.",
      whyKo: "'세 개의 샌드위치와 과자 한 봉지를 빠르게 먹었다'는 문맥 단서로 보아 벤이 매우 배고팠다는 것을 알 수 있으므로, 'famished'는 '매우 배고픈'이라는 뜻입니다.",
    },
  ],
  G4: [
    {
      area: "Figurative Language (simile)", type: "Identify Simile", skill: "Recognize a simile in a sentence", difficulty: "Standard",
      question: "Which sentence contains a simile?",
      choices: ["The wind howled like a wolf.", "The wind blew hard.", "The trees shook in the storm.", "Rain fell on the roof."],
      answer: "The wind howled like a wolf.",
      why: "A simile compares two things using \"like\" or \"as.\" This sentence compares the wind's sound to a wolf's howl using \"like.\"",
      whyKo: "직유법(simile)은 'like'나 'as'를 사용해 두 대상을 비교하는 표현입니다. 이 문장은 바람 소리를 늑대의 울음소리에 'like'로 비유하고 있습니다.",
    },
  ],
  G5: [
    {
      area: "Point of View", type: "Narrative Perspective", skill: "Identify point of view in a passage", difficulty: "Standard",
      passage: "I couldn't believe my eyes when I saw the trophy with my name on it. All those months of practice had finally paid off.",
      question: "This passage is written from which point of view?",
      choices: ["First person", "Second person", "Third person limited", "Third person omniscient"],
      answer: "First person",
      why: "The narrator uses \"I\" and \"my,\" which signals a first-person point of view — the narrator is a character telling their own story.",
      whyKo: "서술자가 'I'와 'my'를 사용하는 것은 1인칭 시점의 특징입니다 — 서술자 자신이 이야기 속 인물로 등장해 자기 이야기를 전달합니다.",
    },
  ],
  G6: [
    {
      area: "Claim and Evidence", type: "Argument Analysis", skill: "Evaluate how evidence supports a claim", difficulty: "Standard",
      passage: "Claim: Schools should start later in the morning.\nEvidence: Studies show that teenagers who sleep more perform better on tests and report fewer symptoms of depression.",
      question: "Which best describes the relationship between the claim and the evidence?",
      choices: [
        "The evidence contradicts the claim.",
        "The evidence supports the claim with research findings.",
        "The evidence is unrelated to the claim.",
        "The evidence restates the claim without proof.",
      ],
      answer: "The evidence supports the claim with research findings.",
      why: "The evidence cites specific research findings (better test performance, fewer depression symptoms) that directly back up the claim about later school start times.",
      whyKo: "제시된 근거는 '시험 성적 향상'과 '우울 증상 감소'라는 구체적인 연구 결과를 들어 '등교 시간을 늦춰야 한다'는 주장을 직접적으로 뒷받침합니다.",
    },
  ],
  G7: [
    {
      area: "Literary Devices", type: "Figurative Language", skill: "Identify a simile and explain its effect", difficulty: "Standard",
      passage: "The old dog moved like a rusty gate, each step creaking with effort, but his eyes still sparkled like a puppy's.",
      question: "Which phrase from the passage is a simile, and what effect does it create?",
      choices: [
        "\"moved like a rusty gate\" — it compares the dog's slow, stiff movement to something mechanical and worn",
        "\"his eyes still sparkled\" — it shows the dog is happy",
        "\"each step creaking with effort\" — it describes the sound of footsteps",
        "\"like a puppy's\" — it means the dog is actually young",
      ],
      answer: "\"moved like a rusty gate\" — it compares the dog's slow, stiff movement to something mechanical and worn",
      why: "A simile uses 'like' or 'as' to compare two unlike things; comparing the dog's movement to a rusty gate emphasizes stiffness and age.",
      whyKo: "직유법은 'like'나 'as'를 사용해 서로 다른 두 대상을 비교합니다. 개의 움직임을 녹슨 문에 비유하면서 뻣뻣함과 나이 든 느낌을 강조합니다.",
      wrong: "The other options either misidentify the simile or misread its meaning.",
      wrongKo: "나머지 보기들은 직유를 잘못 짚었거나 의미를 잘못 해석한 것입니다.",
    },
  ],
  G8: [
    {
      area: "Argument Essays", type: "Claim and Counterclaim", skill: "Identify an effective counterclaim response", difficulty: "Standard",
      question: "A student argues that schools should start later in the morning. Which sentence BEST addresses a counterclaim?",
      choices: [
        "Some people think earlier start times teach discipline, but research shows teenagers' sleep cycles make early starts harmful to learning.",
        "Starting school later would make students happier.",
        "Most students dislike waking up early.",
        "Teachers also prefer later start times.",
      ],
      answer: "Some people think earlier start times teach discipline, but research shows teenagers' sleep cycles make early starts harmful to learning.",
      why: "An effective counterclaim response acknowledges the opposing view and then refutes it with evidence.",
      whyKo: "효과적인 반론 대응은 상대방의 주장을 먼저 인정한 뒤, 근거를 들어 반박하는 것입니다.",
    },
  ],
  G9: [
    {
      area: "Rhetorical Situation", type: "Audience and Purpose", skill: "Identify the rhetorical situation of a text", difficulty: "Standard",
      passage: "To the City Council: As a longtime resident, I am writing to request additional funding for our public library. Many families in our neighborhood rely on it for free internet access and after-school programs.",
      question: "What is the primary purpose of this passage?",
      choices: [
        "To entertain readers with a story",
        "To persuade the council to fund the library",
        "To inform readers about library hours",
        "To describe the history of the library",
      ],
      answer: "To persuade the council to fund the library",
      why: "The writer directly requests funding and provides reasons, which is a persuasive purpose aimed at a specific audience (the City Council).",
      whyKo: "글쓴이는 도서관 예산 지원을 직접 요청하고 이유를 제시하고 있으므로, 특정 청중(시의회)을 설득하려는 목적입니다.",
    },
  ],
  G10: [
    {
      area: "Synthesis Writing", type: "Outline Planning", skill: "Plan a synthesis essay using multiple sources", difficulty: "Advanced",
      question: "You are writing a synthesis essay arguing whether social media helps or harms teen mental health, using three sources with different viewpoints. Outline the structure of your essay, including how you will use each source.",
      answer: "Intro with a clear thesis; one body paragraph per major reason, each weaving in evidence from at least one source and explaining how it supports your claim; a paragraph addressing a counterargument from an opposing source; conclusion restating the synthesized position.",
      why: "A strong synthesis essay doesn't summarize sources one by one — it organizes ideas by theme/claim and uses sources as evidence for the writer's own argument.",
      whyKo: "좋은 종합 에세이(synthesis essay)는 출처를 하나씩 요약하지 않고, 주장별로 구성한 뒤 각 출처를 근거로 엮어 사용합니다.",
      steps: ["Thesis 문장 작성", "주장별로 단락 구성 (출처 근거 포함)", "반대 의견 단락 추가", "결론에서 종합된 입장 재진술"],
    },
  ],
  G11: [
    {
      area: "Rhetorical Analysis", type: "Essay Planning", skill: "Plan a rhetorical analysis essay", difficulty: "Advanced",
      question: "You must write a rhetorical analysis of a speech that uses repetition, a strong emotional appeal, and statistics. Outline how you would structure your essay body paragraphs.",
      answer: "One body paragraph per rhetorical strategy (repetition, pathos, statistics/logos), each identifying the specific technique, giving a textual example, and explaining its effect on the audience — rather than simply summarizing the speech's content.",
      why: "Rhetorical analysis focuses on HOW the author persuades, not WHAT the author says — organizing by strategy keeps the analysis focused.",
      whyKo: "수사적 분석(rhetorical analysis)은 저자가 '무엇을' 말했는지가 아니라 '어떻게' 설득하는지에 초점을 둡니다. 전략별로 단락을 구성하면 분석이 명확해집니다.",
      steps: ["전략 1: 반복법 — 예시 + 효과", "전략 2: 감정적 호소(pathos) — 예시 + 효과", "전략 3: 통계(logos) — 예시 + 효과"],
    },
  ],
  G12: [
    {
      area: "Research Paper Structure", type: "Outline Planning", skill: "Structure a college-level research paper", difficulty: "Advanced",
      question: "Outline the standard structure of a college-level argumentative research paper, from introduction to conclusion.",
      answer: "Introduction with context and a clear thesis; literature review or background section; body paragraphs organized by sub-claim, each supported by cited evidence and the writer's analysis; a paragraph addressing counterarguments; conclusion that synthesizes findings and suggests broader significance; Works Cited/References page.",
      why: "College research papers require explicit engagement with existing scholarship (not just opinion) and a clear logical progression from claim to evidence to significance.",
      whyKo: "대학 수준 연구 논문은 단순한 의견이 아니라 기존 연구와의 연계를 요구하며, 주장 → 근거 → 의의로 이어지는 명확한 논리 전개가 필요합니다.",
      steps: ["서론(배경+논제)", "선행연구/배경 설명", "본론(하위 주장별 단락, 인용 근거 포함)", "반론 대응 단락", "결론(종합+의의)", "참고문헌"],
    },
  ],
};

// ── US Curriculum, Grade-Based Math (G1–G12) ──────────────
export const MATH_GRADE_SAMPLES: Record<string, SampleItem[]> = {
  G1: [
    {
      area: "Addition and Subtraction within 20", type: "Word Problem", skill: "Add two numbers within 20", difficulty: "Standard",
      question: "There are 8 apples in a basket. 5 more apples are put in. How many apples are in the basket now?",
      choices: ["11", "12", "13", "14"],
      answer: "13",
      why: "Add the starting amount and the amount added: 8 + 5 = 13.",
      whyKo: "처음 있던 사과 수와 더 넣은 사과 수를 더합니다: 8 + 5 = 13.",
      steps: ["8 + 5", "= 13"],
    },
  ],
  G2: [
    {
      area: "Place Value to 1,000", type: "Place Value", skill: "Identify the value of a digit", difficulty: "Standard",
      question: "What is the value of the digit 6 in the number 462?",
      choices: ["6", "60", "600", "400"],
      answer: "60",
      why: "The digit 6 is in the tens place, so its value is 6 × 10 = 60.",
      whyKo: "숫자 6은 십의 자리에 있으므로 값은 6 × 10 = 60입니다.",
      steps: ["6은 십의 자리", "6 × 10 = 60"],
    },
  ],
  G3: [
    {
      area: "Multiplication and Division Facts", type: "Division", skill: "Divide to share equally", difficulty: "Standard",
      question: "A teacher has 24 pencils to share equally among 4 students. How many pencils does each student get?",
      choices: ["4", "5", "6", "8"],
      answer: "6",
      why: "Divide the total by the number of students: 24 ÷ 4 = 6.",
      whyKo: "전체 개수를 학생 수로 나눕니다: 24 ÷ 4 = 6.",
      steps: ["24 ÷ 4", "= 6"],
    },
  ],
  G4: [
    {
      area: "Equivalent Fractions", type: "Equivalent Fractions", skill: "Find an equivalent fraction", difficulty: "Standard",
      question: "Which fraction is equivalent to 2/3?",
      choices: ["4/6", "3/4", "5/6", "2/5"],
      answer: "4/6",
      why: "Multiply the numerator and denominator by the same number: 2/3 × 2/2 = 4/6.",
      whyKo: "분자와 분모에 같은 수를 곱합니다: 2/3 × 2/2 = 4/6.",
      steps: ["2/3 × 2/2", "= 4/6"],
    },
  ],
  G5: [
    {
      area: "Fraction Operations", type: "Adding Fractions", skill: "Add fractions with unlike denominators", difficulty: "Standard",
      question: "What is 3/4 + 1/8?",
      choices: ["4/12", "1/2", "7/12", "7/8"],
      answer: "7/8",
      why: "Rewrite 3/4 as 6/8 so the denominators match, then add: 6/8 + 1/8 = 7/8.",
      whyKo: "3/4를 6/8로 바꿔 분모를 같게 만든 뒤 더합니다: 6/8 + 1/8 = 7/8.",
      steps: ["3/4 = 6/8", "6/8 + 1/8", "= 7/8"],
    },
  ],
  G6: [
    {
      area: "Fractions/Decimals/Percents", type: "Percent of a Number", skill: "Find a percent of a quantity", difficulty: "Standard",
      question: "What is 25% of 60?",
      choices: ["12", "15", "20", "25"],
      answer: "15",
      why: "Convert 25% to the decimal 0.25, then multiply: 0.25 × 60 = 15.",
      whyKo: "25%를 소수 0.25로 바꾼 뒤 곱합니다: 0.25 × 60 = 15.",
      steps: ["25% = 0.25", "0.25 × 60", "= 15"],
    },
  ],
  G7: [
    {
      area: "Proportional Relationships", type: "Ratio Problem", skill: "Solve a proportion using cross-multiplication", difficulty: "Standard",
      question: "A recipe calls for 2 cups of flour for every 3 cups of sugar. If you use 9 cups of sugar, how many cups of flour do you need?",
      choices: ["4", "6", "7.5", "13.5"],
      answer: "6",
      why: "Set up a proportion comparing flour to sugar, then solve for the missing quantity using cross-multiplication.",
      whyKo: "밀가루와 설탕의 비율을 비례식으로 세운 뒤 외항·내항 곱으로 x를 구합니다: 2/3 = x/9 → x = 6.",
      steps: ["2/3 = x/9", "x = 2 × (9 ÷ 3)", "x = 6"],
    },
  ],
  G8: [
    {
      area: "Pythagorean Theorem", type: "Right Triangle", skill: "Find the hypotenuse using the Pythagorean theorem", difficulty: "Standard",
      question: "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
      figure: "right-triangle",
      choices: ["10", "14", "48", "100"],
      answer: "10",
      why: "Apply the Pythagorean theorem a² + b² = c² to find the hypotenuse of a right triangle given both legs.",
      whyKo: "피타고라스 정리 a² + b² = c²를 적용해 빗변의 길이를 구합니다: 6² + 8² = 100, c = 10.",
      steps: ["c² = 6² + 8²", "c² = 36 + 64 = 100", "c = 10"],
    },
  ],
  G9: [
    {
      area: "Linear and Quadratic Functions", type: "Quadratic Equation", skill: "Solve a quadratic equation by factoring out a common term", difficulty: "Standard",
      question: "Solve for t: −t² + 6t = 0",
      choices: ["t = 0 or t = 6", "t = 3 only", "t = 6 only", "t = −6 or 0"],
      answer: "t = 0 or t = 6",
      why: "Factor out the common term −t, then use the zero product property to find both solutions.",
      whyKo: "공통인수 −t를 묶어낸 뒤 영인자의 법칙을 적용해 두 해를 구합니다: −t(t − 6) = 0 → t = 0 또는 t = 6.",
      steps: ["−t² + 6t = 0", "−t(t − 6) = 0", "t = 0 또는 t = 6"],
    },
  ],
  G10: [
    {
      area: "Similarity", type: "Similar Triangles", skill: "Find a missing side using similar triangle ratios", difficulty: "Advanced",
      question: "Triangle ABC is similar to triangle DEF. If AB = 4, BC = 6, and DE = 10, what is EF?",
      choices: ["9", "12", "15", "24"],
      answer: "15",
      why: "Similar triangles have proportional corresponding sides. Set up a proportion between the known and unknown sides.",
      whyKo: "닮은 삼각형은 대응변의 비가 일정합니다. 알고 있는 변과 모르는 변 사이에 비례식을 세워 풉니다: 4/10 = 6/EF → EF = 15.",
      steps: ["AB/DE = BC/EF", "4/10 = 6/EF", "EF = 6 × (10 ÷ 4) = 15"],
    },
  ],
  G11: [
    {
      area: "Exponential and Log", type: "Logarithmic Equation", skill: "Convert a logarithmic equation to exponential form", difficulty: "Advanced",
      question: "Solve for x: log₂(x) = 5",
      choices: ["10", "25", "32", "64"],
      answer: "32",
      why: "Rewrite the logarithmic equation in exponential form to solve for x.",
      whyKo: "로그 방정식을 지수 형태로 바꿔 x를 구합니다: log₂(x) = 5 → x = 2⁵ = 32.",
      steps: ["log₂(x) = 5", "x = 2⁵", "x = 32"],
    },
  ],
  G12: [
    {
      area: "Trig Identities", type: "Pythagorean Identity", skill: "Apply the Pythagorean identity to find a trig value", difficulty: "Advanced",
      question: "If sin θ = 3/5 and θ is in Quadrant I, find cos θ.",
      choices: ["3/5", "4/5", "5/4", "5/3"],
      answer: "4/5",
      why: "Use the Pythagorean identity sin²θ + cos²θ = 1 to solve for cos θ, choosing the positive root since θ is in Quadrant I.",
      whyKo: "피타고라스 항등식 sin²θ + cos²θ = 1을 이용해 cosθ를 구합니다. θ가 1사분면에 있으므로 양의 값을 택합니다: cosθ = 4/5.",
      steps: ["sin²θ + cos²θ = 1", "(3/5)² + cos²θ = 1", "cos²θ = 1 − 9/25 = 16/25", "cosθ = 4/5"],
    },
  ],
};

// ── US Curriculum, Course-Based: Precalculus (non-AP) ─────
export const hsPrecalcBank: SampleItem[] = [
  {
    area: "Functions and Graphs", type: "Function Evaluation", skill: "Determine the domain of a function", difficulty: "Standard",
    question: "If f(x) = √(x − 3), what is the domain of f?",
    choices: ["x ≥ 3", "x > 3", "x ≤ 3", "All real numbers"],
    answer: "x ≥ 3",
    why: "The expression under a square root must be ≥ 0, so x − 3 ≥ 0, which gives x ≥ 3.",
    whyKo: "제곱근 안의 식은 0 이상이어야 하므로 x − 3 ≥ 0, 즉 x ≥ 3입니다.",
    steps: ["x − 3 ≥ 0", "x ≥ 3"],
  },
  {
    area: "Exponential and Log", type: "Logarithmic Equations", skill: "Solve a logarithmic equation", difficulty: "Advanced",
    question: "Solve for x: log₂(x) + log₂(x − 2) = 3",
    choices: ["x = 4", "x = −2", "x = 4 or x = −2", "x = 8"],
    answer: "x = 4",
    why: "Combine logs: log₂(x(x−2)) = 3, so x(x−2) = 2³ = 8. This gives x² − 2x − 8 = 0, which factors to (x−4)(x+2) = 0. Since x must be > 2 for the original logs to be defined, x = 4.",
    whyKo: "로그를 합치면 log₂(x(x−2)) = 3이므로 x(x−2) = 2³ = 8. x² − 2x − 8 = 0 → (x−4)(x+2) = 0. 원래 로그가 정의되려면 x > 2여야 하므로 x = 4만 답입니다.",
    steps: ["log₂(x(x−2)) = 3", "x(x−2) = 8", "x² − 2x − 8 = 0 → (x−4)(x+2) = 0", "x = 4 (x = −2는 정의역에서 제외)"],
  },
];

// ── US Curriculum, Course-Based: Calculus (non-AP) ────────
export const hsCalcBank: SampleItem[] = [
  {
    area: "Derivatives", type: "Power Rule", skill: "Differentiate a polynomial function", difficulty: "Standard",
    question: "Find the derivative of f(x) = 4x³ − 2x² + 7.",
    choices: ["12x² − 4x", "12x² − 4x + 7", "4x² − 2x", "12x³ − 4x"],
    answer: "12x² − 4x",
    why: "Apply the power rule to each term: d/dx(4x³) = 12x², d/dx(−2x²) = −4x, d/dx(7) = 0.",
    whyKo: "각 항에 거듭제곱 법칙을 적용합니다: 4x³의 도함수는 12x², −2x²의 도함수는 −4x, 상수 7의 도함수는 0입니다.",
    steps: ["d/dx(4x³) = 12x²", "d/dx(−2x²) = −4x", "d/dx(7) = 0", "f′(x) = 12x² − 4x"],
  },
  {
    area: "Applications of Derivatives", type: "Critical Points", skill: "Find and classify a critical point", difficulty: "Advanced",
    question: "For f(x) = x³ − 3x² + 2, find the x-value of the local minimum.",
    answer: "x = 2",
    why: "f′(x) = 3x² − 6x = 3x(x − 2) = 0 gives critical points x = 0 and x = 2. Since f″(x) = 6x − 6, f″(0) = −6 < 0 (local max) and f″(2) = 6 > 0 (local min). So the local minimum occurs at x = 2.",
    whyKo: "f′(x) = 3x² − 6x = 3x(x−2) = 0 → 임계점 x=0, x=2. f″(x) = 6x−6이므로 f″(0)=−6<0(극대), f″(2)=6>0(극소). 따라서 극솟값은 x=2에서 발생합니다.",
    steps: ["f′(x) = 3x² − 6x = 3x(x−2) = 0 → x = 0, 2", "f″(x) = 6x − 6", "f″(0) = −6 (극대), f″(2) = 6 (극소)", "극소점: x = 2"],
  },
];

// ── US Curriculum, Course-Based: Statistics (non-AP) ──────
export const hsStatsBank: SampleItem[] = [
  {
    area: "Exploring Data", type: "Measures of Center", skill: "Compute the median and mean, and identify the effect of an outlier", difficulty: "Standard",
    question: "A data set is: 4, 5, 6, 7, 38. Find the median and the mean, and explain why they differ so much.",
    answer: "Median = 6; Mean = 12. The median is much lower than the mean because the outlier (38) pulls the mean up but doesn't affect the median.",
    why: "Sorted data: 4, 5, 6, 7, 38 → median (middle value) = 6. Mean = (4+5+6+7+38)/5 = 60/5 = 12. The outlier 38 inflates the mean but has little effect on the median.",
    whyKo: "정렬된 자료: 4, 5, 6, 7, 38 → 중앙값(가운데 값) = 6. 평균 = (4+5+6+7+38)/5 = 60/5 = 12. 이상치 38이 평균을 끌어올리지만 중앙값에는 거의 영향을 주지 않습니다.",
    steps: ["정렬: 4, 5, 6, 7, 38", "중앙값 = 6", "평균 = (4+5+6+7+38)/5 = 60/5 = 12"],
  },
  {
    area: "Probability", type: "Independent Events", skill: "Compute the probability of independent events", difficulty: "Advanced",
    question: "A bag contains 3 red and 2 blue marbles. One marble is drawn, replaced, and a second marble is drawn. What is the probability both marbles are red?",
    choices: ["3/5", "6/25", "9/25", "3/10"],
    answer: "9/25",
    why: "Since the marble is replaced, the draws are independent: P(red) = 3/5 each time, so P(both red) = 3/5 × 3/5 = 9/25.",
    whyKo: "구슬을 다시 넣으므로(복원추출) 두 사건은 독립입니다. P(빨강) = 3/5이므로 P(둘 다 빨강) = 3/5 × 3/5 = 9/25.",
    steps: ["P(red) = 3/5", "복원추출 → 독립사건", "P(both red) = 3/5 × 3/5 = 9/25"],
  },
];

// ── AP Computer Science A (Java) ──────────────────────────
export const apCsABank: SampleItem[] = [
  {
    area: "Programming", type: "Iteration", skill: "Trace a for-loop", difficulty: "Standard",
    question: 'What is printed by the following code?\n\nint sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    sum += i;\n}\nSystem.out.println(sum);',
    choices: ["4", "6", "10", "15"],
    answer: "10",
    why: "The loop adds 1 + 2 + 3 + 4 = 10 to sum.",
    whyKo: "반복문이 1부터 4까지 더합니다: 1+2+3+4 = 10. for문은 i가 조건을 만족하는 동안 계속 실행됩니다.",
    steps: ["i=1: sum=1", "i=2: sum=3", "i=3: sum=6", "i=4: sum=10"],
  },
  {
    area: "Programming", type: "Boolean Logic", skill: "Evaluate a boolean expression", difficulty: "Standard",
    question: "int x = 5;\nboolean result = (x > 2) && (x < 10);\nWhat is the value of result?",
    choices: ["true", "false", "5", "Compile error"],
    answer: "true",
    why: "Both conditions (x > 2) and (x < 10) are true for x = 5, so the && (AND) expression evaluates to true.",
    whyKo: "x=5일 때 (x>2)와 (x<10) 모두 참이므로, && (AND) 연산의 결과는 true입니다.",
  },
];

export const apCsPrinciplesBank: SampleItem[] = [
  {
    area: "Computing Systems and Networks", type: "Network Topology", skill: "Interpret a network diagram", difficulty: "Standard",
    question: "The diagram shows four client devices connected to one central server. If the server goes down, what happens to communication between Client 1 and Client 2?",
    figure: "network-diagram",
    choices: [
      "It continues normally",
      "It stops, since all traffic routes through the server",
      "It gets faster",
      "Only Client 1 is affected",
    ],
    answer: "It stops, since all traffic routes through the server",
    why: "In a star topology, every device connects only to the central server, so a server failure disconnects communication between the clients.",
    whyKo: "스타(star) 토폴로지에서는 모든 장치가 중앙 서버를 거쳐 통신하므로, 서버가 다운되면 클라이언트 간 통신도 끊깁니다.",
  },
  {
    area: "Data", type: "Binary Representation", skill: "Convert binary to decimal", difficulty: "Standard",
    question: "What is the decimal value of the binary number 1011?",
    choices: ["9", "11", "13", "22"],
    answer: "11",
    why: "1011 in binary = 1×8 + 0×4 + 1×2 + 1×1 = 8 + 0 + 2 + 1 = 11.",
    whyKo: "1011(2) = 1×8 + 0×4 + 1×2 + 1×1 = 8+0+2+1 = 11.",
    steps: ["1×2³ = 8", "0×2² = 0", "1×2¹ = 2", "1×2⁰ = 1", "합계 = 11"],
  },
];

// ── AP Environmental Science ──────────────────────────────
export const apEnvSciBank: SampleItem[] = [
  {
    area: "Ecosystems", type: "Food Chain", skill: "Predict population effects", difficulty: "Standard",
    question: "The food chain diagram shows Grass → Rabbit → Fox. If a disease wiped out most of the rabbit population, what would most likely happen to the fox population?",
    figure: "food-chain",
    choices: ["It would increase", "It would decrease", "It would stay the same", "Foxes would start eating grass"],
    answer: "It would decrease",
    why: "Foxes depend on rabbits as a primary food source; losing that food source would reduce the fox population.",
    whyKo: "여우는 토끼를 주요 먹이로 삼으므로, 먹이가 줄면 여우 개체수도 감소합니다.",
  },
  {
    area: "Populations", type: "Carrying Capacity", skill: "Apply the concept of carrying capacity", difficulty: "Advanced",
    question: "A lake's fish population grows quickly, then levels off as food and space become limited. This leveling-off point is called the —",
    choices: ["Limiting factor", "Carrying capacity", "Biotic potential", "Ecological footprint"],
    answer: "Carrying capacity",
    why: "Carrying capacity is the maximum population size an environment can sustain long-term, given its resources.",
    whyKo: "수용력(carrying capacity)은 주어진 자원으로 환경이 장기적으로 유지할 수 있는 최대 개체수입니다.",
  },
  {
    area: "Populations", type: "Population Growth Model", skill: "Interpret a logistic growth curve and calculate rate of change", difficulty: "Advanced",
    question:
      "The graph shows a deer population introduced to an island over time.\n(a) Identify what the dashed line labeled K represents.\n(b) Explain why the population's growth rate slows as it approaches K.\n(c) The population was about 500 at year 40 and about 780 at year 80. Calculate the average rate of change in population per year over this interval.",
    figure: "logistic-growth",
    answer:
      "(a) K is the carrying capacity — the maximum population the environment can sustain long-term. (b) As the population nears K, resources such as food, water, and space become limiting, increasing competition, which raises the death rate and/or lowers the birth rate. (c) (780 − 500) ÷ (80 − 40) = 280 ÷ 40 = 7 deer per year.",
    why:
      "Logistic growth slows near K because density-dependent limiting factors (competition, disease, predation) intensify as resources per individual decrease.",
    whyKo:
      "(a) K는 수용력(carrying capacity)으로, 환경이 장기적으로 유지할 수 있는 최대 개체수입니다.\n(b) 개체수가 K에 가까워질수록 먹이·물·공간 같은 자원이 제한되어 경쟁이 심해지고, 그 결과 사망률이 높아지거나 출생률이 낮아집니다.\n(c) (780 − 500) ÷ (80 − 40) = 280 ÷ 40 = 연간 7마리.",
    steps: [
      "(a) 곡선이 평평해지는 지점의 값 = K",
      "(b) 자원 제한 → 밀도의존적 요인(경쟁·질병·포식) 증가 → 성장률 감소",
      "(c) (780 − 500) ÷ (80 − 40) = 280 ÷ 40 = 7마리/년",
    ],
  },
  {
    area: "Ecosystems", type: "Energy Flow", skill: "Apply the 10% energy transfer rule across trophic levels", difficulty: "Advanced",
    question:
      "The energy pyramid shows energy available at each trophic level in a grassland ecosystem.\n(a) Explain why only about 10% of the energy at one trophic level is transferred to the next.\n(b) If producers contain 10,000 kcal of energy, calculate how much energy is available to secondary consumers.\n(c) Explain one reason food chains rarely have more than 4–5 trophic levels.",
    figure: "trophic-pyramid",
    answer:
      "(a) Most energy is lost as heat through cellular respiration and other metabolic processes at each level, and some biomass is never consumed by the next level. (b) 10,000 × 0.10 × 0.10 = 100 kcal available to secondary consumers. (c) So little energy remains after a few transfers that there usually isn't enough left to support additional trophic levels.",
    why:
      "Only about 10% of energy at each trophic level is passed on (the 10% rule), since the rest is used for an organism's own life processes or lost as heat.",
    whyKo:
      "(a) 각 영양 단계에서 에너지 대부분은 세포호흡 등 생명 활동 중 열로 손실되고, 일부 생물량은 다음 단계에 섭취되지 않습니다.\n(b) 10,000 × 0.10 × 0.10 = 100 kcal.\n(c) 몇 단계를 거치면 남는 에너지가 너무 적어 추가 영양 단계를 유지할 수 없습니다.",
    steps: [
      "Producers → Primary Consumers: 10,000 × 0.10 = 1,000 kcal",
      "Primary → Secondary Consumers: 1,000 × 0.10 = 100 kcal",
    ],
  },
];

// ── AP Psychology ──────────────────────────────────────────
export const apPsychBank: SampleItem[] = [
  {
    area: "Learning", type: "Classical Conditioning", skill: "Identify conditioned/unconditioned stimuli", difficulty: "Standard",
    question: "A dog learns to salivate at the sound of a bell after the bell is repeatedly paired with food. In this scenario, the bell is the —",
    choices: ["Unconditioned stimulus", "Unconditioned response", "Conditioned stimulus", "Conditioned response"],
    answer: "Conditioned stimulus",
    why: "The bell was originally neutral but became associated with food through repeated pairing, making it the conditioned stimulus.",
    whyKo: "종소리는 원래 중립 자극이었지만, 먹이와 반복적으로 짝지어지며 조건 자극(conditioned stimulus)이 되었습니다.",
  },
  {
    area: "Memory", type: "Memory Systems", skill: "Distinguish types of long-term memory", difficulty: "Standard",
    question: "Remembering HOW to ride a bicycle (rather than facts about bicycles) is an example of —",
    choices: ["Semantic memory", "Episodic memory", "Procedural memory", "Sensory memory"],
    answer: "Procedural memory",
    why: "Procedural memory stores skills and how to perform tasks, such as riding a bike, distinct from memory for facts (semantic) or events (episodic).",
    whyKo: "절차 기억(procedural memory)은 자전거 타기처럼 ‘방법’에 대한 기억입니다. 사실에 대한 기억은 의미 기억, 경험한 사건에 대한 기억은 일화 기억입니다.",
  },
];

// ── AP Human Geography ─────────────────────────────────────
export const apHumanGeoBank: SampleItem[] = [
  {
    area: "Population", type: "Demographic Transition", skill: "Interpret the demographic transition model", difficulty: "Advanced",
    question: "A country has low birth rates, low death rates, and slow population growth. This is most typical of which stage of the demographic transition model?",
    choices: ["Stage 1 (pre-industrial)", "Stage 2 (early industrial)", "Stage 4 (post-industrial)", "There is no such stage"],
    answer: "Stage 4 (post-industrial)",
    why: "Stage 4 is characterized by both low birth and death rates, resulting in slow or stable population growth, typical of developed economies.",
    whyKo: "4단계(후기 산업화)는 출생률과 사망률이 모두 낮아 인구 증가가 느리거나 안정적인 단계로, 선진국에서 흔히 나타납니다.",
  },
  {
    area: "Migration", type: "Push-Pull Factors", skill: "Classify migration factors", difficulty: "Standard",
    question: "A family leaves their home country due to a lack of jobs and moves to a country with better employment opportunities. The lack of jobs is an example of a —",
    choices: ["Pull factor", "Push factor", "Intervening obstacle", "Step migration"],
    answer: "Push factor",
    why: "Push factors are conditions that drive people away from a location, such as a lack of jobs; pull factors attract people to a new location.",
    whyKo: "배출 요인(push factor)은 사람들을 원래 지역에서 밀어내는 조건(예: 일자리 부족)이고, 흡인 요인(pull factor)은 새로운 지역으로 끌어들이는 조건입니다.",
  },
];

// ── AP US Government and Politics ──────────────────────────
export const apGovBank: SampleItem[] = [
  {
    area: "Foundations", type: "Checks and Balances", skill: "Identify a constitutional check", difficulty: "Standard",
    question: "Which action is an example of the legislative branch checking the executive branch?",
    choices: [
      "The President vetoes a bill",
      "The Senate confirms or rejects a presidential nominee",
      "The Supreme Court rules a law unconstitutional",
      "The President issues an executive order",
    ],
    answer: "The Senate confirms or rejects a presidential nominee",
    why: "Senate confirmation of presidential appointments is a legislative check on executive power.",
    whyKo: "상원의 대통령 지명자 인준(또는 거부)은 입법부가 행정부를 견제하는 권한입니다.",
  },
  {
    area: "Federalism", type: "Division of Powers", skill: "Classify powers as federal, state, or shared", difficulty: "Standard",
    question: "The power to issue driver's licenses belongs primarily to —",
    choices: ["The federal government", "State governments", "The judicial branch only", "International treaties"],
    answer: "State governments",
    why: "Under federalism, powers not delegated to the federal government — like issuing driver's licenses — are reserved to the states.",
    whyKo: "연방주의 아래, 연방정부에 위임되지 않은 권한(예: 운전면허 발급)은 주정부에 남아 있습니다(수정헌법 10조).",
  },
];

// ── AP Art History ──────────────────────────────────────────
// 실제 작품 이미지는 저작권 문제로 포함하지 않고, 양식적 특징을 글로
// 설명한 뒤 그 특징으로 시대·양식을 추론하는 형태로 구성했습니다.
export const apArtHistoryBank: SampleItem[] = [
  {
    area: "Later Europe and Americas", type: "Style Identification", skill: "Identify a style from its formal features", difficulty: "Advanced",
    question: "A cathedral is described as having pointed arches, ribbed vaults, flying buttresses, and large stained-glass windows that let in colored light. This building is most likely an example of which style?",
    choices: ["Romanesque", "Gothic", "Baroque", "Neoclassical"],
    answer: "Gothic",
    why: "Pointed arches, ribbed vaults, flying buttresses, and large stained-glass windows are hallmark structural and decorative features of Gothic architecture.",
    whyKo: "뾰족한 아치, 리브 볼트, 플라잉 버트레스, 큰 스테인드글라스 창은 고딕 건축의 대표적인 구조·장식적 특징입니다.",
  },
  {
    area: "Content & Form", type: "Vocabulary in Context", skill: "Apply art-historical vocabulary", difficulty: "Standard",
    question: 'A sculpture shows a standing figure with its weight shifted onto one leg, causing the hips and shoulders to tilt in opposite directions. This pose is called —',
    choices: ["Foreshortening", "Contrapposto", "Chiaroscuro", "Linear perspective"],
    answer: "Contrapposto",
    why: "Contrapposto describes a figure standing with weight on one leg, creating a naturalistic counter-tilt in the hips and shoulders — common in Classical and Renaissance sculpture.",
    whyKo: "콘트라포스토(contrapposto)는 한쪽 다리에 무게를 싣고 서서 엉덩이와 어깨가 반대 방향으로 살짝 기울어지는 자연스러운 자세로, 고전·르네상스 조각에서 자주 나타납니다.",
  },
];

// ── AP Music Theory ──────────────────────────────────────────
export const apMusicTheoryBank: SampleItem[] = [
  {
    area: "Melody & Harmony", type: "Interval Identification", skill: "Identify an interval on the staff", difficulty: "Standard",
    question: "The staff shows two notes: C and E. What interval do these two notes form?",
    figure: "music-staff",
    choices: ["A second", "A third", "A fourth", "A fifth"],
    answer: "A third",
    why: "C to E spans three letter names (C, D, E), making it a third — specifically a major third.",
    whyKo: "C에서 E까지는 음이름 세 개(C, D, E)에 걸쳐 있으므로 3도(third) 음정입니다(장3도).",
  },
  {
    area: "Music Fundamentals", type: "Key Signatures", skill: "Identify scale degree relationships", difficulty: "Advanced",
    question: "In the key of C major, which scale degree is the dominant?",
    choices: ["The 2nd degree (D)", "The 4th degree (F)", "The 5th degree (G)", "The 7th degree (B)"],
    answer: "The 5th degree (G)",
    why: "The dominant is the 5th scale degree; in C major, that is G, a key pitch for building tension that resolves back to the tonic (C).",
    whyKo: "딸림음(dominant)은 음계의 5번째 음입니다. C장조에서는 G이며, 으뜸음(C)으로 해결되는 긴장감을 만드는 핵심 음입니다.",
  },
];
