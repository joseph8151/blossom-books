// "교재 샘플 보기" 콘텐츠 — 전부 Blossom Books가 독립적으로 제작한 예시이며
// 실제 IB 기출문제·공식 Markscheme을 복제하지 않습니다. 모든 상품 카드에는
// 이 파일의 샘플이 하나씩 연결됩니다("샘플 준비중" 없음).

export interface IbDataPage {
  kind: "data";
  caption: string;
  figure?: string;
  table?: { headers: string[]; rows: string[][] };
  note?: string;
  extraQuestion?: { prompt: string; answer: string };
}

export interface IbProblemPart {
  label: string;
  prompt: string;
}

export interface IbProblemPage {
  kind: "problem";
  topic: string;
  stimulus?: string;
  figure?: string;
  parts: IbProblemPart[];
  checksFor: string[];
}

export interface IbExplanationEntry {
  label: string;
  why?: string;
  approach: string;
  working?: string;
  answer: string;
  commonMistake?: string;
}

export interface IbExplanationPage {
  kind: "explanation";
  entries: IbExplanationEntry[];
}

export interface IbChecklistPage {
  kind: "checklist";
  title: string;
  items: string[];
}

export interface IbPlannerPage {
  kind: "planner";
  title: string;
  columns: string[];
  note?: string;
  figure?: string;
}

export interface IbFlowPage {
  kind: "flow";
  title: string;
  steps: string[];
  note?: string;
}

export interface IbTermsPage {
  kind: "terms";
  title: string;
  terms: { term: string; meaning: string; example: string }[];
  note?: string;
}

export interface IbExamHeaderPage {
  kind: "examHeader";
  subject: string;
  info: { label: string; value: string }[];
}

export interface IbResultPage {
  kind: "result";
  title: string;
  bars: { label: string; filled: number }[]; // filled: 0~5
  note: string;
}

export type IbPage =
  | IbDataPage
  | IbProblemPage
  | IbExplanationPage
  | IbChecklistPage
  | IbPlannerPage
  | IbFlowPage
  | IbTermsPage
  | IbExamHeaderPage
  | IbResultPage;

export interface IbSample {
  id: string;
  pages: IbPage[];
}

// ── A. IB 맞춤 문제집 — 과목별 샘플 ───────────────────────
export const SUBJECT_SAMPLES: Record<string, IbSample> = {
  "math-aa": {
    id: "math-aa",
    pages: [
      {
        kind: "problem",
        topic: "Functions",
        parts: [
          { label: "(a)", prompt: "A function is defined by f(x) = 2x² − 8x + 3. Find f(1)." },
          { label: "(b)", prompt: "Find the x-coordinate of the vertex of the graph of f." },
        ],
        checksFor: ["대입과 계산", "꼭짓점 공식 적용"],
      },
      {
        kind: "data",
        caption: "y = f(x)의 그래프",
        figure: "parabola-vertex",
        extraQuestion: {
          prompt: "(c) Explain whether f has a minimum or a maximum value, and state it.",
          answer: "x = 2에서 최솟값 −5 (a = 2 > 0이므로 그래프가 위로 열려 있어 최솟값을 가집니다).",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "(a)",
            approach: "x = 1을 f(x)에 대입해 계산 순서대로 정리합니다.",
            working: "f(1) = 2(1)² − 8(1) + 3 = 2 − 8 + 3",
            answer: "f(1) = −3",
            commonMistake: "−8(1)의 부호를 잘못 처리해 +8로 계산하는 실수가 흔합니다.",
          },
          {
            label: "(b)",
            why: "ax² + bx + c 꼴에서 꼭짓점의 x좌표는 −b/2a입니다.",
            approach: "a = 2, b = −8임을 확인하고 공식에 대입합니다.",
            working: "x = −(−8) / (2×2) = 8/4",
            answer: "x = 2",
            commonMistake: "부호를 빠뜨리고 x = −2로 답하는 경우가 많습니다.",
          },
          {
            label: "(c)",
            why: "x²의 계수(a = 2)가 양수이므로 그래프는 위로 열린 포물선입니다.",
            approach: "x = 2에서의 함숫값을 구해 최솟값을 확인합니다.",
            working: "f(2) = 2(4) − 16 + 3 = −5",
            answer: "x = 2에서 최솟값 −5",
            commonMistake: "a의 부호를 확인하지 않고 최댓값이라고 단정하는 경우가 있습니다.",
          },
        ],
      },
    ],
  },
  "math-ai": {
    id: "math-ai",
    pages: [
      {
        kind: "problem",
        topic: "Statistics & Modeling",
        stimulus: "어떤 도시의 연도별 대중교통 이용률(가상의 자료)을 조사했다.",
        parts: [
          { label: "(a)", prompt: "Describe the trend shown by the data." },
          { label: "(b)", prompt: "Calculate the average rate of change between 2021 and 2024." },
        ],
        checksFor: ["표에서 경향 읽기", "변화율 계산"],
      },
      {
        kind: "data",
        caption: "연도별 대중교통 이용률 (%)",
        table: {
          headers: ["연도", "2020", "2021", "2022", "2023", "2024"],
          rows: [["이용률 (%)", "41", "38", "45", "52", "58"]],
        },
        note: "가상의 데이터입니다.",
        extraQuestion: {
          prompt: "(c) Using the trend, predict the utilisation rate in 2026, and state one limitation of this prediction.",
          answer: "약 64~70% 사이로 추정 가능하나, 2025~2026년의 실제 정책·인프라 변화에 따라 달라질 수 있어 외삽에는 한계가 있습니다.",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "(a)",
            approach: "2020→2021 구간과 그 이후 구간을 나누어 설명합니다.",
            answer: "2020년에서 2021년 사이에는 소폭 감소했지만, 이후 2024년까지 꾸준히 증가하는 추세입니다.",
            commonMistake: "전체를 '계속 증가'로만 설명해 초반 감소 구간을 놓치는 경우가 있습니다.",
          },
          {
            label: "(b)",
            approach: "변화율 = (나중 값 − 처음 값) ÷ 걸린 기간.",
            working: "(58 − 38) ÷ (2024 − 2021) = 20 ÷ 3",
            answer: "연평균 약 6.7%p 증가",
            commonMistake: "전체 구간(2020~2024)을 기준으로 계산해 질문이 요구한 기간과 다른 값을 내는 경우가 있습니다.",
          },
          {
            label: "(c)",
            approach: "최근 추세를 연장하되, 데이터 범위를 벗어난 예측의 한계를 함께 언급합니다.",
            answer: "약 64~70%로 추정할 수 있으나, 외삽이므로 확실하지 않습니다.",
            commonMistake: "예측값만 쓰고 한계를 설명하지 않는 경우가 있습니다.",
          },
        ],
      },
    ],
  },
  biology: {
    id: "biology",
    pages: [
      {
        kind: "problem",
        topic: "Cell Biology — Photosynthesis",
        parts: [
          { label: "1.", prompt: "Describe the trend shown by the data." },
          { label: "2.", prompt: "Explain one biological reason for this trend." },
        ],
        checksFor: ["그래프에서 경향 읽기", "원인 설명"],
      },
      {
        kind: "data",
        caption: "서로 다른 빛의 세기에서 측정한 광합성 속도(가상 데이터)",
        figure: "saturation-curve",
        table: {
          headers: ["빛의 세기", "0", "10", "20", "30", "40", "50"],
          rows: [["산소 기포 수/분", "0", "4", "9", "13", "15", "15"]],
        },
        extraQuestion: {
          prompt: "3. Predict what may happen to the rate if carbon dioxide concentration were increased at the highest light intensity.",
          answer: "CO₂가 제한 요인이었다면, 농도를 높였을 때 속도가 다시 증가할 수 있습니다.",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "1.",
            approach: "그래프의 구간을 나누어 변화 방향을 설명합니다.",
            answer: "빛의 세기가 낮을 때는 속도가 빠르게 증가하지만, 약 40 이상에서는 더 이상 증가하지 않고 일정해집니다(plateau).",
            commonMistake: "평평해지는 구간을 놓치고 '계속 증가한다'고만 쓰는 경우가 많습니다.",
          },
          {
            label: "2.",
            why: "속도가 멈추는 구간에서는 빛이 아닌 다른 요인이 제한 요인이 됩니다.",
            approach: "저광도·고광도 구간에서 제한 요인이 다름을 구분합니다.",
            answer: "빛이 부족할 때는 빛의 세기가 제한 요인이지만, 빛이 충분해지면 이산화탄소 농도나 온도가 제한 요인이 됩니다.",
            commonMistake: "모든 구간에서 빛이 유일한 제한 요인이라고 설명하는 경우가 많습니다.",
          },
          {
            label: "3.",
            approach: "고광도 구간에서 속도가 멈춘 원인을 바탕으로 추론합니다.",
            answer: "CO₂ 농도를 높이면 속도가 다시 증가할 수 있습니다.",
            commonMistake: "데이터와 무관한 근거 없는 추측을 쓰는 경우가 있습니다.",
          },
        ],
      },
    ],
  },
  chemistry: {
    id: "chemistry",
    pages: [
      {
        kind: "problem",
        topic: "Kinetics — Reaction Rate",
        stimulus: "같은 온도에서 반응물 농도를 달리하며 반응 속도를 측정했다(가상 데이터).",
        parts: [
          { label: "(a)", prompt: "Describe how the reaction rate changes as concentration increases." },
          { label: "(b)", prompt: "Calculate the reaction rate when the concentration is 0.6 mol dm⁻³, using the data." },
        ],
        checksFor: ["표에서 경향 읽기", "값 추정·계산", "결과 해석"],
      },
      {
        kind: "data",
        caption: "농도에 따른 반응 속도 (가상 데이터)",
        figure: "line-graph",
        table: {
          headers: ["농도 (mol dm⁻³)", "0.1", "0.2", "0.3", "0.4", "0.5"],
          rows: [["속도 (mol dm⁻³ s⁻¹)", "0.02", "0.04", "0.06", "0.08", "0.10"]],
        },
        extraQuestion: {
          prompt: "(c) Explain why the rate increases as concentration increases, in terms of collision theory.",
          answer: "농도가 높아지면 단위 부피당 입자 수가 늘어 유효 충돌 빈도가 증가하므로 반응 속도가 빨라집니다.",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "(a)",
            approach: "표의 값이 일정한 비율로 변하는지 확인합니다.",
            answer: "농도가 증가할수록 반응 속도도 비례해서 증가합니다(선형 관계).",
            commonMistake: "'증가한다'고만 쓰고 비례 관계(선형)라는 점을 언급하지 않는 경우가 있습니다.",
          },
          {
            label: "(b)",
            approach: "표의 선형 패턴(농도 0.1당 속도 0.02)을 이용해 추정합니다.",
            working: "0.6 ÷ 0.1 × 0.02",
            answer: "0.12 mol dm⁻³ s⁻¹",
            commonMistake: "표에 없는 값이라고 포기하거나, 가장 가까운 값을 그대로 쓰는 경우가 있습니다.",
          },
          {
            label: "(c)",
            why: "충돌 이론에 따르면 반응은 입자 간 유효 충돌에서 일어납니다.",
            approach: "농도 변화가 충돌 빈도에 미치는 영향을 설명합니다.",
            answer: "농도가 높아지면 단위 부피당 입자 수가 늘어 충돌 빈도가 증가해 반응 속도가 빨라집니다.",
            commonMistake: "충돌 이론을 언급하지 않고 결과(속도 증가)만 서술하는 경우가 있습니다.",
          },
        ],
      },
    ],
  },
  physics: {
    id: "physics",
    pages: [
      {
        kind: "problem",
        topic: "Mechanics — Forces",
        stimulus: "그림은 수평면 위에 놓인 물체에 작용하는 힘을 나타낸다.",
        figure: "force-diagram",
        parts: [
          { label: "(a)", prompt: "State the names of the forces labeled N, W, F and f." },
          { label: "(b)", prompt: "Calculate the net horizontal force on the object." },
        ],
        checksFor: ["Diagram 읽기", "Known/Unknown 정리", "계산"],
      },
      {
        kind: "data",
        caption: "같은 상황, 속도–시간 그래프",
        figure: "vt-graph",
        extraQuestion: {
          prompt: "(c) Calculate the distance traveled during the first 4 seconds, and explain what a steeper line would represent.",
          answer: "거리 = ½×4×8 = 16 m. 더 가파른 직선은 더 큰 가속도(더 큰 알짜힘)를 의미합니다.",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "(a)",
            approach: "그림에서 각 화살표의 방향과 위치를 확인합니다.",
            answer: "N = 수직항력, W = 중력(무게), F = 가한 힘, f = 마찰력",
            commonMistake: "N과 W를 서로 바꿔 부르는 경우가 있습니다.",
          },
          {
            label: "(b)",
            why: "수평 방향으로는 F와 f만 작용합니다.",
            approach: "F에서 f를 뺍니다.",
            working: "10 N − 4 N",
            answer: "6 N (F 방향)",
            commonMistake: "수직 방향의 N, W까지 모두 더해 계산하는 경우가 있습니다.",
          },
          {
            label: "(c)",
            why: "v–t 그래프 아래 넓이는 이동 거리를 나타냅니다.",
            approach: "삼각형 넓이 공식을 적용합니다.",
            working: "½ × 4 × 8",
            answer: "16 m. 기울기가 가파를수록 가속도(= 알짜힘/질량)가 큽니다.",
            commonMistake: "넓이 대신 기울기를 거리로 착각하는 경우가 있습니다.",
          },
        ],
      },
    ],
  },
  economics: {
    id: "economics",
    pages: [
      {
        kind: "problem",
        topic: "Microeconomics — Costs of Production",
        stimulus: "상품 A의 주요 원재료 가격이 상승해, 생산비가 전반적으로 증가했다고 가정하자.",
        parts: [
          { label: "Describe", prompt: "Describe what is shown by the diagram before the cost increase (point E)." },
          { label: "Explain", prompt: "Explain why an increase in production costs would shift the supply curve to the left." },
        ],
        checksFor: ["그래프 읽기", "원인-결과 설명"],
      },
      {
        kind: "data",
        caption: "상품 A 시장의 공급·수요 (비용 증가 이전)",
        figure: "supply-demand",
        extraQuestion: {
          prompt: "Analyse / Evaluate — 비용 증가로 공급 곡선이 왼쪽으로 이동할 때 균형가격·균형거래량에 미치는 영향을 분석하고, 생산자가 이 비용을 소비자에게 전가하는 것이 항상 가능한지 평가하시오.",
          answer: "공급 감소로 균형가격은 상승, 균형거래량은 감소합니다. 다만 소비자의 가격 민감도(수요의 가격탄력성)가 높다면 비용을 모두 전가하기 어려울 수 있습니다.",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "Describe",
            approach: "그래프 위 요소(S, D, E)를 그대로 설명합니다.",
            answer: "점 E는 공급과 수요가 만나는 시장 균형점으로, 균형가격과 균형거래량을 나타냅니다.",
            commonMistake: "균형의 의미를 설명하지 않고 'E는 교점이다'라고만 쓰는 경우가 있습니다.",
          },
          {
            label: "Explain",
            why: "생산비가 오르면 같은 가격에서 생산할 유인이 줄어듭니다.",
            approach: "비용과 공급량의 관계를 연결합니다.",
            answer: "생산비가 증가하면 같은 가격에서 공급할 수 있는 양이 줄어들어, 공급 곡선이 왼쪽(위)으로 이동합니다.",
            commonMistake: "그래프 방향(왼쪽/오른쪽)을 반대로 설명하는 경우가 있습니다.",
          },
          {
            label: "Analyse / Evaluate",
            approach: "먼저 분석(가격·거래량 변화)을 제시한 뒤, 평가(전가 가능성의 조건)로 마무리합니다.",
            answer: "균형가격 상승·균형거래량 감소. 전가 가능 여부는 수요의 가격탄력성에 따라 달라집니다.",
            commonMistake: "분석만 하고 평가(한계·조건)를 생략하는 경우가 많습니다.",
          },
        ],
      },
    ],
  },
  business: {
    id: "business",
    pages: [
      {
        kind: "problem",
        topic: "International Business — Market Entry",
        stimulus:
          "Maru Foods는 국내에서 꾸준히 성장해 온 소규모 식품회사다. 최근 경영진은 해외 시장(동남아시아) 진출을 검토하고 있으며, 현지 기업과의 합작 투자(joint venture)와 단독 진출 두 가지 방식을 비교하고 있다.",
        parts: [
          { label: "Explain", prompt: "Explain one reason why Maru Foods might consider a joint venture rather than entering the market alone." },
          { label: "Analyse", prompt: "Analyse one risk Maru Foods might face when entering the Southeast Asian market." },
        ],
        checksFor: ["사례 읽기", "개념 적용", "위험 분석"],
      },
      {
        kind: "data",
        caption: "같은 Case, 다른 질문 동사",
        note: "같은 Case라도 질문 동사에 따라 필요한 답안의 깊이가 달라집니다.\n\nExplain — 이유 하나를 근거와 함께 제시\nAnalyse — 요소를 나누어 관계를 보여줌\nEvaluate — 장단점을 비교하고 판단",
        extraQuestion: {
          prompt: "Evaluate — Evaluate whether a joint venture is the better market entry strategy for Maru Foods.",
          answer: "합작 투자는 현지 지식과 네트워크를 활용할 수 있다는 장점이 있지만, 이익과 통제권을 나눠야 한다는 한계도 있습니다. 회사의 자원과 위험 감수 성향에 따라 판단이 달라집니다.",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "Explain",
            approach: "사례의 상황(해외 진출 검토)과 개념(합작 투자의 장점)을 연결합니다.",
            answer: "현지 기업과의 합작은 현지 시장 지식과 유통망을 빠르게 활용할 수 있어, 단독 진출보다 리스크를 줄일 수 있습니다.",
            commonMistake: "일반적인 합작 투자 장점만 나열하고 Maru Foods의 상황과 연결하지 않는 경우가 있습니다.",
          },
          {
            label: "Analyse",
            approach: "위험을 한 가지 제시한 뒤, 그것이 회사에 미치는 영향까지 설명합니다.",
            answer: "문화·소비자 선호 차이로 인해 제품이 현지 시장에서 받아들여지지 않을 위험이 있으며, 이는 매출 부진과 초기 투자 손실로 이어질 수 있습니다.",
            commonMistake: "위험만 나열하고 그 영향(결과)까지 분석하지 않는 경우가 많습니다.",
          },
        ],
      },
    ],
  },
  ess: {
    id: "ess",
    pages: [
      {
        kind: "problem",
        topic: "Pollution & Water Systems",
        stimulus: "호수 X 주변에는 농지가 있으며, 비료 사용량이 지난 10년간 꾸준히 늘었다.",
        parts: [
          { label: "(a)", prompt: "Describe the relationship shown by the data." },
          { label: "(b)", prompt: "Suggest one likely cause of the rising nitrogen concentration." },
        ],
        checksFor: ["자료에서 경향 읽기", "원인 추론"],
      },
      {
        kind: "data",
        caption: "호수 X 유역, 10년간 질소 농도와 조류(algae) 발생 빈도(가상 데이터)",
        figure: "line-graph",
        table: {
          headers: ["연도", "2016", "2018", "2020", "2022", "2024"],
          rows: [
            ["질소 농도 (mg/L)", "0.8", "1.3", "1.9", "2.6", "3.1"],
            ["조류 대발생 (일수/년)", "2", "6", "14", "25", "34"],
          ],
        },
        extraQuestion: {
          prompt: "(c) Suggest one strategy that could reduce future algal blooms, and explain how it would work. Then evaluate one limitation of this strategy.",
          answer: "농지와 호수 사이에 완충 식생대를 조성하면 유출수 속 질소를 흡수해 유입량을 줄일 수 있습니다. 다만 넓은 토지가 필요하고 농민의 협조·비용 문제가 한계가 됩니다.",
        },
      },
      {
        kind: "explanation",
        entries: [
          {
            label: "(a)",
            approach: "두 자료의 변화 방향을 함께 설명합니다.",
            answer: "질소 농도가 증가함에 따라 조류 대발생 일수도 함께 증가하는 양의 관계를 보입니다.",
            commonMistake: "두 자료를 따로따로만 설명하고 관계를 연결하지 않는 경우가 있습니다.",
          },
          {
            label: "(b)",
            why: "비료에는 질소 화합물이 많이 포함되어 있고, 빗물에 씻겨 유출될 수 있습니다.",
            approach: "제시된 배경 정보와 연결합니다.",
            answer: "농지에서 사용된 비료의 질소 성분이 유출수를 통해 호수로 흘러들었을 가능성이 있습니다.",
            commonMistake: "배경 정보를 활용하지 않고 일반적인 오염 원인만 나열하는 경우가 있습니다.",
          },
          {
            label: "(c)",
            approach: "전략의 작동 원리와 한계를 모두 제시합니다.",
            answer: "완충 식생대 조성 — 효과는 있으나 토지·비용·협조의 한계가 있습니다.",
            commonMistake: "전략만 제시하고 한계(Evaluate)를 생략하는 경우가 있습니다.",
          },
        ],
      },
    ],
  },
};

// ── B. IB 모의고사 샘플 ───────────────────────────────────
export const MOCK_TEST_SAMPLE: IbSample = {
  id: "mock-test",
  pages: [
    {
      kind: "examHeader",
      subject: "Math AA SL",
      info: [
        { label: "Time", value: "Practice Sample" },
        { label: "Paper", value: "Paper 1 (No calculator)" },
        { label: "Questions", value: "3 of 3 shown" },
      ],
    },
    {
      kind: "problem",
      topic: "Mixed Practice",
      parts: [
        { label: "1.", prompt: "Solve for x: 3x − 7 = 2x + 5." },
        { label: "2.", prompt: "Simplify: (2x³)² ÷ x⁴." },
        { label: "3.", prompt: "A line passes through (1, 1) and (3, 5). Find its gradient." },
      ],
      figure: "coord-line",
      checksFor: ["실전 시간 안에 여러 유형을 한 번에 풀이"],
    },
    {
      kind: "explanation",
      entries: [
        { label: "1.", approach: "양변에서 2x를 뺀 뒤 정리합니다.", working: "x − 7 = 5", answer: "x = 12" },
        { label: "2.", approach: "거듭제곱을 먼저 정리한 뒤 나눕니다.", working: "4x⁶ ÷ x⁴", answer: "4x²" },
        { label: "3.", approach: "기울기 = (y의 변화) ÷ (x의 변화).", working: "(5 − 1) ÷ (3 − 1)", answer: "기울기 = 2" },
      ],
    },
  ],
};

// ── C. IB Core 과제 가이드 샘플 ───────────────────────────
export const IA_GUIDE_SAMPLE: IbSample = {
  id: "ia-guide",
  pages: [
    { kind: "checklist", title: "Research Question Checklist", items: ["질문 범위가 너무 넓지 않은가?", "측정 또는 분석 가능한 요소가 있는가?", "비교할 조건이 명확한가?", "분석할 수 있는 자료가 있는가?"] },
    { kind: "planner", title: "Variable Planner", columns: ["Independent Variable", "Dependent Variable", "Controlled Variables"], note: "과학 IA는 아래와 같은 실험 구조로 정리합니다." },
    { kind: "flow", title: "Science IA — Experiment Flow", steps: ["Research Question", "변수 설정 (IV / DV / Controlled)", "실험 설계·반복 횟수 결정", "데이터 수집", "그래프·통계 분석", "Evaluation"], note: "완성된 IA 답안을 제공하지 않습니다 — 계획·점검을 돕는 가이드입니다." },
  ],
};

export const EE_GUIDE_SAMPLE: IbSample = {
  id: "ee-guide",
  pages: [
    { kind: "flow", title: "From Topic to Research Question", steps: ["Broad Topic", "Specific Area", "Question", "Evidence Needed"] },
    { kind: "planner", title: "Evidence Log", columns: ["Source", "Key Evidence", "Why It Matters", "Where To Use"] },
    { kind: "checklist", title: "Draft Checklist", items: ["Research Question이 서론에 명확히 제시되는가?", "각 단락이 하나의 주장을 뒷받침하는가?", "근거마다 출처를 표시했는가?", "결론이 Research Question에 답하고 있는가?"] },
  ],
};

export const TOK_GUIDE_SAMPLE: IbSample = {
  id: "tok-guide",
  pages: [
    { kind: "flow", title: "TOK Question Breakdown", steps: ["Question", "Key Terms", "Claim", "Evidence", "Counterclaim", "Evaluation"] },
    {
      kind: "data",
      caption: "자체 제작 예시 — \"지식 질문: 측정은 지식을 얼마나 객관적으로 만드는가?\"",
      note: "Claim(예시): 측정은 주관적 판단을 줄여 지식을 더 객관적으로 만든다.\nCounterclaim(예시): 그러나 측정 도구와 방법을 선택하는 것 자체가 이미 주관적 판단을 포함한다.",
    },
    { kind: "checklist", title: "초안 체크리스트", items: ["Knowledge Question이 명확한가?", "Claim과 Counterclaim을 모두 다뤘는가?", "구체적인 사례(Example)로 뒷받침했는가?", "완성된 Essay가 아니라 본인의 생각으로 작성했는가?"] },
  ],
};

// ── D. 저가 입문·보조 상품 샘플 ───────────────────────────
export const COMMAND_TERMS_SAMPLE: IbSample = {
  id: "command-terms",
  pages: [
    {
      kind: "terms",
      title: "Command Terms",
      terms: [
        { term: "Define", meaning: "정확한 의미를 짧게 제시", example: "\"Inflation is a sustained increase in the general price level.\"" },
        { term: "Explain", meaning: "무엇이 일어나는지뿐 아니라 왜 그런지 연결", example: "\"Prices rose because supply decreased while demand stayed constant.\"" },
        { term: "Analyse", meaning: "요소와 관계를 나누어 설명", example: "\"This can be broken into two effects: a price effect and a quantity effect.\"" },
        { term: "Evaluate", meaning: "근거를 비교한 뒤 판단", example: "\"While effective in the short run, this approach may not hold if...\"" },
      ],
    },
    {
      kind: "data",
      caption: "같은 주제, 다른 질문 동사",
      note: "주제: \"정부가 최저임금을 인상했다.\"\n\nExplain — 임금 인상이 고용에 영향을 주는 이유 하나를 설명\nAnalyse — 고용·물가·기업 비용에 미치는 영향을 나누어 설명\nEvaluate — 정책의 장단점을 비교해 효과적인지 판단",
    },
  ],
};

export const GRAPH_DATA_PACK_SAMPLE: IbSample = {
  id: "graph-data-pack",
  pages: [
    {
      kind: "data",
      caption: "어느 지역의 10년간 연평균 기온 변화(가상 데이터)",
      figure: "line-graph",
      table: {
        headers: ["연도", "2015", "2017", "2019", "2021", "2023"],
        rows: [["평균 기온 (°C)", "12.1", "12.4", "12.9", "13.3", "13.8"]],
      },
    },
    {
      kind: "problem",
      topic: "Graph & Data Practice",
      parts: [
        { label: "Identify", prompt: "Identify the year with the highest recorded average temperature." },
        { label: "Describe", prompt: "Describe the overall trend shown in the graph." },
        { label: "Compare", prompt: "Compare the change between 2015–2019 and 2019–2023." },
        { label: "Explain", prompt: "Explain one possible reason for this trend." },
      ],
      checksFor: ["그래프에서 특정 값 찾기", "경향 설명", "구간 비교", "원인 설명"],
    },
  ],
};

export const CALCULATION_PACK_SAMPLE: IbSample = {
  id: "calculation-pack",
  pages: [
    {
      kind: "problem",
      topic: "Calculation Practice — Unit Conversion",
      parts: [{ label: "Q.", prompt: "A reaction produces 0.25 mol of gas. Calculate the volume of this gas at a molar volume of 22.7 dm³ mol⁻¹, and give your answer in cm³." }],
      checksFor: ["값과 단위 확인", "계산", "단위 변환"],
    },
    {
      kind: "explanation",
      entries: [
        {
          label: "Q.",
          approach: "먼저 dm³ 단위로 부피를 구한 뒤 cm³로 변환합니다. (Working Space에서 계산 과정을 직접 적어봅니다.)",
          working: "0.25 mol × 22.7 dm³/mol = 5.675 dm³ → 5.675 × 1000",
          answer: "5675 cm³",
          commonMistake: "Unit Check를 건너뛰고 dm³ 값을 그대로 cm³ 답으로 쓰는 경우가 많습니다.",
        },
      ],
    },
  ],
};

export const DIAGNOSTIC_SAMPLE: IbSample = {
  id: "diagnostic",
  pages: [
    {
      kind: "problem",
      topic: "IB Diagnostic Sample",
      parts: [
        { label: "1. Concept", prompt: "Define the term \"limiting reactant\"." },
        { label: "2. Calculation", prompt: "Solve for x: 2x + 3 = 11." },
        { label: "3. Graph", prompt: "A line has a gradient of 2 and passes through (0, 1). State its equation." },
        { label: "4. Application", prompt: "Explain why a subsidy might increase the quantity supplied of a good." },
        { label: "5. Written Response", prompt: "Analyse one impact of rising staff turnover on a small business." },
      ],
      checksFor: ["개념·계산·그래프·응용·서술형을 섞어 현재 상태를 짧게 확인"],
    },
    {
      kind: "result",
      title: "결과 예시",
      bars: [
        { label: "Concept", filled: 4 },
        { label: "Calculation", filled: 3 },
        { label: "Data Interpretation", filled: 2 },
        { label: "Written Response", filled: 3 },
      ],
      note: "이 결과는 실제 점수를 예측하는 것이 아니라, 어떤 영역을 더 연습해야 하는지 확인하기 위한 예시입니다.",
    },
  ],
};

// ── E. 확장 라인 샘플 ─────────────────────────────────────
export const BRIDGE_SAMPLE: IbSample = {
  id: "bridge",
  pages: [
    { kind: "flow", title: "MYP → DP Bridge", steps: ["Previous Knowledge (MYP)", "DP Concept", "Basic Application", "DP-style Question"] },
    {
      kind: "data",
      caption: "Math Bridge — 함수의 그래프",
      figure: "coord-line",
      note: "MYP에서 배운 '직선의 기울기'를 DP Math AA의 Functions 단원으로 연결합니다.",
      extraQuestion: {
        prompt: "DP-style Question — The line passes through (1,1) and (3,5). Find the equation of the line in the form y = mx + c.",
        answer: "기울기 m = 2, (1,1)을 대입하면 1 = 2(1) + c → c = −1. 따라서 y = 2x − 1.",
      },
    },
    {
      kind: "data",
      caption: "Science Bridge — 간단한 실험 자료",
      table: { headers: ["시간 (분)", "0", "5", "10", "15"], rows: [["온도 (°C)", "20", "28", "34", "37"]] },
      note: "MYP 수준의 '관찰·기록'에서, DP ESS/Biology 수준의 '경향 설명·원인 추론'으로 난이도를 올립니다.",
    },
  ],
};

export const FINAL_REVIEW_SAMPLE: IbSample = {
  id: "final-review",
  pages: [
    {
      kind: "problem",
      topic: "Mixed Review (Math AA) — 단원 표시 없음",
      stimulus: "아래 문제들은 여러 단원에서 섞여 출제됩니다. 어떤 단원의 문제인지 스스로 판단하며 풀어 보세요.",
      parts: [
        { label: "1.", prompt: "Find the derivative of f(x) = 3x² − 2x." },
        { label: "2.", prompt: "A bag contains 4 red and 6 blue balls. Find the probability of drawing a red ball." },
        { label: "3.", prompt: "Solve for x: 2x² − 8x + 3 = 0, giving your answer to 2 decimal places." },
      ],
      checksFor: ["Functions·Calculus·Probability가 섞인 상태에서 스스로 유형을 판단"],
    },
    {
      kind: "explanation",
      entries: [
        { label: "1.", approach: "거듭제곱 미분 공식을 적용합니다. (Calculus)", working: "f′(x) = 6x − 2", answer: "f′(x) = 6x − 2" },
        { label: "2.", approach: "전체 공 수 중 빨간 공의 비율. (Probability)", working: "4 / (4+6)", answer: "2/5" },
        { label: "3.", approach: "근의 공식을 적용합니다. (Functions/Algebra)", working: "x = (8 ± √(64−24)) / 4", answer: "x ≈ 3.58 또는 x ≈ 0.42" },
      ],
    },
  ],
};

export const HL_INTENSIVE_SAMPLE: IbSample = {
  id: "hl-intensive",
  pages: [
    {
      kind: "problem",
      topic: "Challenge Problem — Functions × Calculus",
      parts: [
        {
          label: "Q.",
          prompt: "The function f(x) = x³ − 3x² + k has a local minimum value of −2. Find the value of k, and state the x-coordinate where this minimum occurs.",
        },
      ],
      checksFor: ["여러 개념(미분, 극값, 방정식)을 한 문제 안에서 연결"],
    },
    {
      kind: "explanation",
      entries: [
        {
          label: "Q.",
          why: "극값은 f′(x) = 0인 지점에서 발생합니다.",
          approach: "f′(x)를 구해 0이 되는 x를 찾고, 그중 극소점을 판별한 뒤 주어진 최솟값 조건으로 k를 구합니다.",
          working: "f′(x) = 3x² − 6x = 3x(x − 2) = 0 → x = 0 또는 x = 2. f″(x) = 6x−6이므로 x=2에서 극소. f(2) = 8 − 12 + k = −2",
          answer: "k = 2, 극소점은 x = 2",
          commonMistake: "x = 0(극대점)을 극소점으로 착각해 잘못된 x에 조건을 대입하는 경우가 많습니다.",
        },
      ],
    },
  ],
};
