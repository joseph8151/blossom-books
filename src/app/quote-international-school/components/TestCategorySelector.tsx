"use client";

import { useCategory, type CategoryId } from "../CategoryContext";

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "international-school", label: "국제학교 진단" },
  { id: "private-school", label: "사립학교 입학" },
  { id: "uk-school", label: "영국학교 입학" },
  { id: "school-progress", label: "학교 성취도" },
  { id: "english-placement", label: "영어 배치" },
  { id: "reading", label: "Reading 진단" },
];

const chipCls =
  "shrink-0 whitespace-nowrap rounded-full border border-ivory-300 bg-white px-4 py-2 text-[12.5px] font-medium text-navy-900 transition-colors hover:border-navy-900";
const chipActiveCls =
  "shrink-0 whitespace-nowrap rounded-full border border-navy-900 bg-navy-950 px-4 py-2 text-[12.5px] font-medium text-ivory-100 transition-colors";

export default function TestCategorySelector() {
  const { active, setActive } = useCategory();

  return (
    <section id="category-selector" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-100 py-10 sm:py-12">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <h2 className="text-center font-display text-[20px] font-semibold text-navy-950 sm:text-[22px]">
          어떤 시험을 준비하시나요?
        </h2>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
          <button
            type="button"
            aria-pressed={active === "all"}
            onClick={() => setActive("all")}
            className={active === "all" ? chipActiveCls : chipCls}
          >
            전체
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={active === c.id ? chipActiveCls : chipCls}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
