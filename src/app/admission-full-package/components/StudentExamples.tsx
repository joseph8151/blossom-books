import { ArrowRight, GraduationCap } from "lucide-react";
import { studentExamples } from "../data";

export default function StudentExamples() {
  return (
    <section className="border-b border-navy-800/10 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.18em] text-[#5f6f52]">Customization</span>
          <h2 className="mt-4 font-display text-[26px] font-semibold text-navy-950 sm:text-[30px]">
            학생별 맞춤 예시
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-charcoal-600">
            같은 패키지라도 학생의 현재 수준과 약점에 따라 실제 구성은 다르게 조정됩니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {studentExamples.map((ex) => (
            <div key={ex.label} className="border border-navy-800/12 bg-ivory-100 p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1e8] text-[#5f6f52]">
                <GraduationCap size={18} strokeWidth={1.7} />
              </span>
              <p className="mt-4 font-label text-[10.5px] uppercase tracking-[0.14em] text-[#5f6f52]">{ex.label}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {ex.profile.map((p) => (
                  <span key={p} className="border border-navy-800/15 bg-white px-2.5 py-1 text-[11.5px] text-navy-800">
                    {p}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-2 border-t border-navy-800/10 pt-4">
                {ex.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-[13px] text-charcoal-700">
                    <ArrowRight size={13} className="shrink-0 text-[#5f6f52]" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
