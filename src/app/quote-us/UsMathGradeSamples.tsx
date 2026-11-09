import { MATH_GRADE_SAMPLES } from "@/data/sampleBank";
import { GRADES } from "./curriculumData";
import { SampleCard } from "./ApSampleModal";

// G1부터 G12까지, 미국 수학 교과과정(Grade-Based Math) 전 학년 샘플을
// 한 번에 보여주는 섹션입니다. 위 설정기에서는 학년을 하나씩 골라야만
// 해당 학년 샘플을 볼 수 있지만, 여기서는 전 학년을 스크롤 한 번으로
// 비교할 수 있습니다.
export default function UsMathGradeSamples() {
  return (
    <section className="mt-16">
      <span className="eyebrow">Math · All Grades</span>
      <h2 className="mt-3 font-display text-[22px] font-semibold text-navy-950">
        미국 수학 교과 샘플 — G1부터 G12까지 전체
      </h2>
      <p className="mt-2 max-w-[640px] text-[13px] leading-relaxed text-charcoal-600">
        학년이 올라갈수록 다루는 영역과 난이도가 어떻게 달라지는지 한 번에 비교하실 수 있습니다.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GRADES.map((g) => {
          const item = MATH_GRADE_SAMPLES[g]?.[0];
          if (!item) return null;
          return (
            <div key={g}>
              <p className="mb-2 font-label text-[10px] uppercase tracking-[0.1em] text-charcoal-600/60">
                {g} Math
              </p>
              <SampleCard item={item} index={0} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
