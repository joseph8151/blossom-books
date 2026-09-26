import NoPriceExamCard from "./NoPriceExamCard";

export default function ProgressTestSection() {
  return (
    <section id="school-progress" className="scroll-mt-20 border-b border-ivory-300 bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
          GL Progress Test Series
        </p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          PTE · PTM · PTS
        </h2>
        <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-charcoal-600">
          학교에서 현재 학업 수준과 성취도를 확인하고 학습 진행 상황을 파악하기 위해 사용하는 GL Assessment의
          표준화 Progress Test Series입니다. Test Level이 학년과 별도로 존재하므로 학생의 Age·Grade·School·
          Test Level을 확인한 뒤 구성을 상담합니다. 가격 정책이 아직 없어 구성 상담을 통해 안내합니다.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <NoPriceExamCard
            title="PTE"
            officialName="Progress Test in English (GL Assessment)"
            subtitle="영어 성취도를 측정하는 학교용 Assessment입니다. Pearson PTE Academic·PTE Core와는 다른 시험입니다."
            areas={["Reading Comprehension", "Spelling", "Grammar", "Punctuation"]}
            stages={{
              standardLabel: "STANDARD PRACTICE",
              standardDesc: "현재 Test Level 대비",
              upgradeLabel: "EXTENSION PRACTICE",
              upgradeDesc: "동일 영역에서 추가적인 응용·심화 연습",
            }}
            ctaLabel="PTE Level 상담"
          />
          <NoPriceExamCard
            title="PTM"
            officialName="Progress Test in Maths (GL Assessment)"
            subtitle="국제학교 및 영국식 커리큘럼 학교에서 학생의 수학 성취도와 학습 진행 상황을 확인하는 Assessment입니다."
            areas={["Number", "Shape", "Data Handling", "Algebra", "Mathematical Reasoning", "Problem Solving"]}
            stages={{
              standardLabel: "STANDARD PRACTICE",
              standardDesc: "현재 Level 수학 대비",
              upgradeLabel: "EXTENSION PRACTICE",
              upgradeDesc: "수학적 추론·문제해결을 추가 연습",
            }}
            ctaLabel="PTM Level 상담"
          />
          <NoPriceExamCard
            title="PTS"
            officialName="Progress Test in Science (GL Assessment)"
            subtitle="학교에서 과학 성취도와 학습 진행 상황을 확인하는 Assessment입니다."
            stages={{
              standardLabel: "STANDARD PRACTICE",
              standardDesc: "현재 Science Level 대비",
              upgradeLabel: "EXTENSION PRACTICE",
              upgradeDesc: "응용·Scientific Reasoning 문제 추가 연습",
            }}
            ctaLabel="PTS Level 상담"
          />
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-charcoal-600/70">
          학년만으로 Test Level을 정하지 않습니다. 상담 시 Age·Grade·School·Test Level을 함께 알려주세요.
        </p>
      </div>
    </section>
  );
}
