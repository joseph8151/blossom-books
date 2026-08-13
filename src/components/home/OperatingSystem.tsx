import { operatingSystemSteps } from "@/data/john";

export default function OperatingSystem() {
  return (
    <section className="border-b border-navy-900/12 bg-ivory-200 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow eyebrow--center">JOHN Operating System</span>
          <h2 className="mt-4 text-balance font-display text-[30px] font-extrabold leading-[1.2] text-navy-950 sm:text-[36px]">
            A Better System <span className="text-coral-500">Behind Every Classroom.</span>
          </h2>
        </div>

        {/* 가로 스크롤 타임라인 — 모바일에서도 끝없는 카드 반복 없이 스와이프로 확인 */}
        <div className="mt-14 -mx-5 overflow-x-auto px-5 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="flex min-w-max gap-0 lg:min-w-0 lg:grid lg:grid-cols-8 lg:gap-4">
            {operatingSystemSteps.map((step) => (
              <div
                key={step.step}
                className="w-[220px] shrink-0 rounded-2xl bg-white p-5 mr-4 shadow-card lg:w-auto lg:mr-0"
              >
                <span className="num-badge h-7 w-7 text-[11px]">{step.step}</span>
                <h3 className="mt-3 font-label text-[12.5px] font-semibold uppercase tracking-[0.04em] text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-1 text-[12px] font-medium text-coral-600">{step.titleKo}</p>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-charcoal-600">{step.support}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
