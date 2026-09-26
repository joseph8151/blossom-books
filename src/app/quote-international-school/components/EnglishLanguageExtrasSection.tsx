import NoPriceExamCard from "./NoPriceExamCard";

export default function EnglishLanguageExtrasSection() {
  return (
    <section className="border-b border-ivory-300 bg-ivory-200/30 py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-label text-[10.5px] uppercase tracking-[0.14em] text-brass-500">
          English Placement & Language
        </p>
        <h2 className="mt-2.5 font-display text-[24px] font-semibold text-navy-950 sm:text-[27px]">
          TOEFL Junior · WIDA Assessments
        </h2>
        <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-charcoal-600">
          국제학교 영어 배치·진단 목적으로 활용되는 추가 시험입니다. WIDA는 공식 문제를 복제하지 않으며,
          유형 대비·영어 영역 연습 중심으로 구성합니다.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <NoPriceExamCard
            title="TOEFL Junior"
            subtitle="K-12 학생의 영어 능력을 평가하며 학교 입학·배치 목적과 연관될 수 있는 시험입니다. TOEFL iBT와는 다른 시험이며, 이 페이지에서는 TOEFL Junior만 다룹니다."
            stages={{
              standardLabel: "STANDARD",
              standardDesc: "시험 주요 유형 전반을 대비합니다.",
              upgradeLabel: "INTENSIVE",
              upgradeDesc: "Reading · Listening · Language Form 등 취약 영역을 집중적으로 추가 연습합니다.",
            }}
            ctaLabel="TOEFL Junior 구성 문의"
          />
          <NoPriceExamCard
            title="WIDA MODEL"
            subtitle="영어 능력의 4개 영역을 확인하는 평가입니다. 공식 WIDA 문제를 복제하지 않으며, 유형 대비·영어 영역 연습으로 구성합니다."
            areas={["Listening", "Speaking", "Reading", "Writing"]}
            ctaLabel="WIDA MODEL 구성 문의"
          />
          <NoPriceExamCard
            title="WIDA Screener"
            subtitle="신규 학생의 영어 수준 확인 및 English Learner identification 등에 활용되는 Assessment입니다. 공식 WIDA 문제를 복제하지 않으며, 유사 skill practice로 구성합니다."
            ctaLabel="WIDA Screener 구성 문의"
          />
        </div>
      </div>
    </section>
  );
}
