import { products } from "@/data/products";
import ProductCard from "@/components/books/ProductCard";

// 에디토리얼 큐레이션 — 실제 판매량 데이터가 없으므로 "베스트셀러 500개 판매"
// 같은 수치는 표시하지 않습니다. 대신 주요 시험을 대표하는 실제 상품을
// 큐레이션해 "지금 많이 찾는 교재"로 보여줍니다. 가격은 카드에서 바로 확인됩니다.
const bestsellerIds = [
  "cat4-level-e",
  "map-growth-workbook",
  "english-level-test-g3-4",
  "sat-math-workbook",
  "ap-calculus-workbook",
  "sr-reading-prep-g4-5",
  "algebra-1-workbook",
  "grammar-g5-7-workbook",
];

export default function Bestsellers() {
  const items = bestsellerIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) return null;

  return (
    <section id="bestsellers" className="scroll-mt-20 border-b border-navy-800/12 bg-ivory-200/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Most Popular Prep Books</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            지금 많이 찾는 교재
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.85] text-charcoal-600">
            CAT4·MAP·SAT·AP 등 주요 시험별로 가장 먼저 찾아보시는 교재입니다. 가격과 구성을 바로 확인하고,
            샘플로 실제 문제 퀄리티까지 확인해보세요.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
