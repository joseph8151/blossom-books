import { GraduationCap, Eye, LineChart, PenTool, ShieldCheck } from "lucide-react";

// 실제 수업이 교재가 되는 과정 — 경쟁사가 따라 쓰기 어려운 브랜드 스토리.
const steps = [
  { icon: GraduationCap, en: "Teach", ko: "학생들을 직접 지도합니다" },
  { icon: Eye, en: "Observe", ko: "반복적으로 틀리는 유형과 취약 Skill을 확인합니다" },
  { icon: LineChart, en: "Analyze", ko: "프렙 티칭 현장의 피드백을 분석합니다" },
  { icon: PenTool, en: "Design", ko: "문제 유형과 난이도를 설계합니다" },
  { icon: ShieldCheck, en: "Review", ko: "정답·해설·난이도를 다시 검수합니다" },
];

export default function FromClassroomToWorkbook() {
  return (
    <section className="border-b border-navy-800/12 bg-navy-950 py-20 text-ivory-100 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-label text-[11px] uppercase tracking-[0.16em] text-brass-400">From classroom to workbook</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight sm:text-[31px]">
            교실에서 발견한 문제를, 교재에서 해결합니다.
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.85] text-ivory-200/80">
            프렙 티칭 센터와 실제 학생 지도를 통해 축적되는 현장 경험을 교재 설계에 반영합니다. 학생들이
            어떤 유형에서 막히는지, 어떤 설명에서 이해하는지, 어느 단계에서 난도가 급격히 높아지는지를 살펴
            문제와 해설을 설계합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-ivory-100/12 bg-ivory-100/10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ icon: Icon, en, ko }, i) => (
            <div key={en} className="relative bg-navy-950 p-6">
              <div className="flex items-center justify-between">
                <Icon size={20} className="text-brass-400" strokeWidth={1.7} />
                <span className="font-display text-[22px] font-semibold text-ivory-100/15">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-4 font-label text-[11px] uppercase tracking-[0.14em] text-brass-400">{en}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ivory-200/85">{ko}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 border-l-2 border-brass-400 pl-5 font-display text-[18px] font-medium italic leading-snug sm:text-[21px]">
          We teach. We observe. We build.
        </p>
      </div>
    </section>
  );
}
