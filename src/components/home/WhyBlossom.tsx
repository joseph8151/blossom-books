const cards = [
  {
    n: "01",
    en: "GRADE + LEVEL",
    body: "같은 학년이라도 학생의 현재 실력은 다릅니다. 학년뿐 아니라 현재 수준을 함께 고려합니다.",
  },
  {
    n: "02",
    en: "TEST-SPECIFIC",
    body: "시험마다 평가하는 방식과 문제 유형이 다릅니다. 목표 시험에 필요한 Skill과 유형을 중심으로 구성합니다.",
  },
  {
    n: "03",
    en: "STRUCTURED PRACTICE",
    body: "단순한 문제 모음이 아니라 기초 → 적용 → 실전으로 이어지는 연습 구조를 지향합니다.",
  },
  {
    n: "04",
    en: "DETAILED EXPLANATIONS",
    body: "답만 확인하는 Answer Key가 아니라 학생이 왜 틀렸는지 이해할 수 있도록 상세한 설명을 제공합니다.",
  },
  {
    n: "05",
    en: "EDITORIAL REVIEW",
    body: "문항, 난이도, 정답 및 해설을 검토하여 하나의 완성된 학습 콘텐츠로 제작합니다.",
  },
];

export default function WhyBlossom() {
  return (
    <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Blossom Books?</span>
          <h2 className="mt-4 font-display text-[27px] font-semibold leading-tight text-navy-950 sm:text-[32px]">
            일반 문제집과 무엇이 다른가요?
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.85] text-charcoal-600">
            Blossom Books는 페이지 수만 많은 문제집을 만들지 않습니다. 학생이 준비하는 시험, 현재 학년,
            현재 영어 또는 수학 수준, 필요한 문제 유형, 준비 기간을 고려하여 목적에 맞는 Prep 콘텐츠를
            구성합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((c) => (
            <div key={c.n} className="border-t border-navy-800/20 pt-5">
              <span className="font-label text-[12px] tracking-[0.1em] text-brass-500">{c.n}</span>
              <p className="mt-2 font-label text-[12px] uppercase tracking-[0.1em] text-navy-950">{c.en}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-charcoal-600">{c.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 border-t border-navy-800/12 pt-10 text-center font-display text-[22px] font-medium text-navy-950 sm:text-[27px]">
          Not Just More Questions. <span className="text-brass-500">Better-Structured Preparation.</span>
        </p>
      </div>
    </section>
  );
}
