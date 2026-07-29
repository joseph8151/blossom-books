import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/books/ProductCard";

export const metadata = { title: "모의고사" };

export default function MockExamsPage() {
  const mockExamProducts = products.filter((p) =>
    p.components.some((c) => /practice test|mock/i.test(c.label))
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">Mock exams</p>
        <h1 className="mt-3 font-display text-[34px] font-semibold text-navy-950 sm:text-[40px]">
          실전 모의고사
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
          시험 구조와 출제 비중을 분석해 구성한 실전 모의고사입니다. 문제집과 함께 제공되는
          경우가 많으며, 자체 모의고사만 별도로 제작하는 것도 상담 가능합니다.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockExamProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {mockExamProducts.length === 0 && (
        <p className="mt-10 text-[13.5px] text-charcoal-600">현재 등록된 모의고사가 없습니다.</p>
      )}

      <div className="mt-16 border border-navy-800/12 bg-ivory-200/40 p-8 text-center">
        <p className="text-[14px] text-charcoal-600">
          특정 시험의 자체 모의고사 제작이 필요하신가요?{" "}
          <Link href="/custom-order" className="font-medium text-navy-900 underline decoration-brass-500 decoration-2 underline-offset-4">
            주문 제작 상담하기
          </Link>
        </p>
      </div>
    </div>
  );
}
