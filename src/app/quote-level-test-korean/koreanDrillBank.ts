// 맞춤법·받아쓰기 드릴 — 7세 후반(한글 뗀 뒤)부터 초5~6까지 5단계
// 시리즈입니다. 받아쓰기 수요는 초1~초2에 몰려 있고(학교 받아쓰기 시험이
// 이 시기에 집중), 초3부터는 "받아쓰기"보다 "맞춤법 드릴"이라는 이름이
// 더 자연스럽습니다(띄어쓰기·헷갈리는 말 중심으로 바뀝니다). 받아쓰기
// 단계(7세 후반·초1·초2)는 PDF 특성상 학부모가 직접 불러주는 방식이라,
// 해설집 앞쪽에 "불러주기 대본"을 포함합니다. choices가 없는 문항은
// 듣고 받아쓰는 형식이라 선택지 대신 빈 줄 + 정답/해설 토글로 보여줍니다.

export interface DrillItem {
  question: string;
  choices?: string[];
  answer: string;
  whyKo: string;
}

export interface KoreanDrillTier {
  key: string;
  label: string;
  categoryLabel: "받아쓰기" | "맞춤법 드릴";
  content: string;
  hasParentScript: boolean;
  items: DrillItem[];
}

export const koreanDrillTiers: KoreanDrillTier[] = [
  {
    key: "age7late",
    label: "7세 후반 (한글 뗀 뒤)",
    categoryLabel: "받아쓰기",
    content: "받침 없는 낱말 → 쉬운 받침 낱말 받아쓰기",
    hasParentScript: true,
    items: [
      {
        question: "불러주는 낱말을 듣고 받아쓰세요.",
        answer: "나무",
        whyKo: "받침이 없는 쉬운 낱말입니다. 소리 나는 대로 '나무'라고 적으면 됩니다.",
      },
      {
        question: "불러주는 낱말을 듣고 받아쓰세요.",
        answer: "손",
        whyKo: "받침 'ㄴ'이 있는 쉬운 낱말입니다. 소리 나는 대로 적으면 맞습니다.",
      },
    ],
  },
  {
    key: "g1",
    label: "초1",
    categoryLabel: "받아쓰기",
    content: "학교 받아쓰기 대비: 겹받침, 소리와 다른 글자(같이→가치), 문장 부호",
    hasParentScript: true,
    items: [
      {
        question: "불러주는 낱말을 듣고 받아쓰세요.",
        answer: "닭",
        whyKo: "겹받침 'ㄺ'이 있는 낱말입니다. 소리는 [닥]으로 나지만 받침은 ㄺ으로 적습니다.",
      },
      {
        question: "불러주는 낱말을 듣고 받아쓰세요.",
        answer: "같이",
        whyKo: "소리는 [가치]로 나지만, 적을 때는 '같이'로 적어야 합니다(구개음화).",
      },
    ],
  },
  {
    key: "g2",
    label: "초2",
    categoryLabel: "받아쓰기",
    content: "긴 문장 받아쓰기, 기본 띄어쓰기",
    hasParentScript: true,
    items: [
      {
        question: "불러주는 문장을 듣고 받아쓰세요.",
        answer: "오늘은 날씨가 맑습니다.",
        whyKo: "문장 부호(.)까지 정확히, 띄어쓰기에 맞춰 적어야 합니다.",
      },
      {
        question: "다음 중 띄어쓰기가 올바른 문장을 고르세요.",
        choices: ["나는학교에간다", "나는 학교에 간다", "나는학교에 간다", "나는 학교에간다"],
        answer: "나는 학교에 간다",
        whyKo: "낱말과 낱말 사이는 띄어 써야 합니다.",
      },
    ],
  },
  {
    key: "g3-4",
    label: "초3~4",
    categoryLabel: "맞춤법 드릴",
    content: "헷갈리는 말(되/돼, 안/않, 맞히다/맞추다), 띄어쓰기 규칙",
    hasParentScript: false,
    items: [
      {
        question: "다음 중 맞춤법에 맞는 표현을 고르세요.",
        choices: ["안 돼요", "안 되요", "않 되요", "안되 요"],
        answer: "안 돼요",
        whyKo: "'되다'의 활용형 '돼(되어)'가 와야 하며, '안'은 '아니'의 준말로 띄어 씁니다.",
      },
      {
        question: "다음 중 맞춤법에 맞는 표현을 고르세요.",
        choices: ["문제를 맞추다", "문제를 맞히다", "문제를 마추다", "문제를 맞후다"],
        answer: "문제를 맞히다",
        whyKo: "정답을 골라내는 것은 '맞히다', 대상끼리 서로 비교해 조정하는 것은 '맞추다'입니다. 문제의 정답을 고르는 상황이므로 '맞히다'가 맞습니다.",
      },
    ],
  },
  {
    key: "g5-6",
    label: "초5~6",
    categoryLabel: "맞춤법 드릴",
    content: "틀리기 쉬운 맞춤법, 문장 고쳐 쓰기",
    hasParentScript: false,
    items: [
      {
        question: "다음 중 맞춤법에 맞는 표현을 고르세요.",
        choices: ["역할", "역활", "역할히", "영할"],
        answer: "역할",
        whyKo: "'역할'이 맞는 표기이며 '역활'은 흔히 틀리는 잘못된 표기입니다.",
      },
      {
        question: "다음 문장에서 맞춤법이 틀린 부분을 찾아 바르게 고쳐 쓰세요.\n나는 웬지 오늘 기분이 좋다.",
        answer: "나는 왠지 오늘 기분이 좋다.",
        whyKo: "'웬지'는 잘못된 표기이며, '왜인지'의 준말인 '왠지'가 올바른 표기입니다.",
      },
    ],
  },
];
