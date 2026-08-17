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
  badge?: string; // "RECOMMENDED" · "START HERE"
  highlight?: boolean; // 카드 강조 스타일 (기준 구성 1개에만 사용)
  entry?: boolean; // 처음 이용하는 고객을 위한 진입 구성
  entryNote?: string; // 진입 구성 안내 문구
  forWhom: string[]; // 추천 대상
  duration?: string; // 추천 준비 기간
}

export const volumeOptions: VolumeOption[] = [
  {
    pages: 40,
    label: "40P",
    priceKRW: 130000,
    priceUSD: 95,
    tier: "Essential Prep",
    tierKo: "핵심 유형 빠르게",
    duration: "시험 임박 · 단기",
    badge: "START HERE",
    entry: true,
    entryNote:
      "처음 Blossom Books를 이용하는 분께도 추천합니다. 시험 유형을 먼저 경험하거나, 부족한 영역을 단기간 집중적으로 연습하기 좋은 구성입니다.",
    forWhom: [
      "처음 Blossom Books를 이용하는 학생",
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
    tier: "Complete Prep",
    tierKo: "충분한 실전 대비",
    badge: "RECOMMENDED",
    highlight: true,
    duration: "약 2–4주 표준 준비",
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
    duration: "4주 이상 · 심화 준비",
    forWhom: [
      "시험 전 충분한 문제량이 필요한 학생",
      "여러 영역의 반복 학습이 필요한 학생",
      "보다 집중적인 Prep이 필요한 학생",
    ],
  },
];

// 분량 선택형 상품의 전체 옵션 (40 → 60 → 100)
export const flexibleVolumes: VolumeOption[] = [...volumeOptions];

// 진입(Starter) 상품 — 영어 레벨테스트 상품에만 제공하는 소분량 진입 구성
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

// 200P 장기·심화 패키지 — 가장 충실한 구성.
// priceKRW/priceUSD 에 금액을 넣으면 추천 결과·가이드에 금액이 그대로 노출되고,
// 비워 두면 "가격 문의 (상담 시 안내)" 로 표시됩니다.
export interface PackageOption {
  pages: number;
  label: string;
  tier: string;
  tierKo: string;
  duration: string;
  summaryKo: string;
  summaryEn: string;
  forWhom: string[];
  priceKRW?: number;
  priceUSD?: number;
}

export const packageOption: PackageOption = {
  pages: 200,
  label: "200P",
  tier: "Package Prep",
  tierKo: "장기 학습 + 심화",
  duration: "약 2~3개월+",
  summaryKo: "한 학기 이상 꾸준히 학습하거나, 심화까지 폭넓게 다루고 싶을 때 선택하는 가장 충실한 구성입니다.",
  summaryEn: "The most complete option — for a term-long curriculum with advanced practice included.",
  forWhom: [
    "한 학기 이상 장기 커리큘럼으로 준비하는 학생",
    "기본 유형부터 심화까지 한 권으로 끝내고 싶은 경우",
    "학원·과외 정규 교재로 사용하는 경우",
  ],
};

export function packagePriceLabel(): string | null {
  return packageOption.priceKRW ? formatKRW(packageOption.priceKRW) : null;
}

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

export const fromPriceKRW = volumeOptions[0].priceKRW; // 130,000 — "₩130,000부터"

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
