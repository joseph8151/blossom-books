import { BookOpen, KeyRound } from "lucide-react";
import { readingBank } from "@/data/sampleBank";

const item = readingBank[2]; // Inference — passage/question/choices/answer/whyKo/wrongKo

export default function QuestionToUnderstanding() {
  return (
    <section className="border-b border-navy-800/12 bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">From question to understanding</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight text-navy-950 sm:text-[31px]">
            문제만 많은 곳이 아닙니다
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-charcoal-600">
            한 문제가 어떻게 정답과 해설로 이어지는지 실제 예시로 보여드립니다. 문제집 본문은 영어, 해설은
            한글 상세해설(핵심 영어 병기)로 제공합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* Workbook */}
          <div className="border border-navy-800/15 bg-ivory-100 p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-2 border-b border-navy-800/15 pb-3">
              <BookOpen size={15} className="text-brass-500" />
              <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-500">Student Workbook · {item.type}</span>
            </div>
            <p className="mt-4 border-l-2 border-brass-500 pl-4 text-[13.5px] leading-relaxed text-charcoal-900">{item.passage}</p>
            <p className="mt-4 flex gap-2 text-[14.5px] leading-relaxed text-charcoal-900">
              <span className="font-display font-semibold text-navy-900">1.</span> {item.question}
            </p>
            {item.choices && (
              <div className="mt-3 grid gap-1.5 text-[13.5px] text-charcoal-600 sm:grid-cols-2">
                {item.choices.map((c, i) => (
                  <span key={i}>{["①", "②", "③", "④"][i]} {c}</span>
                ))}
              </div>
            )}
          </div>

          {/* Answer Guide */}
          <div className="border border-navy-800/15 bg-navy-950 p-6 text-ivory-100 shadow-card sm:p-8">
            <div className="flex items-center justify-between border-b border-ivory-100/15 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound size={15} className="text-brass-400" />
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-brass-400">Answer &amp; Explanation</span>
              </div>
              <span className="border border-brass-400/40 px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.1em] text-brass-400">한글 상세해설</span>
            </div>
            <div className="mt-4 space-y-3.5">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">Correct Answer</p>
                <p className="mt-1 text-[14px] font-medium text-ivory-100">{item.answer}</p>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">왜 정답인가요?</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ivory-200/85">{item.whyKo}</p>
              </div>
              {item.wrongKo && (
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">오답 포인트</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ivory-200/80">{item.wrongKo}</p>
                </div>
              )}
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.1em] text-brass-400">Skill</p>
                <p className="mt-1 text-[13px] text-ivory-200/80">{item.skill} · {item.difficulty}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-display text-[18px] font-medium text-navy-950 sm:text-[21px]">
          The learning happens <span className="text-brass-500">after</span> the question.
        </p>
      </div>
    </section>
  );
}
