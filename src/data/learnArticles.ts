export interface LearnArticle {
  slug: string;
  title: string;
  subtitle: string;
  readMin: number;
  sections: { heading: string; paragraphs: string[] }[];
  relatedTrack?: string; // /books?track=
}

export const learnArticles: LearnArticle[] = [
  {
    slug: "what-is-sr",
    title: "SR(Reading Level)이란 무엇인가요?",
    subtitle: "숫자의 의미와, 학년과의 관계",
    readMin: 3,
    sections: [
      {
        heading: "SR은 ‘현재 읽기 수준’의 참고 지표입니다",
        paragraphs: [
          "SR(Reading Level)은 학생이 편하게 읽고 이해할 수 있는 글의 수준을 숫자로 나타낸 참고 지표입니다. 예를 들어 SR 3.8은 대략 3학년 8개월 수준의 읽기 능력을 의미합니다.",
          "다만 SR은 절대적인 기준이 아니라 교재·지문 난이도를 고를 때 도움을 주는 참고값입니다. 같은 SR이라도 어휘력, 배경지식, 문제 유형 경험에 따라 체감 난이도는 달라질 수 있습니다.",
        ],
      },
      {
        heading: "책을 많이 읽는데 SR 점수가 안 오르는 이유",
        paragraphs: [
          "그냥 읽는 것과 SR 문제를 푸는 것은 다릅니다. Main Idea(중심 내용), Inference(추론), Vocabulary in Context(문맥 어휘) 같은 유형은 지문을 이해하고도 ‘무엇을 묻는지’ 파악하는 연습이 필요합니다.",
          "그래서 독서와 함께 유형별 연습을 병행하면, 문제에서 요구하는 사고 과정에 익숙해지는 데 도움이 됩니다.",
        ],
      },
    ],
    relatedTrack: "level-test",
  },
  {
    slug: "how-many-pages",
    title: "우리 아이에게 몇 페이지가 적당할까?",
    subtitle: "40P / 60P / 100P, 무엇을 기준으로 고를까",
    readMin: 3,
    sections: [
      {
        heading: "페이지 수보다 ‘준비 기간과 목적’이 먼저입니다",
        paragraphs: [
          "더 많은 페이지가 항상 더 좋은 선택은 아닙니다. 시험까지 남은 기간과 현재 수준에 따라 필요한 학습량이 달라집니다.",
          "시간이 얼마 없다면 핵심 유형만 빠르게 점검하는 40P, 균형 잡힌 기본 연습이 필요하면 60P, 충분한 반복과 집중이 필요하면 100P가 적합합니다. 처음이라면 부담 없는 Starter(25P)로 품질을 먼저 확인할 수도 있습니다.",
        ],
      },
      {
        heading: "하루 몇 페이지가 좋을까요?",
        paragraphs: [
          "무리한 분량보다 매일 꾸준히가 중요합니다. 보통 하루 2~4페이지로 시작해 아이의 집중 시간과 흐름에 맞춰 조절하시길 권합니다.",
        ],
      },
    ],
    relatedTrack: "level-test",
  },
  {
    slug: "reading-level-vs-grade",
    title: "학년이 같다고 실력까지 같은 것은 아닙니다",
    subtitle: "Reading Level과 학교 학년의 차이",
    readMin: 2,
    sections: [
      {
        heading: "같은 학년, 다른 수준",
        paragraphs: [
          "같은 학년이라도 학생마다 Reading Level, 어휘력, 문법·쓰기 능력은 다릅니다. 학년만 보고 교재를 고르면 너무 쉽거나 너무 어려운 경우가 생깁니다.",
          "그래서 학년과 함께 현재 수준(가능하면 SR 또는 학원 Level), 준비하는 시험을 함께 고려하는 것이 좋습니다.",
        ],
      },
      {
        heading: "학년보다 쉬운 교재를 골라도 괜찮습니다",
        paragraphs: [
          "개념이 부족하다고 느낄 때는 한 단계 쉬운 구성으로 자신감을 먼저 쌓는 편이 효과적입니다. 기초가 탄탄해지면 자연스럽게 다음 단계로 넘어갈 수 있습니다.",
        ],
      },
    ],
    relatedTrack: "level-test",
  },
  {
    slug: "placement-test-guide",
    title: "레벨테스트, 이렇게 준비하세요",
    subtitle: "어학원·학교 입학/승급 평가 대비",
    readMin: 3,
    sections: [
      {
        heading: "무조건 어려운 문제보다, 약한 영역 먼저",
        paragraphs: [
          "레벨테스트는 학년만 보고 준비하지 않습니다. Reading, Vocabulary, Grammar, Writing 중 어느 영역에서 점수를 잃는지 먼저 확인하고, 그 부분을 집중적으로 준비하는 것이 효과적입니다.",
          "특히 긴 지문에서 내용을 이해하고도 답을 급하게 골라 틀리는 경우가 많습니다. 근거를 지문에서 찾는 습관을 들이는 연습이 도움이 됩니다.",
        ],
      },
      {
        heading: "짧게 나눠서 꾸준히",
        paragraphs: [
          "저학년일수록 한 번에 많은 양보다 하루 20~30분씩 나눠서 하면 부담이 적습니다. 시험 유형에 익숙해지는 것이 목표입니다.",
        ],
      },
    ],
    relatedTrack: "level-test",
  },
];
