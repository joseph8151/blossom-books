const steps = [
  {
    n: "01",
    en: "Curriculum Research",
    ko: "교육과정 리서치",
    body: "교육과정, 시험 구조, 평가 기준, 출제 범위를 조사합니다.",
  },
  {
    n: "02",
    en: "Content Planning",
    ko: "콘텐츠 기획",
    body: "학년, 난이도, 문제 유형, 단원별 분량을 설계합니다.",
  },
  {
    n: "03",
    en: "Question Development",
    ko: "문항 개발",
    body: "개념 확인 문제부터 응용·자료 분석·그래프·표·서술형 문제까지 구성합니다.",
  },
  {
    n: "04",
    en: "Explanation Writing",
    ko: "해설 작성",
    body: "정답만 제시하지 않고 풀이 과정과 오답 포인트를 설명합니다.",
  },
  {
    n: "05",
    en: "Quality Review",
    ko: "품질 검토",
    body: "문항 오류, 중복, 난이도 편차, 정답과 해설의 일치 여부를 검토합니다.",
  },
  {
    n: "06",
    en: "Final Publication",
    ko: "최종 발행",
    body: "학생용 문제집과 정답·상세 해설집을 각각 정리하여 PDF로 제공합니다.",
  },
];

export default function ResearchProcess() {
  return (
    <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Our process</span>
          <h2 className="mt-4 font-display text-[32px] font-semibold leading-tight text-navy-950 sm:text-[38px]">
            문제를 만드는 것보다 먼저,
            <br />
            평가 기준을 분석합니다.
          </h2>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="relative border-t border-navy-800/20 pt-5">
              <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{step.n}</span>
              <p className="mt-2 font-label text-[10.5px] uppercase tracking-[0.14em] text-navy-800/60">
                {step.en}
              </p>
              <h3 className="mt-1.5 font-display text-[21px] font-semibold text-navy-950">{step.ko}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-charcoal-600">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-navy-800/12 pt-10 lg:grid-cols-2">
          <p className="text-[14px] leading-relaxed text-charcoal-600">
            블러섬북스는 단순히 문제 수를 늘리는 방식으로 교재를 구성하지 않습니다.
            시험과 교육과정에서 요구하는 사고 과정, 자주 출제되는 문제 유형, 학생이
            반복적으로 어려움을 겪는 지점을 분석하여 교재의 순서와 난이도를 설계합니다.
          </p>
          <p className="text-[14px] leading-relaxed text-charcoal-600">
            그래프, 표, 도형, 지문, 연구 자료형 문제처럼 실제 시험에서 활용되는
            시각 자료도 교재 목적에 맞게 구성합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
