// /quote 페이지 전용 가격 상수. 모든 값은 기존 페이지에서 이미 쓰이던
// 실제 가격을 그대로 옮긴 것이며, 이 리디자인에서 새로 만든 숫자는 없습니다.
import { flexibleVolumes, formatKRW } from "@/data/pricing";

export { flexibleVolumes, formatKRW };

export const SPECIAL_KRW = 390000;
export const SPECIAL_ADD = 100000; // MAP·CAT4 Special = 해당 구성 금액 + 100,000

export const MAP_PRICES = {
  english: 190000,
  math: 150000,
  both: 340000,
};

export const CAT4_PRICES = {
  oneLevel: 150000,
  twoLevelsList: 300000,
  twoLevels: 270000, // 10% 할인가
};

export const OOPT_PRICES = {
  p100: 190000,
  p200: 290000,
};

export const COMBO_PRICES = {
  specialTwo: 780000,
  sibling: 780000,
  threeSubject: 870000,
};

// 레벨테스트 페이지 묶음 — 40/60/100/200P를 그대로 두 권 이상 묶은 가격입니다.
// (Special Package 39만원과는 별개 상품입니다.)
// 주의: STANDARD/ADVANCED는 페이지 수와 무관한 난이도 축이므로, 특정 페이지 수
// 조합(예: 100P+200P)을 "2단계 패키지" 고정 가격으로 만들지 않습니다. 같은
// 분량의 Standard+Advanced 조합 가격은 해당 분량 단가 × 2로 계산합니다.
export const LEVEL_TEST_BUNDLES = {
  starter: 250000, // 입문: 40P + 60P
  fullSet: 550000, // 풀세트: 60P + 100P + 200P
};
