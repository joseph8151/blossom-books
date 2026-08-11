// ────────────────────────────────────────────────────────────
// 분량(페이지 수) 기반 가격 정책
// 40·60·100P는 바로 구매 가능, 100P 초과는 가격 문의(Price on Request).
// USD는 해외(PayPal) 결제용 근사값입니다.
// ────────────────────────────────────────────────────────────

export interface VolumeOption {
  pages: number;
  label: string; // "40P"
  priceKRW: number;
  priceUSD: number;
  tier: string; // "Quick Prep"
  tierKo: string;
  badge?: string; // "BEST VALUE"
  forWhom: string[]; // 추천 대상
}

export const volumeOptions: VolumeOption[] = [
  {
    pages: 40,
    label: "40P",
    priceKRW: 130000,
    priceUSD: 95,
    tier: "Quick Prep",
    tierKo: "핵심 유형 빠르게",
    forWhom: [
      "시험까지 시간이 많지 않은 학생",
      "주요 유형을 빠르게 확인하고 싶은 학생",
      "특정 영역을 단기간 보완하고 싶은 학생",
    ],
  },
  {
    pages: 60,
    label: "60P",
    priceKRW: 150000,
    priceUSD: 110,
    tier: "Standard Prep",
    tierKo: "기본 실전 대비",
    badge: "BEST VALUE",
    forWhom: [
      "시험 유형을 충분히 연습하고 싶은 학생",
      "기본적인 실전 대비가 필요한 학생",
      "여러 유형을 균형 있게 연습하고 싶은 학생",
    ],
  },
  {
    pages: 100,
    label: "100P",
    priceKRW: 190000,
    priceUSD: 140,
    tier: "Intensive Prep",
    tierKo: "집중 반복·심화",
    forWhom: [
      "시험 전 충분한 문제량이 필요한 학생",
      "여러 영역의 반복 학습이 필요한 학생",
      "보다 집중적인 Prep이 필요한 학생",
    ],
  },
];

// 진입(Starter) 상품 — 부담 없이 품질을 먼저 확인하는 소분량 구성
export const starterOption: VolumeOption = {
  pages: 25,
  label: "25P",
  priceKRW: 89000,
  priceUSD: 65,
  tier: "Starter Prep",
  tierKo: "부담 없이 시작",
  forWhom: [
    "처음이라 교재 품질을 먼저 확인하고 싶은 경우",
    "핵심 유형만 아주 짧게 점검하고 싶은 학생",
    "본 교재 전 맛보기로 시작하고 싶은 경우",
  ],
};

// 분량 선택형 상품의 전체 옵션 (Starter → 40 → 60 → 100)
export const flexibleVolumes: VolumeOption[] = [starterOption, ...volumeOptions];

// 100P 초과 — 가격 문의
export const extendedOption = {
  label: "150P+",
  tier: "Extended Prep",
  tierKo: "장기·심화·특수 구성",
  forWhom: [
    "장기 집중 준비가 필요한 경우",
    "추가 영역 또는 더 많은 실전 문제가 필요한 경우",
    "특수 시험 및 별도 구성",
  ],
};

export const fromPriceKRW = starterOption.priceKRW; // 89,000 — "₩89,000부터" (Starter 진입가)

export const priceDisclaimer =
  "시험 유형, 과목 및 구성에 따라 일부 상품은 별도 안내될 수 있습니다.";

export const pricingReassurance =
  "필요한 만큼 선택하세요. 시험까지 남은 기간과 현재 실력에 따라 필요한 학습량은 달라질 수 있으며, 더 많은 페이지가 항상 더 좋은 선택은 아닙니다.";

export function formatKRW(n: number): string {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export function volumeByPages(pages: number): VolumeOption | undefined {
  return flexibleVolumes.find((v) => v.pages === pages);
}
