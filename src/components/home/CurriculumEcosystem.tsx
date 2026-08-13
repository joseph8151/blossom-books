import { ArrowRight } from "lucide-react";
import { curriculumEcosystem } from "@/data/john";

export default function CurriculumEcosystem() {
  return (
    <section id="curriculum" className="bg-ivory-100 py-20 lg:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
        <span className="eyebrow eyebrow--center">Curriculum Ecosystem</span>
        <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[1.2] text-navy-950 sm:text-[36px]">
          More Programs. <span className="text-coral-500">More Ways to Grow.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-relaxed text-charcoal-600">
          한 학생의 성장뿐 아니라, 센터 자체가 다양한 교육 프로그램으로 확장될 수 있습니다.
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {curriculumEcosystem.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-3">
              <div className="rounded-full bg-navy-900 px-6 py-3.5 text-left">
                <p className="font-display text-[14px] font-bold text-ivory-100">{stage.label}</p>
                <p className="text-[11px] text-ivory-200/60">{stage.labelKo}</p>
              </div>
              {i < curriculumEcosystem.length - 1 && (
                <ArrowRight size={16} className="shrink-0 text-coral-500" strokeWidth={2.5} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
