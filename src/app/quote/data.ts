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
