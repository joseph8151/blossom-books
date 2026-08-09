const intro = [
  "블러섬북스는 학생이 실제로 풀고, 이해하고, 실력을 향상시킬 수 있는 교육 콘텐츠를 연구합니다.",
  "같은 시험을 준비하더라도 학생의 학년, 배경지식, 현재 실력, 학습 기간에 따라 필요한 문제와 학습 방법은 달라집니다. 블러섬북스는 이러한 차이를 고려하여 학생의 학습 목적과 수준에 적합한 교재를 안내하고, 필요한 경우 목적에 맞는 학습 콘텐츠를 별도로 설계합니다.",
  "단순히 많은 문제를 제공하는 것보다 중요한 것은 지금 학생에게 필요한 문제를 정확하게 제공하는 것이라고 생각합니다. 시험의 유형과 출제 구조를 분석하고, 개념 이해부터 문제 적용, 실전 연습까지 자연스럽게 이어질 수 있도록 교재를 구성합니다.",
  "국제학교 입학시험, 학업성취도 평가, 영어·수학 시험, 해외 표준화 시험 등 다양한 시험을 준비하는 학생들이 자신의 수준에 맞게 학습할 수 있도록 문제 유형과 난이도를 세분화하고 있습니다.",
  "또한 문제를 푸는 것에서 끝나지 않고, 왜 해당 답이 나오는지 이해할 수 있도록 해설과 학습 자료의 완성도를 중요하게 생각합니다. 학생이 혼자 공부하거나 학부모와 함께 학습할 때에도 충분히 활용할 수 있는 콘텐츠를 만드는 것이 블러섬북스의 목표입니다.",
];

const sections = [
  {
    title: "학생마다 다른 학습을 생각합니다",
    body: [
      "같은 학년이라도 학생마다 강점과 부족한 부분은 다릅니다. 어떤 학생에게는 기본 개념을 반복하는 과정이 필요하고, 어떤 학생에게는 실제 시험과 유사한 문제를 집중적으로 연습하는 과정이 필요합니다.",
      "블러섬북스는 획일적인 학습보다 학생의 현재 위치와 목표를 기준으로 필요한 학습 방향을 제안합니다.",
    ],
  },
  {
    title: "시험을 분석하고 문제를 설계합니다",
    body: [
      "시험 준비에서 가장 중요한 것은 해당 시험이 무엇을 평가하는지 정확하게 이해하는 것입니다.",
      "블러섬북스는 시험의 영역, 문제 유형, 난이도, 출제 목적을 분석하여 학습자가 실제 시험에서 요구되는 사고방식과 문제 해결 과정을 충분히 연습할 수 있도록 콘텐츠를 구성합니다.",
      "단순 암기형 문제보다는 개념을 이해하고 적용하는 문제, 지문을 분석하는 문제, 사고력과 추론 능력을 요구하는 문제까지 단계적으로 접할 수 있도록 설계하는 것을 중요하게 생각합니다.",
    ],
  },
  {
    title: "필요한 만큼, 목적에 맞게",
    body: [
      "이미 준비된 교재가 학생의 목표와 적합하다면 해당 교재를 안내합니다. 기존 교재만으로 준비하기 어려운 경우에는 학년, 시험, 영역, 난이도, 학습 기간 등을 고려하여 필요한 콘텐츠를 별도로 구성할 수 있습니다.",
      "리딩, 라이팅, 문법, 어휘, 수학 등 특정 영역을 집중적으로 보완하거나 실제 시험 유형에 맞춘 연습이 필요한 경우에도 목적에 맞는 학습 구성이 가능합니다.",
    ],
  },
  {
    title: "블러섬북스가 지향하는 교육 콘텐츠",
    body: [
      "좋은 문제집은 문제의 수가 많은 책이 아니라 학생이 한 문제를 통해 하나의 개념을 이해하고, 다음 문제에서는 그 개념을 스스로 적용할 수 있도록 만들어진 책이라고 생각합니다.",
      "블러섬북스는 학생에게 필요한 학습이 무엇인지 고민하고, 실제 학습 과정에서 도움이 되는 문제와 설명을 지속적으로 연구합니다.",
      "학생이 시험을 단순히 대비하는 것을 넘어 자신의 실력을 한 단계씩 높여갈 수 있도록 돕는 것. 그것이 블러섬북스가 교육 콘텐츠를 만드는 이유입니다.",
    ],
  },
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
          <div className="mt-8 space-y-5">
            {intro.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-[17px] font-medium leading-[1.85] text-navy-900"
                    : "text-[15px] leading-[1.9] text-charcoal-600"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-200/50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="space-y-14">
            {sections.map((s, i) => (
              <div key={s.title} className="border-l-2 border-brass-500 pl-6 lg:pl-8">
                <span className="font-label text-[11px] text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 font-display text-[24px] font-semibold leading-snug text-navy-950 sm:text-[26px]">
                  {s.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {s.body.map((b, j) => (
                    <p key={j} className="text-[15px] leading-[1.9] text-charcoal-600">
                      {b}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
