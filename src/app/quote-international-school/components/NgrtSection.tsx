import NoPriceExamCard from "./NoPriceExamCard";

export default function NgrtSection() {
  return (
    <section id="ngrt" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[680px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">Reading Assessment</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">NGRT</h2>
        <p className="mt-1 text-[12.5px] text-charcoal-600/70">New Group Reading Test</p>
        <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
          국제학교에서 학생의 Reading ability를 확인하기 위해 사용할 수 있는 평가입니다. 가격 정책이 아직
          없어 구성 상담을 통해 안내합니다.
        </p>

        <div className="mt-8">
          <NoPriceExamCard
            title="NGRT"
            subtitle="New Group Reading Test 유형에 맞춘 Reading 연습 구성입니다."
            stages={{
              standardLabel: "STANDARD",
              standardDesc: "Reading 유형 및 핵심 skill을 대비합니다.",
              upgradeLabel: "ADVANCED PRACTICE",
              upgradeDesc: "더 높은 난이도의 Reading · Vocabulary · Comprehension 문제를 추가 연습합니다.",
            }}
            ctaLabel="NGRT 구성 문의"
          />
        </div>
      </div>
    </section>
  );
}
