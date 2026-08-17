import { Repeat, PencilLine, RotateCcw, Home } from "lucide-react";

// 가격표 바로 아래 — 수업과 비교해 "깎아내리지" 않고, 반복 가능한 학습 자료라는 성격만 설명합니다.
// 의도적으로 사용하지 않는 표현: "학원보다 싸다", "과외보다 효과가 좋다" 같은 우열 비교.
const points = [
  { icon: PencilLine, text: "학생이 직접 풀고" },
  { icon: RotateCcw, text: "틀린 문제를 다시 확인하고" },
  { icon: Repeat, text: "해설을 통해 부족한 Skill을 반복" },
];

export default function WorkbookAndLessons() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-200/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="eyebrow">Something they can repeat</span>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
              수업 몇 회보다,
              <br />
              혼자 반복할 수 있는 학습 자료가 필요하다면.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-charcoal-600">
              1:1 수업이나 학원 수업은 수업 시간이 끝나면 종료되지만, Workbook은 시험일까지 반복해서 사용할 수
              있습니다.
            </p>

            <ul className="mt-6 space-y-3">
              {points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-brass-500/30 bg-brass-500/[0.07] text-brass-500">
                    <Icon size={16} strokeWidth={1.9} />
                  </span>
                  <span className="text-[14px] text-charcoal-900">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-navy-800/15 bg-ivory-100 p-8 shadow-card lg:p-10">
            <Home size={22} className="text-brass-500" strokeWidth={1.8} />
            <p className="mt-5 font-display text-[19px] font-semibold leading-snug text-navy-950 sm:text-[21px]">
              수업을 대신하는 교재가 아닙니다.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-charcoal-600">
              수업과 함께 사용할 수도 있고, 가정 학습용으로도 활용할 수 있습니다. 선생님이 수업에서 다룬 유형을
              집에서 다시 연습하는 자료로 쓰는 경우가 많습니다.
            </p>
            <p className="mt-5 border-t border-navy-800/10 pt-5 text-[13px] leading-relaxed text-charcoal-600">
              어떤 방식이 학생에게 맞는지는 상담에서 함께 확인해 드립니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
