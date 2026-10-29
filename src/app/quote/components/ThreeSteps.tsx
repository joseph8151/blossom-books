import { Search, SlidersHorizontal, Settings2 } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "시험 또는 과목 선택",
    body: "MAP, CAT4, ISEE, 레벨테스트 등 준비하는 시험을 먼저 선택합니다.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "필요한 분량 선택",
    body: "40P / 60P / 100P / 200P 중 준비 기간과 학습량에 맞춰 선택합니다.",
  },
  {
    n: "03",
    icon: Settings2,
    title: "필요하면 맞춤 구성",
    body: "두 시험 준비, 여러 과목, 특정 영역 집중, 형제·자매 구성 등은 별도 견적으로 조정할 수 있습니다.",
  },
];

export default function ThreeSteps() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-100 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <h2 className="text-center font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          교재 선택은 세 단계면 충분합니다.
        </h2>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8">
          {steps.map(({ n, icon: Icon, title, body }) => (
            <div key={n} className="border border-ivory-300 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">STEP {n}</span>
                <Icon size={18} className="text-navy-800/45" strokeWidth={1.6} />
              </div>
              <p className="mt-4 font-display text-[17px] font-semibold text-navy-950">{title}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-charcoal-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
