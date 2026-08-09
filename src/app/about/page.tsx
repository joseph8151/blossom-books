const principles = [
  "교육과정에 근거한 구성",
  "명확한 문제와 정답",
  "이해할 수 있는 상세 해설",
  "단계적인 난이도",
  "실제 수업에서 활용 가능한 편집",
  "과장하지 않는 정확한 안내",
  "고객 목적에 맞는 상담",
];

export const metadata = { title: "블러섬북스 소개" };

export default function AboutPage() {
  return (
    <div>
      <section className="paper-rule border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="font-label text-[11px] uppercase tracking-[0.18em] text-brass-500">About</p>
          <h1 className="mt-3 font-display text-[36px] font-semibold leading-tight text-navy-950 sm:text-[35px]">
            블러섬북스 소개
          </h1>
          <p className="mt-8 text-[16px] leading-[1.85] text-charcoal-600">
            블러섬북스는 학생이 실제로 풀고 이해할 수 있는 교육 콘텐츠를 연구합니다.
            같은 시험을 준비하더라도 학생의 학년, 배경지식, 현재 실력, 학습 기간에 따라
            필요한 문제는 달라집니다. 블러섬북스는 이러한 차이를 고려하여 기존 교재를
            안내하고, 필요한 경우 목적에 맞는 교재를 별도로 설계합니다.
          </p>
        </div>
      </section>

      <section className="border-b border-navy-800/12 bg-ivory-200/50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="font-display text-[26px] font-semibold text-navy-950">브랜드 원칙</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p} className="flex items-start gap-3 border border-navy-800/12 bg-ivory-100 p-5">
                <span className="font-label text-[11px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[14px] text-charcoal-900">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
