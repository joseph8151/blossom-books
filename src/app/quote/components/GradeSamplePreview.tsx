"use client";

import { useState } from "react";
import { FileSearch, Check, PenLine } from "lucide-react";

interface MCQ {
  question: string;
  choices: string[];
  answer: string;
}

interface GradeSample {
  key: string;
  label: string;
  gradeKo: string;
  reading: { title: string; passage: string; questions: MCQ[] };
  vocabulary: MCQ[];
  essay: { prompt: string; note: string };
}

// 학년대별 Reading Level(SR)에 맞춰 지문 길이·어휘·문장 구조를 조정한 샘플입니다.
// SR 수치는 내부 기준이며 고객에게는 노출하지 않습니다.
const GRADES: GradeSample[] = [
  {
    key: "G2",
    label: "G2",
    gradeKo: "초등학교 2학년",
    reading: {
      title: "The Kite That Flew Away",
      passage: `Mia got a new kite for her birthday. It was red and yellow, with a long tail. She could not wait to fly it. Every night that week, she looked at the kite and dreamed about flying it in the sky.

On Saturday, Mia and her dad went to the park. The wind was strong and cool. "Perfect kite weather!" said her dad. They found an open field with lots of soft green grass and no trees nearby.

Mia held the string tightly. She ran across the grass as fast as she could. The kite lifted into the air. It flew higher and higher. Mia laughed and clapped her hands. Some other kids at the park stopped to watch her kite dance in the sky.

Soon, the kite was so high that it looked like a small dot in the sky. Mia felt very proud. She had never flown a kite this high before. Her dad took a picture so she could remember the moment.

Then, a strong gust of wind blew. The string pulled hard. Mia tried to hold on, but her hands were tired from running and gripping the string. Suddenly, the string slipped out of her fingers!

"Oh no!" Mia cried. The kite floated away, far above the trees. Mia felt sad. She watched the kite get smaller and smaller until she could not see it anymore. A few tears rolled down her cheeks.

Her dad gave her a big hug. "Don't worry," he said. "We can get a new kite. Kites are meant to fly free sometimes." He wiped her tears and held her hand as they walked back to the car.

The next week, Mia's dad surprised her with a new kite. This one was blue with silver stars on it, and it sparkled in the sunlight. Mia smiled. "This time," she said, "I will tie the string to my wrist so it can never fly away!"

They went back to the same park on another windy afternoon. The wind was just as strong as before. Mia flew her new kite high in the sky, and this time, she held on very carefully and remembered what had happened last time. She did not let it go.

At the end of the day, Mia and her dad walked home together, tired and happy. The sun was starting to set, painting the sky orange and pink. Mia could not wait to fly her kite again next weekend.`,
      questions: [
        {
          question: "What happened to Mia's first kite?",
          choices: ["She gave it to her dad", "It flew away in the wind", "It broke on the ground", "She left it at home"],
          answer: "It flew away in the wind",
        },
        {
          question: "What did Mia do differently with her new kite?",
          choices: ["She flew it inside", "She tied the string to her wrist", "She did not fly it at all", "She gave it to a friend"],
          answer: "She tied the string to her wrist",
        },
      ],
    },
    vocabulary: [
      {
        question: 'A strong gust of wind blew the kite away. "Gust" means ___.',
        choices: ["a sudden rush of wind", "a type of bird", "a loud sound", "a small rock"],
        answer: "a sudden rush of wind",
      },
      {
        question: 'Mia felt very proud when her kite flew high. "Proud" means ___.',
        choices: ["sad", "pleased with yourself", "tired", "afraid"],
        answer: "pleased with yourself",
      },
      {
        question: 'Mia held the string tightly. "Tightly" means ___.',
        choices: ["loosely", "firmly", "slowly", "quietly"],
        answer: "firmly",
      },
    ],
    essay: {
      prompt:
        "Imagine you found a magic kite that could take you anywhere. Write 3–4 sentences about where you would fly and what you would see.",
      note: "채점 기준: 장소 + 보이는 것 1가지 이상 포함, 완전한 문장으로 작성했는지.",
    },
  },
  {
    key: "G3",
    label: "G3",
    gradeKo: "초등학교 3학년",
    reading: {
      title: "The Backpack Mix-Up",
      passage: `Every student in Ms. Carter's third-grade class owned the exact same blue backpack. The school had ordered them in bulk at the start of the year, so from a distance, it was nearly impossible to tell them apart. Most students had stopped even looking at the tags.

On Monday morning, Jordan grabbed a backpack from the coat hooks and rushed to catch the bus. He didn't think twice about it—after all, his backpack was always on the same hook, third from the left.

During math class, Jordan reached into his backpack for a pencil and instead pulled out a bright pink notebook covered in stickers of cats and rainbows. He blinked in confusion. This definitely was not his.

Jordan peeked inside further and found a half-eaten granola bar, a library book about dolphins, and a name tag that read "Property of Emma R." His stomach sank. He had grabbed the wrong backpack!

Across the room, Emma was having a similar problem. She had opened her backpack expecting her math homework, but instead found a tangled mess of fishing line and a small plastic container full of wriggling worms. She let out a small shriek, which made the whole class turn and stare.

"Emma, is everything alright?" asked Ms. Carter, walking over with a concerned look on her face.

"I think," Emma said slowly, holding up the container of worms at arm's length, "someone has my backpack."

Jordan raised his hand immediately, his face turning red with embarrassment. "I think that's mine," he admitted, standing up from his desk. "I grabbed the wrong one this morning. They look identical!"

The class burst into laughter, and even Ms. Carter couldn't help but smile. "Well," she said, trying to keep a straight face, "it looks like we have a classic case of mistaken identity. Let's switch these back before anyone forgets their homework."

Jordan and Emma walked to the front of the room and traded backpacks, both relieved to have their own belongings again. From that day on, Ms. Carter suggested that everyone write their initials in big letters on their backpack tags so this would never happen again.

As he packed up to go home that afternoon, Jordan smiled to himself. At least now, he thought, no one would ever mistake his backpack for someone else's—especially not one full of fishing worms.`,
      questions: [
        {
          question: "Why did Jordan and Emma end up with each other's backpacks?",
          choices: ["They traded on purpose", "The backpacks looked identical", "Ms. Carter gave them the wrong ones", "They have the same name"],
          answer: "The backpacks looked identical",
        },
        {
          question: "How did Jordan most likely feel when he realized his mistake?",
          choices: ["Proud", "Embarrassed", "Angry", "Bored"],
          answer: "Embarrassed",
        },
      ],
    },
    vocabulary: [
      {
        question: 'The backpacks looked identical. "Identical" means ___.',
        choices: ["exactly alike", "very different", "broken", "expensive"],
        answer: "exactly alike",
      },
      {
        question: 'Jordan felt relieved to have his own backpack back. "Relieved" means ___.',
        choices: ["worried", "no longer anxious", "angry", "confused"],
        answer: "no longer anxious",
      },
      {
        question: 'Emma let out a small shriek. "Shriek" means ___.',
        choices: ["a quiet whisper", "a sudden sharp cry", "a type of animal", "a long nap"],
        answer: "a sudden sharp cry",
      },
    ],
    essay: {
      prompt:
        "Write a short story (4–6 sentences) about a time you — or a made-up character — accidentally grabbed the wrong item. What happened next?",
      note: "채점 기준: 사건의 시작–전개–결말 포함, 등장인물의 감정 표현 1가지 이상.",
    },
  },
  {
    key: "G5",
    label: "G5",
    gradeKo: "초등학교 5학년",
    reading: {
      title: "The Last Lighthouse Keeper",
      passage: `For nearly forty years, Samuel Hale had tended the lighthouse on Raven's Point, guiding ships safely past the jagged rocks that lurked beneath the waves. Now, as automated systems replaced lighthouse keepers across the coast one by one, Samuel's days at Raven's Point were numbered, and he knew it.

Each evening, he climbed the spiral staircase to the lamp room, his knees creaking in protest with every step, and lit the great lens that sent its beam sweeping across the dark water. It was a ritual he had performed thousands of times, yet it never lost its significance to him. Somewhere out on that horizon, he often thought, a sailor was counting on his light to find the way home.

Samuel's granddaughter, Lucy, had come to visit for the summer while her parents sorted out a move across the country. She found the solitude of the lighthouse unsettling at first—no neighbors, no traffic, no phone signal most days, just the relentless crash of waves against stone. But as the weeks passed, she began to understand why her grandfather had chosen this life.

"Doesn't it get lonely?" Lucy asked one evening, watching the beam rotate steadily overhead.

Samuel considered the question for a long moment. "Lonely isn't quite the right word," he said finally. "I think of it as keeping watch. There's a difference between being alone and being needed."

Lucy didn't fully understand what he meant until the night the storm hit. The wind howled against the windows, and rain lashed the tower with a fury that made the whole structure tremble. Through the chaos, Samuel noticed something troubling: a fishing vessel, far off course, drifting dangerously close to the rocks.

Without hesitation, he radioed the coast guard, then climbed to the lamp room and adjusted the beam, holding it steady on the struggling boat until help arrived. Lucy watched him work, his weathered hands sure and calm despite the danger, and she finally understood his quiet sense of purpose.

The following month, when the automated light was installed and Samuel's job officially ended, he stood on the rocks one last time, watching the new beacon flicker to life on its own. It was efficient, certainly—but Lucy noticed her grandfather's eyes were distant, remembering every ship he had guided home.

"Will you miss it?" she asked.

Samuel smiled faintly. "The light doesn't need me anymore," he said. "But I like to think, somewhere out there, it still remembers."`,
      questions: [
        {
          question: "What does Samuel mean when he says, \"There's a difference between being alone and being needed\"?",
          choices: [
            "He prefers living without any company",
            "Having a purpose makes solitude feel different from loneliness",
            "He wants Lucy to leave him alone",
            "He is afraid of the ocean",
          ],
          answer: "Having a purpose makes solitude feel different from loneliness",
        },
        {
          question: "During the storm, what does Samuel do that shows his sense of responsibility?",
          choices: [
            "He calls Lucy to help him evacuate",
            "He radios the coast guard and guides the fishing boat with the light",
            "He waits for the storm to pass before acting",
            "He turns off the lighthouse to save power",
          ],
          answer: "He radios the coast guard and guides the fishing boat with the light",
        },
      ],
    },
    vocabulary: [
      {
        question: 'Lucy found the solitude of the lighthouse unsettling. "Solitude" most nearly means ___.',
        choices: ["the state of being alone", "a loud celebration", "a type of storm", "a long journey"],
        answer: "the state of being alone",
      },
      {
        question: 'She heard the relentless crash of waves against stone. "Relentless" most nearly means ___.',
        choices: ["occasional and gentle", "constant and unyielding", "quiet and calm", "random and unpredictable"],
        answer: "constant and unyielding",
      },
      {
        question: 'Lucy watched his weathered hands, sure and calm. "Weathered" most nearly means ___.',
        choices: ["soft and new", "worn by time and experience", "injured and painful", "cold and numb"],
        answer: "worn by time and experience",
      },
    ],
    essay: {
      prompt:
        "Creative Essay — Write a short narrative (8–10 sentences) from the perspective of an object that has \"done its job\" for many years and is now being replaced (for example, an old lighthouse, a worn-out pair of shoes, or a retired robot). Describe how it feels and what it remembers.",
      note: "채점 기준: 1인칭 관점 유지, 구체적인 기억·감정 묘사 2가지 이상, 자연스러운 결말.",
    },
  },
  {
    key: "G6",
    label: "G6",
    gradeKo: "초등학교 6학년",
    reading: {
      title: "The Last Lighthouse Keeper",
      passage: `For nearly forty years, Samuel Hale had tended the lighthouse on Raven's Point, guiding ships safely past the jagged rocks that lurked beneath the waves. Now, as automated systems replaced lighthouse keepers across the coast one by one, Samuel's days at Raven's Point were numbered, and he knew it.

Each evening, he climbed the spiral staircase to the lamp room, his knees creaking in protest with every step, and lit the great lens that sent its beam sweeping across the dark water. It was a ritual he had performed thousands of times, yet it never lost its significance to him. Somewhere out on that horizon, he often thought, a sailor was counting on his light to find the way home.

Samuel's granddaughter, Lucy, had come to visit for the summer while her parents sorted out a move across the country. She found the solitude of the lighthouse unsettling at first—no neighbors, no traffic, no phone signal most days, just the relentless crash of waves against stone. But as the weeks passed, she began to understand why her grandfather had chosen this life.

"Doesn't it get lonely?" Lucy asked one evening, watching the beam rotate steadily overhead.

Samuel considered the question for a long moment. "Lonely isn't quite the right word," he said finally. "I think of it as keeping watch. There's a difference between being alone and being needed."

Lucy didn't fully understand what he meant until the night the storm hit. The wind howled against the windows, and rain lashed the tower with a fury that made the whole structure tremble. Through the chaos, Samuel noticed something troubling: a fishing vessel, far off course, drifting dangerously close to the rocks.

Without hesitation, he radioed the coast guard, then climbed to the lamp room and adjusted the beam, holding it steady on the struggling boat until help arrived. Lucy watched him work, his weathered hands sure and calm despite the danger, and she finally understood his quiet sense of purpose.

The following month, when the automated light was installed and Samuel's job officially ended, he stood on the rocks one last time, watching the new beacon flicker to life on its own. It was efficient, certainly—but Lucy noticed her grandfather's eyes were distant, remembering every ship he had guided home.

"Will you miss it?" she asked.

Samuel smiled faintly. "The light doesn't need me anymore," he said. "But I like to think, somewhere out there, it still remembers."`,
      questions: [
        {
          question: "What does Samuel mean when he says, \"There's a difference between being alone and being needed\"?",
          choices: [
            "He prefers living without any company",
            "Having a purpose makes solitude feel different from loneliness",
            "He wants Lucy to leave him alone",
            "He is afraid of the ocean",
          ],
          answer: "Having a purpose makes solitude feel different from loneliness",
        },
        {
          question: "During the storm, what does Samuel do that shows his sense of responsibility?",
          choices: [
            "He calls Lucy to help him evacuate",
            "He radios the coast guard and guides the fishing boat with the light",
            "He waits for the storm to pass before acting",
            "He turns off the lighthouse to save power",
          ],
          answer: "He radios the coast guard and guides the fishing boat with the light",
        },
      ],
    },
    vocabulary: [
      {
        question: 'Lucy found the solitude of the lighthouse unsettling. "Solitude" most nearly means ___.',
        choices: ["the state of being alone", "a loud celebration", "a type of storm", "a long journey"],
        answer: "the state of being alone",
      },
      {
        question: 'She heard the relentless crash of waves against stone. "Relentless" most nearly means ___.',
        choices: ["occasional and gentle", "constant and unyielding", "quiet and calm", "random and unpredictable"],
        answer: "constant and unyielding",
      },
      {
        question: 'Lucy watched his weathered hands, sure and calm. "Weathered" most nearly means ___.',
        choices: ["soft and new", "worn by time and experience", "injured and painful", "cold and numb"],
        answer: "worn by time and experience",
      },
    ],
    essay: {
      prompt:
        "Creative Essay — Write a short narrative (8–10 sentences) from the perspective of an object that has \"done its job\" for many years and is now being replaced (for example, an old lighthouse, a worn-out pair of shoes, or a retired robot). Describe how it feels and what it remembers.",
      note: "채점 기준: 1인칭 관점 유지, 구체적인 기억·감정 묘사 2가지 이상, 자연스러운 결말.",
    },
  },
];

type ContentType = "reading" | "vocabulary" | "essay";
const TYPE_LABEL: Record<ContentType, string> = { reading: "Reading", vocabulary: "Vocabulary", essay: "Creative Essay" };
const OPTION_LETTERS = ["A", "B", "C", "D"];

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

export default function GradeSamplePreview() {
  const [gradeKey, setGradeKey] = useState(GRADES[0].key);
  const [type, setType] = useState<ContentType>("reading");
  const [showAnswer, setShowAnswer] = useState(false);
  const grade = GRADES.find((g) => g.key === gradeKey)!;

  function switchGrade(key: string) {
    setGradeKey(key);
    setShowAnswer(false);
  }
  function switchType(t: ContentType) {
    setType(t);
    setShowAnswer(false);
  }

  const wc = wordCount(grade.reading.passage);
  const approxWords = `약 ${Math.round(wc / 10) * 10} words`;

  return (
    <section className="border-b border-ivory-300 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[880px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-label text-[11px] uppercase tracking-[0.2em] text-brass-500">Sample Preview by Grade</p>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[30px]">
            학년별 샘플을 먼저 확인하세요.
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-charcoal-600">
            Reading · Vocabulary · Creative Essay — 학년 수준에 맞춰 난이도를 조정한 샘플입니다. 실제 기출이
            아닌 독립 제작 예시입니다.
          </p>
        </div>

        {/* 학년 선택 */}
        <div className="mt-8 flex justify-center gap-2">
          {GRADES.map((g) => (
            <button
              key={g.key}
              type="button"
              aria-pressed={gradeKey === g.key}
              onClick={() => switchGrade(g.key)}
              className={`border px-5 py-2 text-[13px] font-medium transition-colors ${
                gradeKey === g.key
                  ? "border-navy-900 bg-navy-950 text-ivory-100"
                  : "border-ivory-300 bg-ivory-100 text-navy-900 hover:border-navy-900"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-[11.5px] text-charcoal-600/70">{grade.gradeKo} 수준</p>

        {/* 콘텐츠 유형 탭 */}
        <div className="mt-6 flex justify-center gap-2">
          {(Object.keys(TYPE_LABEL) as ContentType[]).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => switchType(t)}
              className={`border px-4 py-1.5 text-[12.5px] font-medium transition-colors ${
                type === t
                  ? "border-brass-500 bg-brass-500/10 text-brass-500"
                  : "border-ivory-300 text-charcoal-600 hover:border-navy-800/40"
              }`}
            >
              {TYPE_LABEL[t]}
            </button>
          ))}
        </div>

        {/* Reading */}
        {type === "reading" && (
          <div className="mt-6 border border-navy-800/15 bg-ivory-100 p-5 sm:p-7">
            <div className="border border-navy-800/12 bg-white">
              <div className="flex items-center justify-between gap-1.5 border-b border-navy-800/10 px-4 py-2">
                <span className="font-label text-[9.5px] uppercase tracking-[0.14em] text-navy-800/60">Passage</span>
                <span className="font-label text-[9px] uppercase tracking-[0.1em] text-navy-800/45">{approxWords}</span>
              </div>
              <div className="max-h-72 overflow-y-auto px-5 py-4">
                <p className="mb-2 font-display text-[16px] font-semibold text-navy-950">{grade.reading.title}</p>
                <p
                  className="whitespace-pre-line text-[13.5px] leading-[1.85] text-charcoal-900"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {grade.reading.passage}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {grade.reading.questions.map((q, qi) => (
                <div key={qi}>
                  <p className="text-[13.5px] font-medium leading-relaxed text-navy-950">
                    {qi + 1}. {q.question}
                  </p>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {q.choices.map((c, ci) => (
                      <div key={ci} className="flex items-center gap-2.5 border border-navy-800/15 bg-white px-3 py-2 text-[13px] text-charcoal-900">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-navy-800/25 font-label text-[10.5px] font-semibold text-navy-800">
                          {OPTION_LETTERS[ci]}
                        </span>
                        {c}
                      </div>
                    ))}
                  </div>
                  {showAnswer && (
                    <p className="mt-2 inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/10 px-2.5 py-1 text-[12.5px] font-medium text-navy-950">
                      <Check size={12} className="text-brass-500" strokeWidth={2.5} /> {q.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAnswer((v) => !v)}
              className="mt-4 text-[12px] font-medium text-navy-800/70 underline underline-offset-2 transition-colors hover:text-navy-900"
            >
              {showAnswer ? "정답 숨기기" : "정답 보기"}
            </button>
          </div>
        )}

        {/* Vocabulary */}
        {type === "vocabulary" && (
          <div className="mt-6 border border-navy-800/15 bg-ivory-100 p-5 sm:p-7">
            <div className="space-y-5">
              {grade.vocabulary.map((q, qi) => (
                <div key={qi}>
                  <p className="text-[13.5px] font-medium leading-relaxed text-navy-950">
                    {qi + 1}. {q.question}
                  </p>
                  <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {q.choices.map((c, ci) => (
                      <div key={ci} className="flex items-center gap-2.5 border border-navy-800/15 bg-white px-3 py-2 text-[13px] text-charcoal-900">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-navy-800/25 font-label text-[10.5px] font-semibold text-navy-800">
                          {OPTION_LETTERS[ci]}
                        </span>
                        {c}
                      </div>
                    ))}
                  </div>
                  {showAnswer && (
                    <p className="mt-2 inline-flex items-center gap-1.5 border border-brass-500/40 bg-brass-500/10 px-2.5 py-1 text-[12.5px] font-medium text-navy-950">
                      <Check size={12} className="text-brass-500" strokeWidth={2.5} /> {q.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAnswer((v) => !v)}
              className="mt-4 text-[12px] font-medium text-navy-800/70 underline underline-offset-2 transition-colors hover:text-navy-900"
            >
              {showAnswer ? "정답 숨기기" : "정답 보기"}
            </button>
          </div>
        )}

        {/* Creative Essay */}
        {type === "essay" && (
          <div className="mt-6 border border-navy-800/15 bg-ivory-100 p-5 sm:p-7">
            <p className="flex items-center gap-1.5 font-label text-[9.5px] uppercase tracking-[0.12em] text-charcoal-600/60">
              <PenLine size={12} className="text-brass-500" /> Creative Essay
            </p>
            <p className="mt-3 text-[13.5px] font-medium leading-relaxed text-navy-950">{grade.essay.prompt}</p>

            <div className="mt-4 border border-navy-800/12 bg-white p-4">
              <p className="font-label text-[9px] uppercase tracking-[0.1em] text-charcoal-600/60">Write your response</p>
              <div className="mt-3 space-y-3">
                <div className="h-px w-full bg-navy-800/12" />
                <div className="h-px w-full bg-navy-800/12" />
                <div className="h-px w-full bg-navy-800/12" />
                <div className="h-px w-2/3 bg-navy-800/12" />
              </div>
            </div>

            <p className="mt-4 text-[12.5px] leading-relaxed text-charcoal-700">{grade.essay.note}</p>
          </div>
        )}

        <p className="mt-5 flex items-start gap-2 text-[11.5px] leading-relaxed text-charcoal-600/60">
          <FileSearch size={13} className="mt-0.5 shrink-0 text-brass-500" />
          실제 기출·유출문제가 아닌, 학년별 평가 Skill을 참고해 독립 제작한 예시입니다. 학생 수준에 맞춰 실제
          구성은 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
