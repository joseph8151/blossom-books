import { products } from "@/data/products";

// 실제 카탈로그 데이터에서 계산한 수치만 사용합니다 (과장 없음).
const titleCount = products.length;
const subjectCount = new Set(products.map((p) => p.subject)).size;

const stats = [
  { value: `${titleCount}`, label: "Workbook Titles", ko: "판매 교재" },
  { value: "K–12", label: "Grade Coverage", ko: "학년 범위" },
  { value: `${subjectCount}`, label: "Subjects & Assessment Areas", ko: "과목·평가 영역" },
  { value: "40·60·100·200", label: "Page Options", ko: "분량 선택" },
];

export default function BrandNumbers() {
  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-14 text-ivory-100 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-px overflow-hidden border border-ivory-100/10 bg-ivory-100/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy-950 px-6 py-8 text-center">
              <p className="font-display text-[30px] font-semibold leading-none text-ivory-100 sm:text-[34px]">
                {s.value}
              </p>
              <p className="mt-3 font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-400">
                {s.label}
              </p>
              <p className="mt-1 text-[12px] text-ivory-200/60">{s.ko}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
