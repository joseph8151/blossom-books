const cases = [
  {
    tag: "국제학교 학생",
    title: "다음 학년 선행학습",
    body: "미국 교과과정의 다음 학년 내용을 미리 학습할 수 있도록 개념 확인, 유형 연습, 응용 문제를 단계별로 구성합니다.",
  },
  {
    tag: "프랩학원",
    title: "시험 대비반 커리큘럼",
    body: "시험 일정과 반 수준에 맞춰 문제집, 숙제, 단원 테스트, 실전 모의고사를 하나의 과정으로 구성합니다.",
  },
  {
    tag: "개인 과외 선생님",
    title: "학생 맞춤 수업 자료",
    body: "학생별 취약 단원과 수업 진도에 맞는 문제 및 복습 자료를 제공합니다.",
  },
  {
    tag: "교육기관",
    title: "기관 자체 교재",
    body: "기관명, 커리큘럼, 레벨 체계에 맞춰 전용 문제집과 평가 자료를 제작할 수 있습니다.",
  },
];

export default function UseCaseSection() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-xl">
          <span className="eyebrow">Use cases</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            제작 사례 유형
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {cases.map((item) => (
            <div key={item.title} className="lift border border-navy-800/12 bg-ivory-100 p-8 shadow-card">
              <span className="font-label text-[10.5px] uppercase tracking-[0.14em] text-burgundy-700">
                {item.tag}
              </span>
              <h3 className="mt-3 font-display text-[21px] font-semibold text-navy-950">{item.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
