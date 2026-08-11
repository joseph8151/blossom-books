import { Target, BarChart3, ListChecks } from "lucide-react";

const pillars = [
  {
    icon: ListChecks,
    en: "Question Type",
    body: "실제 시험에서 요구되는 주요 문제 유형과 Skill을 기준으로 구성합니다.",
  },
  {
    icon: BarChart3,
    en: "Difficulty",
    body: "학생 학년과 목표 시험 수준을 고려해 실제 시험 대비에 적절한 난이도로 설계합니다.",
  },
  {
    icon: Target,
    en: "Format & Flow",
    body: "가능한 범위에서 실제 시험의 문항 구조와 풀이 흐름을 참고해 연습합니다.",
  },
];

// 시험 Skill → Blossom 연습 방식 비교 (문제 복제가 아니라 '평가하는 능력'이 같은 방향임을 보여줌)
const skillMap = [
  {
    skill: "Main Idea",
    actual: "짧은 지문을 읽고 글의 핵심 내용을 판단",
    blossom: "비슷한 길이·사고 과정의 독립 제작 지문으로 Main Idea 연습",
  },
  {
    skill: "Inference",
    actual: "지문에 직접 드러나지 않은 정보를 추론",
    blossom: "문장에 직접 나오지 않은 정보를 문맥으로 추론하는 문항 연습",
  },
  {
    skill: "Vocabulary in Context",
    actual: "문맥 속에서 단어의 의미를 파악",
    blossom: "지문 맥락을 활용해 어휘의 의미를 찾는 문항으로 연습",
  },
];

export default function TestAlignment() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">How close is it to the real test?</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            실제 시험과 얼마나 비슷한가요?
          </h2>
          <p className="mt-5 text-[14.5px] leading-[1.85] text-charcoal-600">
            Blossom Books는 실제 시험의 평가 영역, 문제 구조, 요구되는 사고방식과 난이도 범위를 분석해 연습
            문제를 구성합니다. 단순히 시험 이름만 붙인 일반 문제집이 아니라, 해당 시험에서 요구되는 Skill과
            Question Type에 익숙해질 수 있도록 설계합니다.
          </p>
        </div>

        {/* 3 pillars */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, en, body }) => (
            <div key={en} className="border border-navy-800/12 bg-ivory-200/40 p-6">
              <div className="flex h-10 w-10 items-center justify-center border border-brass-500/30 bg-brass-500/[0.07] text-brass-500">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <p className="mt-4 font-label text-[11px] uppercase tracking-[0.12em] text-navy-950">{en}</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-charcoal-600">{body}</p>
            </div>
          ))}
        </div>

        {/* 핵심 문구 + 독립 제작 고지 */}
        <div className="mt-10 border border-brass-500/40 bg-brass-500/[0.05] p-7 text-center">
          <p className="font-display text-[20px] font-semibold text-navy-950 sm:text-[24px]">
            Similar in skill and structure. <span className="text-brass-500">Independently developed.</span>
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-[13.5px] leading-relaxed text-charcoal-600">
            실제 시험의 평가 방식과 유형을 참고해 독립적으로 제작한 Prep 콘텐츠이며, 실제 기출문제나
            유출문제를 제공하는 것은 아닙니다.
          </p>
        </div>

        {/* Skill → Blossom 연습 비교 */}
        <div className="mt-12">
          <h3 className="font-display text-[19px] font-semibold text-navy-950">
            시험 Skill → Blossom 연습 방식
          </h3>
          <div className="mt-5 overflow-hidden border border-navy-800/12 shadow-card">
            <div className="grid grid-cols-[0.8fr_1.1fr_1.1fr] bg-navy-950 text-ivory-100">
              {["Skill", "실제 시험에서 요구하는 것", "Blossom Practice"].map((h) => (
                <div key={h} className="px-4 py-3 font-label text-[10px] uppercase tracking-[0.08em] text-brass-400">
                  {h}
                </div>
              ))}
            </div>
            {skillMap.map((s) => (
              <div key={s.skill} className="grid grid-cols-[0.8fr_1.1fr_1.1fr] border-t border-navy-800/10 bg-ivory-100">
                <div className="flex items-center px-4 py-3.5 font-display text-[14px] font-semibold text-navy-950">
                  {s.skill}
                </div>
                <div className="flex items-center px-4 py-3.5 text-[12.5px] text-charcoal-600">{s.actual}</div>
                <div className="flex items-center px-4 py-3.5 text-[12.5px] text-charcoal-900">{s.blossom}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-charcoal-600/70">
            * 실제 문제를 복제하지 않으며, 평가하는 능력이 같은 방향이 되도록 독립 제작합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
