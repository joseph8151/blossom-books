import { Product } from "@/lib/types";

// 홈(가격 비노출 지면) 전용 텍스트 정리 — "40·60·100·200p 선택", "150·200·300P 선택",
// "N페이지" 같은 분량 안내 문구를 제거합니다. /books, 상세페이지 등에서는 사용하지 않으며
// 원본 데이터(src/data/products.ts)는 수정하지 않습니다.
export function stripVolumeMentions(text: string): string {
  return text
    .replace(/\d+페이지/g, "")
    .replace(/40·60·100·200p\s*(중\s*)?선택[,.]?\s*/gi, "")
    .replace(/150·200·300p\s*(중\s*)?선택[,.]?\s*/gi, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// Bestsellers 등 홈 카드에 상품을 넘기기 전, 분량 관련 문구가 섞인 텍스트 필드를
// 정리한 복사본을 만듭니다. 가격(priceKRW/priceUSD)이나 다른 필드는 건드리지 않습니다.
export function sanitizeProductForHome(p: Product): Product {
  return {
    ...p,
    summaryKo: stripVolumeMentions(p.summaryKo),
    descriptionKo: stripVolumeMentions(p.descriptionKo),
    levelLabel: p.levelLabel ? stripVolumeMentions(p.levelLabel) || undefined : p.levelLabel,
    components: p.components.map((c) => ({ ...c, descriptionKo: stripVolumeMentions(c.descriptionKo) })),
  };
}
