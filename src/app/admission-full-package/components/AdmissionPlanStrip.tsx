import { ArrowRight } from "lucide-react";
import { admissionPlanSteps } from "../data";

// Hero 바로 아래, 6개 영역으로 들어가기 전에 "서비스로서의 흐름"을 한 줄로
// 보여줍니다. 49만원이 "페이지 수"가 아니라 설계 과정의 결과물로 읽히도록
// 돕는 짧은 섹션입니다.
export default function AdmissionPlanStrip() {
  return (
    <section className="border-b border-navy-800/10 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <p className="text-center font-label text-[10.5px] uppercase tracking-[0.18em] text-charcoal-600/60">
          Your Admission Plan
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-1 gap-y-4">
          {admissionPlanSteps.map((s, i) => (
            <span key={s.n} className="inline-flex items-center gap-1">
              {i > 0 && <ArrowRight size={14} className="mx-2 shrink-0 text-navy-800/25" />}
              <span className="flex flex-col items-center px-2 text-center sm:items-start sm:text-left">
                <span className="font-label text-[10px] text-[#5f6f52]">{s.n}</span>
                <span className="font-display text-[15px] font-semibold text-navy-950">{s.title}</span>
                <span className="mt-0.5 max-w-[150px] text-[11.5px] leading-snug text-charcoal-600">{s.desc}</span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
