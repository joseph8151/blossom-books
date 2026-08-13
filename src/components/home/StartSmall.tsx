import { growthRoadmap } from "@/data/john";

export default function StartSmall() {
  return (
    <section className="border-b border-navy-900/30 bg-navy-950 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow eyebrow--center eyebrow--light">Growth Roadmap</span>
          <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.15] text-ivory-100 sm:text-[42px]">
            Start Small.
            <br />
            <span className="text-coral-400">Grow with JOHN.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-ivory-200/70">
            처음부터 큰 학원이 필요하지 않습니다. 작은 공부방에서 시작해 학생이 증가하면
            교습소로, 다시 학원으로 확장할 수 있습니다.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-4 lg:flex-row">
          {growthRoadmap.map((step) => (
            <div
              key={step.step}
              className="flex flex-1 flex-col items-center gap-3 rounded-2xl bg-ivory-100/6 px-6 py-8 text-center"
            >
              <span className="font-display text-[40px] font-extrabold leading-none text-coral-400">
                {step.step}
              </span>
              <span className="font-label text-[12px] font-semibold uppercase tracking-[0.12em] text-ivory-100">
                {step.label}
              </span>
              <span className="text-[12.5px] text-ivory-200/60">{step.labelKo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
