const steps = [
  {
    n: "01",
    en: "Research",
    ko: "리서치",
    body: "학습 목표와 필요한 스킬 분석",
  },
  {
    n: "02",
    en: "Curriculum Design",
    ko: "커리큘럼 설계",
    body: "학년과 수준에 맞는 콘텐츠 구조 설계",
  },
  {
    n: "03",
    en: "Question Development",
    ko: "문항 개발",
    body: "단계별 문제 및 학습 활동 제작",
  },
  {
    n: "04",
    en: "Review & Editing",
    ko: "검토·편집",
    body: "문항, 난이도, 표현, 해설 검토",
  },
  {
    n: "05",
    en: "Final Workbook",
    ko: "완성 교재",
    body: "실제 학습에 사용할 수 있는 완성형 교재 제작",
  },
];

export default function ResearchProcess() {
  return (
    <section className="paper-rule border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">How we build our workbooks</span>
          <h2 className="mt-4 font-display text-[27px] font-semibold leading-tight text-navy-950 sm:text-[33px]">
            Built with Purpose.
            <br />
            Reviewed with Care.
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] leading-[1.85] text-charcoal-600">
            Blossom Books는 단순히 문제 수를 늘리는 방식으로 교재를 만들지 않습니다. 학생의 학년, 현재
            수준, 학습 목표를 먼저 고려하고, 그에 맞는 난이도와 문제 유형을 설계합니다.
          </p>
        </div>

        {/* 5단계 */}
        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <div key={step.n} className="relative border-t border-navy-800/20 pt-5">
              {i < steps.length - 1 && (
                <span className="absolute -right-3 top-4 hidden font-label text-[13px] text-brass-500/70 lg:block">
                  →
                </span>
              )}
              <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{step.n}</span>
              <p className="mt-2 font-display text-[19px] font-semibold text-navy-950">{step.en}</p>
              <p className="mt-1 font-label text-[10.5px] uppercase tracking-[0.12em] text-navy-800/55">
                {step.ko}
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-charcoal-600">{step.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 border-t border-navy-800/12 pt-8 text-[14px] leading-relaxed text-charcoal-600">
          Every workbook is designed to be practical, structured, and easy to use — for students, parents,
          tutors, and educators.
        </p>
      </div>
    </section>
  );
}
