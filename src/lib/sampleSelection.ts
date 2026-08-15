// 교재별 샘플 문항 선정 로직.
// 상품 상세의 샘플 뷰어와 추천 결과 페이지의 미리보기가 같은 문항을 보여주도록
// 선정 규칙을 이 한 곳에서만 관리합니다.

import { Product } from "@/lib/types";
import { isFourSkill } from "@/lib/productMeta";
import { blossomLevel } from "@/lib/utils";
import {
  SampleItem,
  Difficulty,
  readingBank,
  vocabularyBank,
  grammarBank,
  writingBank,
  mathBank,
  algebraBank,
  scienceBank,
  reasoningBank,
  certifiedEnglishBank,
  oetBank,
  scatBank,
  geometryBank,
  mathLevelBank,
  apCalcBank,
  apPhysicsBank,
  apStatsBank,
  apBiologyBank,
  apChemistryBank,
  apEconomicsBank,
  apEnglishBank,
  apHistoryBank,
  mapBank,
  satMathBank,
  apExtraByProduct,
  placementReadingByProduct,
  srReadingByProduct,
} from "@/data/sampleBank";

// 제품 id 기반 전용 샘플 세트 (복합 문제 + 도형/그래프)
const BANK_BY_ID: Record<string, SampleItem[]> = {
  "ap-calculus-workbook": apCalcBank,
  "ap-physics-workbook": apPhysicsBank,
  "ap-statistics-workbook": apStatsBank,
  "ap-biology-workbook": apBiologyBank,
  "ap-chemistry-workbook": apChemistryBank,
  "ap-economics-workbook": apEconomicsBank,
  "ap-english-lang-workbook": apEnglishBank,
  "ap-us-history-workbook": apHistoryBank,
  "map-growth-workbook": mapBank,
  "sat-math-workbook": satMathBank,
};

export const DIFF_ORDER: Difficulty[] = ["Foundation", "Standard", "Advanced", "Challenge"];

// 학년대별 난이도 티어 — 같은 4영역 레벨테스트라도 학년에 따라 다른 문항을 노출합니다.
const LT_TIER: Record<string, Difficulty> = {
  "english-level-test-g1-2": "Foundation",
  "english-level-test-g3-4": "Standard",
  "english-level-test-g5-6": "Advanced",
};

// 목표 난이도에 가까운 순으로 정렬해 n개를 뽑습니다. (티어 문항이 먼저 오도록)
function pickTier(bank: SampleItem[], tier: Difficulty, n: number): SampleItem[] {
  const target = DIFF_ORDER.indexOf(tier);
  return [...bank]
    .sort((a, b) => Math.abs(DIFF_ORDER.indexOf(a.difficulty) - target) - Math.abs(DIFF_ORDER.indexOf(b.difficulty) - target))
    .slice(0, n);
}

// 첫 페이지에 가장 인상적인 문항(도형/그래프 또는 실전 지문)이 오도록 정렬합니다.
export function leadWithVisual(items: SampleItem[]): SampleItem[] {
  if (items.length < 2) return items;
  if (items[0].figure || (items[0].passage?.length ?? 0) > 150) return items;
  const idx = items.findIndex((i) => i.figure || (i.passage?.length ?? 0) > 150);
  if (idx > 0) {
    const c = [...items];
    const [x] = c.splice(idx, 1);
    c.unshift(x);
    return c;
  }
  return items;
}

// 상품 특성에 맞는 샘플 문항 세트를 구성합니다 (과목별 유형·난이도 다양).
export function buildWorkbookItems(product: Product): SampleItem[] {
  const key = `${product.subject} ${product.examOrCurriculum} ${product.title}`.toLowerCase();
  const peakIdx = DIFF_ORDER.indexOf(blossomLevel(product.difficulty));
  const cap = (items: SampleItem[]) => {
    // Foundation 상품은 Challenge 유형을 제외해 과도하게 어려운 유형이 섞이지 않도록 합니다.
    const maxIdx = Math.max(peakIdx, 1);
    const filtered = items.filter((it) => DIFF_ORDER.indexOf(it.difficulty) <= maxIdx);
    return filtered.length >= 3 ? filtered : items;
  };

  if (isFourSkill(product)) {
    // 학년별 긴 리딩 지문 + 학년대 난이도에 맞춘 Vocabulary·Grammar·Writing (교재별 차별화)
    const reading = placementReadingByProduct[product.id] ?? [readingBank[0], readingBank[2], readingBank[3]];
    const tier = LT_TIER[product.id] ?? blossomLevel(product.difficulty);
    return [
      ...reading,
      ...pickTier(vocabularyBank, tier, 2),
      ...pickTier(grammarBank, tier, 2),
      ...pickTier(writingBank, tier, 2),
    ];
  }
  // SR Reading 전용 제품 — 긴 지문 + 유형 확장
  if (srReadingByProduct[product.id]) return srReadingByProduct[product.id];
  // Algebra 1 / 2 — 난이도로 서로 다른 문항 세트 노출
  if (product.id === "algebra-1-workbook") return algebraBank.filter((i) => ["Foundation", "Standard"].includes(i.difficulty));
  if (product.id === "algebra-2-workbook") return algebraBank.filter((i) => ["Advanced", "Challenge"].includes(i.difficulty));
  // 제품 id 전용 세트 (AP 과목별 · MAP · SAT Math) — 복합 문제 + 도형/그래프
  if (BANK_BY_ID[product.id]) return [...BANK_BY_ID[product.id], ...(apExtraByProduct[product.id] ?? [])];
  if (/scat/.test(key)) return scatBank;
  if (/reasoning|cat4|verbal|non-verbal|spatial|general ability/.test(key)) return reasoningBank;
  if (/oet/.test(key)) return oetBank;
  if (product.track === "certified-exam" && /english|toefl|ielts|met|spa|teps/.test(key)) return certifiedEnglishBank;
  // 수학 레벨테스트(사고력) — 한글 + SVG (큐레이션된 세트, 전부 노출)
  if (product.id === "math-reasoning-level-test" || /수학 레벨|사고력/.test(key)) return mathLevelBank;
  // Geometry — 그래프·도형·복합문제 (SVG)
  if (/geometry|지오메트리/.test(key)) return geometryBank;
  if (/algebra/.test(key)) return cap(algebraBank);
  if (/calc|precalc|statistic|math|수학/.test(key) && !/reading|english/.test(key)) return cap(mathBank);
  if (/biolog|chemi|physic|science|과학|생물|화학|물리/.test(key)) return cap(scienceBank);
  if (/grammar|문법/.test(key)) return cap(grammarBank);
  if (/writing|라이팅/.test(key)) return writingBank;
  if (/vocab|보카|어휘/.test(key)) return cap(vocabularyBank);
  // Reading / SR / 그 외 기본
  return cap(readingBank);
}

// 추천 결과 미리보기용 — 지문이 지나치게 길지 않으면서 해설이 충실한 문항을 우선합니다.
export function previewItem(product: Product): SampleItem | null {
  const items = buildWorkbookItems(product);
  if (!items.length) return null;
  const compact = items.filter((i) => (i.passage?.length ?? 0) <= 420 && (i.choices?.length ?? 0) > 0);
  return (compact.length ? leadWithVisual(compact) : leadWithVisual(items))[0];
}
