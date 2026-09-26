import NoPriceExamCard from "./NoPriceExamCard";

export default function UkSchoolSection() {
  return (
    <section id="uk-school" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">UK School Admission</p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          영국 학교 입학 대비
        </h2>
        <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-charcoal-600">
          영국 Independent School 및 영국계 국제학교 지원 과정에서 활용되는 평가입니다. 가격 정책이 아직
          없어 구성 상담을 통해 안내합니다.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <NoPriceExamCard
            title="UKiset"
            subtitle="영국 Independent School 지원 과정에서 활용되는 학생 평가 시험입니다. Verbal Reasoning · Non-verbal Reasoning · Mathematics/Numerical Reasoning · English 등으로 구성됩니다."
            stages={{
              standardLabel: "STANDARD",
              standardDesc: "전체 유형 대비",
              upgradeLabel: "ADVANCED PRACTICE",
              upgradeDesc: "더 높은 난이도의 언어·추론·학업 문제 추가 연습",
            }}
            ctaLabel="UKiset 맞춤 구성 문의"
          />
          <NoPriceExamCard
            title="ISEB Common Pre-Test"
            subtitle="CAT4와 목적·구조가 다른 영국 Independent School 입학 전용 평가입니다."
            areas={["Verbal Reasoning", "Non-Verbal Reasoning", "English", "Mathematics"]}
            stages={{
              standardLabel: "STANDARD",
              standardDesc: "시험 전체 유형 대비",
              upgradeLabel: "ADVANCED PRACTICE",
              upgradeDesc: "더 높은 난이도의 Reasoning과 응용 문제 추가 대비",
            }}
            ctaLabel="ISEB 맞춤 구성 문의"
          />
        </div>
      </div>
    </section>
  );
}
